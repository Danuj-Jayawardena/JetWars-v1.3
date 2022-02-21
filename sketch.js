var backgroundImage;
var aircraft, aircraftImage
var missile, missileImage;
var boom;

var enemy;

var score = 0;
var life = 3;

var gameState = 1

function preload() {
  backgroundImage = loadImage("assets/bg.jpg");

  aircraftImage = loadImage("assets/aircraft.png");

  enemyImage = loadImage("assets/enaircraft.png");

  missileImage = loadImage("assets/missile.png")

  steelImage = loadImage("assets/steel.png")

  fireImage = loadImage("assets/fire.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight - 1);

  bg = createSprite(width / 2, height / 2)
  bg.addImage(backgroundImage)
  bg.scale = 2.4

  aircraft = createSprite(width - 120, height / 2 + 70);
  aircraft.addImage(aircraftImage)
  aircraft.scale = 0.4


  wallT = createSprite(width / 2, 45, width, 10);
  wallT.addImage(steelImage)
  wallT.scale = 1.08

  wallB = createSprite(width / 2, height, width, 10);
  wallB.visible = false;

  enemyGroup = new Group();
  missileGroup = new Group();
}

function draw() {
  background(0);
  drawSprites()

  //-------------------------------- PLAY State -------------------------------------------
  
  if (gameState == 1) {

    if (keyDown("down")) {
      aircraft.y = aircraft.y + 10
    }

    if (keyDown("up")) {
      aircraft.y = aircraft.y - 10
    }

    textFont("algerian")
    textSize(70)
    stroke("black")
    strokeWeight(5)
    fill("#a3740f")
    text("War Jets", windowWidth / 2 - 150, 90)


    textSize(40)
    text("Score : " + score, windowWidth - 300, 90)
    text("Life :" + life, 90, 90)

    createEnemies()

    if (enemyGroup.isTouching(missileGroup)) {
      for (var i = 0; i < enemyGroup.length; i++) {

        if (enemyGroup[i].isTouching(missileGroup)) {
          enemyGroup[i].destroy()
          missileGroup.destroyEach()

          boom = createSprite(missile.x, missile.y)
          boom.addImage(fireImage)
          boom.scale = 0.27

          score += 20

        }

      }
    }

    for (var i = 0; i < enemyGroup.length; i++) {
      if (enemyGroup[i].x > aircraft.x ) {
        enemyGroup[i].destroy()
        life -= 1
      }
    }
    

    if (enemyGroup.isTouching(aircraft) ) {
      for (var i = 0; i < enemyGroup.length; i++) {
        if (enemyGroup[i].isTouching(aircraft)) {
          gameState = 2
        }
      }
    }
    

  } 

  if (life == 0){
    gameOver()
    enemyGroup[i].destroy()
    aircraft.destroy()
  }

//------------------------------------ END State ------------------------------------------
  if (gameState == 2) {
    enemyGroup.destroyEach()
    missileGroup.destroyEach()
    aircraft.destroy()

    end = createSprite(aircraft.x, aircraft.y)
    end.addImage(fireImage)
    end.scale = 1

    gameOver()

  }



  aircraft.collide(wallB)
  aircraft.collide(wallT)
  enemyGroup.collide(wallB)
  enemyGroup.collide(wallT)

}


function keyReleased() {
  if (keyCode == 32) {
    createMissiles()
    boom.remove()
  }
}

function createEnemies() {
  if (frameCount % 50 == 0) {
    enemy = createSprite(-50, round(random(140, height - 30)))
    enemy.velocityX = (score / 40 + 20)
    enemy.addImage(enemyImage)
    enemy.scale = 0.22

    if(enemy.x > width-120){
      life -= 1
    }

    enemyGroup.add(enemy)
  }
}

function createMissiles() {

  missile = createSprite(aircraft.x - 50, aircraft.y);
  missile.addImage(missileImage)
  missile.scale = 0.2
  missile.velocityX = -20
  missileGroup.add(missile)

}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thankyou for playing!",
      imageUrl:
        "end.png",
      imageSize: "350x350",
      confirmButtonText: "Play Again"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}