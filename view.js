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

class View {
    constructor(controller, model) {
        this.controller = controller;
        this.model = model;

        // Récupération des éléments du DOM
        this.canvas = document.getElementById('paint');
        this.ctx = this.canvas.getContext('2d');
        this.shapeList = document.getElementById('shapeList');

        // Gestion des événements
        this.canvas.addEventListener('mousedown', (event) => this.controller.onMouseDown(event));
        this.canvas.addEventListener('mousemove', (event) => this.controller.onMouseMove(event));
        this.canvas.addEventListener('mouseup', (event) => this.controller.onMouseUp(event));

        // Affichage initial
        this.model.getShape().paint(this.ctx);
        this.updateShapeList();
        model.getShape().paint(this.ctx)
    }

    update() {
        this.model.getShape().paint(this.ctx);
        this.updateShapeList();
    }

    updateShapeList() {
        // Récupération de la liste des formes
        const shapes = this.model.getShape().getShape();

        // Vidage de la liste actuelle
        this.shapeList.innerHTML = '';

        // Parcours de la liste des formes pour les afficher
        shapes.forEach((shape) => {
            let item = document.createElement('li');
            let text;

            if (shape instanceof Line) {
                text = document.createTextNode(`Line: (${shape.getInitX()}, ${shape.getInitY()}) - (${shape.getFinalX()}, ${shape.getFinalY()})`);
            } else if (shape instanceof Rectangle) {
                text = document.createTextNode(`Rectangle: (${shape.getX()}, ${shape.getY()}) - (${shape.getWidth()}, ${shape.getHeight()})`);
            }

            // Ajout du bouton supprimer devant chaque élément
            let button = document.createElement('button');
            button.type = 'button';
            button.classList.add('btn', 'btn-default');

            let span = document.createElement('span');
            span.classList.add('glyphicon', 'glyphicon-remove-sign');

            button.appendChild(span);
            item.appendChild(button);
            item.appendChild(text);

            this.shapeList.appendChild(item);
        });
    }

}

