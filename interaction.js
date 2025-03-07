
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
  function constructor(canvas) {
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.isDragging = false;
    this.canvas = canvas;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    canvas.addEventListener("mousedown", this.onMouseDown);
    canvas.addEventListener("mousemove", this.onMouseMove);
    canvas.addEventListener("mouseup", this.onMouseUp);

    // Getters
    function getStartX() {
      return this.startX;
    }

    function getStartY() {
      return this.startY;
    }

    function getEndX() {
      return this.endX;
    }

    function getEndY() {
      return this.endY;
    }

    // Setters
    function setStartX(value) {
      this.startX = value;
    }

    function setStartY(value) {
      this.startY = value;
    }

    function setEndX(value) {
      this.endX = value;
    }

    function setEndY(value) {
      this.endY = value;
    }
  }

  function onMouseDown(evt) {
    const { x, y } = getMousePosition(evt, this.canvas);
    this.startX = x;
    this.startY = y;
    this.isDragging = true;
    console.log(`Mouse down event: (${x}, ${y})`);

    interactor.onInteractionStart(this);

  }

  function onMouseMove(evt) {
    if (this.isDragging) {
      const { x, y } = getMousePosition(evt, this.canvas);
      this.endX = x;
      this.endY = y;
      console.log(`Mouse move event: (${x}, ${y})`);

      interactor.onInteractionUpdate(this);
    }
  }

  function onMouseUp(evt) {
    if (this.isDragging) {
      const { x, y } = getMousePosition(evt, this.canvas);
      this.endX = x;
      this.endY = y;
      this.isDragging = false;

      // Calculer le déplacement
      const deltaX = this.endX - this.startX;
      const deltaY = this.endY - this.startY;
      console.log(`Mouse up event: (${x}, ${y}), Delta: (${deltaX}, ${deltaY})`);

      interactor.onInteractionEnd(this);
    }
  }




	// Associer les fonctions précédentes aux évènements du canvas.
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(evt, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const y = evt.clientY - rect.top;
  return { x, y };
}





