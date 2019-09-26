/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 20:25:47
 * @LastEditTime: 2019-08-15 15:17:00
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
    $('.top-nav').html(tpl('teacher/site-nav', {}));
    $('.main-nav1').html(tpl('teacher/main-nav', {}));
    $('.crumbs').html(tpl('teacher/tea_crumbs-copy', {}));
    $('.footer').html(tpl('student/bottom-nav', {}));
    
    var catId;
    $(function () {


        function accordion() {
            api.teaaccordion(function (data) {
                //    $('.tea-booklist-l').html(tpl('teacher/teatpl_accordion', {}));

                $('.tea-booklist-l').html(tpl('teacher/teatpl_accordion', {
                    data: data
                }));
                console.log(data);
                $('.item-hd').on('click', function () {
                 
                    $(this)
                        .siblings('.item-bd')
                        .slideDown(500);
                    $(this)
                        .parent()
                        .siblings('li')
                        .find('.item-bd')
                        .slideUp(500);
                    $('.first-type').html($(this).text());
                });

                $('.item-bd-a').on('click', function () {
                    $('.second-type').html($(this).text());
                    // 通过二级分类的 uid 属性重新渲染课程内容模块
                    catId = parseInt($(this).attr('uid'));
                    initTable(1, catId);
                   
                });
            });
        }

        // 初始化右侧页面
        function initTable(page, catId) {
            page = page || 1;
            var params = {};
            params._page = page;
            if (catId) {
                params.catId = parseInt(catId);
            }
            console.log(params);
            api.teabookdb(params, function (data, status, xhr) {
                var total = parseInt(xhr.getResponseHeader('x-total-count')); //项目总数
                var pageall = parseInt(xhr.getResponseHeader('x-total-count')/10); //项目总数
                    $('.tea-booklist-r').html(tpl('teacher/tea_tpllist', {
                        data: data,
                        pagenum:total,
                        pageall:pageall,
                        cur:page

                    }));
                // changepage(total, page);
                $('.page-div').pagination({
                    currentPage: page, //选中当前页
                    items: total, //页数的项目总数
                    itemsOnPage: 10, //每个页面显示的项目数
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
        accordion();



    });

  
      

});
