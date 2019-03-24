//获取地址栏中输入的关键字
var keyword = getParamsByUrl(location.href,"keyword");
var page = 1;
var html="";
//价格排序规则，默认 升序
var priceSort = 1;
//销量排序规则，默认 升序
var soldNum = 1;
var This = null;

$(function(){
	/*
		根据用户输入的关键字获取搜索结果
			1.获取到地址栏中用户输入的搜索关键字
			2.用关键字去调取搜索接口
			3.将搜索结果展示到页面中
	*/

	mui.init({
  	pullRefresh : {
   	 	container:'#refreshContainer',
    	up : {
     	 height:50,//可选.默认50.触发上拉加载拖动距离
     	 auto:true,//可选,默认false.自动上拉加载一次
     	 contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
     	 contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
       callback :getData//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
   	 }
  	}
	});
	//callback 页面一上来的时候 会自动调用一次
	//当页面上拉到底部时 还会继续调用

	/*
		按照价格对商品进行排序
		1.对价格按钮添加点击事件(mui有轻敲事件)
		2.将价格排序规则传递到接口中
		3.对之前的各种配置进行初始化。。。
		   页面的数据清空  恢复当前页的值 1  重新开启上拉加载
		4.将排序后的结果重新展示在页面中
	*/
	$("#priceSort").on('tap',function(){
		//更改价格排序条件
		priceSort = priceSort == 1?2:1;
		html="";
		page=1;
		//重新上拉加载
		mui('#refreshContainer').pullRefresh().refresh(true);
		getData();
	})

	/*
		按照销量排序
		1.对销量按钮添加点击事件（mui的tap）
		2.将销量排序规则传递到接口中
		3.对之前的各种配置进行初始化
		4.将排序结果重新展示在页面
	*/
	$("#sold").on('tap',function(){
		soldNum=soldNum==1?2:1;
		html="";
		page=1;
		mui('#refreshContainer').pullRefresh().refresh(true);
		getData();
		console.log(soldNum)
	})

});

/**
*
*获取地址栏中的参数
*@param {string}url 地址字符串
*@param {string}name 要获取的参数名称
*@param {string} 参数名称对应的参数值
*/
function getParamsByUrl(url,name){
	var params = url.substr(url.indexOf('?')+1)
	var arr = params.split('&')
	for(var i=0;i<arr.length;i++){
		var current = arr[i].split('=');
		if(current[0]==name){
			return current[1]
		}
	}
	return null;
}

function getData(){
	if(!This){
		This = this;
	}
	
	$.ajax({
		url:'/product/queryProduct',
		type: 'get',
		data: {
			page: page++,
			pageSize: 2,
			proName:keyword,
			price:priceSort,
			num:soldNum
		},
		success:function(response){
			if(response.data.length>0){
				html += template('searchTpl',response)
				$("#search-box").html(html);
				//告诉上拉加载组件当前数据加载完毕
				This.endPullupToRefresh(false);
			}else {
				//告诉上拉组件当前没有更多数据了
				This.endPullupToRefresh(true);
			}
			
		}
	})
}