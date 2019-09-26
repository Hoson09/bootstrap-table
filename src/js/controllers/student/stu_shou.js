require.config({
   paths: {
      jquery: '/lib/jquery-1.12.4.min',
      Cookie: '/lib/cookie/src/js.cookie',
      api: '/js/service/api',
      tpl: '/js/tmpl/tpl',
      Swiper: '/lib/Swiper-3.4.2/dist/js/swiper.jquery.umd.min'
   },
   shim: {
      Swiper: {
         deps: ['jquery']
      }
   }
   
});

define(['Swiper', 'jquery', 'Cookie', 'api', 'tpl'], function (Swiper, $, Cookie, api, tpl) {
   $(function () {
      $('.top').html(tpl('student/navigation', {}));

      api.loadBannerImg(function (data) {
         // console.log(data);
         // 加载数据后,生成HTML放到页面上去
         $('.swiper-wrapper').html(tpl('student/slide', {
            data: data
         }));

         new Swiper('.swiper-container', {
            loop: true,
            autoplay: 2000,
            autoplayDisableOnInteraction : false,

            // 如果需要分页器
            pagination: '.swiper-pagination',

            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            // 如果需要滚动条
            scrollbar: '.swiper-scrollbar',
         });
      });

      // 跳转页面部分
      api.course(function (data) {
         $('.course-bd').html(tpl('student/course', {
            data: data
         }));
      });

      // 教材跳转
      api.textbook(function (data) {
         $('.course-cd').html(tpl('student/course-text', {
            data: data
         }));
      });

      // 底部通栏
      $('.acrco-wrap').html(tpl('student/bottom-nav'), {});
   });
});