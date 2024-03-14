// ReusableSvgImage.js
import React from 'react';
import TestSvg from '/public/svgs/glass-light.svg';
import Barclays from '/public/svgs/Barclays.svg';
import Barratthomes from '/public/svgs/barratt_homes.svg';
import Bbc from '/public/svgs/bbc.svg';
import Bevelcornerlight from '/public/svgs/bevel-corner-light.svg';
import Bevelcornerthin from '/public/svgs/bevel-corner-thin.svg';
import BIIDLogo from '/public/svgs/BIID_Logo.svg';
import BIIDLogoblack from '/public/svgs/BIID_Logo_black.svg';
import Bottomleftsolid from '/public/svgs/bottom-left-solid.svg';
import Bottomrightsolid from '/public/svgs/bottom-right-solid.svg';
import Burgerking from '/public/svgs/burger_king.svg';
import Edgesealbrush from '/public/svgs/edge-seal-brush.svg';
import Fiveguys from '/public/svgs/five_guys.svg';
import Glassdistressedlight from '/public/svgs/glass-distressed-light.svg';
import Glassdistressedthin from '/public/svgs/glass-distressed-thin.svg';
import Glasslight from '/public/svgs/glass-light.svg';
import Glasstexturedthin from '/public/svgs/glass-textured-thin.svg';
import Glassthin from '/public/svgs/glass-thin.svg';
import Glasstintedthin from '/public/svgs/glass-tinted-thin.svg';
import Gluesolid from '/public/svgs/glue-solid.svg';
import Gluethin from '/public/svgs/glue-thin.svg';
import Google from '/public/svgs/google.svg';
import Googlelogoblack from '/public/svgs/google_logo_black.svg';
import Googlelogowhite from '/public/svgs/google_logo_white.svg';
import Gsk from '/public/svgs/gsk.svg';
import Heatedpad from '/public/svgs/heated-pad.svg';
import Hiltonhotels from '/public/svgs/hilton_hotels.svg';
import Hsbc from '/public/svgs/hsbc.svg';
import Jdsports from '/public/svgs/jd_sports.svg';
import Manutd from '/public/svgs/manutd.svg';
import Marriott from '/public/svgs/Marriott.svg';
import Mercurehotels from '/public/svgs/mercure_hotels.svg';
import Mirrorworldicon from '/public/svgs/mirrorworld_icon.svg';
import Mirrorworldlogowhite from '/public/svgs/mirrorworld_logo_white.svg';
import Mounttape from '/public/svgs/mount-tape.svg';
import MWlogo from '/public/svgs/MW_logo.svg';
import Nhm from '/public/svgs/nhm.svg';
import None from '/public/svgs/none.svg';
import Screwcapgrommetsolid from '/public/svgs/screw-cap-grommet-solid.svg';
import Screwcapgrommetthin from '/public/svgs/screw-cap-grommet-thin.svg';
import Shieldplussharplight from '/public/svgs/shield-plus-sharp-light.svg';
import Shieldplussolid from '/public/svgs/shield-plus-solid.svg';
import Shieldplusthin from '/public/svgs/shield-plus-thin.svg';
import Shieldsharplight from '/public/svgs/shield-sharp-light.svg';
import Shieldshinesolid from '/public/svgs/shield-shine-solid.svg';
import Shieldshinethin from '/public/svgs/shield-shine-thin.svg';
import Shieldsolid from '/public/svgs/shield-solid.svg';
import Shieldthin from '/public/svgs/shield-thin.svg';
import Squaredashedduotone from '/public/svgs/square-dashed-duotone.svg';
import Styleglass from '/public/svgs/style-glass.svg';
import Stylesmart from '/public/svgs/style-smart.svg';
import Stylesynthetic from '/public/svgs/style-synthetic.svg';
import Styletiles from '/public/svgs/style-tiles.svg';
import Taylorwoodrow from '/public/svgs/taylor_woodrow.svg';
import Topleftsolid from '/public/svgs/top-left-solid.svg';
import Toprightsolid from '/public/svgs/top-right-solid.svg';
import Toyota from '/public/svgs/Toyota.svg';
import Travelodge from '/public/svgs/Travelodge.svg';
import Trustpilotcolour from '/public/svgs/trustpilot_colour.svg';
import Trustpilotcoloursimple from '/public/svgs/trustpilot_colour_simple.svg';
import Trustpilotwhite from '/public/svgs/trustpilot_white.svg';

