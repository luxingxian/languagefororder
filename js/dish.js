	window.apiUrl="";
	$(document).ajaxStart(function(){
		$(".loading").show();
	});
	$(document).ajaxStop(function(){
		$(".loading").hide();
	});
//  加载缓慢时动画
	$.ajax({
		type:"get",
		url:apiUrl+"store/getStoreInfo",
		async:true,
		success:function(res){
			if(res.result){
				console.log(res);
				var templateId=res.data.templateId;
				$(".dish").attr("templateId",templateId);
			}
		}
	});
//  有图无图模板获取
	function show_img(){
		var templateId=$(".dish").attr("templateId");
		if(templateId==1){
			$(".th_img").html("");
			$(".td_img").html("");
		}
	};
//  根据模板选择显示或隐藏图片

	$(document).on("mouseover",".td_img img",function(){
		$(".big_img").attr("src",$(this).attr("src"));
		$(".show_box").stop(true,true).fadeIn(200);
	});
	$(document).on("mouseout",".td_img img",function(){
		$(".show_box").stop(true,true).fadeOut(200);
	});
//  品类维护选中操作
	$(document).on("click",".text",function(){
		if($(this).parents(".classify_list").hasClass("disable")){
			return;
		};
		$(".classify_list").removeClass("active");
		$(this).parents(".classify_list").addClass("active");
	});
//  品类维护选中操作=====ed======
//  品类上下排序icon第一个向上置灰，最后一个向下置灰
	function up_down(){
		var up="images/order_up.png"
		var up_disable="images/order_up_disable.png"
		var down="images/order_down.png"
		var down_disable="images/order_down_disable.png"
		$(".l_classify").find(".icon_up").attr("src",up);
		$(".l_classify").find(".classify_list:first").find(".icon_up").attr("src",up_disable);
		$(".l_classify").find(".icon_down").attr("src",down);
		$(".l_classify").find(".classify_list:last").find(".icon_down").attr("src",down_disable);
	};
//  品类上下排序icon第一个向上置灰，最后一个向下置灰----ed-----	

	function classify_order(storeCategoryId,flag){
		$.ajax({
			type:"post",
			url: apiUrl+"category/updateCategorySort",
			async:true,
			data:{storeCategoryId:storeCategoryId,flag:flag},
			success:function(res){
				if(res.result){
					console.log(res.msg);
				}
			}
		});
	};
//  排序接口调用---ed--

//  向上移动排序icon点击效果
	function classify_up(){
		$(document).on("click",".icon_up",function(){
			if($(this).parents(".classify_list").hasClass("disable")){
				return;
			}else if($(this).parents(".classify_list").index()==1){
				return;
			}else{
				$(this).parents(".classify_list").prev().before($(this).parents(".classify_list"));
				up_down();
			};
			var storeCategoryId=$(this).parents(".classify_list").attr("id");
			var flag=false;
			classify_order(storeCategoryId,flag);
		});
	};
//  向上移动排序icon点击效果----ed----
//  向下移动排序icon点击效果
	function classify_down(){
		$(document).on("click",".icon_down",function(){
			if($(this).parents(".classify_list").hasClass("disable")){
				return;
			}else if($(this).parents(".classify_list").index()==$(this).parents(".l_classify").find(".classify_list").length){
				return;
			}else{
				$(this).parents(".classify_list").next().after($(this).parents(".classify_list"));
				up_down();
			};
			var storeCategoryId=$(this).parents(".classify_list").attr("id");
			var flag=true;
			classify_order(storeCategoryId,flag);
		});
	};
