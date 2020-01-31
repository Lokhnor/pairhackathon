var ctx = document.getElementById("ctx").getContext("2d");
var canvas = document.getElementById("ctx");

var player = {
  x: 200,
  y: 200,
  stepX: 2,
  stepY: 2,
  moveRight: false,
  moveLeft: false,
  moveUp: false,
  moveDown: false
};

var food = {
  x: 300,
  y: 300,
  width: 10,
  height: 10
};

function drawPlayer() {
  ctx.fillStyle = "green";
  ctx.fillRect(player.x, player.y, 30, 30);
}

let foodPellets = [];

function generateFood() {
  food.x = Math.floor(Math.random() * canvas.width);
  food.y = Math.floor(Math.random() * canvas.height);
  foodPellets.push({ x: food.x, y: food.y });
}

function drawFood() {
  if (foodPellets.length < 5) {
    generateFood();
  }
  for (let i = 0; i < foodPellets.length; i++) {
    ctx.fillRect(foodPellets[i].x, foodPellets[i].y, food.width, food.height);
  }
}

function directionalInput() {
  document.onkeydown = function(event) {
    if (event.keyCode === 68) {
      player.moveRight = true;
    }
    if (event.keyCode === 65) {
      player.moveLeft = true;
    }
    if (event.keyCode === 87) {
      player.moveUp = true;
    }
    if (event.keyCode === 83) {
      player.moveDown = true;
    }
  };

  document.onkeyup = function(event) {
    if (event.keyCode === 68) {
      player.moveRight = false;
    }
    if (event.keyCode === 65) {
      player.moveLeft = false;
    }
    if (event.keyCode === 87) {
      player.moveUp = false;
    }
    if (event.keyCode === 83) {
      player.moveDown = false;
    }
  };
}

function movePlayer() {
  if (player.moveRight == true) {
    player.x += player.stepX;
  }
  if (player.moveLeft == true) {
    player.x -= player.stepX;
  }
  if (player.moveUp == true) {
    player.y -= player.stepY;
  }
  if (player.moveDown == true) {
    player.y += player.stepY;
  }
}

function foodCollision() {
  let foodDistanceX = 0;
  let foodDistanceY = 0;
  for (let i = 0; i < foodPellets.length; i++) {
    foodDistanceX = Math.abs(player.x - foodPellets[i].x);
    foodDistanceY = Math.abs(player.y - foodPellets[i].y);
    if (foodDistanceX <= 20 && foodDistanceY <= 20) {
      foodPellets.pop();
    }
  }
}

setInterval(drawGame, 17);
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen to draw next frame
  drawPlayer(); // draw player on current frame
  directionalInput(); // watch for WASD directional input
  movePlayer(); // change player.x and player.y to move accordingly, in increments of "step"
  drawFood(); // draw all foodPellets
  foodCollision(); // monitors distance between player and foodPellets, deletes food on collision
}
