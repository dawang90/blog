var gulp = require('gulp');
var config = require('../config');
var revCollector = require('gulp-rev-collector');

gulp.task('html', function() {
    return gulp.src([config.paths.rev + '/html/**/*.json', config.paths.views])
        .pipe(revCollector())
        .pipe(gulp.dest(config.paths.dest + '/views'))
});