//  向下移动排序icon点击效果----ed----

	$.ajax({
		type: "get",
		url: apiUrl+"category/selectCategories",
		async: true,
		dataType: "json",
		success: function(res) {
			if(res.result) {
				console.log(res)
				var promot = res.data.promotionalCategoryList;
				$(promot).each(function() {
					var str_pro = 
					'<div class="classify_list clearfix" id="'+this.storeCategoryId+'" idc="'+this.id+'">' +
						'<div class="left fl">' +
							'<p class="text fl">' + this.name + '</p>' +
							'<i class="switch" catagoryId='+this.id+'></i>' +
						'</div>' +
						'<div class="right fr">' +
							'<img src="images/order_up_disable.png" class="icon_up"/>' +
							'<img src="images/order_down_disable.png" class="icon_down"/>' +
						'</div>' +
					'</div>';
					var pro=$(str_pro);
					if(this.storeCategoryStatus==2){
						pro.find(".switch").addClass("on");
					}
					//switch默认状态
					$(".sales").append(pro);
					var count=this.count;
					var storeCategoryId=this.storeCategoryId;
					 isShow(storeCategoryId,count);
					 //switch点击显示、隐藏
				});
				//促销类分类--ed--
				var general = res.data.generalCategoryList;
				$(general).each(function() {
					var str_gen = 
					'<div class="classify_list clearfix" id="'+this.storeCategoryId+'" idc="'+this.id+'" >' +
						'<div class="left fl">' +
							'<p class="text fl">' + this.name + '</p>' +
							'<i class="switch" catagoryId='+this.id+'></i>' +
						'</div>' +
						'<div class="right fr">' +
							'<img src="images/order_up.png" class="icon_up"/>' +
							'<img src="images/order_down.png" class="icon_down"/>' +
						'</div>' +
					'</div>';
					var gen=$(str_gen);
					if(this.storeCategoryStatus==2){
						gen.find(".switch").addClass("on")
					}
					//switch默认状态
					$(".default").append(gen);	
					var count=this.count;
					var storeCategoryId=this.storeCategoryId;
					 isShow(storeCategoryId,count);
					 //switch点击显示、隐藏
				});
				//常规类分类--ed--
				up_down();
				classify_up();
				classify_down();
			}else{
				alert("请先添加分类");
			}
		}
	});
//  分类接口调用
//  品类维护效果==============ed==============================================

//  各个状态切换
	function init(){
		$(".l_table").hide();
		$(".tip").hide();
		$(".btn").hide();
		$(".btn").removeClass("disable");
	};
	function tip_one(){
		init();
		$(".tip_one").show();
		$(".import_btn").show();
		$(".import_btn").addClass("disable");
	};
	function tip_two(){
		init();	
		$(".tip_two").show();
		$(".import_btn,.save_btn").show();
		$(".save_btn").addClass("disable");
	};
	function tip_three(){
		init();	
		$(".tip_three").show();
		$(".import_default_btn,.save_pro").show();
		$(".save_pro").addClass("disable");
	};
	function tip_four(){
		init();	
		$(".tip_four").show();
		$(".import_btn,.add_btn,.cancle_btn").show();
		$(".import_btn,.add_btn,.cancle_btn").addClass("disable");
	};
	function table_one(){
		init();
		$(".table_one").show();
		$(".import_btn,.add_btn,.cancle_btn").show();
		$(".import_btn,.cancle_btn").addClass("disable");
		if($(".table_one tr .check").hasClass("checked")){
			$(".cancle_btn").removeClass("disable");
		}
	};
	function table_two(){
		init();
		$(".table_two").show();
		$(".import_btn,.save_btn").show();
		$(".save_btn").addClass("disable");
		if($(".table_two tr").hasClass("add")){
			$(".save_btn").removeClass("disable");
		}
	};
	function table_three(){
		init();	
		$(".table_three").show();
		$(".import_default_btn,.sure_btn,.cancle_btn").show();
		$(".import_default_btn,.cancle_btn").addClass("disable");
		if($(".table_three tr .check").hasClass("checked")){
			$(".cancle_btn").removeClass("disable");
		}
	};
	function table_four(){
		init();
		$(".table_four").show();
		$(".table_four .classify_btns a").removeClass("active");
		$(".import_default_btn,.save_pro").show();
		$(".import_default_btn,.save_pro").addClass("disable");
		if($(".table_four tr").hasClass("add")){
			$(".save_pro").removeClass("disable");
		}
	};
	tip_one();
//	初始化（默认无任何数据时）
// 各个状态切换=====ed===============================	

	$(".pop_two .sure").click(function(){
		$(".pop_two").fadeOut();
		$(".drop").fadeOut();
	});
	
//	促销类添加菜品中确定按钮点击，显示促销类菜品编辑
	$(".sure_btn").click(function(){
		if($(".table_three .check").hasClass("checked")){
			table_four();
		}else{
			$(".pop_two").fadeIn();
			$(".drop").fadeIn();
		}
	});
	
	function cancle_gen(){
		var categoryId=$(".classify_list.active").attr("idc");
		$.ajax({
			type:"post",
			url:apiUrl+"category/clearCategoryRedisFoods",
			async:true,
			data:{categoryId:categoryId},
			success:function(res){
				if(res.result){
					console.log("已取消");
				}
			}
		});
	};
