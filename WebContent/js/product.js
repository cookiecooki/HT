$.ajaxSetup(
	{
	  async:true,
	  error: function(){
	    $("#loading").hide();
      	$("#shade").hide();
      },
	  beforeSend:function(XMLHttpRequest){
		  $("#loading").show();
		  $("#shade").show();
      },
      complete:function(XMLHttpRequest,textStatus){
      	$("#loading").hide();
      	$("#shade").hide();
      }
	}
);
window.onload = function() {
	$(window).scroll(function(){
		var scorllHeight = $(window).scrollTop();
		var signHegith = $("a[name='jump']").offset().top;
		scrollPagination(scorllHeight, signHegith);
	});
}
$(function(){
	loadPriceAndColor(sku12);
	//inCollectCheck();
});
//窗体滚动时焦点变换，隐藏、显示搭配按钮
function scrollPagination(scorllHeight, signHegith){
	$(".pagination").show();
	var zoom = $(".pinch-zoom img").height();
	var paginationsize = $(".pagination span").size() - 1;
	for (var i = 0; i < paginationsize; i++) {
		var starth = parseInt(zoom) * i - 80;
		var endh = parseInt(zoom) * (i + 1) - zoom / 2;
		if (starth <= scorllHeight && scorllHeight <= endh) {
			$(".pagination span[name='icon']").removeClass().addClass("swiper-pagination-switch");
			$(".pagination span[name='icon']").eq(i).addClass("swiper-pagination-switch swiper-active-switch");
		}
	};
	$("#combination").next().hide();
	$(".collocationList > li").find("img").size() > 0 ? $("#combination").show() : "";
	if (scorllHeight >= (signHegith - zoom / 2)) {
		$(".pagination").hide();
		$("#combination").hide();
		$("#combination").next().hide();
	}
}
//选中一个颜色
function selectColor(obj){
	var pnum12 = $(obj).attr("name");
	if($(obj).hasClass("currentOk")){
		if(sku12 != pnum12){
			var purl = $("input[name=lsPic_" + pnum12 + "]").val();
			$("#reviewimgurl").attr("src", purl);
			$("#reviewSku").val(pnum12);
			showReviewPic(true);
		}
	}else{
		$("#checkcolor").find("li").removeClass("currentOk");
		$(obj).addClass("currentOk");
		loadPriceAndColor(pnum12);
		resetColorText(pnum12);
	}
}
//重设颜色框的显示值
function resetColorText(pnum12){
	$("#checkcolor li").each(function(index, item){
		var ctext = $(this).find("input[type='hidden'][name='ctext']").attr("value");
		$(this).find("div").html(ctext);
		if($(this).hasClass("currentOk") && pnum12 != sku12){
			$(this).find("div").html("点击预览");
		}
	});
}
//加载价格和尺码
function loadPriceAndColor(pnum12){
	$.ajax({
		url: basePath + "/getSizeAndPrice.do",
		type: "post",
		data: "sku12=" + pnum12,
		dateType: "json",
		success: function(json){
			if(json.status == 0){
				resetSizeAndPrice(json.sizeVos);
			}
		}
		,beforeSend:function(){}
	});
}
//重置尺码和价格
function resetSizeAndPrice(sizeVos){
	resetSelNum();
	var html = "";
	var hangPrice = null;
	var price = null;
	var discount = 1;
	var isSale = "N";
	$.each(sizeVos, function(index, item){
		if(index == 0){
			hangPrice = item.hangPrice;
			price = item.price;
			discount = item.salePoint;
			isSale = item.isSale;
			resetPrice(price, hangPrice, isSale, discount);
		}
		if(item.stoNum < 1){
			html += "<li class=\"clickable\" onclick='return false;'>";
		}
		else{
			html += "<li onclick='proSizeClick(this);'>";
		}
		html += "<span><span style=\"color:#000;font-size:14px\">" + item.sdisplayName + "</span>" + item.sname + "</span>";
		html += "<span style=\"display:none\" class=\"xuan-r\"></span>";
		html += "<input type='hidden' name='_snumber' value='" + item.snumber + "'/><input type='hidden' name='stoNum' value='" + item.stoNum + "'/></li>";
	});
	$("#checksize").html(html);
	$("#checksize li[class!='clickable']:eq(0)").click();
}
//重置价格
function resetPrice(price, hangPrice, isSale, discount){
	$(".money-t").html("￥" + price);
	$(".discount-price").html("￥" + hangPrice);
	discount = (Number(parseFloat(discount) * 10).toFixed(2) + "").replace(/\.?0+$/, "");
	$("#discount").html(discount + "折");
	if("Y" == isSale.toUpperCase() && discount < 10 && discount > 0 && hangPrice != price){
		$(".discount-price").show();
		$("#discount").show();
	}else{
		$(".discount-price").hide();
		$("#discount").hide();
	}
}
//重置选则的商品数为1
function resetSelNum(){
	$("#buycount").html(1);
	$(".minus").css("background", "#ccc");
	$(".shopNumTips").html("");
}
//尺码点击事件
function proSizeClick(obj){
	resetSelNum();
	if (!$(obj).hasClass("clickable")){
		var sto = $(obj).find("input[name='stoNum']").val();
		if(parseInt(sto) <= 10) {
			$(".shopNumTips").html("仅剩" + sto + "件，马上抢购哦！");
		}
		$("#checksize").find("li").removeClass("currentOk");
		$(obj).addClass("currentOk");
	}
};
//显示或者隐藏预览
function showReviewPic(isShow){
	if(isShow){
		$("#globalBody").hide();
		$(".reviewPicture").show();
	}else{
		$("#globalBody").show();
		$(".reviewPicture").hide();
	}
}
//查看详情
function reviewDetail(){
	var pnum12 = $("#reviewSku").val();
	window.location.href = basePath + "/staticpage/" + pnum12 + ".html";
}
//显示搭配
function showDp(){
	$("#combination").hide();
	$("#combination").next().show();
	$(".collocationList > li").find("img").each(function() {
		var org = $(this).attr("org-src");
		$(this).attr("src", org);
	});
}
function closeDp(){
	var combin = $('#combination');
	combin.next('div').hide();
	combin.show();
}
//加一件
function addCount(){
	var sub = $("#buycount").html();
	var checkSize = $("#checksize li.currentOk:first");
	if(checkSize.length == 1){
		var stoNum = $(checkSize).find("input[name=stoNum]").val();
		if (parseInt(sub) + 1 <= parseInt(stoNum)) {
			$("#buycount").html(parseInt(sub) + 1);
			$(".minus").css("background", "#000");
		}
	}
}
//减一件
function subCount(){
	var sub = $("#buycount").html();
	if(parseInt(sub) < 2){
		return
	}
	sub = parseInt(sub) - 1;
	$("#buycount").html(sub);
	if(sub <= 1){
		$(".minus").css("background", "#ccc");
	}
}
//加入或者查看购物清单
function shoppingCart(){
	if($("#addCollectA").html() == "查看购物清单"){
		window.location.href = basePath + "/toLZCollectList.do";
	}else{
		loginCheck("addCollect");
	}
}
//添加收藏
function addCollect(isLogin){
	if(isLogin){
		$.ajax({
			url: basePath + "/addLZCollect.do",
			type: "post",
			data: "pnumber=" + sku12 + "&productId=0",
			dateType: "json",
			success: function(json){
				if(json.status == 0){
					$("#addCollectA").html("查看购物清单");
				}
				showAlert(json.messg);
			}
		});
	}else{
		toLogin();
	}
}
//去往登录页
function toLogin(){
	window.location.href = basePath + "/beforeLogin.do?reqUrl=" + basePath + "/staticpage/" + sku12 + ".html";
}
//登录检查
function loginCheck(flag){
	var bandCheck = "false";
	if(flag == "buy" || flag == "addCollect"){
		bandCheck = "true";
	}
	$.ajax({
		url: basePath + "/chLogin.do",
		data: "bandCheck=" + bandCheck,
		type: "post",
		dateType: "json",
		success: function(json){
			var isLogin = false;
			if(json.status == "0"){
				if(json.result == "0"){
					isLogin = true;
				}
				if(flag == "addCollect"){
					addCollect(isLogin);
				}else if(flag == "freeSpecial"){
					freeSpecial(isLogin);
				}else if(flag == "buy"){
					buy(isLogin);
				}
			}else{
				showAlert("查询会员信息失败");
			}
		}
	});
}
//显示获取免费邮寄特权
function freeSpecial(isLogin){
	if(isLogin){
		$("#freeSpecialImg").attr("src", basePath + "/getGuideBindQrCode.do?tamp=" + new Date().getTime());
		$("#zhezhao").show();
		$("#freeSpecialDiv").show();
	}else{
		toLogin();
	}
}
//隐藏获取免费邮寄特权
function freeSpecialHide(){
	$('#zhezhao').hide();
	$('#freeSpecialDiv').hide();
}
//获取当前选中对的颜色的3位SKU
function getSeltColor(){
	var colorNum = $("#checkcolor li.currentOk input[name='cnum']").val();
	if(colorNum != null && colorNum != ''){
		return colorNum;
	};
	return "";
}
//获取当前选中对的尺码的3位SKU
function getSeltSize(){
	var sizeNum = $("#checksize li.currentOk input[name='_snumber']").val();
	if (sizeNum != null && sizeNum != '') {
		return sizeNum;
	};
	return "";
}
//获取当前选中的15位SKU
function getSeltSku15(){
	return sku12.substr(0, 9) + getSeltColor() + getSeltSize();
}
function toBuy(){
	var sku15 = getSeltSku15();
	if(sku15.length != 15){
		showAlert("请先选择颜色和尺码");
	}else{
		loginCheck("buy");
	}
}
function buy(isLogin){
	if(isLogin){
		var sku15 = getSeltSku15();
		if(sku15.length != 15){
			showAlert("请先选择颜色和尺码");
		}else{
			var num = $("#buycount").html();
			window.location.href = basePath + "/toPay.do?clear=1&skuList=" + sku15 + "*" + num;
		}
	}else{
		$(".bg-add").show();
		$(".settlement").show();
	}
}
//判断是否已经添加收藏
function inCollectCheck(){
	$.ajax({
		url: basePath + "/inCollectCheck.do",
		data: "sku12=" + sku12,
		type: "post",
		cache: false,
		dataType: "json",
		success: function(json){
			if(json.status == 0 && json.result == 0){
				$("#addCollectA").html("查看购物清单");
			}
		}
	});
}
function toAdvPage(){
	window.location.href = "";
}