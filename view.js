// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.


Drawing.prototype.draw = function(canvas) {
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < this.shapes.length; i++) {
        const shape = this.shapes[i];
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.thickness;
        if (shape instanceof Rectangle) {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape instanceof Line) {
            ctx.beginPath();
            ctx.moveTo(shape.x1, shape.y1);
            ctx.lineTo(shape.x2, shape.y2);
            ctx.stroke();
        }
    }
};


Shape.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.getColor();
    ctx.lineWidth = this.getThickness();
};

Rectangle.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    ctx.stroke();
};

Line.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.moveTo(this.getInitX(), this.getInitY());
    ctx.lineTo(this.getFinalX(), this.getFinalY());
    ctx.stroke();
};

Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.getShape().forEach(function(forme) {
        forme.paint(ctx);
    });
};