//  常规类下点击“取消”，清除中间表数据
	function cancle_pro(){
		var StoreCategoryId=$(".classify_list.active").attr("id");
		var categoryId=$(".classify_btns a.active").attr("id");
		$.ajax({
			type:"post",
			url:apiUrl+"category/clearCategoryRedisFoods",
			async:true,
			data:{promotStoreCategory:StoreCategoryId,categoryId:categoryId},
			success:function(res){
				if(res.result){
					console.log("已取消");
				}
			}
		});
	};
//  促销类下点击“取消”，清除中间表数据
	
	$(".cancle_btn").click(function(){
		if($(this).hasClass("disable")){
			return false;
		}
		if($(".classify_list.active").parent().hasClass("sales")){
			cancle_pro();
		}else{
			cancle_gen();
		}
		$(".check").removeClass("checked");
		$(this).addClass("disable");
		
	});
//	添加菜品时 取消按钮点击，菜品取消选中，执行删除中间表方法

//  列表菜品checked选择效果 ，取消按钮状态变化
	$(document).on("click",".td_one .check",function(){
		$(this).toggleClass("checked");
		if($(".td_one .check").hasClass("checked")){
			$(".cancle_btn").removeClass("disable");
		}else{
			$(".cancle_btn").addClass("disable");
		}
	});
	
//	滚动条出现和消失时调整宽度使标题和内容对齐
	function scroll(fa){
		var hei_box=$(fa+" .table_box").outerHeight();
		var hei_table=$(fa+" table").outerHeight();
		if(hei_table>hei_box){
			$(fa+" .thead").css("width","98%");
		}else{
			$(fa+" .thead").css("width","100%");
		}
	};
//	促销类顶部常规类分类按钮点击样式效果
	$(document).on("click",".classify_btns a",function(){
		$(".classify_btns a").removeClass("active");
		$(this).addClass("active");
	});

//  菜品编辑中促销价格，默认等于原价
	$(".sale_price").each(function(){
		$(this).attr("disabled","disabled");
		$(this).val($(this).parent().prev().html())
	});
//  ===========菜品列表效果========ed=======	
	$(".popup .cancle").click(function(){
		$(this).parents(".popup").fadeOut();
		$(".drop").fadeOut();
	});
	$(".pop_title i").click(function(){
		$(this).parents(".popup").fadeOut();
		$(".drop").fadeOut();
	});
//  弹窗关闭

//  导入菜品
	$(document).on("click",".import_btn",function(){
		import_list();
	});
//  点击“导入菜品”按钮查询对应类别常规类菜品
	$(".pop_one .sure").click(function(){
		$(".table_two tbody").empty();
		var id=$(this).parents(".pop_one").attr("id");
		$(".classify_list").removeClass("active");
		$(".classify_list#"+id).addClass("active");
		$(".pop_one").fadeOut();
		$(".drop").fadeOut();
		if($(".classify_list#"+id).parent().hasClass("sales")){
			first_show();
		}else{
			import_list();
		}
	})
// （常规、促销）类别下无菜品，点击switch时，提示弹窗点击确定，该分类被选中，并查询该分类下菜品
	function import_list(){	
		var classifyId=$(".default .classify_list.active").attr("id");
		$.ajax({
			type:"get",
			url: apiUrl+"category/selectFoodsToLead",
			async:true,
			data:{storeCategoryId:classifyId},
			success:function(res){
				if(res.result){
					console.log(res);
					if(!res.data){
						tip_four();
						return false;
					}
					var foodIdArr=[];
					if(res.data.noStoreFoods){
						var foodIds=res.data.noStoreFoods;
						$(foodIds).each(function(){
							foodIdArr.push(this.id);
						})
					}else{
						ischeck="check";
					}
					var foodToLead=res.data.foodVos;
					$(".table_one table tbody").empty();
					$(foodToLead).each(function(){
						var ischeck = "check";
						for(var k in foodIdArr){
							if(this.id==foodIdArr[k]){
								ischeck="check checked";
								break;
							}
						}
						var str_list_one=
						'<tr id="'+this.id+'">'+
							'<td class="td_one">'+
								'<i class="'+ischeck+'"></i>'+
							'</td>'+
							'<td class="td_two">'+
								'<p class="chinese">'+this.name+'</p>'+
								'<p class="english">'+this.enName+'</p>'+
							'</td>'+
							'<td class="td_img img_subnail"><img src="'+this.picUrl+'" alt="" /></td>'+
							'<td class="td_three price">'+this.price+'</td>'+
						'</tr>';
						var str_one=$(str_list_one);
						$(".table_one table tbody").append(str_one);
					});
					show_img();
					table_one();
					scroll(".table_one");
				}
				
			}
		});	
	};
