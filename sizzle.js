(function (window) {
	
	var i,
		whitespace = "[\\x20\\t\\r\\n\\f]", // 搞的这么麻烦
		rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");


	function Sizzle (selector, context, results, seed) {
		
		// 我就要window.document
		if((context ? context.ownerDocument || context : preferredDoc) !== document) {
			setDocument(context);
		}

		context = context || document;
		results = results || [];

		// selector 必须是字符串
		if(!selector || typeof selector !== "string") {
			return results;
		}

		// context必须是一个有效的节点
		if((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
			return [];
		}

		if(documentIsHTML && !seed) {
			// 基本的选择器，id，class和tag
			if((match = rquickExpr.exec(selector))) {
				// #id
				if((m = match[1])) {
					// document
					if(nodeType == 9) {
						elem = context.getElementById(m);
						if(elem && elem.parentNode) {
							// 反复进行确认，是为了避免有些情况下返回的是name的特殊；情形
							if(elem.id === m) {
								results.push(elem);
								return results;
							}
						}else {
							return results;
						}
					}else {
						// 仅仅是普通的元素，那么还是要调用document.getElementById，并且还要判断包含关系
						if(context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
							contains(context,elem) && elem.id === m) {
							results.push(elem);
							return results;
						}
					}
				// tag
				}else if(match[2]) {
					// 原来普通元素上有getElementsByTagName啊
					push.apply(results, context.getElementsByTagName(selector);
					return results;
				// class
				}else if( (m = match[3]) && support.getElementsByClassName) {
					push.apply(results, context.getElementsByClassName(m));
				}
			}

			// 剩下的就是复杂的选择器了
			if(support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType === 9 && selector;
			}
		}
		return select(selector.replace(rtrim, "$1"), context, results, seed);
	}

	// 将Sizzle进行导出
	if(typeof define === "function" && define.amd) {
		// 所有代码都在大大的闭包里，只返回Sizzle定义
		define(function(){return Sizzle;});
	}else if(typeof module !== "undefined" && module.exports) {
		module.exports = Sizzle;
	}else{
		window.Sizzle = Sizzle;
	}
})(window);