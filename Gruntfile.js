module.exports = function(grunt){

	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		clean: ['./dist'],

		copy: {
		  main: {
		    files: [
		      // includes files within path and its sub-directories
		      {expand: true, src: ['./app/**'], dest: 'dist/'},
		    ],
		  },
		},

		ngconstant: {
			// Options for all targets
			options: {
				space: '  ',
				wrap: '"use strict";\n\n {\%= __ngModule %}',
				name: 'constantes',
			},
			// Environment targets
			development: {
				options: {
					dest: './app/js/constantes.js',
				},
				constants: {
			        //package: grunt.file.readJSON('config.json')
					ENV: {
						name: 'development',
						APIEndPoint: 'http://192.168.56.3/api.buenchico.xyz/public'
					}
				}
			},
			production: {
				options: {
					dest: './app/js/constantes.js'
				},
				constants: {
			        //package: grunt.file.readJSON('config.json')
					ENV: {
						name: 'production',
						APIEndPoint: 'http://api.buenchico.xyz/public'
					}
				}
			}
		},

		processhtml: {
			development: {
				options: {
		        	process: true,
			        data: {
						title: 'DEV BuenChico',
						message: 'Development',
						base: '/'
			        }
				},
				files: {
			        './dist/app/index.html': ['./app/index.html']
				}    
		    },
		    production: {
				options: {
		        	process: true,
		        	data: {
						title: 'BuenChico',
						message: 'Production',
						base: '/'
					}
				},
				files: {
			        './dist/app/index.html': ['./app/index.html']
				}    
			},
		},

		compress: {
			main: {
			    options: {
			      mode: 'zip',
			      archive: './dist/app.zip'
			    },
			    files: [{
			      expand: true,
			      src: ['./dist/app/**'],
			      //dest: './dist/'
			    }]
			}
		},
		
		watch:{
			files:['./app/','./app/*.*'],
			//files:['./dist/app/','./dist/app/*.*'],
  		},
  		
  		express: {
  			all: {
  				options:{
					port:4000,
					hostname:'0.0.0.0',
  					bases:['./app/','./app/**/*.*'],
  					//bases:['./dist/app/','./dist/app/**/*.*'],
				    livereload: true
  				}
			}
		},

  		open: {
		    all: {
		        path: 'http://0.0.0.0:4000/'
		    }
		}

	});
 
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-ng-constant');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');	
	grunt.loadNpmTasks('grunt-open');	

	grunt.registerTask('prod',[
		'ngconstant:production',
		'express',
		'clean',
		'copy',
		'processhtml:production',
		'compress',
		//'open',
		//'watch'
	]);
	
	grunt.registerTask('dev',[
		'ngconstant:development',
		'express',
		'clean',
		'copy',
		'processhtml:development',
		'open',
		'watch'
	]);

	grunt.registerTask('default',['dev']);
};