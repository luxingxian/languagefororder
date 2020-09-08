/**
 *默认加载当天数据 
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
		url: "order/selectAllOrderByTimeQuantum",
		data: {
			beginTime: today,
			endTime: today
		},
		success: function(inq) {
			console.log(inq);
			var orderqty = inq.data.orderStatisticsVo.totalCount;
			var foodsales = inq.data.foodCount;
			var salesvolume = inq.data.orderStatisticsVo.totalPrice;
			var FoodTopVos = inq.data.orderFoodTopVos;
			var PriceTopVos = inq.data.orderPriceTopVos;
			$("#orderqty").html(orderqty);
			$("#foodsales").html(foodsales);
			$("#salesvolume").html("$" + salesvolume);
			for(i = 0; i < FoodTopVos.length; i++) {
				var FoodT = '<tr>' +
								'<td>' + parseInt(i + 1) + '</td>' +
								'<td>' +
									'<span>' + FoodTopVos[i].categoryName + '</span>' +
								'</td>' +
								'<td>' +
									'<p>' + FoodTopVos[i].foodName + '</p>' +
									'<p>' + FoodTopVos[i].enFoodName + '</p>' +
								'</td>' +
								'<td>' +
									'<span>' + FoodTopVos[i].foodTotalCount + '</span>' +
								'</td>' +
							'</tr>';
				$("#lefttbody").append(FoodT);
			}
			for(i = 0; i < PriceTopVos.length; i++) {
				var PriceT = '<tr>' +
								'<td>' + parseInt(i + 1) + '</td>' +
								'<td>' +
									'<span>' + PriceTopVos[i].categoryName + '</span>' +
								'</td>' +
								'<td>' +
									'<p>' + PriceTopVos[i].foodName + '</p>' +
									'<p>' + PriceTopVos[i].enFoodName + '</p>' +
								'</td>' +
								'<td>' +
									'<span>' + PriceTopVos[i].foodTotalPrice + '</span>' +
								'</td>' +
							'</tr>';
				$("#righttbody").append(PriceT);
			}

		}
	});
});
/**
 *点击加载当天数据 
 * **/
$(".pdspan").click(function() {

	$("#date").html("开始时间 —— 结束时间<em class='upsan'></em>");

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
		url: "order/selectAllOrderByTimeQuantum",
		data: {
			beginTime: today,
			endTime: today
		},
		success: function(inq) {
			var orderqty = inq.data.orderStatisticsVo.totalCount;
			var foodsales = inq.data.foodCount;
			var salesvolume = inq.data.orderStatisticsVo.totalPrice;
			var FoodTopVos = inq.data.orderFoodTopVos;
			var PriceTopVos = inq.data.orderPriceTopVos;

			$("#orderqty").html(orderqty);
			$("#foodsales").html(foodsales);
			$("#salesvolume").html("$" + salesvolume);

			var Foodlist = "";
			for(i = 0; i < FoodTopVos.length; i++) {
				var FoodT = '<tr>' +
								'<td>' + parseInt(i + 1) + '</td>' +
								'<td>' +
									'<span>' + FoodTopVos[i].categoryName + '</span>' +
								'</td>' +
								'<td>' +
									'<p>' + FoodTopVos[i].foodName + '</p>' +
									'<p>' + FoodTopVos[i].enFoodName + '</p>' +
								'</td>' +
								'<td>' +
									'<span>' + FoodTopVos[i].foodTotalCount + '</span>' +
								'</td>' +
							'</tr>';
				Foodlist += FoodT;
			}
			document.getElementById("lefttbody").innerHTML = Foodlist;

			var Pricelist = "";
			for(i = 0; i < PriceTopVos.length; i++) {
				var PriceT = '<tr>' +
								'<td>' + parseInt(i + 1) + '</td>' +
								'<td>' +
									'<span>' + PriceTopVos[i].categoryName + '</span>' +
								'</td>' +
								'<td>' +
									'<p>' + PriceTopVos[i].foodName + '</p>' +
									'<p>' + PriceTopVos[i].enFoodName + '</p>' +
								'</td>' +
								'<td>' +
									'<span>' + PriceTopVos[i].foodTotalPrice + '</span>' +
								'</td>' +
							'</tr>';
				Pricelist += PriceT;
			}
			document.getElementById("righttbody").innerHTML = Pricelist;
		}
	});
});

$(document).ready(function() {
	//================日历插件==========
	var dateRange1 = new pickerDateRange('date', {
		isTodayValid: true,
		startDate: "",
		endDate: "",
		needCompare: false,
		defaultText: ' 至 ',
		autoSubmit: true,
		inputTrigger: 'input_trigger1',
		theme: 'ta',
		success: function(obj) {
			//			$("#dCon2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);

			/**点击日历加载数据 **/
			var startDate = obj.startDate;
			var endDate = obj.endDate;

			$.ajax({
				type: "get",
				url: "order/selectAllOrderByTimeQuantum",
				data: {
					beginTime: startDate,
					endTime: endDate
				},
				success: function(inq) {
					var orderqty = inq.data.orderStatisticsVo.totalCount;
					var foodsales = inq.data.foodCount;
					var salesvolume = inq.data.orderStatisticsVo.totalPrice;
					var FoodTopVos = inq.data.orderFoodTopVos;
					var PriceTopVos = inq.data.orderPriceTopVos;

					$("#orderqty").html(orderqty);
					$("#foodsales").html(foodsales);
					$("#salesvolume").html("$" + salesvolume);

					var Foodlist = "";
					for(i = 0; i < FoodTopVos.length; i++) {
						var FoodT = '<tr>' +
										'<td>' + parseInt(i + 1) + '</td>' +
										'<td>' +
											'<span>' + FoodTopVos[i].categoryName + '</span>' +
										'</td>' +
										'<td>' +
											'<p>' + FoodTopVos[i].foodName + '</p>' +
											'<p>' + FoodTopVos[i].enFoodName + '</p>' +
										'</td>' +
										'<td>' +
											'<span>' + FoodTopVos[i].foodTotalCount + '</span>' +
										'</td>' +
									'</tr>';
						Foodlist += FoodT;
					}
					document.getElementById("lefttbody").innerHTML = Foodlist;

					var Pricelist = "";
					for(i = 0; i < PriceTopVos.length; i++) {
						var PriceT = '<tr>' +
										'<td>' + parseInt(i + 1) + '</td>' +
										'<td>' +
											'<span>' + PriceTopVos[i].categoryName + '</span>' +
										'</td>' +
										'<td>' +
											'<p>' + PriceTopVos[i].foodName + '</p>' +
											'<p>' + PriceTopVos[i].enFoodName + '</p>' +
										'</td>' +
										'<td>' +
											'<span>' + PriceTopVos[i].foodTotalPrice + '</span>' +
										'</td>' +
									'</tr>';
						Pricelist += PriceT;
					}
					document.getElementById("righttbody").innerHTML = Pricelist;
				}
			});
		}
	});

	//时间选择初始显示内容
	$("#date").html("开始时间 —— 结束时间<em class='upsan'></em>");
	//日历显示位置设定
	function date_position() {
		var topp = $(".polling_top").offset().top - $(".l_date").scrollTop();
		topp = topp + 70;
		var leftt = $(".l_date").offset().left;
		var l_date_width = $(".l_date").outerWidth();
		var date_width = $(".ta_calendar").outerWidth();
		date_width = date_width / 4;
		leftt = leftt + l_date_width / 2;
		$(".ta_calendar").css({ "top": topp, "left": leftt, "margin-left": -date_width });
	};
	date_position();
	//================日历插件--ed--==========
});