//  导入常规类菜品列表

	$(document).on("click",".table_four .classify_btns a",function(){
		var id=$(this).attr("id");
		import_default_list(id);
		$(".table_three .classify_btns a").removeClass("active");
		$(".table_three .classify_btns a").eq($(this).index()).addClass("active");
	});
	$(document).on("click",".table_three .classify_btns a",function(){
		var id=$(this).attr("id");
		import_default_list(id);
		$(".table_three .classify_btns a").removeClass("active");
		$(".table_three .classify_btns a").eq($(this).index()).addClass("active");
	});
//  封装存储表中点击顶部促销类名称，切换到促销类菜品列表中，所点击分类选中并展示数据
	$(".import_default_btn").click(function(){
		if($(this).hasClass("disable")){
			return false;
		}
		first_show();
	});

	function first_show(){
		var id;
		var ind;
		$(".default .classify_list").each(function(){
			if($(this).find(".switch").hasClass("on")){
			ind=$(this).index();
				return false;
			};
		})
		id=$(".default .classify_list").eq(ind-1).attr("idc");
		$(".classify_btns a#"+id).addClass("active");
		import_default_list(id);
	};
//  促销类中点击"导入常规菜品"是获取已经开启的第一个常规类的id，查询该类别下已经封装的菜品

	function import_default_list(id){	
		var StoreCategoryId=$(".classify_list.active").attr("id");
		$.ajax({
			type:"get",
			url: apiUrl+"category/selectGeneralFoodsToLead",
			async:true,
			data:{categoryId:id,promotStoreCategoryId:StoreCategoryId},
			success:function(res){
				if(res.result){
					console.log(res)
					if(!res.data||res.data.foodVos.length==0){
						$(".pop_five").fadeIn().delay(800).fadeOut();
						$(".drop").fadeIn().delay(800).fadeOut();
						table_four();
						return false;
					}
					var foodIdArr=[];
					if(res.data.noStoreFoods){
						var foodIds=res.data.noStoreFoods;
						$(foodIds).each(function(){
							foodIdArr.push(this.id);
						})
					}else{
						ischeck="check";
					}
					var foodToLead=res.data.foodVos;
					$(".table_three tbody").empty();
					$(foodToLead).each(function(){
						var ischeck = "check";
						for(var k in foodIdArr){
							if(this.id==foodIdArr[k]){
								ischeck="check checked";
								break;
							}
						}
						var str_list_three=
						'<tr id="'+this.id+'" categoryName="'+this.categoryName+'" >'+
							'<td class="td_one">'+
								'<i class="'+ischeck+'"></i>'+
							'</td>'+
							'<td class="td_two">'+
								'<p class="chinese">'+this.name+'</p>'+
								'<p class="english">'+this.enName+'</p>'+
							'</td>'+
							'<td class="td_img img_subnail"><img src="'+this.picUrl+'" alt="" /></td>'+
							'<td class="td_three price">'+this.price+'</td>'+
							'<td class="td_four">'+this.price+'</td>'+
						'</tr>';
						var str_three=$(str_list_three);
						$(".table_three table tbody").append(str_three);
					});
					show_img();
					table_three();
					scroll(".table_three");
				}else{
					tip_four();
				}
			}
		});	
	};
//  促销类中导入已经封装的常规类

	$(document).on("click",".default .text",function(){
		if($(this).parents(".classify_list").hasClass("disable")){
			return;
		};
		$(".table_two tbody").empty();
		gen_edu();
	});
