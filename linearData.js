var size = 40000;

console.time( 'fillStrings' );
var arrayOfStrings = fillStrings();
console.timeEnd( 'fillStrings' );

console.time( 'fillArrays' );
var arrayOfArrays = fillArrays();
console.timeEnd( 'fillArrays' );

console.time( 'fillObjects' );
var arrayOfObjects = fillObjects();
console.timeEnd( 'fillObjects' );

console.time( 'fillObjectsWithShortNames' );
var arrayOfObjectsWithSmallNames = fillObjectsWithShortNames();
console.timeEnd( 'fillObjectsWithShortNames' );

console.time( 'fillInstances' );
var arrayOfInstances = fillInstances();
console.timeEnd( 'fillInstances' );

console.time( 'fillObjectsWithAttributesAsObject' );
var arrayOfObjectsWithAttributesAsObject = fillObjectsWithAttributesAsObject();
console.timeEnd( 'fillObjectsWithAttributesAsObject' );

var arrayOfObjectsWithAttributesAsObject1 = fillObjectsWithAttributesAsObject(),
	arrayOfObjectsWithAttributesAsObject2 = fillObjectsWithAttributesAsObject();

function fillStrings() {
	var a = [];
	for ( var i = 0; i < size; i++ ) {
		a.push( randomChar() );
	}
	return a;
}

function fillArrays() {
	var a = [];
	for ( var i = 0; i < size; i++ ) {
		a.push( [ randomChar(), randomArrayAttributes() ] );
	}
	return a;
}

function fillObjects() {
	var a = [];
	for ( var i = 0; i < size; i++ ) {
		a.push( { character: randomChar(), attr: randomArrayAttributes(), type: 0 } );
	}
	return a;
}

function fillInstances() {
	var a = [];
	for ( var i = 0; i < size; i++ ) {
		a.push( new Character( randomChar(), randomArrayAttributes() ) );
	}
	return a;
}

function Character( c, a ) {
	this.type = 0;
	this.character = c;
	this.attr = a;
}

function fillObjectsWithShortNames() {
	var a = [];
	for ( var i = 0; i < size; i++ ) {
		a.push( { c: randomChar(), a: randomArrayAttributes(), t: 0 } );
	}
	return a;
}

function fillObjectsWithAttributesAsObject() {
	var a = [];
	for ( var i = 0; i < size; i++ ) {
		a.push( { character: randomChar(), attr: randomObjectAttributes(), type: 0 } );
	}
	return a;
}

console.log( '--- get type ---' );

testCounting( arrayOfArrays, 'is array', function( data, i ) {
	return _.isArray( data[ i ] );
} );

testCounting( arrayOfObjects, 'has character', function( data, i ) {
	return data[ i ].character != undefined;
} );

testCounting( arrayOfObjectsWithSmallNames, 'has c', function( data, i ) {
	return data[ i ].c != undefined;
} );

testCounting( arrayOfObjects, 'check type', function( data, i ) {
	return data[ i ].type == 0;
} );

testCounting( arrayOfObjectsWithSmallNames, 'check t', function( data, i ) {
	return data[ i ].t == 0;
} );

testCounting( arrayOfInstances, 'instanceof', function( data, i ) {
	return arrayOfInstances[ i ] instanceof Character
} );

console.log( '--- add attribute ---' );

testAction( arrayOfStrings, 'arrayOfStrings', function( data, i ) {
	if ( _.isString( data[ i ] ) ) {
		data[ i ] = [ data[ i ], [ 4 ] ];
	}
} );

testAction( arrayOfArrays, 'arrayOfArrays', function( data, i ) {
	var attr = data[ i ][ 1 ];

	for ( var j = 0; j < attr.length; j++ ) {
		if ( attr[ j ] == 4 ) {
			return;
		}
	}
	attr.push( 4 );
} );

testAction( arrayOfObjects, 'arrayOfObjects', function( data, i ) {
	var attr = data[ i ].attr;

	for ( var j = 0; j < attr.length; j++ ) {
		if ( attr[ j ] == 4 ) {
			return;
		}
	}
	attr.push( 4 );
} );

