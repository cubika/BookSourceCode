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
<table>
<thead>
<tr>
<th>Property</th>
<th>Shorthand</th>
<th>Initial Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>input</td>
<td>$_</td>
<td>Empty string.</td>
</tr>
<tr>
<td>lastMatch</td>
<td>$&amp;</td>
<td>Empty string.</td>
</tr>
<tr>
<td>lastParen</td>
<td>$+</td>
<td>Empty string.</td>
</tr>
<tr>
<td>leftContext</td>
<td>$`</td>
<td>Empty string.</td>
</tr>
<tr>
<td>rightContext</td>
<td>$'</td>
<td>Empty string.</td>
</tr>
<tr>
<td>$1 - $9</td>
<td>$1 - $9</td>
<td>Empty string.</td>
</tr>
</tbody>
</table>
+ replace方法可以使用正则表达式，如：
`text.replace(/(.at)/g, "word ($1)");`