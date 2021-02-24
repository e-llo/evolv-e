import {Organismo} from "./Organismo.js";
import {Herbivoro} from "./Herbivoro.js";
import {Carnivoro} from "./Carnivoro.js";

const herbivoro1 = new Herbivoro(1,2,"rosa",3,4,2);
const carnivoro1 = new Carnivoro(5,2,"verde",3,4,2);

console.log(herbivoro1);
console.log(carnivoro1);
console.log(herbivoro1.hello());
console.log(carnivoro1.hello());

