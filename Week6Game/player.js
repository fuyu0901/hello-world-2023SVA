class Player {
    constructor() {
        // default position
        this.x = width / 2;
        this.y = height/2;
    }

    update() {
        //use keyboard as an input
        
        if (keyIsDown(UP_ARROW)||keyIsDown(87)) {
            player.y -= playerSpeed;
          }
          if (keyIsDown(DOWN_ARROW)||keyIsDown(83)) {
            player.y += playerSpeed;
          }
          if (keyIsDown(LEFT_ARROW)||keyIsDown(65)) {
            player.x -= playerSpeed;
          }
          if (keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
            player.x += playerSpeed;
          }
          this.x = constrain(this.x,playerSize/2,width-playerSize/2);
          this.y = constrain(this.y,playerSize/2,height-playerSize/2);
    }
  
    show() {
      fill(0, 0, 255);
      rect(this.x, this.y, playerSize, playerSize);
    }
  
    shoot() {
        let bullet = new Bullet(this.x + 25, this.y, mouseX, mouseY);
        bullets.push(bullet);
      
    }
  }