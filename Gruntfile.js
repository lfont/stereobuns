module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      source: [
        './public/components/bootstrap/docs/assets/js',
        './public/components/bootstrap/docs/build',
        './public/components/angular-ui-bootstrap/misc',
        './public/components/requirejs/tests'
      ],
      build: [
        './public-build/components',
        './public-build/templates'
      ],
      'build-temp': [
        './public-build/temp'
      ]
    },

    copy: {
      'build-temp': {
        files: [
          {
            expand: true,
            flatten: true,
            src: [ './public-build/components/font-awesome/font/*' ],
            dest: './public-build/temp/font-awesome/'
          },
          {
            expand: true,
            flatten: true,
            src: [ './public-build/components/requirejs/require.js' ],
            dest: './public-build/temp/requirejs/'
          },
          {
            expand: true,
            flatten: true,
            src: [ './public-build/components/soundmanager/swf/*' ],
            dest: './public-build/temp/soundmanager/'
          }
        ]
      },
      build: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [ './public-build/temp/font-awesome/*' ],
            dest: './public-build/components/font-awesome/font/'
          },
          {
            expand: true,
            flatten: true,
            src: [ './public-build/temp/requirejs/require.js' ],
            dest: './public-build/components/requirejs/'
          },
          {
            expand: true,
            flatten: true,
            src: [ './public-build/temp/soundmanager/*' ],
            dest: './public-build/components/soundmanager/swf/'
          }
        ]
      }
    },

    requirejs: {
      compile: {
        options: {
          appDir: './public',
          baseUrl: 'js',
          dir: './public-build',
          keepBuildDir: false,
          mainConfigFile: './public/js/main.js',
          optimize: 'uglify2',
          optimizeCss: 'standard',
          cssImportIgnore: 'http://fonts.googleapis.com/css?family=Carme',
          removeCombined: true,
          preserveLicenseComments: false,
          modules: [
            {
              name: 'main'
            }
          ],
          done: function (done, output) {
            var duplicates = require('rjs-build-analysis').duplicates(output);

            if (duplicates.length > 0) {
              grunt.log.subhead('Duplicates found in requirejs build:');
              grunt.log.warn(duplicates);
              done(new Error('r.js built duplicate modules, please check the excludes option.'));
            }

            done();
          }
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          watchedExtensions: [ 'js' ],
          watchedFolders: [ 'lib', 'models', 'routes' ],
          debug: true,
          delayTime: 1,
          env: {
            PORT: '3000'
          },
          cwd: __dirname
        }
      }
    },

    watch: {
      assets: {
        files: [ 'public/**/*.js', 'public/**/*.css', 'public/**/*.html' ],
        options: {
          livereload: true
        }
      }
    },

    concurrent: {
      dev: {
        tasks: [ 'nodemon:dev', 'watch:assets' ],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task(s).
  grunt.registerTask('default', [ 'concurrent:dev' ]);

  grunt.registerTask('build', [
    'clean:source',
    'requirejs',
    'copy:build-temp',
    'clean:build',
    'copy:build',
    'clean:build-temp'
  ]);
};
