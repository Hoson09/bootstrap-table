/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 14:41:34
 * @LastEditTime: 2019-08-17 15:23:14
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
        initTable();
       
    });
    function initTable() {
        $('#coursett').datagrid({
            // url: '/api/course',//rows:一页有多少条，page：请求当前页
            title: '课程列表',
            width: 800,
            height: 400,
            fitColumns: true,
            method: 'GET',  // http请求的方法
            idField: 'id',  // 主键
            loadMsg: '正在加载用户的信息...',
            pagination: true, // 是否用分页控件
            singleSelect: false, // 是否是单行选中
            pageSize: 10,  // 默认一页多少条
            pageNumber: 1, // 默认显示第几页
            pageList: [10, 20, 30],
            queryParams: null,//让表格在加载数据的时候，额外传输的数据。
            onBeforeLoad: function (param) {  // 表格控件请求之前，可以设置相关参数。
              // param = {page: 1, rows: 10}
              param._page = param.page;
              param._limit = param.rows;
              param._sort = 'id';
              param._order = 'desc';
            },
            loader: function (param, successfn, errorfn) {
              $.ajax({
                url: 'http://localhost:3000/course',
                data: param,  // 恩国际 _page 和_limit  
                type: 'GET',
                dataType: 'json',
                success: function (resData, status, xhr) {
                  var total = parseInt(xhr.getResponseHeader('X-Total-Count'));
                  var datagridData = { rows: resData, total: total };
                  successfn(datagridData);
                },
                error: errorfn
              });
            },
            onLoadSuccess: function (data) {  // 后台请求成功之后，自动调用次方法
              console.log(data);
            },
            columns: [[
              { field: 'ck', checkbox: true, align: 'left', width: 50 },
              { field: 'id', title: '编号', width: 80 },
              { field: 'course_name', title: '课程名', width: 120 },
              { field: 'author', title: '作者', width: 120 },
              { field: 'college', title: '大学', width: 220 },
              {
                field: 'category_Id', title: '分页', width: 120, formatter: function (value) {
                  return '分类' + value;
                }
              }
            ]],
            toolbar: [{
              id: 'btnDownShelf',
              text: '添加',
              iconCls: 'icon-add',
              handler: function () {
          
              }
            }, {
              id: 'btnDelete',
              text: '删除',
              iconCls: 'icon-cancel',
              handler: function () {
              }
            }, {
              id: 'btnEdit',
              text: '修改',
              iconCls: 'icon-edit',
              handler: function () {
              }
            }],
          
          });
          
    }
    
});