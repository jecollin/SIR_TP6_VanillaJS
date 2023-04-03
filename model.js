// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

class Drawing {
    constructor() {
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    removeShape(shape) {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }
}

class Shape {
    constructor(color, thickness) {
        this.color = color;
        this.thickness = thickness;
    }

    setColor(color) {
        this.color = color;
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
}

class Line extends Shape {
    constructor(x1, y1, x2, y2, color, thickness) {
        super(color, thickness);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}
