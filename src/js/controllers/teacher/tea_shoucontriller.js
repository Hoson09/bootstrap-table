/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 15:55:47
 * @LastEditTime: 2019-08-14 11:02:53
 * @LastEditors: Please set LastEditors
 */
require.config({
    paths: {
       jquery: '/lib/jquery-1.12.4.min',
       Cookie: '/lib/cookie/src/js.cookie',
       api: '/js/service/api',
       tpl: '/js/tmpl/tpl',
      Swiper: '/lib/Swiper-3.4.2/dist/js/swiper.jquery.umd.min'
    },
    shim:{
      Swiper:{
        deps: ['jquery']
      }
    }
  
 });

 require(['Swiper','jquery', 'Cookie', 'api', 'tpl'], function (Swiper, $, Cookie, api, tpl) {
 
       //引用头部模板
       $('.top-nav').html(tpl('teacher/site-nav', {}));
       $('.main-nav1').html(tpl('teacher/main-nav', {}));
       //引入轮播图模板
       $(function () {
        
         //获取轮播图数据
         api.loadBannerImg(function (data) {
            console.log(data);   
            // 加载数据后,生成HTML放到页面上去
            $('.swiper-wrapper').html(tpl('student/slide', {
               data: data
            }));
   
            new Swiper('.swiper-container', {
               loop: false,
               autoplay: 2000,
               direction : 'horizontal',
               // autoplayDisableOnInteraction : false,
   
               // 如果需要分页器
               pagination: '.swiper-pagination',
   
               // 如果需要前进后退按钮
               nextButton: '.swiper-button-next',
               prevButton: '.swiper-button-prev',
   
               // 如果需要滚动条
               scrollbar: '.swiper-scrollbar',
            });
         });
         
         //获取教材数据
         api.teabook(function(data){
            
            $('.teacher-book1').html(tpl('teacher/teacherbook',{
               data:data
            }));
            // console.log(data);
         });
   
      
   
        
   
         // 底部通栏
         $('.footer').html(tpl('student/bottom-nav'), {});
      });
    
 });