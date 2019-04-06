$(function () {
    // 解决移动端点击a标签不能跳转的问题，这是mui框架的默认设置，需要手动设置tap事件实现跳转
    mui('body').on('tap', 'a',function () {
            document.location.href = this.href;
        })
    // 定义基准路径
    const baseURL = 'http://157.122.54.189:9094/api/public/v1/';
    // 添加zepto拦截器，它的作用是让每个ajax请求都经过这个函数进行处理
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        // console.log(obj);
        // 拼接路径并重新赋值 obj.url就是发送ajax请求时的url
        obj.url = baseURL + obj.url;
    }
})