const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const imgagemin = require('gulp-imagemin');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const modRewrite = require('connect-modrewrite');
const open = require('gulp-open');
const configRevReplace = require('gulp-requirejs-rev-replace')
const tmodjs = require('gulp-tmod');
const replace = require('gulp-replace');
console.log('evn', process.env.xx);

// gulp4.0 注册一个任务的时候，直接可以把一个方法注册成为一个任务
function html() { //接受一个回调函数作为参数，此回调函数执行后，告诉gulp当前任务执行完成
   //把src目录下面html，复制到dist目录，替换css版本，js版本也得替换
   //html进行压缩
   return gulp.src(['./src/index.html', './src/view/**/*.html', './src/style/rev-manifest.json', './src/js/rev-manifest.json'], {
         base: './src/',
         allowEmpty: true
      })
      .pipe(revCollector({
         replaceReved: true
      }))    
      .pipe(htmlmin({
         removeComments: true, // 清除HTML注释
         collapseWhitespace: true, // 压缩HTML
         // collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
         removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
         removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
         removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
         minifyJS: true, // 压缩页面JS
         minifyCSS: true // 压缩页面CSS
      })) //压缩html
      .pipe(gulp.dest('./dist/'))
}

// 开发环境
// 可以指定当前的任务（函数任务）的名字
//1.进行样式的预处理（sass-css）
//2.代码进行合并,排除掉已经合并的main.css文件
//3.sourcemap
//4.给css3的样式打上自动前缀
//5.压缩css
//6.给main.css打上版本号
function style() {
   return gulp.src(['./src/style/**/*.{scss,css}', '!./src/style/main.css'], { allowEmpty: true})
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
         overrideBrowserslist: ['>0.1% in CN'], //支持的浏览器的版本
         cascade: true //设定最终生成的css的样式
      }))
      .pipe(concat('main.css'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./src/style/'))
}
gulp.task(style);


// 生产环境
function stylePro() {
   return gulp.src(['./src/style/**/*.{scss,css}', '!./src/style/main.css'], {allowEmpty: true})
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
         overrideBrowserslist: ['>0.1% in CN'], //支持的浏览器的版本
         cascade: false //设定最终生成的css的样式
      }))
      .pipe(concat('main.css'))
      .pipe(cleanCss({
         // 压缩css
         compatibility: 'ie8', //兼容IE8
         // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
         keepSpecialComments: '*'
      }))
      .pipe(rev()) //给main.css生成版本的映射的文件
      .pipe(gulp.dest('./dist/style/'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./src/style/')) //把映射文件存到src
}
// 清理dist目录下的所有的css文件
function cleanDist() {
   return gulp.src(['/dist/**/*.*'], {
         read: false,
         allowEmpty: true
      })
      .pipe(clean());
}

// 注册一个任务，串行的执行html style：pro
// gulp.series帮助我们顺序（串行）执行多个任务的能力
// 注册一个任务，并执行多个任务
// 实现从src/assets/下所有的文件都拷贝到 dist/下面的assets
function copy() {
   // task方法：接受一个cb回调函数，在任务结束的时候执行以下cb回调函数
   // 方法：可以返回一个流
   // 方法：返回一个promise也可以
   return gulp.src(['src/lib/**/*.*', 'src/assets/**/*.*'], {
         base: 'src/',
         allowEmpty:true
      }) //node 一个流 pipe
      .pipe(gulp.dest('dist/')); //gulp.dest:把所有问键保存到xxx地方去
}
// 图片进行压缩处理的方法
function imgMin() {
   return gulp.src(['./src/assets/img/**/*.{jpeg,jpg,ico,png}'])
      .pipe(imgagemin({
         optimizationLevel: 5, // 类型：Number  默认：3  取值范围：0-7（优化等级）
         progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
         interlaced: true,
         // 类型：Boolean 默认：false 隔行扫描gif进行渲染
         multipass: true // 类型：Boolean
         // 默认：false 多次优化svg直到完全优化
      }))
      .pipe(gulp.dest('./dist/assets/img/'))
}

// eslint=>进行代码格式规范校验(es6,js,jsx),辅助我们进行格式化=>团队代码规范的强制性工具
// es6转码es5
// 代码进行压缩
// js打上版本号
function js() {
   return gulp.src(['./src/js/**/*.js'])
      .pipe(eslint())
      .pipe(
         eslint.results(results => {
            // Called once for all ESLint results.
            console.log(`JS总校验文件: ${results.length}`);
            console.log(`JS警告个数：: ${results.warningCount}`);
            console.log(`JS错误个数: ${results.errorCount}`);
         })
      )
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(babel({
         presets: ['@babel/env']
      }))
      .pipe(uglify()) //進行壓縮 
      .pipe(rev())
      .pipe(gulp.dest('./dist/js/'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./src/js/')) //把映射文件存到src
}

// 给requirejs引用的文件修改版本号的路径
function revjs() {
   return gulp
      .src('./dist/js/**/*.js', { allowEmpty: true})
      .pipe(configRevReplace({
         manifest: gulp.src('./src/js/rev-manifest.json', { allowEmpty: true})
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/'));
}

//#region 开发测试服务器
// 配置测试服务器
function devServer(cb) {
   let root = process.env.mode === 'dist' ? './dist' : './src';
   let port = process.env.mode === 'dist' ? 38901 : 38900;
   connect.server({
      root: [root], // 网站根目录
      port: port, // 端口
      livereload: true,
      middleware: function (connect, opt) {
         return [modRewrite([ // 设置代理
            '^/api/(.*)$ http://192.168.1.130:8888/api/$1 [P]'
         ])];
      },
   });
   cb();
}

// 启动浏览器打开地址
function openBrowser() {
   let strPort = process.env.mode === 'dist' ? '38901' : '38900';
   return gulp
      .src(__filename)
      .pipe(open({
         uri: 'http://localhost:' + strPort + '/view/login.html'
      }));
}
//#endregion 

//#region dist 测试服务器配置
// 配置测试服务器
function distServer(cb) {
   connect.server({
      root: ['./dist'], // 网站根目录
      port: 38901, // 端口
      livereload: true,
      middleware: function (connect, opt) {
         return [modRewrite([ // 设置代理
            '^/api/(.*)$ http://localhost:4000/$1 [P]'
         ])];
      },
   });
   cb();
}

// 启动浏览器打开地址
function openBrowserDist() {
   return gulp
      .src(__filename)
      .pipe(open({
         uri: 'http://localhost:38900/view/login.html'
      }));
}
//#endregion

function tpl() {
   return gulp
      .src('src/template/**/*.html')
      .pipe(tmodjs({
         templateBase: 'src/template/',
         runtime: 'tpl.js',
         compress: false
      }))
      // 自动生成的模板文件，进行babel转换，会报错，此转换插件已经停更，所以间接改这个bug
      // 参考bug：https://github.com/aui/tmodjs/issues/112 主要是this  →  window
      .pipe(replace('var String = this.String;', 'var String = window.String;'))
      .pipe(gulp.dest('src/js/tmpl/'));
}
gulp.task('tpl', tpl);

// 开发相关的任务
// 1.监听sass的变化，自动编译sass
// 2.自动执行打开浏览器，启动server
gulp.task('dev', gulp.series(devServer, openBrowser, tpl, function () {
   gulp.watch(['./src/style/sass/**/*.scss', './src/style/css/**/*.css'], gulp.series(style));
   gulp.watch(['./src/template/**/*.html'], gulp.series(tpl));
}))

// 第一个参数：任务的名字，第二个参数是具体要执行的任务
gulp.task('default', gulp.series( tpl, gulp.parallel(js, stylePro), revjs, copy, html, devServer, openBrowser));