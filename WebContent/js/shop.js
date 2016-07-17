var globalCtx='';
var sortType = 4;
$(function(){
	var totalPage="";
	var Request = new Object();  
    Request = GetRequest();  
    var category = Request["category"];  
    var pname = Request["pname"];
    var priceRange = Request["priceRange"]; 
    function GetRequest() {  
        var url = location.search; //获取url中"?"符后的字串   
        var theRequest = new Object();  
        if (url.indexOf("?") != -1) {  
            var str = url.substr(1);  
            strs = str.split("&");  
            for (var i = 0; i < strs.length; i++) {  
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);  
            }  
        }  
        return theRequest;  
    }  
	
    //筛选商品排行方式
    $('.ui-shopMenu li').on('click',function(){
    	$(".ui-shopMenu li").removeClass("cur");
       $(this).addClass('cur');
    });
    $(".ui-shopMenu li:first").addClass('cur');
    var ctx = $('context').data('ctx') ;
    globalCtx = ctx;
//    var pname = $('#pname').attr("value");
    var target=true;
    all();
    loadList(sortType,1);
    
    function all(){
    	$.ajax({
    		type: "post", 
      		url:basePath+"toShopListNum.do",
      		data:{
      		"category":category,
      		"pname":pname,
      		"priceRange":priceRange
      		},
      		cache:false,
      		dataType:"json",
      		success:function(data) {
      			if(data.data.productCount=='0') {
	      			showEmpty();
	      			return;
	      			--pageIndex;
	      			target=true;
	      		}
      			$("#noshopDiv").hide();
      			totalPage = data.data.totalPage;
      			$("span.shopNumer").html("共 "+data.data.productCount+" 款商品");
      			$("#shopCategory").show();
      			setTimeout(function(){
      				$("#shopCategory").hide();
      			},3000);
      			if(data.data.cname != null && data.data.cname != ""){
      				$("label").text("品类  "+data.data.cname);
      			}
      		}
    	});
    }
    
    //加载列表category
    function loadList(sortType,pageIndex){
        $.ajax({ 
      		type: "post", 
      		url:basePath+"toShopListJson.do",
      		data:{
      		"category":category,
      		"sortType":sortType,
      		"pageIndex":pageIndex,
      		"pname":pname,
      		"priceRange":priceRange
      		},
      		cache:false,
      		dataType:"text",
      		beforeSend:function(XMLHttpRequest){
      			$(".zai").show();
            },
      		success:function(data) {
      			if(data && data.length){
      				$(".zai").hide();
      			};
	      		if(data=='' && data.length < 1) {
	      			$(".ui-shopMenu").hide();
	      			showEmpty();
	      			$(".zai").hide();
	      			--pageIndex;
	      			target=true;
	      		}else{
	      			target=true;
	      			$("#noshopDiv").hide();
	      			$(".ui-shopMenu").show();
	      	        var productArray = eval(data);
   		    	    var w = $(window).width() /2;
   		    	    w = w*1.6 + 'px';
	      	        
	     		    $.each(productArray,function(idx,values){
	     		    	//加载数据
	     		    	if(values.salePoint != null && values.isSale != null && values.isSale.trim().toUpperCase() == "Y"){
	     		    		var html = '<li><a data-ajax="false" href="'+basePath+'staticpage/'+values.pnumber+'.html"><div class="shopPic"><img class="lazy" src="'+WEBAPP+'/images/default.png" data-src="'+values.picture+'" style="height:'+w+';" />';
	     		    		if(values.issell == 2){
	     		    			html += '<span class="advanveImg">预售</span>';
	     		    		}
     		    			html += '</div><p class="money-j"><a class="yuan-jia">￥'+values.salePrice+'</a><del class="xi-jia">￥'+values.price+'</del><span class="five-z">'+values.salePoint+'折</span></p></a></li>';
     		    			$("#shopList").append(html);
	     		    	}else{
	     		    		var html = '<li><a data-ajax="false" href="'+basePath+'staticpage/'+values.pnumber+'.html"><div class="shopPic"><img class="lazy" src="'+WEBAPP+'/images/default.png" data-src="'+values.picture+'" style="height:'+w+';"/>';
	     		    		if(values.issell == 2){
	     		    			html += '<span class="advanveImg">预售</span>';
	     		    		}
	     		    		html += '</div><p class="money-j" style="text-align:center !important">￥'+values.price+'</p></a></li>';
	     		    		$("#shopList").append(html);
	     		    	}
	     		    });
	     		    var oImgs=$('#shopList img');
		     		moveImg(oImgs);
		     		$(window).scroll(function(){
		     		  moveImg(oImgs);
		     		});
	      		}
      		},      	
      		error: function(XMLHttpRequest, textStatus, errorThrown) {
      			$(".zai").hide();
      			--pageIndex;
      			target=true;
            }
      });
    }
    
    function showEmpty(){
    	if($("#shopList > li").length < 1){
  			$(".ui-shopMenu").hide();
  			$("#noshopDiv").html("<img src='"+WEBAPP+"/images/none-shop.png' width='200'  style='position:absolute;top:50%;left:50%; margin-top:-110px; margin-left:-100px;'/>");
  			$("#noshopDiv").show();
  			$('#jiazai').hide();
		}
    }

    var range = 50;            //距下边界长度/单位px  
    var elemt = 500;           //插入元素高度/单位px  
    var totalheight = 0;   
    var pageIndex=1;
    
    //滚动加载
    $(window).scroll(function(){
	      if(target){
	    	  var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
	          totalheight = parseFloat($(window).height()) + parseFloat(srollPos)+100;
	      	　　if(($(document).height()-range) <= totalheight && pageIndex<totalPage){
	      		    ++pageIndex;
	      		    loadList(sortType,pageIndex);
	      		    target = false;
	      	　　}
	      }
	   
    });
    //按价格排序
    $("#sortJ").bind('click',function(){
    	pageIndex = 1;
    	if($("#jj").attr("class")=="icon"){
    		sortType = 1;
    		$("#jj").attr("class","icon1");//从小到大
    		$("#xx").attr("class","icon1");
    	}else{
    		sortType = 0;
    		$("#jj").attr("class","icon");
    		$("#xx").attr("class","icon1");
    	}
    	$("#shopList").empty();
		loadList(sortType,pageIndex);
    });
    
    //按销量排序
    $("#sortX").bind('click',function(){
    	pageIndex = 1;
    	if($("#xx").attr("class")=="icon1"){
    		sortType = 2;
    		$("#xx").attr("class","icon");//从大到小
    		$("#jj").attr("class","icon");
    	}else{
    		sortType = 3;
    		$("#xx").attr("class","icon1");
    		$("#jj").attr("class","icon");
    	}
    	$("#shopList").empty();
		loadList(sortType,pageIndex);
    });
    
    //人气 && 新品  绑定事件 默认传递 sortType 4  分页为 1
    $("#popularityAndProduct").bind("click",function(){
    	pageIndex = 1;
    	sortType = 4;
    	$("#jj").attr("class","icon");
    	$("#shopList").empty();
    	loadList(4,1);
    }); 
    $("#popularityAndProduct2").bind("click",function(){
    	sortType = 5;
    	pageIndex = 1;
    	$("#jj").attr("class","icon");
    	$("#shopList").empty();
    	loadList(5,1);
    });
});
