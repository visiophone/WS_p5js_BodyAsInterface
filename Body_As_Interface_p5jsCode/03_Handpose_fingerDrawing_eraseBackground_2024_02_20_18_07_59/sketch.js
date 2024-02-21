/*
Workshop "p5js Body as Interface"
Processing Community Day - https://pcd.fba.up.pt/2024/
Rodrigo Carvalho | www.visiophone-lab-com | @visiophone_lab
// Based on the examples by ml5 (https://editor.p5js.org/ml5/sketches/QGH3dwJ1A)
*/

let handpose;
let video;
let hands = [];

function preload() {
  // Load the handpose model.
  handpose = ml5.handpose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  // start detecting hands from the webcam video
  handpose.detectStart(video, gotHands);
  
}

function draw() {
  
  //////// Flipped webcam
  translate(width, 0); // move canvas to the right
  scale(-1.0, 1.0);
 // image(video, 0, 0, width, height); // Draw the webcam video
  image(video, width-width/4, 0, width/4, height/4); //video feed in the screen corner
  fill(0,220);noStroke(); // darkening Keypoints
  //rect(0,0,width,height);
  //////////////////
   
  
////////////////////////////////////////////////////////////////
  // Draw all the tracked hand points // circle in each part
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];    
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(255);
      noStroke();
    //  circle(keypoint.x, keypoint.y, 4);
      stroke(255);  
    }
  ////////////////////////////////////////////////////////////////
 
    ///
 // If there is at least one hand
  if (hands.length > 0) {
    // Find the index finger tip and thumb tip
    let finger = hands[0].index_finger_tip;
    let thumb = hands[0].thumb_tip;

    // Draw circles at finger positions
    let centerX = (finger.x + thumb.x) / 2;
    let centerY = (finger.y + thumb.y) / 2;
    // Calculate the pinch "distance" between finger and thumb
    let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

    // This circle's size is controlled by a "pinch" gesture
    fill(255);
    stroke(0);
    strokeWeight(1);
    circle(centerX, centerY, pinch);
  }
    
    
  }


}
// Callback function for when handpose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
  //console.log(hands);
}
