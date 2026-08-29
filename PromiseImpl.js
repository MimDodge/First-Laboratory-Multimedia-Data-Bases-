// PromiseImpl.js
// Promesas encadenadas: una forma más ordenada, donde las instrucciones se
// van conectando una después de otra con .then, como una lista de pasos.

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

function eventOne() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: 'eventOne',
                eventType: 'aviso largo',
                scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_ONE,
                realTime: Date.now(),
            });
        }, EVENT_DELAYS_MS.EVENT_ONE);
    });
}

function eventTwo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: 'eventTwo',
                eventType: 'aviso largo',
                scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_TWO,
                realTime: Date.now(),
            });
        }, EVENT_DELAYS_MS.EVENT_TWO);
    });
}

function eventThree() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: 'eventThree',
                eventType: 'aviso largo',
                scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_THREE,
                realTime: Date.now(),
            });
        }, EVENT_DELAYS_MS.EVENT_THREE);
    });
}

function eventFour() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: 'eventFour',
                eventType: 'aviso largo',
                scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_FOUR,
                realTime: Date.now(),
            });
        }, EVENT_DELAYS_MS.EVENT_FOUR);
    });
}

function eventFive() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: 'eventFive',
                eventType: 'aviso largo',
                scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_FIVE,
                realTime: Date.now(),
            });
        }, EVENT_DELAYS_MS.EVENT_FIVE);
    });
}

function eventSix() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: 'eventSix',
                eventType: 'aviso largo',
                scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_SIX,
                realTime: Date.now(),
            });
        }, EVENT_DELAYS_MS.EVENT_SIX);
    });
}

function eventSeven() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: 'eventSeven',
                eventType: 'aviso largo',
                scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_SEVEN,
                realTime: Date.now(),
            });
        }, EVENT_DELAYS_MS.EVENT_SEVEN);
    });
}

function eventEight() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: 'eventEight',
                eventType: 'aviso largo',
                scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_EIGHT,
                realTime: Date.now(),
            });
        }, EVENT_DELAYS_MS.EVENT_EIGHT);
    });
}

const register = [];

eventOne()
    .then((eventOneResult) => {
        register.push(eventOneResult);
        return eventTwo();
    })
    .then((eventTwoResult) => {
        register.push(eventTwoResult);
        return eventThree();
    })
    .then((eventThreeResult) => {
        register.push(eventThreeResult);
        return eventFour();
    })
    .then((eventFourResult) => {
        register.push(eventFourResult);
        return eventFive();
    })
    .then((eventFiveResult) => {
        register.push(eventFiveResult);
        return eventSix();
    })
    .then((eventSixResult) => {
        register.push(eventSixResult);
        return eventSeven();
    })
    .then((eventSevenResult) => {
        register.push(eventSevenResult);
        return eventEight();
    })
    .then((eventEightResult) => {
        register.push(eventEightResult);
        processResults(register);
    })
    .catch((error) => {
        console.error('Error en la cadena de promesas:', error);
    });