var ground;
var baby, parent;
var lane1, lane2, lane3;
var leftButton, rightButton;
var furnitureGroup, candyGroup;
var textImg;
var staticBaby, staticParent;

var gameState = "Ready";

var candyScore = 0;



var s, highScore = 0

var score = 0



var lives = 165;

function preload(){

  groundImg = loadImage("Images/FloorGame.jpg")

  babyImg = loadImage("Images/BabyGame.png")

  chairImg = loadImage("Images/ChairGame.png")

  candyImg = loadImage("Images/CandyGame.png")

  parentImg = loadImage("ParentGame.png")

  textImg = loadImage("Images/FloorText.jpg")

  staticParentImg = loadImage("ParentGame.png")
  
  staticBabyImg = loadImage("Images/BabyGame.png")

  failureSound = loadSound("Images/failure1.mp3")

  candySound = loadSound("Images/win1.mp3")

  checkPointSound = loadSound("Images/winpoint1.mp3")

  startSound = loadSound("Images/start2.mp3")

}

function setup(){
  createCanvas(windowWidth, windowHeight)
  
  ground = createSprite(windowWidth/2, windowHeight/2);
  ground.addImage(groundImg)
  ground.scale = 3.7
   
 startButton = createButton("Start")
  startButton.position(windowWidth/2 - windowWidth/8, windowHeight/2)

  restartButton = createButton("Restart")
  restartButton.position(windowWidth/2 + windowWidth/8, windowHeight/2)

  quitButton = createButton("Quit")
  quitButton.position(windowWidth/2 + windowWidth/1024, windowHeight/2)

  lane1 = createSprite(windowWidth/4, windowHeight/2, 10, windowHeight)
  lane1.shapeColor = ("black")

  lane2 = createSprite(windowWidth/4 + windowWidth/4, windowHeight/2, 10, windowHeight)
  lane2.shapeColor = ("black")

  lane3 = createSprite(windowWidth/4 + windowWidth/2, windowHeight/2, 10, windowHeight)
  lane3.shapeColor = ("black")

  baby = createSprite(windowWidth/2, windowHeight - windowHeight/4)
  baby.addImage(babyImg)
  baby.scale = 0.2
  

  leftButton = createButton("ᐊ")
  leftButton.position(windowWidth/10, windowHeight - windowHeight/10)

  rightButton = createButton("ᐅ")
  rightButton.position(windowWidth/1.138 , windowHeight - windowHeight/10)

  parent = createSprite(baby.x, windowHeight + 100)
  parent.addImage(parentImg)
  parent.scale = 0.9
  
  
  furnitureGroup = new Group();
  candyGroup = new Group();
  
}

