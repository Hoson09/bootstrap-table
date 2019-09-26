/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 14:41:34
 * @LastEditTime: 2019-08-17 14:51:22
 * @LastEditors: Please set LastEditors
 */
require.config({
    paths: {
        jquery: '/lib/jquery-easyui/jquery.min',
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
require(['jquery','Cookie', 'api','easyui','easylang'], function ($){
    $(function() {
        $.parser.parse();
        initMenu();
       
    });
    function initMenu() {
        $('#aa').on('click','.menu_link',function() {
            var title =$(this).text();
           var isExist = $('#tt').tabs('exists',title);
           if(isExist) {
               $('#tt').tabs('select',title);
               return;
           }else{
               $('#tt').tabs('add',{
                   title:title,
                   href:$(this).attr('url'),
                   iconCls:$(this).attr('iconCls'),
                   closable:true
               });
               console.log($(this).attr('url'));
           }


        });
        //第一步加载菜单数据
        $.ajax({
            url:'http://localhost:3000/site_nav',
            data:'',
            type:'GET',
            dataType:'json'
        }).done(function(resData) {
            // ajax请求成功后
            //第二步把数据生成放到页面上去

            console.log(resData);
            //生成子菜单
            for(var i=0;i<resData.length;i++) {
            
                var childhtml=[];

                for(var j=0;j<resData[i].children.length;j++) {
                    var t =resData[i].children[j];
                    childhtml.push('<p><a iconCls="'+t.iconCls +'" class="menu_link" href="javascript:"url="'+t.url +'">'+ t.title+'</a></p>');
                }
              
                $('#aa').accordion('add', {
                    title:resData[i].title,
                    content:childhtml.join(''),
                    iconCls:resData[i].iconCls,
                    selected:false
                });
            }
        });
        

    }
});