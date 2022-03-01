var PLAY = 1;
var END = 0;  

var gameState = PLAY;

var player;
var ground, invisibleGround, groundImage;

var coinsGroup, coinImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;

var score = 0;
var gameOver,restart;


function preload(){
  playerImage = loadImage("images/player.png");
  
  coinImage = loadImage("images/coin.png");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  
  gameOverImg = loadImage("images/gameOver.png");
  restartImg  = loadImage("images/restart.png");
  
}

function setup() {
  createCanvas(1000, 300);
  
  player = createSprite(50,180,20,50);
  player.scale = 0.16;
  player.addImage("player",playerImage)
  
  ground = createSprite(0,180,20000,20);
  ground.x = 900;
  ground.velocityX =  -(6+3*score/100);
  
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false ;
  
  restart=createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5 ; 
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,5000,10);
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, player.x + 400,50);

  camera.y = player.y;
  camera.x = player.x + 200;
  console.log(player.x , player.y );
  
  
  if (gameState === PLAY){
    
    if (coinsGroup.isTouching(player)){
        score = score + 2 ;
        coinsGroup.destroyEach();
    }
   
  ground.velocityX= -(6+3*score/100)
  if(keyDown("space")&& player.y>=157) {
    player.velocityY = -16;
  }
  
  player.velocityY = player.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = 100;
  }
  
  player.collide(invisibleGround);
  spawncoins();
  spawnObstacles();
   
    if (obstaclesGroup.isTouching(player) ) {
    gameState = END;
    }
    
  }
  else if(gameState===END){
    
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    if (mousePressedOver(restart)){
        reset();
        }
          
  }
  
  drawSprites();
}


function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  
  
  score = 0;
  
  
}



function spawncoins() {
  //write code here to spawn the coins
  if (frameCount % 60 === 0) {
    var coin = createSprite(600,120,40,10);
    coin.y = Math.round(random(40,player.y));
    coin.addImage(coinImage);
    coin.scale = 0.6;
    coin.velocityX =  -(5+3*score/100);
    
     //assign lifetime to the variable
    coin.lifetime = 500;
    
    //adjust the depth
    coin.depth = player.depth;
    player.depth = player.depth + 1;
    
   
    //add each coin to the group
    coinsGroup.add(coin);

    
  }
  
}
 
function spawnObstacles() {
  if(frameCount % 65 === 0) {
    var obstacle = createSprite(player.x + 600, player.y ,10,40);
    obstacle.velocityX =  -(6+2*score/100);
     
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}