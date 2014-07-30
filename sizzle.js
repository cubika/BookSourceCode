(function (window) {
	
	var i,
		whitespace = "[\\x20\\t\\r\\n\\f]", // 搞的这么麻烦
		rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");


	function Sizzle (selector, context, results, seed) {
		

		return select(selector.replace(rtrim, "$1"), context, results, seed);
	}

	// 将Sizzle进行导出
	if(typeof define === "function" && define.amd) {
		// 所有代码都在大大的闭包里，只返回Sizzle定义
		define(function(){return Sizzle;});
	}else if(typeof module !== "undefined" && module.exports) {
		module.exports = Sizzle;
	}else{
		window.Sizzle = Sizzle;
	}
})(window);