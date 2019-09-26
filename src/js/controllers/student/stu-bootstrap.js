require.config({
  paths: {
    jquery: '/lib/jquery-1.12.4.min',
    bootstrap: '/lib/bootstrap/js/bootstrap',
    api: '/js/service/api',
    tpl: '/js/tmpl/tpl',
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    }
  }
});

define(['jquery'], function ($) {
  $(function () {
    
  });
});