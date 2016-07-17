$(function(){
	$("#products>li").each(function(index,item){
		$ul = $(this).children("ul");
		if($ul.find("li").length == 0){
			$(this).children("div").removeClass().addClass("productTitle");
			$(this).children("div").children("span").remove();
			$(this).children("div").append("<i class='icon'></i>");
		}
	});
	
    //联动菜单
    $('.ui-tab-title2').on('click',function(){
        $(this).children().toggleClass('cur');
        if($(this).parent().siblings('.ui-tab-cont').is(':hidden')){
            $(this).parent().siblings('.ui-tab-cont').slideDown('fast');
            $(this).parent().parent().css("border-bottom","1px solid #000");
            $(this).parent().css("border-bottom","0");
        }else{
            $(this).parent().siblings('.ui-tab-cont').slideUp('fast');
            $(this).parent().parent().css("border-bottom","0px");
            $(this).parent().css("border-bottom","1px solid #000");
        }
    });
});


//js 动态搜索  zll
function dytreesearch(search) {
	search =search.replace(/[ ]/g,"");
//	$("div[id='div_ui-tab-title']").each(function(){
//        if($(this).siblings('.ui-tab-cont').is(':hidden')){
//        	//
//        }else{
//        	$(this).find('i').toggleClass('cur');
//			$(this).toggleClass('productTitleCur');
//           $(this).siblings('.ui-tab-cont').slideUp('fast');
//        }
//	});
	if(search != ''){
		$("div[id='div_ui-tab-title']").each(function(){
			var _object =$(this);
			var result = $(this).next().html();
			if(result.indexOf(search)!=-1){
				 $(this).toggleClass('productTitleCur');
       			 $(this).find('i').toggleClass('cur');
				 $(this).siblings('.ui-tab-cont').slideDown('fast');
			}
		});
	}
}