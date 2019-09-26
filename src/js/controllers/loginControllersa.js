require.config({
  paths: {
    jquery: '/lib/jquery-1.12.4.min',
    Cookie: '/lib/cookie/src/js.cookie',
    validate: '/lib/jquery.validate.min'
  }
});

require(['jquery', 'Cookie', '/js/service/api.js', 'validate'], function ($, Cookie, api) {
  $(function () {
    // 在键盘按下并释放及提交后验证提交表单
    $('#frmLogin').validate({
      rules: {
        username: {
          required: true,
          minlength: 2
        },
        password: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        username: {
          required: '请输入用户名',
          minlength: '要大于两个字母'
        },
        password: {
          required: '请输入密码',
          minlength: '密码不小于 5 个字母'
        }
      }
    });
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
    $('#btnLogin').on('click', function () {
      // if($('#login-frm').form('validate')) {  //判断表单里是否有数据
      //获取表单数据
      var formData = $('#frmLogin').serialize();
      api.userlogin2(formData, function (data) {
        console.log(data);
        Cookie.set('Authorization', data.token);
        //easyui端
        if (data.code === 1 && t === 1) {
          window.location.href = '/view/teaBackstageIndex.html';
        } else if (data.code === 1 && t === 2) {
          //bootstrap端
          window.location.href = '/view/bootstrapindex.html';
        } else if (data.code === 1) {
          alert('请检查您登录的服务端是否正确或是否选择服务端');
        } else {
          alert('请检查用户名或密码是否正确');
        }
      });
    });
  });
});