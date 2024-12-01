let goldImges;

class Gold {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 50;
    }

    static preload() {
        goldImges = loadImage('assets/gold2.png');
    }

    show() {
        imageMode(CENTER);
        image(goldImges, this.x, this.y, this.size, this.size);
        //fill(255, 215, 0);
        //ellipse(this.x, this.y, this.size);
    }

    isCollected(drone) {
        let distance = dist(this.x, this.y, drone.x, drone.y);
        return distance < this.size / 2 + drone.size / 2;
    }

    isFullyCovered(drone) {
        let distance = dist(this.x, this.y, drone.x, drone.y);
        return distance < this.size / 2 + drone.size / 2;
    }
}