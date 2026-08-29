// PromiseImpl.limitCase.js
//
// Paso 5 - Caso límite propio: "lectura corrupta del sensor".
// Misma idea que CallbackImpl.casoLimite.js, adaptada a promesas.
//
// eventNine() no rechaza (reject) su promesa: la RESUELVE con un Error
// como si fuera un dato válido, justo después de eventThree. Ninguno de
// los .then() posteriores valida lo que recibió, así que la cadena sigue
// exactamente igual que si nada hubiera pasado (a diferencia de un
// .catch() real, que sí la habría cortado).
//
// Predicción (antes de ejecutar): igual que en la versión de callbacks,
// la bitácora final va a tener longitud 9 con un Error en la posición 3.
// reduce() -> NaN (current.realTime y current.scheduledTime del Error son
// undefined, y en cuanto reduce toca un NaN, el acumulado queda en NaN
// para siempre). filter().map() para desviaciones > 100 ms va a EXCLUIR
// el Error sin lanzar nada, porque NaN > 100 siempre es false. find() del
// primer evento fuera de orden no se ve afectado, porque ya encuentra a
// eventThree ANTES de llegar al Error en el arreglo (find se detiene en
// el primer match).
//
// Reconciliación (después de ejecutar): confirmar que la salida real
// coincide con esta predicción antes de escribir la explicación causal
// en el informe.

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

const register = [];

eventOne()
    .then((eventOneResult) => { register.push(eventOneResult); return eventTwo(); })
    .then((eventTwoResult) => { register.push(eventTwoResult); return eventThree(); })
    .then((eventThreeResult) => { register.push(eventThreeResult); return eventNine(); })
    .then((eventNineResult) => {
        register.push(eventNineResult);
        return eventFour();
    })
    .then((eventFourResult) => { register.push(eventFourResult); return eventFive(); })
    .then((eventFiveResult) => { register.push(eventFiveResult); return eventSix(); })
    .then((eventSixResult) => { register.push(eventSixResult); return eventSeven(); })
    .then((eventSevenResult) => { register.push(eventSevenResult); return eventEight(); })
    .then((eventEightResult) => {
        register.push(eventEightResult);
        processResults(register);
    })
    .catch((error) => {
        console.error('Error en la cadena de promesas:', error);
    });