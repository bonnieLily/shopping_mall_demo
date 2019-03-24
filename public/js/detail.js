$(function(){
	//获取产品的id
	var id = getParamsByUrl(location.href,'id')
	//库存数量
	var kucunum = 0;

	var size = null;

	var proId = 0;

	var numL = 1;

	$.ajax({
		url: '/product/queryProductDetail',
		type: 'get',
		data: {
			id: id
		},
		success: function(res){
			console.log(res)
			kucunum=res.num;
			proId=res.id;
			$('#kucun').children().text(kucunum)

			var html = template('detailTpl',res)
			$('#product-box').html(html)

			//获得slider插件对象
			var gallery = mui('.mui-slider');
			gallery.slider();
		}
	})

	$('.mui-icon-back').on('tap',function(){
		history.back();
	})

	$('#product-box').on('tap','.size span',function(){
		$(this).addClass('active').siblings().removeClass('active')
		//用户选择了尺码
		size = $(this).html()
	})

	var oInp = $('#inp')

	$('#increase').on('tap',function(){
		var num = oInp.val()
		num++;
		if(num > kucunum){
			num = kucunum;
		}
		oInp.val(num);

		numL = num;
	})
	$('#reduce').on('tap',function(){
		var num = oInp.val()
		num--;
		if(num < 1){
			num = 1;
		}
		oInp.val(num);

		numL = num;

	})

	//加入购物车
	/*
	1.获取加入购物车按钮 添加点击事件
	2.判断用户是否选择了尺码
	3.调用加入购物车接口
	4.成功，提示用户加入购物车成功 是否跳转购物车页面
	*/
	$('#addCart').on('tap',function(){
		if(!size){
			mui.toast('请选择尺码');
			return;
		}
		$.ajax({
			url: '/cart/addCart',
			type: 'post',
			data: {
				productId: proId,
				num: numL,
				size: size
			},
			success: function(res){
				if(res.success){
					mui.confirm('加入购入车成功，跳转到购物车？',function(message){
						if(message.index==1){
							//跳转购物车
							location.href='cart.html';
						}
					})
				}
			}
		})
	})

})