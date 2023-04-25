// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

class Drawing {
    constructor() {
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    getShapes() {
        return this.shapes;
    }

    deleteShape(shape) {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }

    paint(ctx) {
        ctx.fillStyle = '#F0F0F0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.getShapes().forEach(function(forme) {
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

class Circle extends Shape {
    constructor(x, y, radius, color, thickness) {
        super(color, thickness);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    paint(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.stroke();
    }
    //Pour ajouter cette forme à votre application, vous devrez ajouter des événements de clic pour les boutons qui
    // permettent à l'utilisateur de sélectionner le cercle comme forme en cours d'édition, et modifier les méthodes
    // onInteractionStart, onInteractionUpdate et onInteractionEnd de la classe Pencil pour prendre en charge cette
    // nouvelle forme. Vous devrez également ajouter une méthode pour ajouter un cercle à la liste des formes dessinées,
    // similaire à la méthode addShape existante.
}




