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
let PreScript;
let Script;

var Shape = ['Square', 'Circle', 'Triangle', 'Text','Num'];
var StartColor='#ff0000';
var EndColor='#0000ff';
var LineColor ='#000000';
var PercentShift=0.1;
var Pen=true;
var BiggerPen = true;
var speed=300;
var Size = 20;
var Distance = 5;
var BackgroundColor = '#000000';
var Lines = false;
var LineSameasShape = true;


var SizeMax = 100;
var SizeMin = 1;
var SizeStep = 0.1;

var DistanceMax = 10;
var DistanceMin = 0;
var DistanceStep = 0.1;

var PercentShiftMax=0.1;
var PercentShiftMin=0;
var PercentShiftStep=0.001;

var speedMin=0;
var speedMax=1000;
var speedStep=25;



var gui;
//Loading text file;
function preload(){
 PreScript = loadStrings("Script.txt");
}
 
function setup(){
  
    createCanvas(windowWidth,windowHeight);
 //Creates Gui and parses array of text, runs only once per site load;
 if(hoho==true){
  gui = createGui('Life?Naaaaaah');
  gui.addGlobals('Size', 'Distance', 'speed', 'PercentShift', 'Pen', 'BiggerPen', 'StartColor', 'EndColor', 'BackgroundColor', 'LineColor', 'Shape', 'Lines', 'LineSameasShape');
  Script = split(PreScript[0], ' ');
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
store = new Array(num).fill(0);

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
//Calls to neighbours logic function every speed ms and draws resultant array;
function refresh(){


  play=1;

  f=neighbours(f);
  background(BGC);
  DrawShape(xy,f); 
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
    DrawShape(xy,f);
  }  
}

    
function keyPressed(){
  
//Start iterations;
  if(key == ' '){
    
    if(www==0){
      www=1;
      setTimeout(refresh,speed);
    }
    else if(www==1){
      www=0;
    }
  }

    
 //Speed+;
  if(key == 'd'){
    speed=abs(speed-50);
  }
 //Speed-;
    if(key == 'a'){
    speed=abs(speed+50);
  }
 //1st press- Return grid to pre iteration state;
 //2nd press- Refresh grid (resets all values);
 //Note - If any iterations are run between press 1 and 2, cycle is reset (refresh sets play=1);
  if(key=='r'){
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
   f= new Array(num);
    f=store;
    Color=Array2D(num,5);
    DrawShape(xy,f);
    play=0; 
  }
}
 //Set random layout of live cells:
  if(key=='e'){
      for(let i = 0;i<num;i++){
    if(f[i]==0){
    f[i]=round(random(0,1));
    }

}
    store=f;
    DrawShape(xy,f);

}
 //Toggle Heatmap;
  if(key=='w'){
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
    
    DrawShape(RefCol,ftemp);
  }
  }
 //Convert hex color value (from gui) to rgb;   
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

//nightmarenightmarenightmare- Obtains coordinates of each cell to make a centered grid;
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
//Drawing live cells (all cells with a value of 1 in on[] array);
function DrawShape(Cell,on){
 rectMode(CENTER);
 textAlign(CENTER);
 let r;
 let q;

  if(Shape=='Num'){
   textSize(20);
  }
 if(Lines==true && heatmap==0){
    for(let i = 0; i<num;i++){
        if(on[i]==1){
           r=xy[i][0];
           q=xy[i][1];
           if(LineSameasShape==true){
            stroke(Cell[i][2],Cell[i][3],Cell[i][4]);
           }
           else{
            stroke(LineColor);
           }
           line(r,q,w/2,h/2);
        }
    }
 }
 //drawing shape;
    for(let i = 0; i<num;i++){
          fill(Cell[i][2],Cell[i][3],Cell[i][4]);
             if(on[i]==1){
              r=xy[i][0];
              q=xy[i][1];              
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
               case 'Text':
               text(Script[i],r,q,size,size);
               break;
               case 'Num':
                noStroke();
                text(int(random(0,9)),r,q,size,size);
                break;
             }
             }
            

            }
            
        }
    

//Returns array of live cells (Tempf) given array of live cells in previous instance (boom);

  function neighbours(boom){
    let state;
    let Tempf = new Array(num);
   
    for(let i = 0;i<numx;i++){
      for(let j = 0; j<numy;j++){

        state=0;
       //Cycling through columns (i+re) and rows (j+pe), totalling the number of live neighbours (state);
         
         for(let re = -1; i+re>=0 && i+re<numx && -1<=re && re<=1;re++){
           for(let pe = -1; j+pe>=0 && j+pe<numy && -1<=pe && pe<=1;pe++){
             
           if(abs(re)+abs(pe)!=0){
           state=state+
           boom[((j+pe)*numx)+(i+re)];
           }
           
           }
         } 
//changing cell state based off # of live neighbours;
    if(state!=0){
     print(state);
    }
    if(boom[j*numx+i]==1){
        if(state<2||state>3){
          Tempf[j*numx+i] = 0;
           }
          else{
            Tempf[j*numx+i] = 1;
          }
        }
    else if(boom[j*numx+i]==0){
      if(state==3){

        Tempf[j*numx+i]=1;
       //Sets color of cell in next instance;       
        xy[j*numx+i][2]=xy[j*numx+i][2]+(percentchange*(EndR-xy[j*numx+i][2]));
        xy[j*numx+i][3]=xy[j*numx+i][3]+(percentchange*(EndG-xy[j*numx+i][3]));
        xy[j*numx+i][4]=xy[j*numx+i][4]+(percentchange*(EndB-xy[j*numx+i][4]));
       //Sets color of cell in heatmap;
        Color[j*numx+i][2]=Color[j*numx+i][2]+(percentchange*(EndR-Color[j*numx+i][2]));
        Color[j*numx+i][3]=Color[j*numx+i][3]+(percentchange*(EndG-Color[j*numx+i][3]));
        Color[j*numx+i][4]=Color[j*numx+i][4]+(percentchange*(EndB-Color[j*numx+i][4]));
      }
      else{
        Tempf[j*numx+i]=0;
      }
    }
    
      }
  }
  return Tempf;
      }
