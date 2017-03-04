var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');
// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('source/**/*');
});
// TypeScript compile
gulp.task('compile', ['clean'], function () {
    return gulp
        .src('app/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('source/app'));
});
gulp.task('copy:libs', ['clean'], function () {
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js'
    ])
        .pipe(gulp.dest('source/lib'));
});
gulp.task('copy:assets', ['clean'], function () {
    return gulp.src(['app/**/*', 'index.html', 'styles.css', '!app/**/*.ts'], { base: './' })
        .pipe(gulp.dest('source'));
});
gulp.task('build', ['compile']);
gulp.task('default', ['build']);
//# sourceMappingURL=gulp.js.map