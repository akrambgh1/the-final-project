const backgroundSound = document.querySelector("#backgroundSound")
const winning = document.querySelector("#winnig")
const losing = document.querySelector("#losing")
const playButton = document.querySelector("#playButton")

const home =document.querySelector(".homeScreen")

const runningTOright = new Image();
runningTOright.src = "./animation/spriteRunRight.png";
const runningTOleft = new Image();
runningTOleft.src = "./animation/spriteRunLeft.png";
const standingTOright = new Image();
standingTOright.src = "./animation/spriteStandRight.png";
const standingTOleft = new Image();
standingTOleft.src = "./animation/spriteStandLeft.png";
const platformImage = new Image();
platformImage.src = "./img/platformertiles.png";

const backgroundImage = new Image();
backgroundImage.src =
  "./parallax_mountain_pack/layers/parallax-mountain-bg.png";
const hills = new Image();
hills.src = "./parallax_mountain_pack/layers/parallax-mountain-montain-far.png";
const forhills = new Image();
forhills.src =
  "./parallax_mountain_pack/layers/parallax-mountain-mountains.png";
const gras = new Image();
gras.src = "./parallax_mountain_pack/layers/parallax-mountain-trees.png";
const trees = new Image();
trees.src =
  "./parallax_mountain_pack/layers/parallax-mountain-foreground-trees.png";

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
      x: 500,
      y: 350,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };

    this.width = 59;
    this.height = 150;
    this.image = standingTOright;
    this.frames = 0;
    this.sprite = {
      stand: {
        right: standingTOright,
        left: standingTOleft,
        cropwidth: 177,
        width: 60,
      },
      run: {
        right: runningTOright,
        left: runningTOleft,
        cropwidth: 340,
        width: 127.875,
      },
    };
    this.currentSprite = this.sprite.stand.right;
    this.currentCropwidth = this.sprite.stand.cropwidth;
  }

  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropwidth * this.frames,
      0,
      this.currentCropwidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
      
    );
  }

  update() {
    this.frames++;
    if (this.frames > 27) this.frames = 0;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}
