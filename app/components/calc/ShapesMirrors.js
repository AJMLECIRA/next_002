export class Gradient {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw(ctx) {
    let gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      10,
      this.x,
      this.y,
      Math.max(this.width, this.height) / 2,
    );
    console.log(this.x);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'rgba(210,210,210,1)'); // Adjust colors as needed
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}
export class Colour {
  constructor(tint, ctx) {
    this.tint = tint;
  }
  draw(ctx) {
    ctx.fillStyle = this.tint;
    ctx.fill();
  }
}
export class Tinted {
  constructor(tint) {
    this.tint = tint;
  }
  draw(ctx) {
    ctx.fillStyle = this.tint;
    ctx.fill();
  }
}
export class Aged {
  constructor(aged) {
    this.aged = aged;
  }
  draw(ctx) {
    console.log('place aged glass on image');
    ctx.drawImage(
      core.aged,
      cust.mirrorX,
      cust.mirrorY,
      cust.scaledMannequinWidth,
      cust.scaledMannequinHeight,
    );
    ctx.fill();
  }
}
export class Regular {
  constructor(x, y, width, height, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw(ctx) {
    ctx.rect(this.x, this.y, this.width, this.height);
  }
}
export class Round {
  constructor(xstart, ystart, xwidth, yheight, ctx) {
    this.width = xwidth;
    this.height = yheight;
    this.xstart = xstart;
    this.ystart = ystart;
    this.radiusX = xwidth / 2;
    this.radiusY = yheight / 2;
  }

  draw(ctx) {
    // Move the canvas context to the center of the oval
    ctx.translate(this.xstart + this.radiusX, this.ystart + this.radiusY);

    // Scale the context horizontally or vertically to turn the circle into an oval
    ctx.scale(this.radiusX / this.radiusY, 1);

    // Draw a circle that will be stretched into an oval due to the scaling
    ctx.arc(0, 0, this.radiusY, 0, 2 * Math.PI);
  }
}
export class Arch {
  constructor(xstart, ystart, xwidth, yheight, ctx) {
    this.width = xwidth;
    this.height = yheight;
    this.xstart = xstart;
    this.ystart = ystart;
    this.cpos = xstart + xwidth / 2;
  }

  draw(ctx) {
    const width = this.width; // total width of the arch
    const height = this.height; // total height of the arch
    const radius = width / 2; // radius of the semi-circle
    // Start from the left bottom of the semi-circle
    ctx.moveTo(this.xstart, this.ystart + radius);

    // Draw the semi-circle (top of the arch)
    ctx.arc(
      this.xstart + radius,
      this.ystart + radius,
      radius,
      Math.PI,
      0,
      false,
    );

    // Draw the right side of the arch
    ctx.lineTo(this.xstart + width, this.ystart + height);

    // Draw the bottom line of the arch
    ctx.lineTo(this.xstart, this.ystart + height);

    // Draw the left side of the arch and close the path
    ctx.closePath();
  }
}
export class Gothic {
  constructor(xstart, ystart, xwidth, yheight, ctx) {
    this.width = xwidth;
    this.height = yheight;
    this.xstart = xstart;
    this.ystart = ystart;
  }

