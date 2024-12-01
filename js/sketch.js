let drone;
let obstacles = [];
let path;
let speedSlider, sizeSlider;
let score = 0;
let goldItems = [];
let winScore = 5;
let gameover = false;
let restartButton;
let restartButtonCreated = false;
let collisonCount = 0;
let maxCollison = 3;
let lastCollisonTime = 0;
let duration = 1000;

function setup() {
    createCanvas(windowWidth, windowHeight);
    drone = new Drone(width /2, height /2);
    path = new Path();

    // Les sliders pour la taille et la vitesse du drone
    speedSlider = select('#speedSlider');
    sizeSlider = select('#sizeSlider');

    // Les obstacles
    for (let i = 0; i < 8; i ++) {
        obstacles.push(new Obstacle(random(width), random(height), random(50, 100), random(50, 100)));
    }

    for (let i = 0; i < 5; i ++) {
        goldItems.push(new Gold(random(width), random(height), random(50, 100), random(50, 100)));
    }
/*     for (let i = 0; i < 10; i++) {
        let x = random(width);
        let y = random(height);
        let w = random(50, 100);
        let h = random(50, 100);
        obstacles.push(new Obstacle(x, y, w, h));
    } */

    window.addEventListener('keydown', (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }
    });
}

function draw() {
    background(50);

    drone.speed = speedSlider.value();
    drone.size = sizeSlider.value();

    path.show();
    drone.show();
    drone.followpath(path.getPoints());
    drone.update();

    let currentTime = millis();

    // end game
    if (gameover) {
        displayGameOver();
        return;
    }

    if (drone.x - drone.size / 2 < 0 || 
        drone.x + drone.size / 2 > width || 
        drone.y - drone.size / 2 < 0 || 
        drone.y + drone.size / 2 > height) {
        gameover = true;
    }

    for (let obstacle of obstacles) {
        obstacle.show();
        obstacle.move();
        if (obstacle.detectCollision(drone) && currentTime - lastCollisonTime > duration) {
            console.log('collision');
            drone.handleCollision();
            collisonCount ++;  
            updateCollisonDisplay();
            lastCollisonTime = currentTime
            score = max(0, score - 1); 
            if (collisonCount >= maxCollison) {
                gameover = true;
            }
        }
    }

    for (let i = goldItems.length - 1; i >= 0; i--) {
        goldItems[i].show();
        if (goldItems[i].isFullyCovered(drone)) {
            console.log('collision');
            goldItems.splice(i, 1);
            score ++;
        }
    }

    fill(255);
    textSize(32);
    textAlign(CENTER, TOP);
    text('Score: ' + score, width /2, 10);
    if (goldItems.length < 3) {
        goldItems.push(new Gold(random(width), random(height), random(50, 100), random(50, 100)));
    }
 
    if (score >= winScore) {
        console.log('Gagné!');
        textSize(32);
        fill(255);
        textAlign(CENTER, CENTER);
        text('Gagné!', width / 2, height / 2);
        noLoop();
    } else {
        textSize(32);
        fill(255);
        textAlign(CENTER, CENTER);
    }
}

function mousePressed() {
    if (!gameover) {
        path.addPoint(mouseX, mouseY);
        score += 1;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function updateCollisonDisplay() {
    document.getElementById('collisonLabel').innerText = `Collisions: ${collisonCount}/${maxCollison}`;
}

function displayGameOver() {
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text('Perdu', width / 2, height / 2);

    if (!restartButtonCreated) {
        restartButtonCreated = true;
        restartButton = createButton('Recommencer');
        restartButton.id("restartButton");
        restartButton.position(width / 2 - 50, height / 2 + 50);
        restartButton.mousePressed((e) => {
            e.preventDefault();
            restartButton.remove();
            resetGame();
        });
    }
}

function resetGame() {
    restartButtonCreated = false;
    score = 0;
    gameover = false;
    collisonCount = 0;
    updateCollisonDisplay();
    goldItems = [];
    for (let i = 0; i < 5; i ++) {
        goldItems.push(new Gold(random(width), random(height), random(50, 100), random(50, 100)));
    }
    loop();
}

// Gold et drone objets
function preload() {
    Gold.preload();
    Drone.preload();
}