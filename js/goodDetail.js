$(function () {
    // 区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false    //设置没有滚动条，默认值是ture
    });


    // 发送ajax请求获取数据，渲染页面
    $.ajax({
        type: 'get',
        url: 'goods/detail',
        data: $.getParam(location.search),
        dataType: 'json',
        success: function (result) {
            // console.log(result);
            var html = template('goodTemp', result.data);
            $('.goodsInfo').html(html);
            //mui-图片轮播初始化
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    })
})