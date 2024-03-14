export class Circle {
  constructor(xpos, ypos, radius, lineColor, lineWidth, fill, cpos) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
  }

  draw(ctx) {
    // Set properties for drawing
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.lineJoin = 'round'; // Specifies the type of corner created when two lines meet

    // Begin path and draw circle
    ctx.beginPath();
    ctx.arc(this.cpos, this.cpos, this.radius, 0, Math.PI * 2, false); // Draw full circle
    ctx.fill(); // Fill the circle
    ctx.stroke(); // Draw the circle outline
    ctx.closePath();
  }
}
export class Regular {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
  }

  draw(ctx) {
    const xstart = this.cpos - this.xwidth / 2;
    const ystart = this.cpos - this.yheight / 2;
    // Set properties for drawing
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.lineJoin = 'round'; // Specifies the type of corner created when two lines meet

    // Begin path and draw square
    ctx.beginPath();
    ctx.moveTo(xstart, ystart);
    ctx.lineTo(xstart + this.xwidth, ystart);
    ctx.lineTo(xstart + this.xwidth, ystart + this.yheight);
    ctx.lineTo(xstart, ystart + this.yheight);
    ctx.closePath(); // Complete the square path
    ctx.fill(); // Fill the square
    ctx.stroke(); // Draw the square outline
  }
}
export class Arch {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }

  draw(ctx) {
    // Determine the center of the mirror
    let mirrorCentreX = this.cpos;
    let mirrorCentreY = this.cpos;

    // Radius is always half the width
    let rad = this.xwidth / 2;

    // Calculate gaps based on the canvas size and mirror size
    let vgap = (this.ch - this.yheight) / 2;
    let hgap = (this.cw - this.xwidth) / 2;

    // Calculate shoulder positions
    let LshoulderY = vgap + rad;
    let LshoulderX = hgap;
    let RshoulderX = hgap + this.xwidth;

    // Calculate the height of the straight side
    let sideH = this.yheight - rad;

    // Setting up the style
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.lineJoin = 'round';
    ctx.fillStyle = this.fill;

    // Draw the shape
    ctx.beginPath();
    ctx.arc(mirrorCentreX, LshoulderY, rad, 0, Math.PI, true);
    ctx.lineTo(LshoulderX, LshoulderY + sideH); // Adjusted based on sideH
    ctx.lineTo(RshoulderX, LshoulderY + sideH); // Adjusted based on sideH
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
export class Radius {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }
  draw(ctx) {
    let x = this.cpos - this.xwidth / 2;
    let y = this.cpos - this.yheight / 2;
    let w = this.xwidth;
    let h = this.yheight;
    let r = 75; // radius for the rounded corners

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
export class LgRadius {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }
  draw(ctx) {
    let x = this.cpos - this.xwidth / 2;
    let y = this.cpos - this.yheight / 2;
    let w = this.xwidth;
    let h = this.yheight;
    let r = 150; // radius for the rounded corners

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
export class Overmantle {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }
  draw(ctx) {
    // Dimensions
    let w = this.xwidth; // Width
    let h = this.yheight; // Total height

    // Calculate ellipse dimensions based on constraints
    let ellipseHeight = h / 2.75;
    let ellipseWidth = w; // The width of the ellipse matches the width of the shape

    // Determine the top y-coordinate of the shape
    let yTop = this.cpos - h / 2;

    // Starting x-coordinate for the shape to be centered
    let x = this.cpos - w / 2;

    // Center position for the elliptical part
    let centerX = x + w / 2;
    let centerY = yTop + ellipseHeight;

    ctx.beginPath();

    // Draw the half-oval (elliptical arch) on top
    ctx.moveTo(x, centerY);
    ctx.ellipse(
      centerX,
      centerY,
      ellipseWidth / 2,
      ellipseHeight,
      0,
      Math.PI,
      2 * Math.PI,
    ); // Elliptical arc

    // Draw the rectangle below
    ctx.lineTo(x + w, centerY + h - ellipseHeight);
    ctx.lineTo(x, centerY + h - ellipseHeight);
    ctx.lineTo(x, centerY);

    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
export class Hexagon {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth; // width of the hexagon
    this.yheight = yheight; // height of the hexagon
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos; // central position
    this.cw = cw; // canvas width
    this.ch = ch; // canvas height
    this.radius = xwidth / 2; // half of the hexagon width
  }
  draw(ctx) {
    ctx.beginPath();

    for (let i = 0; i < 6; i++) {
      let angle = ((2 * Math.PI) / 6) * i;
      let x = this.cpos + this.radius * Math.cos(angle);
      let y = this.cpos + this.radius * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
export class Gothic {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }

  draw(ctx) {
    // Given points
    // const startX = 225;
    // const startY = 400;
    // const apexX = 300;
    // const apexY = 200;
    // const endX = 375;
    // const endY = 400;

    // // Control points for curve between A and B
    // let ctrl1X = startX + (apexX - startX) * 0.25;
    // let ctrl1YOffset = -150; // This is the first variable you can change
    // let ctrl1Y = startY + ctrl1YOffset;

    // let ctrl2X = startX + (apexX - startX) * 0.75;
    // let ctrl2YOffset = 180; // This is the second variable you can change
    // let ctrl2Y = startY - ctrl2YOffset;

    // ctx.beginPath();
    // ctx.moveTo(startX, startY);
    // ctx.bezierCurveTo(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, apexX, apexY);

    // // Control points for mirrored curve between C and B
    // let ctrl3X = 2 * apexX - ctrl1X;
    // let ctrl3Y = ctrl1Y; // Y-coordinate remains the same

    // let ctrl4X = 2 * apexX - ctrl2X;
    // let ctrl4Y = ctrl2Y; // Y-coordinate remains the same

    // ctx.bezierCurveTo(ctrl4X, ctrl4Y, ctrl3X, ctrl3Y, endX, endY); // Notice the swapped order of control points

    // // Draw straight line from C to A to close the path
    // ctx.lineTo(startX, startY);

    const centerX = this.cpos;
    const centerY = this.cpos;

    // Calculate the points based on the width and height
    const startX = centerX - this.xwidth / 2;
    const startY = centerY + this.yheight / 2;
    const apexX = centerX;
    const apexY = centerY - this.yheight / 2;
    const endX = centerX + this.xwidth / 2;
    const endY = startY;

    // Control points for curve between A and B
    let ctrl1X = startX + (apexX - startX) * 0.25;
    let ctrl1YOffset = -this.xwidth; // Adjust as needed
    let ctrl1Y = startY + ctrl1YOffset;

    let ctrl2X = startX + (apexX - startX) * 0.75;
    let ctrl2YOffset = this.yheight - 20; // Adjust as needed
    let ctrl2Y = startY - ctrl2YOffset;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, apexX, apexY);

    // Control points for mirrored curve between C and B
    let ctrl3X = 2 * apexX - ctrl1X;
    let ctrl3Y = ctrl1Y;
    let ctrl4X = 2 * apexX - ctrl2X;
    let ctrl4Y = ctrl2Y;

    ctx.bezierCurveTo(ctrl4X, ctrl4Y, ctrl3X, ctrl3Y, endX, endY);
    ctx.lineTo(startX, startY);

    //ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
export class Pill {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }
  draw(ctx) {
    const centerX = this.cpos;
    const centerY = this.cpos;

    const startX = centerX - this.xwidth / 2;
    const startY = centerY - this.yheight / 2;
    const endX = centerX + this.xwidth / 2;
    const endY = centerY + this.yheight / 2;
    const radius = this.xwidth / 2;

    ctx.beginPath();
    ctx.moveTo(startX, startY + radius); // Start at the top left, minus the radius
    ctx.lineTo(startX, endY - radius); // Draw left line
    ctx.arcTo(startX, endY, centerX, endY, radius); // Bottom left semi-circle
    ctx.lineTo(endX - radius, endY); // Draw bottom line
    ctx.arcTo(endX, endY, endX, centerY, radius); // Bottom right semi-circle
    ctx.lineTo(endX, startY + radius); // Draw right line
    ctx.arcTo(endX, startY, centerX, startY, radius); // Top right semi-circle
    ctx.lineTo(startX + radius, startY); // Draw top line
    ctx.arcTo(startX, startY, startX, centerY, radius);

    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
export class Diamond {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }
  draw(ctx) {
    const centerX = this.cpos;
    const centerY = this.cpos;

    const topX = centerX;
    const topY = centerY - this.yheight / 2;
    const bottomX = centerX;
    const bottomY = centerY + this.yheight / 2;
    const leftX = centerX - this.xwidth / 2;
    const leftY = centerY;
    const rightX = centerX + this.xwidth / 2;
    const rightY = centerY;

    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(rightX, rightY);
    ctx.lineTo(bottomX, bottomY);
    ctx.lineTo(leftX, leftY);
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
export class Kite {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }
  draw(ctx) {
    const centerX = this.cpos;
    const centerY = this.cpos;

    const topX = centerX;
    const topY = centerY - this.yheight / 2;
    const bottomX = centerX;
    const bottomY = centerY + this.yheight / 2;
    const leftX = centerX - this.xwidth / 2;
    const rightX = centerX + this.xwidth / 2;

    // Adjusting the left and right vertices to be 25% of the height above the center line
    const verticalAdjustment = this.yheight * 0.2;
    const leftY = centerY - verticalAdjustment;
    const rightY = centerY - verticalAdjustment;

    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(leftX, leftY);
    ctx.lineTo(bottomX, bottomY);
    ctx.lineTo(rightX, rightY);
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
export class Triangle {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }
  draw(ctx) {
    const centerX = this.cpos;
    const centerY = this.cpos;

    // Calculate vertices of the triangle
    const halfWidth = this.xwidth / 2;

    const topX = centerX;
    const topY = centerY - this.yheight / 2;
    const bottomLeftX = centerX - halfWidth;
    const bottomLeftY = centerY + this.yheight / 2;
    const bottomRightX = centerX + halfWidth;
    const bottomRightY = centerY + this.yheight / 2;

    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(bottomLeftX, bottomLeftY);
    ctx.lineTo(bottomRightX, bottomRightY);
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
export class Pentagon {
  constructor(
    xwidth,
    yheight,
    radius,
    lineColor,
    lineWidth,
    fill,
    cpos,
    cw,
    ch,
  ) {
    this.radius = radius;
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }
  draw(ctx) {
    const centerX = this.cw / 2; // Assuming this.cw is the canvas width
    const centerY = this.ch / 2; // Assuming this.ch is the canvas height

    const angleIncrement = (2 * Math.PI) / 5;

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const x = centerX + this.radius * Math.sin(i * angleIncrement);
      const y = centerY - this.radius * Math.cos(i * angleIncrement);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.lineColor;
    ctx.stroke();
    ctx.fill();
  }
}
export class Octagon {
  constructor(
    xwidth,
    yheight,
    radius,
    lineColor,
    lineWidth,
    fill,
    cpos,
    cw,
    ch,
  ) {
    this.radius = radius;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }

  draw(ctx) {
    const centerX = this.cw / 2; // Assuming this.cw is the canvas width
    const centerY = this.ch / 2; // Assuming this.ch is the canvas height

    const angleIncrement = (2 * Math.PI) / 8;

    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const x = centerX + this.radius * Math.sin(i * angleIncrement);
      const y = centerY - this.radius * Math.cos(i * angleIncrement);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.lineColor;
    ctx.stroke();
    ctx.fill();
  }
}
export class IrrQuad {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }
  draw(ctx) {
    const centerX = this.cw / 2; // Assuming this.cw is the canvas width
    const centerY = this.ch / 2; // Assuming this.ch is the canvas height

    const halfWidth = this.xwidth / 2;
    const halfHeight = this.yheight / 2;

    // Defining vertices with slight offsets
    const topLeftX = centerX - halfWidth + 10;
    const topLeftY = centerY - halfHeight + 0;
    const topRightX = centerX + halfWidth + 90;
    const topRightY = centerY - halfHeight + 15;
    const bottomLeftX = centerX - halfWidth + 85;
    const bottomLeftY = centerY + halfHeight - 80;
    const bottomRightX = centerX + halfWidth - 160;
    const bottomRightY = centerY + halfHeight - 0;

    ctx.beginPath();
    ctx.moveTo(topLeftX, topLeftY);
    ctx.lineTo(topRightX, topRightY);
    ctx.lineTo(bottomRightX, bottomRightY);
    ctx.lineTo(bottomLeftX, bottomLeftY);
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.lineColor;
    ctx.stroke();
    ctx.fill();
  }
}
export class CutCorner {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.sideLength = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }

  draw(ctx) {
    const centerX = this.cw / 2; // Assuming this.cw is the canvas width
    const centerY = this.ch / 2; // Assuming this.ch is the canvas height

    const halfSide = this.sideLength / 2;
    const offset = this.sideLength * 0.4; // Define the size of the cut-off corner

    // Define main vertices
    const topRightX = centerX + halfSide;
    const topRightY = centerY - halfSide;
    const bottomLeftX = centerX - halfSide;
    const bottomLeftY = centerY + halfSide;
    const bottomRightX = centerX + halfSide;
    const bottomRightY = centerY + halfSide;
    const topLeftX = centerX - halfSide;
    const topLeftY = centerY - halfSide;

    // Cut-off corner vertices for the top left
    const cutX1 = topLeftX;
    const cutY1 = topLeftY + offset;
    const cutX2 = topLeftX + offset;
    const cutY2 = topLeftY;

    ctx.beginPath();
    ctx.moveTo(cutX2, cutY2); // Start from cut-off corner
    ctx.lineTo(cutX1, cutY1);
    ctx.lineTo(bottomLeftX, bottomLeftY);
    ctx.lineTo(bottomRightX, bottomRightY);
    ctx.lineTo(topRightX, topRightY);
    ctx.closePath();

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.lineColor;
    ctx.stroke();
    ctx.fill();
  }
}
export class SemiCircle {
  constructor(xwidth, yheight, lineColor, lineWidth, fill, cpos, cw, ch) {
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.fill = fill;
    this.cpos = cpos;
    this.cw = cw;
    this.ch = ch;
  }

  draw(ctx) {
    // Determine the center of the semi-circle
    let centerX = this.cpos;
    let centerY = this.cpos;

    // Radius is always half the width
    let radius = this.xwidth / 2;

    // Calculate the adjusted center y-coordinate to move the shape down by half the radius
    let adjustedCenterY = centerY + radius / 2;

    // Setting up the style
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fill;

    // Draw the upside-down semi-circle
    ctx.beginPath();
    ctx.arc(centerX, adjustedCenterY, radius, 0, Math.PI, true); // true for counter-clockwise drawing
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
