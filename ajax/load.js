define([
	"../core",
	"../core/parseHTML",
	"../ajax",
	"../traversing",
	"../manipulation",
	"../selector",
	"../event/alias"
], function( jQuery ) {

var _load = jQuery.fn.load;

jQuery.fn.load = function(url, params, callback) {
	// 老版本的写法
	if(typeof url != "string" && _load) {
		return _load.apply(this, arguments);
	}

	var selector, type, response, self = this, off = url.indexOf(" ");

	// (url selector)
	if(off >= 0) {
		selector = jQuery.trim(url.slice(off));
		url = url.slice(0, off);
	}

	// 传的是load函数的回调
	if(jQuery.isFunction(params)) {
		callback = params;
		params = undefined;
	// 传的是POST时要发送的数据
	}else if(params && typeof params === "object") {
		type = "POST";
	}

	if(self.length > 0) {
		jQuery.ajax({
			url: url,
			type: type, // HTTP 方法
			dataType: 'html', // 请求文件格式
			data: params  // 发送的数据
		}).done(function(responseText) {
			response = arguments;
			// 有选择器的，将选择器过滤后的作为内容， 否则直接将返回作为内容
			self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
		}).complete(callback && function(jqXHR, status) {
			// 如果有回调的话，触发它，并将 responseText, status, jqXHR作为参数
			self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
		});
	}

	return this;
};

});