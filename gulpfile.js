process.env.NODE_ENV = 'production';

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var babel = require('gulp-babel');
var newer = require('gulp-newer');
var change = require('gulp-change');
var path = require('path');

gulp.task('default', ['build']);

gulp.task('build', function(){
  return gulp.src([
    './package.json',
    './config/**',
    './lib/**',
    './shared/**',
    './server/**',
  ], { base: path.resolve('./') })
  .pipe(newer('./dist/'))
  .pipe(gulpIf(isPackageJson, change(modifyPackageJson)))
  .pipe(gulpIf(isJavaScript, babel()))
  .pipe(gulp.dest('./dist/'));
});

function isJavaScript(file) {
  var filePath = file.history[file.history.length - 1].replace(file.base, '').replace(/[\\\/]+/g, '/').replace(/^\//,'');
  return (/\.(js|jsx|es6)$/).test(filePath);
}

function isPackageJson(file) {
  var filePath = file.history[file.history.length - 1].replace(file.base, '').replace(/[\\\/]+/g, '/').replace(/^\//,'');
  return (/package.json$/).test(filePath);
}

function modifyPackageJson(content, done) {
  var pkg = JSON.parse(content);
  delete pkg.devDependencies;
  pkg.scripts = {
    "start": "cross-env NODE_ENV=production node ./server/index.js",
    "prestart": "npm install"
  }
  done(null, JSON.stringify(pkg, null, 2) + '\n');
}
