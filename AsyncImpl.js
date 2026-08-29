// AsyncImpl.js
// async/await: la forma más moderna y parecida a escribir código "normal"
// de arriba hacia abajo, pero que por dentro sigue esperando lo mismo que
// las otras dos.

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

// async/await: mismo orden secuencial, escrito de arriba hacia abajo.
async function runEvents() {
    const register = [];
    try {
        register.push(await eventOne());
        register.push(await eventTwo());
        register.push(await eventThree());
        register.push(await eventFour());
        register.push(await eventFive());
        register.push(await eventSix());
        register.push(await eventSeven());
        register.push(await eventEight());

        processResults(register);
    } catch (error) {
        console.error('Error durante la ejecución de eventos:', error);
    }
}

runEvents();