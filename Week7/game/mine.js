class Mine {
    constructor(x, y,type,radius) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.radius = radius;
    }
    static generateMine(){
      let ram = random(5);
      let x = random(20,width-20);
      let y = random(100,height-40);
      if(ram<1){
        return new Mine(x,y,"diamond",20);
      }else if(ram<3){
        return new Mine(x,y,"gold",40);
      }else {
         return new Mine(x,y,"stone",50);
      }
    }
    drawMine() {
      switch (this.type) {
        case "gold":
          fill(200,200,0);
          ellipse(this.x,this.y,this.radius,this.radius);
          return;
        case "diamond":
          fill(200,200,200);
          ellipse(this.x,this.y,this.radius,this.radius);
          return;
        case "stone":
          fill(50,50,50);
          ellipse(this.x,this.y,this.radius,this.radius);
          return;
      }
    }
    
  }
  