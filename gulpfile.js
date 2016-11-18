var gulp = require('gulp');
var requireDir = require('require-dir');
var dir = requireDir('./tasks');
var nodemon= require('gulp-nodemon');
var jshint = require('gulp-jshint');

var jshintConfig = {
    "undef": true,
    "unused": true,
    'script': false,
    'esversion':6,
    "predef": [ "MY_GLOBAL" ]
};

gulp.task('lint', function() {
    gulp.src('./**/**.js')
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter('default'));
});

gulp.task('build', function() {
    gulp
});

gulp.task('develop', ['build'], function() {
    var stream = nodemo({
        'script': 'app.js',
        'ignore': [
            'jade',
            'node_modules/',
            'views/',
            '.git',
            'public/',
            'views/',
            'tasks/'
        ],
        //tasks: [
        //    'lint'
        //],
        'execMap': {
            'js': 'node --harmony-async-await'
        },
        'env': {
            'NODE_ENV': 'development',
            'PORT': '8080'
        },
        'width': ['src'],
        'ext': 'js',
        'legacy-watch': false
    });

    stream
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('crash', function() {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10)  // restart the server in 10 seconds
        })

});