//  常规类点击判断是否有菜品并渲染列表
	function gen_edu(){
		var classifyId=$(".default .classify_list.active").attr("id");
		$.ajax({
			type:"get",
			url: apiUrl+"category/selectFoodByStoreCategoryId",
			data:{storeCategoryId:classifyId},
			async:true,
			success:function(res){
				if(res.result){
					console.log(res);
					if(!res.data){
						tip_two();
						return;
					}
					var food_list=res.data.foodVos;
					var noStoreFoods=res.data.noStoreFoods;
					var len=food_list.length;
					$(".table_two table tbody").empty();
					var index=0;
					var options="";
					for(var i=0;i<len;i++){
						var option_list='<option value="">'+(i+1)+'</option>';
						options+=option_list;
					}
					if(noStoreFoods){
						$(noStoreFoods).each(function(){
							index++;
							var str_list=
							'<tr id="'+this.id+'" class="add" >'+
								'<td class="td_one num">'+index+'</td>'+
								'<td class="td_two">'+
									'<p class="chinese">'+this.name+'</p>'+
									'<p class="english">'+this.enName+'</p>'+
								'</td>'+
								'<td class="td_img img_subnail"><img src="'+this.picUrl+'" alt="" /></td>'+
								'<td class="td_three"><span></span></td>'+
								'<td class="td_four price">'+this.price+'</td>'+
								'<td class="td_five order">'+
								'</td>'+
								'<td class="td_six delete"><img src="images/icon_del.png" /></td>'+
							'</tr>';
							var str_two=$(str_list);
							$(".table_two table tbody").append(str_two);
							
						});
					}
					$(food_list).each(function(){
						var pro_name=this.categoryName;
						var tip="";
						if(pro_name==undefined){
							pro_name="";
							tip='<span>'+pro_name+'</span>';
						}else{
							tip='<span class="pro">'+pro_name+'</span>';
						}
						index++;
						var str_list_two=
						'<tr id="'+this.id+'">'+
							'<td class="td_one num">'+index+'</td>'+
							'<td class="td_two">'+
								'<p class="chinese">'+this.name+'</p>'+
								'<p class="english">'+this.enName+'</p>'+
							'</td>'+
							'<td class="td_img img_subnail"><img src="'+this.picUrl+'" alt="" /></td>'+
							'<td class="td_three">'+tip+'</td>'+
							'<td class="td_four price">'+this.price+'</td>'+
							'<td class="td_five order">'+
								'<select name="">'+options+'</select>'+
							'</td>'+
							'<td class="td_six delete"><img src="images/icon_del.png" /></td>'+
						'</tr>';
						var str_two=$(str_list_two);
						$(".table_two table tbody").append(str_two);
						
					});
					table_two();
					show_img();
					order(".table_two");
					selected();
					scroll(".table_two")
				}else{
					tip_two();
				}
			}
		});
		
	};
//  常规已封装存储菜品及已经添加未封装菜品（中间表菜品）接口调用

	$(document).on("click",".sales .text",function(){
		if($(this).parents(".classify_list").hasClass("disable")){
			return;
		};
		pro_edu();
	});
