let screenW = 800;
let screenH = 800;

let updateFrequency = 80;
let player;
let playerSize = 50;
let bullets = [];
let enemies = [];
let items = [];
let itemsGot = [];

let itemGenerate = 0;
let playerHealth = 4;
let score = 0;
let playerSpeed = 5;
let playerDamage = 10;
let fireRate = 500; // 毫秒
let lastFireTime = 0;

function setup() {
  createCanvas(screenW, screenH);
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  player = new Player();
}

function draw() {
  background(0);
  updatePlayer();
  updateBullets();
  checkBulletHit();
  updateEnemies();
  updateItems();
  drawInformation();
  handleShooting();

}
// update and show the player
function updatePlayer() {
    player.update();
    player.show();
}
  
// update the bullet
function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].show();
      if (bullets[i].isOffscreen()) {
        bullets.splice(i, 1);
      }
    }
}
  
// update the enemies
function updateEnemies() {
    if (frameCount % updateFrequency === 0) {
        let newEnemy = Enemy.createRandomFromSide();
        if (newEnemy) {
          enemies.push(newEnemy);
        }
    }
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].update();
      enemies[i].show();
      if (enemies[i].isOffscreen()) {
        enemies.splice(i, 1);
      } else if (enemies[i].hits(player)) {
        enemies.splice(i, 1);
        playerHealth -= 1;
        if(playerHealth<0){
          isDead();
          noLoop();
        }
      }
    }

}
  
// update the items(couldn't fish before class :( )
function updateItems() {
   for (let i = itemsGot.length - 1; i >= 0; i--) {
      itemsGot[i].time++;
      if (itemsGot[i].time >= 600) {
        itemsGot[i].RemoveEffect();
        itemsGot.splice(i, 1);
      }
   }
  for (let i = items.length - 1; i >= 0; i--) {
    //items[i].update();
    items[i].show();
    items[i].time++;
    if (items[i].time >= 350) {
      items.splice(i, 1);
    } else if (items[i].hits(player)) {
      items[i].time = 0;
      if(items[i].type!=3){
        itemsGot.push(items[i]);
      }
      items[i].applyEffect();
      items.splice(i, 1);
    }
  }
}
  
// update HP
function drawInformation() {
  let itemOffset = 0;
    fill(255);
    textAlign(LEFT);
    textSize(24);
    text("Health: " + playerHealth, 40, 40);
    text("Score: " + score, 180, 40);
    for(let i = 0; i < itemsGot.length; i++){
      textSize(18);
      textAlign(LEFT);
      text(itemsGot[i].typeText, 40, 80 + itemOffset);
      itemOffset+=40;
    }
}
  
// shooting when mouse pressed
function handleShooting() {
    if (mouseIsPressed && millis() - lastFireTime > fireRate) {
      player.shoot();
      lastFireTime = millis();
    }
}
//check if bullet hit any enemy
function checkBulletHit(){
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
          if (bullets[i] && enemies[j]) {
            if (bullets[i].hits(enemies[j]) && !enemies[j].isOffscreen()) {
              bullets.splice(i, 1);
              enemies[j].hp-= playerDamage;
              if(enemies[j].hp <= 0){

                if(enemies[j].type =="c"){
                  score+=5;
                }else{
                  score++;
                }
                AddItem_ChangeDif();
                enemies.splice(j, 1);
                break;
              }
  
            }
          }
        }
          
    }

}
// show dead
function isDead(){
    background(0);
    textAlign(CENTER);
    text("YOU ARE DEAD ", width/2, height/2);
    textAlign(LEFT);
}

// Add Item &changing difficulty by time
function AddItem_ChangeDif(){
  itemGenerate++;
  if(score>30){
    updateFrequency = 30;
  }else if(score>10){
    updateFrequency = 60;
  }
  if(itemGenerate>=4 ){
    let newItem = Item.generate();
    items.push(newItem);
    itemGenerate =0;
  }

}






