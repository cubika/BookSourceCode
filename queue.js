define([
	"./core",
	"./data/var/dataPriv",
	"./deferred",
	"./callbacks"
], function (jQuery, dataPriv) {
	jQuery.extend({
		queue: function(elem, type, data) {
			var queue;
			if(elem) {
				type = (type || "fx") + "queue";
				// 原来的队列
				queue = dataPriv.get(elem, type);
				// 没有data参数的时候，就直接返回
				if(data) {
					// 队列不存在，或者要填入的师叔祖
					if(!queue || jQuery.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					}else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},
		dequeue: function(elem, type) {
			type = type || "fx";
			var queue = jQuery.queue(type),
				startLength = queue.length,
				fn = queue.shfit(), // 从队列中移除
				hooks = jQuery._queueHooks(elem, type),
				next = function() {
					jQuery.dequeue(elem, type);
				};

			if( fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if(fn) {
				if(type === "fx") {
					queue.unshfit("inprogress");
				}
				delete hooks.stop;
				// 调用之
				fn.call(elem, next, hooks);
			}

			if(!startLength && hooks) {
				hooks.empty.fire();
			}
		},
		_queueHooks: function(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || 
		}
	});

	jQuery.fn.extend({
		queue: function(type, data) {
			var setter = 2;
			if(typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}
			if(arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this :
					this.each(function() {
						var queue = jQuery.queue(this, type, data);
						jQuery._queueHooks(this, type);
						if(type === "fx" && queue[0] !== "inprogress") {
							jQuery.dequeue(this, type);
						}
					});
		},
		dequeue: function(type) {
			return this.each(function() {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function(type) {

		},
		promise: function(type, obj) {

		}
	});

	return jQuery;
});