/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/
//size variables
var sizeX;
var sizeY;
//speed variables
var dogX;
var dogY;
var vx;
var vy;
var speed = 10;
//alt to targetX targetY
var locationX;
var locationY;
// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;
// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  //define number of numDecoys
  var numDecoys = random(300,1000);
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    //create variables that change the size of the animals
    var set = 128;
    var setM = set*random(.5,1.5);
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y,setM,setM);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,setM,setM);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,setM,setM);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,setM,setM);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,setM,setM);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,setM,setM);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,setM,setM);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,setM,setM);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,setM,setM);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,setM,setM);
    }
  }


  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);
  //display sign at top right corner of the window
stroke(255);
strokeWeight(10);
fill(255,0,0);
rect(windowWidth - 240,20,200,200);
//add image of Dog
image(targetImage, windowWidth - 130,100);
//display wanted writting
textFont("Impact");
textSize(50);
noStroke();
fill(255);
textAlign(CENTER,CENTER);
text("FIND ME!",windowWidth - 140,170);
//define speed
dogX = targetX;
dogY = targetY;
vx = speed;
vy = -speed;
}

function draw() {
  //stop the dog from being displayed under sign
  while (targetX > windowWidth - 240 && targetY < 220) {
    console.log ("OVERLAP");
    targetX = random(0,width);
    targetY = random(0,height);
    //set dogxy again
    dogX = targetX;
    dogY = targetY;
    image(targetImage,targetX,targetY);
    //display sign at top right corner of the window
  stroke(255);
  strokeWeight(10);
  fill(255,0,0);
  rect(windowWidth - 240,20,200,200);
  //add image of Dog
  image(targetImage, windowWidth - 130,100);
  //display wanted writting
  textFont("Impact");
  textSize(50);
  noStroke();
  fill(255);
  textAlign(CENTER,CENTER);
  text("FIND ME!",windowWidth - 140,170);
  }
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WON!",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);
    //make the dog move/grow
    dogX = dogX + vx;
    dogY =  dogY + vy;
    sizeX = random(50,500);
    sizeY = random(50,500);
    image(targetImage,dogX,dogY,sizeX,sizeY);
    //stop the dog from leaving
    if ( dogX < 0) {
      dogX += windowWidth + 2;
    }
    else if(dogX > windowWidth) {
      dogX -= windowWidth - 2;
    }
    if (dogY < 0){
      dogY += windowHeight + 2;
    }
    else if (dogY > windowHeight) {
      dogY -= windowHeight - 2;

    }
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
