const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');


const dist = () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
};

const indexUMD = () => {
    return gulp.src('index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
};

const watch = () => {
    gulp.watch('src/**/*.js', dist);
    gulp.watch('index.js', indexUMD);
};

gulp.task('indexUMD', indexUMD);
gulp.task('dist', dist);
gulp.task('watch', watch);