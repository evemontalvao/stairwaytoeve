var gulp = require('gulp'); 
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-clean-css');
var jsonlint = require('gulp-jsonlint');

var src = {
	watch: "dev/assets/css/**/*.scss",
	css: "dev/assets/css/main.scss",
	js: "dev/assets/js/**/*.js",
	json: "dev/assets/js/*.json",
	html: "dev/*.html",
	img: "dev/assets/img/**/*"
}

var dist = { 
	css: "public/assets/css/",
	js: "public/assets/js/",
	html: "public/",
	img: "public/assets/img"
}

gulp.task('json', function(){
	gulp.src(src.json)
	.pipe(jsonlint())
	.pipe(jsonlint.reporter())
	.pipe(gulp.dest(dist.js));
});


gulp.task('html', function(){
	gulp.src(src.html)
	.pipe(gulp.dest(dist.html));
});

gulp.task('img', function(){
	gulp.src(src.img)
	.pipe(gulp.dest(dist.img));
});

gulp.task('js', function() {
	gulp.src(src.js)
	.pipe(uglify())
	.pipe(gulp.dest(dist.js));
});

gulp.task('sass', function() {
	gulp.src(src.css)
	.pipe(sass())
	.pipe(minify({compatibility: 'ie8'}))
	.pipe(gulp.dest(dist.css));
})

gulp.task('watch', function() {
    gulp.watch(src.js, ['js']);
    gulp.watch(src.watch, ['sass']);
    gulp.watch(src.html, ['html']);
    gulp.watch(src.json, ['json']);
    gulp.watch(src.img, ['img']);
});

gulp.task('default', ['sass','js','watch', 'html', 'json','img']);


