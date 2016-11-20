var gulp = require('gulp');
var requireDir = require('require-dir');
var dir = requireDir('./tasks');
var nodemon= require('gulp-nodemon');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var config = require('./config');

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

gulp.task('nodeLint', function(){
    gulp.src([config.paths.src + '/config/**/*.js'])
    .pipe(gulp.dest(config.paths.dest + '/config'));
    gulp.src([config.paths.src + '/lib/**/*.js'])
    .pipe(gulp.dest(config.paths.dest + '/lib'));
    gulp.src([config.paths.src + '/middlewares/**/*.js'])
    .pipe(gulp.dest(config.paths.dest + '/middlewares'));
    gulp.src([config.paths.src + '/routes/**/*.js'])
    .pipe(gulp.dest(config.paths.dest + '/routes'));
    gulp.src([config.paths.src + '/socket/**/*.js'])
    .pipe(gulp.dest(config.paths.dest + '/socket'));
    gulp.src([config.paths.src + '/models/**/*.js'])
    .pipe(gulp.dest(config.paths.dest + '/models'));
    gulp.src([config.paths.src + '/*.js'])
    .pipe(gulp.dest(config.paths.dest));
});

gulp.task('build', function(callback) {
    runSequence(['nodeLint'], ['sass'], ['html']);
});

gulp.task('watcher', function(callback){
    gulp.watch(config.paths.static + '/**/*.*', ['build']);
});

gulp.task('runkoa', function(){
        var stream = nodemon({
            'script': './app.js',
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
})

gulp.task('develop', function() {
    runSequence(['build'], ['watcher'], ['runkoa']);
});