'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Circle,
  Regular,
  Arch,
  Radius,
  LgRadius,
  Overmantle,
  Hexagon,
  Gothic,
  Pill,
  Diamond,
  Kite,
  Triangle,
  Pentagon,
  Octagon,
  IrrQuad,
  CutCorner,
  SemiCircle,
} from '../components/Shapes';

const ShapeComp = ({
  shape,
  width,
  height,
  lineColor,
  lineWidth,
  fill,
  radius,
  cw,
  ch,
  cpos,
  ...otherProps
}) => {
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [hovered, setHovered] = useState(false); // New state to track hover

  const hoverFillColor = '#0cc6de'; // Change this to the color you want on hover

  useEffect(() => {
    //console.log('Create Canvass');
    const drawOnCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const actualFillColor = hovered ? hoverFillColor : fill;
      // perminent size of the canvas
      canvas.width = cw;
      canvas.height = ch;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let shapeInstance;
      switch (shape) {
        case 'circle':
          shapeInstance = new Circle(
            width,
            height,
            radius,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          ); // the order is important
          break;
        case 'regular':
          shapeInstance = new Regular(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          ); // the order is important
          break;
        case 'arch':
          shapeInstance = new Arch(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'radius':
          shapeInstance = new Radius(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'lgradius':
          shapeInstance = new LgRadius(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'overmantle':
          shapeInstance = new Overmantle(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'hexagon':
          shapeInstance = new Hexagon(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'gothic':
          shapeInstance = new Gothic(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'pill':
          shapeInstance = new Pill(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'diamond':
          shapeInstance = new Diamond(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'kite':
          shapeInstance = new Kite(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'triangle':
          shapeInstance = new Triangle(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'pentagon':
          shapeInstance = new Pentagon(
            width,
            height,
            radius,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'octagon':
          shapeInstance = new Octagon(
            width,
            height,
            radius,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'irrQuad':
          shapeInstance = new IrrQuad(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
          // case 'rombus':
          shapeInstance = new Rumbus(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'cutCorner':
          shapeInstance = new CutCorner(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        case 'semiCircle':
          shapeInstance = new SemiCircle(
            width,
            height,
            lineColor,
            lineWidth,
            actualFillColor,
            cpos,
            cw,
            ch
          );
          break;
        default:
          console.error('Invalid shape type provided');
          return;
      }

      shapeInstance.draw(ctx);

      // Convert canvas content to a Data URL after drawing
      const dataURL = canvas.toDataURL('image/png');
      //console.log('dataURL ', dataURL);
      setImgSrc(dataURL);
    };

    drawOnCanvas();
  }, [shape, width, height, hovered, ...Object.values(otherProps)]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          display: 'none', // only display 'block' for testing of actual size of drawing and canvass
        }}
      />
      {imgSrc && (
        // use the generated image to display on a page as it wil resize appropriately to fit it's container
        // this image will show the canvass containing the drawn shape central to the canvas. the canvas as whole will be resizes to fit 50% of the available space canvas of it's container   be the size of the drawn shape on a canvass e.g. 600x600 when the canvass fill 50% of the screen
        // <img
        //   src={imgSrc}
        //   alt="Canvas Content"
        //   style={{ width: '100%', height: 'auto' }}
        //   fill="true"
        //   sizes="(max-width: 768px) 16vw, (max-width: 1200px) 8vw, 8vw"
        //   onMouseEnter={() => setHovered(true)} // Set hover state to true on mouse enter
        //   onMouseLeave={() => setHovered(false)} // Set hover state to false on mouse leave
        // />
        <Image
          src={imgSrc}
          alt="Canvas Content"
          width="100"
          height="100"
          sizes="(max-width: 768px) 16vw, (max-width: 1200px) 8vw, 8vw"
          onMouseEnter={() => setHovered(true)} // Set hover state to true on mouse enter
          onMouseLeave={() => setHovered(false)} // Set hover state to false on mouse leave
        />
      )}
    </div>
  );
};

export default ShapeComp;
