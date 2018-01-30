let gulp = require('gulp')
let through = require('through2')
let my_task = require('./my-gulp-task')
gulp.task('router', function () {
  console.log("router")
  gulp.src('src/pages/**/*.*')
    .pipe(function(){
      return through.obj(function (file, enc, cb) {
        my_task.init_file()
        this.push(file) // 似乎需要push一下，不然后续的pipe不会处理这个文件？
        return cb()
      })
    }());
})
gulp.task('watch', function () {
  gulp.watch('src/pages/**/*.*', ['router'])
})
gulp.task('default', ['watch'])
