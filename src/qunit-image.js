QUnit.extend(QUnit.assert, {
	imageEqual: function (actual, expected, options) {

		options = options || {};

		var actCanvas = document.createElement('canvas'),
				actImage, actCtx, actData,
				expCanvas = document.createElement('canvas'),
				expImage, expCtx, expData,
				diffCanvas = document.createElement('canvas'),
				diffCtx, diffData,
				tester,
				channelErrors = 0,
				imageDistance = 0,
				allImagesLoaded = false,
				passed = true,
				width = options.width || 300,
				height = options.height || 300,
				max = 80,
				slope = 510 / max,
				id = 0,
				message, i, ii, rdiff, gdiff, bdiff, adiff, hue, pixelError;


		window.qunitImage = window.qunitImage || {
			tests: [],
			id: 0
		};



		// This function is running after both images are loaded.
		// And is doing the complete testing
		tester = function () {

			expData = expCtx.getImageData(0, 0, width, height).data;
			actData = actCtx.getImageData(0, 0, width, height).data;

			diffCanvas.height = height;
			diffCanvas.width = width;
			diffCtx = diffCanvas.getContext('2d');
			diffData = diffCtx.getImageData(0, 0, width, height);



			// We are using a very primitive comparison algorithm.
			// Perhaps I implement a better Delta-E sometime.
			for (i = 0, ii = 4 * width * height; i < ii; i += 4) {
				rdiff = Math.abs(expData[i]     - actData[i]);
				gdiff = Math.abs(expData[i + 1] - actData[i + 1]);
				bdiff = Math.abs(expData[i + 2] - actData[i + 2]);
				adiff = Math.abs(expData[i + 3] - actData[i + 3]);

				pixelError = rdiff + gdiff + bdiff + adiff;
				imageDistance += pixelError;
				channelErrors += !!rdiff + !!gdiff + !!bdiff + !!adiff;

				hue = slope * Math.min(max, pixelError);

				diffData.data[i]     = Math.min(255, hue);
				diffData.data[i + 1] = Math.min(255, 510 - hue);
				diffData.data[i + 2] = 0;
				diffData.data[i + 3] = 255;
			}

			diffCtx.putImageData(diffData, 0, 0);


			// Decide if the test should fail or pass
			if ('imageDistance' in options || 'channelErrors' in options) {
				if ('imageDistance' in options) {
					passed = passed && width * height * 4 * options.imageDistance > imageDistance;
				}
				if ('channelErrors' in options) {
					passed = passed && width * height * 4 * options.channelErrors > channelErrors;
				}
			}

			// If there are no preferences use imageDistance = 0.5
			else {
				passed = width * height * 4 * 0.5 > imageDistance;
			}


			// Generate the HTML with the template
			message = template({
				id: window.qunitImage.id,
				width: width,
				imageHeight: height,
				containerHeight: height + 30,
				numPixels: height * width,
				numChannels: 4 * height * width,
				channelErrors: channelErrors,
				channelErrorsPercent: (25 * channelErrors / (width * height)).toFixed(3),
				imageDistance: imageDistance,
				actCanvas: actCanvas.toDataURL(),
				expCanvas: expCanvas.toDataURL(),
				diffCanvas: diffCanvas.toDataURL()
			});

			window.qunitImage.tests.push({
				id: window.qunitImage.id,
				width: width,
				height: height,
				channelErrors: channelErrors,
				imageDistance: imageDistance,
				actual: {
					canvas: actCanvas,
					ctx: actCtx,
					data: actData
				},
				expected: {
					canvas: expCanvas,
					ctx: expCtx,
					data: expData
				},
				diffCanvas: {
					canvas: diffCanvas,
					ctx: diffCtx,
					data: diffData
				}
			});

			// Increase the id counter
			window.qunitImage.id++;


			// Pass the results to QUnit
			QUnit.config.current.assertions.push({
				result: passed,
				message: message
			});

		};


		// Now let's load the images/canvas elements
		// First the actual image (the one to be tested)
		
		// convert SVG object to strings
		if (actual.toString() === '[object SVGSVGElement]') {
			actual = (new XMLSerializer()).serializeToString(actual);
		}

		// Load images given by path or with a data url
		// and draw them on a canvas.
		if (typeof actual === 'string') {

			actImage = new Image();
			actImage.onload = function () {
				actCanvas.height = height;
				actCanvas.width = width;
				actCtx = actCanvas.getContext('2d');
				actCtx.drawImage(actImage, 0, 0);

				// Only start the tester if both images are loaded
				if (allImagesLoaded) {
					if (QUnit.config.semaphore !== 0) {
						QUnit.start();
					}
					tester();
				}
				else {
					allImagesLoaded = true;
				}
			};

			// Convert an SVG string to a data url
			if (actual.match(/^<svg/)) {
				actual = 'data:image/svg+xml;base64,' + btoa(actual);
			}

			// Start loading the image
			actImage.src = actual;
		}


		// If the image is given as canvas we don't need to load something
		else if (actual.toString() === '[object HTMLCanvasElement]') {
			actCanvas = actual;
			actCtx = actCanvas.getContext('2d');			

			if (allImagesLoaded) {
				if (QUnit.config.semaphore !== 0) {
					QUnit.start();
				}
				tester();
			}
			else {
				allImagesLoaded = true;
			}
		}

		// Notify the user that an unsupported argument has been passed as first argument
		else {
			QUnit.start();
			QUnit.config.current.assertions.push({
				result: false,
				message: 'Expected string, Canvas or SVG element in the "actual" argument but found: ' + 
					Object.prototype.toString.call(actual).slice(8, -1)
			});
		}


		// And the expected image
		// Everything is the same as above
		if (expected.toString() === '[object SVGSVGElement]') {
			expected = (new XMLSerializer()).serializeToString(expected);
		}

		if (typeof expected === 'string') {
			expImage = new Image();
			expImage.onload = function () {
				expCanvas.height = height;
				expCanvas.width = width;
				expCtx = expCanvas.getContext('2d');
				expCtx.drawImage(expImage, 0, 0);

				if (allImagesLoaded) {
					if (QUnit.config.semaphore !== 0) {
						QUnit.start();
					}
					tester();
				}
				else {
					allImagesLoaded = true;
				}
			};
			if (expected.match(/^<svg/)) {
				expected = 'data:image/svg+xml;base64,' + btoa(expected);
			}
			expImage.src = expected;
		}

		else if (expected.toString() === '[object HTMLCanvasElement]') {
			expCanvas = expected;
			expCtx = expCanvas.getContext('2d');

			if (allImagesLoaded) {
				if (QUnit.config.semaphore !== 0) {
					QUnit.start();
				}
				tester();
			}
			else {
				allImagesLoaded = true;
			}
		}

		else {
			QUnit.config.current.assertions.push({
				result: false,
				message: 'Expected string, Canvas or SVG element in the "expected" argument but found: ' + 
					Object.prototype.toString.call(expected).slice(8, -1)
			});
		}

	}
});


