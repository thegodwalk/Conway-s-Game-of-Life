let h;
 let w;
 let dis;
 let size;
 let percentchange;
 let sep;
 let numy;
 let numx;
 let num;
 let wow;
 let f;
 let xy;
 let x;
 let y;
 let g;
 let b;
 let r;
 let sepx;
 let sepy;
 let scax;
 let scay;
 let hoho=true;
let boom;
let store;
let play;
let www;
let StartR;
let StartG;
let StartB;
let EndR;
let EndG;
let EndB;
let BGR;
let BGG;
let BGB;
let Color;
let Array2D = (r,c) => [...Array(r)].map(x=>Array(c).fill(0));
let heatmap;

var client = new XMLHttpRequest();
client.open('GET', '/Script.txt');
const Script = client.response.split(" ");

var Shape = ['Circle', 'Square', 'Triangle', 'Lines'];
var StartColor='#000000';
var EndColor='#ffffff';
var PercentShift=0.1;
var Pen=false;
var BiggerPen = true;
var speed=500;
var Size = 20;
var Distance = 5;
var BackgroundColor = '#ffffff';


var SizeMax = 500;
var SizeMin = 0;
var SizeStep = 1;

var DistanceMax = 40;
var DistanceMin = 0;
var DistanceStep = 0.5;

var PercentShiftMax=1;
var PercentShiftMin=0;
var PercentShiftStep=0.05;

var speedMin=0;
var speedMax=1000;
var speedStep=25;



var gui;
 
function setup(){
  
    createCanvas(windowWidth,windowHeight);
 if(hoho==true){
  gui = createGui('Life?Naaaaaah');
  gui.addGlobals('Size', 'Distance', 'speed', 'PercentShift', 'Pen', 'BiggerPen', 'StartColor', 'EndColor', 'BackgroundColor', 'Shape');
  hoho=false;
 }
    dis=Distance;
  size=Size;
  percentchange=PercentShift;
  BGC=BackgroundColor;
    background(BackgroundColor);
h = windowHeight;
w = windowWidth;
sep = size+dis;
numy = floor(h/sep);
numx = floor(w/sep);
num=numx*numy;
f = new Array(num).fill(0);
store = new Array(num);

sepx=((w-(numx*sep)));
sepy=((h-(numy*sep)));
scax=(w-(sepx+dis))/w;
scay=(h-(sepy+dis))/h;
boom = new Array(num);
Color=Array2D(num,5);
xy = getcoords();
  StartR=hexToRgb(StartColor).r;
  StartG=hexToRgb(StartColor).g;
  StartB=hexToRgb(StartColor).b;
  EndR=hexToRgb(EndColor).r;
  EndG=hexToRgb(EndColor).g;
  EndB=hexToRgb(EndColor).b;
  BGR=hexToRgb(BackgroundColor).r;
  BGG=hexToRgb(BackgroundColor).g;
  BGB=hexToRgb(BackgroundColor).b;
  
for(let i = 0;i<num;i++){
  xy[i][2]=StartR;
  xy[i][3]=StartG;
  xy[i][4]=StartB;
  Color[i][2]=BGR;
  Color[i][3]=BGG;
  Color[i][4]=BGB;
}

  
play=0;
  www=0;
  heatmap=0;


}

function refresh(){


  play=1;

  neighbours(f);
    
    background(BGC);

    DrawSquare(xy,f);
  
if(www==1){
 setTimeout(refresh,speed);
}

  
}
function windowResized() {
  setup();
}

