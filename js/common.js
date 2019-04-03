$(function(){
    // 定义基准路径
    const baseURL='http://157.122.54.189:9094/api/public/v1/';
    // 添加zepto拦截器，它的作用是让每个ajax请求都经过这个函数进行处理
    $.ajaxSettings.beforeSend=function(xhr,obj){
        // console.log(obj);
        // 拼接路径并重新赋值 obj.url就是发送ajax请求时的url
        obj.url=baseURL+obj.url;
    }
})