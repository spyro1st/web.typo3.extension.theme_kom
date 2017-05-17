var Promise = require('es6-promise').Promise;
var path = require('path');
var gulp = require('gulp');
var plumber = require('gulp-plumber'); // not compatible with gulp-load-plugins, so require it separately
var gulpFilter = require('gulp-filter'); // not compatible with gulp-load-plugins, so require it separately
var plugins = require('gulp-load-plugins')();
var postcss = require('gulp-postcss');
var postcssFlexbugsFixes = require('postcss-flexbugs-fixes');


// Settings

var notifyInfo = {
	title: 'Gulp',
	icon: path.join(__dirname, 'gulp.png')
};

var plumberErrorHandler = {
	errorHandler: plugins.notify.onError({
		title: notifyInfo.title,
		icon: notifyInfo.icon,
		message: "Error: <%= error.message %>"
	})
};

var options = {
	autoprefixer: {
		browsers: ["last 4 versions"]
	},
	sass: {
		errLogToConsole: true,
		outputStyle: 'expanded'
	},
	scsslint: {
		config: 'Resources/Private/Sass/lint.yml',
		endless: false
	}
};


// Tasks

gulp.task('sass', function () {
	var processors = [
		postcssFlexbugsFixes()
	];
	gulp.src('./Resources/Private/Sass/styles.scss')
		.pipe(plumber(plumberErrorHandler))
		.pipe(plugins.sass(options.sass).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer(options.autoprefixer))
		.pipe(gulp.dest('./Resources/Public/Stylesheets/'))
		.pipe(gulpFilter('**/*.css'))
		.pipe(plugins.livereload());

});

gulp.task('svgmin', function () {
	gulp.src('./Resources/Private/Images/SVG/*.svg')
		.pipe(plugins.svgmin())
		.pipe(gulp.dest('./Resources/Public/Images/Frontend'));
});

gulp.task('imagemin', function () {
	gulp.src(['./Resources/Private/Images/**/*', '!./Resources/Private/Images/SVG/**/*.svg'])
		.pipe(plugins.imagemin())
		.pipe(gulp.dest('./Resources/Public/Images/Frontend'));
});

gulp.task('scripts', function () {
	gulp.src([
		'./Resources/Public/JavaScripts/jquery.touchSwipe.min.js',
		'./Resources/Private/Vendor/tether/dist/js/tether.js',
		'./Resources/Private/Vendor/bootstrap/dist/js/bootstrap.js',
		'./Resources/Private/Vendor/viewport-units-buggyfill/viewport-units-buggyfill.js',
		'./Resources/Public/JavaScripts/KandidatOMat.js'
	])
		.pipe(plumber(plumberErrorHandler))
		.pipe(plugins.concat('Scripts.js'))
		.pipe(gulp.dest('./Resources/Public/JavaScripts/'));
});

gulp.task('minify', function () {
	return gulp.src('./Resources/Public/Stylesheets/styles.css')
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest('./Resources/Public/Stylesheets/'));
});

gulp.task('uglify', function () {
	return gulp.src('./Resources/Public/JavaScripts/Scripts.js')
		.pipe(plugins.uglify())
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest('./Resources/Public/JavaScripts/'));
});

gulp.task('lint', function () {
	return gulp.src([
		'Resources/Private/Sass/**/*.scss',
		'!./Resources/Private/Vendor/bootstrap/scss/**/*.scss'
	])
		.pipe(plugins.cached('sass'))
		.pipe(plumber(plumberErrorHandler))
		.pipe(plugins.scssLint(options.scsslint))
		.pipe(plugins.scssLint.failReporter());
});

gulp.task('watch', ['sass', 'scripts'], function () {
	plugins.livereload.listen();
	gulp.watch('Resources/Private/Sass/**/*.scss', ['lint', 'sass']);
	gulp.watch('Resources/Public/JavaScripts/**/*.js', ['scripts']);
});

gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
gulp.task('build', ['sass', 'scripts', 'imagemin', 'svgmin']);
