define([
	"./core",
	"./var/slice",
	"./callbacks"
], function(jQuery, slice) {
	jQuery.extend({
		Deferred: function(func) {
			var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			];
			state = "pending",
			deferred = {},
			// this is promise, man!
			promise = {
				state: function() {
					return state;
				},
				// done + fail
				always: function() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				then: function(/* fnDone, fnFail, fnProgress */) {
					var fns = arguments;
					// 返回的是一个新的Deferred对象
					// 并且传递一个函数，这个函数会在创建后立即执行
					return jQuery.Deferred(function(newDefer) {
						jQuery.each(tuples, function(i, tuple) {
							// 当前的回调
							var fn = jQuery.isFunction(fns[i]) && fns[i];
							// 为 deferred.done/fail/progress 增加callback
							deferred[tuple[1]](function() {
								var returned = fn && fn.apply(this, arguments);
								if(returned && jQuery.isFunction(returned.promise)) {
									// 为returned扩展promise
									returned.promise()
										.done(newDefer.resolve)
										.fail(newDefer.reject)
										.progress(newDefer.notify);
								}else {
									newDefer[tuple[0] + "With"](
										this === promise ? newDefer.promise() : this,
										fn ? [returned] : arguments
									);
								}
							});
							fns = null;
						});
					}).promise();
				},
				//只开放与改变执行状态无关的方法（比如done()方法和fail()方法），
				//屏蔽与改变执行状态有关的方法（比如resolve()方法和reject()方法），
				//从而使得执行状态不能被改变。
				promise: function(obj) {
					return obj != null ? jQuery.extend(obj, promise) : promise;
				}
			};
			promise.pipe = promise.then;
			jQuery.each(tuples, function(i, tuple) {
				var list = tuple[2], // listener list
					stateString = tuple[3];
				promise[tuple[1]] = list.add;  // promise.done = Callbacks.add
				if(stateString) {
					list.add(function() {
						state = stateString;
					}, tuples[i^1][2].disable, tuples[2][2].lock);
				}
				deferred[tuple[0]] = function() {
					// callbacks.fireWith(this,arguments)
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this;
				};
				deferred[tuple[0] + "With"] = list.fireWith;
			});
			// jQuery.extend(deferred, promise);
			promise.promise(deferred);
			if(func) {
				func.call(deferred, deferred);
			}
			// jQuery.Deferred() == deferred == promise
			return deferred;

		},
		when: function(subordiante, /*, ..., subordianteN*/) {

		}
	});

	return jQuery;
})