class Platform {
  constructor(x, y, image) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Background {
  constructor(x, y, image) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

let backgrounds = [
  new Background(0, 0, backgroundImage),

  new Background(100, 100, hills),
  new Background(hills.width, 100, hills),
  new Background(hills.width * 2, 100, hills),

  new Background(0, 150, forhills),
  new Background(forhills.width, 150, forhills),
  new Background(forhills.width * 2, 150, forhills),

  new Background(0, 203, gras),
  new Background(gras.width, 203, gras),
  new Background(gras.width * 2, 203, gras),

  new Background(0, 120, trees),
  new Background(trees.width, 120, trees),
  new Background(trees.width * 2, 120, trees),
];
let player = new Player();
let platforms = [
  new Platform(0, 750, platformImage),
  new Platform(platformImage.width, 750, platformImage),
  new Platform(platformImage.width * 2, 750, platformImage),
  new Platform(platformImage.width * 3 , 750, platformImage),
  new Platform(platformImage.width * 4, 750, platformImage),
  new Platform(platformImage.width * 5 + 570, 750, platformImage),
  new Platform(platformImage.width * 6, 750, platformImage),
  new Platform(platformImage.width * 7 + 560, 750, platformImage),
  new Platform(platformImage.width * 8, 750, platformImage),
  new Platform(platformImage.width * 9 + 560, 750, platformImage),
  new Platform(platformImage.width * 10, 750, platformImage),
  new Platform(platformImage.width * 11 + 500, 750, platformImage),
  new Platform(platformImage.width * 12, 750, platformImage),
  new Platform(platformImage.width * 13 + 580, 750, platformImage),
  new Platform(platformImage.width * 14, 750, platformImage),
  new Platform(platformImage.width * 15 + 500, 750, platformImage),
  new Platform(platformImage.width * 16, 750, platformImage),
  new Platform(platformImage.width * 17, 750, platformImage),
  new Platform(platformImage.width * 18 + 580, 750, platformImage),
  new Platform(platformImage.width * 19, 750, platformImage),
  new Platform(platformImage.width * 20 + 500, 750, platformImage),
  new Platform(platformImage.width * 21, 750, platformImage),
  new Platform(platformImage.width * 22, 750, platformImage),
  new Platform(platformImage.width * 23, 750, platformImage),
  new Platform(platformImage.width * 24, 750, platformImage),
  new Platform(platformImage.width * 25, 750, platformImage),
];
let winningIs =false
var scrollOfSet = 0;




   function init() {
    
   
  backgrounds = [
    new Background(0, 0, backgroundImage),

    new Background(100, 100, hills),
    new Background(hills.width, 100, hills),
    new Background(hills.width * 2, 100, hills),

    new Background(0, 150, forhills),
    new Background(forhills.width, 150, forhills),
    new Background(forhills.width * 2, 150, forhills),

    new Background(0, 203, gras),
    new Background(gras.width, 203, gras),
    new Background(gras.width * 2, 203, gras),

    new Background(0, 120, trees),
    new Background(trees.width, 120, trees),
    new Background(trees.width * 2, 120, trees),
  ];
  player = new Player();
  platforms = [
    new Platform(0, 750, platformImage),
    new Platform(platformImage.width, 750, platformImage),
    new Platform(platformImage.width * 2, 750, platformImage),
    new Platform(platformImage.width * 3 , 750, platformImage),
    new Platform(platformImage.width * 4, 750, platformImage),
    new Platform(platformImage.width * 5 + 570, 750, platformImage),
    new Platform(platformImage.width * 6, 750, platformImage),
    new Platform(platformImage.width * 7 + 560, 750, platformImage),
    new Platform(platformImage.width * 8, 750, platformImage),
    new Platform(platformImage.width * 9 + 560, 750, platformImage),
    new Platform(platformImage.width * 10, 750, platformImage),
    new Platform(platformImage.width * 11 + 500, 750, platformImage),
    new Platform(platformImage.width * 12, 750, platformImage),
    new Platform(platformImage.width * 13 + 580, 750, platformImage),
    new Platform(platformImage.width * 14, 750, platformImage),
    new Platform(platformImage.width * 15 + 500, 750, platformImage),
    new Platform(platformImage.width * 16, 750, platformImage),
    new Platform(platformImage.width * 17, 750, platformImage),
    new Platform(platformImage.width * 18 + 580, 750, platformImage),
    new Platform(platformImage.width * 19, 750, platformImage),
    new Platform(platformImage.width * 20 + 500, 750, platformImage),
    new Platform(platformImage.width * 21, 750, platformImage),
    new Platform(platformImage.width * 22, 750, platformImage),
    new Platform(platformImage.width * 23, 750, platformImage),
    new Platform(platformImage.width * 24, 750, platformImage),
    new Platform(platformImage.width * 25, 750, platformImage),
  ];
  

     scrollOfSet = 0;
     document.getElementById("result").style.display = "none";
     backgroundSound.play()
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  backgrounds.forEach((background) => {
    background.draw();
  });
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  });

  if (scrollOfSet <= 0) {
    keys.left.pressed = false;
    keys.up.pressed = false;
  }
  if (keys.right.pressed) {
    scrollOfSet += 5;
  } else if (keys.left.pressed) {
    scrollOfSet -= 5;
  }
  if (scrollOfSet < 0) {
    keys.left.pressed = false;
    keys.up.pressed = false;
  }
  if (scrollOfSet >= 7500) {
    
    document.getElementById("result").style.display = "flex";
    document.querySelector("#h1result").innerHTML = "you won";
    keys.right.pressed = false;
    keys.right.pressed = false;
    keys.left.pressed = false;
    keys.up.pressed = false;
    backgroundSound.pause()
    
    
  }
  
  

