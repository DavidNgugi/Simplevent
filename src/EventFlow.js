/**
 * Manages all evnets in the game
 */
(function(window){

    'use strict';

    var EventFlow = (function(){

        var EventFlow = function(){
            
            this.registeredEventListeners = [];
            this.firedEvents = [];

            /**
             * Registers an event 
             * @param {String} event 
             * @param {Function} handler 
             * @param {Object} target 
             * @returns void
             */
            this.on = function(event, handler, target) {
                /**
                 * Note: Apparently you can't get the callee.caller because of webpack's strict mode
                */

                // if (!target) {
                //     target = arguments.callee.caller;
                // }
                
                // this.registeredEventListeners[event] = this.registeredEventListeners[event] || [];
                // check if event already exists
                if (!this.registeredEventListeners[event]) {
                    this.registeredEventListeners[event] = [];
                    //register event
                    this.registeredEventListeners[event].push({handler: handler, target: target});
                }
            }

            /**
             * Calls/Fires a registered event
             * @param {String} event 
             */
            this.dispatch = function(event){
                try{
                    // get all listeners for that event
                    var listeners = this.getListeners(event);
                    if(!listeners || !listeners[0]) return
                    
                    var args = listeners.slice.call(arguments, 1);

                    var that = this;
                    listeners.slice().map(function(i){
                        i.handler.apply(i.target, args);
                        that.firedEvents.push({event: event, handler: i.handler, target: i.target});
                    });
                }catch(e){
                    // console.log("Event not fired. "+ e);
                    throw new Error("Event not dispatched. "+ e);
                }
            };

            /**
             * 
             * @param {String} event
             * @returns Array
             */
            this.getListeners = function(event) {
                if (!this.registeredEventListeners[event]) {
                    this.registeredEventListeners[event] = [];
                }
                return this.registeredEventListeners[event];
            };

            /**
             * clear all trackers for listeners and fired events
             */
            this.clear = function(){
                this.registeredEventListeners = [];
                this.firedEvents = [];
            };
        }

        // we need only a single instance of the event emitter system
        var eSingleton = {
            getInstance: function(){
                var instance;
                if(!instance){
                    instance = new EventFlow();
                }
                return instance;
            }
        }

        return eSingleton;
    })();

    // Store in window a reference to the singleton
    if (typeof window.define === 'function' && window.define.amd !== undefined) {
        window.define('EventFlow', [], function () {
            return EventFlow;
        });
    }
      // CommonJS
    else if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = EventFlow.getInstance();
    }
    else {
        window.EventFlow = EventFlow.getInstance;
    }

})(this);