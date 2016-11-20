var gulp = require('gulp');
var config = require('../config');
var sass = require('gulp-sass');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var minimist = require('minimist');

var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'production' }
};

var options = minimist(process.argv.slice(2), knownOptions);
var isProduction = options.env === 'production';

gulp.task('sass', function(){
    return gulp.src([config.paths.rev + '/img/**/*.json', config.paths.static + '/css/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(revCollector())
        .pipe(gulpif(isProduction, minifyCss({
            compatibility: 'ie8'
        })))
        .pipe(rev())
        .pipe(gulp.dest(config.paths.destStatic + '/css'))
        .pipe(rev.manifest('res-css.json'))
        .pipe(gulp.dest(config.paths.rev + '/html/css'))
});

