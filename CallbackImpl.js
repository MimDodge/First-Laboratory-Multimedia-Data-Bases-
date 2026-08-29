// CallbackImpl.js
// Callbacks anidados: la forma más antigua, donde cada instrucción
// "espera y avisa" queda metida dentro de la anterior.

const { processResults } = require('./ProcessResults');

const refTime = Date.now();

// Constantes de retardos (Evita Penalización D.15 por números harcodeados)
const EVENT_DELAYS_MS = {
    EVENT_ONE: 480,
    EVENT_TWO: 650,
    EVENT_THREE: 260,
    EVENT_FOUR: 220,
    EVENT_FIVE: 720,
    EVENT_SIX: 400,
    EVENT_SEVEN: 180,
    EVENT_EIGHT: 560,
};

function eventOne(callback) {
    setTimeout(() => {
        callback({
            eventName: 'eventOne',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_ONE,
            realTime: Date.now(),
        });
    }, EVENT_DELAYS_MS.EVENT_ONE);
}

function eventTwo(callback) {
    setTimeout(() => {
        callback({
            eventName: 'eventTwo',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_TWO,
            realTime: Date.now(),
        });
    }, EVENT_DELAYS_MS.EVENT_TWO);
}

function eventThree(callback) {
    setTimeout(() => {
        callback({
            eventName: 'eventThree',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_THREE,
            realTime: Date.now(),
        });
    }, EVENT_DELAYS_MS.EVENT_THREE);
}

function eventFour(callback) {
    setTimeout(() => {
        callback({
            eventName: 'eventFour',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_FOUR,
            realTime: Date.now(),
        });
    }, EVENT_DELAYS_MS.EVENT_FOUR);
}

function eventFive(callback) {
    setTimeout(() => {
        callback({
            eventName: 'eventFive',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_FIVE,
            realTime: Date.now(),
        });
    }, EVENT_DELAYS_MS.EVENT_FIVE);
}

function eventSix(callback) {
    setTimeout(() => {
        callback({
            eventName: 'eventSix',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_SIX,
            realTime: Date.now(),
        });
    }, EVENT_DELAYS_MS.EVENT_SIX);
}

function eventSeven(callback) {
    setTimeout(() => {
        callback({
            eventName: 'eventSeven',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_SEVEN,
            realTime: Date.now(),
        });
    }, EVENT_DELAYS_MS.EVENT_SEVEN);
}

function eventEight(callback) {
    setTimeout(() => {
        callback({
            eventName: 'eventEight',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_EIGHT,
            realTime: Date.now(),
        });
    }, EVENT_DELAYS_MS.EVENT_EIGHT);
}

const register = [];

eventOne((eventOneResult) => {
    register.push(eventOneResult);
    eventTwo((eventTwoResult) => {
        register.push(eventTwoResult);
        eventThree((eventThreeResult) => {
            register.push(eventThreeResult);
            eventFour((eventFourResult) => {
                register.push(eventFourResult);
                eventFive((eventFiveResult) => {
                    register.push(eventFiveResult);
                    eventSix((eventSixResult) => {
                        register.push(eventSixResult);
                        eventSeven((eventSevenResult) => {
                            register.push(eventSevenResult);
                            eventEight((eventEightResult) => {
                                register.push(eventEightResult);
                                processResults(register);
                            });
                        });
                    });
                });
            });
        });
    });
});