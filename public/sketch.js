// █████████████████████████████████████████████████
// ★
// ART102 MM Fall 2020 Studio 10: Drawing Game II
// Code:  YIN YU 
// ★
// █████████████████████████████████████████████████

var socket;

var osc1;
var osc2;
var play=false;


// ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
//   setup drawing environment  
// ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ 


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  cursor(CROSS);
          ///////
//  socket = io.connect ('http://localhost:3000');
          
 socket = io.connect ('https://baojing-online-game.herokuapp.com/');
//  socket = io.connect ('http://5392405bfb35.ngrok.io/');
          
  socket.on ('mouse', newDrawing);
  osc1 = new p5.SinOsc();
  osc1.amp(0.5);
  osc2 = new p5.TriOsc();
  osc2.amp(0.5);
}


// ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
//   receive events 
// ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


function newDrawing(data){
       noStroke(); 
       fill(50,200,random(150,255),50);
       ellipse(data.x,data.y, random (10,30));
          
//// add sound          
       let freq = map (mouseX, 0, width,40,880);
       osc2.freq(freq);
  
       let amplitude = map (mouseY, 0, height, 0.9, 0.01);
       osc2.amp(amplitude);
}



// ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
//   create a brush 
// ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

function mouseDragged (){
       console.log('sending:' + mouseX + ',' + mouseY);
          //content of data, give a name
   var data = {
             x: mouseX,
             y: mouseY
   }
   
   socket.emit ('mouse', data);
       noStroke(); 
       fill(255,0,random(50,150),50);
       ellipse(mouseX,mouseY, random (10,30));
    
//// add sound 
          
       let freq = map (mouseX, 0, width,40,880);
       osc1.freq(freq);
  
       let amplitude = map (mouseY, 0, height, 0.9, 0.01);
       osc1.amp(amplitude);
          
}


//// add sound 
function mousePressed (){
  play = true;
  osc1.start();
  osc2.start();
}

//// add sound 

function mouseReleased(){
  play = false;
  osc1.stop();
  osc2.stop();
}