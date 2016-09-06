var callbacks = function() {
	var list = [],
		add = function(args) {
			var i,
				length,
				elem;
			for( i = 0,length = args.length; i < length; i++ ){ 
				elem = args[ i ];
				list.push( elem );
			}	
		},
		fire = function(context, args ) {
			var length = list.length,j;
			for( j = 0; j<length; j++){ 
				list[ j ].apply( context,args );
			}
		},
		self = { 
			add: function(){ 
				add( arguments );
				return this ;
			},
			fireWith: function(context, args ) {
				fire( context,args );
				return this ;
			}
		};
		return self ;
}
var Deferred = function() {
	var doneList = callbacks(),
		failList = callbacks(),
		state = "pending",
		
	    promise =  { 
			done: doneList.add,
			fail: failList.add,
			resolve: doneList.fireWith,
			reject: failList.fireWith,
			state: function(){ return state ; }
		};
		promise.done( function(){ state = "resolve" },function(){ console.log( "123" ) } ).fail( function(){ state = "reject" } );
		return promise ;

}

var defer = Deferred();
console.log( defer.state() );
defer.resolve();
console.log( defer.state() );

