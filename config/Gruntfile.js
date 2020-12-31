module.exports = function(grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    browserify: {
      dev: {
        files: {
          'src/index.js': ['js/index.jsx'],
        },
        options: {
          transform: ['babelify', 'reactify'],
        },
      },
    },
    watch: {
      src: {
        files: ['js/**/*.js', 'js/**/*.jsx', '!src/index.js'],
        tasks: ['browserify:dev'],
        options: {
          livereload: true,
        },
      },
    },
    connect: {
      dev: {
        options: {
          hostname: 'localhost',
          port: 8080,
          open: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('build:dev', ['browserify', 'connect', 'watch']);
  grunt.registerTask('default', 'browserify');
};
