require.config({
  paths: {
    jquery: '/lib/jquery-1.12.4.min',
    easyui: '/lib/jquery-easyui-1.8.1/jquery.easyui.min',
    api: '/js/service/api',
    tpl: '/js/tmpl/tpl',
    easylang: '/lib/jquery-easyui-1.8.1/locale/easyui-lang-zh_CN'
  },
  shim: {
    easyui: {
      deps: ['jquery']
    },
    easylang: {
      deps: ['jquery']
    }
  }
});

define(['jquery', 'api', 'easyui', 'easylang'], function ($, api) {
  $(function () {
    $.parser.parse();
    initMenu();
  });

  function initMenu() {

    $('#aa').on('click', '.menu_link', function () {
      var title = $(this).text();
      var isExist = $('#tt').tabs('exists', title);
      if (isExist) {
        $('#tt').tabs('select', title);
        return;
      }

      $('#tt').tabs('add', {
        title: title,
        closable: true,
        href: $(this).attr('url'),
        iconCls: $(this).attr('iconcls')
      });
    });


    $.ajax({
      url: 'http://localhost:34000/site_nav',
      data: '',
      type: 'GET',
      dataType: 'json'
    }).done(function (resData, sttatus, xhr) {
      console.log(resData);
      for (var i = 0; i < resData.length; i++) {
        var childHtml = [];
        for (var j = 0; j < resData[i].children.length; j++) {
          var t = resData[i].children[j];
          childHtml.push('<p><a href="javascript:" iconcls="' + t.iconCls + '" class="menu_link" url="' + t.url + '">' + t.title + '</a></p>');
        }

        $('#aa').accordion('add', {
          title: resData[i].title,
          iconCls: resData[i].iconCls,
          content: childHtml.join(),
          selected: false
        });
      }
    });

  }
});