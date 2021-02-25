// criando a classe de vetores
export class Vetor {
    constructor (x, y) {
      this.x = isNaN(x) ? 0 : x
      this.y = isNaN(y) ? 0 : y
    }
  
    add (v) {
      this.x += isNaN(v) ? v.x : v
      this.y += isNaN(v) ? v.y : v
      return this
    }
  
    sub (v) {
      this.x -= isNaN(v) ? v.x : v
      this.y -= isNaN(v) ? v.y : v
      return this
    }
  
    mul (v) {
      this.x *= isNaN(v) ? v.x : v
      this.y *= isNaN(v) ? v.y : v
      return this
    }
  
    div (v) {
      this.x /= isNaN(v) ? v.x : v
      this.y /= isNaN(v) ? v.y : v
      return this
    }
  
    // retorna um vetor novo e igual
    clone () {
      return new Vector(this.x, this.y)
    }
  
    // calcula a distância entre dois pontos definidos como um vetor
    dist (v) {
      let dx = this.x - v.x
      let dy = this.y - v.y
      return Math.sqrt(dx * dx + dy * dy)
    }

    // retorna a magnitude do vetor ao quadrado
    magSq () {
        var x = this.x, y = this.y;
        return x * x + y * y;
    };

    // limita a magnitude do vetor para o tamanho especificado
    limit (l) {
        var mSq = this.magSq();
        if(mSq > l*l) {
            this.div(Math.sqrt(mSq));
            this.mul(l);
        }
        return this;
    };
  
    // limita os valores mín e máx do vetor para se encaixarem dentro dos valores passados
    clamp (min, max) {
      this.x = Math.min(Math.max(this.x, min), max)
      this.y = Math.min(Math.max(this.y, min), max)
      return this
    }
  
    // transforma o vetor para que sua magnitude seja 1 (usado para multiplicação de vetores)
    normalise () {
      let mag = Math.sqrt(this.x * this.x + this.y * this.y)
      this.x = mag === 0 ? 0 : this.x / mag
      this.y = mag === 0 ? 0 : this.y / mag
      return this
    }
}