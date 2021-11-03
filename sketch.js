var wizard, wizR, wizL, wizard_right, wizard_left, wiz_attackR, wiz_attackL, facing;
var platforms, p1, p2, p3;
var invplatforms, invp1, invp2;
var lava;
var bg, backgroundImg;
var gameState, startButton, startBtnImg;
var portal, portalImg;
var monster, monsterLImg, monsterRImg, alive, fire, fireImg, fires;
var ruby, rubyImg;

function preload(){
  wizR = loadImage("wizR.png");
  wizL = loadImage("wizL.png");
  wizard_right = loadAnimation("wizRight1.png", "wizRight2.png", "wizRight3.png", "wizRight4.png", "wizRight5.png", "wizRight6.png", "wizRight7.png", "wizRight8.png");
  wizard_left = loadAnimation("wizLeft0.png", "wizLeft1.png", "wizLeft2.png", "wizLeft3.png", "wizLeft4.png", "wizLeft5.png", "wizLeft6.png", "wizLeft7.png");
  wiz_attackR = loadImage("wiz_attackR.png");
  wiz_attackL = loadImage("wiz_attackL.png");

  backgroundImg = loadImage("dungeon.png");
  startBtnImg = loadImage("startButton.png");

  portalImg = loadImage("portal.png");

  fireImg = loadImage("fire.png");
  monsterLImg = loadAnimation("monster0.png", "monster1.png","monster2.png","monster3.png","monster4.png","monster5.png","monster6.png");
  monsterRImg = loadAnimation("monsterR_0.png", "monsterR_1.png","monsterR_2.png","monsterR_3.png","monsterR_4.png","monsterR_5.png","monsterR_6.png");

  rubyImg = loadImage("ruby.png");
}

function setup() {
  createCanvas(800, 400);

  //create game state
  gameState = "start";


  //create background
  bg = createSprite(400, 200, 800, 400);
  bg.addImage("dungeon", backgroundImg);
  bg.scale = 2.6;

  //create a start button
  startButton = createSprite(400, 225);
  startButton.addImage("start", startBtnImg);
  startButton.scale = 1.5;
  
  //create wizard sprite
  wizard = createSprite(100, 300);
  wizard.addImage("idleR", wizR);
  wizard.addImage("idleL", wizL);
  wizard.addImage("attackR", wiz_attackR);
  wizard.addImage("attackL", wiz_attackL);
  wizard.addAnimation("runRight", wizard_right);
  wizard.addAnimation("runLeft", wizard_left);
  wizard.setDefaultCollider();
  wizard.scale = 0.75;
  wizard.visible = false;
  facing = "right";

  // create platforms
  platforms = createGroup();

  p1 = createSprite(100, 390, 200, 20);
  p1.shapeColor = "#380819";
  p1.visible = false;
  platforms.add(p1);

  p2 = createSprite(700, 225, 75, 20);
  p2.shapeColor = "#380819";
  p2.visible = false;
  platforms.add(p2);

  p3 = createSprite(200, 300, 100, 20);
  p3.shapeColor = "#380819";
  p3.visible = false;
  platforms.add(p3);

  p4 = createSprite(275, 75, 50, 20);
  p4.shapeColor = "#380819";
  p4.visible = false;
  platforms.add(p4);

  p5 = createSprite(75, 150, 75, 20);
  p5.shapeColor = "#380819";
  p5.visible = false;
  platforms.add(p5);

  p6 = createSprite(450, 175, 75, 20);
  p6.shapeColor = "#380819";
  p6.visible = false;
  platforms.add(p6);

  p7 = createSprite(775, 75, 75, 20);
  p7.shapeColor = "#380819";
  p7.visible = false;
  platforms.add(p7);

  //create invisible platforms
  invplatforms = createGroup();
  
  invp1 = createSprite(200, 200, 100, 20);
  invp1.visible = false;
  invplatforms.add(invp1);
  invp2 = createSprite(200, 330, 100, 20);
  invp2.visible = false;
  invplatforms.add(invp2);
  invp3 = createSprite(125, 150, 10, 20);
  invp3.visible = false;
  invplatforms.add(invp3);
  invp4 = createSprite(700, 50, 75, 20);
  invp4.visible = false;
  invplatforms.add(invp4);
  invp5 = createSprite(700, 250, 75, 20);
  invp5.visible = false;
  invplatforms.add(invp5);
  invp6 = createSprite(350, 175, 10, 20);
  invp6.visible = false;
  invplatforms.add(invp6);
  invp7 = createSprite(525, 175, 10, 20);
  invp7.visible = false;
  invplatforms.add(invp7);

  //create lava
  lava = createSprite(500, 395, 600, 10);
  lava.shapeColor = "#fa7305";
  lava.visible = false;

  //create portal
  portal = createSprite(775, 40);
  portal.addImage("image", portalImg);
  portal.scale = 0.2;
  portal.visible = false;

  //create monster
  monster = createSprite(500, 180, 40, 40);
  monster.addAnimation("flyingL", monsterLImg);
  monster.addAnimation("flyingR", monsterRImg);
  monster.scale = 1.5;
  monster.visible = false;
  monster.setCollider("circle", 0, 0, 10);
  alive = true;

  //create ruby
  ruby = createSprite(700, 350);
  ruby.addImage(rubyImg);
  ruby.scale = 0.25;
  ruby.visible = false;

  //create groups
  fires = createGroup();
}

