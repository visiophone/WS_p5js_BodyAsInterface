/*
Workshop "p5js Body as Interface"
Processing Community Day - https://pcd.fba.up.pt/2024/
Rodrigo Carvalho | www.visiophone-lab-com | @visiophone_lab
//
Based on the examples by ml5 (https://editor.p5js.org/visiophone/sketches/dqu307P6w) 
*/

let facemesh;
let video;
let faces = [];


function preload() {
   // Load the facemesh model
  facemesh = ml5.facemesh();

}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // Start detecting faces from the webcam video
  facemesh.detectStart(video, gotFaces);
}

function draw() {
  //////// Flipped webcam
  //translate(width, 0); // move canvas to the right
  //scale(-1.0, 1.0);
   image(video, 0, 0, width, height); // Draw the webcam video
  //image(video, width - width / 4, 0, width / 4, height / 4); //video feed in the screen corner
  fill(0, 220);
  noStroke(); // darkening Keypoints
  rect(0,0,width,height);
  ////////////////////////////////////////////////////////////////
 
  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(255);
      noStroke();
      circle(keypoint.x, keypoint.y, 2);   
      // point number
     text(j,keypoint.x, keypoint.y);    
      
    }
  }
}

// Callback function for when bodypose outputs data
function gotFaces(results) {
  // Save the output to the poses variable
   faces = results;
 console.log(faces);
}




