#第三章： 基础

###null和undefined
+ 最初的区分： null是一个表示"无"的对象，转为数值时为0；  undefined是一个表示"无"的原始值，转为数值时为NaN。
+ 目前：null表示"没有对象"，即该处不应该有值。  
undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。
+ 声明但没有赋值，或者没有声明，typeof都会返回undefined

###number相关
+ 可以使用Number构造函数转化为一个数字
+ isNaN判断是否不是是一个数字
+ parseInt可以用来转换为数字，默认为十进制
+ parseInt第二个参数用来表示使用什么进制进行转换
+ 使用**parseFloat**转换为小数
+ 使用 **+-** 符号可以转化为数字，如果有valuOf方法则为该方法的返回值：

		var o = { 
		    valueOf: function() {
		        return -1;
		    }
		};
		o = +o; //-1

###其他
+ `5-"2"=3, 5-""=5, 5-"null"=5` 
+ 数字转化为某一个进制的字符串形式可以使用`toString(radix)`
+ switch可以不为数字
+ case可以为表达式，如number > 10

#第五章 常用类型

### Array常用方法
+ **every**方法要求每一个item都满足条件，而some只要求有一个满足就可以了
+ **reduce**方法参数为：`prev,current,index,array`，因此可以利用之前的计算结果计算当前的值
+ 避免在数组最后一个元素后面添加逗号，这样在IE下会认为多一个元素
+ 通过length可以将数组进行裁剪或扩充
+ 在一个数组上调用`toString`，会依次调用数组中每一个元素的toString
+ `unshift`方法用于在开始处添加元素，`shift`用于在开始处移除元素
+ 向`sort`方法中传递一个用于比较的function,可以改变默认的排序行为（默认是按字典序排列，如 0,1,10,15,5）
+ `slice`方法返回原有数组中的子数组，**并不会改变原有数组**,其中start参数表示开始的位置，end表示结束的位置(**子数组不包括end**),如果不提供end，则默认到结束

