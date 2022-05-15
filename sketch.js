var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var score = 0;

function preload(){
  towerImg = loadImage("sky.jpeg");
  doorImg = loadImage("cage.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("bird.png");
  spookySound = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale = 2;

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.05;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  
  background(0);

  if(gameState === "play"){
    score = score + 1;
    if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x - 3;
  }

  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x + 3;
  }

  if(keyDown("SPACE")){
    ghost.velocityY = -10;
    spookySound.play();
  }

  ghost.velocityY = ghost.velocityY + 0.8;

  spawnDoors();

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }

  drawSprites();
  }

  stroke("black");
    fill("red");
    textSize(30);
  text("Score: "+score,30,50)

  if(gameState === "end"){
    stroke("black");
    fill("red");
    textSize(30);
    text("Game Over!",200,300);
    text("Reload to start again.",150,350);
    
  }

}

function spawnDoors(){
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);

    invisibleBlock.width = climber.width;
    invisibleBlock.height = 1;

    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth += 1;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);


  }
}