// Register some event handlers for making the image comparison interactive
// They are running after QUnit is completely done.
QUnit.done(function () {

	Array.prototype.forEach.call(
		document.getElementsByClassName('qunit-image-select'),
		function (elem) {
			elem.addEventListener('change', function (evt) {
				var wrapper = evt.target.parentElement.nextElementSibling;

				wrapper.getElementsByClassName('qunit-image-isVisible')[0].classList.remove('qunit-image-isVisible');
				wrapper.children[evt.target.value].classList.add('qunit-image-isVisible');
			});
		}
	);

	Array.prototype.forEach.call(
		document.getElementsByClassName('qunit-image-range-clip'),
		function (elem) {
			elem.addEventListener('input', function (evt) {
				evt.target.nextElementSibling.children[0].style.setProperty('clip', 'rect(0px, 300px, 300px, ' + evt.target.value + 'px)');
				evt.target.nextElementSibling.children[1].style.setProperty('clip', 'rect(0px, ' + evt.target.value + 'px, 300px, 0px)');
			});
		}
	);

	Array.prototype.forEach.call(
		document.getElementsByClassName('qunit-image-range-opacity'),
		function (elem) {
			elem.addEventListener('input', function (evt) {
				evt.target.nextElementSibling.children[0].style.setProperty('opacity', 1 - evt.target.value);
				evt.target.nextElementSibling.children[1].style.setProperty('opacity', evt.target.value);
			});
		}
	);

	Array.prototype.forEach.call(
		document.getElementsByClassName('qunit-image-img'),
		function (elem, index) {
			elem.addEventListener('mouseover', function (evt) {
				var id = evt.target.getAttribute('data-id'),
						wrapper = document.getElementById('qunit-image-pixelComparison-' + id);

				wrapper.children[0].style.setProperty('display', 'none');
				wrapper.children[1].style.setProperty('display', 'block');
			}, false);
		}
	);

	Array.prototype.forEach.call(
		document.getElementsByClassName('qunit-image-img'),
		function (elem, index) {
			elem.addEventListener('mouseout', function (evt) {
				var id = evt.target.getAttribute('data-id'),
						wrapper = document.getElementById('qunit-image-pixelComparison-' + id);

				wrapper.children[0].style.setProperty('display', 'block');
				wrapper.children[1].style.setProperty('display', 'none');
			}, false);
		}
	);




	Array.prototype.forEach.call(
		document.getElementsByClassName('qunit-image-img'),
		function (elem, index) {
			elem.addEventListener('mousemove', function (evt) {

				var id = evt.target.getAttribute('data-id'),
						wrapper = document.getElementById('qunit-image-pixelComparison-' + id),
						test = window.qunitImage.tests[id],
						x = 'offsetX' in evt ? evt.offsetX : evt.layerX,
						y = 'offsetY' in evt ? evt.offsetY : evt.layerY,
						actData = test.actual.ctx.getImageData(x, y, 1, 1).data,
						expData = test.expected.ctx.getImageData(x, y, 1, 1).data;

				wrapper.getElementsByClassName('qunit-image-xCoordinate')[0].innerHTML = x;
				wrapper.getElementsByClassName('qunit-image-yCoordinate')[0].innerHTML = y;


				wrapper.getElementsByClassName('qunit-image-table-rAct')[0].innerHTML = actData[0];
				wrapper.getElementsByClassName('qunit-image-table-gAct')[0].innerHTML = actData[1];
				wrapper.getElementsByClassName('qunit-image-table-bAct')[0].innerHTML = actData[2];
				wrapper.getElementsByClassName('qunit-image-table-aAct')[0].innerHTML = actData[3];

				wrapper.getElementsByClassName('qunit-image-table-rExp')[0].innerHTML = expData[0];
				wrapper.getElementsByClassName('qunit-image-table-gExp')[0].innerHTML = expData[1];
				wrapper.getElementsByClassName('qunit-image-table-bExp')[0].innerHTML = expData[2];
				wrapper.getElementsByClassName('qunit-image-table-aExp')[0].innerHTML = expData[3];


				wrapper.getElementsByClassName('qunit-image-table-act')[0]
					.style.setProperty('background', 'rgba(' + actData[0] + ',' + actData[1] + ',' +
						actData[2] + ',' + actData[3] + ')');
				wrapper.getElementsByClassName('qunit-image-table-exp')[0]
					.style.setProperty('background', 'rgba(' + expData[0] + ',' + expData[1] + ',' +
						expData[2] + ',' + expData[3] + ')');
			}, false);
		}
	);


});