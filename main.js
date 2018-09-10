var Flow = require('./src/Flow');

Flow.on('EVENT_WITH_ARGS', function(name){
    console.log(name);
});

Flow.dispatch('EVENT_WITH_ARGS', 'Mr. Flow');