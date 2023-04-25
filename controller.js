import { updateShapeList } from './view.js';

var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = null;
	this.undoStack = [];
	this.redoStack = [];
	this.drawing = drawing;

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

	document.getElementById("butUndo").onclick = () => {
		this.onUndo();
	};

	document.getElementById("butRedo").onclick = () => {
		this.onRedo();
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
			this.undoStack.push(this.currentShape);
			this.currentShape = null;
			updateShapeList(drawing.getShapes());
		}
	}

	this.onUndo = function() {
		if (this.undoStack.length > 0) {
			const shape = this.undoStack.pop();
			this.redoStack.push(shape);
			this.drawing.deleteShape(shape);
			this.drawing.paint(ctx);
			updateShapeList(this.drawing.getShapes());
		}
	}


	this.onRedo = function() {
		if (this.redoStack.length > 0) {
			const shape = this.redoStack.pop();
			this.undoStack.push(shape);
			this.drawing.addShape(shape);
			this.drawing.paint(ctx);
			updateShapeList(this.drawing.getShapes());
		}
	}

	this.onDelete = function(shape) {
		const index = this.drawing.getShapes().indexOf(shape);
		if (index !== -1) {
			this.undoStack.push(shape);
			this.drawing.deleteShape(shape);
			this.drawing.paint(ctx);
			updateShapeList(this.drawing.getShapes());
		}
	};




}

