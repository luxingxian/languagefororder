/**
 * Created by 张久昌 on 2017/6/12.
 */
(function() {
	window.apiUrl = "";
	var flag = true;
	$.ajaxSetup({
		error: function(jqXHR, textStatus, errorThrown) {
			switch(jqXHR.status) {
				case 302:
					{
						var text = jqXHR.responseText
						if(flag) {
							flag = false;
							if(text) alert(text);
						}
						var redirect = jqXHR.getResponseHeader("redirectUrl");
						if(redirect) location.href = redirect;
					};
					break;
			}
		}
	})

	$(".logout").click(function() {
		$.ajax({
			type: "get",
			url: "logout",
			async: true,
			success: function(res) {
				location.href = "login.html";
			}
		});
	});

	$.ajax({
		type: "get",
		url: "store/getStoreInfo",
		success: function(result) {
			var dpxx = result.data.store
			//店铺
			$(".contentHeader i").html(dpxx.name);
		}
	});

})()