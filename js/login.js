$(function(){
    // 登录业务
    $('.logIn').on('tap',function(){
        var username=$('.userName').val();
        var password=$('.password').val();
        // 1.验证用户名和密码是否符合格式
        if(/^1[3-9]\d{9}$/.test(username) && /^\w{6}$/.test(password)){

            // 2.符合格式，发送ajax请求
            $.post('login',{username:username,password:password},function(result){
                // console.log(result);
                if(result.meta.status==200){
                    // 登录成功
                    // 1.把token值手动存储到本地存储中
                    sessionStorage.setItem('pyg_token',result.data.token)
                    // 2.返回之前操作的页面
                    location.href=sessionStorage.getItem('redirectUrl')

                }else {
                    mui.toast(result.meta.msg)
                }
            },'json')
        }else {
            mui.toast('手机号或密码格式不对')
        }
    })
})