$(function () {
    banner();
    goodsList();
})

// 动态生成轮播图结构
function banner() {
    $.ajax({
        type: 'get',
        url: 'home/swiperdata',
        dataType: 'json',
        success: function (result) {
            if (result.meta.status == 200) {
                var html = template('pyg_bannerTemp', result);
                var indicatorHtml = template('pyg_indicatorTemp', result)
                $('.pyg_banner .pyg_slider').html(html)
                $('.pyg_banner .pyg_indicator').html(indicatorHtml)
                mui('.mui-slider').slider({
                    //自动轮播周期，若为0则不自动播放，默认为0；
                    interval: 2000
                });
            }

        }
    })
}

//动态加载商品列表
function goodsList() {
    $.ajax({
        type: 'get',
        url: 'home/goodslist',
        dataType: 'json',
        success: function (result) {
            if (result.meta.status == 200) {
                var html = template('goodsTemp', result);
                $('.pyg_goodsList').html(html);
            }
        }
    })
}