  draw(ctx) {
    // Base of the arch
    const startX = this.xstart;
    const startY = this.ystart + this.height;

    // Apex of the arch
    const apexX = this.xstart + this.width / 2;
    const apexY = this.ystart;

    // End of the base
    const endX = this.xstart + this.width;
    const endY = startY;

    // Control points for the left curve (convex)
    let ctrl1X = startX - this.width * 0.05; // Adjust for convex shape
    let ctrl1Y = this.ystart + this.height * 0.35; // Adjust as needed

    // Control points for the right curve (convex and mirrored)
    let ctrl2X = endX + this.width * 0.05; // Adjust for convex shape
    let ctrl2Y = ctrl1Y; // Mirror the left control point

    ctx.moveTo(startX, startY);

    // Left curve
    ctx.bezierCurveTo(ctrl1X, ctrl1Y, apexX, apexY, apexX, apexY);

    // Right curve
    ctx.bezierCurveTo(apexX, apexY, ctrl2X, ctrl2Y, endX, endY);

    // Closing the path by drawing a line to the start point
    ctx.lineTo(startX, startY);
  }
}
export class Overmantle {
  constructor(xstart, ystart, xwidth, yheight, ctx) {
    this.xstart = xstart;
    this.ystart = ystart;
    this.xwidth = xwidth;
    this.yheight = yheight;
    this.cpos = xstart + xwidth / 2;
  }
  draw(ctx) {
    // Dimensions
    let w = this.xwidth; // Width
    let h = this.yheight; // Total height

    // Calculate ellipse dimensions based on constraints
    let ellipseHeight = h / 2.75;
    let ellipseWidth = w; // The width of the ellipse matches the width of the shape

    // Determine the top y-coordinate of the shape
    let yTop = this.ystart;

    // Starting x-coordinate for the shape to be centered
    let x = this.cpos - w / 2;

    // Center position for the elliptical part
    let centerX = x + w / 2;
    let centerY = yTop + ellipseHeight;

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
  }
}
export class SemiCircle {
  constructor(xstart, ystart, xwidth, yheight, ctx) {
    this.xstart = xstart;
    this.ystart = ystart;
    this.xwidth = xwidth;
    this.yheight = yheight;
  }

