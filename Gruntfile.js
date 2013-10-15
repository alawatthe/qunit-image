/*global module:true */
module.exports = function (grunt) {
	'use strict';
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-lodashbuilder');
	grunt.loadNpmTasks('grunt-notify');


	grunt.registerTask('template', 'A simple task to convert HTML templates', function() {
		var template = grunt.file.read('src/qunit-image.hbs'),
			process = function(template) {
				var str = 'var template = function (data) {';

				str += "var p = [];"
				str += "p.push('" +
				template.replace(/[\r\t\n]/g, ' ')                                   // remove linebreaks etc.
								.replace(/\{\{!--[^\}]*--\}\}/g, '')                         // remove comments
								.replace(/\{\{#if ([^\}]*)\}\}/g, "');if(data.$1){p.push('") // opening if
								.replace(/\{\{\/if\}\}/g, "');}p.push('")                    // closing if
								.replace(/\{\{/g, "');p.push(data.")
								.replace(/\}\}/g, ");p.push('") +
				"');" +
				'return p.join("");}';

				return str;
			};

		grunt.file.write('src/template.js', process(template));
		grunt.log.writeln('template.js created successfully');
	});


	var banner = '/*! qunit-image v<%= pkg.version %> MathLib.de | MathLib.de/en/license */';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		

		concat: {
			qunit_image: {
				src: ['src/template.js', 'src/qunit-image.js'],
				dest: 'build/qunit-image.js',
				options: {
					banner: '// qunit-image.js is an QUnit addon for comparing images.\n' +
									'//\n' +
									'// ## Version\n' +
									'// v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>  \n' +
									'//\n' +
									'// ## License\n' +
									'// Copyright © <%= grunt.template.today("yyyy") %> Alexander Zeilmann  \n' +
									'// qunit-image.js is [licensed under the MIT license](<http://MathLib.de/en/license>)\n' +
									'//\n' +
									'// ## Documentation\n' +
									'// The source code is annotated using [Docco](https://github.com/jashkenas/docco "View Docco on GitHub")\n\n' +
									'(function () {\n',
					sepatator: '\n\n',
					footer: '})()'
				}
			}
		},

		// Testing
		qunit: {
			index: ['test/test.html', 'test/test.min.html']
		},

		
		// JS Linting
		jshint: {
			all: ['Gruntfile.js', 'src/qunit-image.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},


		// CSS Linting
		csslint: {
			qunit_image: {
				options: {
					csslintrc: '.csslintrc'
				},
				src: ['build/qunit-image.css']
			}
		},


		// JS Minification
		uglify: {
			qunit_image: {
				options: {
					banner: banner + '\n'
				},
				files: {
					'build/qunit-image.min.js': ['build/qunit-image.js']
				}
			}
		},


		// CSS Minification
		cssmin: {
			qunit_image: {
				options: {
					banner: banner
				},
				files: {
					'build/qunit-image.min.css': ['build/qunit-image.css']
				}
			}
		},


		// SCSS
		compass: {
			qunit_image: {
				options: {
					sassDir: 'src/',
					cssDir: 'build/',
					outputStyle: 'expanded',
					noLineComments: true
				}
			}
		},


		// Watch
		watch: {
			js: {
				files: ['src/qunit-image.js'],
				tasks: ['concat', 'uglify']
			},
			scss: {
				files: ['src/qunit-image.scss'],
				tasks: ['compass', 'cssmin', 'csslint']
			},
			hbs: {
				files: ['src/qunit-image.hbs'],
				tasks: ['template', 'concat', 'uglify']
			}
		},

		
		// Documentation
		docco: {
			qunit_image: {
				src: ['build/qunit-image.js'],
				options: {
					output: 'docs/'
				}
			},
			qunit_image_css: {
				src: ['src/qunit-image.scss'],
				options: {
					output: 'docs/'
				}
			}
		}

	});


	grunt.registerTask('default', ['template', 'concat', 'uglify']);
	grunt.registerTask('release', ['default', 'compass', 'cssmin', 'jshint', 'csslint', 'docco']);
};