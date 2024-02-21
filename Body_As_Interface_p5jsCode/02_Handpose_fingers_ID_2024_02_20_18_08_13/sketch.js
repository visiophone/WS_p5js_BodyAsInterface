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
  image(video, 0, 0, width, height); // Draw the webcam video
 // image(video, width-width/4, 0, width/4, height/4); //video feed in the screen corner
  fill(0,220);noStroke(); // darkening Keypoints
  rect(0,0,width,height);
  //////////////////
   
  
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
  ////////////////////////////////////////////////////////////////
    
      // If there is at least one hand
  if (hands.length > 0) {
    // Find the index finger tip and thumb tip
    let h0 = hands[0].wrist;
    let h1 = hands[0].index_finger_tip;
    let h2 = hands[0].middle_finger_tip;
    let h3 = hands[0].ring_finger_tip;
    let h4 = hands[0].pinky_finger_tip;
    let h5 = hands[0].thumb_tip;
    
    // OPEN DIST>0.17
    //print(dist(h0.x3D,h0.y3D,h0.z3D,h5.x3D,h5.y3D,h5.z3D));
    
    // INDEX UP
    if(dist(h0.x3D,h0.y3D,h0.z3D,h1.x3D,h1.y3D,h1.z3D)>0.17){
      fill(255,0,0);noStroke();
      circle(h1.x,h1.y,20);
      
      push();
      scale(-1.0, 1.0);
      translate(-width, 0); // move canvas to the right
      textSize(15);textAlign(CENTER);fill(255);
      text("INDEX",width-h1.x,h1.y-20);
      pop();
      
      
    }
    
    //  MIDDLE UP
    if(dist(h0.x3D,h0.y3D,h0.z3D,h2.x3D,h2.y3D,h2.z3D)>0.18){
      fill(0,255,0);noStroke();
      circle(h2.x,h2.y,20);
      
      push();
      scale(-1.0, 1.0);
      translate(-width, 0); // move canvas to the right
      textSize(15);textAlign(CENTER);fill(255);
      text("MIDDLE",width-h2.x,h2.y-20);
      pop();
    }
    //  RING UP
      if(dist(h0.x3D,h0.y3D,h0.z3D,h3.x3D,h3.y3D,h3.z3D)>0.17){
      fill(0,0,255);noStroke();
      circle(h3.x,h3.y,20);
        
      push();
      scale(-1.0, 1.0);
      translate(-width, 0); // move canvas to the right
      textSize(15);textAlign(CENTER);fill(255);
      text("RING",width-h3.x,h3.y-20);
      pop();
    }

     //  PINKY UP
      if(dist(h0.x3D,h0.y3D,h0.z3D,h4.x3D,h4.y3D,h4.z3D)>0.15){
      fill(255,255,0);noStroke();
      circle(h4.x,h4.y,20);
        
      push();
      scale(-1.0, 1.0);
      translate(-width, 0); // move canvas to the right
      textSize(15);textAlign(CENTER);fill(255);
      text("PINKY",width-h4.x,h4.y-20);
      pop();
    }
    
      //  THUMB UP
      if(dist(h0.x3D,h0.y3D,h0.z3D,h5.x3D,h5.y3D,h5.z3D)>0.135){
      fill(0,255,255);noStroke();
      circle(h5.x,h5.y,20);
        
      push();
      scale(-1.0, 1.0);
      translate(-width, 0); // move canvas to the right
      textSize(15);textAlign(CENTER);fill(255);
      text("THUMB",width-h5.x,h5.y-20);
      pop();
    }
 
  }
    
    
  }


}
// Callback function for when handpose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
  //console.log(hands);
}
