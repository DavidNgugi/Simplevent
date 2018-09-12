# THE SIMPLE EVENT LIBRARY

<a href = "https://travis-ci.org/DavidNgugi/Simplevent" title = "Buy Me a Coffee" target="_blank"><img src="https://travis-ci.org/DavidNgugi/Simplevent.svg?branch=master"/></a>

This is a small simple yet effective JavaScript Library that emulates the NodeJs EventEmitter. It's built for projects that require Event-driven programming techniques like simple HTML5 Canvas games etc.

## Installation in Browser

For use on the browser, use `simplevent.min.js` found in the `dist` folder.

## Installation in NodeJs

For use in a NodeJs project, instantiation is not required

``` bash
npm install simplevent
```

## Using Simplevent

Simplevent is simple just like any other event system and uses two main methods, on() and dispatch();

### Adding it into your project

Simplevent can be added as a module just like any other mordern NodeJs package

When using it on the browser, `instantiate Simplevent first`.

``` javascript
const Simplevent = new Simplevent();
```

When using node js, just `require the module`.

``` javascript
const Simplevent = require('simplevent');
```

### Registering an event

Simplevent's **on()** method takes **3 arguments**, an `EVENT<[String]>` and a listening function which can be a callback `LISTENER<[Function]>` and an **optional** target argument which describes the context for execution `TARGET?<[Object|Function]>`

When using a callback function as a listener

``` javascript
Simplevent.on('GET_EVENT', function(){
    console.log('Registered the damn event!');
});
```

When using a normal function as the listener

``` javascript
function shout() {
    console.log('HEY YOU');
}

Simplevent.on('SHOUT', shout);
```

### Dispatching/Firing an event

``` javascript
Simplevent.dispatch('GET_EVENT');
```

You can pass **unlimited number of arguments** to the listening function as shown below

``` javascript
Simplevent.on('EVENT_WITH_ARGS', function(name){
    console.log(name);
});

Simplevent.dispatch('EVENT_WITH_ARGS', 'Mr. Simplevent');
```

### Turning off an event listener

Use the `off()` method. 

``` javascript
Simplevent.off('SHOUT', shout);
```

### Clearing events

You can clear all events

``` javascript
Simplevent.clear();
```

### Method Chaining

You can chain the methods instead of writing them seperately

``` javascript

var result = 4;

var addOne = () => { result += 1; }

var multipyByThree = () => { result *= 3; }

var divideByFour = () => { result /= 4; }

Simplevent.on('ADD', addOne)
        .on('MULTIPLY', multipyByThree)
        .on('DIVIDE', divideByFour)
        .dispatch('MULTIPLY');
```

## Licencing

Licensed using the MIT Licence and therefore free for commercial purposes;