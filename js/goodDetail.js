$(function () {
    // 区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //mui-图片轮播初始化
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
    });


    // // 发送ajax请求获取数据，渲染页面
    // $.ajax({
    //     type:'get',
    //     data:{goods_id:57444},
    //     dataType:'json',
    //     success:function(result){
    //         console.log(result)
    //     }
    // })
})