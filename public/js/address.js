$(function(){

	//获取用户存储的收货地址
	/*
	*/
	//存储收货地址的数组
	var address = null;

	$.ajax({
		url: '/address/queryAddress',
		type: 'get',
		success: function(res){
			address = res;
			var html = template('addressTpl',{result: res})
			$('#address-box').html(html)
		}
	})

	//删除收货地址
	/*
	1.给删除按钮添加点击事件
	2.弹出一个删除确认框
	3.如果用户点击确认 删除 反之不删
	4.调用删除收货地址接口 完成删除功能
	5.刷新单前页面
	*/
	$('#address-box').on('tap','.delete-btn',function(){

		var id = this.getAttribute('data-id');
		var li = this.parentNode.parentNode;

		mui.confirm('确定要删除吗?',function(message){
			//用户确认删除
			if(message.index==1){
				$.ajax({
					url: '/address/deleteAddress',
					type: 'post',
					data: {
						id: id
					},
					success: function(res){
						if(res.success==true){
							location.reload();
						}
					}
				})
			}else{
				//取消删除,关闭滑出的效果
				mui.swipeoutClose(li)
			}
		})
	})

	/*
	编辑收货地址
	1.给编辑按钮添加点击事件
	2.跳转到 收货地址编辑页面
	3.点击的这条数据传递展示到当前编辑页面
	4.给确认按钮添加点击事件
	5.调用接口 执行编辑操作
	6.编辑成功 跳转回收货地址列表页面
	*/
	$('#address-box').on('tap','.edit-btn',function(){
		console.log(address)
		var id = this.getAttribute('edit-id');
		for(var i=0;i<address.length;i++){
			if(address[i].id==id){
				localStorage.setItem('editAddress',JSON.stringify(address[i]));

				break;//终止循环
			}
		}
		//跳转到编辑页面
		location.href="edit-address.html";
		
	})

})