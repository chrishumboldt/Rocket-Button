module.exports = function(grunt) {

	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
	
	// Initialize config
	grunt.initConfig({
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// SASS
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/buttonplate.css': 'sass/buttonplate.scss'
				}
			}
		}, 
		// End of SASS
		// Uglify
		uglify: {
			my_target: {
				files: {
					'js/min/jquery-v1.10.2.min.js'			: ['js/jquery-v1.10.2.js'],
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