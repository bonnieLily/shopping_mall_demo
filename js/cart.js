$(function(){

	var shopCart = null;

	//查询用户的购物车
	//1.调用接口
	//2.展示购物车的数据
	$.ajax({
		url: '/cart/queryCart',
		type: 'get',
		success: function(res){
			if(res.error==400){
				mui.toast('查看购物车，请先登录哦(#^.^#)');
				setTimeout(function(){
					location.href="user.html"
				},1200)
			}
			if(res.length==0){
				mui.toast('您的购物车空空如也，赶快选购吧^_^')
				return;
			}
			console.log(res)
			var html = template('cartTpl',{result: res})
			$('#cart-box').html(html)

			shopCart=res;
		}
	})

	

	//跳转历史页面
	$('.mui-icon-back').on('tap',function(){
		history.back();
	})

	/*
	编辑我的购物车
	1.获取编辑按钮，给编辑按钮注册点击事件
	2.跳转到详情页，获取表单信息
	3.调取接口
	4.成功后 跳转到购物车页面
	*/
	$('#cart-box').on('tap','.edit-btn',function(){
		var id = this.getAttribute('edit-id')
		for(var i=0;i<shopCart.length;i++){
			if(shopCart[i].id==id){
				localStorage.setItem('shopCart',JSON.stringify(shopCart[i]));
				console.log(shopCart[i])
				break;
			}

			location.href="edit-cart.html";
		}
	})

	//删除购物车
	$('#cart-box').on('tap','.delete-btn',function(){
		var id = this.getAttribute('data-id')
		var li = this.parentNode.parentNode;

		mui.confirm('确定删除吗?',function(message){
			if(message.index==1){
				$.ajax({
					url: '/cart/deleteCart',
					type: 'get',
					data: {
						id: id
					},
					success: function(res){
						if(res.success==true){
							location.reload()
						}
					}
				})
			}else{
				//取消删除,关闭滑出的效果
				mui.swipeoutClose(li)
			}
		})
	})

})