//  促销类类点击判断是否有菜品并渲染列表
	function pro_edu(){
		var classifyId=$(".sales .classify_list.active").attr("id");
		$.ajax({
			type:"get",
			url: apiUrl+"category/selectFoodByStoreCategoryId",
			data:{storeCategoryId:classifyId},
			async:true,
			success:function(res){
				if(res.result){
					console.log(res);
					if(!res.data){
						tip_three();
						return;
					}
					var food_list=res.data.foodVos;
					var classify_name=res.data.generalCategories;
					var noStoreFoods=res.data.noStoreFoods
					var len=food_list.length;
					
					var data_id;
					$(".table_four table tbody").empty();
					var index=0;
					var options="";
					for(var i=0;i<len;i++){
						var option_list='<option value="">'+(i+1)+'</option>';
						options+=option_list;
					}
					if(noStoreFoods){
						$(noStoreFoods).each(function(){
							index++;
							var str_list=
							'<tr id="'+this.id+'" class="add" >'+
								'<td class="td_one num">'+index+'</td>'+
								'<td class="td_two">'+
									'<p class="chinese">'+this.name+'</p>'+
									'<p class="english">'+this.enName+'</p>'+
								'</td>'+
								'<td class="td_img img_subnail"><img src="'+this.picUrl+'" alt="" /></td>'+
								'<td class="td_three"><span>'+this.categoryName+'</span></td>'+
								'<td class="td_four price">'+this.price+'</td>'+
								'<td class="td_five"><input type="text" class="sale_price" value="'+this.price+'" disabled="disabled" /></td>'+
								'<td class="td_six order">'+
								'</td>'+
								'<td class="td_seven delete"><img src="images/icon_del.png" /></td>'+
							'</tr>';
							var str_two=$(str_list);
							$(".table_four table tbody").append(str_two);
						});
					}
					$(food_list).each(function(){
						index++;
						var str_list_four=
						'<tr id="'+this.id+'">'+
							'<td class="td_one num">'+index+'</td>'+
							'<td class="td_two">'+
								'<p class="chinese">'+this.name+'</p>'+
								'<p class="english">'+this.enName+'</p>'+
							'</td>'+
							'<td class="td_img img_subnail"><img src="'+this.picUrl+'" alt="" /></td>'+
							'<td class="td_three"><span>'+this.categoryName+'</span></td>'+
							'<td class="td_four price">'+this.price+'</td>'+
							'<td class="td_five"><input type="text" class="sale_price" value="'+this.price+'" disabled="disabled" /></td>'+
							'<td class="td_six order">'+
								'<select name="">'+options+'</select>'+
							'</td>'+
							'<td class="td_seven delete"><img src="images/icon_del.png" /></td>'+
						'</tr>';
						var str_four=$(str_list_four);
						$(".table_four table tbody").append(str_four);
						
					});
					
					show_img();
					scroll(".table_four");
					$(".classify_btns").empty();
					$(classify_name).each(function(){
						var class_name=
						'<a href="javascript:;" id="'+this.id+'">'+this.name+'</a>';
						var class_name=$(class_name);
						$(".classify_btns").append(class_name);
					});
					table_four();
					order(".table_four");
					selected();
				}else{
					tip_three();
				}
			}
		});
	};
//  促销类已封装存储菜品及已经添加未封装菜品（中间表菜品）接口调用


	function isShow(id,count){
		if(count==0){
			$("#"+id+" .switch").removeClass("on");
			$("#"+id+" .switch").addClass("noclick");
		}else{
			$("#"+id+" .switch").removeClass("noclick");
		}
		show_list(id);
	}
	$(document).on("click",".switch",function(){
		if($(this).parents(".classify_list").hasClass("disable")){
			return;
		};
		var id=$(this).parents(".classify_list").attr("id");
		if($(this).hasClass("noclick")){
			$(".pop_one").fadeIn();
			$(".pop_one").attr("id",id);
			$(".drop").fadeIn();
			return false;
		}else{
			$(this).toggleClass("on");	
		}
		show_list(id)
	})
	function show_list(id){
		var flag=false;
		if($("#"+id+" .switch").hasClass("on")){
			flag=true;
		}else{
			flag=false;
		}
		$.ajax({
			type:"post",
			url: apiUrl+"category/isShow",
			async:true,
			data:{storeCategoryId:id,flag:flag},
			success:function(res){
				if(res.result){
					console.log(res.msg);
				}
			}
		});
	}
//  分类是否在C端显示

	function delete_gen(){
		$(document).on("click",".table_two .delete img",function(){
			var tr_id=$(this).parents("tr").attr("id");
			$(".pop_three").fadeIn();
			$(".drop").fadeIn();
			$(".pop_three").attr("tr_id",tr_id);
			var that=$(this);
			$(".pop_three .sure").click(function(){
				var tr_id=$(".pop_three").attr("tr_id");
				var classify_id=$(".classify_list.active").attr("id");
					$.ajax({
						type:"post",
						url:apiUrl+"category/removeFoodFromCategory",
						data:{foodId:tr_id,storeCategoryId:classify_id},
						async:true,
						success:function(res){
							console.log(res);
							if(res.result){
								gen_edu();
								if(res.data==0){
									tip_two();
									isShow(classify_id,"0");
								}
							}
						}
					});
				scroll(".table_two");
				selected();
				order(".table_two");
				$(".pop_three").fadeOut();
				$(".drop").fadeOut();
			});
		});
	};
	delete_gen();
