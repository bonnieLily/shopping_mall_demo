$(function(){

/*
* 注册
*1.给注册按钮添加点击事件
*2.获取用户注册的信息
*3.对用户输入的信息进行验证
*4.调用注册接口，实现注册功能
*5.给出提示 告诉用户是否注册成功
*6.立即跳转到登录页面
**/
	$('#register-btn').on('click',function(){
		var username=$('[name=username]').val();
		var mobile=$('[name=mobile]').val();
		var password=$('[name=password]').val();
		var againPass=$('[name=againPass]').val();
		var vCode=$('[name=vCode]').val();

		if(!username){
			mui.toast('请输入用户名')
			return;
		}
		if(mobile.length<11){
			mui.toast('请输入合法的手机号')
			return;
		}
		if(!password){
			mui.toast('请输入密码')
			return;
		}
		if(password!=againPass){
			mui.toast('两次输入的密码不一样')
			return;
		}
		if(vCode.length!=6){
			mui.toast('请输入正确的验证码')
			return;
		}

		$.ajax({
			url: '/user/register',
			type: 'post',
			data: {
				username: username,
				password: password,
				mobile: mobile,
				vCode: vCode
			},
			success: function(res){
				mui.toast('注册成功')
				setTimeout(function(){
					location.href="login.html"
				},1000)
			}
		})

	})

	//获取注册验证码
	//1.给获取认证码按钮注册点击事件
	//2.直接调用接口 获取认证码
	//3.将认证码输入到控制台
	$('#getCode').on('click',function(){
		$.ajax({
			url: '/user/vCode',
			type: 'get',
			success: function(response){
				alert(response.vCode)
			}
		})
	})

})