/**
 * ----------------------------------------------
 * UI控件基类
 * @version 1.0
 * @author genify(caijf@corp.netease.com)
 * ----------------------------------------------
 */
var f = function() {
	var _ = NEJ.P,
		_o = NEJ.O,
		_f = NEJ.F,
		_e = _('nej.e'),
		_u = _('nej.u'),
		_t = _('nej.ut'),
		_p = _('nej.ui'),
		_proAbstract;
	// 有的话就不用再定义了
	if(!!_p._$$Abstract) return;

	/**
	 * UI控件<strong>基类</strong>
	 * @class {nej.ui._$$Abstract}
	 * @extends {nej.ut._$$Event}
	 * @param {String} 控件样式
	 * @param {String/Node/Function} 控件所在容器节点 或者追加控件节点执行函数(??)
	 */
	_p._$$Abstract = NEJ.C();
	// 所谓的事件驱动？
	_proAbstract = _p._$$Abstract._$extend(_t._$$Event);

	// 初始化
	_proAbstract.__init = function() {
		this.__supInit();
		_e._$dumpCSSText();
		this.__initXGui();
		this.__initNode();
	};

	// 控件重置
	_proAbstract.__reset = function(_options) {
        this.__supReset(_options);
        this.__doInitClass(_options.clazz);
        this._$appendTo(_options.parent);
    };

    // 控件销毁
    _proAbstract.__destroy = function(){
        this.__supDestroy();
        // clear parent
        this.__doDelParentClass();
        delete this.__parent;
        // clear body
        _e._$removeByEC(this.__body);
        _e._$delClassName(this.__body,
                          this.__class);
        delete this.__class;
    };

    // 初始化外观信息
    _proAbstract.__initXGui = _f;
    // 初始化节点
    _proAbstract.__initNode = function() {
    	if ( !this.__seed_html ) {
            this.__initNodeTemplate();
        }
        this.__body = _e._$getNodeTemplate(this.__seed_html);
        if ( !this.__body ) {
            this.__body = _e._$create('div', this.__seed_css);
        }
        _e._$addClassName(this.__body, this.__seed_css);
    };
    // 控件节点模板
    _proAbstract.__initNodeTemplate = _f;
    // 添加节点样式
    _proAbstract.__doInitClass = function(_clazz) {
        this.__class = _clazz || '';
        _e._$addClassName(this.__body, this.__class);
    };
    // 父节点增加辅助样式
    _proAbstract.__doAddParentClass = function(){
        if (!this.__seed_css) return;
        _e._$addClassName(this.__parent, this.__seed_css + '-parent');
    };
    // 父节点删除辅助样式
    _proAbstract.__doDelParentClass = function() {
        if (!this.__seed_css) return;
        _e._$delClassName(this.__parent, this.__seed_css + '-parent');
    };
    // 获取当前控件节点
    _proAbstract._$getBody = function() {
        return this.__body;
    };
    // 控件节点追加至容器
    _proAbstract._$appendTo = function(_parent) {
        if (!this.__body) return this;
        this.__doDelParentClass();
        if (_u._$isFunction(_parent)) {
            this.__parent = _parent(this.__body);
        }else {
            this.__parent = _e._$get(_parent);
            if (!!this.__parent)
                this.__parent.appendChild(this.__body);
        }
        this.__doAddParentClass();
        return this;
    };
    // 显示控件
    _proAbstract._$show = function() {
        if (!this.__parent || !this.__body || 
        	this.__body.parentNode == this.__parent ) {
            return this;
        }
        this.__parent.appendChild(this.__body);
        return this;
    };
    // 隐藏控件
    _proAbstract._$hide = function() {
        _e._$removeByEC(this.__body);
        return this;
    };
}