function draw() {
  background(100, 0, 255);
  drawSprites();

  if(gameState=="start"){
    textSize(75);
    textFont("Georgia");
    fill("orange");
    text("Magical Mayhem", 100, 100);
    textSize(20);
    text("The red ruby has been stolen and an evil wizard named Zullio, who has plotted to steal all the magic from Wiztopia with it. You must retrieve it before all hope is lost.", 250, 275, 300, 300);
  }else if(gameState=="lvl1"){
    //make level 1 components visible
    p2.visible = true;
    p3.visible = true;
    p4.visible = true;
    p5.visible = true;
    p6.visible = true;
    p7.visible = true;
    lava.visible = true;

    if(keyDown("RIGHT_ARROW")){
      wizard.changeAnimation("runRight", wizard_right);
      wizard.x += 5;
      facing = "right";
    }else if(keyDown("LEFT_ARROW")){
      wizard.changeAnimation("runLeft", wizard_left);
      wizard.x -= 5;
      facing = "left";
    }else {
      if(facing=="right"){
        wizard.changeAnimation("idleR", wizR);
      }else if(facing=="left"){
        wizard.changeAnimation("idleL", wizL);
      }
      
    }

    if(keyDown("UP_ARROW") && ((p1.y - wizard.y<45 && wizard.x>p1.x-110 && wizard.x<p1.x+110) || (p3.y - wizard.y<45 && wizard.x>p3.x-60 && wizard.x<p3.x+60) || (p5.y - wizard.y<45 && wizard.x>p5.x-p5.width/2 && wizard.x<p5.x+p5.width/2) || (p6.y - wizard.y<50 && wizard.x>p6.x-47 && wizard.x<p6.x+47) || (p2.y - wizard.y<45 && wizard.x>p2.x-45 && wizard.x<p2.x+45) || (p4.y - wizard.y<45 && wizard.x>p4.x-30 && wizard.x<p4.x+30))){
      wizard.velocityY = -10;
    }
    
    wizard.velocityY += 0.5;

    if(wizard.isTouching(lava)){
      wizard.x = 100;
      wizard.y = 350;
    }
    
    p2.bounceOff(invplatforms);
    p3.bounceOff(invplatforms);
    p4.bounceOff(invplatforms);
    p5.bounceOff(edges);
    p5.bounceOff(invplatforms);
    p6.bounceOff(invplatforms);

    if(wizard.isTouching(portal)){
      gameState = "lvl2";
      wizard.x = 100;
      wizard.y = 300;
      p2.width = 100;
      p2.x = 600;
      p2.y = 225;
      p3.y = 300;
      invp4.x = 600;
      invp4.y = 80;
      invp5.x = 600;
      invp5.y = 270;
      invp1.y = 230;
      invp2.y = 410;
      p4.y = 250;
      p4.x = 400;
      p4.width = 300;
      p5.y = 100;
      p5.x = 400;
      p5.width = 300;
      p6.destroy();
      lava.destroy();
      p1.width = 800;
      p1.x = 400;
      p7.x = 75;
      portal.x = 75;
    }
  }else if(gameState=="lvl2"){
    p3.bounceOff(invplatforms);
    p2.bounceOff(invplatforms);

    if(frameCount%40==0 && alive && wizard.y-monster.y<40){
      shootFire();
    }

    console.log(wizard.y);
    console.log(monster.y);
    
    monster.visible = true;

    if(keyDown("RIGHT_ARROW")){
      facing = "right";
      wizard.changeAnimation("runRight", wizard_right);
      wizard.x += 5;
      wizard.setDefaultCollider();

      if(wizard.isTouching(fires)){
        wizard.x = 100;
        wizard.y = 300;
      }
    }else if(keyDown("LEFT_ARROW")){
      facing = "left";
      wizard.changeAnimation("runLeft", wizard_left);
      wizard.x -= 5;
      wizard.setDefaultCollider();

      if(wizard.isTouching(fires)){
        wizard.x = 100;
        wizard.y = 300;
      }
    }else if(keyDown("space")){
      if(facing=="right"){
        wizard.changeAnimation("attackR", wiz_attackR);
        for(var i = 0; i < fires.length; i++){
          if(fires[i].isTouching(wizard)){
            if(monster.y==180){
              fires[i].rotation = -180;
              fires[i].velocityX = 10;
              console.log("bounce");
            }else if(monster.y==50){
              wizard.x = 100;
              wizard.y = 300;
            }
            
          }

        }  
      } else if(facing=="left"){
        wizard.changeAnimation("attackL", wiz_attackL);
        for(var i = 0; i < fires.length; i++){
          if(fires[i].isTouching(wizard)){
            if(monster.y==50){
              fires[i].velocityX = -10;
              fires[i].rotation = 0;
            }else if(monster.y==180){
              wizard.x = 100;
              wizard.y = 300;
            }
          }

        }  
      }

      wizard.setDefaultCollider();

        
    }else {
      if(facing=="right"){
        wizard.changeAnimation("idleR", wizR);
      }else if(facing=="left"){
        wizard.changeAnimation("idleL", wizL);
      }
      wizard.setDefaultCollider();
      
      if(wizard.isTouching(fires)){
        wizard.x = 100;
        wizard.y = 300;
      }
    }

    if(keyDown("UP_ARROW") && ((p1.y - wizard.y<45 && wizard.x>p1.x-p1.width/2 && wizard.x<p1.x+p1.width/2) || (p3.y - wizard.y<45 && wizard.x>p3.x-60 && wizard.x<p3.x+60) || (p5.y - wizard.y<45 && wizard.x>p5.x-p5.width/2 && wizard.x<p5.x+p5.width/2) || (p2.y - wizard.y<45 && wizard.x>p2.x-p2.width/2 && wizard.x<p2.x+p2.width/2) || (p4.y - wizard.y<45 && wizard.x>p4.x-p4.width/2 && wizard.x<p4.x+p4.width/2))){
      wizard.velocityY = -10;
      wizard.setDefaultCollider();

      if(wizard.isTouching(fires)){
        wizard.x = 100;
        wizard.y = 300;
      }
    }
    
    wizard.velocityY += 0.5;

    

    for(var i = 0; i < fires.length; i++){
      if(fires[i].isTouching(monster)){

        if(monster.y==180){
          monster.x = 275;
          monster.y = 50;
          monster.changeAnimation("flyingR", monsterRImg);
          fires[i].destroy();
        }else if(monster.y==50){
          monster.destroy();
          alive = false;
          fires[i].destroy();
        }
        
      }
    } 

    if(wizard.y>400){
      wizard.x = 100;
      wizard.y = 300;
    }

    if(wizard.isTouching(portal)){
      ruby.visible = true;
      p2.destroy();
      p3.destroy();
      p4.destroy();
      p5.destroy();
      p7.destroy();
      wizard.x = 100;
      wizard.y = 300;
      portal.destroy();
      gameState = "ending";
    }
    
  }else if(gameState=="ending"){
    if(keyDown("RIGHT_ARROW")){
      wizard.changeAnimation("runRight", wizard_right);
      wizard.x += 5;
    }else if(keyDown("LEFT_ARROW")){
      wizard.changeAnimation("runLeft", wizard_left);
      wizard.x -= 5;
    }else {
      if(facing=="right"){
        wizard.changeAnimation("idleR", wizR);
      }else if(facing=="left"){
        wizard.changeAnimation("idleL", wizL);
      }
    }

    if(keyDown("UP_ARROW") && p1.y - wizard.y<45 && wizard.x>p1.x-p1.width/2 && wizard.x<p1.x+p1.width/2){
      wizard.velocityY = -10;
    }
    
    wizard.velocityY += 0.5;

    if(wizard.isTouching(ruby)){
      ruby.destroy();
      wizard.destroy();
      p1.destroy();
      gameState = "end";
    }
  }else if(gameState=="end"){
    textSize(40);
    fill("orange");
    text("Congratulations on finding the red ruby and saving the land of Wiztopia!", 100, 100, 700, 300);
  }



  edges = createEdgeSprites();

  wizard.collide(platforms);
  wizard.velocityX = 0;

  console.log(gameState);
}

function shootFire(){
  fire = createSprite(monster.x, monster.y, 10, 10);
  fire.addImage(fireImg);
  if(monster.y==180){
    fire.velocityX = -10;
    fire.x = monster.x - 30;
  }else if(monster.y==50){
    fire.velocityX = 10;
    fire.x = monster.x + 30;
    fire.rotation = -180
  }
  fire.scale = 0.1;
  fires.add(fire);
} 

function mouseClicked() {
  console.log("pressed"); 
  if (Math.abs(mouseX - startButton.x) < startButton.width && Math.abs(mouseY - startButton.y) < startButton.height && gameState=="start"){
    gameState = "lvl1"; 
    p2.velocityY = -3; 
    p3.velocityY = 3; 
    p6.velocityX = 3; 
    wizard.visible = true; 
    portal.visible = true; 
    p1.visible = true; 
    startButton.destroy(); 
  }
}
