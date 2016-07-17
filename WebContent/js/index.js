/**
 * 
 * @authors WFE_jackiejiang (jackiejiang@tencent.com)
 * @date    2014-02-17 21:52:30
 */

var swiperArray = new Array();
$(function(){
    var dWidth = $(window).width();
    $('.showPic').width(dWidth);
    var paginationLen='';
    var cateCount = $("div.indexShowPic").length;
    for(var i=1;i<=cateCount;i++){
    	var mySwiper01 = new Swiper('.indexShowPic'+i,{
            pagination: '.pagination'+i,
            paginationClickable: true,
            onSlideChangeStart:function(swiper){
	         	$(swiper.container).find('.swiper-slide-active img').attr('src',$(swiper.container).find('.swiper-slide-active img').attr('data-src'));
            	$(swiper.container).find('.swiper-slide-active img').load(function() {
            		if(($(swiper.container).find('.swiper-slide-active img').attr('src')!=brandPath+'/images/default.png')){
            			$(swiper.container).find('.swiper-slide-active img').siblings().fadeIn(800);
				    }
			    })
			    $(swiper.container).find('.swiper-slide-active img')[0].onerror=function(){
            		$(swiper.container).find('.swiper-slide-active img').attr('src',brandPath+'/images/default.png');
            		$(swiper.container).find('.swiper-slide-active img').attr('data-src',brandPath+'/images/default.png');

        		}
            }
        });
        swiperArray.push(mySwiper01);
    }
});

function chLogin(){
	var result = false;	
	$.ajax({
        url: basePath + "chLogin.do",
        type: 'POST',      
        dataType: 'text',
        async: false,
        error: function(){
        },
        success: function(obj){
        	var v = eval('(' + obj + ')');
        	if('no' == v.login){
        		result = false;
        	}else{
        		result = true;
        	}        	
        }
   }); 
   return result;
}
$(window).load(function(){
    var cateCount = $("div.indexShowPic").length;
    for(var i=1;i<=cateCount;i++){
    	if($('.indexShowPic'+i+' .add-height-r').height()!=0){
    		$('.indexShowPic'+i+' .add-height-r').parent().siblings().show();
    	/*	$('.indexShowPic'+i+' .add-height-r .Atitle').show();*/
    	}else{
    		$('.indexShowPic'+i+' .add-height-r').parent().siblings().hide();
    		/*$('.indexShowPic'+i+' .add-height-r .Atitle').hide();*/
    	}
    }
})
