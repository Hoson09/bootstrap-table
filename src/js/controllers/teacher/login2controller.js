/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 09:10:41
 * @LastEditTime: 2019-08-16 20:57:43
 * @LastEditors: Please set LastEditors
 */
require.config({
    paths: {
        jquery: '/lib/jquery-1.12.4.min',
        Cookie: '/lib/cookie/src/js.cookie',
        api: '/js/service/api',
        easyui:'/lib/jquery-easyui/jquery.easyui.min',
        easylang:'/lib/jquery-easyui/locale/easyui-lang-zh_CN'


    },
    shim:{

        easyui:{
            deps: ['jquery']
          },
        easylang:{
            deps: ['jquery']
          } 
    }
    
});


require(['jquery','Cookie', 'api','easyui','easylang' ], function ($, Cookie, api) {
    //验证码
    $('.yazhma').on('click',function() {
        var t=$(this).attr('src')+'?id='+Date.now();
       $(this).attr('src',t);
    });
    //登录按钮
    $('.login2-btn').on('click', function () {
        // alert(1);
        // if($('#login-frm').form('validate')) {  //判断表单里是否有数据
        //获取表单数据
        var formData = $('#login2-frm').serialize();
        api.userlogin2(formData, function (data) {

            Cookie.set('Authorization', data.token);
            //学生端
            if (data.code === 1 ) {
                window.location.href = '../teacher/aicoder.html';
            } else {
                alert('请检查用户名或密码是否正确');
            }
        });
    });
});