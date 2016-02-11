(function() {

	"use strict";

	var root = this,
		Chart = root.Chart,
		helpers = Chart.helpers;

	Chart.defaults.global.tooltips = {
		enabled: true,
		custom: null,
		mode: 'single',
		backgroundColor: "rgba(0,0,0,0.8)",
		titleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		titleFontSize: 12,
		titleFontStyle: "bold",
		titleSpacing: 2,
		titleMarginBottom: 6,
		titleColor: "#fff",
		titleAlign: "left",
		bodyFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		bodyFontSize: 12,
		bodyFontStyle: "normal",
		bodySpacing: 2,
		bodyColor: "#fff",
		bodyAlign: "left",
		footerFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		footerFontSize: 12,
		footerFontStyle: "bold",
		footerSpacing: 2,
		footerMarginTop: 6,
		footerColor: "#fff",
		footerAlign: "left",
		yPadding: 6,
		xPadding: 6,
		caretSize: 5,
		cornerRadius: 6,
		xOffset: 10,
		multiKeyBackground: '#fff',
		callbacks: {
			beforeTitle: helpers.noop,
			title: function(xLabel, yLabel, index, datasetIndex, data) {
				// Pick first label for now
				return helpers.isArray(xLabel) ? xLabel[0] : xLabel;
			},
			afterTitle: helpers.noop,

			beforeBody: helpers.noop,

			beforeLabel: helpers.noop,
			label: function(xLabel, yLabel, index, datasetIndex, data) {
				return this._data.datasets[datasetIndex].label + ': ' + yLabel;
			},
			afterLabel: helpers.noop,

			afterBody: helpers.noop,

			beforeFooter: helpers.noop,
			footer: helpers.noop,
			afterFooter: helpers.noop,
		},
	};

	// Helper to push or concat based on if the 2nd parameter is an array or not
	function pushOrConcat(base, toPush) {
		if (toPush) {
			if (helpers.isArray(toPush)) {
				base = base.concat(toPush);
			} else {
				base.push(toPush);
			}
		}

		return base;
	}

	Chart.Tooltip = Chart.Element.extend({
		initialize: function() {
			var options = this._options;
			helpers.extend(this, {
				_model: {
					// Positioning
					xPadding: options.tooltips.xPadding,
					yPadding: options.tooltips.yPadding,
					xOffset: options.tooltips.xOffset,

					// Body
					bodyColor: options.tooltips.bodyColor,
					_bodyFontFamily: options.tooltips.bodyFontFamily,
					_bodyFontStyle: options.tooltips.bodyFontStyle,
					bodyFontSize: options.tooltips.bodyFontSize,
					bodySpacing: options.tooltips.bodySpacing,
					_bodposition: options.tooltips.bodposition,

					// Title
					titleColor: options.tooltips.titleColor,
					_titleFontFamily: options.tooltips.titleFontFamily,
					_titleFontStyle: options.tooltips.titleFontStyle,
					titleFontSize: options.tooltips.titleFontSize,
					_titleAlign: options.tooltips.titleAlign,
					titleSpacing: options.tooltips.titleSpacing,
					titleMarginBottom: options.tooltips.titleMarginBottom,

					// Footer
					footerColor: options.tooltips.footerColor,
					_footerFontFamily: options.tooltips.footerFontFamily,
					_footerFontStyle: options.tooltips.footerFontStyle,
					footerFontSize: options.tooltips.footerFontSize,
					_footerAlign: options.tooltips.footerAlign,
					footerSpacing: options.tooltips.footerSpacing,
					footerMarginTop: options.tooltips.footerMarginTop,

					// Appearance
					caretSize: options.tooltips.caretSize,
					cornerRadius: options.tooltips.cornerRadius,
					backgroundColor: options.tooltips.backgroundColor,
					opacity: 0,
					legendColorBackground: options.tooltips.multiKeyBackground,
				},
			});
		},

		// Get the title 
		getTitle: function() {
			var beforeTitle = this._options.tooltips.callbacks.beforeTitle.apply(this, arguments),
				title = this._options.tooltips.callbacks.title.apply(this, arguments),
				afterTitle = this._options.tooltips.callbacks.afterTitle.apply(this, arguments);

			var lines = [];
			lines = pushOrConcat(lines, beforeTitle);
			lines = pushOrConcat(lines, title);
			lines = pushOrConcat(lines, afterTitle);

			return lines;
		},

		getBeforeBody: function(xLabel, yLabel, index, datasetIndex, data) {
			var lines = this._options.tooltips.callbacks.beforeBody.call(this, xLabel, yLabel, index, datasetIndex, data);
			return helpers.isArray(lines) ? lines : [lines];
		},

		getBody: function(xLabel, yLabel, index, datasetIndex) {

			var lines = [];

			var beforeLabel,
				afterLabel,
				label;

			if (helpers.isArray(xLabel)) {

				var labels = [];

				// Run EACH label pair through the label callback this time.
				for (var i = 0; i < xLabel.length; i++) {

					beforeLabel = this._options.tooltips.callbacks.beforeLabel.call(this, xLabel[i], yLabel[i], index, datasetIndex);
					afterLabel = this._options.tooltips.callbacks.afterLabel.call(this, xLabel[i], yLabel[i], index, datasetIndex);

					labels.push((beforeLabel ? beforeLabel : '') + this._options.tooltips.callbacks.label.call(this, xLabel[i], yLabel[i], index, datasetIndex) + (afterLabel ? afterLabel : ''));

				}

				if (labels.length) {
					lines = lines.concat(labels);
				}

			} else {

				// Run the single label through the callback

				beforeLabel = this._options.tooltips.callbacks.beforeLabel.apply(this, arguments);
				label = this._options.tooltips.callbacks.label.apply(this, arguments);
				afterLabel = this._options.tooltips.callbacks.afterLabel.apply(this, arguments);

				if (beforeLabel || label || afterLabel) {
					lines.push((beforeLabel ? afterLabel : '') + label + (afterLabel ? afterLabel : ''));
				}
			}

			return lines;
		},

		getAfterBody: function(xLabel, yLabel, index, datasetIndex, data) {
			var lines = this._options.tooltips.callbacks.afterBody.call(this, xLabel, yLabel, index, datasetIndex, data);
			return helpers.isArray(lines) ? lines : [lines];
		},

		// Get the footer and beforeFooter and afterFooter lines
		getFooter: function() {
			var beforeFooter = this._options.tooltips.callbacks.beforeFooter.apply(this, arguments);
			var footer = this._options.tooltips.callbacks.footer.apply(this, arguments);
			var afterFooter = this._options.tooltips.callbacks.afterFooter.apply(this, arguments);

			var lines = [];
			lines = pushOrConcat(lines, beforeFooter);
			lines = pushOrConcat(lines, footer);
			lines = pushOrConcat(lines, afterFooter);

			return lines;
		},

		update: function() {

			var ctx = this._chart.ctx;

			var element = this._active[0],
				xLabel,
				yLabel,
				labelColors = [],
				tooltipPosition;

			if (this._options.tooltips.mode == 'single') {

				xLabel = element._xScale.getLabelForIndex(element._index, element._datasetIndex);
				yLabel = element._yScale.getLabelForIndex(element._index, element._datasetIndex);
				tooltipPosition = this._active[0].tooltipPosition();

			} else {

				xLabel = [];
				yLabel = [];

				helpers.each(this._data.datasets, function(dataset, datasetIndex) {
					if (!helpers.isDatasetVisible(dataset)) {
						return;
					}
					xLabel.push(element._xScale.getLabelForIndex(element._index, datasetIndex));
					yLabel.push(element._yScale.getLabelForIndex(element._index, datasetIndex));
				});

				helpers.each(this._active, function(active, i) {
					labelColors.push({
						borderColor: active._view.borderColor,
						backgroundColor: active._view.backgroundColor
					});
				}, this);

				tooltipPosition = this._active[0].tooltipPosition();
				tooltipPosition.y = this._active[0]._yScale.getPixelForDecimal(0.5);

			}


			// Build the Text Lines
			helpers.extend(this._model, {
				title: this.getTitle(xLabel, yLabel, element._index, element._datasetIndex, this._data),
				beforeBody: this.getBeforeBody(xLabel, yLabel, element._index, element._datasetIndex, this._data),
				body: this.getBody(xLabel, yLabel, element._index, element._datasetIndex, this._data),
				afterBody: this.getAfterBody(xLabel, yLabel, element._index, element._datasetIndex, this._data),
				footer: this.getFooter(xLabel, yLabel, element._index, element._datasetIndex, this._data),
			});

			helpers.extend(this._model, {
				x: Math.round(tooltipPosition.x),
				y: Math.round(tooltipPosition.y),
				caretPadding: tooltipPosition.padding,
				labelColors: labelColors,
			});

			return this;
		},
		draw: function() {

			var ctx = this._chart.ctx;
			var vm = this._view;

			if (this._view.opacity === 0) {
				return;
			}

			// Get Dimensions

			vm.position = "top";

			var caretPadding = vm.caretPadding || 2;

			var combinedBodyLength = vm.body.length + vm.beforeBody.length + vm.afterBody.length;

			// Height
			var tooltipHeight = vm.yPadding * 2; // Tooltip Padding

			tooltipHeight += vm.title.length * vm.titleFontSize; // Title Lines
			tooltipHeight += (vm.title.length - 1) * vm.titleSpacing; // Title Line Spacing
			tooltipHeight += vm.title.length ? vm.titleMarginBottom : 0; // Title's bottom Margin

			tooltipHeight += combinedBodyLength * vm.bodyFontSize; // Body Lines
			tooltipHeight += (combinedBodyLength - 1) * vm.bodySpacing; // Body Line Spacing

			tooltipHeight += vm.footer.length ? vm.footerMarginTop : 0; // Footer Margin
			tooltipHeight += vm.footer.length * (vm.footerFontSize); // Footer Lines
			tooltipHeight += (vm.footer.length - 1) * vm.footerSpacing; // Footer Line Spacing

			// Width
			var tooltipWidth = 0;
			helpers.each(vm.title, function(line, i) {
				ctx.font = helpers.fontString(vm.titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
				tooltipWidth = Math.max(tooltipWidth, ctx.measureText(line).width);
			});
			helpers.each(vm.body, function(line, i) {
				ctx.font = helpers.fontString(vm.bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
				tooltipWidth = Math.max(tooltipWidth, ctx.measureText(line).width + (this._options.tooltips.mode != 'single' ? (vm.bodyFontSize + 2) : 0));
			}, this);
			helpers.each(vm.footer, function(line, i) {
				ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
				tooltipWidth = Math.max(tooltipWidth, ctx.measureText(line).width);
			});
			tooltipWidth += 2 * vm.xPadding;
			var tooltipTotalWidth = tooltipWidth + vm.caretSize + caretPadding;



			// Smart Tooltip placement to stay on the canvas
			// Top, center, or bottom
			vm.yAlign = "center";
			if (vm.y - (tooltipHeight / 2) < 0) {
				vm.yAlign = "top";
			} else if (vm.y + (tooltipHeight / 2) > this._chart.height) {
				vm.yAlign = "bottom";
			}


			// Left or Right
			vm.xAlign = "right";
			if (vm.x + tooltipTotalWidth > this._chart.width) {
				vm.xAlign = "left";
			}


			// Background Position
			var tooltipX = vm.x,
				tooltipY = vm.y;

			if (vm.yAlign == 'top') {
				tooltipY = vm.y - vm.caretSize - vm.cornerRadius;
			} else if (vm.yAlign == 'bottom') {
				tooltipY = vm.y - tooltipHeight + vm.caretSize + vm.cornerRadius;
			} else {
				tooltipY = vm.y - (tooltipHeight / 2);
			}

			if (vm.xAlign == 'left') {
				tooltipX = vm.x - tooltipTotalWidth;
			} else if (vm.xAlign == 'right') {
				tooltipX = vm.x + caretPadding + vm.caretSize;
			} else {
				tooltipX = vm.x + (tooltipTotalWidth / 2);
			}

			// Draw Background

			if (this._options.tooltips.enabled) {
				ctx.fillStyle = helpers.color(vm.backgroundColor).alpha(vm.opacity).rgbString();
				helpers.drawRoundedRectangle(ctx, tooltipX, tooltipY, tooltipWidth, tooltipHeight, vm.cornerRadius);
				ctx.fill();
			}


			// Draw Caret
			if (this._options.tooltips.enabled) {
				ctx.fillStyle = helpers.color(vm.backgroundColor).alpha(vm.opacity).rgbString();

				if (vm.xAlign == 'left') {

					ctx.beginPath();
					ctx.moveTo(vm.x - caretPadding, vm.y);
					ctx.lineTo(vm.x - caretPadding - vm.caretSize, vm.y - vm.caretSize);
					ctx.lineTo(vm.x - caretPadding - vm.caretSize, vm.y + vm.caretSize);
					ctx.closePath();
					ctx.fill();
				} else {
					ctx.beginPath();
					ctx.moveTo(vm.x + caretPadding, vm.y);
					ctx.lineTo(vm.x + caretPadding + vm.caretSize, vm.y - vm.caretSize);
					ctx.lineTo(vm.x + caretPadding + vm.caretSize, vm.y + vm.caretSize);
					ctx.closePath();
					ctx.fill();
				}
			}

			// Draw Title, Body, and Footer

			if (this._options.tooltips.enabled) {

				var yBase = tooltipY + vm.yPadding;
				var xBase = tooltipX + vm.xPadding;

				// Titles

				if (vm.title.length) {
					ctx.textAlign = vm._titleAlign;
					ctx.textBaseline = "top";
					ctx.fillStyle = helpers.color(vm.titleColor).alpha(vm.opacity).rgbString();
					ctx.font = helpers.fontString(vm.titleFontSize, vm._titleFontStyle, vm._titleFontFamily);

					helpers.each(vm.title, function(title, i) {
						ctx.fillText(title, xBase, yBase);
						yBase += vm.titleFontSize + vm.titleSpacing; // Line Height and spacing
						if (i + 1 == vm.title.length) {
							yBase += vm.titleMarginBottom - vm.titleSpacing; // If Last, add margin, remove spacing
						}
					}, this);
				}


				// Body
				ctx.textAlign = vm._bodyAlign;
				ctx.textBaseline = "top";
				ctx.fillStyle = helpers.color(vm.bodyColor).alpha(vm.opacity).rgbString();
				ctx.font = helpers.fontString(vm.bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);

				// Before Body
				helpers.each(vm.beforeBody, function(beforeBody, i) {
					ctx.fillText(vm.beforeBody, xBase, yBase);
					yBase += vm.bodyFontSize + vm.bodySpacing;
				});

				helpers.each(vm.body, function(body, i) {


					// Draw Legend-like boxes if needed
					if (this._options.tooltips.mode != 'single') {
						ctx.fillStyle = helpers.color(vm.labelColors[i].borderColor).alpha(vm.opacity).rgbString();
						ctx.fillRect(xBase, yBase, vm.bodyFontSize, vm.bodyFontSize);

						ctx.fillStyle = helpers.color(vm.labelColors[i].backgroundColor).alpha(vm.opacity).rgbString();
						ctx.fillRect(xBase + 1, yBase + 1, vm.bodyFontSize - 2, vm.bodyFontSize - 2);

						ctx.fillStyle = helpers.color(vm.bodyColor).alpha(vm.opacity).rgbString(); // Return fill style for text
					}

					// Body Line
					ctx.fillText(body, xBase + (this._options.tooltips.mode != 'single' ? (vm.bodyFontSize + 2) : 0), yBase);

					yBase += vm.bodyFontSize + vm.bodySpacing;

				}, this);

				// After Body
				helpers.each(vm.afterBody, function(afterBody, i) {
					ctx.fillText(vm.afterBody, xBase, yBase);
					yBase += vm.bodyFontSize;
				});

				yBase -= vm.bodySpacing; // Remove last body spacing


				// Footer
				if (vm.footer.length) {

					yBase += vm.footerMarginTop;

					ctx.textAlign = vm._footerAlign;
					ctx.textBaseline = "top";
					ctx.fillStyle = helpers.color(vm.footerColor).alpha(vm.opacity).rgbString();
					ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);

					helpers.each(vm.footer, function(footer, i) {
						ctx.fillText(footer, xBase, yBase);
						yBase += vm.footerFontSize + vm.footerSpacing;
					}, this);
				}

			}
		},
	});

}).call(this);
