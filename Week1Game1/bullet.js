class Bullet {
    constructor(x, y, targetX, targetY) {
      this.x = x;
      this.y = y;
      this.speed = 10;
      this.targetX = targetX;
      this.targetY = targetY;
      this.heading = atan2(this.targetY - this.y, this.targetX - this.x);
      this.velocity = p5.Vector.fromAngle(this.heading);
      this.velocity.mult(this.speed);
    }
  
    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  
    show() {
      fill(255, 0, 0);
      ellipse(this.x, this.y, 10, 10);
    }
  
    isOffscreen() {
      return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
    }
    
    hits(enemy) {
        let d = dist(this.x, this.y, enemy.x, enemy.y);
        if (d < 20 && !enemy.isOffscreen()){
            score++;
            if(score>30){
                undateFrequency = 30;
            }else if(score>10){
                undateFrequency = 60;
            }
        }
        return d < 20;
    } 
  }