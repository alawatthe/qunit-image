asyncTest('Comparing two jpgs to themselves (should pass)', 1, function (assert) {
	assert.imageEqual('../test/1_normal.jpg', '../test/1_normal.jpg');
});


asyncTest('Comparing two jpgs to themselves (should pass)', 1, function (assert) {
	assert.imageEqual('../test/2_transparentPixels.png', '../test/2_transparentPixels.png');
});


asyncTest('Comparing jpg to slightly changed one (should fail)', 1, function (assert) {
	assert.imageEqual('../test/1_normal_(1).jpg', '../test/1_normal.jpg');
});

asyncTest('Comparing jpg to slightly changed one, passing custom options (should pass)', 1, function (assert) {
	assert.imageEqual('../test/1_normal_(1).jpg', '../test/1_normal.jpg', {imageDistance: 2});
});

asyncTest('Comparing jpg to slightly changed one (should fail)', 1, function (assert) {
	assert.imageEqual('../test/2_transparentPixels_(1).png', '../test/2_transparentPixels.png');
});


asyncTest('Canvas, Canvas (should fail)', 1, function (assert) {

	var testCanvas = document.createElement('canvas'),
			testCtx = testCanvas.getContext('2d'),
			refCanvas = document.createElement('canvas'),
			refCtx = refCanvas.getContext('2d');

	testCanvas.height = 300;
	refCanvas.height = 300;

	var testGradient = testCtx.createRadialGradient(300, 300, 0, 300, 300, 300);

	testGradient.addColorStop(0, '#FF5F98');
	testGradient.addColorStop(0.4, '#FF0188');
	testGradient.addColorStop(1, 'rgba(255,1,136,0)');

	testCtx.fillStyle = testGradient;
	testCtx.fillRect(0, 0, 300, 300);

	testCtx.fillStyle = '#000';
	testCtx.fillRect(0, 0, 150, 150);
	testCtx.save();
	testCtx.fillStyle = '#09F';
	testCtx.fillRect(15, 15, 120, 120);
	testCtx.save();
	testCtx.fillStyle = '#FFF';
	testCtx.globalAlpha = 0.5;
	testCtx.fillRect(30, 30, 90, 90);
	testCtx.restore();
	testCtx.fillRect(45, 45, 60, 60);
	testCtx.restore();
	testCtx.fillRect(60, 60, 30, 30);




	var refGradient = refCtx.createRadialGradient(300, 300, 0, 300, 300, 300);

	refGradient.addColorStop(0, '#FF5F98');
	refGradient.addColorStop(0.5, '#FF0188');
	refGradient.addColorStop(1, 'rgba(255,1,136,0)');

	refCtx.fillStyle = refGradient;
	refCtx.fillRect(0, 0, 300, 300);
	refCtx.fillStyle = '#000';
	refCtx.fillRect(0, 0, 150, 150);
	refCtx.save();
	refCtx.fillStyle = '#09F';
	refCtx.fillRect(15, 15, 120, 120);
	refCtx.save();
	refCtx.fillStyle = '#F00';
	refCtx.globalAlpha = 0.5;
	refCtx.fillRect(30, 30, 90, 90);
	refCtx.restore();
	refCtx.fillRect(45, 45, 60, 60);
	refCtx.restore();
	refCtx.fillRect(60, 60, 30, 30);

	assert.imageEqual(testCanvas, refCanvas);
});