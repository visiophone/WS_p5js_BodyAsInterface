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


  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      fill(255);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
      stroke(255);
      line(keypoint.x, keypoint.y,keypoint.x, -100);
    }
  }
}

// Callback function for when bodypose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
