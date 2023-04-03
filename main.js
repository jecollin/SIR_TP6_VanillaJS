
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width=800
canvas.height=600

// Code temporaire pour tester le DnD
new DnD(canvas);
ctx.fillStyle = '#F0F0F0'; // set canvas' background color
ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
/////

// Code temporaire pour tester l'affiche de la vue
var rec = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
rec.paint(ctx);
var ligne = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
ligne.paint(ctx);
// tester également Dessin.

// Création d'un nouveau dessin
const drawing = new Drawing();

// Ajout d'un rectangle rouge de largeur 100 et hauteur 50, en position (10, 10)
const rect1 = new Rectangle(10, 10, 100, 50, "red", 1);
drawing.addShape(rect1);

// Ajout d'une ligne bleue allant de (50, 100) à (150, 200)
const line1 = new Line(50, 100, 150, 200, "blue", 2);
drawing.addShape(line1);

// Affichage du dessin dans la console
console.log(drawing);

////

// Code final à utiliser pour manipuler Pencil.
//var drawing = new Drawing();
//var pencil = new Pencil(ctx, drawing, canvas);
//drawing.paint(ctx, canvas);

