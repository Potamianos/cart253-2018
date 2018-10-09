/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/
//IMAGE varriable for prey and player
var mb;
var preyImage;
var playerImage;
//sounds
var power;
var gameMusic;
var nom;
//rgb colors
var r = 0;
var g = 100;
var b = 15;
// Track whether the game is over
var gameOver = false;
//time varrable for prey;
var tx = 0;
var ty = 0;
//noise varriable for prey;
var nx = 0;
var ny = 0;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;
// Prey health
var preyHealth;
var preyMaxHealth = 255;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;


function preload(){
  //preload all images
  preyImage = loadImage("assets/images/virus.png");
  playerImage = loadImage("assets/images/antivirus.png");
  mb = loadImage("assets/images/motherboard.png");
  //preload all sounds
  gameMusic = new Audio("assets/sounds/wave.wav");
power = new Audio("assets/sounds/power.wav")
nom = new Audio("assets/sounds/nom.mp3")



}
// setup()
//
// Sets up the basic elements of the game
function setup() {

  createCanvas(500,500);

  noStroke();


  setupPrey();
  setupPlayer();
  //start gameMusic
  gameMusic.loop = true;
  gameMusic.play();

}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {

//fades background when loss occurs
  bgColor();
  //display green background
  background(r,g,b);
  // display motherboard over background
  //image fades to black corresponding to playerHealth
  tint(255,playerHealth);
  image(mb,0,0,500,500);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
    displayHUD();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  //sprint function
  if (keyIsDown(SHIFT)) {
    //shift will allow the player ot acelerate at a cost of health
playerMaxSpeed = playerMaxSpeed + 0.2;
//subtract 1 health per everyframe shift is held
playerHealth = playerHealth - 1.2;
  }
  // reset speed when shift is released/if it is not pressed
  else {
    playerMaxSpeed = 2;
    //stop reduction of health
    playerHealth = playerHealth;
  }

  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
    //stop gamemusic
    gameMusic.pause();
    //play end game music
    power.play();
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
      //make the size of the player larger by 1
      playerRadius++;
      //add speed to prey
      preyMaxSpeed = preyMaxSpeed * 1.01;
      //make prey smaller by .01
      preyRadius = preyRadius - 0.01;
      nom.play();
    }
  }
}

// movePrey()
//
// Moves the prey based on noise velocity changes
function movePrey() {
  //noise time values
    tx = tx + .005;
    ty = ty + .015;
    nx = noise(tx);
    ny = noise(ty);
    //map noise to correspond to prey XY velocity
    preyVX = map(nx,0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(ny,0,1,-preyMaxSpeed,preyMaxSpeed);

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;
  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  tint(225,preyHealth);
  image(preyImage,preyX,preyY,preyRadius*2,preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  tint(255,255);
  image(playerImage,playerX,playerY,playerRadius*2,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(20);
  textAlign(CENTER,CENTER);
  fill(255);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You placed " + preyEaten + " Infected file(s) in quarantine\n";
  gameOverText += "before the pc crashed."
  text(gameOverText,width/2,height/2);

}
// displayHUD
//
// display score
function displayHUD(){
fill(255);
textAlign(CENTER);
textFont("IMPACT");
textSize(20);
text("Score " + preyEaten,50,450);
//make a rectangle to underline caption
fill(255,150,0);
rectMode(CENTER);
rect(250,50,175,10);
//display caption
fill(255);
textAlign(CENTER);
textFont("IMPACT");
textSize(20);
text("Take Out The Virus",250,50);
fill(255);
textAlign(CENTER);
textSize(15);
text("Shift to Sprint",445,493);
}
// bgColor
//
//fade to black
function bgColor() {
if (gameOver === true) {
r--;
g--;
b--;
}
}