const SvgImage = ({ src, width, height, fill }) => {
  let svgSource;

  // Use a switch statement to determine the SVG source based on the name
  switch (src) {
    case 'Barclays':
      return <Barclays fill={fill} width={width} height={height} />;
    case 'Barratthomes':
      return <Barratthomes fill={fill} width={width} height={height} />;
    case 'Bbc':
      return <Bbc fill={fill} width={width} height={height} />;
    case 'Bevelcornerlight':
      return <Bevelcornerlight fill={fill} width={width} height={height} />;
    case 'Bevelcornerthin':
      return <Bevelcornerthin fill={fill} width={width} height={height} />;
    case 'BIIDLogo':
      return <BIIDLogo fill={fill} width={width} height={height} />;
    case 'BIIDLogoblack':
      return <BIIDLogoblack fill={fill} width={width} height={height} />;
    case 'Bottomleftsolid':
      return <Bottomleftsolid fill={fill} width={width} height={height} />;
    case 'Bottomrightsolid':
      return <Bottomrightsolid fill={fill} width={width} height={height} />;
    case 'Burgerking':
      return <Burgerking fill={fill} width={width} height={height} />;
    case 'Edgesealbrush':
      return <Edgesealbrush fill={fill} width={width} height={height} />;
    case 'Fiveguys':
      return <Fiveguys fill={fill} width={width} height={height} />;
    case 'Glassdistressedlight':
      return <Glassdistressedlight fill={fill} width={width} height={height} />;
    case 'Glassdistressedthin':
      return <Glassdistressedthin fill={fill} width={width} height={height} />;
    case 'Glasslight':
      return <Glasslight fill={fill} width={width} height={height} />;
    case 'Glasstexturedthin':
      return <Glasstexturedthin fill={fill} width={width} height={height} />;
    case 'Glassthin':
      return <Glassthin fill={fill} width={width} height={height} />;
    case 'Glasstintedthin':
      return <Glasstintedthin fill={fill} width={width} height={height} />;
    case 'Gluesolid':
      return <Gluesolid fill={fill} width={width} height={height} />;
    case 'Gluethin':
      return <Gluethin fill={fill} width={width} height={height} />;
    case 'Google':
      return <Google fill={fill} width={width} height={height} />;
    case 'Googlelogoblack':
      return <Googlelogoblack fill={fill} width={width} height={height} />;
    case 'Googlelogowhite':
      return <Googlelogowhite fill={fill} width={width} height={height} />;
    case 'Gsk':
      return <Gsk fill={fill} width={width} height={height} />;
    case 'Heatedpad':
      return <Heatedpad fill={fill} width={width} height={height} />;
    case 'Hiltonhotels':
      return <Hiltonhotels fill={fill} width={width} height={height} />;
    case 'Hsbc':
      return <Hsbc fill={fill} width={width} height={height} />;
    case 'Jdsports':
      return <Jdsports fill={fill} width={width} height={height} />;
    case 'Manutd':
      return <Manutd fill={fill} width={width} height={height} />;
    case 'Marriott':
      return <Marriott fill={fill} width={width} height={height} />;
    case 'Mercurehotels':
      return <Mercurehotels fill={fill} width={width} height={height} />;
    case 'Mirrorworldicon':
      return <Mirrorworldicon fill={fill} width={width} height={height} />;
    case 'Mirrorworldlogowhite':
      return <Mirrorworldlogowhite fill={fill} width={width} height={height} />;
    case 'Mounttape':
      return <Mounttape fill={fill} width={width} height={height} />;
    case 'MWlogo':
      return <MWlogo fill={fill} width={width} height={height} />;
    case 'Nhm':
      return <Nhm fill={fill} width={width} height={height} />;
    case 'None':
      return <None fill={fill} width={width} height={height} />;
    case 'Screwcapgrommetsolid':
      return <Screwcapgrommetsolid fill={fill} width={width} height={height} />;
    case 'Screwcapgrommetthin':
      return <Screwcapgrommetthin fill={fill} width={width} height={height} />;
    case 'Shieldplussharplight':
      return <Shieldplussharplight fill={fill} width={width} height={height} />;
    case 'Shieldplussolid':
      return <Shieldplussolid fill={fill} width={width} height={height} />;
    case 'Shieldplusthin':
      return <Shieldplusthin fill={fill} width={width} height={height} />;
    case 'Shieldsharplight':
      return <Shieldsharplight fill={fill} width={width} height={height} />;
    case 'Shieldshinesolid':
      return <Shieldshinesolid fill={fill} width={width} height={height} />;
    case 'Shieldshinethin':
      return <Shieldshinethin fill={fill} width={width} height={height} />;
    case 'Shieldsolid':
      return <Shieldsolid fill={fill} width={width} height={height} />;
    case 'Shieldthin':
      return <Shieldthin fill={fill} width={width} height={height} />;
    case 'Squaredashedduotone':
      return <Squaredashedduotone fill={fill} width={width} height={height} />;
    case 'Styleglass':
      return <Styleglass fill={fill} width={width} height={height} />;
    case 'Stylesmart':
      return <Stylesmart fill={fill} width={width} height={height} />;
    case 'Stylesynthetic':
      return <Stylesynthetic fill={fill} width={width} height={height} />;
    case 'Styletiles':
      return <Styletiles fill={fill} width={width} height={height} />;
    case 'Taylorwoodrow':
      return <Taylorwoodrow fill={fill} width={width} height={height} />;
    case 'Topleftsolid':
      return <Topleftsolid fill={fill} width={width} height={height} />;
    case 'Toprightsolid':
      return <Toprightsolid fill={fill} width={width} height={height} />;
    case 'Toyota':
      return <Toyota fill={fill} width={width} height={height} />;
    case 'Travelodge':
      return <Travelodge fill={fill} width={width} height={height} />;
    case 'Trustpilotcolour':
      return <Trustpilotcolour fill={fill} width={width} height={height} />;
    case 'Trustpilotcoloursimple':
      return (
        <Trustpilotcoloursimple fill={fill} width={width} height={height} />
      );
    case 'Trustpilotcolourwhite':
      return <Trustpilotwhite fill={fill} width={width} height={height} />;
    default:
      // Handle the case where the provided name is not found
      svgSource = null;
  }
};

export default SvgImage;
