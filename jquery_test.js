(function(window,undefined){
	var document = window.document,
		location = window.location,
		navigator = window.navigator;
	var jQuery = (function(){
		var jQuery = function() {
			return new jQuery.fn.init(selector,context,rootjQuery) ;
		},
		//jQuery初始化时把可能已经存在的window.jQuery和window.$备份到局部变量 _jQuery 和 _$ 中
		_jQuery = window.jQuery,
		_$ = window.$,
		quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,//捕获HTML标签或ID
		rsingleTag = /^<(\w+)\s*>(?:<\/\1>)?$/,//匹配单个标签

		
		// JSON RegExp
		rvalidchars = /^[\],:{}\s]*$/,
		rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
		rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
		rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

		rnotwhite = /\S/,//非空
		rdashAlpha = /-([a-z]|[0-9])/ig,//匹配字符串中连字符"-"和其后的第一个字母或数字
		rmsPrefix = /^-ms-/,// 匹配字符串中的-ms-
		trimLeft = /^\s+/,// 匹配开始空格
		trimRight = /\s+$/,//匹配结尾空格

		//userAgent regexp  捕获组1:浏览器类型特征字符; 捕获组2: 浏览器版本特征字符
		rwebkit = /(webkit)[\/](\w.)+/,
		ropera = /(opera)(?:.*version)?[\/]([\w.]+)/,
		rmise = /(mise)([\w.]+)/,
		rmozilla = /(mozilla)(?:.*?rv:([\w.]+))?/,
		userAgent = navigator.userAgent,	
		browerMatch,

		trim = String.prototype.trim,
		//声明对核心方法的引用，使得在jQuery代码中可借用
		toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnPeoperty,
		push = Array.prototype.push,
		slice = Array.prototype.slice,
		trim = String.prototype.trim,
		indexOf = String.prototype.indexOf,
 
		// 将连字符后的字母转换为大写并返回 all匹配项 letter捕获组字符
		fcamelCase = function( all,letter ){ 
			return ( letter + "" ).toUpperCase() ;
		},
		class2type = {};
		

		//原型属性和方法
		jQuery.fn = jQuery.prototype = {
			constructor: jQuery,
			init: function(selector,context,rootjQuery) {
				var match,elem,ret,doc;
				//处理$(""),$(null),$(undefined)情况 返回空jQuery对象
				if (!selector) {
					return this;
				}
				//selector是Dom元素,返回包含该Dom元素引用的jQuery对象
				if (selector.nodeType) {
					this.context = this[0] = selector;
					this.length = 1;
					return this ;
				}
				//selector是body字符串，设置context属性指向document对象，第一个元素指向body元素
				if (selector  === "body" && !context && document.body) {
					this.context = document;//this.context存放Dom元素的上下文
					this[0] = document.body;//this[0]存放Dom元素
					this.selector = selector;
					return this;
				}
				//selector是其它字符串，先检测是html还是#id
				if (typeof selector === "string") {
					//dealing with HTML string or an ID
					//若字符串以<开头 >结尾  且长度大于等于3则假设这个字符串是html片段 跳过quickExpr正则检查，仅仅为假设例如<div></p>不合法
					if (selector.charAt(0) === "<" && selector.charAt(selector.length-1) === ">" && selector.length >= 3) {
						match = [null,selector,null];
					}else{
						match = quickExpr.exec(selector);
					}
					//检测是否匹配html或id
					if (match && (match[1]||!context)) {
						//selector是html代码
						if (match[1]) {
							//selector是其他字符串时context为dom元素(jQuery对象)用于指定新创建元素文档对象或普通对象用于定义新创建元素的属性时间
							context = context instanceof jQuery ? context[0]:context;//context为jQuery实例返回其dom元素；否则原样返回
							doc = context ? context.ownerDocument||context : document;//context不是undefined:1.dom节点2.其他；否则设置doc为document
							//如果只传入单个标签则直接创建元素，跳过其他
							ret = rsingleTag.exec(selector);
							//如果是单独标签,第二个参数可以是props（包含了属性，事件的普通对象）
							if (ret) {
								//若传入context的普通对象，则设置属性
								if (jQuery.isPlainObject(context)) {
									selector = [document.createElement(ret[1])];//放入数组中方便以后调用jQuery.merge方法合并数组
									jQuery.fn.attr.call(selector,context,true);//将context中的属性时间设置到新创建的Dom元素中去
								}else{
									selector = [doc.createElement(ret[1])];
								}
							}else{
								//不是单个标签,是复杂html标签,利用浏览器的innerHtml机制创建dom元素
								ret = jQuery.buildFragment([match[1]],[doc]);
								
								selector = (ret.cacheable ? jQuery.clone(ret.fragment):ret.fragment).childNodes;
							}

						}else{
							//selector是id且未指定context，默认情况是从document查找
							elem = document.getElementById(match[2]);
							//如果elem存在，创建包含了dom元素引用的jQuery对象
							if (elem && elem.parentNode) {
								if (elem.id !== match[2]) {
									return rootjQuery.find(selector) ;
								}
								this.length = 1;
								this[0] = elem;
							}
							//如果elem不存在 创建一个空jQuery对象 不包含任何元素 length为0
							this.context = document;
							this.selector = selector;
							return this ;
						}
					}else if(!context||context.jquery){
						//selector是选择器表达式 $(expr,$(...))
						return (context||rootjQuery).find(selector);
					}else{
						//指定了上下文但上下文不是jQuery对象 $(expr,context)
						return this.constructor(context).find(selector) ;//先创建一个包含了context的jQuery对象，然后在该对象上调用方法find
	;				}
				}else if(jQuery.isFunction(selector)){
					//handle $(function)
					return rootjQuery.ready(selector) ;
				}
				//selector是jQuery对象
				if (selector.selector !== undefined) {
					//复制属性selector context
					this.selector = selector.selector;
					this.context = selector.context;
				}
				return jQuery.makeArray(selector,this) ;//把参数selector中包含的选中元素引用，全部复制到当前jQuery对象中
			},
			//start with an empty selector  
			selector: "",
			//the current version of jquery_test being used
			jquery_test: "1.7.1",
			//the default length of jQuery object is 0
			length: 0,
			//the number of element contained in the matched element set
			size: function() {
				return this.length ;
			},
			//将当前jQuery对象转换成真正的数组，转换后的数组包含了所有元素
			toArray: function() {
				return slice.call( this,0 ) ;
			},
			//返回当前jQuery对象中指定位置的元素或包含了全部元素的数组
			get:  function( num ) {
				return	num == null ? this.toArray() : ( num < 0 ? this[ this.length+num ]:this[ num ]) ;
			},
			//遍历当前jQuery对象并在每个元素上执行回调函数
			each: function( callback,agrs ) {
				jQuery.each( this,callback,args );//注意传入this( 当前jQuery对象 )
			},
			//遍历当前jQuery对象，在每个元素上执行回调函数，并将回调函数的返回值放入一个新的jQuery对象中,该方法常用于获取或设置DOM元素集合的值
			map: function( callback ) {
				this.pushStack( jQuery.map( this,function( elem,i ) {
					return callback.call( elem, i, elem );
				} ) );
			},
			
			end: function(  ) {
				//返回前一个jQuery对象，若属性prevObject不存在，则构建一个空的jQuery对象返回
				return this.prevObject || this.constructor( null ) ;
			},

			//.last()/.first() ---> .eq(index) ---> .slice(start,end) --->.pushStack(elements,name,arguments)
			//将匹配元素集合缩减为集合中指定位置的元素
			eq: function( i ) {
				i = +i;//加一个加号可把该参数转化为数值
				i === -1 ? this.slice( i ) : this.slice( i,i+1 );//this.slice( -1,0 )返回[ ]
			},
			first: function() {
				return this.eq( 0 ) ;
			},
			last: function() {
				return this.eq( -1 ) ;
			},
			slice: function() {
				return this.pushStack( slice.apply( this,arguments ),'slice',slice.call( arguments).join( "," ) );
			},
			//仅在内部使用，指向同名数组方法
			push: push,
			sort: [].sort,
			splice: [].splice,
			//创建一个新的空jQuery对象，然后把DOM元素集合放入这个jQuery对象中，并保留对当前jQuery对象的引用
			pushStack: function( elems,name,selector ) {
				//创建一个空jQuery对象
				var ret = this.constructor();
				if ( jQuery.isArry ) {
					push.apply( ret,elems );
				}else{ 
					jQuery.merge( ret,elems );
				}
				//Add the old object onto the stack
				ret.prevObject = this;//设置prevObject属性，指向当前jQuery对象，从而形成一个链式栈;故pushStack的行为还可理解为，构建一个新的jQuery对象，并入栈，新对象位于栈顶
				ret.context = this.context;
				//设置属性selector，便于调试
				if ( name === "find" ) {
					ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
				}else if( name ){ 
					ret.selector = this.selector + "." + name + "(" + selector + ")";
				}
				//返回新jQuery对象
				return ret ;
			},
			ready:function( fn ) {
				
			}
		};
		jQuery.buildFragment = function(args,nodes,scripts){
			var fragment, cacheable, cacheresults, doc,
			first = args[0];
			//node[0]可能为document 可能为普通js对象
			if(nodes && nodes[0]){
				doc = nodes[0].ownerDocument || nodes[0];//document.ownerDocument为null
			}
			//doc为普通对象
			if(!doc.createDocumentFragment){
				doc = document;
			}
			if(args.length === 1 && typeof first === "string" && first.length < 512 && doc === document && first.charAt(0)
		=== "<" && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))
			){
				cacheable = true;
				cacheresults = jQuery.fragments[first];
				if(cacheresults && cacheresult !== 1){
					fragment = cacheresults;
				}
			}
			if(!fragmet){
				fragment = doc.createDocumentFragment();
				jQuery.clean(args, doc, fragment, scripts);
			}
			if(cacheable){
				jQuery.fragments[first] = cacheresults ? fragment : 1;
			}
			return {
				fragment: fragment,
				cacheable: cacheable
			};
		};
		jQuery.extend = jQuery.fn.extend = function(){
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},//指向目标对象
				i = 1, //源对象的起始下标
				length = arguments.length,
				deep = false;
			//Handle deep copy situation
			if(typeof target === "boolean"){
				deep = target;
				target = arguments[1] || {};
				//skip the boolean and the target
				i = 2;
			}
			//Handle case when target is a string or something (possible in deep copy)
			if(typeof target !== "object" && !jQuery.isFunction(target)){
				target = {};
			}
			//extend jQuery itself if only one argument passed
			if(length === i){
				target = this;
				--i;//源对象下标减一
			}
			for( ; i<length; i++ ){
					if ((options = arguments[i]) != null) {
						for(name in options){
							src = target[name];
							copy = options[name];
							if (target === copy) {
								continue;
							}
							if (deep && copy && (jQuery.isPlainObject(copy)||(copyIsArray = jQuery.isArray(copy)))) {
								if ( copyIsArray ) {
									copyIsArray = false;
									clone = src && jQuery.isArray(src) ? src : [];
								}else{
									clone = src && jQuery.isPlainObject(scr) ? src : {};
								}				
								target[ name ] = jQuery.extend( deep,clone,copy );
							}else if( copy !== undefined ){ 
								target[ name ] = copy;
							}
						}	
					}
			}
			return target ;
		};
