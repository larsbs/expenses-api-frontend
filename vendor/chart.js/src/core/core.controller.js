(function() {

	"use strict";

	//Declare root variable - window in the browser, global on the server
	var root = this,
		Chart = root.Chart,
		helpers = Chart.helpers;


	//Create a dictionary of chart types, to allow for extension of existing types
	Chart.types = {};

	//Store a reference to each instance - allowing us to globally resize chart instances on window resize.
	//Destroy method on the chart will remove the instance of the chart from this reference.
	Chart.instances = {};

	// Controllers available for dataset visualization eg. bar, line, slice, etc.
	Chart.controllers = {};

	// The main controller of a chart
	Chart.Controller = function(instance) {

		this.chart = instance;
		this.config = instance.config;
		this.data = this.config.data;
		this.options = this.config.options = helpers.configMerge(Chart.defaults.global, Chart.defaults[this.config.type], this.config.options || {});
		this.id = helpers.uid();

		//Add the chart instance to the global namespace
		Chart.instances[this.id] = this;

		if (this.options.responsive) {
			// Silent resize before chart draws
			this.resize(true);
		}

		this.initialize.call(this);

		return this;
	};

	helpers.extend(Chart.Controller.prototype, {

		initialize: function initialize() {

			// TODO
			// If BeforeInit(this) doesn't return false, proceed

			this.bindEvents();

			// Make sure controllers are built first so that each dataset is bound to an axis before the scales
			// are built
			this.ensureScalesHaveIDs();
			this.buildOrUpdateControllers();
			this.buildScales();
			this.resetElements();
			this.initToolTip();
			this.update();

			// TODO
			// If AfterInit(this) doesn't return false, proceed

			return this;
		},

		clear: function clear() {
			helpers.clear(this.chart);
			return this;
		},

		stop: function stop() {
			// Stops any current animation loop occuring
			Chart.animationService.cancelAnimation(this);
			return this;
		},

		resize: function resize(silent) {
			this.stop();
			var canvas = this.chart.canvas;
			var newWidth = helpers.getMaximumWidth(this.chart.canvas);
			var newHeight = (this.options.maintainAspectRatio && isNaN(this.chart.aspectRatio) === false && isFinite(this.chart.aspectRatio) && this.chart.aspectRatio !== 0) ? newWidth / this.chart.aspectRatio : helpers.getMaximumHeight(this.chart.canvas);

			canvas.width = this.chart.width = newWidth;
			canvas.height = this.chart.height = newHeight;

			helpers.retinaScale(this.chart);

			if (!silent) {
				this.update(this.options.responsiveAnimationDuration);
			}

			return this;
		},
		ensureScalesHaveIDs: function ensureScalesHaveIDs() {
			var defaultXAxisID = 'x-axis-';
			var defaultYAxisID = 'y-axis-';

			if (this.options.scales) {
				if (this.options.scales.xAxes && this.options.scales.xAxes.length) {
					helpers.each(this.options.scales.xAxes, function(xAxisOptions, index) {
						xAxisOptions.id = xAxisOptions.id || (defaultXAxisID + index);
					}, this);
				}

				if (this.options.scales.yAxes && this.options.scales.yAxes.length) {
					// Build the y axes
					helpers.each(this.options.scales.yAxes, function(yAxisOptions, index) {
						yAxisOptions.id = yAxisOptions.id || (defaultYAxisID + index);
					}, this);
				}
			}
		},
		buildScales: function buildScales() {
			// Map of scale ID to scale object so we can lookup later 
			this.scales = {};

			// Build the x axes
			if (this.options.scales) {
				if (this.options.scales.xAxes && this.options.scales.xAxes.length) {
					helpers.each(this.options.scales.xAxes, function(xAxisOptions, index) {
						var ScaleClass = Chart.scaleService.getScaleConstructor(xAxisOptions.type);
						var scale = new ScaleClass({
							ctx: this.chart.ctx,
							options: xAxisOptions,
							data: this.data,
							id: xAxisOptions.id,
						});

						this.scales[scale.id] = scale;
					}, this);
				}

				if (this.options.scales.yAxes && this.options.scales.yAxes.length) {
					// Build the y axes
					helpers.each(this.options.scales.yAxes, function(yAxisOptions, index) {
						var ScaleClass = Chart.scaleService.getScaleConstructor(yAxisOptions.type);
						var scale = new ScaleClass({
							ctx: this.chart.ctx,
							options: yAxisOptions,
							data: this.data,
							id: yAxisOptions.id,
						});

						this.scales[scale.id] = scale;
					}, this);
				}
			}
			if (this.options.scale) {
				// Build radial axes
				var ScaleClass = Chart.scaleService.getScaleConstructor(this.options.scale.type);
				var scale = new ScaleClass({
					ctx: this.chart.ctx,
					options: this.options.scale,
					data: this.data,
					chart: this.chart,
				});

				this.scale = scale;

				this.scales.radialScale = scale;
			}

			Chart.scaleService.update(this, this.chart.width, this.chart.height);
		},

		buildOrUpdateControllers: function buildOrUpdateControllers(resetNewControllers) {
			var types = [];
			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				if (!dataset.type) {
					dataset.type = this.config.type;
				}
				var type = dataset.type;
				types.push(type);
				if (dataset.controller) {
					dataset.controller.updateIndex(datasetIndex);
					return;
				}
				dataset.controller = new Chart.controllers[type](this, datasetIndex);

				if (resetNewControllers) {
					dataset.controller.reset();
				}
			}, this);
			if (types.length > 1) {
				for (var i = 1; i < types.length; i++) {
					if (types[i] != types[i - 1]) {
						this.isCombo = true;
						break;
					}
				}
			}
		},

		resetElements: function resetElements() {
			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				dataset.controller.reset();
			}, this);
		},

		update: function update(animationDuration, lazy) {
			Chart.scaleService.update(this, this.chart.width, this.chart.height);

			// Make sure dataset controllers are updated and new controllers are reset
			this.buildOrUpdateControllers(true);

			// Make sure all dataset controllers have correct meta data counts
			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				dataset.controller.buildOrUpdateElements();
			}, this);

			// This will loop through any data and do the appropriate element update for the type
			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				dataset.controller.update();
			}, this);
			this.render(animationDuration, lazy);
		},

		render: function render(duration, lazy) {

			if ((typeof duration !== 'undefined' && duration !== 0) || (typeof duration == 'undefined' && this.options.animation.duration !== 0)) {
				var animation = new Chart.Animation();
				animation.numSteps = (duration || this.options.animation.duration) / 16.66; //60 fps
				animation.easing = this.options.animation.easing;

				// render function
				animation.render = function(chartInstance, animationObject) {
					var easingFunction = helpers.easingEffects[animationObject.easing];
					var stepDecimal = animationObject.currentStep / animationObject.numSteps;
					var easeDecimal = easingFunction(stepDecimal);

					chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
				};

				// user events
				animation.onAnimationProgress = this.options.onAnimationProgress;
				animation.onAnimationComplete = this.options.onAnimationComplete;

				Chart.animationService.addAnimation(this, animation, duration, lazy);
			} else {
				this.draw();
				if (this.options.onAnimationComplete && this.options.onAnimationComplete.call) {
					this.options.onAnimationComplete.call(this);
				}
			}
			return this;
		},

		draw: function(ease) {
			var easingDecimal = ease || 1;
			this.clear();

			// Draw all the scales
			helpers.each(this.scales, function(scale) {
				scale.draw(this.chartArea);
			}, this);
			if (this.scale) {
				this.scale.draw();
			}

			// Draw each dataset via its respective controller (reversed to support proper line stacking)
			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				if (helpers.isDatasetVisible(dataset)) {
					dataset.controller.draw(ease);
				}
			}, this);

			// Finally draw the tooltip
			this.tooltip.transition(easingDecimal).draw();
		},

		// Get the single element that was clicked on
		// @return : An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
		getElementAtEvent: function(e) {

			var eventPosition = helpers.getRelativePosition(e, this.chart);
			var elementsArray = [];

			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				if (helpers.isDatasetVisible(dataset)) {
					helpers.each(dataset.metaData, function(element, index) {
						if (element.inRange(eventPosition.x, eventPosition.y)) {
							elementsArray.push(element);
							return elementsArray;
						}
					}, this);
				}
			}, this);

			return elementsArray;
		},

		getElementsAtEvent: function(e) {
			var eventPosition = helpers.getRelativePosition(e, this.chart);
			var elementsArray = [];

			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				if (helpers.isDatasetVisible(dataset)) {
					helpers.each(dataset.metaData, function(element, index) {
						if (element.inLabelRange(eventPosition.x, eventPosition.y)) {
							elementsArray.push(element);
						}
					}, this);
				}
			}, this);

			return elementsArray;
		},

		getDatasetAtEvent: function(e) {
			var eventPosition = helpers.getRelativePosition(e, this.chart);
			var elementsArray = [];

			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				if (helpers.isDatasetVisible(dataset)) {
					helpers.each(dataset.metaData, function(element, elementIndex) {
						if (element.inLabelRange(eventPosition.x, eventPosition.y)) {
							helpers.each(dataset.metaData, function(element, index) {
								elementsArray.push(element);
							}, this);
						}
					}, this);
				}
			}, this);

			return elementsArray.length ? elementsArray : [];
		},

		generateLegend: function generateLegend() {
			return this.options.legendCallback(this);
		},

		destroy: function destroy() {
			this.clear();
			helpers.unbindEvents(this, this.events);
			helpers.removeResizeListener(this.chart.canvas.parentNode);

			// Reset canvas height/width attributes
			var canvas = this.chart.canvas;
			canvas.width = this.chart.width;
			canvas.height = this.chart.height;

			// if we scaled the canvas in response to a devicePixelRatio !== 1, we need to undo that transform here
			if (this.chart.originalDevicePixelRatio !== undefined) {
				this.chart.ctx.scale(1 / this.chart.originalDevicePixelRatio, 1 / this.chart.originalDevicePixelRatio);
			}

			// Reset to the old style since it may have been changed by the device pixel ratio changes
			canvas.style.width = this.chart.originalCanvasStyleWidth;
			canvas.style.height = this.chart.originalCanvasStyleHeight;

			delete Chart.instances[this.id];
		},

		toBase64Image: function toBase64Image() {
			return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
		},

		initToolTip: function initToolTip() {
			this.tooltip = new Chart.Tooltip({
				_chart: this.chart,
				_data: this.data,
				_options: this.options,
			}, this);
		},

		bindEvents: function bindEvents() {
			helpers.bindEvents(this, this.options.events, function(evt) {
				this.eventHandler(evt);
			});
		},
		eventHandler: function eventHandler(e) {
			this.lastActive = this.lastActive || [];
			this.lastTooltipActive = this.lastTooltipActive || [];

			// Find Active Elements for hover and tooltips
			if (e.type == 'mouseout') {
				this.active = this.tooltipActive = [];
			} else {
				this.active = function() {
					switch (this.options.hover.mode) {
						case 'single':
							return this.getElementAtEvent(e);
						case 'label':
							return this.getElementsAtEvent(e);
						case 'dataset':
							return this.getDatasetAtEvent(e);
						default:
							return e;
					}
				}.call(this);
				this.tooltipActive = function() {
					switch (this.options.tooltips.mode) {
						case 'single':
							return this.getElementAtEvent(e);
						case 'label':
							return this.getElementsAtEvent(e);
						case 'dataset':
							return this.getDatasetAtEvent(e);
						default:
							return e;
					}
				}.call(this);
			}

			// On Hover hook
			if (this.options.hover.onHover) {
				this.options.hover.onHover.call(this, this.active);
			}

			if (e.type == 'mouseup' || e.type == 'click') {
				if (this.options.onClick) {
					this.options.onClick.call(this, e, this.active);
				}
			}

			var dataset;
			var index;

			// Remove styling for last active (even if it may still be active)
			if (this.lastActive.length) {
				switch (this.options.hover.mode) {
					case 'single':
						this.data.datasets[this.lastActive[0]._datasetIndex].controller.removeHoverStyle(this.lastActive[0], this.lastActive[0]._datasetIndex, this.lastActive[0]._index);
						break;
					case 'label':
					case 'dataset':
						for (var i = 0; i < this.lastActive.length; i++) {
							this.data.datasets[this.lastActive[i]._datasetIndex].controller.removeHoverStyle(this.lastActive[i], this.lastActive[i]._datasetIndex, this.lastActive[i]._index);
						}
						break;
					default:
						// Don't change anything
				}
			}

			// Built in hover styling
			if (this.active.length && this.options.hover.mode) {
				switch (this.options.hover.mode) {
					case 'single':
						this.data.datasets[this.active[0]._datasetIndex].controller.setHoverStyle(this.active[0]);
						break;
					case 'label':
					case 'dataset':
						for (var j = 0; j < this.active.length; j++) {
							this.data.datasets[this.active[j]._datasetIndex].controller.setHoverStyle(this.active[j]);
						}
						break;
					default:
						// Don't change anything
				}
			}


			// Built in Tooltips
			if (this.options.tooltips.enabled || this.options.tooltips.custom) {

				// The usual updates
				this.tooltip.initialize();

				// Active
				if (this.tooltipActive.length) {
					this.tooltip._model.opacity = 1;

					helpers.extend(this.tooltip, {
						_active: this.tooltipActive,
					});

					this.tooltip.update();
				} else {
					// Inactive
					this.tooltip._model.opacity = 0;
				}
			}

			// Hover animations
			this.tooltip.pivot();

			if (!this.animating) {
				var changed;

				helpers.each(this.active, function(element, index) {
					if (element !== this.lastActive[index]) {
						changed = true;
					}
				}, this);

				helpers.each(this.tooltipActive, function(element, index) {
					if (element !== this.lastTooltipActive[index]) {
						changed = true;
					}
				}, this);

				// If entering, leaving, or changing elements, animate the change via pivot
				if ((!this.lastActive.length && this.active.length) ||
					(this.lastActive.length && !this.active.length) ||
					(this.lastActive.length && this.active.length && changed) ||
					(!this.lastTooltipActive.length && this.tooltipActive.length) ||
					(this.lastTooltipActive.length && !this.tooltipActive.length) ||
					(this.lastTooltipActive.length && this.tooltipActive.length && changed)) {

					this.stop();

					// We only need to render at this point. Updating will cause scales to be recomputed generating flicker & using more 
					// memory than necessary.
					this.render(this.options.hover.animationDuration, true);
				}
			}

			// Remember Last Actives
			this.lastActive = this.active;
			this.lastTooltipActive = this.tooltipActive;
			return this;
		},
	});

}).call(this);
