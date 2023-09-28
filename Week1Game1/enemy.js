class Enemy {
    constructor(x,y,type,velocity,speed,damage,enable_shoot,isHit) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.velocity = velocity;
        this.speed = speed;
        this.damage = damage;
        this.enable_shoot = enable_shoot;
        this.isHit = false;
    }
    static createRandomFromSide() {
        let x,y;
        let velocity;
        let side = floor(random(4));
        if(side==0)//up
        {
            x = random(width);
            y = -20;
            velocity = createVector(0,1);
        }
        if(side==1)//down
        {
            x = random(width);
            y = height+20;
            velocity = createVector(0,-1);
        }
        if(side==2)//left
        {
            x = -20;
            y = random(height);
            velocity = createVector(1,0);
        }
        if(side==3)//right
        {
            x = width+20;
            y = random(height);
            velocity = createVector(-1,0);
        }
        if(random(5)>=3){
            console.log("a");
            return new Enemy(x, y, "a", velocity, 2, 1,false,false);
        }else if(random(5)>=2){
            console.log("b");
            return new Enemy(x, y, "b", velocity, 1, 1,false,false);
        }else if(random(5)>=2){
            console.log("c");
            return new Enemy(x, y, "c", velocity, 1, 2,false,false);
        }
    }
    
    update() {
        this.x += this.velocity.x*this.speed;
        this.y += this.velocity.y*this.speed;
    }
  
    show() {
        if (!this.isHit) {
            fill(255, 0, 0);
            ellipse(this.x, this.y, 30, 30);
        }
    }
  
    isOffscreen() {
        return (this.x < -20 || this.x > width + 20 || this.y < -20 || this.y > height + 20);
    }
  
    hits(player) {
      let d = dist(this.x, this.y, player.x + 25, player.y + 25);
      return d < 30;
    }
  }