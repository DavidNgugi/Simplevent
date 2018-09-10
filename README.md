# THE EventFlow EVENT LIBRARY

<a href = "https://travis-ci.org/DavidNgugi/EventFlow" title = "Buy Me a Coffee" target="_blank"><img src="https://travis-ci.org/DavidNgugi/EventFlow.svg?branch=master"/></a>

This is a small simple yet effective JavaScript Library that emulates the NodeJs EventEmitter. It's built for projects that require Event-driven programming techniques like simple HTML5 Canvas games etc.

## Installation in Browser

For use on the browser, use `EventFlow.min.js` found in the `dist` folder.

## Installation in NodeJs

For use in a NodeJs project, instantiation is not required

``` bash
npm install EventFlow
```

## Using EventFlow

EventFlow is simple just like any other event system and uses two main methods, on() and dispatch();

### Adding it into your project

EventFlow can be added as a module just like any other mordern NodeJs package

When using it on the browser, `instantiate EventFlow first`.

``` javascript
var EventFlow = new EventFlow();
```

When using node js, just `require the module`.

``` javascript
var EventFlow = require('./src/EventEmitter');
```

### Registering an event

EventFlow's **on()** method takes **3 arguments**, an `EVENT<[String]>` and a listening function which can be a callback `LISTENER<[Function]>` and an **optional** target argument which describes the context for execution `TARGET?<[Object|Function]>`

When using a callback function as a listener

``` javascript
EventFlow.on('GET_EVENT', function(){
    console.log('Registered the damn event!');
});
```

When using a normal function as the listener

``` javascript
function shout() {
    console.log('HEY YOU');
}

EventFlow.on('SHOUT', shout);
```

### Dispatching/Firing an event

``` javascript
EventFlow.dispatch('GET_EVENT');
```

You can pass **unlimited number of arguments** to the listening function as shown below

``` javascript
EventFlow.on('EVENT_WITH_ARGS', function(name){
    console.log(name);
});

EventFlow.dispatch('EVENT_WITH_ARGS', 'Mr. EventFlow');
```

### Clearing events

You can clear all events

``` javascript
EventFlow.clear();
```

## Licencing

Licensed using the MIT Licence and therefore free for commercial purposes;