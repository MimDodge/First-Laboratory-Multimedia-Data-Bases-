// AsyncImpl.limitCase.js
//
// Paso 5 - Caso límite propio: "lectura corrupta del sensor".
// Misma idea que CallbackImpl.casoLimite.js y PromiseImpl.casoLimite.js,
// adaptada a async/await.

const { processResults } = require('./ProcessResults');

const refTime = Date.now();

// Constantes de retardos (Evita Penalización D.15 por números harcodeados)
const EVENT_DELAYS_MS = {
    EVENT_ONE: 480,
    EVENT_TWO: 650,
    EVENT_THREE: 260,
    EVENT_NINE: 340,
    EVENT_FOUR: 220,
    EVENT_FIVE: 720,
    EVENT_SIX: 400,
    EVENT_SEVEN: 180,
    EVENT_EIGHT: 560,
};

function eventOne() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            eventName: 'eventOne',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_ONE,
            realTime: Date.now(),
        }), EVENT_DELAYS_MS.EVENT_ONE);
    });
}

function eventTwo() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            eventName: 'eventTwo',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_TWO,
            realTime: Date.now(),
        }), EVENT_DELAYS_MS.EVENT_TWO);
    });
}

function eventThree() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            eventName: 'eventThree',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_THREE,
            realTime: Date.now(),
        }), EVENT_DELAYS_MS.EVENT_THREE);
    });
}

// Evento límite: el "sensor" resuelve su propia promesa con un Error en
// vez de rechazarla. El await de abajo no lo valida.
function eventNine() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(new Error('eventoNueve: no se pudo confirmar la lectura del sensor'));
        }, EVENT_DELAYS_MS.EVENT_NINE);
    });
}

function eventFour() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            eventName: 'eventFour',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_FOUR,
            realTime: Date.now(),
        }), EVENT_DELAYS_MS.EVENT_FOUR);
    });
}

function eventFive() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            eventName: 'eventFive',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_FIVE,
            realTime: Date.now(),
        }), EVENT_DELAYS_MS.EVENT_FIVE);
    });
}

function eventSix() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            eventName: 'eventSix',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_SIX,
            realTime: Date.now(),
        }), EVENT_DELAYS_MS.EVENT_SIX);
    });
}

function eventSeven() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            eventName: 'eventSeven',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_SEVEN,
            realTime: Date.now(),
        }), EVENT_DELAYS_MS.EVENT_SEVEN);
    });
}

function eventEight() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            eventName: 'eventEight',
            eventType: 'aviso largo',
            scheduledTime: refTime + EVENT_DELAYS_MS.EVENT_EIGHT,
            realTime: Date.now(),
        }), EVENT_DELAYS_MS.EVENT_EIGHT);
    });
}

async function runEvents() {
    const register = [];
    try {
        register.push(await eventOne());
        register.push(await eventTwo());
        register.push(await eventThree());

        // A propósito NO comprobamos si esto es un Error (ej. con
        // "instanceof Error"), para observar qué hace el modelo de
        // async/await cuando nadie se detiene a validar lo que llega.
        register.push(await eventNine());

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