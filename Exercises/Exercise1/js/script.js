// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.

// The image of a clown face
var clownImage;
//image of meme2
var memeImage2;
//image of meme
var memeImage;
//position of meme image
var memeImageX;
var memeImageY;
//The Image of pixel Dirt
var dirtImage;
//X and Y Position of Pixel Dirt
var dirtImageX;
var dirtImageY;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;


// preload()
//
// Load the two images we're using before the program starts

function preload() {
  dirtImage = loadImage("assets/images/dirt.jpg");
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  memeImage = loadImage("assets/images/meme.jpg");
  memeImage2 = loadImage("assets/images/meme2.jpg");

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);
  // start meme image at center of canvas
  memeImageX = width/2
  memeImageY = height/2
  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;
  //start
  dirtImageX = 0 - dirtImage.width/2;
  dirtImageY = height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;
  //move dirtImage to the right by increasing X position
  dirtImageX += 1;
  //display image
  image(dirtImage,dirtImageX,dirtImageY);


  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  var x2Distance = mouseX - memeImageX;
  var y2Distance = mouseY - memeImageY;

  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;
  // Add 1/50th of the x and y distance to the meme's current (x,y) location
  memeImageX = memeImageX + x2Distance/50;
  memeImageY = memeImageY + y2Distance/50;

  //display memeImage
  image(memeImage,memeImageX,memeImageY,100,100);


  // Display the clown image
  image(clownImage,clownImageX,clownImageY);
}