testAction( arrayOfObjectsWithSmallNames, 'arrayOfObjectsWithSmallNames', function( data, i ) {
	var attr = data[ i ].a;

	for ( var j = 0; j < attr.length; j++ ) {
		if ( attr[ j ] == 4 ) {
			return;
		}
	}
	attr.push( 4 );
} );

testAction( arrayOfInstances, 'arrayOfInstances', function( data, i ) {
	var attr = data[ i ].attr;

	for ( var j = 0; j < attr.length; j++ ) {
		if ( attr[ j ] == 4 ) {
			return;
		}
	}
	attr.push( 4 );
} );

testAction( arrayOfObjectsWithAttributesAsObject, 'arrayOfObjectsWithAttributesAsObject', function( data, i ) {
	data[ i ].attr[ 4 ] = 1;
} );

testAction( arrayOfObjectsWithAttributesAsObject1, 'arrayOfObjectsWithAttributesAsObject', function( data, i ) {
	data[ i ].attr[ 4 ] = 1;
} );

testAction( arrayOfObjectsWithAttributesAsObject2, 'arrayOfObjectsWithAttributesAsObject', function( data, i ) {
	data[ i ].attr[ 4 ] = 1;
} );

console.log( '--- remove attributes ---' );

testAction( arrayOfStrings, 'arrayOfStrings', function( data, i ) {
	var attr = data[ i ][ 1 ];

	attr.splice( attr.indexOf( 4 ), 1 );

	if ( attr.length == 0 ) {
		data[ i ] = data[ i ][ 0 ];
	}
} );
testAction( arrayOfArrays, 'arrayOfArrays', function( data, i ) {
	var attr = data[ i ][ 1 ];

	attr.splice( attr.indexOf( 4 ), 1 );
} );
testAction( arrayOfObjects, 'arrayOfObjects', function( data, i ) {
	var attr = data[ i ].attr;

	attr.splice( attr.indexOf( 4 ), 1 );
} );
testAction( arrayOfObjectsWithSmallNames, 'arrayOfObjectsWithSmallNames', function( data, i ) {
	var attr = data[ i ].a;

	attr.splice( attr.indexOf( 4 ), 1 );
} );
testAction( arrayOfInstances, 'arrayOfInstances', function( data, i ) {
	var attr = data[ i ].attr;

	attr.splice( attr.indexOf( 4 ), 1 );
} );

testAction( arrayOfObjectsWithAttributesAsObject, 'arrayOfObjectsWithAttributesAsObject delete', function( data, i ) {
	delete data[ i ].attr[ 4 ];
} );

testAction( arrayOfObjectsWithAttributesAsObject1, 'arrayOfObjectsWithAttributesAsObject 0', function( data, i ) {
	 data[ i ].attr[ 4 ] = 0;
} );

testAction( arrayOfObjectsWithAttributesAsObject2, 'arrayOfObjectsWithAttributesAsObject undefined', function( data, i ) {
	data[ i ].attr[ 4 ] = undefined;
} );

function testAction( data, name, action ) {
	var i = 0;

	// gc();
	console.time( name );
	for ( i = 0; i < size; i++ ) {
		action( data, i );
	}
	console.timeEnd( name );
	// console.log( data[ 0 ] );
}

function testCounting( data, name, condition ) {
	// gc();

	var count = 0,
		i = 0;

	console.time( name );
	for ( i = 0; i < size; i++ ) {
		if ( condition( data, i ) ) {
			count++
		}
	}
	console.timeEnd( name );

	if ( count < size ) {
		console.log( name + ' goes wrong' );
	}
	// console.log( data[ 0 ] );
}

function randomChar() {
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	return possible.charAt( Math.floor( Math.random() * possible.length ) );
}

function randomArrayAttributes() {
	var size = 3,
		attr = [];

	for ( i = 0; i < size; i++ ) {
		attr.push( Math.floor( (Math.random() * 10 ) + 1 ) );
	}

	return attr;
}


function randomObjectAttributes() {
	var size = 3,
		attr = {};

	for ( i = 0; i < size; i++ ) {
		attr[ Math.floor( (Math.random() * 10 ) + 1 ) ] = 1;
	}
	return attr;
}