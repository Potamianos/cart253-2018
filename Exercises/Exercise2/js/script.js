/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/
var avatarImage;
// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 2;

// How many dodges the player has made
var dodges = 0;

// setup()
//

// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(0);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately
  //if both two arrow keys are pressed at same time: avatar will grow by 5
if (keyIsDown(LEFT_ARROW)) {
  if (keyIsDown(RIGHT_ARROW)) {
    avatarSize = avatarSize + 5;
  }
}
  if (keyIsDown(LEFT_ARROW)) {
    if (keyIsDown(UP_ARROW)) {
      avatarSize = avatarSize + 5;
    }
}
if (keyIsDown(LEFT_ARROW)) {
  if (keyIsDown(DOWN_ARROW)) {
    avatarSize = avatarSize + 5;
  }
}
if (keyIsDown(RIGHT_ARROW)) {
  if (keyIsDown(DOWN_ARROW)) {
    avatarSize = avatarSize + 5;
  }
}
if (keyIsDown(RIGHT_ARROW)) {
  if (keyIsDown(UP_ARROW)) {
    avatarSize = avatarSize + 5;
  }
}
if (keyIsDown(DOWN_ARROW)) {
  if (keyIsDown(UP_ARROW)) {
    avatarSize = avatarSize + 5;
  }
  // if space is pressed the avatar will shrink by .1
}
if (keyIsDown(0x20)){
  avatarSize = avatarSize - .1;
}
//avatar will follow Mouse if mouse button is pressed
if (mouseIsPressed) {
  avatarX = mouseX;
  avatarY = mouseY;
}
  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    //reset avatarSpeed
    avatarSpeed = 10;
    // reset avatar size
    avatarSize = 50;
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
    //display "you suck" if loss occurs
    fill(255);
    textFont('Helvetica');
    textSize(95);
    textAlign(CENTER);
    text("YOU SUCK",250,250);
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    //reset avatarSpeed
    avatarSpeed = 10;
    // reset avatar size
    avatarSize = 50;
    //display you suck when a loss occurs
    fill(255);
    textFont('Helvetica');
    textSize(95);
    textAlign(CENTER);
    text("YOU SUCK",250,250);
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    text(dodges,0,0);
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
    // Increase the avatar's speed and size to make the game harder
    avatarSize = avatarSize + random(.5,3);
    avatarSpeed = avatarSpeed + random(.5,4);
  }

  // Display the current number of successful in the console
  console.log(dodges);

  // The player is black
  fill(255,255,0);
  // Draw the player as a circle
  rect(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is red
  fill(255,0,0);
  // Draw the enemy as a circle
  rect(enemyX,enemyY,enemySize,enemySize);

 //display dodges
fill(255);
textFont('Helvetica');
textSize(100);
textAlign(CENTER);
text(dodges,50,450);
}
