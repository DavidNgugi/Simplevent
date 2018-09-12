/**
 * Manages all evnets in the game
 */
(function(window){

    'use strict';

    var Simplevent = (function(){

        var Simplevent = function(){
            
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

                return this;
            }

             /**
             * Removes a listener for a given event 
             * @param {String} event 
             * @param {Function} handler 
             * @returns void
             */
            this.off = function(event, handler) {
                try{
                    var listeners = this.getListeners(event);
                    if (listeners) {
                        var index = listeners.indexOf(event);
                        listeners.slice().map(function(listener){
                            if(listener.handler === handler)
                                listeners.splice(index,1)
                        });
                    }
                }catch(e){
                    throw new Error("Listener not turned off. " + e);
                }

                return this;
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
                    
                    var args = [].slice.call(arguments, 1);

                    var that = this;
                    listeners.slice().map(function(i){
                        i.handler.apply(i.target, args);
                        that.firedEvents.push({event: event, handler: i.handler, target: i.target});
                    });
                }catch(e){
                    // console.log("Event not fired. "+ e);
                    throw new Error("Event not dispatched. "+ e);
                }

                return this;
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

                return this;
            };
        }

        // we need only a single instance of the event emitter system
        var eSingleton = {
            getInstance: function(){
                var instance;
                if(!instance){
                    instance = new Simplevent();
                }
                return instance;
            }
        }

        return eSingleton;
    })();

    // Store in window a reference to the singleton
    if (typeof window.define === 'function' && window.define.amd !== undefined) {
        window.define('Simplevent', [], function () {
            return Simplevent;
        });
    }
      // CommonJS
    else if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = Simplevent.getInstance();
    }
    else {
        window.Simplevent = Simplevent.getInstance;
    }

})(this);