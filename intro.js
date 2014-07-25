(function( global, factory ) { // window, function(window, noGlobal)
	// commonJS
	if(typeof module === "object" && typeof module.exports === "object") {
		module.exports = global.document ?
			// browser 环境
			factory ( global, true) :
			// 其他环境，如node，这时使用的方法为require("jquery")(window);
			function( w ) {
				if( !w.document ) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory( w );
			};
	} else { // 直接进行调用
		factory( global );
	}
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) { //这里为什么没写完？