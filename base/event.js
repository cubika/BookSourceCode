/**
 * --------------------------------------------
 * 事件接口实现文件
 * @version 1.0
 * @author genify(caijf@corp.netease.com)
 * --------------------------------------------
 */
var f = function() {
	var _ = NEJ.P,
		_h = _('nej.h'),
		_e = _('nej.e'),
		_u = _('nej.u'),
		_v = _('nej.v'),
		_cache = {};

	/**
	 * 在节点上添加事件
	 * @example
	 * 	_v._$addEvent(
     *   'abc','mouseover',
     *   function(_event){
     *     // TODO something
     *  },false);
	 * @param {String|Node} 节点ID或者对象
	 * @param {String} 事件类型，不带on前缀，不区分大小写
	 * @param {Function} 事件处理函数
	 * @param {Boolean} 是否捕获阶段事件
	 * @return {nej.v}
	 */
	_v._$addEvent = (function() {
		// 写的不是很好啊！
		var _doAddEventInCache = function() {
			var _args = _h.__checkEvent.apply(_h, arguments);

			if(!_args || !_args[2]) return;
			var _tmp0 = _e._$id(_args[0]), // 节点
				_tmp1 = _cache[_tmp0] || {}, 
				_tmp2 = _tmp1[_tmp0] || [];
			_cache[_tmp0] = _tmp1; // _cache[node] = 已有的 || {}
			_tmp0 = _args[4] || _args[1]; 
			 // _cache[node] = {node: [{type:mouseout,func:xxx}, {type:mouseover,func:yyy}]}
			_tmp1[_tmp0] = _tmp2;
			_tmp2.push({
				type: _args[1],
				func: _args[2],
				capt: !!_args[3],
				sfun: _args[5] || _args[2]
			});
			return _args.slice(0,4);
		};
		return function() {
			// 获取参数，并设置_cache
			var _args = _doAddEventInCache.apply(null, arguments);
			if(!!_args) {
				// 调用平台相关接口，添加事件
				_h.__addEvent.apply(_h, _args);
			}
			return this;
		};
	})();

	_v._$delEvent = (function() {

		var _doDelEventInCache = function() {
			var _args = arguments,
				_tmp0 = _e._$id(_args[0]),
				_tmp1 = _cache[_tmp0],
				_type = (_args[1] || '').toLowerCase(),
				_event = _args[2];
			if(!_tmp1 || !_type || !_event) return;
			_tmp1 = _tmp1[_type]; // 获取对应事件的回调函数列表
			if(!_tmp1) return;
			var _cflag = !!_args[3],
				// 找到回调函数相同，并且捕获标志相同的索引
				_index = _u._$indexOf(_tmp1, function(_emap) {
					return _event == _emap.sfun && _cflag == _emap.capt;
				});
			if(_index < 0) return;
			var _emap = _tmp1.splice(_index, 1)[0];
			return !_emap ? null : [
					_e._$get(_tmp0),
					_emap.type,
					_emap.func,
                    _emap.capt
				];
		};

		return function() {
			// 和添加的流程一样，先修改_cache，再调用平台相关接口实现
			var _args = _doDelEventInCache.apply(null, arguments);
			if(!!_args) {
				_h.__delEvent.apply(_h, _args);
			}
		}
	})
};