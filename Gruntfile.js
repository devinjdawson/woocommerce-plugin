/**
 * @license Copyright 2016 PayB.ee, MIT License 
 * see https://github.com/paybee/woocommerce-plugin/blob/master/LICENSE
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['dist'],
      dev: {
        src: ['/var/www/html/woocommerce/wp-content/plugins/bitpay-for-woocommerce/'],
        options: {
          force: true
        }
      }
    },
    compress: {
      build: {
        options: {
          archive: 'dist/bitpay-for-woocommerce.zip'
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**']
        }]
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/**.php', 'assets/js/**/**.*', 'assets/img/**/**.*', 'templates/**/**.*'],
            dest: 'dist/bitpay-for-woocommerce'
          },
          {
            expand: true,
            cwd: 'vendor/bitpay/php-client/src/',
            src: ['**/**.*'],
            dest: 'dist/bitpay-for-woocommerce/lib'
          },
          {
            src: 'readme.txt',
            dest: 'dist/bitpay-for-woocommerce/readme.txt'
          },
          {
            src: 'LICENSE',
            dest: 'dist/bitpay-for-woocommerce/license.txt'
          }
        ]
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'dist/bitpay-for-woocommerce',
          src: ['**/**'],
          dest: '/var/www/html/woocommerce/wp-content/plugins/bitpay-for-woocommerce/'
        }]
      }
    },
    cssmin: {
      build: {
        options: {
          banner: '/**\n * @license Copyright 2016 PayB.ee Inc., MIT License\n * see https://github.com/paybee/woocommerce-plugin/blob/master/LICENSE\n */'
        },
        files: {
          'dist/bitpay-for-woocommerce/assets/css/style.css': ['src/assets/css/**.css']
        }
      }
    },
    phpcsfixer: {
        build: {
            dir: 'src/'
        },
        options: {
            bin: 'vendor/bin/php-cs-fixer',
            diff: true,
            ignoreExitCode: true,
            level: 'all',
            quiet: true
        }
    },
    watch: {
      scripts: {
        files: ['src/**/**.*'],
        tasks: ['dev'],
        options: {
          spawn: false,
          atBegin: true
        },
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-php-cs-fixer');

  // Default task(s).
  grunt.registerTask('build', ['phpcsfixer', 'clean:build', 'cssmin:build', 'copy:build', 'compress:build']);
  grunt.registerTask('dev', ['build', 'clean:dev', 'copy:dev']);
  grunt.registerTask('default', 'build');

};

