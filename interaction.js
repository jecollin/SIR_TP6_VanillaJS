
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
  function constructor() {
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  function onMouseDown(evt) {
    this.startX = evt.x;
    this.startY = evt.y;
  }

  // Developper les 3 fonctions gérant les événements


  function onMouseMove(evt) {
    this.endX = evt.x;
    this.endY = evt.y;
  }

  function onMouseUp(evt) {
    this.endX = evt.x;
    this.endY = evt.y;

    // Calculer le déplacement
    const deltaX = this.endX - this.startX;
    const deltaY = this.endY - this.startY;
    console.log(`Le déplacement est de (${deltaX}, ${deltaY})`);
  }



	// Associer les fonctions précédentes aux évènements du canvas.
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



