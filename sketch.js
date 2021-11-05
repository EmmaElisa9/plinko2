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
  for (var r = 50; r <=height-300; r=r+70) 
  {
    for (var j = 20; j <=width-5; j=j+40) 
    {
    plinkos.push(new Plinko(j,r));
    }
  }
    
}

function scoreSuma(){
  if(ball!=null){ 
    ball.display();
    if (ball.body.position.y>760)
    {
      if (ball.body.position.x < 245 && ball.body.position.x > 5) 
      {
        score=score+100;      
        ball=null;
          if ( count>= 5) {
              gameState ="end";
          }                         
      }


      else if (ball.body.position.x < 490 && ball.body.position.x > 245 ) 
      {
        score = score + 400;
        ball=null;
        if ( count>= 5) {
                gameState ="end";
        }

      }
        else if (ball.body.position.x < 575 && ball.body.position.x > 490 )
        {
          score = score + 500;
          ball=null;
          if ( count>= 5) {
            gameState ="end";
          }

        }
        
        else if (ball.body.position.x < 815 && ball.body.position.x > 575 )
        {
          score = score + 300;
          ball=null;
          if ( count>= 5) {
            gameState ="end";
          }

        }
    }
  }
}

function mousePressed(){
  if(gameState === "inicio"){
    ball=new Ball(mouseX, 10, 10, 10);
    count++;
  }  
}

function draw() {
  background(0);
  textSize(20);
 
  Engine.update(engine);
  ground.display();

  fill(255,20,200);
  text("100",25,600);
  text("100",105,600);
  text("100",185,600);      
  text("400",265,600);
  text("400",345,600);
  text("400",425,600);
  text("500",505,600);
  text("300",585,600);
  text("300",665,600);
  text("300",745,600);

  textSize(30);
  text("puntos:"+score,30,25);
  
  //muestra los plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //muestra las divisiones
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
  scoreSuma();

  if(gameState === "end"){
    textSize(100);
    text("¡fin del juego!",80,400);
  }
}
