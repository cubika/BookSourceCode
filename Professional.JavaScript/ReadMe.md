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