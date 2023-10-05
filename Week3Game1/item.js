class Item {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    update() {
      this.y += 2;
    }
  
    show() {
      fill(0, 255, 0);a
      ellipse(this.x, this.y, 20, 20);
    }
  
    hits(player) {
      let d = dist(this.x, this.y, player.x + 25, player.y + 25);
      return d < 25;
    }
  
    applyEffect() {
      playerDamage += 5;
    }
  }