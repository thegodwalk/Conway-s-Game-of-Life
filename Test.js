 let h;
 let w;

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
 let hoho=false;
let boom;
let store;
let play;
let www;

let Array2D = (r,c) => [...Array(r)].map(x=>Array(c).fill(0));
let Cell0R=0;
let Cell0G=0;
let Cell0B=0;
let Cell1R=255;
let Cell1G=173;
let Cell1B=204;
let heatmap;

var StartColor=[Cell0R,Cell0G,Cell0B];
var EndColor=[Cell1R,Cell1G,Cell1B];
var percentchange=0.1;
var pen=1;
var pensize=1;
var speed=500;
var size = 20;
var dis = 5;
var bgColor = [255,255,255];


var sizeMax = 500;
var sizeMin = 0;
var sizeStep = 1;

var disMax = 40;
var disMin = 0;
var disStep = 0.5;

var percentchangeMax=1;
var percentchangeMin=0;
var percentchangeStep=0.05;

var penMax=1;
var penMin=0;
var penStep=1;

var pensizeMin=0;
var pensizeMax=1;
var pensizeStep = 1;

var speedMin=0;
var speedMax=5000;
var speedStep=100;



var gui;
 
function setup(){
  
    createCanvas(windowWidth,windowHeight);
   gui = createGui('LifeNaaaaaah');
  gui.addGlobals('percentchange', 'bgColor', 'size', 'dis', 'pen', 'pensize');
    background(bgColor);
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
xy = getcoords();
for(let i = 0;i<num;i++){
  xy[i][2]=Cell0R;
  xy[i][3]=Cell0G;
  xy[i][4]=Cell0B;
}
play=0;
  www=0;
  heatmap=0;


}

function refresh(){


  play=1;

  neighbours(f);
    
    background(bgColor);

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
  if(pensize==0){
    if(0<mouseX && mouseX<w && 0<mouseY && mouseY<h){
    g =round((mouseX-(sepx+0.75*dis)*scax)/sep);
    b =round((mouseY-(sepy+0.75*dis)*scay)/sep);
      r = ((b)*numx)+(g);
    f[r]=pen;``
    store[r]=pen;
    }
  }
   else if(pensize==1){
  
  if(0<mouseX && mouseX<w && 0<mouseY && mouseY<h){
    g =round((mouseX-(sepx+0.75*dis)*scax)/sep);
    b =round((mouseY-(sepy+0.75*dis)*scay)/sep);
             for(let re = -1; b+re>=0 && b+re<numy && -1<=re && re<=1;re++){
           for(let pe = -1; g+pe>=0 && g+pe<numx && -1<=pe && pe<=1;pe++){
    r = ((b+pe)*numx)+(g+re);
    f[r]=pen;``
    store[r]=pen;
           }
             }
  }
   }
                         createCanvas(windowWidth,windowHeight);
    background(bgColor);
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
     stroke(0);
  if(play==0){
    setup();
  }
  if(play==1){    
    createCanvas(windowWidth,windowHeight);
    background(bgColor);
    for(let i = 0;i<num;i++){
      xy[i][2]=0;
      xy[i][3]=0;
      xy[i][4]=0;
    }
    f=store;
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
    let Color=Array2D(num,5);
    let ftemp=new Array(num).fill(1);
    if(heatmap==0){
      let totbright;
        for(let i = 0;i<num;i++){
          totbright = (xy[i][2]+xy[i][3]+xy[i][4])+1;
        Color[i][4]=255-((xy[i][3]+xy[i][2])/2);
        Color[i][3]=255-((xy[i][4]+xy[i][2])/2);
        Color[i][2]=255-((xy[i][4]+xy[i][3])/2);
      }
        noStroke();
        heatmap=1;
    }
    else{
      Color=xy;
      ftemp=f;
      stroke(0);
      heatmap=0;
    }
    createCanvas(windowWidth,windowHeight);
    background(bgColor);
    
    DrawSquare(Color,ftemp);
  }
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
            rect(r,q,size,size);
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
        xy[j*numx+i][2]=xy[j*numx+i][2]+(percentchange*(Cell1R-xy[j*numx+i][2]));
        xy[j*numx+i][3]=xy[j*numx+i][3]+(percentchange*(Cell1G-xy[j*numx+i][3]));
        xy[j*numx+i][4]=xy[j*numx+i][4]+(percentchange*(Cell1B-xy[j*numx+i][4]));
      }
      else{
        f[j*numx+i]=0;
      }
    }
    
      }
  }
  return f;
      }
