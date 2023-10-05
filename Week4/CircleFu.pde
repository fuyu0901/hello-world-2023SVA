class CircleFu
{
  float x;
  float y;
  float r = 5;
  color col;
  boolean canGrow = true;
  //boolean overlap = false;
  
  CircleFu(float _x,float _y, int _r,color _col)
  {
    x = _x;
    y = _y;
    r = _r;
    col = _col;
  }
  
   void gradient(float x2,float y2,float rs)
  {
    color pix = col;
    //color pix1 = color(int(hue(pix)), int(saturation(pix)),int(brightness(pix)));
    color pix2 = color(int(random(360)),100,int(random(50,100)));
    color pix1 = color(int(random(360)),100,int(random(50,100)));
    color pix3 = lerpColor(pix1,pix2,0.5);
    //color pix4 = color(hue(pix3),saturation(pix3),brightness(pix3));
    createLineElipse(x+x2,y+y2,rs*r,rs*r,pix,pix2);
  } 
  
  void show(float x2,float y2,float rs)
  {
    color pix = col;
    float pixH = hue(pix);
    float pixH2=(pixH+random(-100,100))%360;
    //color pix1 = color(int(hue(pix)), int(saturation(pix)),int(brightness(pix)));
    color pix2 = color(pixH2,int(random(100)),int(random(50,100)));
    color pix3 = lerpColor(pix,pix2,0.5);
    //color pix4 = color(hue(pix3),saturation(pix3),brightness(pix3));
    //fill(pix3);
    fill(pix3);
    //drawTarget(x,y,r,loopnum,col);
    ellipse(x+x2, y+y2, r*(sqrt(rs)), r*(sqrt(rs)));
  }

}

void drawTarget(float xloc, float yloc, float size, int num, color colo)
{
  color pix = colo;
  float pixH = hue(pix);
  float pixS = saturation(pix);
  float pixB = brightness(pix);
  float steps = size/num;

  for (int i = 0; i < num; i++) 
  {
    //float angel = cos(0.1);
    float inner = map(i, 0, num, 0, 1);
    //float pixH2=(pixH+10)%360; //<>// //<>//
    color pix1 = color(int(pixH), int(pixS),int(pixB));
    color pix2 = color(int(pixH),int(pixS),int(pixB)); 
    color pix3 = lerpColor(pix,pix2,0.2);
    //color pix4 = color(hue(pix3),saturation(pix3),brightness(pix3));
    //float ransize =random(0.7,1.2);
    fill(pix3);
    ellipse(xloc+random(-1,1)*steps, yloc+random(-1,1)*steps, (size - i*steps)*(1.1-inner), (size - i*steps)*(1.1-inner));
    //rotate(0.01);
  }
  
  
}
