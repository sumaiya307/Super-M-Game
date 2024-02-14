const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const princess = document.getElementById('princess');
const container = document.querySelector('.container');
const containerWidth = container.offsetWidth;
const playerWidth = player.offsetWidth;
const jumpHeight = 300;
const playerSpeed = 30;
const jumpSpeed = 5;
const obstacleSpeed = 7;
const obstacle2Speed= 4;
const totalScreens = 7; // Total screens before reaching princess

let currentScreen = 1;
let princessVisible = false;

let isJumping = false;

function movePlayer(direction) {
  let currentPosition = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  if (direction === 'left') {
    if (currentPosition > 0) {
      player.style.left = `${currentPosition - playerSpeed}px`;
    }
  } else {
    if (currentPosition + playerWidth < containerWidth) {
      player.style.left = `${currentPosition + playerSpeed}px`;
    }
  }
}

let initialPosition; // variable to store initial vertical position of player

function jump() {
  if (!isJumping) {
    isJumping = true;
    initialPosition = parseInt(window.getComputedStyle(player).getPropertyValue('bottom')); // store initial position
    let currentPosition = initialPosition;
    let jumpInterval = setInterval(() => {
      if (currentPosition >= jumpHeight + initialPosition) {
        clearInterval(jumpInterval);
        let fallInterval = setInterval(() => {
          if (currentPosition <= initialPosition) {
            clearInterval(fallInterval);
            isJumping = false;
          } else {
            currentPosition -= jumpSpeed;
            player.style.bottom = `${currentPosition}px`;
          }
        }, 20);
      } else {
        currentPosition += jumpSpeed;
        player.style.bottom = `${currentPosition}px`;
      }
    }, 20);
  }
}


function moveObstacle() {
  let obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
  if (obstaclePosition > -obstacle.offsetWidth) {
    obstacle.style.left = `${obstaclePosition - obstacleSpeed}px`;
  } else {
    obstacle.style.left = `${containerWidth}px`;
  }
}

function moveObstacle2() {
  let obstacle2Position = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
  if (obstacle2Position > -obstacle2.offsetWidth) {
    obstacle2.style.left = `${obstacle2Position - obstacle2Speed}px`;
  } else {
    obstacle2.style.left = `${containerWidth}px`;
  }
}

function checkObstacleCollision() {
  let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
  let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
  let obstacleBottom = parseInt(window.getComputedStyle(obstacle).getPropertyValue('bottom'));

  // Check for collision with obstacle
  if (playerLeft + playerWidth >= obstacleLeft && playerLeft <= obstacleLeft + obstacle.offsetWidth &&
      playerBottom <= obstacleBottom + obstacle.offsetHeight && playerBottom >= obstacleBottom) {
    alert('Game Over! You hit the Porsche :(');
    document.location.reload();
  }
}

function checkPrincessCollision() {
  let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
  let princessLeft = parseInt(window.getComputedStyle(princess).getPropertyValue('left'));
  let princessBottom = parseInt(window.getComputedStyle(princess).getPropertyValue('bottom'));

  // Check for collision with princess
  if (playerLeft + playerWidth >= princessLeft && playerLeft <= princessLeft + princess.offsetWidth &&
      playerBottom <= princessBottom + princess.offsetHeight && playerBottom >= princessBottom) {
    alert('Yay! You reached the princess! Happy Valentines Day <3');
    document.location.reload();
  }
}

function checkCollision() {
  checkObstacleCollision();
  checkPrincessCollision();

  // Check for reaching the end of screen
  if (player.offsetLeft + player.offsetWidth >= containerWidth) {
    if (currentScreen < totalScreens) {
      currentScreen++;
      player.style.left = '0';
      container.className = `container screen${currentScreen}`;
      // Move the obstacle to the next screen
      obstacle.style.left = `${containerWidth}px`;
    }
  }

  // Display princess when on the third screen
  if (!princessVisible && currentScreen === 7) {
    princessVisible = true;
    princess.style.display = 'block';
  }
}

setInterval(moveObstacle, 20);
setInterval(moveObstacle2, 10);

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    movePlayer('left');
  } else if (event.key === 'ArrowRight') {
    movePlayer('right');
  } else if (event.key === ' ' && !isJumping) {
    jump();
  }
  checkCollision();
});

document.getElementById('start-button').addEventListener('click', function() {
    // Hide the start screen
    document.querySelector('.start-screen').style.display = 'none';
    // Show the game container
    document.querySelector('.container').style.display = 'block';
});