//  常规类菜品编辑中删除icon点击效果
	function delete_pro(){
		$(document).on("click",".table_four .delete img",function(){
			var tr_id=$(this).parents("tr").attr("id");
			$(".pop_three_pro").fadeIn();
			$(".drop").fadeIn();
			$(".pop_three_pro").attr("tr_id",tr_id);
			var that=$(this);
			$(".pop_three_pro .sure").click(function(){
				var tr_id=$(".pop_three_pro").attr("tr_id");
				var classify_id=$(".classify_list.active").attr("id");
					$.ajax({
						type:"post",
						url:apiUrl+"category/removeFoodFromCategory",
						data:{foodId:tr_id,storeCategoryId:classify_id},
						async:true,
						success:function(res){
							console.log(res);
							if(res.result){
								pro_edu()
								if(res.data==0){
									tip_three();
									isShow(classify_id,"0");
								}
							}
						}
					});
				scroll(".table_four");
				selected();
				order(".table_four");
				$(".pop_three_pro").fadeOut();
				$(".drop").fadeOut();
			});
		});
	};
	delete_pro();
//  促销类菜品编辑中删除icon点击效果

	function addFoods(fa){
		if($(fa+" .check").hasClass("checked")){
			var arr=[];
			var categoryId=$(".classify_list.active").attr("id");
			$(fa+" tr").each(function(){
				if($(this).find(".check").hasClass("checked")){
					var id= $(this).attr("id");
					arr.push(id);
				}
			});
			arr=arr.join(",");
			$.ajax({
				type:"post",
				url:apiUrl+"category/addFoods",
				async:true,
				data:{categoryId:categoryId,foodIds:arr},
				success:function(res){
					if(res.result){
						console.log(res);
						if($(".classify_list.active").parent().hasClass("sales")){
							pro_edu();
						}else{
							gen_edu();
						}
					}
				}
			});
		}else{
			$(".pop_two").fadeIn();
			$(".drop").fadeIn();
		};	
	}
//  添加菜品接口调用（中间表数据）
	$(".add_btn").click(function(){
		addFoods(".table_one");
	});
//  常规类点击“菜品添加”

	$(".sure_btn").click(function(){
		addFoods(".table_three");
	});
//  促销类类点击“菜品添加”

	function gen_save(fa){
		var arr=[];
		var classifyId=$(".classify_list.active").attr("id");
		$(fa+" tr").each(function(){
			var obj = new Object();
			obj.id= $(this).attr("id");
			arr.push(obj);
		});
		console.log(arr)
		$.ajax({
			type:"post",
			url: apiUrl+"category/updateFoodStatus?storeCategoryId="+classifyId,
			contentType:'application/json',
			async:true,
			data:JSON.stringify(arr),
			success:function(res){
				if(res.result){
					console.log(res.msg);
					$(".pop_four").fadeIn().delay(1000).fadeOut();
					$(".drop").fadeIn().delay(1000).fadeOut();
					if($("#"+classifyId).parent().hasClass("sales")){
						pro_edu();
					}else{
						gen_edu();
					}
				}
			}
		}); 
		isShow(classifyId,"2")//传值不为0即可
	};
//  封装存储方法定义
	$(".save_btn").click(function(){
		if($(this).hasClass("disable")){
			return;
		}
		gen_save(".table_two");
		
	});
//  常规类封装存储
	$(".save_pro").click(function(){
		if($(this).hasClass("disable")){
			return;
		}
		gen_save(".table_four");
	});
//  促销类封装存储

	function order(fa){
		var num=0
		$(fa+" .num").each(function(){
			num++;
			$(this).html(num);
		});
	};
//  常规、促销类添加/删除菜品时默认序号（第一列序号）

	function selected(){
		$(".l_table tr").each(function(){
			var add_len=$(this).parent().find("tr.add").length;
			var index=$(this).index();
			$(this).find(".order option").eq(index-add_len).attr("selected","selected");
		});
	}
//  菜品编辑中排序列默认选中的序号（select中默认选中的）

	function order_food(id,food_id,sort){
		$.ajax({
			type:"post",
			url:apiUrl+"category/updateFoodSort",
			async:true,
			data:{storeCategoryId:id,foodId:food_id,sort:sort},
			success:function(res){
				if(res.result){
					console.log(res)
					if($(".classify_list#"+id).parents().hasClass("sales")){
						pro_edu();
					}else{
						gen_edu();
					}
				}
			}
		});
	}
//  菜品排序接口调用
	$(document).on("change",".order select",function(){
		var classifyId=$(".classify_list.active").attr("id");
		var tr_id=$(this).parents("tr").attr("id");
		var sort=$(this).find("option:selected").text();
		order_food(classifyId,tr_id,sort);
	});
//  菜品排序



