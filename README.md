# THE FLOW EVENT LIBRARY

<a href = "https://travis-ci.org/DavidNgugi/flow" title = "Buy Me a Coffee" target="_blank"><img src="https://travis-ci.org/DavidNgugi/flow.svg?branch=master"/></a>

This is a small simple yet effective JavaScript Library that emulates the NodeJs EventEmitter. It's built for projects that require Event-driven programming techniques like simple HTML5 Canvas games etc.

## Installation in Browser

For use on the browser, use `flow.min.js` found in the `dist` folder.

## Installation in NodeJs

For use in a NodeJs project, instantiation is not required

``` bash
npm install flow
```

## Using Flow

FLow is simple just like any other event system and uses two main methods, on() and dispatch();

### Adding it into your project

Flow can be added as a module just like any other mordern NodeJs package

When using it on the browser, `instantiate Flow first`.

``` javascript
var Flow = new Flow();
```

When using node js, just `require the module`.

``` javascript
var Flow = require('./src/EventEmitter');
```

### Registering an event

Flow's **on()** method takes **3 arguments**, an `EVENT<[String]>` and a listening function which can be a callback `LISTENER<[Function]>` and an **optional** target argument which describes the context for execution `TARGET?<[Object|Function]>`

When using a callback function as a listener

``` javascript
Flow.on('GET_EVENT', function(){
    console.log('Registered the damn event!');
});
```

When using a normal function as the listener

``` javascript
function shout() {
    console.log('HEY YOU');
}

Flow.on('SHOUT', shout);
```

### Dispatching/Firing an event

``` javascript
Flow.dispatch('GET_EVENT');
```

You can pass **unlimited number of arguments** to the listening function as shown below

``` javascript
Flow.on('EVENT_WITH_ARGS', function(name){
    console.log(name);
});

Flow.dispatch('EVENT_WITH_ARGS', 'Mr. Flow');
```

### Clearing events

You can clear all events

``` javascript
Flow.clear();
```

## Licencing

Licensed using the MIT Licence and therefore free for commercial purposes;