/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 09:12:31
 * @LastEditTime: 2019-08-15 14:47:24
 * @LastEditors: Please set LastEditors
 */
require.config({
    paths: {
        jquery: '/lib/jquery-1.12.4.min',
        Cookie: '/lib/cookie/src/js.cookie',
        easyui: '/lib/jquery-easyui-1.8.1/jquery.easyui.min',
        simplepager: '/lib/simplePagination/jquery.simplePagination',
        api: '/js/service/api',
        tpl: '/js/tmpl/tpl',

    }, shim: {
        simplepager: {
            deps: ['jquery']
        },
        easyui: {
            deps: ['jquery']
        }
    }
});

require(['jquery', 'Cookie','simplepager', 'api', 'tpl'], function ($, Cookie, pagination, api, tpl) {
    $(function(){
        $('.top-nav').html(tpl('teacher/site-nav', {}));
        $('.main-nav1').html(tpl('teacher/main-nav', {}));
        $('.footer').html(tpl('student/bottom-nav', {}));
        classa(1);
      function classa(page){

          api.classing(page,function(data,status,xhr){
              page = page || 1;
              
              var total = parseInt(xhr.getResponseHeader('x-total-count')); //项目总数
              $('.bottom-nav').html(tpl('teacher/tea_bottom-tab', {
                  data: data,
                  pagenum:total
              }));
               // changepage(total, page);
               $('.page').pagination({
                  currentPage: page, //选中当前页
                  items: total, //页数的项目总数
                  itemsOnPage: 3, //每个页面显示的项目数
                  cssStyle: 'light-theme',
                  prevText: '上一页',
                  nextText: '下一页',
                  onPageClick: function (pageNumber) {
                    // console.log(pageNumber);
                    classa(pageNumber);
                 }
              });
             
        
            //进行tab切换案例
            $('.item-tab').on('click',function() {
             
              $(this).addClass('bgc').siblings().removeClass('bgc');
              var index =$('.item-tab').index(this);
              var bdliDom =$('.btm-bd-1').get(index);
              $(bdliDom).addClass('on').siblings().removeClass('on');
          });
        
          
         
         
          });
          

      }
    });
});