/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 19:36:49
 * @LastEditTime: 2019-08-09 19:39:31
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
       $('.crumbs').html(tpl('teacher/tea_crumbs', {}));
     api.teabookxq(function(data){

       $('.bookxq1').html(tpl('teacher/tea_bookxq', {
         val:data[0],
        //  dd:data[0].author_des.replace('\"','')
       }));
      // console.log(data[0].author_des.replace('\"',''));
       console.log(data[0].relevant_material);
       console.log(data[0].courseware_set); 
       console.log(data[0].question_bank);
       $('.about').html(tpl('teacher/about',{ 
        val:data[0].relevant_material[0],
        valll:data[0].relevant_material[1]
        // data1:data[0].relevant_material[1]
       }));
       console.log(data[0].relevant_material);
       $('.about-1').html(tpl('teacher/about-1',{
        val:data[0].courseware_set
       }));
       $('.about-2').html(tpl('teacher/about-2',{
        val:data[0].question_bank
       }));
       
      });
         api.teabook2(function(data) {
          $('.book-bottom-r-bd').html(tpl('teacher/about-book', {
            vall:data,
           //  dd:data[0].author_des.replace('\"','')
          }));
         });
       
     
    
   
        
   
         // 底部通栏
         $('.footer').html(tpl('student/bottom-nav'), {});
     
    
 });