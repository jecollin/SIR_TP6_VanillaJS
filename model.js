// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

class Drawing {
    constructor() {
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    getShape() {
        return this.shapes;
    }

    removeShape(shape) {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }

    paint(ctx) {
        ctx.fillStyle = '#F0F0F0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.getShape().forEach(function(forme) {
            forme.paint(ctx);
        });
    }

}

class Shape {
    constructor(color, thickness) {
        this.color = color;
        this.thickness = thickness;
    }

    getColor(){
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getThickness(){
        return this.thickness
    }

    setThickness(thickness) {
        this.thickness = thickness;
    }
}

class Rectangle extends Shape {
    constructor(x, y, width, height, color, thickness) {
        super(color, thickness);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }


    // Getters
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    // Setters
    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

}

class Line extends Shape {
    constructor(x1, y1, x2, y2, color, thickness) {
        super(color, thickness);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    // Getters
    getInitX() {
        return this.x1;
    }

    getInitY() {
        return this.y1;
    }

    getFinalX() {
        return this.x2;
    }

    getFinalY() {
        return this.y2;
    }

    // Setters
    setInitX(x1) {
        this.x1 = x1;
    }

    setInitY(y1) {
        this.y1 = y1;
    }

    setFinalX(x2) {
        this.x2 = x2;
    }

    setFinalY(y2) {
        this.y2 = y2;
    }
}
