/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 10:46:04
 * @LastEditTime: 2019-08-15 20:58:09
 * @LastEditors: Please set LastEditors
 */
require.config({
    paths: {
        jquery: '/lib/jquery-1.12.4.min',
        Cookie: '/lib/cookie/src/js.cookie',
        api: '/js/service/api'

    }
});


require(['jquery', 'Cookie', 'api'], function ($, Cookie, api) {

   

    $(function () {
        var t = 0;
        //学生端
        $('.login-check-1').on('click', function () {
            t = 1;
        });
        //教师端
        $('.login-check-2').on('click', function () {
            t = 2;
        });
        //登录按钮
        $('.login-btn').on('click', function () {
            // if($('#login-frm').form('validate')) {  //判断表单里是否有数据
                //获取表单数据
                var formData = $('#login-frm').serialize();
                api.userlogin(formData, function (data) {
                    
                    Cookie.set('Authorization', data.token);
                    //学生端
                    if (data.code === 1 && t === 1) {
                        window.location.href = '../view/stu/stu_shou.html';
                    } else if (data.code === 1 && t === 2) {
                        //教师端
                        window.location.href = '../view/teacher/tea_shou.html';
                    }
                    else if (data.code === 1) {
                        alert('请检查您登录的服务端是否正确或是否选择服务端');
                      } else {
                        alert('请检查用户名或密码是否正确');
                      }
                });
               
            // }else {
            //     $.messager.alert('提示消息','请输入规范的用户名和密码','warning');
            // }
        });
    });
});