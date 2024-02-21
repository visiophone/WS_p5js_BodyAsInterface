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

let eyeLeft=0;
let eyeRight=0;
let mouth=0;
let nose=0;


function preload() {
  //Load the bodypose model.
  bodypose = ml5.bodypose("BlazePose");
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
 
  fill(255); stroke(0);strokeWeight(1);
  // Eyes External circle. Circle size is random
  leftEye=int(random(15,150));
  rightEye=int(random(15,150));
  circle(poses[0].left_eye.x,poses[0].left_eye.y,leftEye);
  circle(poses[0].right_eye.x,poses[0].right_eye.y,rightEye);
  // Eyes Inner circle
  fill(0);
   circle(poses[0].left_eye.x,poses[0].left_eye.y,10);
  circle(poses[0].right_eye.x,poses[0].right_eye.y,10); 
  // mouth
  stroke(255); strokeCap(SQUARE);
  mouth=int(random(1,30));
  strokeWeight(mouth);
  line(poses[0].mouth_left.x,poses[0].mouth_left.y,poses[0].mouth_right.x,poses[0].mouth_right.y);  
    // nose
  fill(255,0,0);noStroke();
  nose=int(random(15,70));
  circle(poses[0].nose.x,poses[0].nose.y,nose);
   
  print("Left Eye: "+leftEye+" | Right Eye: "+rightEye+" | nose: "+nose+" | mouth: "+mouth);

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


