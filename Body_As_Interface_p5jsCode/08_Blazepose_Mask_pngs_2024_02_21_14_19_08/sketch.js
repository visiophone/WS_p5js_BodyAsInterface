/*
Workshop "p5js Body as Interface"
Processing Community Day - https://pcd.fba.up.pt/2024/
Rodrigo Carvalho | www.visiophone-lab-com | @visiophone_lab
//
Based on the examples by ml5 (https://editor.p5js.org/ml5/sketches/OukJYAJAb) 
*/

let video;
let bodypose;
let poses = [];

let seed=0; // seed to fix random values

let eyeLeft=0; // random size for left & right eye
let eyeRight=0;
let randLeft=0; // random image left / right eye
let randRight=0; // 

let pic = [];
function preload() {
  bodypose = ml5.bodypose("BlazePose");  //Load the bodypose model.
  pic[0] = loadImage('pic/eye0.png');
  pic[1] = loadImage('pic/eye1.png');
  pic[2] = loadImage('pic/eye2.png');
  pic[3] = loadImage('pic/eye3.png');
  pic[4] = loadImage('pic/eye4.png');
}

function setup() {
  createCanvas(640, 480);
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // Start detecting poses in the webcam video
  bodypose.detectStart(video, gotPoses);
}

function draw() {
  //////// Flipped webcam
  translate(width, 0); // move canvas to the right
  scale(-1.0, 1.0);
   image(video, 0, 0, width, height); // Draw the webcam video
  //image(video, width - width / 4, 0, width / 4, height / 4); //video feed in the screen corner
  fill(0, 220);
  noStroke(); // darkening Keypoints
  rect(0,0,width,height);
  ////////////////////////////////////////////////////////////////
  randomSeed(seed); // fix the random number
  
if (poses.length > 0) { 
  imageMode(CENTER); // position image from the center
  
  randLeft=int(random(5)); // randomize image
  randRight=int(random(5));
  leftEye=int(random(15,150)); // randomize size
  rightEye=int(random(15,150));
  // insert the random image in the eye's position 
  image(pic[randLeft],poses[0].left_eye.x,poses[0].left_eye.y,leftEye,leftEye);
  image(pic[randRight],poses[0].right_eye.x,poses[0].right_eye.y,rightEye,rightEye);
  imageMode(CORNER); // position image from the corner

}
}

// Callback function for when bodypose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
 // console.log(poses);
}

function mouseReleased() {
  
  seed=int(random(millis()));
  print("RandomSeed: "+seed);
}


