$(function () {

    // 封装页面渲染函数
    function render() {

        // 获取本地数据，判断是否超时，如果没有超时就直接使用本地数据进行数据结构的动态渲染
        var cataData = JSON.parse(localStorage.getItem('pyg_cateData'));
        if (cataData && Date.now() - cataData.time < 24 * 60 * 60 * 1000) {
            leftCatelist();
            rightCatelist(0);
        }
        // 如果超时，则再次发送ajax请求
        else {
            getCateList()
        }

    }
    render();

    // 发送请求获取数据
    function getCateList() {
        $('body').addClass('loadding');
        $.get('categories', function (result) {
            // console.log(result);
            if (result.meta.status == 200) {
                // 数据获取成功时，把数据存入本地存储，同时存入当前时间(Date.now()返回一个毫秒数)
                localStorage.setItem('pyg_cateData', JSON.stringify({
                    'list': result.data,
                    'time': Date.now()
                }));

                // 动态生成左侧导航项--1级分类数据
                leftCatelist();

                // 动态生成右侧导航项--2级分类数据
                rightCatelist(0);
            }
        }, 'json')
    }

    // 动态生成左侧导航项--1级分类数据
    function leftCatelist() {
        var cateData = JSON.parse(localStorage.getItem('pyg_cateData'));
        var html = template('leftnavTemp', cateData);
        $('.left ul').html(html);
        // Iscroll初始化
        var myScroll = new IScroll('.left');
        // 给左侧栏的li绑定tap事件
        $('.left').on('tap', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active');
            // 实现点击元素置顶
            myScroll.scrollToElement(this);
            //    动态渲染二级分类数据
            var index = $(this).index();
            rightCatelist(index);
        })
    }

    // 动态生成右侧导航项--2级分类数据
    function rightCatelist(index) {
        var data = JSON.parse(localStorage.getItem('pyg_cateData')).list[index];
        // console.log(data);
        var html = template('rightListTemp', data);
        $('.cateList').html(html);

        // 异步操作，结构生成之后图片还没有加载完成，
        // 所以Iscroll初始化要放在所有图片加载完成之后，否则cateList的高度会不够，导致不能滑动到最后
        var count = $('.cateList img').length;
        $('.cateList img').on('load', function () {
            //只要触发这个事件，就表示这张图片加载完成
            count--;            
            if (count == 0) {
                var iScroll = new IScroll('.right');
                $('body').removeClass('loadding');
            }
        })
    }

})