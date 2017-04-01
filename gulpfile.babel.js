// import necessary modules
import del from "del";
import gulp from "gulp";
import babel from "gulp-babel";
import jasmine from "gulp-jasmine";

const build = () => gulp.src("src/tpb-api.js").pipe(babel()).pipe(gulp.dest("build"));
const test = () => gulp.src("test/test.js").pipe(jasmine());

gulp.task("clean", () => del(["build"]));

gulp.task("build", ["clean"], build);

gulp.task("watch", ["build"], () => gulp.watch("src/tpb-api.js", ["build"]));

gulp.task("default", ["clean"], build);

gulp.task("test", test);
