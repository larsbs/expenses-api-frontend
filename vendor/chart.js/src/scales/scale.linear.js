(function() {
	"use strict";

	var root = this,
		Chart = root.Chart,
		helpers = Chart.helpers;

	var defaultConfig = {
		position: "left",
		ticks: {
			callback: function(tickValue, index, ticks) {
				var delta = ticks[1] - ticks[0];

				// If we have a number like 2.5 as the delta, figure out how many decimal places we need
				if (Math.abs(delta) > 1) {
					if (tickValue !== Math.floor(tickValue)) {
						// not an integer
						delta = tickValue - Math.floor(tickValue);
					}
				}

				var logDelta = helpers.log10(Math.abs(delta));
				var tickString = '';

				if (tickValue !== 0) {
					var numDecimal = -1 * Math.floor(logDelta);
					numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
					tickString = tickValue.toFixed(numDecimal);
				} else {
					tickString = '0'; // never show decimal places for 0
				}

				return tickString;
			}
		}
	};

	var LinearScale = Chart.Scale.extend({
		buildTicks: function() {

			// First Calculate the range
			this.min = null;
			this.max = null;

			var positiveValues = [];
			var negativeValues = [];

			if (this.options.stacked) {
				helpers.each(this.data.datasets, function(dataset) {
					if (helpers.isDatasetVisible(dataset) && (this.isHorizontal() ? dataset.xAxisID === this.id : dataset.yAxisID === this.id)) {
						helpers.each(dataset.data, function(rawValue, index) {

							var value = this.getRightValue(rawValue);
							if (isNaN(value)) {
								return;
							}

							positiveValues[index] = positiveValues[index] || 0;
							negativeValues[index] = negativeValues[index] || 0;

							if (this.options.relativePoints) {
								positiveValues[index] = 100;
							} else {
								if (value < 0) {
									negativeValues[index] += value;
								} else {
									positiveValues[index] += value;
								}
							}
						}, this);
					}
				}, this);

				var values = positiveValues.concat(negativeValues);
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
				this.min--;
				this.max++;
			}


			// Then calulate the ticks
			this.ticks = [];

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on 
			// the graph

			var maxTicks;

			if (this.isHorizontal()) {
				maxTicks = Math.min(11, Math.ceil(this.width / 50));
			} else {
				// The factor of 2 used to scale the font size has been experimentally determined.
				maxTicks = Math.min(11, Math.ceil(this.height / (2 * this.options.ticks.fontSize)));
			}

			// Make sure we always have at least 2 ticks 
			maxTicks = Math.max(2, maxTicks);

			// To get a "nice" value for the tick spacing, we will use the appropriately named 
			// "nice number" algorithm. See http://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
			// for details.

			// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
			// do nothing since that would make the chart weird. If the user really wants a weird chart
			// axis, they can manually override it
			if (this.options.ticks.beginAtZero) {
				var minSign = helpers.sign(this.min);
				var maxSign = helpers.sign(this.max);

				if (minSign < 0 && maxSign < 0) {
					// move the top up to 0
					this.max = 0;
				} else if (minSign > 0 && maxSign > 0) {
					// move the botttom down to 0
					this.min = 0;
				}
			}

			var niceRange = helpers.niceNum(this.max - this.min, false);
			var spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
			var niceMin = Math.floor(this.min / spacing) * spacing;
			var niceMax = Math.ceil(this.max / spacing) * spacing;

			var numSpaces = Math.ceil((niceMax - niceMin) / spacing);

			// Put the values into the ticks array
			for (var j = 0; j <= numSpaces; ++j) {
				this.ticks.push(niceMin + (j * spacing));
			}

			if (this.options.position == "left" || this.options.position == "right") {
				// We are in a vertical orientation. The top value is the highest. So reverse the array
				this.ticks.reverse();
			}

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			this.max = helpers.max(this.ticks);
			this.min = helpers.min(this.ticks);

			if (this.options.ticks.reverse) {
				this.ticks.reverse();

				this.start = this.max;
				this.end = this.min;
			} else {
				this.start = this.min;
				this.end = this.max;
			}

			this.zeroLineIndex = this.ticks.indexOf(0);
		},

		getLabelForIndex: function(index, datasetIndex) {
			return this.getRightValue(this.data.datasets[datasetIndex].data[index]);
		},

		// Utils
		getPixelForValue: function(value, index, datasetIndex, includeOffset) {
			// This must be called after fit has been run so that 
			//      this.left, this.top, this.right, and this.bottom have been defined
			var rightValue = this.getRightValue(value);
			var pixel;
			var range = this.end - this.start;

			if (this.isHorizontal()) {

				var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
				pixel = this.left + (innerWidth / range * (rightValue - this.start));
				return Math.round(pixel + this.paddingLeft);
			} else {
				var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
				pixel = (this.bottom - this.paddingBottom) - (innerHeight / range * (rightValue - this.start));
				return Math.round(pixel);
			}
		},
	});
	Chart.scaleService.registerScaleType("linear", LinearScale, defaultConfig);

}).call(this);
