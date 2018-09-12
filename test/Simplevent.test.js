var Simplevent = require('../src/Simplevent');

var assert = require('assert');

var expect = require('chai').expect;

var testEvent = 'TEST:EVENT',
    handler = (e) => {},
    handler2 = (e) => {},
    handler3 = (e) => {},
    target = () => {},
    expectedRegisteredEventListenersCount = 0;


describe('When registering a new Event', () => {

    beforeEach(() => {
        Simplevent.clear();
    });

    it('Should register listeners for given event', (done) => {
        
        Simplevent.on(testEvent, handler, target);

        expectedRegisteredEventListenersCount = 1;
        var actualRegisteredEventListenersCount = Simplevent.getListeners(testEvent).length;

        assert.equal(actualRegisteredEventListenersCount, expectedRegisteredEventListenersCount);

        done();
    });

    it('Should not register multiple listeners for same event', done => {
        Simplevent.on(testEvent, handler, target);
        Simplevent.on(testEvent, handler2, target);
        Simplevent.on(testEvent, handler3, target);

        expectedRegisteredEventListenersCount = 1;
        var actualRegisteredEventListenersCount = Simplevent.getListeners(testEvent).length;

        assert.equal(actualRegisteredEventListenersCount, expectedRegisteredEventListenersCount);

        done();
    });
    
});

describe('When removing an event listener', () => {

    before(() => {
        Simplevent.clear();
    });

    it("Should delete event listener from registered event listeners", done => {
        var testEvent = 'TEST:EVENT',
            handler = (e) => { return true },
            target = () => {};

        Simplevent.on(testEvent, handler, target);

        Simplevent.off(testEvent, handler);

        assert.equal(Simplevent.getListeners(testEvent).length, 0);
        done();
    });

})


describe('When dispatching a new Event', () => {

    beforeEach(() => {
        Simplevent.clear();
    });

    it("Should throw and error when attempting to dispatch unregistered event", (done) => {
        
        expect(Simplevent.dispatch).to.throw('Event not dispatched');

        done();
    });

    it("Should dispatch a Registered event", (done) => {
        var testEvent = 'TEST:EVENT',
            handler = (e) => { result = true },
            result = false,
            target = () => {};

        Simplevent.on(testEvent, handler, target);

        Simplevent.dispatch(testEvent);

        assert.equal(result, true);

        done();
    });

    describe('When chaining methods', () => {
        
        before(() => {
            Simplevent.clear();
        });

        it("should dispatch correct event", done => {

            var result = 4;
            
            var addOne = () => { result += 1; }
            
            var multipyByThree = () => { result *= 3; }
            
            var divideByFour = () => { result /= 4; }
            
            Simplevent.on('ADD', addOne)
                    .on('MULTIPLY', multipyByThree)
                    .on('DIVIDE', divideByFour)
                    .dispatch('MULTIPLY');

            expect(result).to.eq(12);

            done();
        });
    })
    
});
