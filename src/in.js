exports.pagination = (total, pageSize, cur, url) => {
  total = total || 1; //页数
  pageSize = pageSize || 10; //一页多少条
  // 左边右边显示的个数

  var htmlshink = 5;

  var htmlPagination = "";

  if (total <= 0) {
    return "";
  }
  let maxPage = Math.ceil(total / pageSize);
  // 开始拼接字符串
  htmlPagination += `<div class="pagination is-rounded is-centered" role="navigation" aria-label="pagination">`;
  htmlPagination += `<a class="pagination-previous" href="${url+'?page=1'}">首页</a>`;
  htmlPagination += `<a class="pagination-previous" href="${cur>1? url+'?page='+(cur-1):''}">上一页</a>`;
  htmlPagination += `<a class="pagination-previous" href="${cur<maxPage? url+'?page='+(cur+1):''}">下一页</a>`;
  htmlPagination += `<a class="pagination-previous" href="${url+'?page='+maxPage}">尾页</a>`;
  htmlPagination += `<ul class=""pagination-list>`;
  if (cur > (htmlshink + 1)) {
    htmlPagination += `<li class="pagination">&infin;</li>`;
    continue;
  }
  for (let i = 0; i <= 2 * htmlshink; i++) {
    if (i = htmlshink) {
      htmlPagination += `<li class="pagination-link">${cur}</li>`;
    }
    var tempHtml = cur - htmlshink + i;
    if (tempHtml > 0 && tempHtml < maxPage) {
      htmlPagination += `<li class="pagination-link" href="${url}?page=${tempHtml}">${tempHtml}</li>`;
    }
  }

  if ((maxPage - cur) > (htmlshink + 1)) {
    htmlPagination += `<li class="pagination">&infin;</li>`;
  }
};