module.exports = function(grunt) {

	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass', 'uglify']);
	
	// Initialize config
	grunt.initConfig({
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// SASS
		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'auto'
				},
				files: {
					'css/buttonplate.css': 'sass/buttonplate.scss',
					'css/demo.css': 'sass/demo.scss'
				}
			}
		}, 
		// Uglify
		uglify: {
			my_target: {
				files: {
					'js/min/jquery-v1.10.2.min.js'			: ['js/jquery-v1.10.2.js'],
					'js/min/modernizr-custom-v2.8.3.min.js'	: ['js/modernizr-custom-v2.8.3.js'],
					'js/min/buttonplate.min.js'				: ['js/buttonplate.js']
				}
			}
		},
		// Watch
		watch: {
			// CSS
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			// End of CSS
			// Scripts
			scripts: {
				files: 'js/*.js',
				tasks: ['uglify']
			},
			// End of scripts
			// Live reload
			options: {
				livereload: true,
		    } 
		    // End of live reload
		} 
		// End of watch
	});
	// End of initialize config
}