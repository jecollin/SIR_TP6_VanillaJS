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

Drawing.prototype.paint = function(ctx, canvas) {
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.getShapes().forEach(function(shape) {
        shape.paint(ctx);
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
        this.undoButton = document.getElementById('undo');
        this.redoButton = document.getElementById('redo');

        // Gestion des événements
        this.canvas.addEventListener('mousedown', (event) => this.controller.onMouseDown(event));
        this.canvas.addEventListener('mousemove', (event) => this.controller.onMouseMove(event));
        this.canvas.addEventListener('mouseup', (event) => this.controller.onMouseUp(event));
        this.undoButton.addEventListener('click', () => this.controller.onUndo());
        this.redoButton.addEventListener('click', () => this.controller.onRedo());

        // Affichage initial
        this.model.getShapes().draw(this.canvas);
        this.updateShapeList();
        this.updateUndoRedoButtons();
    }

    update() {
        this.model.getShapes().draw(this.canvas);
        this.updateShapeList();
        this.updateUndoRedoButtons();
    }

    updateShapeList() {
        // Récupération de la liste des formes
        const shapes = this.model.getShapes().getShapes();
        const drawing = new Drawing();

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

            // Ajout de l'événement de suppression au bouton
            button.addEventListener('click', () => {
                this.controller.onDelete(shape);
            });

            this.shapeList.appendChild(item);
        });
    }

    updateUndoRedoButtons() {
        if (this.model.onUndo()) {
            this.undoButton.disabled = false;
        } else {
            this.undoButton.disabled = true;
        }

        if (this.model.onRedo()) {
            this.redoButton.disabled = false;
        } else {
            this.redoButton.disabled = true;
        }
    }

}


