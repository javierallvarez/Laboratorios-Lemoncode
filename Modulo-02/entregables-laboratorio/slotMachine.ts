// Alumno: Javier Álvarez
// 5. Slot Machine

// El objetivo de este ejercicio es crear una máquina tragaperras utilizando clases donde cada vez que juguemos insertemos una moneda. Cada máquina tragaperras (instancia) tendrá un contador de monedas que automáticamente se irá incrementando conforme vayamos jugando.

// Cuando se llame al método play el número de monedas se debe incrementar de forma automática y debe generar tres booleanos aleatorios que representarán el estado de las 3 ruletas. El usuario habrá ganado en caso de que los tres booleanos sean true, y por tanto deberá mostrarse por consola el mensaje:
// "Congratulations!!!. You won <número de monedas> coins!!";
// y reiniciar las monedas almacenadas, ya que las hemos conseguido y han salido de la máquina. En caso contrario deberá mostrar otro mensaje:
// "Good luck next time!!".


class SlotMachine {
    name: string;
    coins: number;

    constructor(
        name: string = '',
    ) {
        this.name = name;
        this.coins = 0;
    }
   
    play() {
        this.coins++;
        console.log('=> Coins:', this.coins);

        const random1 = Math.random() >= 0.5;
        const random2 = Math.random() >= 0.5;
        const random3 = Math.random() >= 0.5;
        console.log('=> result:', random1, random2, random3);

        if (random1 && random2 && random3) {
            console.log(`Congratulations!!!. You won ${this.coins * 2} coins!!`);
            this.coins = 0;
        
        } else {
            console.log('Good luck next time!!');
        }
    }
}

const machine1 = new SlotMachine("Monkey Island");
console.log(machine1);  // SlotMachine { name: 'Monkey Island', coins: 0 }

machine1.play(); // "Good luck next time!!"
machine1.play(); // "Good luck next time!!"
machine1.play(); // "Congratulations!!!. You won 3 coins!!"
machine1.play(); // "Good luck next time!!"
machine1.play(); // "Congratulations!!!. You won 2 coins!!"


const machine2 = new SlotMachine("Diamonds Adventure");
console.log(machine2);  // SlotMachine { name: 'Diamonds Adventure', coins: 0 }

machine2.play(); // "Good luck next time!!"
machine2.play(); // "Good luck next time!!"
machine2.play(); // "Good luck next time!!"
machine2.play(); // "Good luck next time!!"


// -> Creo una clase SlotMachine con un constructor que recibe un nombre y un contador de monedas que se incrementa en cada jugada al invocar al método play
// -> Math.random() >= 0.5 devuelve un booleano aleatorio. Si los tres booleanos son true, el usuario ha ganado y recibe el doble de monedas que ha insertado