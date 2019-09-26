require.config({
   paths: {
      jquery: '/lib/jquery-1.12.4.min',
      api: '/js/service/api',
      tpl: '/js/tmpl/tpl',
      simplepager: '/lib/simplePagination/jquery.simplePagination'
   },
   shim: {
      simplepager: {
         deps: ['jquery']
      }
   }
});

define(['jquery', 'api', 'tpl', 'simplepager'], function ($, api, tpl) {
   $(function () {
      $('.top').html(tpl('student/navigation', {}));

      function initTable(page) {
         page = page || 1;
         api.studyb(page, function (data, status, xhr) {
            var total = parseInt(xhr.getResponseHeader('x-total-count'));
            $('.centent').html(tpl('student/end_study', {
               data: data
            }));
            $('.page-r').pagination({
               currentPage: page,
               items: total,
               itemsOnPage: 3,
               cssStyle: 'light-theme',
               prevText: '上一页',
               nextText: '下一页',
               onPageClick: function (pageNumber) {
                  // console.log(pageNumber);
                  initTable(pageNumber);
               }
            });
         });
      }
      initTable(1);

      $('.acrco-wrap').html(tpl('student/bottom-nav', {}));
   });
});