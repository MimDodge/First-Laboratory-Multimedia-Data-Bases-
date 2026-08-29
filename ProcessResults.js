// processResults.js
//
// Post-procesamiento del arreglo de eventos (Paso 4 del laboratorio).
// Este módulo es el ÚNICO lugar donde vive esta lógica: CallbackImpl.js,
// PromiseImpl.js y AsyncImpl.js la importan y la llaman al final con su
// propia bitácora (register). No tiene sentido reescribir tres veces el
// mismo reduce/filter/map/find, porque el arreglo que reciben los tres
// tiene siempre la misma forma ({eventName, eventType, scheduledTime,
// realTime}); lo único que cambia entre archivos es CÓMO se construyó ese
// arreglo (callbacks anidados, promesas encadenadas o async/await), no
// cómo se analiza después.

const UMBRAL_DESVIACION_MS = 100; // umbral definido por nosotros (Paso 4)

function processResults(register, umbralDesviacionMs = UMBRAL_DESVIACION_MS) {
    console.log('\n--- Bitácora final ---');
    console.log(register);

    // 1) reduce -> latencia promedio entre timestamp programado y real.
    // Usamos reduce porque necesitamos UN solo valor acumulado (la suma
    // de las desviaciones) a partir de todo el arreglo. A diferencia de
    // forEach, reduce expresa esa acumulación como el propio valor de
    // retorno de la función, sin depender de una variable externa mutada
    // desde afuera del callback.
    const totalLatency = register.reduce((accum, current) => {
        return accum + (current.realTime - current.scheduledTime);
    }, 0);
    const averageLatency = totalLatency / register.length;
    console.log(`\nLatencia promedio: ${averageLatency} ms`);

    // 2) filter + map -> identificadores de eventos cuya desviación supera
    // el umbral. filter porque no sabemos de antemano cuántos eventos van
    // a calificar (retorna entre 0 y N objetos-evento completos), y map
    // a continuación porque de ese subconjunto solo nos interesa reportar
    // el identificador (eventName), no el objeto completo; map proyecta
    // sin mutar ni el arreglo original ni el resultado del filter.
    const deviationEventIds = register
        .filter((event) => (event.realTime - event.scheduledTime) > umbralDesviacionMs)
        .map((event) => event.eventName);
    console.log(`\n--- Eventos con desviación mayor a ${umbralDesviacionMs} ms ---`);
    console.log(deviationEventIds);

    // 3) find -> el PRIMER evento cuyo scheduledTime rompe el orden
    // ascendente visto hasta el momento en la bitácora (es decir, llegó a
    // registrarse "tarde" respecto a algo que, según su propia
    // programación, debía ir después de él). Usamos find y no filter
    // porque el enunciado pide solo el primero: find se detiene apenas lo
    // encuentra, en lugar de recorrer todo el arreglo como haría filter
    // para devolver una lista completa que no fue lo que se pidió.
    let maxScheduledSoFar = -Infinity;
    const firstOutOfOrderEvent = register.find((event) => {
        if (event.scheduledTime < maxScheduledSoFar) {
            return true; // llegó "tarde" respecto a algo que debía ir después
        }
        maxScheduledSoFar = Math.max(maxScheduledSoFar, event.scheduledTime);
        return false;
    });
    console.log('\n--- Primer evento que llegó fuera de orden ---');
    console.log(firstOutOfOrderEvent);

    return { averageLatency, totalLatency, deviationEventIds, firstOutOfOrderEvent };
}

module.exports = { processResults, UMBRAL_DESVIACION_MS };
