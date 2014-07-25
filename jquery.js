// 定义依赖的模块
// jQuery自己写了一个build任务，其中用到了requirejs，所以这里是requirejs的写法
define([
	"./core", //核心
	"./selector", //选择器
	"./traversing", // DOM遍历
	"./callbacks", // Callback
	"./deferred", // Defer
	"./core/ready", // ready
	"./data", // data-
	"./queue", // Queue
	"./queue/delay", // Delay
	"./attributes", //属性
	"./event", // 事件
	"./event/alias",
	"./manipulation",
	"./manipulation/_evalUrl",
	"./wrap",
	"./css", // css
	"./css/hiddenVisibleSelectors",
	"./serialize", // 序列化
	"./ajax", // ajax
	"./ajax/xhr", // xhr
	"./ajax/script", 
	"./ajax/jsonp", // jsonp
	"./ajax/load",
	"./event/ajax",
	"./effects", // 效果
	"./effects/animatedSelector",
	"./offset",
	"./dimensions",
	"./deprecated",
	"./exports/amd",
	"./exports/global"
], function( jQuery ) {
// 第一个参数，也就是core里面的模块返回作为jQuery
return jQuery;

});
