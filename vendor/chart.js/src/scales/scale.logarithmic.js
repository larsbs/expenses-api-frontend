(function() {
	"use strict";

	var root = this,
		Chart = root.Chart,
		helpers = Chart.helpers;

	var defaultConfig = {
		position: "left",

		// label settings
		ticks: {
			callback: function(value) {
				var remain = value / (Math.pow(10, Math.floor(Chart.helpers.log10(value))));

				if (remain === 1 || remain === 2 || remain === 5) {
					return value.toExponential();
				} else {
					return '';
				}
			}
		}
	};

	var LogarithmicScale = Chart.Scale.extend({
		buildTicks: function() {

			// Calculate Range (we may break this out into it's own lifecycle function)

			this.min = null;
			this.max = null;

			var values = [];

			if (this.options.stacked) {
				helpers.each(this.data.datasets, function(dataset) {
					if (helpers.isDatasetVisible(dataset) && (this.isHorizontal() ? dataset.xAxisID === this.id : dataset.yAxisID === this.id)) {
						helpers.each(dataset.data, function(rawValue, index) {

							var value = this.getRightValue(rawValue);
							if (isNaN(value)) {
								return;
							}

							values[index] = values[index] || 0;

							if (this.options.relativePoints) {
								values[index] = 100;
							} else {
								// Don't need to split positive and negative since the log scale can't handle a 0 crossing
								values[index] += value;
							}
						}, this);
					}
				}, this);

				this.min = helpers.min(values);
				this.max = helpers.max(values);

			} else {
				helpers.each(this.data.datasets, function(dataset) {
					if (helpers.isDatasetVisible(dataset) && (this.isHorizontal() ? dataset.xAxisID === this.id : dataset.yAxisID === this.id)) {
						helpers.each(dataset.data, function(rawValue, index) {
							var value = this.getRightValue(rawValue);
							if (isNaN(value)) {
								return;
							}

							if (this.min === null) {
								this.min = value;
							} else if (value < this.min) {
								this.min = value;
							}

							if (this.max === null) {
								this.max = value;
							} else if (value > this.max) {
								this.max = value;
							}
						}, this);
					}
				}, this);
			}

			if (this.min === this.max) {
				if (this.min !== 0 && this.min !== null) {
					this.min = Math.pow(10, Math.floor(helpers.log10(this.min)) - 1);
					this.max = Math.pow(10, Math.floor(helpers.log10(this.max)) + 1);
				} else {
					this.min = 1;
					this.max = 10;
				}
			}


			// Reset the ticks array. Later on, we will draw a grid line at these positions
			// The array simply contains the numerical value of the spots where ticks will be
			this.tickValues = [];

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on 
			// the graph

			var minExponent = Math.floor(helpers.log10(this.min));
			var maxExponent = Math.ceil(helpers.log10(this.max));

			for (var exponent = minExponent; exponent < maxExponent; ++exponent) {
				for (var i = 1; i < 10; ++i) {
					this.tickValues.push(i * Math.pow(10, exponent));
				}
			}

			this.tickValues.push(1.0 * Math.pow(10, maxExponent));

			if (this.options.position == "left" || this.options.position == "right") {
				// We are in a vertical orientation. The top value is the highest. So reverse the array
				this.tickValues.reverse();
			}

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			this.max = helpers.max(this.tickValues);
			this.min = helpers.min(this.tickValues);

			if (this.options.ticks.reverse) {
				this.tickValues.reverse();

				this.start = this.max;
				this.end = this.min;
			} else {
				this.start = this.min;
				this.end = this.max;
			}

			this.ticks = this.tickValues.slice();
		},
		// Get the correct tooltip label
		getLabelForIndex: function(index, datasetIndex) {
			return this.getRightValue(this.data.datasets[datasetIndex].data[index]);
		},
		getPixelForTick: function(index, includeOffset) {
			return this.getPixelForValue(this.tickValues[index], null, null, includeOffset);
		},
		getPixelForValue: function(value, index, datasetIndex, includeOffset) {
			var pixel;

			var newVal = this.getRightValue(value);
			var range = helpers.log10(this.end) - helpers.log10(this.start);

			if (this.isHorizontal()) {

				if (newVal === 0) {
					pixel = this.left + this.paddingLeft;
				} else {
					var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
					pixel = this.left + (innerWidth / range * (helpers.log10(newVal) - helpers.log10(this.start)));
					return pixel + this.paddingLeft;
				}
			} else {
				// Bottom - top since pixels increase downard on a screen
				if (newVal === 0) {
					pixel = this.top + this.paddingTop;
				} else {
					var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
					return (this.bottom - this.paddingBottom) - (innerHeight / range * (helpers.log10(newVal) - helpers.log10(this.start)));
				}
			}

		},

	});
	Chart.scaleService.registerScaleType("logarithmic", LogarithmicScale, defaultConfig);

}).call(this);
