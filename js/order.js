/**
 *获取默认当天数据 
 * **/
$(function() {
	var mydate = new Date();
	var yy = mydate.getFullYear();
	var mm = mydate.getMonth() + 1;
	if(mm < 10) {
		mm = "0" + mm;
	} else {
		mm = mm;
	}
	var dd = mydate.getDate();
	if(dd < 10) {
		dd = "0" + dd;
	} else {
		dd = dd;
	}
	var today = yy + "-" + mm + "-" + dd;

	$.ajax({
		type: "get",
		url: "order/selectOrderByTime",
		data: {
			dateTime: today
		},
		success: function(order) {
			console.log(order);

			$("#totalCount").html(order.data.orderStatisticsVo.totalCount);
			$("#totalPrice").html("$" + order.data.orderStatisticsVo.totalPrice);

			var orderVoList = order.data.orderVoList;

			var outhtml = "";
			var orderhtml = '<div class="orderone" id="' + today + '">' +
								'<div class="ordertime">' +
									'<em></em><span>' + today + '</span><em></em>' +
								'</div>' +
								'<ul>' +
								'</ul>' +
							'</div>';
			outhtml += orderhtml;
			document.getElementById("orderlist").innerHTML = outhtml;
			
			var Dayid = 0;
			$(orderVoList).each(function() {
				Dayid++;
				if(Dayid < 10){
					var Dayhtml = "000"+Dayid;
				}else if(Dayid < 100){
					var Dayhtml = "00"+Dayid;
				}else if(Dayid < 1000){
					var Dayhtml = "0"+Dayid;
				}
				var foodlist = "";
				for(i = 0; i < this.foodVos.length; i++) {
					var foodV = '<tr>' +
									'<td>' + parseInt(i + 1) + '</td>' +
									'<td>' +
										'<p>' + this.foodVos[i].name + '</p>' +
										'<p>' + this.foodVos[i].enName + '</p>' +
									'</td>' +
									'<td>' + this.foodVos[i].foodCount + '</td>' +
									'<td>' + this.foodVos[i].price + '</td>' +
								'</tr>';
					foodlist += "<tbody>" + foodV + "</tbody>";
				}
				var orderV = '<li>' +
								'<div class="listone">' +
									'<div class="listtop">' +
										'<em></em><span>NO.' + Dayhtml + '</span><em></em>' +
									'</div>' +
									'<div class="listnews">' +
										'<p>ID：' + this.code + '</p>' +
										'<p>TIME：' + this.updateTime + '</p>' +
										'<p>selling price：$' + this.totalPrice + '</p>' +
									'</div>' +
									'<div class="newstext">' +
										'<em></em><span>详&nbsp;情</span><em></em>' +
									'</div>' +
									'<table>' +
										'<thead>' +
											'<tr>' +
												'<th width="67%" colspan="2">菜品名称</th>' +
												'<th width="11%">数量</th>' +
												'<th>售价($)</th>' +
											'</tr>' +
										'</thead>' +
										foodlist +
									'</table>' +
								'</div>' +
							'</li>';
				$("#" + today + " ul").prepend(orderV);
			});

		}
	});
});
/**
 **列表点击效果 
 * **/
