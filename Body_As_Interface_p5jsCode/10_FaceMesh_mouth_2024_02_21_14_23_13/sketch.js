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
 
   if (faces.length > 0) {
for (let i = 0; i < faces[0].lips.length; i++) {
      let lips = faces[0].lips[i];
      fill( 255);noStroke();
      circle(lips.x, lips.y, 4);
      //text(i,lips.x, lips.y-5);
    }
     let topLip = faces[0].lips[0];
     let lowLip =  faces[0].lips[3];
     
     stroke(255);
     line(topLip.x,topLip.y,lowLip.x,lowLip.y);
     let distt=int(dist(topLip.x,topLip.y,lowLip.x,lowLip.y));
     textSize(40);
     text(distt,topLip.x,topLip.y-20);
     if(distt>50)text("OPEN",topLip.x+60,topLip.y-20);
     else text("CLOSE",topLip.x+60,topLip.y-20);  
     
   }
}

// Callback function for when bodypose outputs data
function gotFaces(results) {
  // Save the output to the poses variable
   faces = results;
 //console.log(faces);
}




