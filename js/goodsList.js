$(function () {

  // 点击搜索图标实现侧滑效果
  $('.mui-icon-search').on('tap', function () {
    mui('.mui-off-canvas-wrap').offCanvas().show();
  });
  
  // 下拉刷新初始化
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      //  down表示下拉刷新
      down: {
        height: 50,//可选,默认50.触发下拉刷新拖动距离
        auto: false,//可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；

        }

      },
      up: {
        height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: false,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据

        }
      }
    }
  });

  renderMainData();

  // 这是发送请求时服务器端要求传入的参数，由于后面侧滑菜单搜索时需要传入query这个参数，所以将data定义为一个全局变量
  var data = {
    query: '', //查询关键词
    cid: getParam(location.search).cid,  //分类id
    pagenum: 1,  //页数索引
    pagesize: 10 //每页长度
  }

  // 获取url地址栏中的参数
  function getParam(url) {
    var obj = {};
    // location.search为当前页面路径中?及?后面的部分  '?cid=5&name=jack...'
    var url = url.substring(1);//'cid=5&name=jack'
    var arr = url.split('&');//['cid=5','name=jack']
    for (i = 0; i < arr.length; i++) {  //遍历，再次进行拆分
      var temp = arr[i].split('='); //['cid',5]
      obj[temp[0]] = temp[1];
    }
    return obj
  }


  // 封装获取数据函数，因为后期下拉刷新和上拉加载时还需要使用到
  function renderMainData() {
    // console.log(data);
    $.ajax({
      type: 'get',
      url: 'goods/search',
      data: data,
      dataType: 'json',
      success: function (result) {
        // console.log(result)
        if (result.meta.status == 200) {
          var html = template('goodsListTemp', result.data)
          $('.pyg_content .goods_list').html(html)
        }
      }
    })
  }

})