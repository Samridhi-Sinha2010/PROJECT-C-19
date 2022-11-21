var bg,bgimg;
var coin,coinimg,coinGroup;
var cryingboy,cryingimg;
var dangerbox,dangerimg,dangerBoxGroup;
var giftbox,giftimg,giftGroup;
var dangercoin,dangercoinimg,dangerCoinGroup;
var runningboy, runningimg;
var gameState = PLAY;
var PLAY = 1;
var END = 0;
var score;
var gameOver,gameimg;
var restart,restartimg;



function preload(){
  bgimg = loadImage("Images/bg.jpg");
  coinimg = loadImage("Images/coin.png");
  cryingimg = loadImage("Images/crying boy.png");
  dangerimg = loadImage("Images/danger box.png");
  dangercoinimg = loadImage("Images/danger coin.png");
  giftimg = loadImage("Images/gift box.png");
  runningimg = loadImage("Images/runningboy.png");
  gameimg = loadImage("Images/gameover.png");
  restartimg = loadImage("Images/restart.jpg");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
   
   bg = createSprite(200,200,windowWidth,windowHeight);
   bg.addImage("bg",bgimg);
   bg.x = bg.windowWidth;
   bg.velocityX = -(6+3*score/100);
 
 runningboy= createSprite(40,200);
  runningboy.addImage("runningboy",runningimg);
  runningboy.scale = 0.45;

  gameOver.sclae = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  dangerBoxGroup = new Group();
  coinGroup = new Group();
  dangerBoxGroup = new Group();
  dangerCoinGroup= new Group();

  score=0;
}

function draw() {
  background(200);
  
  Text("Score: "+score, 500,60);

  if(gameState===PLAY){
   
    if(keyDown("up")&& runningboy.y >=200){
      runningboy.velocityY = -10;
    }

    runningboy.velocityY = runningboy.velocityY + 0.5;

    if( bg.x < 0){
      bg.x= bg.width/2;
    }

    runningboy.collide(bg);
    spawnCoin();
    spawnDangerCoin();
    spawnGiftBox();
    spawnDangerBox();

    if(coinGroup.isTouching(runningboy)){
      score = score+5;
    }

    if(giftGroup.isTouching(runningboy)){
      score = score+50;
    }

    if(dangerBoxGroup.isTouching(runningboy)){
      gameState = END;
    }
    
    if(dangerCoinGroup.isTouching(runningboy)){
       score= score-5;
    }

  }
  else if (gameState === END){
    gameOver.visible= true;
    restart.visible = true;
    bg.velocityX= 0;
    runningboy.velocityY= 0;
    dangerBoxGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    dangerCoinGroup.setVelocityXEach(0);
    giftGroup.setVelocityXEach(0);

    runningboy.changeImage("crying",cryingboy);
    dangerBoxGroup.setlifetimeEach(-1);
    coinGroup.setlifetimeEach(-1);
    dangerCoinGroup.setlifetimeEach(-1);
    giftGroup.setlifetimeEach(-1);

    if(mousePressedOver(restart)){
      restart();
    }

  }
 
 drawSprites()
}

function spawnCoin(){
 //to spawn coin
  
 if(frameCount%70 === 0){
    var coin = createSprite(60,200,10,10);
    coin.y = Math.round(random(1,20));
    coin.addImage(coinimg);
    coin.scale = 0.45;
    coin.velocityX = -3;

    coin.lifetime = 200;

    coinGroup.add(coin);
  }
  }

  function spawnDangerCoin(){
    //to spawn danger coin

    if(frameCount%80 === 0){
      var dangercoin = createSprite(100,200,10,10);
      dangercoin.y = Math.round(random(1,20));
      dangercoin.addImage(dangercoinimg);
      dangercoin.scale = 0.45;
      dangercoin.velocityX = -3;
  
      dangercoin.lifetime = 200;
  
      dangerCoinGroup.add(dangercoin);
    }
    }

    function spawnGiftBox(){
      // to spawn gift box

      if(frameCount%200 === 0){
        var giftbox  = createSprite(100,200,10,10);
        giftbox.y = Math.round(random(1,20));
        giftbox.addImage(dangercoinimg);
        giftbox.scale = 0.45;
        giftbox.velocityX = -3;
    
        giftbox.lifetime = 200;
    
        giftGroup.add(giftbox);
      }
      }
    
  function spawnDangerBox(){
   //to spawn danger box

    if(frameCount%180 === 0){
     var dangerbox = createSprite(100,200,10,10);
     dangerbox.y = Math.round(random(1,20));
     dangerbox.addImage(dangercoinimg);
     dangerbox.scale = 0.45;
     dangerbox.velocityX = -3;
     dangerbox.lifetime = 200;
     dangerBoxGroup.add(dangerbox);
  }
 }

 function restart(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
 
  coinGroup.destroyEach();
  dangerCoinGroup.destroyEach();
  dangerBoxGroup.destroyEach();
  giftGroup.destroyEach()
  
  
  runningboy.changeAnimation("running",runningboy);
 
 
 
  score = 0;
 
}

    