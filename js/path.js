class Path {
    constructor() {
        this.points = [];
    }

    addPoint(x, y) {
        this.points.push(createVector(x, y));
    }

    show() {
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        beginShape();
        for (let point of this.points) {
            vertex(point.x, point.y);
        }
        endShape();
    }

    getPoints() {
        return this.points;
    }
}