$("body").delegate(".orderlist ul li", "click", function() {
	var thisli = $(this).index() + 1;
	var chuli = (thisli / 4).toFixed(2);
	var yuli = chuli.substr(-2);
	var thisheight = $(this).find(".listone").height();
	if(yuli == 25) {
		$(".orderlist ul li .listone").css("height", "156px");
		$(".orderlist ul li").css({ "margin-bottom": "0px", "height": "auto" });
		$(this).css({ "margin-bottom": "20px" }).find(".listone").css("height", "auto");
		$(this).next().css({ "margin-bottom": "20px" }).find(".listone").css("height", "auto");
		$(this).next().next().css({ "margin-bottom": "20px" }).find(".listone").css("height", "auto");
		$(this).next().next().next().css({ "margin-bottom": "20px" }).find(".listone").css("height", "auto");
		var one = $(this).height();
		var two = $(this).next().height();
		var three = $(this).next().next().height();
		var four = $(this).next().next().next().height();

		function array_max(arr) {
			var max = arr[0];
			for(var i in arr) {
				if(arr[i] > max) { max = arr[i]; }
			}
			return max;
		}
		var data = [one, two, three, four];
		$(this).css({ "height": array_max(data) });
		$(this).next().css({ "height": array_max(data) });
		$(this).next().next().css({ "height": array_max(data) });
		$(this).next().next().next().css({ "height": array_max(data) });
	} else {}
	if(yuli == 50) {
		$(".orderlist ul li .listone").css("height", "156px");
		$(".orderlist ul li").css({ "margin-bottom": "0px", "height": "auto" });
		$(this).css("margin-bottom", "20px").find(".listone").css("height", "auto");
		$(this).prev().css("margin-bottom", "20px").find(".listone").css("height", "auto");
		$(this).next().css("margin-bottom", "20px").find(".listone").css("height", "auto");
		$(this).next().next().css("margin-bottom", "20px").find(".listone").css("height", "auto");
		var one = $(this).height();
		var two = $(this).prev().height();
		var three = $(this).next().height();
		var four = $(this).next().next().height();

		function array_max(arr) {
			var max = arr[0];
			for(var i in arr) {
				if(arr[i] > max) { max = arr[i]; }
			}
			return max;
		}
		var data = [one, two, three, four];
		$(this).css({ "height": array_max(data) });
		$(this).prev().css({ "height": array_max(data) });
		$(this).next().css({ "height": array_max(data) });
		$(this).next().next().css({ "height": array_max(data) });
	} else {}
	if(yuli == 75) {
		$(".orderlist ul li .listone").css("height", "156px");
		$(".orderlist ul li").css({ "margin-bottom": "0px", "height": "auto" });
		$(this).css("margin-bottom", "20px").find(".listone").css("height", "auto");
		$(this).prev().css("margin-bottom", "20px").find(".listone").css("height", "auto");
		$(this).prev().prev().css("margin-bottom", "20px").find(".listone").css("height", "auto");
		$(this).next().css("margin-bottom", "20px").find(".listone").css("height", "auto");
		var one = $(this).height();
		var two = $(this).prev().height();
		var three = $(this).prev().prev().height();
		var four = $(this).next().height();

		function array_max(arr) {
			var max = arr[0];
			for(var i in arr) {
				if(arr[i] > max) { max = arr[i]; }
			}
			return max;
		}
		var data = [one, two, three, four];
		$(this).css({ "height": array_max(data) });
		$(this).prev().css({ "height": array_max(data) });
		$(this).prev().prev().css({ "height": array_max(data) });
		$(this).next().css({ "height": array_max(data) });
	} else {}
	if(yuli == 00) {
		$(".orderlist ul li .listone").css("height", "156px");
		$(".orderlist ul li").css({ "margin-bottom": "0px", "height": "auto" });
		$(this).css("margin-bottom", "20px").find(".listone").css("height", "auto");
		$(this).prev().css("margin-bottom", "20px").find(".listone").css("height", "auto");
		$(this).prev().prev().css("margin-bottom", "20px").find(".listone").css("height", "auto");
		$(this).prev().prev().prev().css("margin-bottom", "20px").find(".listone").css("height", "auto");
		var one = $(this).height();
		var two = $(this).prev().height();
		var three = $(this).prev().prev().height();
		var four = $(this).prev().prev().prev().height();

		function array_max(arr) {
			var max = arr[0];
			for(var i in arr) {
				if(arr[i] > max) { max = arr[i]; }
			}
			return max;
		}
		var data = [one, two, three, four];
		$(this).css({ "height": array_max(data) });
		$(this).prev().css({ "height": array_max(data) });
		$(this).prev().prev().css({ "height": array_max(data) });
		$(this).prev().prev().prev().css({ "height": array_max(data) });
	} else {}
	if(thisheight > 156) {
		$(".orderlist ul li .listone").css("height", "156px");
		$(".orderlist ul li").css({ "margin-bottom": "0px", "height": "auto" });
	} else {}
});
/**
 **时间插件
 * **/
