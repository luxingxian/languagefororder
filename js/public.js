//模拟Select下拉
$(document).ready(function() {
	$(".w_plate_class div p").click(function() {
		$(this).next().slideToggle();
		$(this).parent().siblings().find("ul").slideUp();
		return false;
	});
	$(".w_plate_class div ul li").not(".l_select_name").css("cursor", "pointer");
	$(".w_plate_class div ul li").not(".l_select_name").click(function() {
		$(this).parents("ul").siblings("p").find("i").html($(this).html());
		$(this).parents("ul").slideUp();
		$(".l_hide").removeClass("l_hide");
		
		if($('.s_gou').children('p').children('i').text() == '可购买') {
			$('.s_xian').fadeIn();
		} else {
			$('.s_xian').fadeOut();
		}
	});
	$(".w_plate_class div ul li").not(".l_select_name").hover(function() {
		$(this).css({
			"background": "#2e85f5",
			"color": "#fff"
		});
	}, function() {
		$(this).css({
			"background": "#fff",
			"color": "#a0a0a0"
		})
	});

	$(document).click(function() {
		$(".w_plate_class div ul").slideUp();
	});

	//	全部/今天/昨天/7天点击选中效果
	$(".l_header a").not(".l_ref").click(function() {
		$(".l_header a").removeClass("active");
		$(this).addClass("active");
	});
	//分页页码加减效果

	function pagenum() {
		var num = 1;
		$(".l_arrow_right").click(function() {
			num++;
			if(num > $(".l_totalnum").html()) {
				num = $(".l_totalnum").html();
			}
			$(".l_curentnum").html(num);
		});
		$(".l_arrow_left").click(function() {
			num--;
			if(num < 1) {
				num = 1;
			}
			$(".l_curentnum").html(num);
		});
	};
	pagenum();
	//分页页码加减效果--ed--	

	//操作浮窗操作事件
	var timer = null;
	$('.l_opt>img').mouseover(function() {
		var _this = $(this);
		clearTimeout(timer);
		$(".l_opt_tips").fadeOut();
		$('.l_opt>img').attr("src", "images/l_icon_more.png");
		timer = setTimeout(function() {
			_this.next(".l_opt_tips").fadeIn();
			_this.attr("src", "images/l_icon_more_h.png");
		}, 200);

	});
	$('.l_opt img').mouseout(function() {
		var _this = $(this);
		clearTimeout(timer);
		timer = setTimeout(function() {
			_this.next(".l_opt_tips").fadeOut();
			_this.attr("src", "images/l_icon_more.png");
		}, 1000);
	});
	$('.l_opt_tips').mouseover(function() {
		clearTimeout(timer);
	});
	$('.l_opt_tips').mouseout(function() {
		var this1 = $(this);
		clearTimeout(timer);
		timer = setTimeout(function() {
			this1.fadeOut();
			this1.prev().attr("src", "images/l_icon_more.png");
		}, 100);
	});
	/*ie8加边框*/
	$(function(){
		if(window.navigator.userAgent.indexOf('MSIE 8.0') != -1){					
			$('.f_border').addClass('f_show');
		} else {					
			$('.f_border').removeClass('f_show');
		}
	});
});