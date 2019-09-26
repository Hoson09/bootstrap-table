require.config({
   paths: {
      jquery: '/lib/jquery-1.12.4.min',
      easyui: '/lib/jquery-easyui-1.8.1/jquery.easyui.min',
      simplepager: '/lib/simplePagination/jquery.simplePagination',
      api: '/js/service/api',
      tpl: '/js/tmpl/tpl',
      // setup: '/js/ajaxSetup'
   },
   shim: {
      simplepager: {
         deps: ['jquery']
      },
      easyui: {
         deps: ['jquery']
      }
   }
});

define(['jquery', 'simplepager', 'api', 'tpl', '/js/ajaxsetup.js'], function ($, pagination, api, tpl) {
   var catId;
   $(function () {
      $('.top').html(tpl('student/navigation', {}));
      $('.classifyaa').html(tpl('student/classifyaa', {}));

      // 初始化右侧页面
      function initTable(page, catId) {
         page = page || 1;
         var params = {};
         params._page = page;
         if (catId) {
            params.catId = parseInt(catId);
         }
         console.log(params);
         api.coursehundredb(params, function (data, status, xhr) {
            var total = parseInt(xhr.getResponseHeader('x-total-count')); //项目总数
            $('.accordioner-r').html(tpl('student/accordioner-middle', {
               data,
               pagenum:total
            }));
            // changepage(total, page);
            $('.right-bot-l').pagination({
               currentPage: page, //选中当前页
               items: total, //页数的项目总数
               itemsOnPage: 20, //每个页面显示的项目数
               cssStyle: 'light-theme',
               prevText: '上一页',
               nextText: '下一页',
               onPageClick: function (pageNumber) {
                  // var nextpage = pageNumber;
                  // changepage(nextpage);
                  initTable(pageNumber, catId);
               }
            });
         });
      }
      initTable(1);

      // 手风琴
      function Bandoneon() {
         api.accordion(function (data) {
            $('.accordioner-l').html(tpl('student/accordion', {
               data: data
            }));
            $('.centent-t').on('click', function () {
               $(this)
                  .siblings('.centent-body')
                  .slideDown(500);
               $(this)
                  .parent()
                  .siblings('li')
                  .find('.centent-body')
                  .slideUp(500);
               $('.first-type').html($(this).text());
            });
            $('.centent-b').on('click', function () {
               $('.second-type').html($(this).text());
               // 通过二级分类的 uid 属性重新渲染课程内容模块
               catId = parseInt($(this).attr('uid'));
               initTable(1, catId);
            });
         });
      }
      Bandoneon();
      $('.acrco-wrap').html(tpl('student/bottom-nav'), {});
   });
});