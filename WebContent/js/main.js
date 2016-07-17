 var loginDivClosed = false;//用户登录的DIV是否被关闭
 $(function(){
//    $(".ui-nav").headroom({
//        "tolerance": 5,
//        "offset": 51,
//        "classes": {
//            "initial": "animated",
//            "pinned": "slideDown",
//            "unpinned": "slideUp"
//        }
//    });
    $('.ui-sel').on('change',function(){
        var selText = $(this).find("option:selected").text();
        $(this).siblings('.selText').text(selText);
    });

    //阅读条款
    $('.ui-clause').on('click',function(){
        $(this).toggleClass('clauseCur');
    });

    //获取验证码
    var authCodeNum = 60;
    var codeTimer = null;
    var sendMess = false;
    $('.ui-get-authcode').on('click',function(){
    	
    	if(sendMess == false){
    		 sendMess = true;
    		 clearInterval(codeTimer);
    	        //$('.ui-get-authcode').off('click');
    	        var _this = $(this);
    	        codeTimer = setInterval(function(){
    	            if(authCodeNum > 0){
    	                authCodeNum--;
    	                _this.text('('+authCodeNum+') 秒');
    	            }else{
    	                $('.ui-get-authcode').text('重新获取验证码');
    	               //$('.ui-get-authcode').on('click');
    	                authCodeNum = 60;
    	                sendMess = false;
    	                clearInterval(codeTimer);
    	            }
    	        },1000);
    	}       
    });

    //开展菜单
    /*$('.ui-menu').bind('click',function(){
    	var shopListDiv = $("#shopListDiv");
    	var showPageDiv = $("#showPageDiv");
    	var indexFooter = $("#indexFooter");
    	var searchDiv = $(".nav-list-find");
    	var searchDisplay=searchDiv.css("display");
    	if(searchDisplay=='none'){
    		searchDiv.css("display",'block');
    	} else{
    		searchDiv.css("display",'none');
    	}
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
        $("#dingtop").hide();
        $('.ui-categoryCon').toggle();
        if(loginDivClosed != null && !loginDivClosed){
        	//如果用户登录的DIV没有被关闭，则将其隐藏
        	$('#footLoginRegDiv').hide();
        }
    });*/

    //屏幕尺寸发生
    $('input').each(function(){
        $(this).on('blur',function(){
            $('.ui-nav').css({'position':'absolute','top':'0px'});
        });
    });
});
 
 //懒加载交换data-src与src的值
 var moveImg=function(oImgs){
		  for(var i=0; i<oImgs.length; i++){
	    	;(function(i){
	    		if(!($(window).height()<$(oImgs[i]).offset().top && $(window).scrollTop()+$(window).height()<$(oImgs[i]).offset().top || $(window).scrollTop()>$(oImgs[i]).offset().top+$(oImgs[i]).outerHeight())){
		         	$(oImgs[i]).attr('src',$(oImgs[i]).attr('data-src'));
		         	oImgs[i].onerror=function(){
		         		$(oImgs[i]).attr('src',brandPath+'/images/default.png');
		         		$(oImgs[i]).attr('data-src',brandPath+'/images/default.png');
		         	};
			        $(oImgs[i]).load(function(){
					    if($(oImgs[i]).attr('src')!=brandPath+'/images/default.png'){
					    	$(oImgs[i]).siblings().fadeIn(800);
					    }
					});
				 }
	    	})(i);
	    };
	};