var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var balls = [];
var particles = [];
var plinkos = [];
var divisions =[];
var ball;

var divisionHeight=300;
var score =0;
var count = 0;
var gameState = "inicio";

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
    
}

function scoreSuma(){
  if (ball.body.position.y>760)
  {
        if (ball.body.position.x < 300) 
        {
            score=score+500;      
            ball=null;
            if ( count>= 5) {
              gameState ="end";
            }                          
        }


        else if (ball.body.position.x < 600 && ball.body.position.x > 301 ) 
        {
              score = score + 100;
              ball=null;
              if ( count>= 5) {
                gameState ="end";
              }

        }
        else if (ball.body.position.x < 900 && ball.body.position.x > 601 )
        {
              score = score + 200;
              ball=null;
              if ( count>= 5) {
                gameState ="end";
              }

        }      
        
  }
}

function mousePressed(){
  //if(gameState === "inicio"){
    ball=new Ball(mouseX, 10, 10, 10); 
  //}  
}

function draw() {
  background("black");
  textSize(20);
 
  Engine.update(engine);
  ground.display();

  text("100",25,600);
  text("100",105,600);
  text("200",185,600);      
  text("100",265,600);
  text("100",345,600);
  text("300",425,600);
  text("400",505,600);
  text("200",585,600);
  text("200",665,600);
  text("100",745,600);

  textSize(30);
  text("puntos:"+score,30,25);


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
  console.log(ball.body.position.y);
  scoreSuma();
}
