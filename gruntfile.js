module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat:{
      options:{
        separator:';\n',
          stripBanners:true,
        banner:'/*! <%=pkg.name %> -v<%= pkg.version %> -'+
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist:{
        src:[],
        dest:'public/javascripts/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist:{
        files:{
          'public/javascripts/<%= pkg.name %>.min.js': ['public/javascripts/<%= pkg.name %>.js']
        }
      }
      // build: {
      //   src: 'src/<%= pkg.name %>.js',
      //   dest: 'build/<%= pkg.name %>.min.js'
      // }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify']);

};
