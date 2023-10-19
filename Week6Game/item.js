class Item {
    constructor(x, y,type,typeText) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.typeText = typeText;
      this.time = 0;
    }
  
    static generate() {
      let x = random(width);
      let y = random(height);
      let type =  floor(random(4));
      let typeText;
      if(type ==0){
        typeText = "Add Move Speed";
      }else if(type ==1){
        typeText = "Add Damage";
      }else if(type ==2){
        typeText = "Add ShotSpeed";
      }else if (type ==3){
      }  
      return new Item(x, y, type,typeText);
    }
  
    show() {
      if(this.type == 0){
        fill(255, 0, 255);
        rect(this.x, this.y, 40, 40);
      }
      if(this.type == 1){
        fill(40, 255, 255);
        rect(this.x, this.y, 40, 40);
      }
      if(this.type == 2){
        fill(255, 255, 0);
        rect(this.x, this.y, 40, 40);
      }
      if(this.type == 3){
        fill(255, 0, 0);
        rect(this.x, this.y, 40, 40);
      }
      
      
    }
  
    hits(player) {
      let d = dist(this.x, this.y, player.x, player.y);
      return d < 35;
    }
  
    applyEffect() {
      //moveSpeed
      if(this.type == 0){
        playerSpeed += 2;
      }
      //add damage
      if(this.type == 1){
        playerDamage += 10;
      }
      //add shotSpee
      if(this.type == 2){
        fireRate -=200;
      }
      //add "health
      if(this.type == 3){
        playerHealth++;
      }
    }
    RemoveEffect(){
      //moveSpeed
      if(this.type == 0){
        playerSpeed -=2;
      }
      //add damage
      if(this.type == 1){
        playerDamage -= 10;
      }
      //add shotSpee
      if(this.type == 2){
        fireRate +=200;
      }
      //add "health

    }
  }