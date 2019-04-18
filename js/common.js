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
        
        // 如果访问的是私有路径，就通过设置请求头把token值手动传送给服务器，根据接口文档设置 键名Authorization
        if(obj.url.indexOf('/my/')!=-1){
            xhr.setRequestHeader("Authorization",sessionStorage.getItem('pyg_token'))
        }
    }

    // zepto扩展自定义方法 getParam获取url地址栏中的参数
    $.extend($,{
        getParam:function(url){
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
    })

})