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

define(['jquery', 'tpl', 'api', 'simplepager', '/js/ajaxsetup.js'], function ($, tpl, api, pagination) {
   $(function () {
      $('.top').html(tpl('student/navigation', {}));

      function initTable(page) {
         // page = page || 1;
         console.log(page);
            api.studya(page, function (data,status,xhr) {
               $('.man-centent').html(tpl('student/study-class', {
                  data:data
               }));
               var total = parseInt(xhr.getResponseHeader('x-total-count'));
               $('.pager-r').pagination({
                  currentPage:page,
                  items: total,
                  itemsOnPage: 3,
                  cssStyle: 'light-theme',
                  prevText: '上一页',
                  nextText: '下一页',
                  onPageClick: function (pageNumber) {
                     console.log(pageNumber);
                     initTable(pageNumber);
                  }
               });
         });
      }
      initTable(1);

      $('.acrco-wrap').html(tpl('student/bottom-nav',{}));
   });
});