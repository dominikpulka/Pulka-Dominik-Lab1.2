let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let move = true; // true = ruch , false = bez ruchu

class Ball {
  constructor(posX, posY, color, id) {
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.id = id;
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }
}

let balls = [];
let randomX = [];
let randomY = [];

for (let i = 0; i < 10; i++) {
  
  let random = Math.floor(Math.random() * 500) + 50;
  let random2 = Math.floor(Math.random() * 500) + 50;

  while (randomX.includes(random) || randomY.includes(random2)) {
    random = Math.floor(Math.random() * 500) + 50;
    random2 = Math.floor(Math.random() * 450) + 50;
  }

  for (let j = 0; j < 30; j++) {
    randomX.push(random + j);
    randomX.push(random - j);
    randomY.push(random2 + j);
    randomY.push(random2 - j);
  }

  let NewBall = new Ball(random, random2, "green", i);

  NewBall.drawBall();
  balls.push(NewBall);
}

let start = Date.now();

function draw() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall();
  }
}

let startBall = new Ball(0, 0, "black", "startBall");
startBall.drawBall();
let finishBall = new Ball(650, 50, "blue", "finishBall");
finishBall.drawBall();
let myBall = new Ball(250, 250, "black", "myBall");
balls.push(myBall);
balls.push(finishBall);

function moving(e) {
  let x = e.alpha * 8;
  let y = e.beta * 8;
  if(move){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
      myBall.posX = x;
      myBall.posY = y;
  }

  draw();

  for (let p = 0; p < balls.length; p++) {
    let x1 = myBall.posX;
    let y1 = myBall.posY;
    let x2 = balls[p].posX;
    let y2 = balls[p].posY;
    let mid = parseInt(
      Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
    );

    if (0 < mid && mid < 50 && balls[p].id != "finishBall") {
      ctx.font = "80px Arial";
      ctx.fillStyle = "gold";
      ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);
      move = false;

      window.setTimeout(function() {
        location.reload();
      }, 5000);
    }
  }
  let x1 = myBall.posX;
  let y1 = myBall.posY;
  let x2 = finishBall.posX;
  let y2 = finishBall.posY;
  let mid = parseInt(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));

  if (0 < mid && mid < 50 && move) {
    let stop = Date.now();
    let time = (stop - start) / 1000 + "s";
    ctx.font = "80px Arial";
    ctx.fillStyle = "gold"
    ctx.fillText("You Win!!", canvas.width/ 4,
    canvas.height -150);
    ctx.fillText( time , canvas.width /3.5 , canvas.height - 50);
    move = false;
    window.setTimeout(function() {
      location.reload();
    }, 5000);
  }
}

window.addEventListener("deviceorientation", moving);