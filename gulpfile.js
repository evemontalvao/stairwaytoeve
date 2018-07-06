const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const pxtorem = require('postcss-pxtorem');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const include = require('gulp-file-include');
const watch = require('gulp-watch');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

const srcDir = `${process.cwd()}/src`;
const distDir = `${process.cwd()}/public`;

const cssNanoConfig = {
	zindex: false,
	minifyFontValues: false,
	discardUnused: {fontFace: false},
	autoprefixer: ['last 2 versions', 'IE >= 9']
}

const sources = {
	watchCss: `${srcDir}/**/*.scss`,
	watchHtml: `${srcDir}/**/*.html`,
	styles: `${srcDir}/_assets/styles/**/*.scss`,
	js: `${srcDir}/_assets/js/**/*.js`,
	html: `${srcDir}/view/*.html`
}

const dist = {
	styles: `${distDir}/assets`,
	js: `${distDir}/styles`,
	html: `${distDir}/pages`
}

gulp.task('sass', () => {
	return gulp.src(sources.styles)
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('stairwaytoeve.min.css'))	
	.pipe(postcss([
		pxtorem(),
		autoprefixer(cssNanoConfig),
		cssnano()
		]))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest(dist.styles));
});

gulp.task('html', () => {
	return gulp.src(sources.html)
	.pipe(include({
		prefix: '@',
		basepath: `${process.cwd()}/src/view/`
	}))
	.pipe(gulp.dest(dist.html))
});

gulp.task('copy', function () {
	gulp.src('src/fonts/*', { base: 'src' }).pipe(gulp.dest('./public/'));
	gulp.src('src/images/*', { base: 'src' }).pipe(gulp.dest('./public/'));
});

gulp.task('serve', ['html', 'sass'], () => {
	browserSync.init({
		open: false,
		port: 3000,
		notify: true,
		proxy: 'http://localhost:2107'
	});
	gulp.watch('./src/fonts/*', ['copy']).on('change', browserSync.reload);
	gulp.watch('./src/images/*', ['copy']).on('change', browserSync.reload);
	gulp.watch('./src/view/**/*.html', ['html']).on('change', browserSync.reload);
	gulp.watch('./src/styles/**/*.scss', ['sass']).on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'html', 'copy'])
