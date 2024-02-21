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

let particles=[];
let sizes=[];
let vel=[];



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

    }
     // distance between top and bottom mounth points to check if mouth is open
     let topLip = faces[0].lips[0];
     let lowLip =  faces[0].lips[3];
     let distt=int(dist(topLip.x,topLip.y,lowLip.x,lowLip.y));
     // if open push a new particle with random size and vel
     if(distt>40 && frameCount%2==0){
       let midPointX=(lowLip.x+topLip.x)/2;
       let midPointY=(lowLip.y+topLip.y)/2;
       particles.push(createVector(midPointX,midPointY));
       sizes.push(random(5,50));
       vel.push(createVector(random(-0.5,0.5),random(-1.5,-0.3)));
      
     }
     
   }
  
 
 // draw the particles. if the particles crosses the top part of the screen it is erased 
  for(let i=0; i<particles.length;i++){
    fill(255,200);noStroke();
    circle(particles[i].x,particles[i].y,sizes[i]);
    //updatePOS
  particles[i].x=particles[i].x+vel[i].x;
  particles[i].y=particles[i].y+vel[i].y;
    
    if(particles[0].y<0){particles.shift();sizes.shift();vel.shift();}
    
  }
  

}

// Callback function for when bodypose outputs data
function gotFaces(results) {
  // Save the output to the poses variable
   faces = results;
 //console.log(faces);
}




