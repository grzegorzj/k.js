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
          "build/client.js": ["js/**.js"],
          "example/example.build.js": ["example/"]
        },
        options: {
          transform: ["brfs"]
        }
      },

      dev: {
        files: {
          "build/client.js": ["js/**.js"]
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