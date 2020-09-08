//左侧导航栏背景图片切换
$(function() {
	//左右等高处理
	$(".slideMenu").height($(".editorCenter").outerHeight());
	//侧边栏悬浮效果
	$(".slideMenu ul li").hover(function(){
		var src=$(this).find("img").attr("src");
		var pre=src.substring(0,src.indexOf(".")-1);
		$(this).find("img").attr("src",pre+"w.png");
	},function(){
		if($(this).hasClass("active")){
			return;
		};
		var src=$(this).find("img").attr("src");
		var pre=src.substring(0,src.indexOf(".")-1);
		$(this).find("img").attr("src",pre+"g.png");
	});
});