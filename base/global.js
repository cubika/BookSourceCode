/**
 * ------------------------------------------------------
 * 全局通用接口实现文件
 * NEJ.O  - 空对象实例
 * NEJ.R  - 空数组实例
 * NEJ.F  - 空函数实例
 * NEJ.P  - 名字空间申明
 * NEJ.C  - 类构造，带扩展接口
 * NEJ.X  - 对象属性拷贝，带过滤
 * NEJ.EX - 对象属性选择性拷贝
 *
 * @version 1.0
 * @author genify(caijf@corp.netease.com)
 * ------------------------------------------------------
 */

var f = function() {
	if( window.NEJ != null )
		return;
	window.NEJ = {
		O: {},
		R: [],
		F: function(){return !1;}
	};

	/**
	 * 返回命名空间，如果不存在则创建一个新的命名空间
	 * 命名空间不能使用浏览器保留关键字，因为创建时判断会不为空
	 * @param {Object} _namespace 命名空间名称，大小写敏感
	 * @return {Object} 对应的命名空间对象
	 */
	NEJ.P = function(_namspace) {
		if(!_namspace || !_namspace.length) return null;
		var _package = window;
		for( var a = _namspace.split('.'),
				 l = a.length, i = (a[0] == 'window') ? 1 : 0);
			i < l;
			_package = _package[a[i]] = _package[a[i]] || {}, i++);
		return _package;
	};

	/**
	 * 定义一个类
	 * 具有静态扩展接口_$extend,且第二个参数控制是否继承静态接口；
	 * 具有类初始化函数__init,__superInit为父类的初始化函数;
	 * __reset/__destory/__initNode均可以使用__supXxx的形式调用父类接口;
	 * @example
	 * 	var A = NEJ.C();
	 *  A.prototype.__init = function() { ... }
	 *  var B = NEJ.C();
	 *  B._$extend(A);
	 *  B.prototype.__init = function() {
	 * 		this.__supInit();
	 * 	 	...
	 *  }
	 * @return {Function} 创建的类
	 */
	NEJ.C = (function() {
		// 这样判断真的好吗？
		var _isNotFunction = function() {
			return NEJ.O.toString.call(arguments[0]) !== '[object Function]';
		}
		// 根据值获取键
		var _getMethodName = function(_value, _map) {
			for(var x in _map) {
				if(_value === _map[x]) {
					return x;
				}
			}
			return null;
		};

		var _mmap = {
			__init : 0,
			__reset : 1,
			__destory : 2,
			__initNode : 3
		}, _umap = {
			_supInit : 0,
            __supReset : 1,
            __supDestroy : 2,
            __supInitNode : 3
		};

		return function() {
			// 首先定义一个函数
			var _class = function() {
				this.__cp__();
				return this.__init.apply(this,arguments);
			};
			// 设置__cp__和__init__方法为空函数
			_class.prototype.__cp__ = NEJ.F;
			_class.prototype.__init__ = NEJ.F;
			// 添加静态方法，用于实现继承
			_class._$extend = function(_super, _static) {
				if(_isNotFunction(_super)) return;
				// 从_super父类中继承静态方法
				if(_static == null || !!_static) {
					NEJ.X(this, _super, _isNotFunction);
				}
				this._$super = _super;
				this._$supro = _super.prototype;
				// 将this的原型指向一个新的对象，并将其constructor属性指向this
				var _parent = function(){};
				_parent.prototype = _super.prototype;
				this.prototype = new _parent();
				var _prototype = this.prototype;
				_prototype.constructor = this;

				// 为什么__init不直接调用父类的__init方法？
				var _tmp;
				for(var x in _mmap) {
					// 找到x对应的调用父类的相应方法
					_tmp = _getMethodName(_mmap[x], _umap);
					if(!_tmp || !this._$supro[x]) continue;
					// 定义__init等方法，内部要调用__superInit的方法
					_prototype[x] = (function(_name) {
						return function() {
							this[_name].apply(this, arguments);
						};
					})(_tmp);
				}
				var _pmap = {};
				for(var x in _umap) {
					_tmp = _getMethodName(_umap[x], _mmap);
					if(!_tmp || !this._$supro[_tmp]) continue;
					_pmap[_tmp] = _super;
					// 定义__superInit等方法，内部调用父类的__init方法
					_prototype[x] = (function(_name) {
						return function() {
							var _result,
								_parent = this.__ancestor__[_name],
								_method = _parent.prototype[_name];
							this.__ancestor__[_name] = _parent._$super || _super;
							if(!!_method) {
								_result = _method.apply(this, arguments);
							}
							this.__ancestor__[_name] = _super;
							return _result;
						};
					})(_tmp);
				}

				_prototype.__cp__ = function() {
					this.__ancestor__ = NEJ.X({}, _pmap);
				};
				_prototype.__super = _prototype.__supInit;
				return _prototype;
			};
			// 最后返回这个函数/类，也就是说 NEJ.C() == _class
			return _class;
		};
	})();

	/**
	 * 拷贝对象的属性
	 * @param {Object} _object 原始对象
	 * @param {Object} _config 待拷贝的对象
	 * @param {Function} _filter 过滤函数，如果需要被过滤掉，返回true，要保留的话返回false
	 * @return {Object} 拷贝后的对象
	 */
	NEJ.X = function(_object, _config, _filter) {
		if(!_object || !_config) {
			return _object;
		}
		_filter = _filter || NEJ.F;
		for(var x in _config) {
			if(!_filter(_config[x], x)) {
				_object[x] = _config[x];
			}
		}
		return _object;
	};

	/**
	 * 根据原始对象的属性从目标对象进行拷贝(可以理解为覆盖操作)
	 * 和NEJ.X的区别是，如果属性存在于目标对象，但不存在于原始对象，则：
	 * 	NEJ.X会在原始对象上添加，NEJ.EX则对原始对象没有变化
	 * @param {Object} _object 要覆盖的原始对象
	 * @param {Object} _config 要覆盖的目标对象
	 * @return {Object} 覆盖后的对象
	 */
	NEJ.EX = function(_object, _config) {
		if(!_object || !_config) {
			return _object;
		}
		for(var x in _object) {
			if(_config[x] != null) {
				_object[x] = _config[x];
			}
		}
		return _object;
	}
}