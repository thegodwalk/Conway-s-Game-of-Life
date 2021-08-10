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
let StateName = 'Play';
let Settings = false;
let created = false;
let Playbutton;
let button;
let button1;
let button2;
let hide = 0;
let PlaystateHeatmap;
let cnv;
let CanvasPressed;
let SaveSettings = false;
let shouldignore;
var Shape = ['Square', 'Circle', 'Triangle', 'Text','Num'];
var StartColor='#ff0000';
var EndColor='#0000ff';
var LineColor ='#000000';
var PercentShift=0.05;
var Pen=true;
var BiggerPen = true;
var speed=300;
var Size = 20;
var Distance = 2;
var BackgroundColor = '#000000';
var Lines = false;
var LineSameasShape = true;
var SaveNum = [1,2,3,4,5,6,7,8,9,10];
var IncludeSettings = true;


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
let buttonsize;

var gui;
//Loading text file;
function preload(){
 PreScript = loadStrings("Script.txt");
 store = new Array().fill(0);
}
 
function setup(){
  if (created==false){
   
  cnv = createCanvas(windowWidth,windowHeight); 
  cnv.elt.addEventListener("mousedown", function(){
    CanvasPressed = true;
  });
  cnv.elt.addEventListener("mouseup", function(){
    CanvasPressed = false;
  });
  created=true;
  }
  h = windowHeight;
  w = windowWidth;
  dis=Distance;
    
  size=Size;
  percentchange=PercentShift;
  BGC=BackgroundColor;
    background(BackgroundColor);

sep = size+dis;
numy = floor(h/sep);
numx = floor(w/sep);
num=numx*numy;
f = new Array(num).fill(0);


sepx=((w-(numx*sep)));
sepy=((h-(numy*sep)));
scax=(w-(sepx+dis))/w;
scay=(h-(sepy+dis))/h;
boom = new Array(num);
Color=Array2D(num,5);
xy = getcoords();
play=0;
  www=0;
  heatmap=0;

  PanelSetup();

  


 //Creates Gui and parses array of text, runs only once per site load;
 if(hoho==true){

     Playbutton = createButton('Play',StateName);
  buttonsize = Playbutton.size();
  Playbutton.position(0,0);
  Playbutton.mousePressed(function(){
    heatmap=0;
    ToggleIterations();
   

  }
    );
  gui = createGui(this,'Life?Naaaaaah', 'QuickSettings', 0,6*buttonsize.height);
  gui.addGlobals('Size', 'Distance', 'speed', 'PercentShift', 'Pen', 'BiggerPen', 'StartColor', 'EndColor', 'BackgroundColor', 'LineColor', 'Shape', 'Lines', 'LineSameasShape');
  SaveGui = createGui(this, 'Saves', 'QuickSettings', 100, 0);
  
  SaveGui.addGlobals('SaveNum', 'IncludeSettings')
  var container = SaveGui.CreateContainer();
  SaveGui.button('Load', function(){
    if(IncludeSettings==true){

      gui = gui.Load(String(SaveNum));
 
      }
      setup();
      
      let loadf=JSON.parse(localStorage.getItem("State"+String(SaveNum)));
      let loadx = localStorage.getItem("numx"+String(SaveNum));
      let loady = localStorage.getItem("numy"+String(SaveNum));
      let diffx = round((numx-loadx)/2);
      let diffy = round((numy-loady)/2);
      for(let i = 0;i<loadx;i++){
        for(let j = 0; j<loady;j++){
          if(i+diffx>0 && i+diffx<numx && j+diffy>0 && j+diffy<numy){
            f[((j+diffy)*numx+(i+diffx))]=loadf[j*loadx+i];
          }
        }
      }


      DrawShape(xy,f);
      loop();

  }, container);
  SaveGui.button('Save' , function(){
    if(IncludeSettings==true){
      gui.Save(String(SaveNum));
    }
    let jsonf = JSON.stringify(f);
    let jsonnumx = JSON.stringify(numx);
    let jsonnumy = JSON.stringify(numy);
    localStorage.setItem("State"+String(SaveNum), jsonf);
    localStorage.setItem("numx"+String(SaveNum), jsonnumx);
    localStorage.setItem("numy"+String(SaveNum), jsonnumy);


  }, container);
  gui.setHeight(h-(10*buttonsize.height));
  gui.hide();
  SaveGui.hide();
  Script = split(PreScript[0], ' ');
  button = createButton('Reset');
  button.position(0,buttonsize.height);
  button.mousePressed(function(){
    if(play==0){
     store = new Array(num).fill(0);
      setup();
    }
    else if(play==1){ 

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
  })

  button2 = createButton('HeatMap');
  button2.position(0,2*buttonsize.height);
  button2.mousePressed(function(){
    PlaystateHeatmap = www;
    www=0;
    Playbutton.elt.innerHTML = 'Play';
    setTimeout(ToggleHeatmap, speed+10);
    
  }
    );


  button1 = createButton('Settings');
  button1.position(0,3*buttonsize.height);
  button1.mousePressed(function(){
    if(Settings==true){
    gui.hide();
    Settings=false;
    }
    else if(Settings==false){
      gui.show();
      Settings=true;
    }
    
  });
  button3 = createButton('Saves');
  button3.position(0,4*buttonsize.height);
  button3.mousePressed(function(){
    if(SaveSettings==true){
    SaveGui.hide();
    SaveSettings=false;
    }
    else if(SaveSettings==false){
      SaveGui.show();
      SaveSettings=true;
    }
    
  });


  hoho=false;
 }
 shouldignore=false;
    gui.setGlobalChangeHandler(function(){
   if(shouldignore == true){
     return;
   }
   shouldignore=true;
   setTimeout(() => {
    shouldignore = false;
}, 50);
    PanelSetup();
    background(BGC);
    DrawShape(xy,f);

  });



}
//Calls to neighbours logic function every speed ms and draws resultant array;
function refresh(){


  play=1;
  background(BGC);
  DrawShape(xy,f); 



  f=neighbours(f);


  if(www==1){
 setTimeout(refresh,speed);
  }
  
}
function PanelSetup(){
  if(www==0){
    if(play==0){
    StartR=hexToRgb(StartColor).r;
    StartG=hexToRgb(StartColor).g;
    StartB=hexToRgb(StartColor).b;
    EndR=hexToRgb(EndColor).r;
    EndG=hexToRgb(EndColor).g;
    EndB=hexToRgb(EndColor).b;
    BGR=hexToRgb(BackgroundColor).r;
    BGG=hexToRgb(BackgroundColor).g;
    BGB=hexToRgb(BackgroundColor).b;
    BGC=[BGR,BGG,BGB];
    

}
}
}
function windowResized() {

  createCanvas(windowWidth,windowHeight);
  setup();
}

function draw(){

if(CanvasPressed==true){
  if(BiggerPen==false){
    if((sepx-size/2)<mouseX && mouseX<(w-(sepx-0.75*dis)) && sepy<mouseY && mouseY<(h-sepy)){
    g =round((mouseX-(sepx+0.75*dis)*scax)/sep);
    b =round((mouseY-(sepy+0.75*dis)*scay)/sep);
      r = ((b)*numx)+(g);
    f[r]=Pen;
    if(play==0){
    store[r]=Pen;

    }
    }
  }
   else if(BiggerPen==true){
  
  if(0<mouseX && mouseX<(w-sepx) && 0<mouseY && mouseY<h){
    g =round((mouseX-(sepx+0.75*dis)*scax)/sep);
    b =round((mouseY-(sepy+0.75*dis)*scay)/sep);
             for(let re = -1; b+re>=0 && g+re<numx && -1<=re && re<=1;re++){
           for(let pe = -1; g+pe>=0 && b+pe<numy && -1<=pe && pe<=1;pe++){
    r = ((b+pe)*numx)+(g+re);
    f[r]=Pen;
    if(play==0){
    store[r]=Pen;
    }
           }
             }
  }
   }

   
  if(www==0){
    background(BGC);
   DrawShape(xy,f);
      }
  }  

}

    
function keyPressed(){
  if(key == 's'){
   if(Pen==0){
    Pen=1;
   }
   else if(Pen==1){
    Pen=0;
   }
  }
 if(key == 'b'){
   if(BiggerPen==false){
    BiggerPen=true;
   }
   else if(BiggerPen==true){
    BiggerPen=false;
   }
  }
//Start iterations;
  if(key == ' '){
    heatmap=0;
    ToggleIterations();
    

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
if(key == 'h'){

  if(hide == 0){
  Playbutton.elt.hidden=true;
  button.elt.hidden=true;
  button1.elt.hidden=true;
  button2.elt.hidden=true;
  button3.elt.hidden=true;
  gui.hide();
  SaveGui.hide();
  loop();
  hide=1;
  }
  else if(hide==1){
    Playbutton.elt.hidden=false;
    button.elt.hidden=false;
    button1.elt.hidden=false;
    button2.elt.hidden=false;
    button3.elt.hidden=false;
    if(Settings==true){
      gui.show();
    }
    if(SaveSettings==true){
      SaveGui.show();
    }
    hide=0;
  }
}

  if(key=='w'){
    www=0;
    Playbutton.elt.innerHTML = 'Play';
    setTimeout(ToggleHeatmap, speed+10);
  }
  }

  function ToggleIterations(){
  if(www==0){
    if(play==0){
      for(let i = 0;i<num;i++){
        xy[i][2]=StartR;
        xy[i][3]=StartG;
        xy[i][4]=StartB;
        Color[i][2]=BGR;
        Color[i][3]=BGG;
        Color[i][4]=BGB;
      }
    }
    www=1;
    loop();
    setTimeout(refresh,speed);
    Playbutton.elt.innerHTML = 'Pause';

  }
  else if(www==1){
    www=0;
    Playbutton.elt.innerHTML = 'Play';
  }
}
   //Toggle Heatmap;
  function ToggleHeatmap(){

    if(play==1){
    let RefCol=Array2D(num,5);
    let ftemp=new Array(num).fill(1);
    if(heatmap==0){
      noLoop();
        RefCol=Color;
        heatmap=1;


        
    }
    else if(heatmap==1){
      loop();
      RefCol=xy;
      ftemp=f;
      heatmap=0;

      if(PlaystateHeatmap==1){
        www=1;
        setTimeout(refresh,speed);
      };
    }
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


 if(Lines==true && heatmap==0){
  stroke(LineColor);
    for(let i = 0; i<num;i++){
        if(on[i]==1){
           r=xy[i][0];
           q=xy[i][1];
           if(LineSameasShape==true){
            if(play==1){
              stroke(Cell[i][2],Cell[i][3],Cell[i][4]);
          }
          else if(play==0){
            stroke(StartR,StartG,StartB);
          }
        }

           line(r,q,w/2,h/2);
        }
    }
 }
 if(Shape=='Num'){
 textSize(size);
 
 }
 //drawing shape;
    for(let i = 0; i<num;i++){
      if(play==1){
          fill(Cell[i][2],Cell[i][3],Cell[i][4]);
      }
      else if(play==0){
        fill(StartR,StartG,StartB);
      }
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
         
         for(let re = -1; i+re<numx && -1<=re && re<=1;re++){
           for(let pe = -1; j+pe<numy && -1<=pe && pe<=1;pe++){
             
           if(abs(re)+abs(pe)!=0 && i+re>=0 && j+pe>=0){
           state=state+
           boom[((j+pe)*numx)+(i+re)];
           }
           
           }
         } 

//changing cell state based off # of live neighbours;
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
