let screenW = 800;
let screenH = 800;
let updateFrequency = 80;
let player;
let playerSize = 50;
let bullets = [];
let enemies = [];
let items = [];

let playerHealth = 4;
let score = 0;
let playerSpeed = 5;
let playerDamage = 10;
let fireRate = 500; // 毫秒
let lastFireTime = 0;

function setup() {
  createCanvas(screenW, screenH);
  player = new Player();
}

function draw() {
  background(0);
  updatePlayer();
  updateBullets();
  updateEnemies();
  updateItems();
  drawInformation();
  handleShooting();
  checkBulletHit();
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
    if(enemies !=[] ){
        for (let i = enemies.length - 1; i >= 0; i--) {

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
            enemies[i].update();
            enemies[i].show();
          }
    }

}
  
// update the items(couldn't fish before class :( )
function updateItems() {
    for (let i = items.length - 1; i >= 0; i--) {
      items[i].update();
      items[i].show();
      if (items[i].hits(player)) {
        items[i].applyEffect();
        items.splice(i, 1);
      }
    }
}
  
// update HP
function drawInformation() {
    fill(255);
    textSize(24);
    text("Health: " + playerHealth, 20, 40);
    text("Score: " + score, 200-20, 40);
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
          if (bullets[i].hits(enemies[j]) && !enemies[j].isOffscreen()) {
            bullets.splice(i, 1);
            enemies[j].isHit = true; // enemy is hit 
            console.log("hit");
            enemies[j].hp--;
            if(enemies[j].hp == 0){
              if(enemies[j].type =="c"){
                score+=5;
              }else{
                score++;
              }
              if(score>30){
                updateFrequency = 30;
              }else if(score>10){
                updateFrequency = 60;
              }
              enemies.splice(j, 1);
              break;
            }

          }
        }
    }

}
// show dead
function isDead(){
    background(0);
    text("YOU ARE DEAD ", width/2-60, height/2);
}





