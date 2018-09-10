var EventFlow = require('../src/EventFlow');

var assert = require('assert');

var expect = require('chai').expect;

var testEvent = 'TEST:EVENT',
    handler = (e) => {},
    handler2 = (e) => {},
    handler3 = (e) => {},
    target = () => {},
    expectedRegisteredEventListenersCount = 0;

describe('Event Manager', () => {

    describe('When registering a new Event', () => {

        beforeEach(() => {
            EventFlow.clear();
        });

        it('Should register listeners for given event', (done) => {
           
            EventFlow.on(testEvent, handler, target);

            expectedRegisteredEventListenersCount = 1;
            var actualRegisteredEventListenersCount = EventFlow.getListeners(testEvent).length;

            assert.equal(actualRegisteredEventListenersCount, expectedRegisteredEventListenersCount);

            done();
        });

        it('Should not register multiple listeners for same event', done => {
            EventFlow.on(testEvent, handler, target);
            EventFlow.on(testEvent, handler2, target);
            EventFlow.on(testEvent, handler3, target);

            expectedRegisteredEventListenersCount = 1;
            var actualRegisteredEventListenersCount = EventFlow.getListeners(testEvent).length;

            assert.equal(actualRegisteredEventListenersCount, expectedRegisteredEventListenersCount);

            done();
        });
        
    });

    describe('When Firing a new Event', () => {

        beforeEach(() => {
            EventFlow.clear();
        });

        it("Should throw and error when attempting to dispatch unregistered event", (done) => {
            
            expect(EventFlow.dispatch).to.throw('Event not dispatched');

            done();
        });

        it("Should dispatch a Registered event", (done) => {
            var testEvent = 'TEST:EVENT',
                handler = (e) => { result = true },
                result = false,
                target = () => {};

            EventFlow.on(testEvent, handler, target);

            EventFlow.dispatch(testEvent);

            assert.equal(result, true);

            done();
        });
    });
});
