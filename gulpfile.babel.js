/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import del from 'del';
import webpack from 'webpack-stream';
import flow from 'gulp-flowtype';
import webpackConfig from './webpack.config.babel';

const paths = {
  srcFile: 'src/**/*.js?(x)',
  testFile: 'lib/test/**/*.js?(x)',
  mainFile: 'src/main/client/app.js',
  bundleFile: 'dist/client-bundle.js?(.map)',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
};

gulp.task('lint', () =>
  gulp.src([
    paths.srcFile,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(flow({ abort: true })),
);

gulp.task('clean', () => del([
  paths.libDir,
  paths.bundleFile,
]));

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.srcFile)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir)),
);

gulp.task('test', ['build'], () =>
  gulp.src(paths.testFile)
    .pipe(mocha()),
);

gulp.task('main', ['test'], () =>
  gulp.src(paths.mainFile)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir)),
);

gulp.task('watch', () => {
  gulp.watch(paths.srcFile, ['main']);
});

gulp.task('default', ['watch', 'main']);
