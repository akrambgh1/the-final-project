import platform from ./img/platformertiles.png

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.5;
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
};
const logic = {
  on: {
    ok: false,
  },
};
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 650,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 30;
    this.height = 30;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
    }
  }
}
class Platform {
  constructor(x, y, w, h) {
    this.position = {
      x,
      y,
    };
    this.width = w;
    this.height = h;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();

const platforms = [
  new Platform(200, 100, 1000, 30),
  new Platform(50, 700, 1000, 30),
];
let scrollOfSet = 0;
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  });
  if (keys.right.pressed) {
    scrollOfSet += 5;
  } else if (keys.left.pressed ) {
    scrollOfSet-=5;
  }
  
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100  ) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed ) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }

  }
  

  //platfom
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
      logic.on.ok = true;
    } else {
      logic.on.ok = false;
    }
    if (keys.up.pressed && logic.on.ok) {
      player.velocity.y = -20;
    } else if (!player.velocity.y === 0) {
      player.velocity.y += gravity;
    }
  });console.log(scrollOfSet);
}

animate();

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 87:
      keys.up.pressed = true;

      break;
    case 83:
      console.log("down");
      keys.down.pressed = true;
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;

      break;
    case 65:
      keys.left.pressed = true;

      console.log("left");
      break;
  }
});
addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 87:
      keys.up.pressed = false;
      break;
    case 83:
      console.log("down");
      keys.down.pressed = false;
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;

      break;
    case 65:
      keys.left.pressed = false;
      console.log("left");
      break;
  }
});
