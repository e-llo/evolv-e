class Vetor{                         
    constructor(x, y){
      this.x = x;                               
      this.y = y;
    }
    
    set(x,y) {
        this.x = x;                            
        this.y = y;
    };
    
    magSq() {               
        var x = this.x, y = this.y;
        return x * x + y * y;
    };

    mag(){                   
        return Math.sqrt(this.magSq());
    };

    add(x, y) {               
        if (x instanceof Vetor) {          
            this.x += x.x;                     
            this.y += x.y;
            return this;
        }
        this.x += x;
        this.y += y;
        return this;
    };

    sub(x, y) {                
        if (x instanceof Vetor) {
            this.x -= x.x;
            this.y -= x.y;
            return this;
        }
        this.x -= x;
        this.y -= y;
        return this;
    };

    subNew(v) {                
      var x = this.x - v.x;
      var y = this.y - v.y;
      return new Vetor(x, y);
  };

    div(n) {                 
        this.x /= n;                           
        this.y /= n;
        return this;
    };

    mul(n) {               
        this.x *= n;                      
        this.y *= n;
        return this;
    };

    normalize() {             
        return this.div(this.mag());        
    };

    setMag(n) {                
        return this.normalize().mul(n);      
    };

    dot(x, y) {                
        if (x instanceof Vetor) {          
            return this.dot(x.x, x.y);
        }
        return this.x * (x || 0) + 
               this.y * (y || 0);
    };

    dist(v) {                 
        var d = v.copy().sub(this);          
        return d.mag();
    };

    limit(l) {               
        var mSq = this.magSq();                 
        if(mSq > l*l) {                       
            this.div(Math.sqrt(mSq));
            this.mul(l);
        }
        return this;
    };

    headingRads() {           
        var h = Math.atan2(this.y, this.x);
        return h;
    };

    headingDegs() {          
        var r = Math.atan2(this.y, this.x);
        var h = (r * 180.0) / Math.PI;
        return h;
    };

    rotateRads(a) {          
        var newHead = this.headingRads() + a;   
        var mag = this.mag();
        this.x = Math.cos(newHead) * mag;
        this.y = Math.sin(newHead) * mag;
        return this;
    };

    rotateDegs(a) {     
        a = (a * Math.PI)/180.0;           
        var newHead = this.headingRads() + a;   
        var mag = this.mag();
        this.x = Math.cos(newHead) * mag;
        this.y = Math.sin(newHead) * mag;
        return this;
    };

    angleBetweenRads(x, y) {
        var v1 = this.copy(), v2;            
        if (x instanceof Vetor) {
            v2 = x.copy();
        } else {
            v2 = new Vetor(x,y);
        };
        var angle = Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
        return angle;
    };

    angleBetweenDegs(x,y) {  
        var r = this.angleBetweenRads(x,y);
        var d = (r * 180)/Math.PI;
        return d;
    }

    lerp(x, y, amt) {     
        if (x instanceof Vetor) {         
            return this.lerp(x.x, x.y, y);     
        }                                    
        if (amt > 1.0) {amt = 1.0};
        this.x += (x - this.x) * amt;
        this.y += (y - this.y) * amt;
        return this;
    };

    equals(x, y) {          
        var a, b;                    
        if (x instanceof Vetor) {       
            a = x.x || 0;
            b = x.y || 0;
        } else {
            a = x || 0;
            b = y || 0;
        }

        return this.x === a && this.y === b;
    };

    copy(){
        return new Vetor(this.x,this.y);   
    }                                        

}