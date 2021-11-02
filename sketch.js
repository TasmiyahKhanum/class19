var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale=0.5;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background("black");

  if(gameState==="play"){

    if(tower.y > 400){
      tower.y = 300
  } 

  if(keyDown("SPACE")){
    ghost.velocityY=-5;
  }
  ghost.velocityY+=0.8;
  if(keyDown("LEFT_ARROW")){
    ghost.x-=5;
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x+=5;
  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  createdoors();
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
   ghost.destroy();
   gameState="end";
  }
  drawSprites();
}
  if(gameState=="end"){
   stroke("teal");
   strokeWeight(3);
   fill("yellow");
   textSize(30);
   text("Game Over",230,250);
  }
}

function createdoors(){
  if(frameCount%240===0){
    door = createSprite(Math.round(random(120,400)),-50);
    door.addImage(doorImg);
    door.velocityY=1;
    door.lifetime=800;
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.x=door.x;
    climber.addImage(climberImg);
    climber.velocityY=1;
    climber.lifetime=800;
    climbersGroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth+=1;

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

