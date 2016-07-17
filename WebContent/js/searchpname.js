//搜索框获得焦点
function tipsBgshow(obj) {
	//obj.value="";
	$(".tipsBg").css("display", "block");
	$("#ss").show();
	$("#fh").hide();
}
//搜索框失去焦点
function tipsBghide() {
	$(".tipsBg").css("display", "none");
	$("#fh").show();
	$("#ss").hide();
}
//搜索
function searchpname(){
	var _value = $("#_searchtext").val();
    _value = _value.replace(/[ ]/g,"");
    if(_value=='') {
    	tipsBghide();
    	return false;
    }
    else
    {
    	_value = encodeURI(encodeURI(_value));
    }
    window.location.href = basePath+'/page/shopList.html?pname='+_value;
}
//搜索框返回
/*function dychangeList() {
	$("#dingtop").show();
	$(".nav-list-find").css("display","none"); //搜索框的隐藏
	$(".tipsBg").css("display","none");
	var shopListDiv = $("#shopListDiv");
	var showPageDiv = $("#showPageDiv");
	var indexFooter = $("#indexFooter");
	
	if(shopListDiv.is(":hidden"))
	{
		shopListDiv.show();
	}else
	{
		shopListDiv.hide();
	}
	
	if(showPageDiv.is(":hidden"))
	{
		showPageDiv.show();
	}else
	{
		showPageDiv.hide();
	}
	
	if(indexFooter.is(":hidden"))
	{
		indexFooter.show();
	}else
	{
		indexFooter.hide();
	}

	if(loginDivClosed != null && !loginDivClosed){
    	//如果用户登录的DIV没有被关闭，则将其显示
    	$('#footLoginRegDiv').show();
    }
    $('.ui-categoryCon').toggle();
}*/