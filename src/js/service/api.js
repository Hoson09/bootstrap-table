/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:55:30
 * @LastEditTime: 2019-08-16 14:37:50
 * @LastEditors: Please set LastEditors
 */
// 跟后台打交道的所有的api都封装到此
require.config({
    paths: {
        jquery: '/lib/jquery-1.12.4.min',
        ajaxSetup: '/js/ajaxSetup'
    }
});

define(['jquery', 'ajaxSetup'], function ($) {
    return {
        // 登录封装 后台也可以登录
        userlogin: function (fromData, callback) {
            // 发送ajax 请求, 后台返回数据后, 调用cb函数.
            $.ajax({
                url: '/api/userlogin',
                type: 'POST',
                dataType: 'json',
                // contentType: "application/json",
                data: fromData,
                success: callback
            });
        },
        userlogin2: function (fromData, callback) {
            // 发送ajax 请求, 后台返回数据后, 调用cb函数.
            $.ajax({
                url: 'http://192.168.1.130:8888/api/userlogin',
                type: 'POST',
                dataType: 'json',
                // contentType: "application/json",
                data: fromData,
                success: callback
            });
        },
        // 轮播图封装
        loadBannerImg: function (cb) {
            // 发送ajax 请求, 后台返回数据后, 调用cb函数.
            $.ajax({
                url: '/api/student/carousel',
                type: 'get',
                dataType: 'json',
                // contentType: "application/json",
                data: {},
                success: cb
            });
        },
        // 课程推荐封装
        course: function (callback) {
            $.ajax({
                url: '/api/student/courses?_limit=10&_order=id&isHot=true',
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },

        // 课程详情
        courselist: function (callback) {
            var t = window.location.search.slice(1);
            console.log(t);
            $.ajax({
                url: '/api/student/courses?' + t + '',
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },

        // 课程介绍
        courseintroduce: function (callback) {
            var t = window.location.search.slice(1);
            console.log(t);
            $.ajax({
                url: '/api/student/courses?' + t + '',
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },

        // 相关教材
        courserelated: function (callback) {
            $.ajax({
                url: '/api/student/materials?id=1',
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },

        // 相关课程
        courseintroducea: function (callback) {
            $.ajax({
                url: '/api/student/materials?_limit=1&_order=id&isHot=true',
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },

        // 教材推荐
        textbook: function (callback) {
            $.ajax({
                url: '/api/student/materials?_limit=10&_order=id&isHot=true',
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },


        //教师端教材推荐
        teabook: function (cb) {
            $.ajax({
                url: '/api/teacher/materials?_limit=10&_order=id&isHot=true',
                type: 'GET',
                dataType: 'json',
                success: cb
            });
        },
        //教师端教材详情
        teabookxq: function (cb) {
            var tea = window.location.search.slice(1);

            $.ajax({
                url: '/api/teacher/materials?' + tea,
                type: 'GET',
                dataType: 'json',
                success: cb
            });
        },
        teabook2: function (cb) {
            $.ajax({
                url: '/api/teacher/materials?_limit=2&_order=id&isHot=true',
                type: 'GET',
                dataType: 'json',
                success: cb
            });
        },

        // 手风琴
        accordion: function (callback) {
            $.ajax({
                url: '/api/student/course_category',
                type: 'GET',
                dataType: 'json',
                data: {},
                success: callback
            });
        },
        //教师端手风琴
        teaaccordion: function(callback) {
            $.ajax({
                url:'/api/teacher/course_category',
                type:'GET',
                data:{},
                dataType:'json',
                success:callback
            });
        },
        // 手风琴二级菜单申请catId
        coursehundredb: function (params, callback) {
            $.ajax({
                url: '/api/student/courses?_limit=20&_order=id&isHot=true',
                data: params,
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },
        teabookdb: function (params, callback) {
            $.ajax({
                url: '/api/teacher/materials?_limit=10&_order=id&isHot=true',
                data: params,
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },
        // 学习中
        studya: function (page, callback) {
            $.ajax({
                url: '/api/student/courses?_limit=3&_order=id&isHot=true&_page=' + page,
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },
        studyb: function (page, callback) {
            $.ajax({
                url: '/api/student/courses?_limit=3&_order=id&isHot=true&_page=' + page,
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },
        //开课中
        classing:function(page,callback) {
            $.ajax({
                url: '/api/teacher/courses?_limit=3&_order=id&isHot=true&_page=' + page ,
                type: 'GET',
                dataType: 'json',
                success: callback
            });
        },
    };
});