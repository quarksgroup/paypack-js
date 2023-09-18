const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');


const build = () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'));
};

const indexUMD = () => {
    return gulp.src('index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('build'));
};

const watch = () => {
    gulp.watch('src/**/*.js', build);
    gulp.watch('index.js', indexUMD);
};

gulp.task('indexUMD', indexUMD);
gulp.task('build', build);
gulp.task('watch', watch);