  if (player.position.y >= 890) {
    document.getElementById("result").style.display = "flex";
    document.querySelector("#h1result").innerHTML = "you lose";
    keys.right.pressed = false;
    keys.right.pressed = false;
    keys.left.pressed = false;
    keys.up.pressed = false;
backgroundSound.pause()
  
  
    

    if (player.position.y > 900 && player.position.y < 1300) {
      
      losing.play()
        }
    else {
      losing.pause()
  }
}
  if (keys.right.pressed && player.position.x < 400 && scrollOfSet < 7500) {
    player.velocity.x = 10;
  } else if (
    keys.left.pressed &&
    player.position.x > 100 &&
    scrollOfSet < 7500 &&
    scrollOfSet < 0
  ) {
    player.velocity.x = -10;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed && scrollOfSet < 7500) {
      player.currentSprite = player.sprite.run.right;
      player.currentCropwidth = player.sprite.run.cropwidth;
      player.width = player.sprite.run.width;
      backgrounds[1].position.x -= 1;
      backgrounds[2].position.x -= 1;
      backgrounds[3].position.x -= 1;
      backgrounds[4].position.x -= 2;
      backgrounds[5].position.x -= 2;
      backgrounds[6].position.x -= 2;
      backgrounds[7].position.x -= 3;
      backgrounds[8].position.x -= 3;
      backgrounds[9].position.x -= 3;
      backgrounds[10].position.x -= 4;
      backgrounds[11].position.x -= 4;
      backgrounds[12].position.x -= 4;

      platforms.forEach((platform) => {
        platform.position.x -= 10;
      });
    } else if (keys.left.pressed && scrollOfSet < 7500) {
      player.currentSprite = player.sprite.run.left;
      player.currentCropwidth = player.sprite.run.cropwidth;
      player.width = player.sprite.run.width;
      backgrounds[1].position.x += 1;
      backgrounds[2].position.x += 1;
      backgrounds[3].position.x += 1;
      backgrounds[4].position.x += 2;
      backgrounds[5].position.x += 2;
      backgrounds[6].position.x += 2;
      backgrounds[7].position.x += 3;
      backgrounds[8].position.x += 3;
      backgrounds[9].position.x += 3;
      backgrounds[10].position.x += 4;
      backgrounds[11].position.x += 4;
      backgrounds[12].position.x += 4;
      platforms.forEach((platform) => {
        platform.position.x += 10;
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
      player.velocity.y = -12;
    } else if (!player.velocity.y === 0) {
      player.velocity.y += gravity;
    }
  });

 
}

animate();
console.log(winningIs)
if(winningIs) {
  winning.play()
} else {
  winning.pause()
  
}
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      keys.up.pressed = true;

      break;
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
      player.currentSprite = player.sprite.run.left;
      player.currentCropwidth = player.sprite.run.cropwidth;
      player.width = player.sprite.run.width;

      console.log("left");
      break;
  }
});
addEventListener("keyup", ({ keyCode }) => {
  console.log(keyCode)
  switch (keyCode) {
    case 87:
      keys.up.pressed = false;
      break;
      case 32:
        keys.up.pressed = false;
        break;
    case 83:
      console.log("down");
      keys.down.pressed = false;
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;
      player.currentSprite = player.sprite.stand.right;
      player.currentCropwidth = player.sprite.stand.cropwidth;
      player.width = player.sprite.stand.width;

      break;
    case 65:
      keys.left.pressed = false;
      player.currentSprite = player.sprite.stand.left;
      player.currentCropwidth = player.sprite.stand.cropwidth;
      player.width = player.sprite.stand.width;

      console.log("left");
      break;
  }
});
playButton.addEventListener("click", play)
function play(){
  canvas.style.transform = "scale(1)";
  home.style.display = "none";
  init()
}
if(winningIs) {
  winning.play()
} else {
  winning.pause()
  
}