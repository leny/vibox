'use strict'

module.exports = ( grunt ) ->

    grunt.initConfig
        coffee:
            modules:
                expand: true
                cwd: 'src/modules/'
                src: [ '*.coffee' ]
                dest: 'bin/modules/'
                ext: '.js'
                options:
                    bare: true
            binary:
                options:
                    bare: true
                    shebang: true
                files:
                    'bin/vibox.js': [ 'src/vibox.coffee' ]
        concat:
            options:
                banner: "#!/usr/bin/env node\n"
            dist:
                src: 'bin/vibox.js'
                dest: 'bin/vibox.js'
        jshint:
            options:
                jshintrc: '.jshintrc'
            bin:
                src: [ 'bin/**/*.js' ]
        watch:
            compile:
                files: [
                    'src/**/*.coffee'
                ]
                tasks: [
                    'coffee:modules'
                    'coffee:binary'
                    'concat'
                ]

    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-watch'

    grunt.registerTask 'default', [
        'coffee:modules'
        'coffee:binary'
        'concat'
        'jshint'
    ]

    grunt.registerTask 'compile', [
        'coffee:modules'
        'coffee:binary'
        'concat'
    ]
