define([
	"./core",
	"./var/rnotwhite"
], function(jQuery, rnotwhite) {
	var optionsCache = {};

	function createOptions(options) {
		var object = optionsCache[options] = {};
		jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
			object[flag] = true;
		});
		return object;
	}

	jQuery.Callbacks = function(options) {
		// 传入的option都是一些flag，如memeory,once等等
		options = typeof options === "string" ?
			(optionsCache[options] || createOptions(options)) :
			jQuery.extend({}, options);

		var memory, //是否记录历史
			fired,
			firing,
			firingStart,
			firingLength,
			firingIndex,
			list = [],
			stack = !options.once && [],
			// 触发回调
			fire = function(data) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				// 从firingStart开始一个一个触发list中的回调
				for(; list && firingIndex < firingLength; firingIndex++) {
					// data[0]是context，data[1]是参数数组
					if(list[firingIndex].apply(data[0], data[1])) === false && options.stopOnFalse) {
						memory = false;
						break;
					}
				}
				firing = false;
				if(list) {
					if(stack && stack.length) {
						fire(stack.shift());
					}else if(memory) {
						list = [];
					}else {
						self.disable(); //将list,memeory,stack通通置为undefined
					}
				}
			},
			self = {
				// 增加一些回调
				add: function() {
					if(list) {
						var start = list.length;
						// 向list中push，参数也有可能是一个函数数组
						(function add(args) {
							jQuery.each(args, function(_, arg) {
								var type = jQuery.type(arg);
								if(type === "function") {
									// 考虑flag为unique时，要避免曾经出现过
									if(!options.unique || !self.has(arg)) {
										list.push(arg);
									}
								// 还是一个数组，递归
								}else if(arg && arg.length && type !== "string") {
									add(arg);
								}
							});
						})(arguments);
						if(firing) {
							firingLength = list.length;
						}else if(memory) { // 立即触发当前的回调，使用上一次的数据
							firingStart = start;
							fire(memory);
						}
					}
					return this;
				},
				remove: function() {
					if(list) {
						jQuery.each(arguments, function(_, arg) {
							var index;
							// 找到list中的位置
							// 由于fn可以被多次添加到callback中，所以使用了while循环
							while( (index = jQuery.inArray(arg, list, index)) > -1) {
								// 删除
								list.splice(index, 1);
								// 影响到了要触发的列表
								if(firing) {
									if(index <= firingLength) {
										firingLength--;
									}
									if(index <= firingIndex) {
										firingIndex--;
									}
								}
							}
						})
					}
				},
				has: function(fn) {
					return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
				},
				// 移除所有的callback
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// 这种情况下，Callback就无法工作了
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				disabled: function() {
					return !list;
				},
				lock: function() {
					statck = undefined;
					if(!memeory) {
						self.disable();
					}
				},
				locked: function() {
					return !statck;
				},
				fireWith: function(context, args) {
					if(list && (!fired || statck)) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						if(firing) {
							stack.push(args);
						}else{
							fire(args);
						}
					}
				},
				fire: function() {
					self.fireWith(this, arguments);
					return this;
				},
				fired: function() {
					return !!fired;
				}
			};
		return self;
	}

	return jQuery;
});