/*
 *静态属性和方法 		
 */
		jQuery.extend( { 
			//jQuery.each()通用的遍历迭代方法，用于无缝的遍历对象和数组
			each: function( object,callback,args ) {
				var name,i = 0,
					length = object.length,
					isObj = length === undefined || jQuery.isFunction( object );//若length是undefined或object是函数  则认为object是对象
					if ( args ) {
						//传入参数  规定参数为数组
						if ( isObj ) {
							for( name in object ){ 
								if ( callback.apply( object[ name ],args ) === false ) {
									break;
								}
							}
						}else{ 
							for( ;i<length; ){ 
								if ( callback.apply( object[ i++ ],args ) === false ) {
									break;
								}
							}
						}
					}else{ 
						//未传参数
						if ( isObj ) {
							for ( name in object ){
								if( callback.call( object[ name ], name, object[ name ] ) === false ){ 
									break;
								}
							}	
						}else{
							for( ;i<length; ){ 
								if( callback.call( object[ i ], i, object[ i++ ] ) === false ){ 
									break;
								}
							}
						}
					}
					//返回object，支持链式调用
					return object ;
			},
			//静态方法jQuery.map对数组中每个元素或对象中每个属性调用一个回调函数，并将回调函数的返回值放入一个新的数组中
			map: function( elems,callback,args  ) {
				var value,key,ret = [],
					i = 0,
					length = elems.length,
					//将jQuery对象当成数组看待
					isArray = elems instanceof jQuery 
					|| length !== undefined && typeof length  === "number"
					&& ( ( length>0 && elems[ 0 ] && elems[ length-1 ] ) || length === 0 || jQuery.isArray( elems ) );
					if ( isArray ) {
						for (; i < length; i++ ) {
							value = callback( elem[ i ],i,args );//为每个元素执行回调函数
							if ( value != null ) {
								ret[ ret.length ] = value;
							}
						};
					}else{ 
						for ( key in elems ){
							value = callback( elems[ key ], key, args );
							if ( value != null ) {
								ret[ ret.length ] = value;
							}
						}	
					}
					//扁平化二维数组
					return ret.concat.apply( [],ret ) ;
			},
			//jQuery.noConflict  用于释放jQuery对全局变量 $ 的控制权,deep = true释放对全局变量jQuery的控制权
			noConflict: function( deep ) {
				//若全局变量 $ 指向当前的jQuery库 则释放 $ 的控制权给前一个js库
				if ( window.$ === jQuery ) {
					window.$  = _$;
				}
				//若全局变量 jQuery 指向当前的jQuery库 则释放 jQuery 的控制权给前一个js库
				if ( deep && window.jQuery === jQuery ) {
					window.jQuery = _jQuery;
				}
				return jQuery ;
			},
			//jQuery.type 用于判断参数的内建 javascript 类型
			type: function( obj ) {
				return  obj == null ? String( obj ) : class2type[ toString.call( obj ) ] || "object";
			},
			//以下两方法依赖方法 jQuery.type
			isFunction: function( obj ) {
				return jQuery.type( obj ) === "function" ;
			},
			isArray: Array.isArray || function( obj ) {
				return jQuery.type( obj ) === "array" ;
			},
			//jQuery.isWindow 用于判断传入的参数是否是window对象,通过检测是否存在特征属性 setInterval 来实现
			//A crude(粗鲁的) way of determining if an object is a window
			isWindow: function( obj ) {
				return obj && typeof obj === "object" && "setInterval" in obj ;//注意setInterval是字符串  1.7.2版本中 改为检测特征属性 obj == obj.window
			},
			//jQuery.isNumberic 检查是否是数字
			isNumeric: function( obj ) {
				//将obj转换为数字，并且有限
				return !isNaN( parseFloat( obj ) ) && isFinite( obj );
			},
			//jQuery.isPlainObject 判断传入的参数是否是纯粹的对象(即 对象直接量{}或new Object()创建的对象)
			isPlainObject: function( obj ) {
				if ( !obj || jQuery.type( obj ) !==  "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
					return false ;
				}
				//满足下列条件视为由自定义构造函数创建
				if ( obj.constructor && !hasOwn.call( obj,"constructor" ) && !hasOwn.call( obj.constructor.prototype,"isPrototypeOf" ) ) {
					return false ;
				}
				var key;
				for ( key in obj ){}	
				//js会先枚举非继承属性后枚举继承属性,如果最后一个属性是非继承属性则认为所有属性都是非继承属性返回true
				return key === undefined || hasOwn.call( obj,key ) ;
			},
			//jQuery.isEmptyObect 用于检测对象是否为空 即不包含属性
			isEmptyObject: function( obj ) {
				for ( var name in obj ){
					//枚举非继承属性与继承属性，如果有立即返回false
					return false ;
				}	
				//否则 返回true
				return true ;
			},
			//jQuery.parseJSON 接受一个格式良好的JSON字符串,返回解析后的js对象;若传入残缺字符串可能导致抛出异常
			parseJSON: function( data ) {
				if ( typeof data !== "string" || !data ) {
					return null;
				}
				//去除首尾空格 IE可能不识别  
				jQuery.trim( data );
				if ( window.JSON && window.JSON.parse ) {
					return window.JSON.parse( data );
				}
				//验证返回
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();

				}
				jQuery.error( "Invalid JSON "+data );
			},
			//Cross-brower xml parsing
			//接受良好的xml字符串 返回解析后的xml文档
			parseXML: function( data ) {
				var xml, tmp;
				try{ 
					if ( window.DOMParser ) {//standard  html5标准提供的DOMParser解析器 可将xml或html字符串解析为一个DOM文档
						tmp = new DOMParser();
						xml = tmp.parseFromString(data,"text/xml");
					}else{ //IE8-
						xml = new ActiveXObject("Microsoft.XMLDOM");//创建一个空xml文档
						xml.async = false;//同步加载
						xml.loadXML( data );//解析xml字符串
					}
				}catch(e){ 
					//以上解析出现问题
					xml = undefined;
				}
				if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
					jQuery.error( "Invalid XML "+data )
				}
				return xml ;
			},
			//用于在全局作用域中执行js代码
			globalEval: function( data ) {
				if ( data && rnotwhite.test( data ) ) {
					( window.execScript || function( data ){ 
						window[ 'eval' ].call( window,data )
					} )( data );
				}
			},
			// 转换连字符式的字符串为驼峰式
			cramelCase: function( string ) {
				return string.replace( rmsPrefix,"ms-" ).replace( rdashAlpha,fcamelCase ) ;
			},
			// 检查dom元素的节点名称(nodeName)与指定的值是否相等，检查时忽略大小写
			nodeName: function( elem,name ) {
				return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase() ;//避免elem不是dom元素，或者没有属性nodeName
			},
			// 去除首位首尾空白符
			trim: trim ? function( text ){ 
				return text == null ? "" : trim.call( text );
			}:function( text ){ 
				return text == null ? "" : text.toString().replace( trimLeft,"" ).replace( trimRight,"" ) ;
			},
			//可将一个类数组对象转化为数组,还可传入第二个参数results,第一个参数将被并入第二个参数,最后返回第二个参数,返回的值不一定是数组
			/*
			 * 	array:得转化对象，可为任何类型
			 * 	results:仅在jQuery内部使用，若传入则在该参数上添加元素
			 */
			makeArray: function( array,results ) {
				var ret = results || [];
				if(	array != null ){ 
					var type = jQuery.type( array );
					// 非数组或类数组对象
					if ( array.length == null || type == "string" || type == "function" || type == "regexp" || jQuery.isWindow( array ) ) {
						push.call( ret,array );
					}else{ 
						//数组
						jQuery.merge( ret,array );
					}
				}
				return ret ;
			},
			//在数组中查找指定元素并返回其下标,从命名上看应返回 true or false,但却是下标是为了向后兼容
			inArray: function( elem,array,i ) {
				var len;
				if ( array ) {
					if ( indexOf ) {
						return indexOf.call( array,elem,i ) ;
					}
					len = array.length;
					i = i ? i<0 ? Math.max( 0,len+i ) : i : 0 ;//默认为0
					for( ; i<len ; i++ ){ 
						//忽略稀疏数组
						if( i in array && array[ i ] === elem ){ 
							return i ;
						}
					}
				}
				return -1 ;
			},
			//用于合并两个数组中的元素到第一个数组中
			/*
			 * first: 可以是 数组 或 类数组对象(必须含有整型或可以转化为整型)的属性length。
			 * second: 可以是 数组 或 类数组对象 或 任何含有连续整型属性的对象
			 */
			merge: function( first,second ) {
				var i = first.length,
					j = 0;
				if ( typeof second.length === "number" ) {
					for( var l = second.length; j<l; j++ ){ 
						first[ i++ ] = second[ j ];//注意类数组对象中此操作 length属性不会自动加减
					}					
				}else{ 
					//length不是number类型 或 不存在length属性,当作含有连续整型属性的对象
					while( second[ j ] !== undefined ){ 
						first[ i++ ] = second[ j++ ];//注意类数组对象中此操作 length属性不会自动加减
					}
				}
				first.length = i;//因为参数可能不是真正的数组，所以需要手动维护length的值
				return first ;//返回合并后的数组
			},
			// 用于查找数组中满足过滤函数的元素,原数组不受影响
			/*
			 * inv为false 或 不传入 则把执行结果为true的 元素放入结果数组
			 * inv 为 true 则把执行结果为false的元素放入结果数组
			 * 过滤每个函数的callback传入两个参数 当前元素和他的下标  该函数返回一个布尔值
			 */
			grep: function( elems,callback,inv ) {
				var ret = [],
					retVal,
					i = 0,
					length = elems.length;
				inv = !!inv;
				for (; i < length; i++) {
					retVal = !!callback( elems[ i ],i );
					if ( inv !== retVal ) {
						ret.push( elems[ i ] );
					}
				}
				return ret ;
			},
			//jQuery.guid是一个全局计数器,用于jQuery事件模块和缓存模块
			guid: 1,
			proxy: function( fn,context ) {
				var tmp,args,proxy;
				//jQuery.proxy( context,name ) 参数name是参数context的属性。指定参数name对应的函数上下文始终为参数context
				if ( typeof context === "string" ) {
					//调换两个参数的位置
					tmp = fn[ context ];
					context = fn;
					fn = tmp;
				}
				//不是函数返回undefined
				if ( !jQuery.isFunction( fn ) ) {
					return undefined ;
				}
				//收集多余参数,在调用原始函数时这些参数将被优先传入
				args = slice.call( arguments,2 );
				//创建一个代理函数，在代理函数中调用原始函数，调用通过apply方法指定上下文，代理函数通过闭包引用arguments,args,slice
				proxy = function() {
					//将传入的参数添加到args 数组后
					fn.apply( context,args.concat( slice.call( arguments ) ) );
				};
				//为代理函数与原始函数设置相同的唯一标识guid，若原始函数没有，则重新分配一个,相同的标识符将代理函数与原始函数联系起来了
				proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
				return proxy ;
			},
			//为集合中的元素设置一个或多个属性值,或者读取第一个元素的属性值,若设置的属性值是函数且参数exec是true时还会执行函数并取其返回值作为属性值,fn是同时支持读取和设置属性的函数( jQuery.prop,jQuery.attr )
				/*
				 * 	elems: 元素集合,通常是jQuery集合。
				 * 	value: 属性值或函数。当参数key是对象时,该参数为undefined。
				 *  exec : 布尔值。当属性值是函数时,该参数指示是否执行函数。
				 *  fn   : 回调函数。同时支持读取和设置属性。
				 *  pass : 布尔值。该参数在功能上与exec重叠,可忽略。
				 */
			access: function( elems,key,value,exec,fn,pass ) {
				var length = elems.length;
				if ( typeof key === "object" ) {
					//key是对象 表示要设置多个属性，遍历参数key，为每个属性递归调用方法jQuery.access(),遍历完后返回元素集合。
					for ( var k in key ){
						jQuery.access( elems, k, key[ k ], exec, fn, value );
					}	
					return elems ;
				}
				if ( value !== undefined ) {
					//参数value不是undefined,则表示设置单个属性，遍历元素集合elems,为每个元素调用回调函数fn,遍历完后返回集合elems。
					exec = !pass && exec && jQuery.isFunction(value);
					for (var i = 0; i < length; i++) {
						fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i],key ) ) : value,pass );
					}
					return elems ;
				}
				return length ? fn( elems[0],key ) : undefined ;
			},
			//接受一个字符串,抛出一个包含了该字符串的异常,开发插件时可覆盖此方法,用来显示更有用的提示信息。
			error: function( msg ) {
				throw new Error( msg ) ;
			},
			//空函数,希望传递一个什么也不做的函数时用得到,开发插件时此方法可作为可选回调函数的默认值,若没有提供回调函数,则执行jQuery.noop()。
			noop: function() {},
			//返回当前时间的毫秒数。
			now: function() {
				rCanonicalizeeturn ( new Date() ).getTime() ;
			},
			uaMatch: function( ua ) {
				ua = ua.toLowerCase();				
				var match = rwebkit.exec( ua ) || 
					ropera.exec( ua ) ||
					rmise.exec( ua ) ||
					ua.indexOf( "compaible" ) < 0 && rmozilla.exec( ua ) ||
					[];
				return { 
					brower: match[ 1 ] || "", // 浏览器类型
					version: match[ 2 ] || "0" // 版本号
				} ;
			},
			brower: {}



		} );
		
		//Populate( 填入 ) the class2type map
		jQuery.each( "Boolean Number String Function Array Date RegExp Object".split(" "),function( i,name ) {
			class2type[ "[object " + name + "]" ] = name.toLowerCase();
		} );
		browerMatch = jQuery.uaMatch( userAgent );
		if ( browerMatch.brower ) {
			jQuery.brower[ browerMatch.brower ] = true;
			jQuery.brower.version = browerMatch.version;
		}
		if ( jQuery.brower.webkit ) {
			jQuery.brower.safari = true;
		}
		// IE9以下 不匹配不间断空格( \xA0 ),添加\xA0
		if ( rnotwhite.test( "\xa0" ) ) {
			trimLeft = /^[\s\xA0]+/;
			trimRight = /[\s\xA0]+$/;
		}

		jQuery.fn.init.prototype = jQuery.fn;
		return jQuery;
	})();

	/*
	 * 异步队列模块( deferred object )	
	 * 用于实现异步任务 和 回调函数的解耦 为 ajax模块、队列模块、ready事件提供基础功能
	 *异步队列模块包含三部分:jQuery.callbacks( flags ),jQuery.Deferred( func ),jQuery.when()。
	 */

	var flagsCache = {};
    /*
	 * createFlags用于将字符串格式的标记转换为对象格式的标记，并把转换结果保存起来。
	 * flags用以改变回调函数列表的行为,若不传入参数flags,则回调函数列表的行为类似于事件监听函数,能够被触发多次;若传入参数flags则参数值可以是:
	 * once: 确保回调函数列表只能被触发一次。
	 * memory: 记录上一次触发回调函数列表时的参数,之后添加的任何回调函数都将用记录的参数值立即调用。
	 * unique: 确保一个回调函数只能被添加一次,回调函数列表中没有重复值。
	 * stopOnFalse: 当某个回调函数返回false时中断执行。
	 * 中的单个标记或多个标记的组合，多个标记间用空格隔开。
     */
	
	function createFlags ( flags ) {
		var object = flagsCache[ flags ] = {},//注意此处非常精妙,变量object和flagsCache同时指向同一个对象,因此后面为object添加属性时也是在为flagsCache添加属性,这样就不需要再写一行代码把变量object放入缓存flagsCache中了。
			i,length;
		flags = flags.split( /\s+/ );
		for ( i = 0,length = flags.length; i < length; i++) {
			object[ flags[ i ] ] = true;
		};
		return object ;
	}
	
	//回调函数列表,内部通过一个数组保存回调函数,其他方法则围绕这个数组进行操作和检测。
	jQuery.Callbacks = function( flags ) {
		//先尝试从缓存对象flagsCache中获取标记字符串flags的标记对象,如果没有则调用工具函数createFlags(flags)将标记字符串解析为标记对象并放入flagCache中。
		flags = flags ? (flagsCache[ flags ] || createFlags( flags )) : {};
		var list = [],//存放回调函数的数组
			stack = [],//在可重复触发、正在执行的回调函数列表上重复触发时，将上下文和参数放入stack中
			memory,//注意：初始值为undefined,表明函数列表未被触发过
			firing,//回调函数列表是否正在执行中
			firingStart,//待执行的第一个回调函数的下标
			firingLength,//待执行的最后一个回调函数的下标
			firingIndex,//当前正在执行的回调函数的下标
			//工具函数add,实际添加回调函数的工具函数,添加一个或多个回调函数到数组list中
			add = function( args ) {
				var i,
					length,
					elem,
					type;
				for ( i = 0,length = args.length; i < length; i++) {
					elem = args[ i ];
					type = jQuery.type( elem );
					if ( type === "array") {
						add( elem );//递归调用add
					}else if( type === "function" ){ 
						//是函数,但不是unique模式;或者是unique模式但并未添加过。
						if( !flags.unique || !self.has( elem ) ){ 
							list.push( elem );
						}
						//函数以外的类型被忽略。
					}
				}

			},
			//使用指定的上下文context和参数args调用数组list中的回调函数
			//callbacks.fire( args ) 和 callbacks.fireWith( context,args )通过调用工具函数fire( context,args )来触发回调函数。
			fire = function( context,args ) {
				args = args || [];
				//当前函数列表不是memory模式,变量memory赋值为true,间接表示函数列表已被触发过。当前回调函数列表是memory模式,变量memory赋值为[ context,args ],间接表示函数列表已被触发过。
				memory = !flags.memory || [ context,args ];
				firing = true;//回调函数正在执行中
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				for (; list && firingIndex < firingLength; firingIndex++) {
					if ( list[ firingIndex ].apply( context,args ) === false && flags.stopOnfalse ) {
						memory = true;//Mark has halted 表示已触发。
						break;
					}
				}
				firing = false;
				//若为undefined,list被禁用,立即停止执行余下的回调函数。
				if( list ){ 
					//不是once模式,即可以多次触发回调函数列表,则从stack中弹出存放的context和args,再次执行回调函数列表,直到stack为空。
					if ( !flags.once ) {
						if ( stack && stack.length ) {
							memory = stack.shift();
							self.fireWith( memory[ 0 ],memory[ 1 ] );
						}
					}else if( memory === true ){ 
						//once+非memory模式(即已触发) 或 once+stopOnFalse模式 禁用回调函数列表。
						self.disable();
					}else{ 
						//once+memory模式 清空回调函数列表(保证所有回调函数只执行一次,只执行后续添加的回调函数),后需添加的回调函数还会立即执行。
						list = [];
					}	
				}	
			},
			self = { 
				add: function() {
					//用于添加一个或一组回调函数到回调函数列表中。
					//若为undefined,list被禁用,无法添加回调函数。
					if ( list ) {
						//备份数组list的长度,该值也是回调函数插入的位置。
						var length = list.length;
						//添加回调函数
						add( arguments );
						if ( firing ) {
							//若回调函数列表正在执行中则修正结束下标firingLength,使得新添加的回调函数也得以执行。
							firingLength = list.length;
						}else if( memory && memory !== true ){ 
							//memory模式下(表示已经被触发),回调函数列表未在执行中,修正起始下标为回调函数的插入位置,然后调用工具函数fire立即执行新添加的回调函数。但是若在 memory + stopOnFalse 模式下且某个回调函数返回值为false的情况下,则不会执行。
							firingStart = length;
							fire( memory[ 0 ],memory[ 1 ] );
						}
					}
					return this ;
				},
				fire: function() {
					self.fireWith( this,arguments );
					return this ;
				},
				fireWith: function( context,args ) {
					//为undefined,list被禁用,无法触发回调函数。
					if ( stack ) {// [] ==> true
						if ( firing ) { // 回调函数列表正在执行过程中再次调用时传入的上下文和参数入栈
							if ( !flags.once ) { // 正在调用函数列表且不是once模式
								stack.push( [ context,args ] )
							}
						}else if( !( flags.once && memory ) ){
							//不是once模式 或 memory是undefined(即未触发或被禁用)
							fire( context,args );
						}
					}
					return this ;
				},
				//从回调函数列表中移除一个或一组回调函数,移除前修正结束下标firingLength和当前下标firingIndex,确保移除的同时不会漏执行回调函数。
				remove: function() {
					//list未被禁用,若为undefined,list被禁用,无法移除回调函数。
					if ( list ) {
						var args = arguments,
							argIndex = 0,
							argLength = args.length;
						for( ; argIndex < length; argIndex++ ){ 
							for( var i = 0; i < list.length; i++ ){ 
								if ( args[ argIndex ] === list[ i ] ) {
									//当前列表正在执行
									if ( firing ) {
										if ( i <=  firingLength ) {
											firingLength--;
											//防止漏执行
											if ( i <= firingIndex ) {
												firingIndex--;
											}
										}
									}
									//移除匹配元素,并修正i指向下一个回调函数下标
									list.splice( i--,1 );
									//unique模式下,不会有重复的回调函数,故只需遍历一次回调函数列表。这是针对unique模式的优化。
									if ( flags.unique ) {
										break;
									}
								}
							}
						}
					}
					return this ;
				},
				disable: function() {
					//禁用回调函数列表
					stack = list = memory = undefined;
					return this ;
				},
				disabled: function() {
					return !list ;
				},
				fired:function() {
					//通过检测变量memory的值来判断回调函数列表是否被触发过
					return !!memory ;
				},
				//锁定当前list的状态,不能添加、移除、执行
				lock: function() {
					//锁定memory模式下回调函数的上下文和参数.
					stack = undefined; // memory模式下会导致无法再次触发回调函数.
					if ( !memory && memory === true ) {
						//非memory模式,禁用list.
						self.disable();
					}
					return this ;
				},
				locked: function() {
					return !stack ;
				},
				//检测给定的函数是否在回调函数列表中。
				has: function(fn) {
					if ( list ) {
						var i = 0,
							length = list.length;
						for( ; i < length; i++ ){ 
							if ( fn === list[ i ] ) {
								return true ;
							}
						}
					}
					return false ;
				},
				//移除列表中所有的回调函数
				empty: function() {
					list = [];
					return this ;
				}
			};

			return self ;
	};
	
	var sliceDeferred = [].slice;

	jQuery.extend( { 
		Deferred: function( func ) {
			//异步队列维护着三个回调函数列表( 分别是成功列表，失败列表，消息列表 )
			var doneList = jQuery.Callbacks( "once memory" ),
				failList = jQuery.Callbacks( "once memory" ),
				progressList = jQuery.Callbacks( "memory" ),
				state = "pending", //状态变量 初始值为待定状态
				lists = { 
					resolve: doneList,
					reject: failList,
					notify: progressList
				},
				//用来对三个列表执行各种操作
				promise = { 
					//用来向各自的列表中添加回调函数 的方法
					done: doneList.add,
					fail: failList.add,
					progress: progressList.add,
					//建议使用
					state: function() {
						return state ;
					},
					//不建议使用
					isResolved: doneList.fired,
					isRejected: failList.fired,
					//向三个列表分别添加方法
					then: function( doneCallbacks,failCallbacks,progressCallbacks ) {
						deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
						return this ;
					},
					//同时向成功回调函数列表和失败回调函数列表添加 回调函数
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this ;
					},
					pipe: function(  ) {
						
					},
					promise: function( obj ) {
						if ( obj == null ) {
							obj = promise;
						}else{ 
							for( var key in promise ){ 
								obj[ key ] = promise[ key ];
							}
						}
						return obj ;
					}
				},
				//获取promise的只读副本
				deferred = promise.promise( {} ),
				key;
				//通过遍历变量lists中的属性名为异步队列添加方法resolve,resolveWith,reject,rejectWith,，变量lists可减少代码的行数
				for( key in lists ){ 
					deferred[ key ] = lists[ key ].fire;
					deferred[ key + "With" ] = lists[ key ].fireWith;
				}
				//为每个异步队列添加3个成功回调函数，3个失败回调函数
				deferred.done( function(){ 
					state = "resolved";
				},failList.disable,progressList.lock )
				.fail( function() {
					state = "rejected";
				},doneList.disable,progressList.lock );

				if ( func ) {
					func.call( deferred,deferred );
				}
				//返回异步队列
				return deferred ;
		},
		//调用此方法时传入多个异步队列作为参数,在内部创建一个"主"异步队列,并维护一个计数器。传入的异步队列参数成为"子"异步队列.
		when: function( firstParam ) {
			//firstParam当做局部变量使用
			var args = sliceDeferred.call( argument,0 ),//用来存放子异步队列成功参数.
				i = 0,
				length = args.length,
				pValues = new Array( length ), //存放每个子异步队列的消息参数。
				count = length, // 计数器
				pCount = length,
				//如果只传入一个异步队列,则直接将其赋值给deferred,否则新创建一个异步队列作为主异步队列.
				deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ? firstParam : jQuery.Deferred(),
				promise = deferred.promise(); //异步队列的只读副本
				//成功状态监听函数
				function resolveFunc ( i ) {
					//注意通过闭包引用以上变量
					return function( value ) {
						//arguments为调用参数
						args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguemnts,0 ) : value;
						if ( !( --count ) ) {
							//子异步队列成功回调已全部触发,调用主异步队列的成功回调函数
							deferred.resolveWith( deferred,args );
						}
					} ;
				}
				function progressFunc ( i ) {
					return function( value ) {
						pValue[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments,0 ) : value;//收集消息参数,不改变状态。
						deferred.notifyWith( promise,pValues );
					} ;
				}
				//若传入多个参数。
				if ( length>1 ) {
					//遍历每一个传入的参数
					for( ; i < length; i++ ){ 
						if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
							//如果是异步队列,则为该异步队列的三个回调函数列表分别添加如下函数。
							args[ i ].promise.then( resolveFunc(i),deferred.reject,progressFunc(i) );
						}else{ 
							//若传入多个参数但不是异步队列,计数器减一
							--count;
						}
					}
					if ( !count ) {
						//调用主异步队列的成功回调函数,改变state为resolve( 遍历数组里的函数,通过闭包引用deferred闭包内的state )
						deferred.resolveWith( deferred,args );
					}
				}else if( deferred !== firstParam ){ 
					//未传入参数或传入非异步队列参数,立即调用主异步队列的方法resolveWith(),使主异步队列进入成功状态,之后为主异步队列添加的成功回调函数会立即执行。
					deferred.resolveWith( deferred,length ? [ firstParam ] : []);
				}

			return promise ;
		}
	} );

	//数据缓存
	jQuery.extend( { 
		//全局缓存对象
		cache: {},
		uuid: 0,
		//在embed元素,object元素( 除了Flash组件 ),applet元素上附加扩展属性会抛出错误
		noData: { 
			"embed": true,
			"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",//此字符串用于判断是否是flash组件。
			"applet": true
		},
		//用于判断DOM元素是否可以设置数据。
		acceptData: function( elem ) {
			if ( elem.nodeName ) {
				
			}
		}

	} )

	/******************** jQuery立即调用函数表达式结束 ************************/
	window.jQuery = window.$ = jQuery;
})(window);
