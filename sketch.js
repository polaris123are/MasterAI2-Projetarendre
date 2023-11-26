let vehicle;
let vehicles=[];
let follow;
let value;
function setup() {
  createCanvas(800, 800);
  
  
 // Create multiple vehicles and add them to the array
 for (let i = 0; i <15; i++) {
  if(i==0){
    let v=new Vehicle(random(width), random(height),true);
    vehicles.push(v);
  }else{
    let v=new Vehicle(random(width), random(height),false);
    v.maxForce=3;
    vehicles.push(v);
  }
  
}
}

function draw() {
  // couleur pour effacer l'écran
  background(0);

  
  let target = createVector(mouseX, mouseY);

  fill(255, 255, 0);
  noStroke();
  ellipse(target.x, target.y, 32);
  
  for (let i = 0; i < vehicles.length; i++) {
    if(i==0){
  
    let steering = vehicles[i].arrive(target);
    vehicles[i].applyForce(steering);
    
    }else{
      if(value==1){
        let steering = vehicles[i].arrive(vehicles[i-1].pos);
        let separation=vehicles[i].separation(vehicles);
        separation.mult(0.2);
        
         vehicles[i].applyForce(separation);
        
         let v= vehicles[0].vel.copy();
           v.normalize();
           v.mult(-40);
           v.add(vehicles[0].pos);
           fill(255,255,0);
           circle(v.x,v.y,15);
           let s=vehicles[i].arrive(v);
           s.mult(0.6);
           vehicles[i].applyForce(s);
       }else if(value==2){
        let t=createVector(vehicles[i-1].pos.x, vehicles[i-1].pos.y);
       let v= vehicles[i-1].pos.copy();
        v.normalize();
        v.mult(-50);
        v.add(vehicles[i-1].pos);
        
        let s=vehicles[i].arrive(v);
        vehicles[i].applyForce(s);
       }else if(value==3){
        let alignment=vehicles[i].align(vehicles);
        alignment.mult(0.5);

         vehicles[i].applyForce(alignment);
        
         let v= vehicles[0].vel.copy();
           v.normalize();
           v.mult(-40);
           v.add(vehicles[0].pos);
           fill(255,255,0);
           circle(v.x,v.y,15);
           let s=vehicles[i].arrive(v);
           s.mult(0.6);
           vehicles[i].applyForce(s);
           
       }else if(value==4){
        let cohesion=vehicles[i].cohesion(vehicles);
        
         vehicles[i].applyForce(cohesion);
         cohesion.mult(1.5);
         let v= vehicles[0].vel.copy();
           v.normalize();
           v.mult(-40);
           v.add(vehicles[0].pos);
           fill(255,255,0);
           circle(v.x,v.y,15);
           let s=vehicles[i].arrive(v);
           s.mult(0.6);
           vehicles[i].applyForce(s);
           vehicles[i].edges();
       }
      }
     
    vehicles[i].update();
    vehicles[i].show();
  }

 
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    value = 1;
  } else if (keyCode === RIGHT_ARROW) {
    value = 2;
  }else if (keyCode === UP_ARROW) {
    value = 3;
  }else if (keyCode === DOWN_ARROW) {
    value = 4;
  }
}




