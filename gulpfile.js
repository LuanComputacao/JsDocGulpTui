var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    jsdoc = require('gulp-jsdoc3'),
    pump = require('pump'),
    uglify = require('gulp-uglify');

var jsDocConfig = require('./jsdoc.json');

gulp.task('doc', function (cb) {
    gulp.src(['README.md'], {read: false})
        .pipe(jsdoc(jsDocConfig, cb));
});


gulp.task('compress', function (cb) {
  pump([
        gulp.src([
            jsDocConfig.source.include + '**/*.js',
            jsDocConfig.templates.default.staticFiles.include + 'scripts/**/*.js'
        ]),
        uglify(),
        gulp.dest(jsDocConfig.opts.destination + 'static/js/')
    ],
    cb
  );
});


gulp.task('watch', function() {
    var watcher = gulp.watch([jsDocConfig.source.include + '**/*.js', jsDocConfig.opts.tutorials + '**/*'], ['doc', 'compress']);

    watcher.on('change', function (event) {
        console.log('File: ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


gulp.task('default', function (cb) {
    runSequence('doc', 'compress', 'watch');
});