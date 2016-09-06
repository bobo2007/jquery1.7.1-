// var dom=document.getElementById('foo1');
// var button=document.getElementsByTagName("button");
// console.log( $('div').toArray() ,$('div').get());
// var quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
// var match = quickExpr.exec('<img>');
// function fun(){
//     console.log('123')
// }
// var o = {};
// // o.n1 = o;
// jQuery.extend(true,o,{n2:o});
// a=jQuery(fun);
// console.log('owner',dom.ownerDocument.ownerDocument,dom);
// console.log('button',button[0].ownerDocument,button);
// var obj = { length:12,name:"bo" };
// jQuery.each( obj, function(){ console.log( 'this.name',this ) } )
// console.log( jQuery.isPlainObject( {constructor:"bo"} ) );

/*
 * var callbacks = jQuery.Callbacks("memory");
 * var something = true;
 * function fn1(args){
 *     console.log("fn1",args);
 * 	// if( something ){  
 * 	// 	callbacks.fire("测试：执行过程中，第二次触发");
 * 	// 	callbacks.fire("测试：执行过程中，第三次出发");
 * 	// 	something = false;
 * 	// }
 * }
 * function fn2(args){
 *   console.log("fn2",args)
 *   console.log("fn2","before remove fn1");
 *   callbacks.remove( fn2 );
 *   console.log("fn2","after remove fn1");
 *   console.log("fn2","before remove fn3");
 *   callbacks.remove( fn3 );
 *   console.log("fn2","after remove fn3");
 * 
 * }
 * function fn3(args){ 
 * 	console.log( "fn3",args );
 * }
 * // callbacks.add(fn1);
 * 
 * callbacks.add(fn1,fn2,fn3);
 * console.log( callbacks.has( fn3 ) )
 */

// callbacks.fire("测试 mry模式 第一次触发");
//callbacks.add(fn2);

/*
 * function wait1 () {
 * 	var defer = jQuery.Deferred();
 * 	var tasks = function() {
 * 		console.log( "wait1执行完毕!" );
 * 		defer.resolve();
 * 	};
 * 	setTimeout( tasks,3000 );
 * 	return defer ;
 * }
 * function wait2 () {
 * 	var defer = jQuery.Deferred();
 * 	var tasks = function() {
 * 		console.log( "wait2执行完毕!" );
 * 		defer.resolve();
 * 	};
 * 	setTimeout( tasks,5000 );
 * 	return defer ;
 * }
 * jQuery.when( wait1(),wait2() ).done( function(){ console.log( "success" ) } ).fail( function(){ console.log( "fail" ) } );
 */
// var defer = jQuery.Deferred();
// console.log( defer.state() );
// defer.resolve();
// console.log( defer.state() );












// var foo1=function(){
//     this.name='bobo';
//     this.age=20;
//     this.goto=function(){
//         console.log('111');
//     }
// };
// foo1.prototype={
//     constructor:foo1,
//     gender:'male',
//     address: 'shandong',
//     goHome:function(){
//         console.log('home');
//     }
// };
//
// var my = new foo1();
// console.log(my)
//
