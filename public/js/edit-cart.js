$(function(){

var size =null;

	//返回历史页面
	$('.mui-icon-back').on('tap',function(){
		history.back()
	})

	//获取本地存储，渲染已选的商品详情页面
	if(localStorage.getItem("shopCart")){
		var content = JSON.parse(localStorage.getItem("shopCart"));
				console.log(content)
		var html = template('cartEdit',content)
		$('#product-box').html(html)

		var id = content.id;

		var numb = content.num;

		size = content.size;

		var kucun = content.productNum;

		var inpo = $('#inp')

		//渲染
		$("[size-cart='"+size+"']").addClass('active')
		inpo.val(numb)
		$('#kucun').children().text(kucun)

		//数量加减点击事件
		$('#increase').on('tap',function(){
			var num = inpo.val()
			num++;
			if(num > kucun){
				num = kucun;
			}
			inpo.val(num);
			numb = num;
		})
		$('#reduce').on('tap',function(){
			var num = inpo.val()
			num--;
			if(num < 1){
				num = 1;
			}
			inpo.val(num);
			numb=num;
		})

		//给尺码添加点击事件
		$('#product-box').on('tap','.size span',function(){
			$(this).addClass('active').siblings().removeClass('active')
			//用户选择了尺码
			size = $(this).html()
		})

		//
		$('#addCart').on('tap',function(){
			if(!size){
				mui.toast('请先选择尺码')
				return;
			}
			$.ajax({
				url: '/cart/updateCart',
				type: 'post',
				data: {
					id: id,
					size: size,
					num: numb
				},
				success: function(res){
					if(res.success){
						mui.confirm('修改购物车成功，跳转购物车页面？',function(mes){
							if(mes.index==1){
								location.href="cart.html";
							}
						})
					}
				}
			})


		})
			
		

	}

})