$(function() {
	$("#date").datepicker({
		maxDate: new Date(),
		onSelect: function(dateText, inst) {
			/**获取点击时间数据**/
			var optDate = dateText;
			$.ajax({
				type: "get",
				url: "order/selectOrderByTime",
				data: {
					dateTime: optDate
				},
				success: function(order) {
					$("#totalCount").html(order.data.orderStatisticsVo.totalCount);
					$("#totalPrice").html("$" + order.data.orderStatisticsVo.totalPrice);

					var orderVoList = order.data.orderVoList;

					var outhtml = "";
					var orderhtml = '<div class="orderone" id="' + optDate + '">' +
										'<div class="ordertime">' +
											'<em></em><span>' + optDate + '</span><em></em>' +
										'</div>' +
										'<ul>' +
										'</ul>' +
									'</div>';
					outhtml += orderhtml;
					document.getElementById("orderlist").innerHTML = outhtml;

					var Dayid = 0;
					$(orderVoList).each(function() {
						Dayid++;
						if(Dayid < 10){
							var Dayhtml = "000"+Dayid;
						}else if(Dayid < 100){
							var Dayhtml = "00"+Dayid;
						}else if(Dayid < 1000){
							var Dayhtml = "0"+Dayid;
						}
						var foodlist = "";
						for(i = 0; i < this.foodVos.length; i++) {
							var foodV = '<tr>' +
											'<td>' + parseInt(i + 1) + '</td>' +
											'<td>' +
												'<p>' + this.foodVos[i].name + '</p>' +
												'<p>' + this.foodVos[i].enName + '</p>' +
											'</td>' +
											'<td>' + this.foodVos[i].foodCount + '</td>' +
											'<td>' + this.foodVos[i].price + '</td>' +
										'</tr>';
							foodlist += "<tbody>" + foodV + "</tbody>";
						}
						var orderV = '<li>' +
										'<div class="listone">' +
											'<div class="listtop">' +
												'<em></em><span>NO.' + Dayhtml + '</span><em></em>' +
											'</div>' +
											'<div class="listnews">' +
												'<p>ID：' + this.code + '</p>' +
												'<p>TIME：' + this.updateTime + '</p>' +
												'<p>selling price：$' + this.totalPrice + '</p>' +
											'</div>' +
											'<div class="newstext">' +
												'<em></em><span>详&nbsp;情</span><em></em>' +
											'</div>' +
											'<table>' +
												'<thead>' +
													'<tr>' +
														'<th width="67%" colspan="2">菜品名称</th>' +
														'<th width="11%">数量</th>' +
														'<th>售价($)</th>' +
													'</tr>' +
												'</thead>' +
												foodlist +
											'</table>' +
										'</div>' +
									'</li>';
						$("#" + optDate + " ul").prepend(orderV);
					});

				}
			});
		},
	});
});
jQuery(function($) {
	$.datepicker.regional['zh-CN'] = {
		dateFormat: 'yy-mm-dd'
	};
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

//$(window).scroll(function(event){
//	if ($(this).scrollTop() + $(window).height() + 10 >= $(document).height() && $(this).scrollTop() > 10) {
//		var optDate = "2017-06-10";
//		$.ajax({
//			type: "get",
//			url: "order/selectOrderByTime",
//			data:{
//				dateTime: "2017-06-10"
//			},
//			success: function(order) {
//				$("#totalCount").html(order.data.orderStatisticsVo.totalCount);
//				$("#totalPrice").html("$" + order.data.orderStatisticsVo.totalPrice);
//				
//				var orderVoList = order.data.orderVoList;
//				
//				var outhtml = "";
//				var orderhtml = '<div class="orderone" id="' + optDate + '">' +
//									'<div class="ordertime">' +
//										'<em></em><span>' + optDate + '</span><em></em>' +
//									'</div>' +
//									'<ul>' +
//									'</ul>' +
//								'</div>';
//				outhtml += orderhtml;
//				
//				$(".orderlist").append(outhtml);
//				
//				$(orderVoList).each(function() {
//					var foodlist = "";
//					for(i = 0; i < this.foodVos.length; i++) {
//						var foodV = '<tr>' +
//										'<td>' + parseInt(i + 1) + '</td>' +
//										'<td>' +
//											'<p>' + this.foodVos[i].name + '</p>' +
//											'<p>' + this.foodVos[i].enName + '</p>' +
//										'</td>' +
//										'<td>' + this.foodVos[i].foodCount + '</td>' +
//										'<td>' + this.foodVos[i].price + '</td>' +
//									'</tr>';
//						foodlist += "<tbody>" + foodV + "</tbody>";
//					}
//					var orderV = '<li>' +
//									'<div class="listone">' +
//										'<div class="listtop">' +
//											'<em></em><span>NO.' + this.codeOfDay + '</span><em></em>' +
//										'</div>' +
//										'<div class="listnews">' +
//										'<p>ID：' + this.code + '</p>' +
//											'<p>TIME：' + this.updateTime + '</p>' +
//											'<p>selling price：$' + this.totalPrice + '</p>' +
//										'</div>' +
//										'<div class="newstext">' +
//											'<em></em><span>详&nbsp;情</span><em></em>' +
//										'</div>' +
//										'<table>' +
//											'<thead>' +
//												'<tr>' +
//													'<th width="67%" colspan="2">菜品名称</th>' +
//													'<th width="11%">数量</th>' +
//													'<th>售价($)</th>' +
//												'</tr>' +
//											'</thead>' +
//											foodlist +
//										'</table>' +
//									'</div>' +
//								'</li>';
//					$("#" + optDate + " ul").prepend(orderV);
//				});
//				
//			}
//		});
//	}
//});