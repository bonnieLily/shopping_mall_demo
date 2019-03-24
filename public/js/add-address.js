$(function(){

		//创建picker选择器
	var picker = new mui.PopPicker({
		layer: 3
	}); 
	//为picker选择器添加数据
	picker.setData(provice);

	$('#selectCity').on('tap',function(){
		picker.show(function(selectItem){
			$('#selectCity').val(selectItem[0].text+
				selectItem[1].text+selectItem[2].text)
		})
	})

	//添加收货地址功能
	/*
	1.获取确认按钮添加 点添加击事件
	2.获取用户输入的表单信息
	3.对用户输入的表单信息进行校验
	4.输入合法的信息 调用收货地址接口
	5.成功 跳转回收货地址列表页面
	*/

	$('#confirm-btn').on('tap',function(){
		var recipients = $.trim($("[name='recipients']").val());
		var postcode = $.trim($("[name='postcode']").val());
		var address = $.trim($("[name='address']").val());
		var addressDetail = $.trim($("[name='addressDetail']").val());

		if(!recipients){
			mui.toast('请输入收货人姓名');
			return;
		}
		if(!postcode){
			mui.toast('请输入邮政编码');
			return;
		}
		if(!address){
			mui.toast('请输入区县');
			return;
		}
		if(!addressDetail){
			mui.toast('请输入详细地址');
			return;
		}

		$.ajax({
			url: "/address/addAddress",
			type: 'post',
			data: {
				recipients: recipients,
				postcode: postcode,
				address: address,
				addressDetail: addressDetail
			},
			success: function(res){
				if(res.success){
					mui.toast('地址添加成功');
					setTimeout(function(){
						location.href="address.html"
					},1000);
				}
			}
		})

	})
	
})