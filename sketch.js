var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //crea los objetos para dividir
  for (var k = 0; k<=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  
  //crea las filas de objetos plinko
  for (var r = 50; r <=height-350; r=r+80) 
  {
    for (var j = 50; j <=width-10; j=j+50) 
    {
    plinkos.push(new Plinko(j,r));
    }
  }

  //crea los objetos partícula
    for (var p = 50; p <=width-30; p=p+80) 
    {
    particles.push(new Particle(p,-10));
    }
    
}
 


function draw() {
  background("black");
  textSize(20)
 
  Engine.update(engine);
  ground.display();

  if(frameCount%20===0){
    particles.push(new Particle(random(30,800),10,10));
  }
  
  //muestra los plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //muestra las divisiones
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  //muestra las partículas 
  for (var d = 0; d < particles.length; d++) {
    particles[d].display();
  }
}
