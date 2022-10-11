let R = new Renderer(document.getElementById("renderCanvas"));


window.addEventListener('keydown',this.keydown,false);

function keydown(e){
    console.log(e.keyCode);
    if(e.keyCode == 65){ //a
        R.setCamera(R.rotation[0]-0.101,R.rotation[1]);
    }
    if(e.keyCode == 68){//d
        R.setCamera(R.rotation[0]+0.101,R.rotation[1]);
    }
    if(e.keyCode == 87){//w
        R.setCamera(R.rotation[0],R.rotation[1]-0.101);
    }
    if(e.keyCode == 83){//s
        R.setCamera(R.rotation[0],R.rotation[1]+0.101);
    }
    console.log(R.rotation[0],R.rotation[1]);
    R.render();
}

function main(){
  R.setCamera(0*Math.PI/8,0*Math.PI/8);
  R.addObject(new Box(new Vector(0,0,0), new Vector(75,50,30)));
  R.addObject(new Sphere(new Vector(0,0,0),50));
  R.addObject(new Sphere(new Vector(40,0,-20),25));
  R.addObject(new Sphere(new Vector(-60,0,30),40));
  R.render();
}
main();
