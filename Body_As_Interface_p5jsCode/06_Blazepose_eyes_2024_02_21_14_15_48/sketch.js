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

let leftX=0; // vars to store and smooth eyes position
let leftY=0;
let rightX=0;
let rightY=0;


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

  
  
if (poses.length > 0) { 
  
  //smooth values to drag the inner eyes circle
  leftX+=(poses[0].left_eye.x-leftX)*0.1;
  leftY+=(poses[0].left_eye.y-leftY)*0.1;

  rightX+=(poses[0].right_eye.x-rightX)*0.1;
  rightY+=(poses[0].right_eye.y-rightY)*0.1;
  
  stroke(255);
  //line connecting realtime eyes position to the smoother position
  line(poses[0].left_eye.x,poses[0].left_eye.y,leftX,leftY);
  line(poses[0].right_eye.x,poses[0].right_eye.y,rightX,rightY);
  
  fill(255);

  circle(poses[0].left_eye.x,poses[0].left_eye.y,60); // eye's circle
  circle(poses[0].right_eye.x,poses[0].right_eye.y,60);
  fill(0);
  circle(leftX,leftY,40); // inner eyes circle
  circle(rightX,rightY,40);
  
}
  
}

// Callback function for when bodypose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
 // console.log(poses);
}
