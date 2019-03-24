$(function(){
	var id = null;
	var address = null;
	if(localStorage.getItem('editAddress')){
			address=JSON.parse(localStorage.getItem('editAddress'))
			var html = template('editTpl',address)
			$('#editForm').html(html)
			id = address.id;
		}

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

	//编辑收货地址
	/*
	1.获取确认按钮 注册点击事件
	2.获取表单信息 验证
	3.调用编辑地址接口
	4.成功后 跳转到 收货地址列表
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
			url: "/address/updateAddress",
			type: 'post',
			data: {
				id: id,
				recipients: recipients,
				postcode: postcode,
				address: address,
				addressDetail: addressDetail
			},
			success: function(res){
				if(res.success){
					mui.toast('地址编辑成功');
					setTimeout(function(){
						location.href="address.html"
					},1000);
				}
			}
		})

	})

})