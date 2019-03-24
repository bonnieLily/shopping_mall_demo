$(function(){

	mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
// 获取一级分类的数据
	$.ajax({
		url:'/category/queryTopCategory',
		type:'get',
		success:function(response){
			// 将数据和html做拼接
			//1.html模板id
			//2.数据---对象
			//3.告诉模板引擎 html模板和数据怎么拼接
			//template方法将拼接好的数据以返回值形式返回
			var html = template('category-first',{result: response.rows});
			$('#links').html(html);

			// 如果一级分类有数据，默认选第一个
			if(response.rows.length){
				var id = response.rows[0].id;
				$('#links').find('a').eq(0).addClass('active')
				// 根据一级分类id获取二级分类
				getSecondCategory(id)
			}
		}
	});
/*
	点击一级分类获取二级分类的数据
	  1.一级分类添加点击事件
		2.在事件处理函数中获取到一级分类的id
		3.调用二级分类的接口，获取对应的数据
		4.将数据展示到对应的位置中
		5.如果接口中没有数据，要在页面中显示暂无数据
*/
	//1.由于一级分类的a标签是模板动态追加的数据，需要给父元素事件委托
	$('#links').on('click','a',function(){
		//2.获取当前点击的一级分类id
		var id = $(this).attr('data-id')
		$(this).addClass('active').siblings().removeClass('active')
		//3.调用接口 获取数据
		getSecondCategory(id)
	})
});

function getSecondCategory(id){
	$.ajax({
			url:'/category/querySecondCategory',
			type:'get',
			data: {
				id:id
			},
			success: function(response){
				var html = template('category-second',response)
				$('.brand-list').html(html)
			}
	});
}