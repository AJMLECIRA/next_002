'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CanvasViews from './CanvasViews';
import { useBreakpointValue } from '@chakra-ui/react';
import {
  Regular,
  Round,
  Arch,
  Gothic,
  Overmantle,
  SemiCircle,
  Radius,
  Pill,
  LgRadius,
  Hexagon,
  Triangle,
  Octagon,
  Pentagon,
  Diamond,
  Kite,
  IrrQuad,
  CutCorner,
} from '../components/calc/ShapesMirrors';
import { setBasketItemImg } from '@/app/redux/slices/configBasketSlice';

const CanvasImg = () => {
  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState(null);
  // #################  Redux  ####################
  const mirrorWidth = useSelector(
    (state) => state.configGlass.mirrorMaterialWidth
  );
  const mirrorHeight = useSelector(
    (state) => state.configGlass.mirrorMaterialHeight
  );
  const mirrorShape = useSelector(
    (state) => state.configGlass.mirrorMaterialShape
  );
  const rad1 = useSelector((state) => state.configGlass.mirrorMaterialRad1);
  const rad2 = useSelector((state) => state.configGlass.mirrorMaterialRad2);
  const rad3 = useSelector((state) => state.configGlass.mirrorMaterialRad3);
  const rad4 = useSelector((state) => state.configGlass.mirrorMaterialRad4);
  const group = useSelector((state) => state.configGlass.mirrorMaterialGroup);
  const aged = useSelector((state) => state.configGlass.mirrorMaterialCode);
  const edge = useSelector((state) => state.configGlass.mirrorMaterialEdge);
  const tint = useSelector((state) => state.configGlass.selectedColRef);
  const tintHL = useSelector((state) => state.configGlass.selectedColRefHL);
  const tintName = useSelector((state) => state.configGlass.mirrorMaterialName);

  // #################  state  ####################
  const [selectedView, setSelectedView] = useState('clean'); // Initial selected view

  const [core, setCore] = useState({});
  const [cust, setCust] = useState({});
  const [isDataReady, setIsDataReady] = useState(false);
  const [pattern, setPattern] = useState(null);
  const [patternUpdated, setPatternUpdated] = useState(false);
  const [isAgedImgLoaded, setIsAgedImgLoaded] = useState(false);

  const handleSelectedViewChange = (view) => {
    setSelectedView(view);
  };
  const borderRadius = useBreakpointValue({ base: '3vw', md: '1.5vw' });

  // ##########    Load Images    ############
  const [mannequin, setMannequin] = useState(null); // State to store the mannequin image data
  const loadMannequinImage = () => {
    return new Promise((resolve, reject) => {
      const mannequinImage = new Image();
      mannequinImage.onload = () => resolve(mannequinImage);
      setMannequin(mannequinImage);
      mannequinImage.onerror = (error) => reject(error);
      mannequinImage.src = '/images/MannequinSm.png';
    });
  };
  const [background, setBackground] = useState(null); // State to store the mannequin image data
  const loadBackgroundImage = () => {
    return new Promise((resolve, reject) => {
      const backgroundImage = new Image();
      backgroundImage.onload = () => resolve(backgroundImage);
      setBackground(backgroundImage);
      backgroundImage.onerror = (error) => reject(error);
      backgroundImage.src = '/images/backgroundsm.jpg';
    });
  };
  const [agedImg, setAgedImg] = useState(null); // State to store the mannequin image data
  const loadAgedImage = () => {
    return new Promise((resolve, reject) => {
      const agedImage = new Image();
      agedImage.onload = () => {
        setAgedImg(agedImage);
        setIsAgedImgLoaded(true); // Set to true when image is loaded
        resolve(agedImage);
      };
      agedImage.onerror = (error) => {
        setIsAgedImgLoaded(false); // Set to false on error
        reject(error);
      };
      agedImage.src = `/images/${aged}.jpg`;
    });
  };

  const [reflection, setReflection] = useState(null); // State to store the reflection image data
  const reflectionImage = () => {
    return new Promise((resolve, reject) => {
      const reflection = new Image();
      reflection.onload = () => resolve(reflection);
      setReflection(reflection);
      reflection.onerror = (error) => reject(error);
      reflection.src = '/images/reflection.jpg';
    });
  };

  useEffect(() => {
    Promise.all([
      loadMannequinImage(),
      loadBackgroundImage(),
      reflectionImage(),
    ])
      .then(([mannequin, background, reflection]) => {
        coreMeasurements(mannequin);
        // Process background and reflection if needed
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  }, []);
  // ###############  End Mannequin   ##################

  // createVariables to be held in coreState
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const coreMeasurements = (mannequin) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Set canvas and other dimensions constants
    const canvasHeight = 600; // px
    const canvasWidth = 1000; // px
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const whitespace = 120; // amount of space top and bottom
    const landscapeWhitespace = 240; // amount of space top and bottom
    const mannequinGap = 50; // amount of space top and bottom
    const mannequinPxHeight = mannequin.height; // mannerquin image Height
    const mannequinPxWidth = mannequin.width; // mannequin Image width"
    const mannequinRealHeight = 1930; // fixed real world size in mm - 5'10"
    const mannequinScale = mannequinRealHeight / mannequinPxHeight;
    const mannequinRealWidth = mannequinPxWidth * mannequinScale;
    setCore((prevCore) => ({
      ...prevCore,
      whitespace: whitespace,
      landscapeWhitespace: landscapeWhitespace,
      mannequinRealWidth: mannequinRealWidth,
      mannequinPxHeight: mannequinPxHeight,
      mannequinPxWidth: mannequinPxWidth,
      mannequinRealHeight: mannequinRealHeight,
      mannequinScale: mannequinScale,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
      ctx: ctx,
      mannequin: mannequin,
      mannequinGap: mannequinGap,
    }));
  };

  useEffect(() => {
    //console.log(core);
    if (rad1) {
      cust.rad1 = rad1 * cust.scale;
    }
    if (rad2) {
      cust.rad2 = rad2 * cust.scale;
    }
    if (rad3) {
      cust.rad3 = rad3 * cust.scale;
    }
    if (rad4) {
      cust.rad4 = rad4 * cust.scale;
    }
    custMeasurements(core);
  }, [core, rad1, rad2, rad3, rad4]);

  const custMeasurements = (core) => {
    const ctx = core.ctx;
    //Mirror is landscape or portrait?
    let ratio =
      mirrorHeight /
      ((mirrorWidth + core.mannequinRealWidth) *
        (core.canvasHeight / core.canvasWidth)); // 0.6 is ratio 1000 x 600 canvasize
    let mode = ratio > 1 ? 'portrait' : 'landscape';
    // default landscape scale
    let scale =
      core.canvasWidth /
      (mirrorWidth +
        core.mannequinGap +
        core.mannequinRealWidth +
        core.landscapeWhitespace * 2);
    if (mode === 'portrait') {
      scale = (core.canvasHeight - core.whitespace) / mirrorHeight;
    }

    let scaleHeight = mirrorHeight * scale;
    let scaleWidth = mirrorWidth * scale;
    let scaledMannequinHeight =
      core.mannequinPxHeight * core.mannequinScale * scale;
    let scaledMannequinWidth =
      core.mannequinPxWidth * core.mannequinScale * scale;

    // background landscape mode
    let feet = (1800 + core.whitespace * 2) * core.mannequinScale * scale; // 1850 is px postion to feet of png
    let bgScale = ((core.canvasHeight / 544) * feet) / core.canvasHeight; // 544 if px to floor line in Background image
    let backgroundHeight = core.canvasHeight * bgScale;
    let backgroundWidth = core.canvasWidth * bgScale;

    let offsetX =
      (core.canvasWidth -
        scaledMannequinWidth -
        core.mannequinGap -
        scaleWidth) /
      2;
    let mirrorX = offsetX + scaledMannequinWidth + core.mannequinGap;
    let mirrorY = core.whitespace / 2;
    let mannequinOffsetX = offsetX;
    let mannequinOffsetY = mirrorY;
    let oversize = mirrorHeight > 1700; // maximum before moving manneuin and background size
    let pushDown = 0;
    if (oversize) {
      pushDown = (mirrorHeight - 1700) * scale * core.mannequinScale;
      backgroundHeight = core.canvasHeight;
      backgroundWidth = core.canvasWidth; // 0.6 is the ration of the background
      mannequinOffsetY = mannequinOffsetY + pushDown;
    }

    setCust((prevCust) => ({
      ...prevCust,
      scaleWidth: scaleWidth,
      scaleHeight: scaleHeight,
      scaledMannequinWidth: scaledMannequinWidth,
      scaledMannequinHeight: scaledMannequinHeight,
      mannequinOffsetX: mannequinOffsetX,
      mannequinOffsetY: mannequinOffsetY,
      offsetX: offsetX,
      mirrorX: mirrorX,
      mirrorY: mirrorY,
      scale: scale,
      mode: mode,
      backgroundWidth: backgroundWidth,
      backgroundHeight: backgroundHeight,
      oversize: oversize,
      pushDown: pushDown,
      rad1: rad1 * scale,
      rad2: rad2 * scale,
      rad3: rad3 * scale,
      rad4: rad4 * scale,
    }));
  };

  useEffect(() => {
    if (group === 'aged' && !isAgedImgLoaded) {
      // Pause or perform alternative actions until the aged image is loaded
      return;
    }

    clearCanvas(core.ctx, selectedView);
    createVisual(core.ctx, core, selectedView);
  }, [cust, isAgedImgLoaded]);

  useEffect(() => {
    custMeasurements(core);
  }, [
    mirrorWidth,
    mirrorHeight,
    selectedView,
    group,
    mirrorShape,
    tint,
    aged,
    agedImg,
  ]);

  useEffect(() => {
    if (group === 'aged') {
      loadAgedImage();
    }
  }, [aged]);

  const clearCanvas = (ctx) => {
    if (ctx) {
      ctx.clearRect(0, 0, core.canvasWidth, core.canvasHeight);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  };
  const createVisual = (ctx, core, selectedView) => {
    if (ctx) {
      //console.log(core);
      //console.log(cust);

      //console.log('Create Visuals for ', selectedView);
      drawBackground(ctx, core, selectedView);

      //addDropShadow(ctx, cust, group, tint, aged);
      if (group === 'plain') {
        drawShape(ctx, cust, 'hsl(0, 0%, 83%)');
        // add gradient or reflection
        if (selectedView !== 'clean') {
          addReflection(ctx, cust);
        }
        gradientFill(ctx, cust);
      } else if (group === 'tinted') {
        drawShape(ctx, cust, tint);
        if (selectedView !== 'clean') {
          mergeImageFill(ctx, cust, tintHL);
        }
        if (!tintName.includes('Satin')) {
          gradientFill(ctx, cust);
        }
      } else {
        drawShape(ctx, cust, 'hsl(0, 0%, 83%)');
        drawAgedShape(ctx, cust, agedImg);
        if (selectedView !== 'clean') {
          //drawAgedMirror(ctx, cust, agedImg);
          mergeImageFill(ctx, cust, aged);
        }
        if (!tintName.includes('Satin')) {
          gradientFill(ctx, cust);
        }
      }

      drawMannequin(ctx, core, cust);
      drawBaseline(ctx, core, cust);
      thumbnail(ctx);
    }
  };
  const drawBackground = (ctx, core, selectedView) => {
    if (ctx && background) {
      // Load and draw the background image
      if (selectedView !== 'clean') {
        const aspectRatio = background.width / background.height; // Calculate the aspect ratio of the background image
        const imageHeight = core.canvasWidth / aspectRatio; // Calculate the height based on the canvas width to maintain aspect ratio
        const offsetY = core.canvasHeight - imageHeight; // Calculate the vertical position to align at the bottom
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.drawImage(
          background,
          0,
          offsetY,
          cust.backgroundWidth,
          cust.backgroundHeight
        );
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }
  };
  const drawShape = (ctx, cust, fill) => {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fill;
    renderShape(
      cust.mirrorX,
      cust.mirrorY,
      cust.scaleWidth,
      cust.scaleHeight,
      cust.rad1,
      cust.rad2,
      cust.rad3,
      cust.rad4,
      ctx
    );
    addDropShadow(ctx, cust);
    ctx.fill();
    ctx.restore();
  };
  const gradientFill = (ctx, cust) => {
    if (ctx) {
      if (isFinite(cust.scaleWidth) && isFinite(cust.scaleHeight)) {
        ctx.save();
        renderShape(
          cust.mirrorX,
          cust.mirrorY,
          cust.scaleWidth,
          cust.scaleHeight,
          cust.rad1,
          cust.rad2,
          cust.rad3,
          cust.rad4,
          ctx
        );
        let xCenter = cust.mirrorX + cust.scaleWidth * 0.2;
        let yCenter = cust.mirrorY + cust.scaleHeight * 0.2;
        let innerRadius = 20; // Start of the gradient
        let outerRadius = Math.max(cust.scaleWidth, cust.scaleHeight) / 2; // End of the gradient
        let gradient = ctx.createRadialGradient(
          xCenter,
          yCenter,
          innerRadius,
          xCenter,
          yCenter,
          outerRadius
        );
        // Add color stops (grey to white to grey to mid-grey to white)
        gradient.addColorStop(0, 'hsla(0, 0%, 100%, 0.9)');
        gradient.addColorStop(1, 'hsla(0, 0%, 82%, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }
  };
  const mergeImageFill = (ctx, cust, fill) => {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'hard-light';
    renderShape(
      cust.mirrorX,
      cust.mirrorY,
      cust.scaleWidth,
      cust.scaleHeight,
      cust.rad1,
      cust.rad2,
      cust.rad3,
      cust.rad4,
      ctx
    );
    ctx.clip();
    ctx.globalAlpha = 0.66;
    ctx.drawImage(
      reflection,
      cust.mirrorX,
      cust.mirrorY,
      cust.scaleWidth,
      cust.scaleHeight
    );
    ctx.restore();
  };
  const drawAgedShape = (ctx, cust, agedImg) => {
    ctx.save();
    ctx.beginPath();
    renderShape(
      cust.mirrorX,
      cust.mirrorY,
      cust.scaleWidth,
      cust.scaleHeight,
      cust.rad1,
      cust.rad2,
      cust.rad3,
      cust.rad4,
      ctx
    );
    ctx.clip();
    let agedWidth = 1350 * cust.scale;
    if (mirrorWidth > 1350) {
      agedWidth = cust.scaleWidth;
    }
    let agedHeight = 1350 * cust.scale;
    if (mirrorHeight > 1350) {
      agedHeight = cust.scaleHeight;
    }
    ctx.drawImage(agedImg, cust.mirrorX, cust.mirrorY, agedWidth, agedHeight);
    ctx.restore();
  };
  const renderShape = (x, y, width, height, rad1, rad2, rad3, rad4, ctx) => {
    if (ctx) {
      let shape;
      switch (mirrorShape) {
        case 'regular':
          shape = new Regular(x, y, width, height, ctx);
          break;
        case 'round':
          shape = new Round(x, y, width, height, ctx);
          break;
        case 'arch':
          shape = new Arch(x, y, width, height, ctx);
          break;
        case 'gothic':
          shape = new Gothic(x, y, width, height, ctx);
          break;
        case 'overmantle':
          shape = new Overmantle(x, y, width, height, ctx);
          break;
        case 'semicircle':
          shape = new SemiCircle(x, y, width, height, ctx);
          break;
        case 'radius':
          shape = new Radius(x, y, width, height, rad1, rad2, rad3, rad4, ctx);
          break;
        case 'pill':
          shape = new Pill(x, y, width, height, rad1, rad2, rad3, rad4, ctx);
          break;
        case 'lgradius':
          shape = new LgRadius(
            x,
            y,
            width,
            height,
            rad1,
            rad2,
            rad3,
            rad4,
            ctx
          );
          break;
        case 'hexagon':
          shape = new Hexagon(x, y, width, height, rad1, rad2, rad3, rad4, ctx);
          break;
        case 'pentagon':
          shape = new Pentagon(
            x,
            y,
            width,
            height,
            rad1,
            rad2,
            rad3,
            rad4,
            ctx
          );
          break;
        case 'octagon':
          shape = new Octagon(x, y, width, height, rad1, rad2, rad3, rad4, ctx);
          break;
        case 'diamond':
          shape = new Diamond(x, y, width, height, rad1, rad2, rad3, rad4, ctx);
          break;
        case 'kite':
          shape = new Kite(x, y, width, height, rad1, rad2, rad3, rad4, ctx);
          break;
        case 'triangle':
          shape = new Triangle(
            x,
            y,
            width,
            height,
            rad1,
            rad2,
            rad3,
            rad4,
            ctx
          );
          break;
        case 'irrQuad':
          shape = new IrrQuad(x, y, width, height, rad1, rad2, rad3, rad4, ctx);
          break;
        case 'cutCorner':
          shape = new CutCorner(
            x,
            y,
            width,
            height,
            rad1,
            rad2,
            rad3,
            rad4,
            ctx
          );
          break;

        default:
          return null; // Or some default shape
      }
      ctx.save();
      shape.draw(ctx);
      ctx.restore();
    }
  };
  const addDropShadow = (ctx, cust) => {
    ctx.shadowColor = 'rgba(0, 0, 0, .5)'; // Adjust color as needed
    ctx.shadowBlur = 10; // Adjust blur level as needed
    ctx.shadowOffsetX = 8; // Horizontal offset
    ctx.shadowOffsetY = 8; // Vertical offset
  };
  const addReflection = (ctx, cust) => {
    if (selectedView !== 'clean') {
      ctx.save();
      ctx.beginPath();
      renderShape(
        cust.mirrorX,
        cust.mirrorY,
        cust.scaleWidth,
        cust.scaleHeight,
        cust.rad1,
        cust.rad2,
        cust.rad3,
        cust.rad4,
        ctx
      );
      ctx.clip();
      ctx.drawImage(
        reflection,
        cust.mirrorX,
        cust.mirrorY,
        cust.scaleWidth,
        cust.scaleHeight
      );
      ctx.restore();
    }
  };
  const drawMannequin = (ctx, core, cust) => {
    // add the mannequin
    ctx.save();
    ctx.drawImage(
      core.mannequin,
      cust.mannequinOffsetX,
      cust.mannequinOffsetY,
      cust.scaledMannequinWidth,
      cust.scaledMannequinHeight
    );
    ctx.restore();
  };
  const drawBaseline = (ctx, core, cust) => {
    if (cust.pushDown > 0 && selectedView === 'clean') {
      const lineWidth = cust.scaleWidth + core.mannequinGap * 2;
      const lineHeight = 40; // Distance from the bottom of the canvas
      const shadowHeight = 15;
      const lineY = core.canvasHeight - lineHeight;
      const lineStartX = cust.offsetX + cust.scaledMannequinWidth;
      const lineEndX = lineStartX + lineWidth;
      // draw base line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineY);
      ctx.lineTo(lineEndX, lineY);
      ctx.strokeStyle = '#c9c9c9'; // Line color
      ctx.lineWidth = 0; // Line thickness
      // Set up drop shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 1)'; // Very light grey color
      ctx.shadowBlur = shadowHeight;
      ctx.shadowOffsetY = 15; // Adjust this as needed
      // Draw the line at the bottom
      ctx.stroke();
      ctx.stroke();
      ctx.restore();
    }
  };
  const thumbnail = (ctx) => {
    // Get the original canvas element
    const canvas = canvasRef.current;

    // Create a new canvas with the desired dimensions (250 x 150)
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = 250;
    resizedCanvas.height = 150;
    const resizedCtx = resizedCanvas.getContext('2d');

    // Draw the contents of the original canvas onto the resized canvas
    resizedCtx.drawImage(canvas, 0, 0, 250, 150);

    // Convert the resized canvas to a Data URL
    const dataURL = resizedCanvas.toDataURL('image/png');

    // Set the image source in your Redux state
    if (dataURL) {
      dispatch(setBasketItemImg(dataURL));
    }

    // Log the Data URL for debugging
    //console.log(dataURL);
  };
  return (
    <>
      <div style={{ borderRadius: '4vw' }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: borderRadius,
          }}
        />
        <CanvasViews
          selectedView={selectedView}
          onSelectedViewChange={handleSelectedViewChange}
        />
      </div>
    </>
  );
};

export default CanvasImg;
