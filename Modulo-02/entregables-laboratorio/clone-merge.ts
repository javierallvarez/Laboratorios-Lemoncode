// Alumno: Javier Álvarez

// Clone
// -----------------------------------------------------------------------------
// Implementa una función clone que, a partir de un objeto de entrada source devuelva un nuevo objeto con las propiedades de source:

interface Source {
    name: string;
    email: string;
    age: number;
    isAdmin: boolean;
    }

const user: Source = {
    name: "Homer Thompson",
    email: "homer@email.com",
    age: 34,
    isAdmin: true,
    };

function clone<T>(source: T): T {
    return { ...source };
}

const newUser = clone(user);
console.log('=> newUser:', newUser);    // => newUser: { name: 'Homer Thompson', email: 'homer@email.com', age: 34, isAdmin: true }

// -> Uso un generico para que la función clone pueda ser usada con cualquier tipo de objeto y retorno un nuevo objeto con las propiedades de source


// Merge
// -----------------------------------------------------------------------------
// Implementa una función merge que, dados dos objetos de entrada source y target, devuelva un nuevo objeto con todas las propiedades de target y de source, y en caso de propiedades con el mismo nombre, source sobreescribe a target.

interface Source2 {
    name: string;
    surname: string;
    country: string;
}
interface Target {
    name: string;
    age: number;
    married: boolean;
}

// Por ejemplo, dados estos 2 objetos:
// TIP: Puedes usar la función "clone" del apartado A.
// el resultado de mezclar a sobre b sería:
// merge(a, b); // {name: "Maria", age: 31, married: true, surname: "Ibañez", country: "SPA"}

const a: Source2 = { 
    name: "Maria", 
    surname: "Ibañez", 
    country: "SPA" 
};
const b: Target = {
    name: "Luisa", 
    age: 31, 
    married: true 
};

function merge<T, U>(target: T, source: U): T & U {
    source = clone(source);
    console.log('=> source:', source);    // => source: { name: 'Maria', surname: 'Ibañez', country: 'SPA' }
    
    target = clone(target);
    console.log('=> target:', target);    // => target: { name: 'Luisa', age: 31, married: true }
    
    return { ...source, ...target };
}

const mergedObject = merge(a, b);
console.log('=> mergedObject:', mergedObject);    // => mergedObject: { name: 'Maria', age: 31, married: true, surname: 'Ibañez', country: 'SPA' }

// -> Uso genéricos para que la función merge pueda ser usada con cualquier tipo de objeto y retorno un nuevo objeto con todas las propiedades de target y de source
// y en caso de propiedades con el mismo nombre, source sobreescribe a target debido a que paso source primero y luego target en el return { ...source, ...target }