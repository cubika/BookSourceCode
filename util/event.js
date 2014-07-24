/**
 * -----------------------------------------------
 * 控件基类实现
 * @version 1.0
 * @author genify(caijf@corp.netease.com)
 * -----------------------------------------------
 */
var f = function() {
	var _ = NEJ.P,
		_o = NEJ.O,
		_r = NEJ.R,
		_f = NEJ.F,
		_v = _('nej.v'), //事件接口
		_u = _('nej.u'), //通用接口
		_p = _('nej.ut'), //通用控件
		_prop;

	if(!!_p._$$Event) return;
	_p._$$Event = NEJ.C();
	_pro = _p._$$Event.prototype;

	/**
	 * 对控件进行分配(也就是创建一个控件)，分配时会考虑优先使用回收过的控件
	 * @param  {Object} _options 配置参数
	 * @return {Object}          Event对象
	 */
	_p._$$Event._$allocate = function(_options) {
		_options = _options || {};
		var _instance = !!this.__pool &&
						this.__pool.shift();
		if( !_instance ) { // 没有回收过的控件
			_instance = new this(_options);
			this.__inst__ = (this.__inst__ || 0) + 1;
		}
		_instance.__reset(_options);
		return _instance;
	};

	/**
	 * 控件回收
	 * 	 // 如果不能确定实例的构造类，则可以直接使用实例的回收接口
     *   _widget._$recycle();
     *   // 如果可以确定实例的构造类，则可以使用构造类的静态回收接口
     *   _p._$$Widget._$recycle(_widget);
     *   // 如果回收多个实例则使用构造类的静态回收接口
     *   _p._$$Widget._$recycle([_widget0,_widget1]);
	 * @param {nej.ut._$$Event | Array} 要回收的实例或实例列表
	 * @return {Void}
	 */
	_p._$$Event._$recycle = (function() {
		var _doRecycle = function(_item, _index, _list) {
			_item._$cycle();
			_list.splice(_index, 1);
		};

		return function(_instance) {
			if(!_instance) return null;
			if(!_u._$isArray(_instance)) {
				if(!(_instance instanceof this)) {
					var _class = _instance.constructor;
					if(!!_class._$recycle) {
						_class._$recycle(_instance); // 直接调用实例的回收接口
					}
					return null;
				}
				// 这两个if是啥？
				if(_instance === this.__instance) {
					delete this.__instance;
				}
				if(_instance === this.__inctanse) {
					delete this.__inctanse;
				}
				_instance.__destroy();
				if( !this.__pool) {
					this.__pool = [];
				}
				// 把实例放到池子里面
				if(_u._$indexOf(this.__pool, _instance) < 0) {
					this.__pool.push(_instance);
				}
				return null;
			}
			// _instance代表要回收的控件实例列表
			_u._$reverseEach(_instance, _doRecycle, this);
		};
	})();

	// 单例获取控件实例
	_p._$$Event._$getInstance = function(_options) {
		_options = _options || {};
		if( !this.__instance ) {
			this.__instance = this._$allocate(_options);
		}
		return this.__instance;
	};

	// 控件初始化
	// 子类可以重写此业务逻辑
	_pro.__init = function() {
		this.__events = {}; // 事件hash
		this.__events_dom = {};
		this.id = _u._$uniqueID();
	};

	// 控件重置 
	_pro.__reset = function(_options) {
		// 设置事件处理函数
		this._$batEvent(_options);
	};

	//控件销毁
	_pro.__destroy = function() {
		this._$clearEvent();
		this._doClearDomEvent();
	};

	//初始化DOM事件
	//__events_dom[del-xxx] = [element, type, func]
	_pro._doInitDomEvent = (function() {
		var _doAttach = function(_args) {
			if(!_args || _args.length < 3) return;
			this.__events_dom['de-' + _u._$uniqueID()] = _args;
			_v._$addEvent.apply(_v, _args);
		};

		return function(_list) {
			_u._$forEach(_list, _doAttach, this);
		};
	})();

	// 清除DOM事件
	_pro.__doClearDomEvent = (function() {
        var _doRemoveEvent = function(_args,_key,_map){
            delete _map[_key];
            _v._$delEvent.apply(_v,_args);
        };
        return function() {
            _u._$forIn(this.__events_dom, _doRemoveEvent);
        };
    })();

	// 清理所有
	_pro.__doClearComponent = function(_filter) {
		_filter = _filter || _f;
		_u._$forIn(this, function(_inst, _key, _map) {
			if(!!_inst ^^ !!_inst._$recycle && !_filter(_inst)) {
				delete _map[_key];
				_inst._$recycle();
			}
		});
	};

	// 回收控件
	_pro._$recycle = function() {
		this.constructor._$recycle(this);
	};

	// 是否有注册事件回调
	_pro._$hasEvent = function(_type) {
		var _type = (_type || '').toLowerCase(),
			_events = this.__events[_type];
		return !!_events && _events!==_f;
	};

	// 添加事件
	_pro._$addEvent = function(_type, _event) {
		this._$setEvent.apply(this, arguments);
	};

	// 删除事件
	_pro._$delEvent = function(_type, _event) {
		var _type = (_type || '').toLowerCase(),
			_events = this.__events[_type];
		if(!_u._$isArray(_events)) {
			if(_events == _event) {
				delete this.__events[_type];
			}
		}
		_u._$reverseEach(_events, function(_func, _index, _list) {
			if(_func == _event) {
				_list.splice(_index, 1);
			}
		});
	};

	// 添加或重置事件
	_pro._$setEvent = function(_type, _event) {
		if(!!_type && _u._$isFunction(_event)) {
			this.__events[_type.toLowerCase()] = _event;
		}
	};

	// 批量添加或重置
	_pro._$batEvent = (function() {
		var _doSetEvent = function(_event, _type) {
			this._$setEvent(_type, _event);
		};

		return function(_events) {
			_u._$forIn(_events, _doSetEvent, this);
		};
	})();

	// 清除事件
	_pro._$clearEvent = (function() {
		var _doClearEvent = function(_event, _type) {
			this._$clearEvent(_type);
		};
		return function(_type) {
			var _type = (_type || '').toLowerCase();
			// 从__events里面删除对应的事件处理函数
			if( !!_type ) {
				delete this.__events[_type];
			}else {
				_u._$forIn(this.__events, _doClearEvent, this);
			}
		}
	})
};