/**
 * -----------------------------------------------------------
 * 这些接口需要根据具体的平台进行适配，所以放到了patched目录下
 * @version 1.0
 * @author genify(caijf@corp.netease.com)
 * -----------------------------------------------------------
 */

var f = function () {
	var _ = NEJ.P,
		_r = NEJ.R,
		_p = _('nej.p'), //这个是platform,不是命名空间
		_e = _('nej.e'),
		_u = _('nej.u'),
		_h = _('nej.h');
	var _prefix = _p.$KERNEL.prefix,
		_support = _p.$SUPPORT,
		// 这些是啥？
		_2dmap  = {scale:'scale({x|1},{y|1})'
                  ,rotate:'rotate({a})'
//                ,matrix:'matrix({m11},{m12},{m21},{m22},{m41},{m42})'
                  ,translate:'translate({x},{y})'},
        _3dmap  = {scale:'scale3d({x|1},{y|1},{z|1})'
                  ,rotate:'rotate3d({x},{y},{z},{a})'
//                ,matrix:'matrix3d({m11},{m12},{m13},{m14},{m21},{m22},{m23},{m24},{m31},{m32},{m33|1},{m34},{m41},{m42},{m43},{m44|1})'
                  ,translate:'translate3d({x},{y},{z})'},
        _cssmap = {'transition':!0,'transform':!0,'animation':!0,'keyframes':!0
                  ,'box':!0,'box-pack':!0,'box-flex':!0,'marquee':!0,'border-radius':!0,'user-select':!0};

    _h.__addEvent = function() {
    	var _args = arguments;
    	// 节点.addEventListener(事件类型，处理函数，是否捕获)
    	_args[0].addEventListener(_args[1], _args[2], !!_args[3]);
    }


}