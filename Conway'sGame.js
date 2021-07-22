 let h;
 let w;
 let size;
 let dist;
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
let speed;
let Array2D = (r,c) => [...Array(r)].map(x=>Array(c).fill(0));
let heatmap;

 
function setup(){
    createCanvas(1000,1000);
    background(255);
h = 1000;
w = 1000;
size=1;
dist=2;
sep = size+dist;
numy = floor(h/sep);
numx = floor(w/sep);
num=numx*numy;
f = new Array(num).fill(0);
store = new Array(num);

sepx=((w-(numx*sep))/2)+size/2;
sepy=((h-(numy*sep))/2)+size/2;
scax=(w-sepx)/w;
scay=(h-sepy)/h;
boom = new Array(num);
xy = getcoords();
for(let i = 0;i<num;i++){
  xy[i][2]=0;
  xy[i][3]=0;
  xy[i][4]=0;
}
play=0;
  www=0;
  speed=500;
  heatmap=0;
  


}
function refresh(){


  play=1;

  neighbours(f);
    
    background(255);

    DrawSquare(xy,f);
  
if(www==1){
 setTimeout(refresh,speed);
}

  
}

function draw(){
  
if(mouseIsPressed==true){
  if(0<mouseX && mouseX<w && 0<mouseY && mouseY<h){
    g =round((mouseX*scax)/sep);
    b =round((mouseY*scay)/sep);
    r = (b*numx)+g;
    f[r]=1;
    store[r]=1;
    DrawSquare(xy,f);
  }
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
    createCanvas(1000,1000);
    background(255);
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
    f[i]=round(random(0,1));

}
    store=f;
    DrawSquare(xy,f);

}
  if(key=='a'){
    let Color=Array2D(num,5);
    let ftemp=new Array(num).fill(1);
    if(heatmap==0){
      
        for(let i = 0;i<num;i++){
        Color[i][4]=255-xy[i][2];
        Color[i][3]=255-xy[i][2];
        Color[i][2]=255;
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
    createCanvas(1000,1000);
    background(255);
    
    DrawSquare(Color,ftemp);
  }
  }
    


  








function getcoords(){
    

    

     xy = Array2D(num,5);
    

      for(let i = 0;i<numy;i++)
      {
        for(let q = 0;q<numx;q++){
          xy[i*numx+q][0]=q*sep+sepx;
          xy[i*numx+q][1]=i*sep+sepy;



   
           
      
      
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
        xy[j*numx+i][2]=xy[j*numx+i][2]+25;
      }
      else{
        f[j*numx+i]=0;
      }
    }
    
      }
  }
  return f;
      }
      
 
  