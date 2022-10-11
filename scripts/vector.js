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

  static fromAngles(theta,phi,r=1){
    return (new Vector(0,0,r)).rotate(theta,phi);
  }

  static distSq(a,b){
    return (a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2;
  }

  static normalize(v){
    let m = v.getMag();
    return new Vector(v.x/m,v.y/m,v.z/m);
  }

  constructor(_x=0,_y=0,_z=0){
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
/*
There's two errors here!
-> stuff gets distorted when you rotate about the x axis
-> some angles just dont fucking work for some reason
*/
    let ct = Math.cos(theta);
    let st = Math.sin(theta);
    let cp = Math.cos(phi);
    let sp = Math.sin(phi);

    let rx = [this.x,this.y*cp-this.z*sp,this.y*sp+this.z*cp];
    let ry = [rx[0]*ct+rx[2]*st,rx[1],rx[2]*ct-rx[0]*st];
    this.x = ry[0];
    this.y = ry[1];
    this.z = ry[2];

    /*
    let m = [[ct,0,-st],[st*sp,cp,ct*sp],[st*cp,-sp,ct*cp]];
    let newx = m[0][0]*this.x + m[1][0]*this.y + m[2][0]*this.z;
    let newy = m[0][1]*this.x + m[1][1]*this.y + m[2][1]*this.z;
    let newz = m[0][2]*this.x + m[1][2]*this.y + m[2][2]*this.z;
    this.x = newx;
    this.y = newy;
    this.z = newz;
    */
    this.heading = null;
    return this;
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
