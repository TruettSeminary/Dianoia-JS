var gulp = require('gulp'); 
var babel = require('gulp-babel'); 
var del = require('del'); 


var paths = {
    src : 'src/**/*.js',
    dest: 'dist'
}; 


gulp.task('default', () => {
    console.log('Gulp is running'); 
    gulp.start('babel');
}); 

gulp.task('clean', () => {
    return del([paths.dest+'/**/*.js']);
});

gulp.task('watch-full', () => {
    gulp.watch(paths.src, ['default']); 
}); 


// Transpile source for distribution
gulp.task('babel', ['clean'], () => {
    gulp.src(paths.src)
        .pipe(babel())
        .pipe(gulp.dest(paths.dest)); 
});