function draw(){
  
if(mouseIsPressed==true){
  if(BiggerPen==false){
    if(0<mouseX && mouseX<w && 0<mouseY && mouseY<h){
    g =round((mouseX-(sepx+0.75*dis)*scax)/sep);
    b =round((mouseY-(sepy+0.75*dis)*scay)/sep);
      r = ((b)*numx)+(g);
    f[r]=Pen;``
    store[r]=Pen;
    }
  }
   else if(BiggerPen==true){
  
  if(0<mouseX && mouseX<w && 0<mouseY && mouseY<h){
    g =round((mouseX-(sepx+0.75*dis)*scax)/sep);
    b =round((mouseY-(sepy+0.75*dis)*scay)/sep);
             for(let re = -1; b+re>=0 && b+re<numy && -1<=re && re<=1;re++){
           for(let pe = -1; g+pe>=0 && g+pe<numx && -1<=pe && pe<=1;pe++){
    r = ((b+pe)*numx)+(g+re);
    f[r]=Pen;``
    store[r]=Pen;
           }
             }
  }
   }
                         createCanvas(windowWidth,windowHeight);
    background(BGC);
    DrawSquare(xy,f);
  }  
}

    
function keyPressed(){
  

  if(key=='u'){
    
    if(www==0){
      www=1;
      setTimeout(refresh,speed);
    }
    else if(www==1){
      www=0;
    }
  }

    
  
  if(keyCode == LEFT_ARROW){
    speed=abs(speed-100);
  }
    if(keyCode == RIGHT_ARROW){
    speed=abs(speed+100);
  }
  if(keyCode==BACKSPACE){
  if(play==0){
    setup();
  }
  if(play==1){    
    createCanvas(windowWidth,windowHeight);
    background(BGC);
    for(let i = 0;i<num;i++){
      xy[i][2]=StartR;
      xy[i][3]=StartG;
      xy[i][4]=StartB;
    }
    f=store;
    Color=Array2D(num,5);
    DrawSquare(xy,f);
    play=0; 
  }
}
  if(key=='r'){
      for(let i = 0;i<num;i++){
    if(f[i]==0){
    f[i]=round(random(0,1));
    }

}
    store=f;
    DrawSquare(xy,f);

}
  if(key=='a'){
    let RefCol=Array2D(num,5);
    let ftemp=new Array(num).fill(1);
    if(heatmap==0){
        RefCol=Color;
        heatmap=1;
    }
    else{
      RefCol=xy;
      ftemp=f;
      heatmap=0;
    }
    createCanvas(windowWidth,windowHeight);
    background(BGC);
    
    DrawSquare(RefCol,ftemp);
  }
  }
    
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}



  








function getcoords(){
    

    

     xy = Array2D(num,5);
    

      for(let i = 0;i<numy;i++)
      {
        for(let q = 0;q<numx;q++){
          xy[(i)*numx+(q)][0]=((q*size+q*dis)-(dis*0.75))+(sepx/2+sep/2);
          xy[(i)*numx+(q)][1]=((i*size+i*dis)-(dis*0.75))+(sepy/2+sep/2);



   
           
      
      
      }
      
    


    
    


}
return xy;
}

function DrawSquare(Cell,on){
    rectMode(CENTER);
    
    let e = 0;
    let r;
    let q;
    for(let i = 0; i<num;i++){
          r=xy[i][0];
          q=xy[i][1];
          fill(Cell[i][2],Cell[i][3],Cell[i][4]);
            if(on[i]==1){
             switch(Shape){
              case 'Circle':
                noStroke();
                ellipse(r,q,size,size);
                break;
              case 'Triangle':
               noStroke();
               triangle(r-size/2,q+size/2,r+size/2,q+size/2,r,q-size/2);
               break;
              case 'Square':
               noStroke();
               rect(r,q,size,size);
               break;
              case 'Lines':
               stroke(Cell[i][2],Cell[i][3],Cell[i][4]);
               line(w/2,h/2,r,q);
               break;
             }
            }
            
        }
    }



  function neighbours(boom){
    let state;
    f = new Array(num);
   
    for(let i = 0;i<numx;i++){
      for(let j = 0; j<numy;j++){

        state=0;
         
         for(let re = -1; i+re>=0 && i+re<numx && -1<=re && re<=1;re++){
           for(let pe = -1; j+pe>=0 && j+pe<numy && -1<=pe && pe<=1 && abs(re)+abs(pe)!=0;pe++){
             
           
           state=state+
           boom[((j+pe)*numx)+(i+re)];
           
           }
         } 

    
    if(boom[j*numx+i]==1){
        if(state<2||state>3){
          f[j*numx+i] = 0;
           }
          else{
            f[j*numx+i] = 1;
          }
        }
    else if(boom[j*numx+i]==0){
      if(state==3){
        f[j*numx+i]=1;
        xy[j*numx+i][2]=xy[j*numx+i][2]+(percentchange*(EndR-xy[j*numx+i][2]));
        xy[j*numx+i][3]=xy[j*numx+i][3]+(percentchange*(EndG-xy[j*numx+i][3]));
        xy[j*numx+i][4]=xy[j*numx+i][4]+(percentchange*(EndB-xy[j*numx+i][4]));
        Color[j*numx+i][2]=Color[j*numx+i][2]+(percentchange*(EndR-Color[j*numx+i][2]));
        Color[j*numx+i][3]=Color[j*numx+i][3]+(percentchange*(EndG-Color[j*numx+i][3]));
        Color[j*numx+i][4]=Color[j*numx+i][4]+(percentchange*(EndB-Color[j*numx+i][4]));
      }
      else{
        f[j*numx+i]=0;
      }
    }
    
      }
  }
  return f;
      }