function draw(){
  background(0);

  //console.log(windowHeight)

  

  console.log(baby.depth)
  console.log(parent.depth)
  console.log(ground.depth)


  if(gameState === "Play"){
    spawnObstacles();
    spawnCandy();
    
    parent.x = baby.x + windowHeight/32;
    parent.depth = baby.depth
    parent.depth++
    s = 6+(frameCount/60)
    ground.velocityY = s
    score = Math.round(frameCount/6)


    if(highScore<=score){
      highScore = score
    }

    if(ground.y > windowHeight - windowHeight/7){
      ground.y = windowHeight/2
    }
  
    leftButton.mousePressed(()=>{
      baby.x -= windowWidth/8
    })
  
    rightButton.mousePressed(()=>{
      baby.x += windowWidth/8
    })

    if(keyIsDown(LEFT_ARROW)){
      baby.x -= windowWidth/89
    }

    if(keyIsDown(RIGHT_ARROW)){
      baby.x += windowWidth/89
    }

    if(score%150===0 && score>0){
      checkPointSound.play()
    }



    if(furnitureGroup.isTouching(baby) && lives <= 2) {
     gameState = "End";

   }
    if(furnitureGroup.isTouching(baby) && lives>=1){
      parent.y -= 1.4;
       lives  = lives - 1
       failureSound.play()
    }

  
    if(parent.y === baby.y - 150){
      gameState = "End"
    
    }
    
    if(candyGroup.isTouching(baby)){
      candyScore = candyScore + 1;
      candySound.play()
    }

  }
  
    if(gameState === "End"){
      imageMode(CENTER)
      image(textImg, windowWidth/2, windowHeight/2, windowWidth,windowHeight)
      
      restartButton.show();
      quitButton.show();

       
}

    restartButton.mousePressed(()=>{
      quitButton.hide()
      restartButton.hide()
      lives = 165
      ground.velocityY = 6

      parent.y = windowHeight+100
      
      gameState = "Play";



    })

  drawSprites();

  textSize(40)
  fill(0)
  text("Candy : " + Math.round(candyScore/20), windowWidth - windowWidth/6, windowHeight/9)
  
  text("Lives : " + Math.round(lives/33), windowWidth - windowWidth/6, windowHeight/ 5)

  text("Distance :" + score, windowWidth/14, windowHeight/9)
  
  text("High Score : " + highScore, windowWidth/14, windowHeight/ 5)


  if(gameState === "Ready"){
    imageMode(CENTER)
    
    image(groundImg, windowWidth/2, windowHeight/2, windowWidth,windowHeight)
    
    

    restartButton.hide()
    
    fill("black")
    textSize(40)
    text("        Help the baby escape the parent, while collecting candy along the \n     way and avoiding dangerous obstacles that could make you get caught! \n        Using the arrow keys, dodge the chairs and escape the parent!", windowWidth/10, windowHeight/8)

    startButton.mousePressed(()=>{
      startSound.play()
      startButton.hide()
      quitButton.hide()
      gameState = "Play"
    })
     
    quitButton.mousePressed(()=>{
      startButton.hide()
      quitButton.hide()
      restartButton.hide()
      
      gameState = "Quit";
    })
  }
  
  if(gameState === "Quit"){
    imageMode(CENTER)
    image(groundImg, windowWidth/2, windowHeight/2, windowWidth,windowHeight)
    fill("black")
    textSize(40)
    text("Thank you for playing, I hope you come back! \n                                      :) ", windowWidth/4, windowHeight/4)
  }
}

function spawnObstacles(){
  
  if(frameCount%249===0){
    

    furniture = createSprite(windowWidth/2 ,-50)
    furniture.debug = true;
    
    //var a = Math.round(random(windowWidth/20, windowWidth - windowWidth/20))
    var a = windowWidth/4 - windowWidth/8;
    var b = windowWidth/4 + windowWidth/4 - windowWidth/8;
    var c = windowWidth/4 + windowWidth/4 + windowWidth/4 - windowWidth/8;
    var d = windowWidth/4 + windowWidth/4 + windowWidth/4 + windowWidth/4 - windowWidth/8;
  
    var r = Math.round(random(1,4))

    switch(r){
      case 1 : furniture.x = a;
      break;
      case 2 : furniture.x = b;
      break;
      case 3 : furniture.x = c;
      break;
      case 4 : furniture.x = d;
      break;
      default : break;
    }
    
    
    furniture.addImage(chairImg)
    furniture.velocityY = ground.velocityY;
    furniture.scale = 0.4
    furniture.depth = baby.depth
    baby.depth++;
    parent.depth++
    furnitureGroup.add(furniture);
    
  }
}

function spawnCandy(){
    
  if(frameCount%90===0){
    
    candy = createSprite()

    var a = windowWidth/4 - windowWidth/8;
    var b = windowWidth/4 + windowWidth/4 - windowWidth/8;
    var c = windowWidth/4 + windowWidth/4 + windowWidth/4 - windowWidth/8;
    var d = windowWidth/4 + windowWidth/4 + windowWidth/4 + windowWidth/4 - windowWidth/8;
  
    var r = Math.round(random(1,4))

    switch(r){
      case 1 : candy.x = a;
      break;
      case 2 : candy.x = b;
      break;
      case 3 : candy.x = c;
      break;
      case 4 : candy.x = d;
      break;
      default : break;
    }
    
    
    candy.addImage(candyImg)
    candy.velocityY = ground.velocityY;
    candy.scale = 0.08
    candy.depth = baby.depth
    baby.depth+=2;
    candyGroup.add(candy);
    
  }


}
