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

// Sound
let osc, fft;

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

  // SOUND
  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);
  fft = new p5.FFT();
  osc.start();
}

function draw() {
  //////// Flipped webcam
  //translate(width, 0); // move canvas to the right
  //scale(-1.0, 1.0);
  image(video, 0, 0, width, height); // Draw the webcam video
  //image(video, width - width / 4, 0, width / 4, height / 4); //video feed in the screen corner
  fill(0, 225);
  noStroke(); // darkening Keypoints
  rect(0, 0, width, height);
  ////////////////////////////////////////////////////////////////

  
  
  if (faces.length > 0) {
    for (let i = 0; i < faces[0].lips.length; i++) {
      let lips = faces[0].lips[i];
      fill(255);
      noStroke();
    }

    // distance between top and bottom mounth points to check if mouth is open
    let topLip = faces[0].lips[0];
    let lowLip = faces[0].lips[3];
    let distt = int(dist(topLip.x, topLip.y, lowLip.x, lowLip.y));

    fill(50,200,255); 
    circle(topLip.x, topLip.y, 15);
    circle(lowLip.x, lowLip.y, 15);
    
    let leftLip = faces[0].lips[17];
    let rightLip = faces[0].lips[34];

    circle(leftLip.x, leftLip.y, 10);
    circle(rightLip.x, rightLip.y, 10);
    stroke(255); strokeWeight(1);
    line(leftLip.x, leftLip.y,rightLip.x, rightLip.y);

    // mouth opening/close changes oscilator's frequency
    let freqq = map(distt, 20, 70, 20, 2880);
    osc.freq(freqq);


    // DRAW WAVE
    
   
    fill(255,150);
    let waveform = fft.waveform(); // analyze the waveform
    beginShape();
    strokeWeight(3);
    let offSetX=100; //make the wave a little bigger than the mouth
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, leftLip.x-offSetX, rightLip.x+offSetX);
      let y = map(waveform[i], -0.10, 0.10, lowLip.y, topLip.y);
      vertex(x, y);
    }
    endShape();
    
  }
}

// Callback function for when bodypose outputs data
function gotFaces(results) {
  // Save the output to the poses variable
  faces = results;
  //console.log(faces);
}