  draw(ctx) {
    // Determine the center of the semi-circle
    let centerX = this.xstart + this.xwidth / 2;
    let centerY = this.ystart + this.yheight / 2;

    // Radius is always half the width
    let radius = this.xwidth / 2;

    // Calculate the adjusted center y-coordinate to move the shape down by half the radius
    let adjustedCenterY = centerY + radius / 2;

    // Draw the upside-down semi-circle
    ctx.arc(centerX, adjustedCenterY, radius, 0, Math.PI, true); // true for counter-clockwise drawing
    ctx.closePath();
  }
}
export class Radius {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      rad1,
      rad2,
      rad3,
      rad4,
      ctx,
    });
  }
  draw(ctx) {
    let x = this.xstart;
    let y = this.ystart;
    let w = this.xwidth;
    let h = this.yheight;
    let r1 = this.rad1; // radius for the rounded corners
    let r2 = this.rad2; // radius for the rounded corners
    let r3 = this.rad3; // radius for the rounded corners
    let r4 = this.rad4; // radius for the rounded corners
    ctx.moveTo(x + r1, y);
    ctx.arcTo(x + w, y, x + w, y + h, r2); // Top right corner
    ctx.arcTo(x + w, y + h, x, y + h, r3); // Bottom right corner
    ctx.arcTo(x, y + h, x, y, r4); // Bottom left corner
    ctx.arcTo(x, y, x + w, y, r1); // Top left corner
    ctx.closePath();
  }
}
export class Pill {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      rad1,
      rad2,
      rad3,
      rad4,
      ctx,
    });
  }
  draw(ctx) {
    let x = this.xstart;
    let y = this.ystart;
    let w = this.xwidth;
    let h = this.yheight;
    let r = h / 2;
    if (w < h) {
      r = w / 2;
    }

    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); // Top right corner
    ctx.arcTo(x + w, y + h, x, y + h, r); // Bottom right corner
    ctx.arcTo(x, y + h, x, y, r); // Bottom left corner
    ctx.arcTo(x, y, x + w, y, r); // Top left corner
    ctx.closePath();
  }
}
export class LgRadius {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      rad1,
      rad2,
      rad3,
      rad4,
      ctx,
    });
  }
  draw(ctx) {
    let x = this.xstart;
    let y = this.ystart;
    let w = this.xwidth;
    let h = this.yheight;
    let r1 = this.rad1; // radius for the rounded corners
    let r2 = this.rad2; // radius for the rounded corners
    let r3 = this.rad3; // radius for the rounded corners
    let r4 = this.rad4; // radius for the rounded corners

    ctx.moveTo(x + r1, y);
    ctx.arcTo(x + w, y, x + w, y + h, r2); // Top right corner
    ctx.arcTo(x + w, y + h, x, y + h, r3); // Bottom right corner
    ctx.arcTo(x, y + h, x, y, r4); // Bottom left corner
    ctx.arcTo(x, y, x + w, y, r1); // Top left corner
    ctx.closePath();
  }
}
export class Hexagon {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      ctx,
    });
    this.radius = xwidth / 2;
    this.cposX = xstart + this.radius; // Center position X
    this.cposY = ystart + yheight / 2; // Center position Y, assuming yheight is at least the diameter
  }
  draw(ctx) {
    for (let i = 0; i < 6; i++) {
      let angle = ((2 * Math.PI) / 6) * i;
      let x = this.cposX + this.radius * Math.cos(angle);
      let y = this.cposY + this.radius * Math.sin(angle);

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
  }
}
export class Pentagon {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      ctx,
    });
    this.radius = xwidth / 2;
    this.cposX = xstart + this.radius; // Center position X
    this.cposY = ystart + yheight / 2; // Center position Y, assuming yheight is at least the diameter
  }
  draw(ctx) {
    for (let i = 0; i < 5; i++) {
      // Loop through five points
      let angle = ((2 * Math.PI) / 5) * i; // Divide the circle into five parts
      let x = this.cposX + this.radius * Math.cos(angle); // Calculate x coordinate
      let y = this.cposY + this.radius * Math.sin(angle); // Calculate y coordinate

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
  }
}
export class Octagon {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      ctx,
    });
    this.radius = xwidth / 2;
    this.cposX = xstart + this.radius; // Center position X
    this.cposY = ystart + yheight / 2; // Center position Y, assuming yheight is at least the diameter
  }

  draw(ctx) {
    for (let i = 0; i < 8; i++) {
      // Loop through five points
      let angle = ((2 * Math.PI) / 8) * i; // Divide the circle into five parts
      let x = this.cposX + this.radius * Math.cos(angle); // Calculate x coordinate
      let y = this.cposY + this.radius * Math.sin(angle); // Calculate y coordinate

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
  }
}
export class Diamond {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      ctx,
    });
  }

  draw(ctx) {
    // Center of the diamond
    const centerX = this.xstart + this.xwidth / 2;
    const centerY = this.ystart + this.yheight / 2;

    // Calculate the points of the diamond
    const topX = centerX;
    const topY = this.ystart;

    const rightX = this.xstart + this.xwidth;
    const rightY = centerY;

    const bottomX = centerX;
    const bottomY = this.ystart + this.yheight;

    const leftX = this.xstart;
    const leftY = centerY;

    // Drawing the diamond
    ctx.beginPath();
    ctx.moveTo(topX, topY); // Move to the top point
    ctx.lineTo(rightX, rightY); // Draw line to the right point
    ctx.lineTo(bottomX, bottomY); // Draw line to the bottom point
    ctx.lineTo(leftX, leftY); // Draw line to the left point
    ctx.closePath(); // Close the path
  }
}
export class Kite {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      ctx,
    });
    this.radius = xwidth / 2;
    this.cposX = xstart + this.radius; // Center position X
    this.cposY = ystart + yheight / 2; // Center position Y, assuming yheight is at least the diameter
  }

  draw(ctx) {
    // Calculate the center X coordinate of the kite
    const centerX = this.xstart + this.xwidth / 2;

    // Points of the kite
    // Apex (Top point)
    const apexX = centerX;
    const apexY = this.ystart;

    // Right point
    const rightX = this.xstart + this.xwidth;
    const rightY = this.ystart + this.yheight * 0.35; // Midpoint on the right side

    // Bottom point
    const bottomX = centerX;
    const bottomY = this.ystart + this.yheight;

    // Left point
    const leftX = this.xstart;
    const leftY = this.ystart + this.yheight * 0.35; // Midpoint on the left side

    // Drawing the kite shape
    ctx.beginPath();
    ctx.moveTo(apexX, apexY); // Start at the apex
    ctx.lineTo(rightX, rightY); // Draw line to the right point
    ctx.lineTo(bottomX, bottomY); // Draw line to the bottom point
    ctx.lineTo(leftX, leftY); // Draw line to the left point
    ctx.closePath(); // Close the path
  }
}
export class Triangle {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      ctx,
    });
  }

  draw(ctx) {
    // Apex (Top point)
    const apexX = this.xstart + this.xwidth / 2; // Center of the base
    const apexY = this.ystart; // Topmost point

    // Base left point
    const baseLeftX = this.xstart;
    const baseLeftY = this.ystart + this.yheight;

    // Base right point
    const baseRightX = this.xstart + this.xwidth;
    const baseRightY = this.ystart + this.yheight;

    // Drawing the triangle
    ctx.beginPath();
    ctx.moveTo(apexX, apexY); // Start at the apex
    ctx.lineTo(baseLeftX, baseLeftY); // Draw line to the base left point
    ctx.lineTo(baseRightX, baseRightY); // Draw line to the base right point
    ctx.closePath(); // Close the path and connect to the apex
  }
}
export class IrrQuad {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      ctx,
    });
  }
  draw(ctx) {
    // Using the constructor variables directly
    const halfWidth = this.xwidth / 2;
    const halfHeight = this.yheight / 2;

    // The center of the shape based on starting positions and dimensions
    const centerX = this.xstart + halfWidth;
    const centerY = this.ystart + halfHeight;

    // Defining vertices with slight offsets (adjusted as needed)
    const topLeftX = this.xstart + 10; // 10 pixels from the start on the X-axis
    const topLeftY = this.ystart + 0; // Start at the top on the Y-axis

    const topRightX = this.xstart + this.xwidth + 90; // Extend beyond the right edge by 90 pixels
    const topRightY = this.ystart + 15; // 15 pixels down from the top

    const bottomLeftX = this.xstart + 85; // 85 pixels from the start on the X-axis
    const bottomLeftY = this.ystart + this.yheight - 80; // 80 pixels up from the bottom edge

    const bottomRightX = this.xstart + this.xwidth - 160; // 160 pixels inwards from the right edge
    const bottomRightY = this.ystart + this.yheight - 0; // At the bottom on the Y-axis

    // Drawing the shape based on these points
    ctx.moveTo(topLeftX, topLeftY);
    ctx.lineTo(topRightX, topRightY);
    ctx.lineTo(bottomRightX, bottomRightY);
    ctx.lineTo(bottomLeftX, bottomLeftY);
    ctx.closePath();
  }
}
export class CutCorner {
  constructor(xstart, ystart, xwidth, yheight, rad1, rad2, rad3, rad4, ctx) {
    Object.assign(this, {
      xstart,
      ystart,
      xwidth,
      yheight,
      ctx,
    });
  }

