$(function(){
	//恢复A元素跳转
	$('body').on('tap','a',function(){
		mui.openWindow({
			url: $(this).attr('href')
		});
	})
})

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