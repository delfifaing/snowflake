
// -------- Canvas --------
const canvas = document.getElementById("canvas1");
// Create a superobject context (ctx), which will have all the methods to draw
const ctx = canvas.getContext('2d');
// Set canvas dimensions (in this case equal to the window dimension)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --------  --------

const maxLevel = Math.random() * 4 + 1;
const branches = Math.random() * 4 + 1;
const sides    = Math.floor(Math.random() * 10 + 3);
// Spread of the angle: between 0.51 and 0.99 (the difference is 0.48)
const spread = Math.random() * 0.48 + 0.51;
// Angle at which the branches divide
const angle = Math.PI * 2 * spread;

// Call method to translate canvas to the middle of the screen
ctx.translate(canvas.width / 2, canvas.height / 2);

// Main function to draw one parent branch with its sons
function drawline(level) {
  if (level > maxLevel)
    return;

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(200,0);
  ctx.stroke();

  // Draw the splits
  for (let i = 1; i < branches + 1; i++) {
    ctx.save();
    // Point from where the branches will grow from the parten
    ctx.translate(200 * i / branches + 1, 0);
    // Whenever the branches split, the next branche is half the thickness and length of the parent
    ctx.scale(0.5, 0.5);
    ctx.save();

    // Rotate
    ctx.rotate(angle);
    // Recursion !
    drawline(level + 1);
    // Set canvas to the last position before the last rotation (undo canvas' last rotation)
    ctx.restore();
    ctx.save();

    // Rotate in the oposite direction
    ctx.rotate(-angle);
    drawline(level + 1);
    // Undo again canvas' last rotation (to the position of the last save)
    ctx.restore();
    // Undo again to the first save of the loop, to undo the translations
    ctx.restore();
  }
}

// Loop to repeat the process to get more parent branches

for (let i = 0; i < sides; i ++) {
  drawline(0);
  ctx.rotate(Math.PI * 2 / sides )
}
