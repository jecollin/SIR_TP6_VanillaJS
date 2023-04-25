
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById("spinnerWidth").onchange = (event) => {
		this.currLineWidth = event.target.value;
	};

	document.getElementById("colour").onchange = (event) => {
		this.currColour = event.target.value;
	};

	document.getElementById("butRect").onclick = () => {
		this.currEditingMode = editingMode.rect;
	};

	document.getElementById("butLine").onclick = () => {
		this.currEditingMode = editingMode.line;
	};

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	this.onInteractionStart = function(dnd) {
		if (this.currEditingMode === editingMode.line) {
			this.currentShape = new Line(dnd.x1, dnd.y1, dnd.x2, dnd.y2, this.currLineWidth, this.currColour);
		} else if (this.currEditingMode === editingMode.rect) {
			this.currentShape = new Rectangle(dnd.x1, dnd.y1, dnd.x2 - dnd.x1, dnd.y2 - dnd.y1, this.currLineWidth, this.currColour);
		}
	}


	this.onInteractionUpdate = function(dnd) {
		if (this.currentShape) {
			if (this.currEditingMode === editingMode.line) {
				this.currentShape.x2 = dnd.x2;
				this.currentShape.y2 = dnd.y2;
			} else if (this.currEditingMode === editingMode.rect) {
				this.currentShape.width = dnd.x2 - dnd.x1;
				this.currentShape.height = dnd.y2 - dnd.y1;
			}
			drawing.paint(ctx);
			this.currentShape.paint(ctx);
		}
	}

	this.onInteractionEnd = function(dnd) {
		if (this.currentShape) {
			if (this.currEditingMode === editingMode.line) {
				this.currentShape.x2 = dnd.x2;
				this.currentShape.y2 = dnd.y2;
			} else if (this.currEditingMode === editingMode.rect) {
				this.currentShape.width = dnd.x2 - dnd.x1;
				this.currentShape.height = dnd.y2 - dnd.y1;
			}
			drawing.addShape(this.currentShape);
			drawing.paint(ctx);
			this.currentShape = null;
		}
	}

}


