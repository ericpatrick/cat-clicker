const gulp = require("gulp");
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const rename = require("gulp-rename");
const inline = require('gulp-inline');
const uglify = require('gulp-uglify');
const cssmin = require("gulp-cssmin");

gulp.task("image-optimization", function () {
  return gulp.src("img/*")
    .pipe(imageResize({
      quality: 0.5
    }))
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

gulp.task("compile-css-js", function() {
  return gulp.src("index.html")
    .pipe(inline({
      css: cssmin,
      js: uglify,
      disabledTypes: ["svg", "img"]
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task("default", function() {
  gulp.run("image-optimization", "compile-css-js");
})