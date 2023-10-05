CircleFu c;

//int num = 3000, large = 5;
ArrayList<CircleFu> circles;
ArrayList<Point> points;
ArrayList<Point> points2;
//ArrayList<color> gradient;
PImage img;
PGraphics pg;
int name = 0;
int largeSize, smallSize;
int gap = 2;
int loopnum =10;
float rs = 0;
float cx,cy,cx2,cy2,cx3,cy3,cx4,cy4;
float delta =0;
float xs = 0.1;
float ys = 0.1;
color col1;
color c1,c2,c3,c4,cc;
float ratio;
boolean plong;
boolean generateB = false;
float increment = 0.02;

void setup()
{
  size(3560,2000); 
  imageMode(CENTER);
  colorMode(HSB,360,100,100,100);
  ellipseMode(RADIUS);
  noStroke(); 
  smallSize = 2;
  largeSize = 30;
  noiseDetail(10,0.1);
  pg = createGraphics(width, height);
  pg.noStroke();
  loadpix();
  points = new ArrayList<Point>();
  points2 = new ArrayList<Point>();
  //pointSetup();
  
}
void preset()
{
  background(0,0,0);
  noStroke();
  img = loadImage("paintings/f"+name+".jpeg"); 
  //img = loadImage("f1.png"); 
  circles = new ArrayList<CircleFu>();
  ratio = float(img.height)/float(img.width);
  println(name);
   //yuan
   //if(img.width>img.height){  
   // plong=true;
   //img.resize(int(width*ratio),0);
   //}else{ 
   //plong=false;;
   //img.resize(width,0);
   //} 
   //normal
  
  //size(2000,int(2000*ratio)); 
  img.resize(width,int(width*ratio));
  createCircles(10,60,20);
  for(int i=0;i<100;i++)
  {
    createCircles(smallSize,largeSize,1000);
  }
  //save("spots0.tif");
  loop();
  rs = 1; 
  
  
}
void loadpix(){
  //img2.loadPixels();
  pg.beginDraw();
  pg.noStroke();
  float h = random(250);
  float b = random(90);
  pg.background(color(h,30,b));
  for (int x = 0; x <8000; x++) {
    
    cc = color((h+random(-50,50))%360,random(80),(b+random(-50,50))%100,random(50));
    float x0 =random(width);
    pg.fill(cc);
    pg.ellipse(x0,random(height),random(100),random(100));
  
  }
  pg.endDraw();
   image(pg, width/2, height/2);
   generateB = true;

}

void draw()
{
  
  // drawpoint();
  
  if(generateB == true ){
  
    if(name==0) {
      
      name +=1;
      preset();
    }
    if(rs ==1){
      background(0,0,0);
    }
    if(rs ==0.94){
      save("spoting"+rs+".tif");
    }  
    if(rs ==0.52){
      save("spoting"+rs+".tif");
    }
    if(rs<0)
    { 
      for (CircleFu c : circles)
        {
        c.gradient(xs,ys,random(0.5));
  
       }
      save("spoting"+rs+".tif");
      noLoop();
  
    }else{
       rs-=0.06;
       xs=random(-1,1);
       ys=random(-1,1);
       showCircle();
    }
  
  
  
  }

  
  
   
}
void showCircle()
{
  for (CircleFu c : circles)
  {
    c.show(xs,ys,rs);

  }
}
void gradientCircle()
{
  for (CircleFu c : circles)
  {
    c.gradient(xs,ys,rs);

  }
}

void  createCircle(int size1,int size2)
{
  boolean canCreate = true;
  // yuan de random
  //float m = random(TWO_PI);
  //float b = random(width/2-largeSize);
  //float x = cos(m)*b+(width/2);
  //float y = sin(m)*b+(width/2);
  //zhengchang
  float x =  random(width);
  float y =random(height);
  int r = int(map(random(1),0,1,size1,size2));
  for(CircleFu c:circles)
  {
    float d = dist(x,y,c.x,c.y);
    if(d<c.r+r+gap)
    {
      canCreate = false;
    }
  }
  if(canCreate)
  {
    color pix;
    if (plong){
     float x2 = x+(img.width-width)/2;
      pix = img.get(int(x2), int(y));
    }else{
     float y2 = y+(img.width-height)/2;
      pix = img.get(int(x), int(y2));
    }
    
    //suiji
    //if(random(1)>0.9){
    //  pix = color(random(360),random(100),random(100));
    //}else{
    //  pix = pg.get(int(x),int(y));
    //}
    
    
    CircleFu a = new CircleFu(x,y,r,pix);
    circles.add(a);
  }
   
}
void createLineElipse(float x,float y,float rx,float ry,color a1,color a2)
{
  float dense = 2;
  float angle =1;
  float offsetx = cos(-angle)*width;
  float offsety = sin(angle)*height;
  strokeWeight(dense);
  pushMatrix();
  translate(x,y);
  rotate(random(PI));
  //translate(offsetx,-offsety); 
    
  for(int i=0;i<2*ry*dense;i++)
  {  
    float a = i/dense;
    float pr = ry/rx;
    float l = sqrt(rx*rx-(rx-a)*(rx-a));
    float inter = map(i, 0,2*ry*dense, 0, 1); 
    color cc = lerpColor(a1,a2,inter);
    stroke(cc);
    line(-l, pr*a-ry, l, pr*a-ry);
    //line(x-l, pr*(y+a)-ry, x+l, pr*(y+a)-ry);
    
  }
  popMatrix();
    
}

void createCircles(int size1,int size2,int num)
{
  for(int i=0;i<num;i++)
  {
    createCircle(size1,size2);
  }
}

void mousePressed()
{ 
  delta =0;
  generateB = false;
  loadpix();
  drawpoint();
  name +=1;
  preset(); 
  save("spots"+name+".tif");
  

}

class Point
{
  float x;
  float y;
  float r = 5;
  color cm;
  
  Point(float _x,float _y, float _r,color _col)
  {
    x = _x;
    y = _y;
    r = _r;
    cm = _col;
  }
  void moveRound(){
    pg.beginDraw();
    pushMatrix();
    rotate(random(PI));
    pg.fill(cm);
    pg.noStroke();
    pg.ellipse(x,y,r,r);
    popMatrix();
    pg.endDraw();
  //image(pg, width/2, height/2);
  }
  
}
void pointSetup()
{
  for(int i=0;i<10;i++)
  {
     cx=random(100,width-100);
     cy=random(100,height-100);
     color cm = color((50+random(-30,30))%360,random(60),random(100),50);
     Point a = new Point(cx,cy,random(50,300),cm);
     points.add(a);
     
  }
    for(int i=0;i<30;i++)
  {
     cx=random(width);
     cy=random(height);
     color cm1 = color(random(0,360),random(50),random(80),50);
     Point b = new Point(cx,cy,random(5,40),cm1);
     points2.add(b);
     
  }
}
void pointmove()
{
   
   for (Point c : points)
  {
    c.x +=random(-60,60);
    c.y +=random(-60,60);
    c.moveRound();

  }

}
void pointmove2()
{
   
   for (Point c : points2)
  {
    c.x +=random(-100,100);
    c.y +=random(-100,100);
    c.moveRound();

  }

}

void drawpoint()
{
   
  if(delta <8 ){
  pointmove();
  image(pg, width/2, height/2);
  delta+=0.1;
  } else if (delta<20){
    pointmove2();
    image(pg, width/2, height/2);
    delta+=0.1;
   
  }else if ( generateB == false){
    save("spoting00.tif"); 
    generateB = true;
  } 

 }
