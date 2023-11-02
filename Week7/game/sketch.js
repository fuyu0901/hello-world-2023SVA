let mines;
let shopOptions = ["Continue", "Item 1 (Speed)", "Item 2 (Bomb)", "Item 3 (15s)"];
let updatedOptions;
let angle = Math.PI / 4; // default
let angleSpeed = 0.02; // value witch add angle 
let hookLength = 50; 
const defaultHookLength =50;
let extending;
let got;
let hookSpeed;
let defaulHookSpeed = 2;
let GotMine;
let startTime = 0;
let hookX, hookY;
let shop;
let selectedOption = 0;
let boughtOption = [];
let shopStartTime = 0;
let shopConfirmTime = 1000; // 1s
let itemSelected = false;
let bonusTime =0;
let score = 0;
let addScore = 0;
let nextGoal =0;
let nextAddGoal = 20;

const maxAngle = 2*Math.PI / 5; 


function setup() {
  createCanvas(600, 400);
  noStroke();
  shop = false;
  reset();

}

function draw() {
  background(100);
  if(!shop){
    drawHook();
    updateMines();
    hooking();
    detectCollision();
    drawInformation();
    checkTime(); // 检查时间
  }else{
    drawShop();
  }

}
function reset(){
  nextAddGoal+=5;
  nextGoal+=nextAddGoal;
  mines=[];
  generateMines();
  extending = false;
  got = false;
  hookLength =defaultHookLength;
  hookSpeed = defaulHookSpeed;
  startTime = millis();
  updatedOptions = shopOptions.concat();
}

function drawInformation(){
  fill(0);
  textAlign(LEFT);
  text("Money: " + score, 20, 20);
  text("Time: " + (60+bonusTime-floor((millis() - startTime) / 1000)) + "s", 20, 40); // 显示已过时间 
  text("Goal: " +  nextGoal, 20, 60);
}

function generateMines() {
  for (let i = 0; i < 15; i++) {
    let mine = Mine.generateMine();
    let overlapping = false;

    for (let j = 0; j < mines.length; j++) {
      let distance = dist(mine.x, mine.y, mines[j].x, mines[j].y);
      let minDistance = mine.radius/2 + mines[j].radius/2+10;

      if (distance < minDistance) {
        overlapping = true;
        i--;
        break; //
      }
    }

    if (!overlapping) {
      mines.push(mine);
    }
  }
}

function updateMines(){
  for(i=0; i<mines.length; i++){ 
    mines[i].drawMine();
  }
  if(got){
    GotMine.x = hookX;
    GotMine.y = hookY;
    GotMine.drawMine();
  }
}

function hooking(){
  let hxoutScreen = hookX<0||hookX>width;
  let hyoutScreen = hookY<0||hookY>height;
  if ( hyoutScreen || hxoutScreen) {
    hookSpeed *= -1;
  }
  if (extending) {
    hookLength += hookSpeed;
  } 
  if ( extending && hookLength <= defaultHookLength) {
    extending = false;
    hookSpeed *= -1;
    hookSpeed = defaulHookSpeed;
    got = false;
    score += addScore;
    addScore =0;
  }
}

function detectCollision(){
  if (!got) {
    for (let i = 0; i < mines.length; i++) {
      let distance = dist(hookX, hookY, mines[i].x, mines[i].y);
      if (distance < mines[i].radius / 2) {
         
        switch (mines[i].type) {
          case "gold":
            hookSpeed = 1;
            addScore = 5; 
            break;
          case "diamond":
            hookSpeed = 4;
            addScore = 10; 
            break;
          case "stone":
            hookSpeed= 0.5;
            addScore = 2; 
            break;
        }

        got = true;
        hookSpeed *= -1;
        GotMine = mines[i];
        mines.splice(i, 1);
        break;
      }
    }
  }
}
function keyPressed() {
  if(!shop){
    if (key === ' ' && !extending) {
      extending = true; // 按下空格键，设置 extending 为 true
    }
  }else{
    if (key === ' ' ) {
      shopStartTime = millis();
      itemSelected = true;
    }
  }
}
function keyReleased() {
  if (key === ' ') {
    selectedOption = (selectedOption + 1) % updatedOptions.length;
    itemSelected = false;
    
  }
}


function drawHook(){
  // calculate angle
  if( extending == false){
    angle += angleSpeed;
  }

  if (angle > maxAngle) {
    angle = maxAngle;
    angleSpeed *= -1; // reverse
  } else if (angle < -maxAngle) {
    angle = -maxAngle;
    angleSpeed *= -1; // reverse
  }

  // draw hook
  hookX = width / 2+hookLength * sin(angle);
  hookY =  hookLength * cos(angle);
  //translate(width / 2, 100); // move the hook a little bit down
  stroke(0);
  strokeWeight(2);
  line(width / 2, 0, hookX, hookY); // draw hook arm
  fill(0);
  noStroke();
  ellipse(hookX, hookY, 10, 10); // draw the hook
}

function checkTime() {
  let Seconds = floor((millis() - startTime) / 1000);
  if (Seconds >= 60+bonusTime) {
    defaulHookSpeed =2;
    bonusTime = 0;
    if(score<nextGoal){
      showDead();
    }else{
      shop = true;
    }
    
  }
}
function showDead(){
  clear();
  fill(0);
  textAlign(CENTER, CENTER);
  text("Sorry, Try Next Time", width/2, height/2);
}

function drawShop(){
  console.log(updatedOptions);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Money: " + score, width/2, 20);
  text("Hole to Confirm", width/2, height-50);
  for (let i = 0; i < updatedOptions.length; i++) {
    let yOffset = 60 * i + 100;
    if (i == selectedOption) {
      fill(255, 0, 0);
    } else {
      fill(0);
    }
    text(updatedOptions[i], width / 2, yOffset);
  }
  
  if (itemSelected) {
    if (millis() - shopStartTime >= shopConfirmTime) {
      selectShopItem(updatedOptions[selectedOption]);
      itemSelected = false;
    }
  
  }
}
function selectShopItem(option) {


  if (option == shopOptions[0]) {
    // Continue
    itemSelected = false;
    shop = false; 
    selectedOption = 0;
    reset();
  }else if(option == shopOptions[1]){
    // Power 
    if (score >= 30) {
        score -= 30;
        defaulHookSpeed =4;
        updatedOptions.splice(selectedOption ,1);
    }
  }else if(option == shopOptions[2]){
    // buy Bomb 
    if (score >= 10) {
        score -= 10;
        updatedOptions.splice(selectedOption ,1);
    }
  }else if(option == shopOptions[3]){
    if (score >= 20) {
        score -= 20;
        bonusTime = 15;
        updatedOptions.splice(selectedOption ,1);
    }
  }
}