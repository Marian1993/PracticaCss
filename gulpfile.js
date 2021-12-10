const validate = require('gulp-w3c-css');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const { series } = require('gulp');


function validadorCSS() {
  gulp.src('./css/*.css')
    .pipe(validate())
    .pipe(gulp.dest('./build'));
}

function watchCSS() {
  gulp.watch('./css/*.css', validadorCSS);
}

function watchSass() {
  gulp.watch("./sass/*.scss", compiladorSass);
}

function compiladorSass() {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}
function comprSass() {
  return gulp.src('./sass/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}
function comprHtml(){
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
}
function comprImg(){
  return gulp.src('./img/**/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}

exports.css = validadorCSS;
exports.watch = watchCSS;
exports.compSass = compiladorSass;
exports.watchSass = watchSass;
exports.comprCss = comprSass;
exports.comprHtml = comprHtml;
exports.comprImg = comprImg;
exports.build = series(comprSass,comprHtml,comprImg);



