/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = window.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('student/accordion',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,item=$data.item,j=$data.j,$out='';$each(data,function(val,index){
$out+='\r\n';
if(data[index].pid == 0){
$out+='\r\n<li class="content-content">\r\n   <div class="centent-t">';
$out+=$escape(val.name);
$out+='</div>\r\n   <ul class="centent-body">\r\n      ';
$each(data,function(item,j){
$out+='\r\n      ';
if(data[j].pid === data[index].id){
$out+='\r\n      <li class="centent-b" uid="';
$out+=$escape(item.id);
$out+='">';
$out+=$escape(item.name);
$out+='\r\n      </li>\r\n      ';
}
$out+='\r\n      ';
});
$out+='\r\n   </ul>\r\n</li>\r\n';
}
$out+='\r\n';
});
return new String($out);
});/*v:1*/
template('student/accordioner-middle',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,pagenum=$data.pagenum,$out='';$out+='<div class="accordioner-top">\r\n   <h3>共<span class="num-course">100</span>个课程</h3>\r\n   <!-- <p><span class="num-prev"></span><<span class="num-cur"></span>/<span class="num-all"></span> <span\r\n         class="num-next">></span></p> -->\r\n</div>\r\n<!-- 一个div的宽度 -->\r\n<div class="accordioner-middle">\r\n   ';
$each(data,function(val,index){
$out+='\r\n   <div class="middle-acc">\r\n      <div class="middle-a">\r\n         <div class="middle-acc-top"><img src="';
$out+=$escape(val.img);
$out+='" alt=""></div>\r\n         <div class="middle-acc-middle">';
$out+=$escape(val.title);
$out+='</div>\r\n         <div class="middle-acc-bottom"><span>';
$out+=$escape(val.author);
$out+=' </span> <span>';
$out+=$escape(val.college);
$out+='</span></div>\r\n      </div>\r\n   </div>\r\n   ';
});
$out+='\r\n</div>\r\n<div class="accordioner-bottom">\r\n   <h3>共<span class="num-course">';
$out+=$escape(pagenum);
$out+='</span>个课程</h3>\r\n   <div class="right-bot-l"></div>\r\n</div>\r\n      ';
return new String($out);
});/*v:1*/
template('student/bottom-nav','\r\n<div class="acrco-wrap">\r\n      Copyrignt@2004-2016哈尔滨工业大学出版社 版权所有 京ICP备11017824号-7\r\n   </div>');/*v:1*/
template('student/class-introduce',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,val=$data.val,$escape=$utils.$escape,$out='';$out+='<div class="top">\r\n   <div class="top-t">\r\n      <div class="blue"></div>\r\n      <span>课程介绍</span>\r\n   </div>\r\n   <div class="top-b">';
$out+=$string(val.textbook);
$out+='</div>\r\n</div>\r\n<hr>\r\n<div class="top">\r\n   <div class="top-t">\r\n      <div class="blue"></div>\r\n      <span>教师介绍</span>\r\n   </div>\r\n   <div class="top-b">';
$out+=$string(val.catalog);
$out+='</div>\r\n</div>\r\n<hr>\r\n<div class="top">\r\n   <div class="top-t">\r\n      <div class="blue"></div>\r\n      <span>课程目录</span>\r\n   </div>\r\n   <div class="top-b">\r\n      <p>第一课时: <span>';
$out+=$escape(val.title);
$out+='</span></p>\r\n      <p>第二课时: <span>';
$out+=$escape(val.title);
$out+='</span></p>\r\n      <p>第三课时: <span>';
$out+=$escape(val.title);
$out+='</span></p>\r\n      <p>第四课时: <span>';
$out+=$escape(val.title);
$out+='</span></p>\r\n   </div>\r\n</div>';
return new String($out);
});/*v:1*/
template('student/class-tit',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,val=$data.val,$out='';$out+='<div class="class-tit-left">\r\n   <img src="';
$out+=$escape(val.bgimg);
$out+='" alt=""><img>\r\n</div>\r\n<div class="class-tit-right">\r\n   <div class="class-tit-middle">\r\n      <div class="course-title-top">\r\n         <div class="course-title-top-t">\r\n            <h3>';
$out+=$escape(val.title);
$out+='</h3>\r\n            <p>课程邀请码:<span>';
$out+=$escape(val.invitecode);
$out+='</span></p>\r\n         </div>\r\n         <hr>\r\n         <div class="course-title-top-b">\r\n            <div class="course-title-top-b-l">\r\n               <p>任课教师:<span>';
$out+=$escape(val.author);
$out+='</span><span>';
$out+=$escape(val.college);
$out+='</span>\r\n               <p>报名权限: 所有用户都可以报名</p>\r\n            </div>\r\n            <div class="course-title-top-b-r">\r\n               <p>开课时间:<span>';
$out+=$escape(val.studytime);
$out+='</span></p>\r\n               <p>学生人数:<span>';
$out+=$escape(val.studycount);
$out+='</span></p>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <div class="course-title-bottom">\r\n         加入课程\r\n      </div>\r\n   </div>\r\n</div>';
return new String($out);
});/*v:1*/
template('student/classify','<ul class="classify-nav">\r\n   <li><a href="/view/stu/stu_shou.html">首页</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n   <li><a href="/view/stu/stu_list.html?id=1">课程</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n   <li><a href="">一级分类名称</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n   <li><a href="">二级分类名称</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n   <li>课程名称</li>\r\n</ul>');/*v:1*/
template('student/classifyaa','<ul class="classifyaa-nav">\r\n   <li><a href="/view/stu/stu_shou.html">首页</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n   <li><a href="/view/stu/stu_list.html?id=1">课程</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n   <li><a class="first-type" href="#">一级分类名称</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n   <li><a class="second-type" href="#"> 二级分类名称</a></li>\r\n</ul>');/*v:1*/
template('student/course-text',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,$out='';$out+='<div class="photo">\r\n  <div class="photo-list-wrap">\r\n    ';
$each(data,function(val,index){
$out+='\r\n    <div class="photo-item" uid="';
$out+=$escape(val.id);
$out+='">\r\n      <div class="img"><a href=""><img src="';
$out+=$escape(val.imgUrl);
$out+='" alt=""></a></div>\r\n      <p class="class-name">';
$out+=$escape(val.title);
$out+='</p>\r\n    </div>\r\n    ';
});
$out+='\r\n  </div>\r\n</div>';
return new String($out);
});/*v:1*/
template('student/course',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,$out='';$out+='<div class="photo">\r\n  <div class="photo-list-wrap">\r\n    ';
$each(data,function(val,index){
$out+='\r\n    <div class="photo-item" uid="';
$out+=$escape(val.id);
$out+='">\r\n      <div class="img"><a href="/view/stu/stu_list.html?id=';
$out+=$escape(val.id);
$out+='"><img src="';
$out+=$escape(val.img);
$out+='" alt=""></a></div>\r\n      <p class="class-name">';
$out+=$escape(val.title);
$out+='</p>\r\n    </div>\r\n    ';
});
$out+='\r\n  </div>\r\n</div>\r\n';
return new String($out);
});/*v:1*/
template('student/end_study',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,$out='';$each(data,function(val,index){
$out+='\r\n<div class="centent-centent">\r\n   <div class="centent-l">\r\n      <img src="';
$out+=$escape(val.bgimg);
$out+='" alt="">\r\n   </div>\r\n   <div class="centent-r">\r\n      <div class="centent-top">\r\n         <h3 class="top-title">';
$out+=$escape(val.title);
$out+='</h3>\r\n         <div class="top-tea">\r\n            <div class="top-a"><span>任课教师</span>&nbsp;<span>';
$out+=$escape(val.author);
$out+=' ';
$out+=$escape(val.college);
$out+='</span></div>\r\n            <div class="top-b"><span>邀请码</span>&nbsp;<span>';
$out+=$escape(val.invitecode);
$out+='</span></div>\r\n            <div class="top-c"><span>截止时间</span>&nbsp;<span>';
$out+=$escape(val.studytime);
$out+='</span></div>\r\n            <div class="top-d glyphicon glyphicon-user">&nbsp;<span>';
$out+=$escape(val.studycount);
$out+='</span></div>\r\n         </div>\r\n         <hr>\r\n      </div>\r\n   </div>\r\n</div>\r\n';
});
return new String($out);
});/*v:1*/
template('student/navigation','<div class="w-logo-wrap">\r\n   <div class="container">\r\n      <div class="logo-left">\r\n         <a href="#"><img src="../../img/images/首页-01_03.gif" alt=""></a>\r\n      </div>\r\n      <div class="logo-middle">\r\n         <div class="logo-input-left">\r\n            课程\r\n         </div>\r\n\r\n         <div class="logo-input-middle">\r\n            <input type="text">\r\n            <div class="logo-input-right">\r\n               <i class="glyphicon glyphicon-search"></i>\r\n            </div>\r\n         </div>\r\n      </div>\r\n\r\n      <div class="logo-right">\r\n         <div class="logo-port-left">\r\n            <i class="glyphicon glyphicon-envelope"></i>\r\n         </div>\r\n         <div class="logo-port-middle">\r\n            <div class="portrait">\r\n               <img src="" alt="">\r\n            </div>\r\n            <div class="nam">张三</div>\r\n         </div>\r\n         <div class="logo-port-right">\r\n            教师端\r\n         </div>\r\n      </div>\r\n   </div>\r\n</div>\r\n<!-- 导航区 -->\r\n<div class="w-nav-wrap">\r\n   <div class="nav-left">\r\n      <ul>\r\n         <li class="on"><a href="/view/stu/stu_shou.html">首页</a></li>\r\n         <li><a href="/view/stu/stu_list.html?id=1">课程</a></li>\r\n         <li><a href="/view/stu/stu_accordion.html">教材</a></li>\r\n         <li><a href="/view/stu/stu_study.html">我的学习</a></li>\r\n      </ul>\r\n   </div>\r\n   <div class="nav-right">\r\n      <div class="nav-a">通过课程邀请码加入课程</div>\r\n      <div class="nav-b">通过序列号获取资源权限</div>\r\n   </div>\r\n</div>');/*v:1*/
template('student/related-bottom',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,$out='';$out+='<div class="bottom-t">\r\n   <div class="bottom-l">相关课程</div>\r\n   <div class="bottom-r">more...</div>\r\n</div>\r\n<div class="bottom-b">\r\n   <div class="bottom-b-t">\r\n      ';
$each(data,function(val,index){
$out+='\r\n      <div class="bottom-b-t-t">\r\n         <img src="';
$out+=$escape(val.imgUrl);
$out+='" alt="">\r\n      </div>\r\n      <div class="bottom-b-t-b">';
$out+=$escape(val.title);
$out+='</div>\r\n      ';
});
$out+='\r\n   </div>\r\n   <div class="bottom-b-b">\r\n      ';
$each(data,function(val,index){
$out+='\r\n      <div class="bottom-b-b-t">\r\n         <img src="';
$out+=$escape(val.imgUrl);
$out+='" alt="">\r\n      </div>\r\n      <div class="bottom-b-b-b">';
$out+=$escape(val.title);
$out+='</div>\r\n      ';
});
$out+='\r\n   </div>\r\n</div>';
return new String($out);
});/*v:1*/
template('student/related-top',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,val=$data.val,$out='';$out+='   <div class="top-t">选用的教材</div>\r\n   <div class="top-b">\r\n      <div class="img"><img src="';
$out+=$escape(val.imgUrl);
$out+='" alt=""></div>\r\n      <span>';
$out+=$escape(val.title);
$out+='</span>\r\n   </div>';
return new String($out);
});/*v:1*/
template('student/slide',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,$out='';$out+='   ';
$each(data,function(val,index){
$out+='\r\n   <div class="swiper-slide"><a  target="_blank" href="';
$out+=$escape(val.url);
$out+='">\r\n     <img src="';
$out+=$escape(val.imgUrl);
$out+='">\r\n   </a>\r\n   </div>\r\n   ';
});
$out+='\r\n\r\n';
return new String($out);
});/*v:1*/
template('student/study-class',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,$string=$utils.$string,$out='';$each(data,function(val,index){
$out+='\r\n<div class="centent-top">\r\n   <div class="centent-top-l">\r\n      <img src="';
$out+=$escape(val.bgimg);
$out+='" alt="">\r\n   </div>\r\n   <div class="centent-top-r">\r\n      <div class="centent-top-r-top">\r\n         <h4 class="title">';
$out+=$escape(val.title);
$out+='</h4>\r\n         <div class="title-tea">\r\n            <div class="title-a"><span>任课教师</span>&nbsp;<span>';
$out+=$escape(val.author);
$out+=' ';
$out+=$escape(val.college);
$out+='</span></div>\r\n            <div class="title-b"><span>邀请码</span>&nbsp;<span>';
$out+=$escape(val.invitecode);
$out+='</span></div>\r\n            <div class="title-c"><span>截止时间</span>&nbsp;<span>';
$out+=$string(val.subon);
$out+='</span></div>\r\n            <div class="title-d glyphicon glyphicon-user"> ';
$out+=$string(val.studycount);
$out+='</div>\r\n         </div>\r\n      </div>\r\n      <div class="centent-top-r-bottom">\r\n         <div class="job"><span>第一章作业</span><span>';
$out+=$escape(val.studytime);
$out+='</span></div>\r\n         <div class="joba"><span>第一章作业</span><span>';
$out+=$escape(val.studytime);
$out+='</span></div>\r\n         <div class="activity"><span>活动通知标题</span><span>';
$out+=$escape(val.subon);
$out+='</span></div>\r\n         <div class="inform"><span>未读通知标题</span></div>\r\n      </div>\r\n   </div>\r\n</div>\r\n';
});
return new String($out);
});/*v:1*/
template('teacher/about-1',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,val=$data.val,$out='';$out+='<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-09 15:32:42\r\n * @LastEditTime: 2019-08-09 15:50:43\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n<p class="about-p">教材集  &nbsp;&nbsp; &lt;&lt;';
$out+=$escape(val.name);
$out+='&gt;&gt; &nbsp;&nbsp; 课件数量:';
$out+=$escape(val.count);
$out+='</p>\r\n';
return new String($out);
});/*v:1*/
template('teacher/about-2',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,val=$data.val,$out='';$out+='<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-09 15:32:59\r\n * @LastEditTime: 2019-08-09 16:04:09\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n\r\n<p class="about-p">题库  &nbsp;&nbsp; &nbsp;&nbsp; &lt;&lt;';
$out+=$escape(val.name);
$out+='&gt;&gt; &nbsp;&nbsp; 习题数量 ';
$out+=$escape(val.exercises);
$out+=' &nbsp;&nbsp; 试卷 ';
$out+=$escape(val.examination_paper);
$out+='卷</p>\r\n\r\n<p class="date-p">您的使用权限截止日期为: <span>00000.000.00</span></p>\r\n\r\n<div class="button">\r\n    <div class="button-item left"><a href="#">获取</a></div>\r\n    <div class="button-item right"><a href="#">立即开课</a></div>\r\n</div>\r\n\r\n';
return new String($out);
});/*v:1*/
template('teacher/about-book',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,vall=$data.vall,val=$data.val,index=$data.index,$escape=$utils.$escape,$out='';$out+='<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-09 18:54:34\r\n * @LastEditTime: 2019-08-09 19:39:25\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n';
$each(vall,function(val,index){
$out+='\r\n<div class="spring">\r\n    <a href="/view/teacher/tea_book.html?id=';
$out+=$escape(val.id);
$out+='">\r\n    \r\n        <img src="';
$out+=$escape(val.imgUrl);
$out+='" alt="相关教材">\r\n        <p>';
$out+=$escape(val.title);
$out+='</p>\r\n    </a>\r\n\r\n</div>\r\n';
});
return new String($out);
});/*v:1*/
template('teacher/about',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,val=$data.val,valll=$data.valll,$out='';$out+='<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-09 14:50:12\r\n * @LastEditTime: 2019-08-09 19:17:07\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n <h1>关联资源</h1>\r\n\r\n<p class="about-p">教材  &nbsp;&nbsp; &nbsp;&nbsp; &lt;&lt;';
$out+=$escape(val.title);
$out+='&gt;&gt;  &nbsp;&nbsp; IBSN: ';
$out+=$escape(val.ISBN);
$out+='</p>\r\n<p class="about-p">  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &lt;&lt;';
$out+=$escape(valll.title);
$out+='&gt;&gt;  &nbsp;&nbsp; IBSN: ';
$out+=$escape(valll.ISBN);
$out+='</p>\r\n\r\n';
return new String($out);
});/*v:1*/
template('teacher/main-nav','<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-07 19:23:06\r\n * @LastEditTime: 2019-08-09 19:57:34\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n<div class="main-nav">\r\n\r\n    <div class="container1">\r\n        <div class="main-nav-l">\r\n            <ul class="main-nav-list">\r\n                <li class="main-item"><a href="/view/teacher/tea_shou.html">首页</a></li>\r\n                <li class="main-item"> <a target="_blank" href="/view/teacher/tea_booklist.html">教材</a> </li>\r\n                <li class="main-item  mid"> <a target="_blank" href="/view/teacher/tea_teached.html">我的教学</a> </li>\r\n            </ul>\r\n        </div>\r\n        <div class="main-nav-r">\r\n            <ul class="main-list1">\r\n                <li class="main-item1 left"><a href="#">建立课程</a></li>\r\n                <li class="main-item1"><a href="#">通过序列号获取资源权限</a></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>');/*v:1*/
template('teacher/site-nav','<div class="site-nav">\r\n    <div class="site-nav-l">\r\n        <img src="../../assets/img/logo.png" alt="哈工大图标">\r\n    </div>\r\n    <div class="site-nav-m"><input type="text"></div>\r\n    <div class="site-nav-r">\r\n        <div class="site-list">\r\n            <div class="site-item">图片</div>\r\n            <div class="site-item tr-dialog">\r\n                <div class="tr-dialog-hd">\r\n                    <img src="../../img/images/lunbotu_02.gif" alt="">\r\n                    <a href="#">张三</a>\r\n                </div>\r\n\r\n            </div>\r\n            <div class="site-item tw-dialog">\r\n                <div class="tw-dialog-hd">教师端</div>\r\n                \r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>');/*v:1*/
template('teacher/teacherbook',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,$out='';$out+='<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-08 11:12:47\r\n * @LastEditTime: 2019-08-16 17:52:44\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n\r\n<div class="teacher-book">\r\n\r\n\r\n<div class="book-top">热门教材</div>\r\n<div class="book-all">\r\n    ';
$each(data,function(val,index){
$out+='\r\n    <div class="book">\r\n        <a  target="_blank" href="/view/teacher/tea_book.html?id=';
$out+=$escape(val.id);
$out+='" >\r\n      <img src="../../img/images/jiaocai_08.gif">\r\n      <p>';
$out+=$escape(val.title);
$out+='</p>\r\n    </a>\r\n    </div>\r\n    ';
});
$out+='\r\n</div>\r\n\r\n</div>\r\n';
return new String($out);
});/*v:1*/
template('teacher/teatpl_accordion',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,item=$data.item,j=$data.j,$out='';$out+='<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-13 16:18:11\r\n * @LastEditTime: 2019-08-14 15:59:33\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n\r\n<div class="tea-accordion">\r\n    <!-- 普通手风琴写法 -->\r\n    <!-- <ul class="accordion-list">\r\n        <li class="accordion-item on">\r\n            <div class="item-hd"> <span class="glyphicon glyphicon-plus" ></span> 一级项目</div>\r\n            <div class="item-bd">二级项目</div>\r\n        </li>\r\n        <li class="accordion-item">\r\n            <div class="item-hd"> <span class="glyphicon glyphicon-plus" ></span> 一级项目</div>\r\n            <div class="item-bd">二级项目</div>\r\n        </li>\r\n        <li class="accordion-item">\r\n            <div class="item-hd"> <span class="glyphicon glyphicon-plus" ></span> 一级项目</div>\r\n            <div class="item-bd">二级项目</div>\r\n        </li>\r\n        <li class="accordion-item">\r\n            <div class="item-hd"> <span class="glyphicon glyphicon-plus" ></span> 一级项目</div>\r\n            <div class="item-bd">二级项目</div>\r\n        </li>\r\n        <li class="accordion-item">\r\n            <div class="item-hd"> <span class="glyphicon glyphicon-plus" ></span> 一级项目</div>\r\n            <div class="item-bd">二级项目</div>\r\n        </li>\r\n    </ul> -->\r\n\r\n    <!-- 根据数据手风琴的写法 -->\r\n    <ul class="accordion-list">\r\n        ';
$each(data,function(val,index){
$out+='\r\n        ';
if(data[index].pid == 0){
$out+='\r\n        <li class="accordion-item">\r\n            <div class="item-hd"><span class="glyphicon glyphicon-plus"></span>';
$out+=$escape(val.name);
$out+='</div>\r\n            <ul class="item-bd">\r\n             ';
$each(data,function(item,j){
$out+='\r\n             ';
if(data[j].pid === data[index].id){
$out+='\r\n             <li class="item-bd-a" uid="';
$out+=$escape(item.id);
$out+='">\r\n                 ';
$out+=$escape(item.name);
$out+='\r\n             </li>\r\n             ';
}
$out+='\r\n             ';
});
$out+='\r\n            </ul>\r\n        </li>\r\n        ';
}
$out+='\r\n        ';
});
$out+='\r\n    </ul>\r\n</div>';
return new String($out);
});/*v:1*/
template('teacher/tea_bookxq',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,val=$data.val,$string=$utils.$string,$out='';$out+='<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-08 19:55:27\r\n * @LastEditTime: 2019-08-09 18:55:57\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n <div class="bookxq">\r\n\r\n    <div class="book-top">\r\n       <div class="book-l">\r\n          <img src="';
$out+=$escape(val.imgUrl);
$out+='" alt="教材图片">\r\n          <p><span class="glyphicon glyphicon-user"></span>200</p>\r\n       </div>\r\n       <div class="book-r">\r\n          <p class="bookr-p">书名: ';
$out+=$escape(val.title);
$out+='</p>\r\n          <p class="bookr-p">作者: ';
$out+=$escape(val.author);
$out+='</p>\r\n          <p class="bookr-p">价格:  <span>￥';
$out+=$escape(val.price);
$out+='/年</span></p>\r\n          <hr>\r\n          <div class="about">\r\n          </div>\r\n          <div class="about-1">\r\n          </div>\r\n          <div class="about-2">\r\n          </div>\r\n          \r\n       </div>\r\n    </div>\r\n    <div class="book-bottom">\r\n       <div class="book-bottom-l">\r\n          <div class="book-bottom-item">\r\n             <p class="author">作者介绍</p>\r\n             \r\n            <div class="author-div">';
$out+=$string( val.author_des);
$out+='</div>\r\n            <hr>\r\n          </div>\r\n          <div class="book-bottom-item">\r\n             <p class="author">教材介绍</p>\r\n             \r\n            <div class="author-div">';
$out+=$string(  val.description);
$out+='</div>\r\n            <hr>\r\n          </div>\r\n          <div class="book-bottom-item">\r\n             <p class="author">课程目录</p>\r\n             \r\n            <div class="author-div">\r\n               <ul>\r\n                  <li>第一课时&gt;课时名称&gt;课时名称</li>\r\n                  <li>第二课时&gt;课时名称&gt;课时名称</li>\r\n                  <li>第三课时&gt;课时名称&gt;课时名称</li>\r\n                  <li>第四课时&gt;课时名称&gt;课时名称</li>\r\n               </ul>\r\n            </div>\r\n          </div>\r\n       </div>\r\n       <div class="book-bottom-r">\r\n          <div class="book-bottom-r-hd">\r\n             <p class="left-p">相关教材</p>\r\n             <p class="right-p">more...</p>\r\n          </div>\r\n          <div class="book-bottom-r-bd">\r\n             \r\n          </div>\r\n       </div>\r\n    </div>\r\n    \r\n </div>\r\n';
return new String($out);
});/*v:1*/
template('teacher/tea_bottom-tab',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$escape=$utils.$escape,pagenum=$data.pagenum,$out='';$out+='<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-15 09:34:37\r\n * @LastEditTime: 2019-08-15 14:47:51\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n <div class="tea_bottom-tab">\r\n\r\n     <div class="btm-hd">\r\n        <ul class="tab-list">\r\n            <li class="item-tab bgc ">开课中</li>\r\n            <li class="item-tab">已完结</li>\r\n        </ul> \r\n        <div class="btm-hd-r"><a href="#">课程管理</a></div>\r\n     </div>\r\n     <div class="btm-bd">\r\n         <div class="btm-bd-1 on">\r\n             ';
$each(data,function(val,index){
$out+='\r\n            <div class="tab-item">\r\n                <img src="';
$out+=$escape(val.img);
$out+='" alt="课程图片">\r\n                <div class="word-wrap">\r\n                    <p class="title-p">';
$out+=$escape(val.title);
$out+='</p>\r\n                    <div class="word">\r\n                        <p>需要验证后才能加入</p>\r\n                        <p>邀请码:';
$out+=$escape(val.invitecode);
$out+='</p>\r\n                        <p>发布时间:';
$out+=$escape(val.subon);
$out+='</p>\r\n                        <p><span class="glyphicon glyphicon-user"></span>';
$out+=$escape(val.studycount);
$out+='</p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            ';
});
$out+='\r\n            <div class="pagenation">\r\n                <p>一共';
$out+=$escape(pagenum);
$out+='条数据</p>\r\n                <div class="page"></div>\r\n            </div>\r\n         </div>\r\n         <div class="btm-bd-1">\r\n              ';
$each(data,function(val,index){
$out+='\r\n                <div class="tab-item">\r\n                    <img src="';
$out+=$escape(val.img);
$out+='" alt="课程图片">\r\n                    <div class="word-wrap">\r\n                        <p class="title-p">';
$out+=$escape(val.title);
$out+='</p>\r\n                       \r\n                        <div class="word">\r\n                            <p>邀请码:';
$out+=$escape(val.invitecode);
$out+='</p>\r\n                            <p>开课时间:';
$out+=$escape(val.studytime);
$out+='</p>\r\n                            <p><span class="glyphicon glyphicon-user"></span>';
$out+=$escape(val.studycount);
$out+='</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                ';
});
$out+='\r\n                <div class="pagenation">\r\n                        <p>一共';
$out+=$escape(pagenum);
$out+='条数据</p>\r\n                        <div class="page"></div>\r\n                    </div>\r\n            </div>\r\n     </div>\r\n </div>';
return new String($out);
});/*v:1*/
template('teacher/tea_crumbs-copy','<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-09 10:18:43\r\n * @LastEditTime: 2019-08-14 16:04:58\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n<ul class="crumbs-list">\r\n        <li><a href="/view/teacher/tea_shou.html">首页</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n        <li><a target="_blank" href="/view/teacher/tea_booklist.html">教材</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n        <li><a class="first-type" href="#">一级分类名称</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n        <li><a class="second-a second-type" href="#">二级分类名称</a></li>&nbsp;&nbsp;\r\n</ul>');/*v:1*/
template('teacher/tea_crumbs','<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-09 10:18:43\r\n * @LastEditTime: 2019-08-10 10:13:50\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n<ul class="crumbs-list">\r\n        <li><a href="/view/teacher/tea_shou.html">首页</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n        <li><a target="_blank" href="/view/teacher/tea_booklist.html">教材</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n        <li><a href="#">一级分类名称</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n        <li><a href="/view/teacher/tea_booklist.html">二级分类名称</a></li>&nbsp;&nbsp;&gt;&nbsp;&nbsp;\r\n        <li>教材名称</li>\r\n</ul>');/*v:1*/
template('teacher/tea_tpllist',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,pagenum=$data.pagenum,cur=$data.cur,pageall=$data.pageall,$each=$utils.$each,data=$data.data,val=$data.val,index=$data.index,$string=$utils.$string,$out='';$out+='<!--\r\n * @Description: In User Settings Edit\r\n * @Author: your name\r\n * @Date: 2019-08-10 10:26:29\r\n * @LastEditTime: 2019-08-15 15:25:48\r\n * @LastEditors: Please set LastEditors\r\n -->\r\n\r\n      <div class="tb-top">\r\n         <div class="top1">\r\n            <p>一共';
$out+=$escape(pagenum);
$out+='条数据</p>\r\n         </div>\r\n         <div class="top2">\r\n            <div>&lt;<span>';
$out+=$escape(cur);
$out+='/';
$out+=$escape(pageall);
$out+='</span> &gt; </div>\r\n         </div>\r\n      </div>\r\n      ';
$each(data,function(val,index){
$out+='\r\n      <div class="booklist-item">\r\n       <div class="booklist-l">\r\n          <a  href="/view/teacher/tea_book.html?id=';
$out+=$escape(val.id);
$out+='">\r\n          <img src="';
$out+=$escape(val.imgUrl);
$out+='" alt="教材图片">\r\n         </a>\r\n       </div>\r\n       <div class="booklist-r">\r\n          <p class="bookr-p">书名: ';
$out+=$escape(val.title);
$out+='</p>\r\n          <p class="bookr-p">作者: ';
$out+=$escape(val.author);
$out+='</p>\r\n          <p class="bookr-p">价格:  <span>￥';
$out+=$escape(val.price);
$out+='/年</span></p>\r\n          <div class="bookr-div">';
$out+=$string(  val.description);
$out+='  </div>\r\n          \r\n          <p  class="bookr-p"><span class="glyphicon glyphicon-user"></span>';
$out+=$escape(val.count);
$out+='</p>\r\n\r\n         </div>\r\n      </div>\r\n      \r\n  ';
});
$out+='\r\n  <div class="tb-under">\r\n      <p>共<span class="num-course">';
$out+=$escape(pagenum);
$out+='</span>个教材</p>\r\n      <div class="page-div"></div>\r\n  ';
return new String($out);
});

}()