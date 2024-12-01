let droneImage;

class Drone {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 500;
        this.speed = 3;
    }

    static preload() {
        droneImage = loadImage('assets/drone.png');
    }

    show() {
        imageMode(CENTER);
        image(droneImage, this.x, this.y, this.size, this.size);
        //fill(255);
        //ellipse(this.x, this.y, this.size);
    }

    update() {
        this.size = sizeSlider.value();
        if (keyIsDown(LEFT_ARROW) && this.x - this.size / 2 > 0) {
            this.x -= this.speed;
        }
        if (keyIsDown(RIGHT_ARROW) && this.x + this.size / 2 < width) {
            this.x += this.speed;
        }
        if (keyIsDown(UP_ARROW) && this.y - this.size / 2 > 0) {
            this.y -= this.speed;
        }
        if (keyIsDown(DOWN_ARROW) && this.y + this.size / 2 < height) {
            this.y += this.speed
        }
    }   

    handleCollision() {
        this.color = color(255, 0, 0);
        this.x -= this.speed;
        this.y -= this.speed; 
    }

    followpath(points) {
        if (points.length > 0) {
            let target = points[0];
            let distance = dist(this.x, this.y, target.x, target.y);
            if (distance < this.size / 2) {
                points.shift();
            } else {
                let angle = atan2(target.y - this.y, target.x - this.x);
                this.x += cos(angle) * this.speed;
                this.y += sin(angle) * this.speed;
            }
        }
    }
}