# qunit-image
qunit-image is an QUnit addon for comparing images and canvas elements.
It features various comparison modes and easy customization.
See it in action on the [test page](http://mathlib.de/en/test) for my mathematical JavaScript library.



## Using qunit-image

### In the browser
Download the [qunit-image.js](https://raw.github.com/alawatthe/qunit-image/master/build/qunit-image.min.js) and the [qunit-image.css](https://raw.github.com/alawatthe/qunit-image/master/build/qunit-image.min.css) files.

In the head of your web page:
```
<link rel="stylesheet" href="http://code.jquery.com/qunit/qunit-1.12.0.css" type="text/css">
<link rel="stylesheet" href="path/to/qunit-image.min.css" type="text/css">
```

And at the end of the body
```
<script src="http://code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script src="path/to/qunit-image.min.js"></script>
<script>
// Your tests...
asyncTest('Compare canvas and reference image', 1, function (assert) {
	assert.imageEqual(canvas, 'reference.jpg');
});
</script>
```

### With grunt
You don't have to do anything special to use qunit-image with grunt.
But remember that you have to head over to a browser for a visual comparison.





## Contributing

### Getting qunit-image

Open your Terminal, clone qunit-image

```
git clone git://github.com/alawatthe/qunit-image.git
```

Enter the directory
```
cd qunit-image
```

and run
```
npm install
```
to install the development dependencies (For this you need to have [Node.js](http://nodejs.org) installed).




### Making Changes

Run
```
grunt watch
```
to watch for changes.

Now you are ready to start editing.
The three files you are probably mostly interested in are located in the __src__ folder.
* __qunit-image.js__ handles the JavaScript logic and does all the testing.
* __qunit-image.scss__ the style definitions for the output.
* __qunit-image.hbs__ the HTML template for the output.

Don't make changes to the template.js file and the files in the build and docs directory as they are generated automatically via grunt.

Please maintain the current coding style and stick to the [style guide](http://mathlib.de/en/meta/styleguide).




### Making pull requests

I'm very happy to see your pull requests, but please follow these few simple steps:
* [Open a new issue](https://github.com/alawatthe/qunit-image/issues/new) to discuss the changes with me (you don't need to do this for minor edits e.g. fixing typos).
* Run ```grunt release``` to make sure the JSHint and CSSLint don't raise any errors and to recreate the documentation.
* Make the pull request.
* That's it. Thanks for contributing to qunit-image.





## Alternatives

There are several alternatives out there, including:
* [Resemble.js](https://github.com/Huddle/Resemble.js) Analyse and compare images with JavaScript and HTML5. Includes an option to ignore antialiasing.
* [Image Match](https://github.com/tcorral/IM.js/): Project to allow compare different images pixel by pixel.
* [js-imagediff](https://github.com/HumbleSoftware/js-imagediff/) JavaScript / Canvas based imagediff utility. Available through npm, Jasmine integration.



## License
Copyright © 2013 Alexander Zeilmann  
Licensed under the MIT license.