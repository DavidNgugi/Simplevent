var Flow = require('../src/Flow');

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
            Flow.clear();
        });

        it('Should register listeners for given event', (done) => {
           
            Flow.on(testEvent, handler, target);

            expectedRegisteredEventListenersCount = 1;
            var actualRegisteredEventListenersCount = Flow.getListeners(testEvent).length;

            assert.equal(actualRegisteredEventListenersCount, expectedRegisteredEventListenersCount);

            done();
        });

        it('Should not register multiple listeners for same event', done => {
            Flow.on(testEvent, handler, target);
            Flow.on(testEvent, handler2, target);
            Flow.on(testEvent, handler3, target);

            expectedRegisteredEventListenersCount = 1;
            var actualRegisteredEventListenersCount = Flow.getListeners(testEvent).length;

            assert.equal(actualRegisteredEventListenersCount, expectedRegisteredEventListenersCount);

            done();
        });
        
    });

    describe('When Firing a new Event', () => {

        beforeEach(() => {
            Flow.clear();
        });

        it("Should throw and error when attempting to dispatch unregistered event", (done) => {
            
            expect(Flow.dispatch).to.throw('Event not dispatched');

            done();
        });

        it("Should dispatch a Registered event", (done) => {
            var testEvent = 'TEST:EVENT',
                handler = (e) => { result = true },
                result = false,
                target = () => {};

            Flow.on(testEvent, handler, target);

            Flow.dispatch(testEvent);

            assert.equal(result, true);

            done();
        });
    });
});
