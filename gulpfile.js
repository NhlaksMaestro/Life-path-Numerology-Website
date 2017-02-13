var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpCopy = require('gulp-copy');
var gulpCean = require('gulp-clean');
var gulpFlatten = require('gulp-flatten');
var gulpConcat = require('gulp-concat');

gulp.task('clean', function () {
    return gulp.src(['css/sass/vendor', 'js/vendor', 'fonts'], { read: false })
        .pipe(gulpCean());
});

gulp.task('move-app-sass', function () {
    gulp.src('./app/**/*.scss')
        .pipe(gulpFlatten())
        .pipe(gulp.dest('./css/sass/app'));
});

gulp.task('app-js', function () {
    gulp.src('./app/**/*.js')
        .pipe(gulpConcat('app.js'))
        .pipe(gulpFlatten())
        .pipe(gulp.dest('./js'));
});

gulp.task('move-vendor-sass', function () {
    gulp.src(['bower_components/bootstrap-sass/assets/stylesheets/**/*',
        'bower_components/font-awesome-sass/assets/stylesheets/**/*',
        'bower_components/angular-bootstrap-datetimepicker/src/scss/*'])
    .pipe(gulp.dest('./css/sass/vendor'));
});

gulp.task('move-vendor-fonts', function () {
    gulp.src(['bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
        'bower_components/font-awesome-sass/assets/fonts/font-awesome/*'])
    .pipe(gulp.dest('./fonts'));
});

gulp.task('vendor-js', function () {
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-ui-router/release/*.js',
        'bower_components/moment/moment.js',
        'bower_components/angular-bootstrap/ui-bootstrap.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/bootstrap-ui-datetime-picker/dist/*.js'])
        .pipe(gulpConcat('vendor.js'))
        .pipe(gulpFlatten())
        .pipe(gulp.dest('./js'));
});

gulp.task('site-css', function () {
    gulp.src('css/sass/styles.scss')
    .pipe(gulpSass())
    //.pipe(gulpSass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', ['site-css', 'app-js'], function () {
    gulp.watch('css/sass/**/*.scss', ['site-css']);
    gulp.watch('./app/**/*.js', ['app-js'])
});