  draw(ctx) {
    // Using constructor variables directly
    const halfWidth = this.xwidth / 2;
    const halfHeight = this.yheight / 2;

    // Center of the shape based on starting positions and dimensions
    const centerX = this.xstart + halfWidth;
    const centerY = this.ystart + halfHeight;

    // Define main vertices
    const topRightX = centerX + halfWidth;
    const topRightY = centerY - halfHeight;
    const bottomLeftX = centerX - halfWidth;
    const bottomLeftY = centerY + halfHeight;
    const bottomRightX = centerX + halfWidth;
    const bottomRightY = centerY + halfHeight;
    const topLeftX = centerX - halfWidth;
    const topLeftY = centerY - halfHeight;

    // Define the size of the cut-off corner
    const offset = Math.min(this.xwidth, this.yheight) * 0.4;

    // Cut-off corner vertices for the top left
    const cutX1 = topLeftX;
    const cutY1 = topLeftY + offset;
    const cutX2 = topLeftX + offset;
    const cutY2 = topLeftY;

    // Drawing the shape with a cut-off corner
    ctx.moveTo(cutX2, cutY2); // Start from the cut-off corner
    ctx.lineTo(topRightX, topRightY);
    ctx.lineTo(bottomRightX, bottomRightY);
    ctx.lineTo(bottomLeftX, bottomLeftY);
    ctx.lineTo(cutX1, cutY1);
    ctx.closePath();
  }
}
