class Vector{
  static add(a,b){
    return new Vector(a.x+b.x,a.y+b.y,a.z+b.z);
  }

  static sub(a,b){
    return new Vector(a.x-b.x,a.y-b.y,a.z+b.z);
  }

  static mult(v,n){
    return new Vector(v.x*n, v.y*n, v.z*n);
  }

  static abs(v){
    return new Vector(Math.abs(v.x),Math.abs(v.y),Math.abs(v.z));
  }

  static dist(a,b){
    return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2);
  }

  static distSq(a,b){
    return (a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2;
  }

  static normalize(v){
    let m = v.getMag();
    return new Vector(v.x/m,v.y/m,v.z/m);
  }

  constructor(_x,_y,_z=0){
    this.x = _x;
    this.y = _y;
    this.z = _z;

    this.mag = null;
    this.magSq = null;
    this.heading = null;
  }

  copy(){
    return new Vector(this.x,this.y,this.z);
  }

  setX(x){
    this.x = x;
    this.mag = null;
    this.magSq = null;
    this.heading = null;
  }

  setY(y){
    this.y = y;
    this.mag = null;
    this.magSq = null;
    this.heading = null;
  }

  setZ(z){
    this.z = z;
    this.mag = null;
    this.magSq = null;
    this.heading = null;
  }

  set(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.mag = null;
    this.magSq = null;
    this.heading = null;
  }

  add(x,y=null,z=0){
    if(y===null){
      if(x.x===undefined){
        throw("Invalid parameters to vector.add, must be a vector or two floats");
      }
      this.x += x.x;
      this.y += x.y;
      this.z += x.z;
    } else {
      this.x += x;
      this.y += y;
      this.z += z;
    }
    this.mag = null;
    this.magSq = null;
    this.heading = null;
    return this;
  }

  sub(x,y=null,z=0){
    if(y===null){
      if(x.x===undefined){
        throw("Invalid parameters to vector.sub, must be a vector or two floats");
      }
      this.x -= x.x;
      this.y -= x.y;
      this.z -= x.z;
    } else {
      this.x -= x;
      this.y -= y;
      this.z -= z;
    }
    this.mag = null;
    this.magSq = null;
    this.heading = null;
    return this;
  }

  div(n){
    this.x /= n;
    this.y /= n;
    this.z /= n;
    this.mag = null;
    this.magSq = null;
    return this;
  }

  mult(n){
    this.x *= n;
    this.y *= n;
    this.z *= n;
    this.mag = null;
    this.magSq = null;
    return this;
  }

  getMagSq(){
    if(this.magSq!==null){
      return this.magSq;
    }
    this.magSq = this.x*this.x + this.y*this.y + this.z*this.z;
    return this.magSq;
  }

  getMag(){
    if(this.mag!==null){
      return this.mag;
    }
    this.mag = Math.sqrt(this.getMagSq());
    return this.mag;
  }

  getHeadings(){
    if(this.heading!==null){
      return this.heading;
    }
  }

  rotate(theta,phi){
    let x1 = this.x*Math.cos(theta) + this.z*Math.sin(theta);
    let z1 = -this.x*Math.sin(theta) + this.z*Math.cos(theta);
    this.x = x1;
    this.z = z1;

    x1 = this.x*Math.cos(phi) - this.y*Math.sin(phi);
    let y1 = this.x*Math.sin(phi) + this.y*Math.cos(phi);
    this.x = x1;
    this.y = y1;
  }

  dist(v){
    return Vector.dist(this,v);
  }

  normalize(){
    let m = 1.0/this.getMag();
    this.mult(m);
  }
}

//export {Vector};
