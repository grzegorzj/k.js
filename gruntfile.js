module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      files: ["js/*.js", "gruntfile.js"],
      options: {
        globals: {
          jQuery: true,
          underscore: false
        }
      }
    },

    browserify: {
      dist: {
        files: {
          "build/client.js": ["src/**.js"]
        },
        options: {
          transform: ["brfs"]
        }
      },

      dev: {
        files: {
          "build/client.js": ["src/**.js"]
        },
        options: {
          transform: ["brfs"],
          watch: true,
          keepAlive: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-browserify");

  grunt.registerTask("default", ["jshint", "browserify:dist"]);
  grunt.registerTask("dev", ["jshint", "browserify:dev"]);
};