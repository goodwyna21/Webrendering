class Renderer{
  constructor(_canvas,_scene=[],_bkgnd=[220,221,222],_cam=null,_theta=[0,0],_fov=Math.PI/2){
    this.scene = _scene;
    this.bkgnd = _bkgnd;
    if(_cam === null){
      _cam = new Vector(0,0,-200);
    }
    this.cam = _cam;
    this.theta = _theta;
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

  addObject(obj){
    this.scene.push(obj);
  }

  render(canvas){
    let ind = 0;
    let dv = new Vector(0,0,1);
    let dvu = new Vector(0,0,0);
    let v = new Vector(0,0,0);
    let collided = null;
    let c = [0,0,0];
    for(let py = 0; py < this.h; py++){
      dv.setY(1-2*(py/this.h));
      for(let px = 0; px < this.w; px++){
        dv.setX(-1+2*(px/this.w));
        dvu = Vector.normalize(dv);
        v.set(this.cam.x,this.cam.y,this.cam.z);

        let mind = TOLERANCE + 1;
        let cnt = 0;
        while(mind > TOLERANCE){
          cnt++;
          if(cnt > 100){
            break;
          }
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

          v.add(Vector.mult(dvu,mind));
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

let R = new Renderer(document.getElementById("renderCanvas"));
function main(){
  R.addObject(new Box(new Vector(0,0,0), new Vector(75,50,30), [Math.PI/3,Math.PI/7]));
  R.addObject(new Sphere(new Vector(0,0,0),50));
  R.addObject(new Sphere(new Vector(40,0,-20),25));
  R.addObject(new Sphere(new Vector(-60,0,60),50));
  R.render();
}
main();
