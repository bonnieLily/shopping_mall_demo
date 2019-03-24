$(function(){

	/*
	* 修改密码
	* 1.获取修改密码按钮 添加点击事件
	* 2.获取用户输入的信息
	* 3.用户输入的信息校验
	* 4.调用修改密码接口 实现修改密码功能
	* 5.跳转登录页面 用户重新登录
	*/
	$('#modify-btn').on('tap',function(){
		var originPass = $.trim($("[name='originPass']").val());
		var newPass = $.trim($("[name='newPass']").val());
		var confirmNewPass = $.trim($("[name='confirmNewPass']").val());
		var vCode = $.trim($("[name='vCode']").val());

		if(!originPass){
			mui.toast('请输入原密码');
			return;
		}
		if(!newPass){
			mui.toast('请输入新密码')
			return;
		}
		if(!confirmNewPass){
			mui.toast('请再次输入新密码');
			return;
		}
		if(newPass != confirmNewPass){
			mui.toast('新密码和确认密码请输入一致')
			return;
		}
		if(!vCode){
			mui.toast('请输入验证码')
			return;
		}
		$.ajax({
			url: '/user/updatePassword',
			type: 'post',
			data: {
				oldPassword: originPass,
				newPassword: newPass,
				vCode: vCode
			},
			success: function(res){
				console.log(res)
				if(res.success==true){
					mui.toast('修改密码成功！');
					setTimeout(function(){
						location.href='login.html'
					},1000)
				}
			}
		})
	})

	//获取认证码

	$('#getCode').on('tap',function(){
		$.ajax({
			url: '/user/vCodeForUpdatePassword',
			type: 'get',
			success: function(res){
				console.log(res.vCode)
			}
		})
	})

	$('.mui-icon-back').on('tap',function(){
		history.back();
	})

})