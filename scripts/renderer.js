class Renderer{
  constructor(_canvas,_scene=[],_bkgnd=[220,221,222],_cam=null,_rotation=[0,0],_fov=Math.PI/4){
    this.scene = _scene;
    this.bkgnd = _bkgnd;
    if(_cam === null){
      _cam = new Vector(0,0,-300);
    }
    this.cam = _cam;
    this.setCamera(_rotation[0],_rotation[1]);
    this.fov = _fov;

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext("2d");
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.img = this.ctx.createImageData(this.w,this.h);
    for(let i = 0; i < this.w*this.h; i++){
      this.img.data[4*i+3] = 255;

    }
  }

  setCamera(theta,phi,p=null){
    if(p!=null){
      this.cam = p.copy();
    }
    this.cam = Vector.fromAngles(theta,phi,-300);
    this.rotation = [theta,phi];
  }

  addObject(obj){
    this.scene.push(obj);
  }

  render(canvas){
    let ind = 0;
    let dv = new Vector();
    let v = new Vector();
    let collided = null;
    let c = [0,0,0];

    for(let py = 0; py < this.h; py++){

      //dv.setY(1-2*(py/this.h));
      for(let px = 0; px < this.w; px++){
        //dv.setX(-1+2*(px/this.w));

        v = this.cam.copy();
        dv = Vector.fromAngles(this.rotation[0] + this.fov*px/this.w - this.fov/2,
                               this.rotation[1] + this.fov*py/this.h - this.fov/2);

        if(px == Math.floor(this.h/2) && py == Math.floor(this.w/2)){
            console.log(px,py,v,dv);
        }

        let mind = TOLERANCE + 1;
        while(mind > TOLERANCE){
          if(v.getMagSq() > SKYBOXSQ){
            collided = null;
            break;
          }

          mind = SKYBOX;
          for(let i = 0; i < this.scene.length; i++){
            let d = this.scene[i].distance(v);
            if(mind > d){
              mind = d;
              collided = i;
            }
          }

          v.add(Vector.mult(dv,mind));
        }

        if(collided === null){
          c[0] = this.bkgnd[0];
          c[1] = this.bkgnd[1];
          c[2] = this.bkgnd[2];
        } else {
          c[0] = this.scene[collided].c[0];
          c[1] = this.scene[collided].c[1];
          c[2] = this.scene[collided].c[2];
        }

        this.img.data[ind++] = c[0];
        this.img.data[ind++] = c[1];
        this.img.data[ind++] = c[2];
        ind++;
      }
    }
    this.ctx.putImageData(this.img,0,0);
  }
}
