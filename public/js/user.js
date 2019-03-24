//保存用户信息
var userInfo = null;

	//解决页面闪烁的问题
	//获取用户信息 并且要处理 用户未登录的问题
	$.ajax({
		url:'/user/queryUserMessage',
		type: 'get',
		//同步
		async: false,
		success: function(res){
			//用户没有登录 跳转 login.html
			if(res.error&&res.error==400){
				location.href="login.html"
			}
			userInfo = res;
		}
	})

$(function(){

	/**
	* 退出登录
	*	1.获取退出登录按钮 添加点击事件
	* 2.调用退出登录接口 实现退出登录
	* 3.如果退出成功 跳转到首页
	*/
	$('#login-out').on('click',function(){
		$.ajax({
			url: '/user/logout',
			type: 'get',
			success: function(res){
				if(res.success){
					mui.toast('退出登录成功')
					setTimeout(function(){
						location.href="index.html"
					},1000)
				}
			}
		})
	})

	// 获取用户信息 展示数据 拼接模板
	var html = template('userTpl',userInfo)
	$('#userInforBox').html(html)

})