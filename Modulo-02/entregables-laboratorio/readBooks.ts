// Alumno: Javier Álvarez

// Read Books
// -----------------------------------------------------------------------------
// Crea una función isBookRead que reciba una lista de libros y un título y devuelva si se ha leído o no dicho libro. Un libro es un objeto con title como string y isRead como booleano. En caso de no existir el libro devolver false TIP: Existe un método de Array.prototype que te ayudará a buscar según un patrón.

// Opcional
// Utiliza Typescript para añadir los tipos adecuados.

interface Books {
    title: string;
    isRead: boolean;
}

const books: Books[] = [
    { title: "Harry Potter y la piedra filosofal", isRead: true },
    { title: "Canción de hielo y fuego", isRead: false },
    { title: "Devastación", isRead: true },
    { title: "¿Para que me comprasteis un walkie-talkie si era hijo único?", isRead: true },
    { title: "El club de la lucha", isRead: true },
];

function isBookRead(books: Books[], titleToSearch: string): boolean {
  const book = books.find((book) => book.title === titleToSearch);
//   console.log('=> book:', book);

  return book ? book.isRead : false;
}

console.log(isBookRead(books, "Devastación")); // true
console.log(isBookRead(books, "Canción de hielo y fuego")); // false
console.log(isBookRead(books, "Los Pilares de la Tierra")); // false
console.log(isBookRead(books, "La esperanza del imperio")); // false
console.log(isBookRead(books, "¿Para que me comprasteis un walkie-talkie si era hijo único?")); // true
console.log(isBookRead(books, "Kafka en la orilla")); // false
console.log(isBookRead(books, "El club de la lucha")); // true
console.log(isBookRead(books, "Harry Potter y la piedra filosofalo")); // false porque es un typo


// -> Utilizo el método find (de Array.prototype) para buscar el libro y devuelvo el valor del booleano isRead del libro encontrado. Si no se encuentra el libro, return false.
