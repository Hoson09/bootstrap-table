

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 10:33:40
 * @LastEditTime: 2019-08-17 11:20:39
 * @LastEditors: Please set LastEditors
 */
require.config({
    paths: {
        jquery: '/lib/jquery-1.12.4.min',
        Cookie: '/lib/cookie/src/js.cookie'
    }
});
define(['jquery','Cookie'], function($, Cookie) {
    'use strict';
    console.log(Cookie.get('Authorization'));
    $.ajaxSetup({
        headers: {
            'Authorization': Cookie.get('Authorization')
        },
        // statusCode: {
        //     '401': function() {
        //       alert('请先登录');
        //       setTimeout(function() {
        //           window.location.href ='/view/login.html';
        //       },2000);
        //     }
        // }
    });
});

