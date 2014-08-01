define([
	"./core",
	"./var/rnotwhite"
], function (jQuery, rnotwhite) {
	
	function Data() {
		// obj, prop, descriptor
		Object.defineProperty(this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});
		// cache key
		this.expando = jQuery.expando + Math.random();
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		// 区分this上的属性和owner上的属性
		// this -> expando:xxx, cache[uid]:{}
		// owner -> xxx:uid
		key: function(owner) {
			if(!Data.accepts(owner)) {
				return 0;
			}
			var descriptor = {},
				unlock = owner[ this.expando ];
			// 当前对象上没有cache key
			if(!unlock) {
				unlock = Data.uid++;
				try{
					// 只设了value，明显是configurable,writable,enumable都为false
					descriptor[this.expando] = {value: unlock};
					Object.defineProperties(owner, descriptor);
				}catche(e) {
					// 退而求其次，采用不安全的方法
					descriptor[this.expando] = unlock;
					jQuery.extend(owner, descriptor);
				}
			}

			if(!this.cache[unlock]) {
				this.cache[unlock] = {};
			}
			return unlock;
		},
		set: function(owner, data, value) {
			var prop,
				unlock = this.key(owner),
				cache = this.cache[unlock];

			// [owner, key, value]
			if(typeof data === "string") {
				cache[data] = value;
			// [owner, {properties}]
			}else {
				if(jQuery.isEmptyObject(cache)) {
					jQuery.extend(this.cache[unlock], data);
				}else {
					for(prop in data) {
						cache[prop] = data[prop];
					}
				}
			}

			return cache;
		},
		get: function(owner, key) {
			var cache = this.cache[this.key(owner)];
			return key === undefined ? cache : cache[key];
		},
		access: function(owner, key, value) {

		},
		remove: function(owner, key) {

		},
		hasData: function(owner) {

		},
		discard: function(owner) {

		}
	};

	return Data;
});