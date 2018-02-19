var score = 0,
gscore = 0,
countblink = 10,
ghost = false;
ghost2 = false;
var player = {
x: 50,
y: 100,
pacmouth: 320,
pacdir: 0,
psize: 32,
speed: 5
};
var enemy = {
x: 150,
y: 200,
speed: 5,
moving: 0,
dirx: 0,
diry: 0,
flash: 0,
ghosteat: false
};

//setup canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;
//import image
var mainImage;
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "sprites.png";

//add key listener
var keyclick = {};
document.addEventListener("keydown", function(event) {
    keyclick[event.keyCode] = true;
    move(keyclick);
}, false);

document.addEventListener("keyup", function(event) {
    delete keyclick[event.keyCode];
}, false);

// key functions
function move(keyclick) {
    ////check click key value
    if (37 in keyclick) {
        player.x -= player.speed;
        player.pacdir = 64;
    } if (38 in keyclick) {
        player.y -= player.speed;
        player.pacdir = 96;
    } if (39 in keyclick) {
        player.x += player.speed;
        player.pacdir = 0;
    } if (40 in keyclick) {
        player.y += player.speed;
        player.pacdir = 32;
    } 
    // prevent run off screen
    if (player.x >= (canvas.width - 32)) {
        player.x = 0;
    } if (player.y >= (canvas.height -32)) {
        player.y = 0;
    } if (player.x < 0) {
        player.x = (canvas.width - 32);
    } if (player.y < 0) {
        player.y = (canvas.height - 32);
    } 
    //open close mouth
    if (player.pacmouth == 320) {
        player.pacmouth = 352;
    } else {
        player.pacmouth = 320;
    } render();
}

// function once ready
function checkReady() {
    this.ready = true;
    playgame();
} 

// game play loop
function playgame() {
    render();
    requestAnimationFrame(playgame);
} 

// random number function
function myNum(n) {
    return Math.floor(Math.random() * n);
} 

// draw on canvas
function render() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // set position of ghost
    // check if ghost is on screen
    if(!ghost) {
        enemy.ghostNum = myNum(5)*64;
        enemy.x = myNum(450);
        enemy.y = myNum(250)+30;
        ghost = true;
    }
    // move enemy
    if(enemy.moving < 0) {
        enemy.moving = (myNum(30)*3)+10+myNum(1);
        enemy.speed = myNum(4)+1;
        enemy.dirx = 0;
        enemy.diry = 0;
        if(enemy.moving % 2) {
          if(player.x < enemy.x){
              enemy.dirx = -enemy.speed;
          } else {
              enemy.dirx = enemy.speed;
          }  
        } else {
          if(player.y < enemy.y){
              enemy.diry = -enemy.speed;
          } else {
              enemy.diry = enemy.speed;
          }              
        }
    }
    
    //reset moving
    enemy.moving--;
    //x and y new position from value dirx and diry
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;

    // write score
    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Hero: " + score + " vs Enemy:" + gscore, 2, 18);
    // draw characters
    context.drawImage(mainImage, enemy.ghostNum, 0, 32, 32, enemy.x, enemy.y, 32, 32);
    // draw ghost
    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, 32, 32);
}
