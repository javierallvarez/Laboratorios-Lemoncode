// Alumno: Javier Álvarez
// 1. Concat
// -----------------------------------------------------------------------------
// Implementa una función concat (inmutable) tal que, dados 2 arrays como entrada, devuelva la concatenación de ambos. Utiliza rest / spread operators.

const myArray1 = ["Lapan", "Toja"];
const myArray2 = ["Mario", "Netas"];

const superConcatenator = (...arrays) => {
    const [a, b] = arrays;
    return [...a, ...b];
}

const concatResult = superConcatenator(myArray1, myArray2);
console.log('concatResult ==>', concatResult); // ["Lapan", "Toja", "Mario", "Netas"]

// ==> Uso rest para recoger los arrays de entrada, desestructuro los arrays y los concateno con spread.


// -----------------------------------------------------------------------------
// Opcional
// Implementa una nueva versión de concat donde se acepten múltiples arrays de entrada (más de 2). No utilices el método Array.prototype.concat.
// -----------------------------------------------------------------------------

const myArray3 = ["Bertin", "Ousborne"];
const myArray4 = ["Teddy", "Viertes"];
const myArray5 = ["Kenny", "Bell"];

const superConcatenator2 = (...arrays) => {
    return arrays.reduce((acumulador, array) => [...acumulador, ...array], []);
}

const concatResult2 = superConcatenator2(myArray1, myArray2, myArray3, myArray4, myArray5);
console.log('concatResult2 ==>', concatResult2); // ["Lapan", "Toja", "Mario", "Netas", "Bertin", "Ousborne", "Teddy", "Viertes", "Kenny", "Bell"]

// ==> Uso rest para recoger los arrays de entrada y con reduce concateno todos los arrays en uno solo.
// ==> acumulador es el array que se va formando con cada iteración, y array es el array que se va a concatenar en cada iteración.