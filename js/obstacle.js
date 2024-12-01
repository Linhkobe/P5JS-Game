class Obstacle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speedX = random(-5, 2);
        this.speedY = random(-5, 2);
    }

    show() {
        fill(150);
        rect(this.x, this.y, this.w, this.h);
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x + this.w > width) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y + this.h > height) {
            this.speedY *= -1;
        }
    }

    detectCollision(drone) {
        return (
            drone.x + drone.size / 2 > this.x &&
            drone.x - drone.size / 2 < this.x + this.w &&
            drone.y + drone.size / 2 > this.y &&
            drone.y - drone.size / 2 < this.y + this.h
        );
    }
}