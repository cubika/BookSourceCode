// 核心文件，定义了jQuery全局变量
define([
	"./var/arr",
	"./var/slice",
	"./var/concat",
	"./var/push",
	"./var/indexOf",
	"./var/class2type",
	"./var/toString",
	"./var/hasOwn",
	"./var/support"
], function(arr, slice, concat, push, indexOf, class2type, toString, hasOwn, support ) {
	var document = window.document,
		version = "@VERSION", // 这个能替换掉？
		jQuery = function (selector, context)  {
			// 调用了一下init方法
			return new jQuery.fn.init(selector, context);
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(all, letter) {
			return letter.toUpperCase();
		};

	// jQuery对象的原型
	jQuery.fn = jQuery.prototype = {
		jquery: version,
		constructor: jQuery,
		selector: "",
		// jQuery是array-like Object
		length: 0,
		// 把jQuery对象变为一个数组
		toArray: function() {
			return slice.call(this);
		},
		// 返回指定位置的元素
		get: function(num) {
			return num != null ?
				( num < 0 ? this[num + this.length] : this[num] ) :
				slice.call(this);
		},
		// 下面的很多方法返回的都是一个数组，这里将它们转化为jQuery对象
		// 真正的向this里面添加一个元素的方法为下面的push
		pushStack: function(elems) {
			// merge会影响第一个参数的值
			var ret = jQuery.merge(this.constructor(), elems);
			ret.prevObj = this;
			ret.context = this.context;
			return ret;
		},
		each: function(callback, args) {
			// 和 $.each 相比多设置了一个array为this
			return jQuery.each(this, callback, args);
		},
		// callback： function(index,value),用于将原有的值映射为新的值
		map: function(callback) {
			// 保证map完了之后返回的还是一个jQuery对象
			return this.pushStack(jQuery.map(this, function(elem, i){
				return callback.call(elem, i, elem);
			}));
		},
		slice: function(callback) {
			return this.pushStack(slice.apply(this,arguments));
		},
		first: function() {
			return this.eq(0);
		},
		last: function() {
			return this.eq(-1);
		},
		eq: function(i) {
			var len = this.length,
				j = +i + (i<0 ? len : 0);
			// this[j]只是一个元素，所以通过[]先转化为数组，然后再转化为实际的对象
			return this.pushStack(j>=0 && j<len ? [this[j]] : []);
		},
		//TODO: 这个函数的作用有待研究
		end: function() {
			return this.prevObj || this.constructor(null);
		},
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	// [deep], target, option1, option2, option3 ...
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		// 传递了deep
		if(typeof target === 'boolean') {
			deep = true;
			target = arguments[i] || {};
			i++;
		}
		// target是object和function之外的类型，那么传了也白传
		if(typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}
		// 只传递了一个参数，那么就是在this上进行extend
		if(i == length) {
			target = this;
			i--;
		}
		for(; i<length; i++) {
			if( (options = arguments[i]) != null) {
				// 开始拷贝了
				for(name in options) {
					src = target[name];
					copy = options[name]; //要拷贝的值

					// 深拷贝并且要拷贝的值为对象或者数组
					if(deep && copy && (jQuery.isPlainObject(copy) ||
						copyIsArray = jQuery.isArray(copy))) {
						// 本来可以直接调用target[name] = jQuery.extend(deep, src, copy)的
						// 这里又多做了一个类型的检查，为了鲁棒性！！
						if(copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						}else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
						// 深拷贝说白了就是递归调用
						target[name] = jQuery.extend(deep, clone, copy);
					}else if(copy !== undefined) { // 过滤掉没有值的属性
						target[name] = copy;
					}
				}
			}
		}
		return target;
	};

	// 刚定义完现在就开始用上了
	jQuery.extend({
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
		isReady: true,
		error: function(msg) {
			throw new Error(msg);
		},
		noop: function() {},
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},
		isArray: Array.isArray,
		// window全局变量这里能访问吗？应该可以吧
		isWindow: function(obj) {
			// window.window ? 这个第一次知道
			return obj != null && obj === obj.window;
		},
		isNumeric: function(obj) {
			// NaN >= 0 为 false
			// pasrseFloat([2,"33","abc"]) = 2, 所以要把数组给去掉
			// 如果是数字的话，obj - parseFloat(obj) = 0
			return !jQuery.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
		},
		// 什么不是PlainObject?
		// 1.类型不是Object 2.DOM Node 3.window
		isPlainObject: function(obj) {
			if(jQuery.type(obj)!=="object" || obj.nodeType || jQuery.isWindow(obj)) {
				return false;
			}
			//TODO: 这段代码要过滤的是？
			if(obj.constructor &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false;
			}
			return true;
		},
		isEmptyObject: function(obj) {
			var name;
			for(name in obj) {
				return false;
			}
			return true;
		},
		type: function(obj) {
			// 更正一下null
			if(obj == null) {
				return obj + "";
			}
			//TODO: 为什么要绕一大圈，不直接返回typeof obj?
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[toString.call(obj)] || "object" : typeof obj;
		},
		// 执行一段代码
		globalEval: function(code) {
			var script = document.createElement("script");
			script.text = code;
			document.head.appendChild(script).parentNode.removeChild(script);
		},
		camelCase: function(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase); // -x替换为X
		},
		// 判断一个元素的nodeName是不是第二个参数
		nodeName: function(elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
		each: function(obj, callback, args) {
			var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );
			// 这段可以忽略，直接跳到else
			if(args) {
				if(isArray) {
					for(; i<length; i++) {
						value = callback.apply(obj[i], args);
						if(value === false) {
							break;
						}
					}
				}else {
					for(i in obj) {
						value = callback.apply(obj[i], args);
						if(value === false) {
							break;
						}
					}
				}
			}else {
				if(isArray) {
					for(; i<length; i++) {
						value = callback.call(obj[i], i, obj[i]);
						// 遇到执行结果为false的，就停下来了，这点要注意！！
						if(value === false) {
							break;
						}
					}
				}else {
					for(i in obj) {
						value = callback.call(obj[i], i, obj[i]);
						if(value === false) {
							break;
						}
					}
				}
			}
		},
		trim: function(text) {
			// text+""使得它变为字符串，否则text上很有可能没有replace方法呦
			return text == null ? "" :
				(text + "").replace(rtrim, "");
		},
		makeArray: function(arr, results) {
			var ret = results || [];
			if(arr != null) {
				// array或者array-like object
				if(isArraylike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				}else {
					push.call(ret, arr); // 这里push的就不知道是啥了
				}
			}
			return ret;
		},
		// 第三个参数代表每一次indexOf的起始地址
		inArray: function(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},
		merge: function(first, second) {
			var len = +second.length, 
				j = 0,
				i = first.length;
			for(; j<len; j++) {
				first[i++] = second[j];
			}
			first.length = i;
			return first;
		},
		// 一般情况下，结果是callback返回false的元素集合
		grep: function(elems, callback, invert) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
			for(; i<length; i++) {
				callbackInverse = !callback(elems[i], i);
				if(callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}
			return matches;
		},
		map: function(elems, callback, arg) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];
			if(isArray) {
				for(; i<length; i++) {
					if( (value = callback(elems[i], i, arg)) != null) {
						ret.push(value);
					}
				}
			}else {
				for( i in elems) {
					if( (value = callback(elems[i], i, arg)) != null) {
						ret.push(value);
					}
				}
			}
			return concat.apply([], ret);
		},
		// 原来就是bind啊
		proxy: function(fn, context) {
			var tmp, args, proxy;
			// fn = {"xxx": realFn,} --> context
			if(typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}
			if(!jQuery.isFunction(fn)) {
				return undefined;
			}
			args = slice.call(arguments, 2);
			proxy = function() {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};
			proxy.guid = fn.guid  = fn.guid || jQuery.guid++;
			return proxy;
		},
		guid: 1,
		now: Date.now,
		support: support
	});

	function isArraylike(obj) {
		var length = obj.length,
			type = jQuery.type(obj);
		if(type === "function" || jQuery.isWindow(obj)) {
			return false;
		}
		if(obj.nodeType === 1 && length) {
			return true;
		}
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	}

	return jQuery;
});