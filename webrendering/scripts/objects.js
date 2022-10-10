class RenderObject{
  constructor(_p,_rot=null,_c=null){
    this.p = _p;
    if(_rot===null){
      _rot = [0,0];
    }
    this.rot = _rot;
    if(_c===null){
      _c = [Math.floor(255*Math.random()),Math.floor(255*Math.random()),Math.floor(255*Math.random())];
    }
    this.c = _c;
  }
};

class Sphere extends RenderObject{
  constructor(_p,_r,_c=null){
    super(_p,null,_c);
    this.r = _r;
  }

  distance(v){
    return this.p.dist(v) - this.r;
  }
};

class Box extends RenderObject{
  constructor(_p,_bounds,_rot=null,_c=null){
    super(_p,_rot,_c);
    this.b = _bounds;
  }

  distance(v){
    let a = Vector.sub(v,this.p);
    a.rotate(this.rot[0],this.rot[1]);
    let q = Vector.abs(a).sub(this.b);
    let d = Math.sqrt((Math.max(q.x,0)**2)+(Math.max(q.y,0)**2)+(Math.max(q.z,0)**2));
    return d + Math.min(Math.max(q.x,Math.max(q.y,q.z)),0.0);
  }
};