###其他
+ 获取当前时间的写法：
`var now = (typeof Date.now == "function" ? Date.now() : +new Date());`
+ `Date.parse` 可以将日期字符串转化为时间戳，例子：
`Date.parse("May 25, 2004") //1085414400000 `
+ `caller` 返回一个对函数的引用，该函数调用了当前函数，`callee`返回正被执行的 Function 对象，也就是所指定的 Function 对象的正文。`caller`和`arguments.callee.caller`的区别是，后者兼容性更高，但是在strict模式下不能使用
+ `bind`方法可以用来绑定this对象
+ `encodeURI`只会对空格进行编码，而`encodeURIComponent`可以对空格、冒号、斜线等等编码
+ `Max/Min`方法可以传递对个参数
+ RegExp["$`"] + RegExp["$&"] + RegExp["$'"] = RegExp["$_"]

		+--------------+-----------+---------------+
		| Property     | Shorthand | Initial Value |
		|--------------|-----------|---------------|
		| index        |           | -1            |
		| input        | $_        | Empty string. |
		| lastIndex    |           | -1            |
		| lastMatch    | $&        | Empty string. |
		| lastParen    | $+        | Empty string. |
		| leftContext  | $`        | Empty string. |
		| rightContext | $'        | Empty string. |
		| $1 - $9      | $1 - $9   | Empty string. |
		+--------------+-----------+---------------+
+ replace方法可以使用正则表达式，如：
`text.replace(/(.at)/g, "word ($1)");`

#第八章 浏览器对象模型BOM

+ 获取插件的方法：
	1. 非IE下是**navigator.plugins**或者**navigator.mimeTypes**,具体例子可见：[https://code.google.com/p/doctype-mirror/wiki/ArticleDetectFlash](https://code.google.com/p/doctype-mirror/wiki/ArticleDetectFlash) 
	2. IE下使用try-catch：

			function hasIEPlugin(name){
	            try {
	                new ActiveXObject(name);
	                return true;
	            } catch (ex){
	                return false;
	            }
	        }
+ 可以通过`window.open` 函数的返回值是否为true判断新打开的窗口是否被拦截.
+ `window.open` 函数的原型为 `window.open([URL ][, name ][, features ][, replace]]]]) `，其中第二个参数name的不同情况有：
*_blank表示新开一个窗口，_parent表示父框架窗口，_self表示覆盖该窗口，xxx表示覆盖名字为xxx的窗口（每个窗口都可以给他命名）*
+ moveTo和moveBy方法可以操作一个窗口的位置，前者是移到绝对位置，或者是在原来的基础上移动。常常用在对一个打开的窗口进行操作。需要注意的是：**要移动的窗口必须在同一个domain下，否则会有权限问题**
+ document.body是DOM中Document对象里的body节点， document.documentElement是文档对象根节点(html)的引用。且：
**在标准w3c下，document.body.scrollTop恒为0，需要用document.documentElement.scrollTop来代替**
+ Javascript中获取标准模式与否的方法是通过compactMode. 它有两种可能的返回值：BackCompat和CSS1Compat，对其解释如下：
	
	>
**BackCompat** Standards-compliant mode is not switched on. (Quirks Mode)  
**CSS1Compat** Standards-compliant mode is switched on. (Standards Mode)

#第十章 DOM
+ 文字节点的nodeType是3，获取文字内容可以用element.textContent获取
+ 在XML文档中的所有文本都会被解析器解析。只有在CDATA部件之内的文本会被解析器忽略。
+ 在DOM操作里，createElement是创建一个新的节点，createDocumentFragment是创建一个文档片段。当要向document.body添加大量数据时，如果逐个添加这些节点，这个过程有可能会十分缓慢。为解决这个问题，可以创建一个文档碎片，把所有的新节点附加其上，然后把文档碎片的内容一次性添加到document中。
+ 属性也是一个节点，因此需要创建并设定该节点：
		
		//创建Attribute
		var attr = document.createAttribute("align");
        attr.value = "left";
        element.setAttributeNode(attr);

		//遍历Attribute
 		for (i=0, len=element.attributes.length; i < len; i++){
            attrName = element.attributes[i].nodeName;
            attrValue = element.attributes[i].nodeValue;
            pairs.push(attrName + "=\"" + attrValue + "\"");
        }


#第十五章 canvas图像
+ canvas元素创建的图像可以通过调用`toDataURL()` 方法将图像导出
+ 2D绘画上下文提供了绘制基本图形的方法，如`fillRect()` 方法填充一个矩形, `arc()` 方法绘制一个圆弧，`fillText()` 方法绘制文字等等，也可以通过调用`drawImage()` 方法绘制一个图形图像
+ canvas的save和restore方法可以对canvas状态进行管理，其中：

 	> 
**save**：用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。  
**restore**：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。

+ context的`getImageData()` 方法可以用来获取画布上指定矩形的像素数据，对于每一个像素，都存在着RGBA四个方面的信息
+ 更多的内容参考：[https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Canvas_tutorial](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Canvas_tutorial)


#第十七章 错误处理

###事件相关
+ 获取按键码根据浏览器不同用到的可以有 charCode,keyCode,which
+ 获取按键码最好在**keypress**事件中，而不是在**keyup或者keydown**事件中
+ `event.button`用于返回触发当前事件的鼠标按键是什么，其中0代表鼠标左键，1代表中键，2代表右键
+ 剪贴板对象clipboardData可以通过调用`getData()`和`setData()`用于操作剪贴板的数据。获取该对象可以用`window.clipboardData`或者`event.clipboardData`。使用后者时处在paste事件中。  更多用法参见[http://msdn.microsoft.com/en-us/library/ie/ms535220(v=vs.85).aspx](http://msdn.microsoft.com/en-us/library/ie/ms535220(v=vs.85).aspx "clipboardData object")
 `var clipboardData =  (event.clipboardData || window.clipboardData);`


#二十二章 高级技术

+ 使用`Object.freeze`方法将对象进行冻结操作，这样该对象就不能添加新的属性，不能修改已有的属性，不能删除属性
+ 使用`Object.preventExtensions`方法使得对象不能够被扩展
+ `Object.seal`和`Object.freeze`的区别：

		+--------------------------+-------------------------------+------------------------------------------------+--------------------------------------------+
		| Function                 | Object is made non-extensible | configurable is set to false for each property | writable is set to false for each property |
		|--------------------------|-------------------------------|------------------------------------------------|--------------------------------------------|
		| Object.preventExtensions | Yes                           | No                                             | No                                         |
		| Object.seal              | Yes                           | Yes                                            | No                                         |
		| Object.freeze            | Yes                           | Yes                                            | Yes                                        |
		+--------------------------+-------------------------------+------------------------------------------------+--------------------------------------------+
+ 可以使用bind方法灵活改变context,如果bind方法不可用的话，只能自己实现：

		function bind(fn, context){
            return function(){
                return fn.apply(context, arguments);
            };
        }
+ 为了避免由于缺少**new**操作符导致的this变量误指向window，可以在为this变量赋值的时候，增加一条判断this是否是当前function的实例的语句，如：

		function Person(name, age, job){
            if (this instanceof Person){
                this.name = name;
                this.age = age;
                this.job = job;
            } else {
                return new Person(name, age, job);
            }
        }