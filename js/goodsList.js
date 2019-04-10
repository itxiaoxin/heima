$(function () {

  // 点击搜索图标实现侧滑效果
  $('.mui-icon-search').on('tap', function () {
    mui('.mui-off-canvas-wrap').offCanvas().toggle();
  });

  // renderMainData();这里不需要再调用了，因为下拉刷新初始化时设置了首次加载刷新一次

  // 这是发送请求时服务器端要求传入的参数，由于后面侧滑菜单搜索时需要传入query这个参数，所以将data定义为一个全局变量
  var data = {
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
  //由于下拉和上拉都是通过这个方法发送请求，但是处理的业务逻辑不一样，所以只能通过回调函数自己调用自己，实现不同的业务逻辑
  function renderMainData(callback, obj) {
    // console.log(data);
    $.ajax({
      type: 'get',
      url: 'goods/search',
      data: $.extend(data, obj),
      dataType: 'json',
      success: function (result) {
        // console.log(result)
        callback(result);
        $('body').removeClass('loadding');
      }
    })
  }

  // 下拉刷新初始化
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      //  down表示下拉刷新
      down: {
        height: 50,//可选,默认50.触发下拉刷新拖动距离
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        // 下拉松开手指后就会触发
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          // 下拉时重置页码
          $('body').addClass('loadding');
          data.pagenum = 1;
          renderMainData(function (result) {
            if (result.meta.status == 200) {
              var html = template('goodsListTemp', result.data);
              $('.pyg_content .goods_list').html(html);
              mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
              // 为了防止切换分类的时候，无法再上拉加载，因此在每次刷新的时候将上拉加载重新启用
              mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
            }
          })
        }

      },
      up: {
        height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: false,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据
          data.pagenum++;
          renderMainData(function (result) {
            if (result.meta.status == 200) {

              // 判断返回结果中是否还有数据
              if (result.data.goods.length > 0) {
                // 如果有，就加载
                var html = template('goodsListTemp', result.data);
                $('.pyg_content .goods_list').append(html);
                /* 加载完新数据后，需要执行endPullupToRefresh()方法，结束转雪花进度条的“正在加载...”过程
                   若还有更多数据，则传入false; 
                   否则传入true，之后滚动条滚动到底时，将不再显示“上拉显示更多”的提示语,而显示“没有更多数据了”的提示语*/
                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
              } else {
                // 如果没有数据了，就禁用上拉加载
                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);//
              }

            }
          })
        }
      }
    }
  });

  $('.query_btn').on('tap', function () {
    var obj = {};
    obj.query = $('.query_txt').val();
    renderMainData(function (result) {
      console.log(result.data);
      var html = template('queryGoodsTemp', result.data);
      $('.queryList').html(html)

    }, obj)
  })


})