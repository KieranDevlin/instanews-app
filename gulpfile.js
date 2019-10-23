const gulp = require("gulp"),
    terser = require("gulp-terser"),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync"),
    eslint = require("gulp-eslint");

gulp.task("lint", function () {
    return gulp
        .src("./js/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

});

gulp.task("scripts",
    gulp.series("lint",
        function scripts() {
            return gulp
                .src("./js/*.js")
                .pipe(terser())
                .pipe(rename({ extname: ".min.js" }))
                .pipe(gulp.dest("./build/js"));
        })
);

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["*.html", "css/*.css", "build/js/*.js"])
        .on("change", browserSync.reload);
});

gulp.task("watch", function () {
    gulp.watch("js/*.js", gulp.series("scripts"));
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));