/*
Workshop "p5js Body as Interface"
Processing Community Day - https://pcd.fba.up.pt/2024/
Rodrigo Carvalho | www.visiophone-lab-com | @visiophone_lab
//
Based on the examples by ml5 (https://editor.p5js.org/ml5/sketches/DNbSiIYKB) and on ZachLieberman BasicDrawing2 https://github.com/ofZach/MIT_DrawingPlusPlus/blob/master/code_p5js/basicDrawing2/js/sketch.js
*/

let handpose;
let video;
let hands = [];

let polyline = []; // array to store the drawing points
let wLine = [];  // array to store line's weight 

let posX=0; //smooth the pos and weightValues
let posY=0;
let wLinee=0;

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
   image(video, 0, 0, width, height); // Draw the webcam video
  //image(video, width - width / 4, 0, width / 4, height / 4); //video feed in the screen corner
  fill(0, 220);
  noStroke(); // darkening Keypoints
  rect(0,0,width,height);
  ////////////////////////////////////////////////////////////////
  // Draw all the tracked hand points // circle in each part
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(255);
      noStroke();
      circle(keypoint.x, keypoint.y, 4);
      stroke(255);
    }
  }
  ////////////////////////////////////////////////////////////////

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
    
    // smoothing values
    posX+=(centerX-posX)*0.2;
    posY+=(centerY-posY)*0.2;
    wLinee+=(pinch/2-wLinee)*0.2;
    
    strokeWeight(1); // line connecting the fingers
    line(finger.x,finger.y,posX,posY); line(thumb.x,thumb.y,posX,posY);
    
    // when we have hands on the screen add positions to the polynie array
    polyline.push(createVector(posX, posY));    
    wLine.push(wLinee);

    
  }
   //////////////////////////////////////////////////////////////// 
    // draw lines according the size of polyline array
    for (let i = 0; i < polyline.length; i++) {
     
      // for all elements except for the last one
      if (i + 1 < polyline.length) {
        // draw a line between current element and the next one
        stroke(map(i,0,polyline.length,50,255)); 
        strokeWeight(wLine[i]);
        line(polyline[i].x, polyline[i].y, polyline[i+1].x, polyline[i+1].y);
      }
    }
  
  
  // Setting a limite to the size of the line
  if(polyline.length>60) {polyline.shift();wLine.shift();}
  
  
  
}
// Callback function for when handpose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
  //console.log(hands);
}
