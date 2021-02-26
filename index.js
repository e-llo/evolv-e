import {Organismo} from "./Classes/Organismo.js";
import {Herbivoro} from "./Classes/Herbivoro.js";
import {Carnivoro} from "./Classes/Carnivoro.js";
import {Alimento} from "./Classes/Alimento.js";


// function geraCorAleatoria(){
//     var cor = "rgb(";
//     var numero;
//     for(var i = 0; i < 3; i++){
//         numero = Math.floor(Math.random() * 256);
//         numero = numero.toString;
//         if(i == 2){
//             cor += ")"
//         } else{
//             cor += numero
//         }
//     }
//     return cor;
// }



const herbivoro1 = new Herbivoro(100, 200, 7, 15, 6, 20, 3, corAleatoria(), 8, 13, 18, 1, 9, 0.5);
const carnivoro1 = new Carnivoro(200,200,5,2,6,5,3,corAleatoria(),3,4,1,2,2,4);
const alimento1 = new Alimento(100,100,4);

console.log("\n\n------------ Herbívoro -------------\n\n");
console.log(herbivoro1);

// testando criação de filho

// var clone_herbivoro = herbivoro1.reproduzir();
// console.log(clone_herbivoro);

var clone_herbivoro = herbivoro1.reproduzir();
console.log("\n\n------------ Clone do herbívoro -------------\n\n");
console.log(clone_herbivoro);


var clone_carnivoro = carnivoro1.reproduzir();
console.log("\n\n------------ Clone do carnívoro -------------\n\n");
console.log(clone_carnivoro)


// // testando criação de filhos dos filhos
// var clone_do_clone = clone_herbivoro.reproduzir();
// console.log(clone_do_clone);





