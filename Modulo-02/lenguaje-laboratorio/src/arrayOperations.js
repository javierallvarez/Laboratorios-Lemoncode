// Alumno: Javier Álvarez
// 1. Array operations
// -----------------------------------------------------------------------------

const myArray = ["Andy", "Lucas", "Ojete", "Calor", "Vetusta", "Morla"];

// -----------------------------------------------------------------------------
// Head
// Implementa una función head (inmutable), tal que, dado un array como entrada extraiga y devuelva su primer elemento. Utiliza destructuring.
// -----------------------------------------------------------------------------
const head = ( myArray ) => {
    const [first] = myArray;
    console.log('head ==> extraigo', first);
    return first;
}

const headValue = head(myArray);
console.log('headValue ==> devuelvo', headValue); // Andy


// -----------------------------------------------------------------------------
// Tail
// Implementa una función tail (inmutable), tal que, dado un array como entrada devuelta todos menos el primer elemento. Utiliza rest operator.
// -----------------------------------------------------------------------------
const tail = ( myArray) => {
    const [, ...rest] = myArray;
    return rest;
}; 

const tailValue = tail(myArray);
console.log('tailValue ==>', tailValue); // ["Lucas", "Ojete", "Calor", "Vetusta", "Morla"]



// -----------------------------------------------------------------------------
// Init
// Implementa una función init (inmutable), tal que, dado un array como entrada devuelva todos los elementos menos el último. Utiliza los métodos que ofrece Array.prototype.
// -----------------------------------------------------------------------------
const init = ( myArray ) => {
    const result = myArray.slice(0, myArray.length - 1);
    return result;
}

const initValue = init(myArray);
console.log('initValue ==>', initValue); // ["Andy", "Lucas", "Ojete", "Calor", "Vetusta"]



// -----------------------------------------------------------------------------
// Last
// Implementa una función last (inmutable), tal que, dado un array como entrada devuelva el último elemento.
// -----------------------------------------------------------------------------
const last = ( myArray ) => {
    const [result] = myArray.slice(-1);
    return result;
}

const lastValue = last(myArray);
console.log('lastValue ==>', lastValue); // Morla

