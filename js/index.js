$(function () {
    // 动态生成轮播图结构
    $.ajax({
        type: 'get',
        url: 'http://157.122.54.189:9094/api/public/v1/home/swiperdata',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            if (result.meta.status == 200) {
                var html = template('pyg_bannerTemp', result);
                var indicatorHtml = template('pyg_indicatorTemp', result)
                // console.log(html);
                $('.pyg_banner .pyg_slider').html(html)
                $('.pyg_banner .pyg_indicator').html(indicatorHtml)
                mui('.mui-slider').slider({
                    //自动轮播周期，若为0则不自动播放，默认为0；
                    interval: 2000
                });
            }

        }
    })
})