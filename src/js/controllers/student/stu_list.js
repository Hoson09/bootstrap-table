require.config({
   paths: {
      jquery: '/lib/jquery-1.12.4.min',
      api: '/js/service/api',
      tpl: '/js/tmpl/tpl'
   }
});

define(['jquery', 'tpl', 'api', '/js/ajaxsetup.js'], function ($, tpl, api) {
   $(function () {
      $('.top').html(tpl('student/navigation', {}));
      $('.classify').html(tpl('student/classify', {}));

      // 课程详情
      api.courselist(function (data) {
         // 课程跳转对应课程详情
         $('.class-tit').html(tpl('student/class-tit', {
            val: data[0]
         }));
      });

      // 课程介绍
      api.courseintroduce(function (data) {
         // 课程跳转对应课程详情
         $('.class-introduce').html(tpl('student/class-introduce', {
            val: data[0],

         }));
      });

      // 教材相关
      api.courserelated(function (data) {
         $('.related-top').html(tpl('student/related-top', {
            val: data[0]
         }));
      });

      // 相关教材
      api.courseintroducea(function (data) {
         $('.related-bottom').html(tpl('student/related-bottom', {
            data: data,
            dd: data[1]
         }));
         console.log(data);
         // $('.related-bottom').html(tpl('student/related-bottom',{
         // }));
      });

      // 底部通栏
      $('.acrco-wrap').html(tpl('student/bottom-nav'), {});
   });
});