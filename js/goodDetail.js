$(function () {
    // 区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false    //设置没有滚动条，默认值是ture
    });

// 这是加入购物车时需要提交的数据，因为需要从商品详情数据中获取，所以创建一个全局变量
    var carInfo={
        cat_id:'',
        goods_id:'',
        goods_name:'',
        goods_number:'',
        goods_price:'',
        goods_small_logo:'',
        goods_weight:''

    }

    // 发送ajax请求获取商品详情数据，渲染页面
    $.ajax({
        type: 'get',
        url: 'goods/detail',
        data: $.getParam(location.search),
        dataType: 'json',
        success: function (result) {
            // console.log(result);
            // 以下信息是要发送加入购物车请求时需要提交的数据
            carInfo.cat_id=result.data.cat_id;
            carInfo.goods_id=result.data.goods_id;
            carInfo.goods_name=result.data.goods_name;
            carInfo.goods_number=result.data.goods_number;
            carInfo.goods_price=result.data.goods_price;
            carInfo.goods_small_logo=result.data.goods_small_logo;
            carInfo.goods_weight=result.data.goods_weight;

            var html = template('goodTemp', result.data);
            $('.goodsInfo').html(html);
            //mui-图片轮播初始化
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    })

    // 加入购物车
    $('.addCart').on('tap',function(){
        // 点击加入购物车，发送请求
        $.post('my/cart/add',carInfo,function(result){
            console.log(result);
            
        },'json')
    })
})