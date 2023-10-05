class Player {
    constructor() {
        // default position
        this.x = width / 2;
        this.y = height/2;
    }

    update() {
        //use keyboard as an input
        if (keyIsDown(UP_ARROW)||keyIsDown(87)) {
            player.y -= 5;
          }
          if (keyIsDown(DOWN_ARROW)||keyIsDown(83)) {
            player.y += 5;
          }
          if (keyIsDown(LEFT_ARROW)||keyIsDown(65)) {
            player.x -= 5;
          }
          if (keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
            player.x += 5;
          }
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