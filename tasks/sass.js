var gulp = require('gulp');
var config = require('../config');
var sass = require('gulp-sass');
var revCollector = require('gulp-rev-collector');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');

var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'production' }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('sass', function(){
    return gulp.src([config.paths.rev + '/img/**/*.json', config.paths.static + '/css/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(revCollector())
        .pipe(gulpif(options.env === 'production',minifyCss({
            compatibility: 'ie8'
        })))
        .pipe(gulp.dest(config.paths.destStatic + '/css'))
        .pipe(rev())
        .pipe(rev.manifest('res-css.json'))
        .pipe(gulp.dest(config.paths.rev + '/html/css'))
});

