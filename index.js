import {Organismo} from "./Organismo.js";
import {Herbivoro} from "./Herbivoro.js";
import {Carnivoro} from "./Carnivoro.js";
import {Alimento} from "./Alimento.js";

const herbivoro1 = new Herbivoro(1,2,"rosa",3,4,2);
const carnivoro1 = new Carnivoro(5,2,"verde",3,4,2);
const alimento1 = new Alimento(100, 100, 4);

console.log(herbivoro1);
console.log(carnivoro1);
console.log(herbivoro1.hello());
console.log(carnivoro1.hello());
console.log(alimento1)
console.log("Quantidade de energia: " + alimento1.qtd_energia)

