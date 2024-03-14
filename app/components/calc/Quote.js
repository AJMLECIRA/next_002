'use client';
import { useSelector } from 'react-redux';

const Quote = () => {
  // Assuming you have a selector to retrieve width and height from your Redux state
  const width = useSelector((state) => state.configGlass.mirrorMaterialWidth);
  const height = useSelector((state) => state.configGlass.mirrorMaterialHeight);
  const { mirrorMaterialWidth, mirrorMaterialHeight } = useSelector(
    (state) => state.configGlass
  );

  // Calculate the area of the glass
  const glassArea = (mirrorMaterialWidth * mirrorMaterialHeight) / 1000000;

  // Calculate the basic quote (assuming £100 per square meter)
  const basicQuote = glassArea * 66.35;

  return Number(basicQuote.toFixed(2));
};

export default Quote;
