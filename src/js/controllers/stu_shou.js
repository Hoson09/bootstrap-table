require.config({
   paths: {
      jquery: '/lib/jquery-1.12.4.min',
      Cookie: '/lib/cookie/src/js.cookie',
      api: '/js/service/api',
      tpl: '/js/tmpl/tpl',
      Swiper: '/lib/swiper/dist/js/swiper.min'
   },
   shim:{
      Swiper:{
         deps:['jquery']      }
   }
});

require(['Swiper','jquery', 'Cookie', 'api', 'tpl'], function (Swiper, $, Cookie, api, tpl) {
   api.loadBannerImg(function (data) {
      // console.log(data);
      // 加载数据后,生成HTML放到页面上去
      $('.swiper-wrapper').html(tpl('student/slide', {data: data}));
      // 初始化轮播图代码
      new Swiper('.swiper-container', {
         pagination: '.swiper-pagination', //pagination分页器
         init:true,
         // nextButton: '.swiper-button-next', //前进后退按钮
         // prevButton: '.swiper-button-prev',
         paginationClickable: true, //参数设置为true时，点击分页器的指示点分页器会控制Swiper切换
         spaceBetween: 30, //slide之间的距离（单位px）。
         centeredSlides: true, //设定为true时，活动块会居中，而不是默认状态下的居左。
         loop: true, //复制多份循环(这里就是让轮播看起来是循环的，去掉这个就恢复了默认的swiper轮播)
         autoplay: true, //自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
         autoplayDisableOnInteraction: false //点击后打断auto-play
      });

      // tpl('student/demo', )
   });
});