'use client';
import {
  Center,
  Grid,
  GridItem,
  Button,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  setMEScrews,
  setMEFittings,
  setMEAdhesive,
} from '../../../redux/slices/configGlassSlice';
// Icons
import screwsSvg from '/public/svgs/screw-cap-grommet-solid.svg';
import adhesiveSvg from '/public/svgs/glue-solid.svg';
import noneSvg from '/public/svgs/none.svg';
import heatedSvg from '/public/svgs/heated-pad.svg';
import edgeSealSvg from '/public/svgs/edge-seal-brush.svg';
import tapeSvg from '/public/svgs/mount-tape.svg';
import safetySvg from '/public/svgs/shield-sharp-light.svg';
import premiumSvg from '/public/svgs/shield-plus-sharp-light.svg';
import FixingsModal from '../modals/FixingsModal';

const SVGWrapper = ({ Component, ...props }) => (
  <Component {...props} style={{ opacity: '1' }} />
);

const gridItemStyle = {
  border: '0.1vw solid #666666',
  borderRadius: '1.5vw',
  padding: '1.0vw 0 1.0vw',
  background: 'rgba(255,255,255,0.8)',
  width: '100%',
};
const gridItemTitle = {
  fontSize: { base: '2.0vw', md: '1vw' },
  fontWeight: '300',
  textTransform: 'uppercase',
  paddingTop: '5px',
};
const outerBoxStyle = {
  // background: 'linear-gradient(to right, #dfb4a8, #deb8b2, #ffdacc)',
  display: 'flex',
  height: 'auto',
  border: '1px solid #c1c4c6',
  borderRadius: '4vw',
  padding: '1vw 6vw 3vw',
  margin: '0vw 0vw',
  flexDirection: 'column',
  background: '#ffffff',
};
const buttonStyle = {
  borderRadius: '6vw',
  width: '100%',
  fontSize: '3vw',
  padding: '1vw 0',
  background: '#a6aaaf',
  color: '#ffffff',
  width: '100%',
  lineHeight: '0',
};
const HoverableGridItem = ({ children, title, isActive, onActivate }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const bgColor = isActive
    ? 'rgba(255,255,255,1)'
    : isHovered
    ? 'rgba(255,255,255,1)'
    : 'rgba(255,255,255,0.5)';

  const iconColor = isHovered || isActive ? '#0cc6de' : '#40474f';
  const svgColor = isHovered || isActive ? '#0cc6de' : '#40474f';
  const border = isActive ? '0.2vw solid #0cc6de' : '0.1vw solid #666666';
  const margin = isActive ? '0vw' : '0.1vw';

  return (
    <GridItem
      {...gridItemStyle}
      background={bgColor}
      border={border}
      margin={margin}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onActivate(title, isActive)}
      _hover={{ cursor: 'pointer' }}
      display="flex" // use flexbox to align children
      flexDirection="column" // stack children vertically
      justifyContent="center" // center children vertically
      alignItems="center" // center children horizontally
    >
      <Center color={iconColor} fill={svgColor}>
        {children}
      </Center>
      <Center {...gridItemTitle}>{title}</Center>
    </GridItem>
  );
};

export default function CalcCompFixings() {
  const mobileDisplay = useBreakpointValue({ base: true, md: false });
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openFixingModal = () => {
    console.log('open Model');
    onOpen();
  };
  // Fetch the activeElements from Redux state
  const activeFittings = useSelector(
    (state) => state.configGlass.mirrorExtraFittings
  );
  const activeScrews = useSelector(
    (state) => state.configGlass.mirrorExtraScrews
  );
  const activeAdhesive = useSelector(
    (state) => state.configGlass.mirrorExtraAdhesive
  );
  const [svgIcon, setSvgIcon] = useState('none');
  const [fixing, setFixing] = useState('none');
  const handleActivate = (choice) => {
    console.log(choice);
    if (choice === 'screws') {
      dispatch(setMEFittings('yes'));
      dispatch(setMEAdhesive('none'));
      dispatch(setMEScrews('AC008'));
      setFixing('Screws,Caps & Grommets');
    } else if (choice === 'adhesive') {
      dispatch(setMEFittings('yes'));
      dispatch(setMEScrews('none'));
      dispatch(setMEAdhesive('AC015'));
      setFixing('Specialist Mirror Adhesive');
    } else {
      dispatch(setMEFittings('none'));
      dispatch(setMEScrews('none'));
      dispatch(setMEAdhesive('none'));
      setFixing('None');
    }
    setSvgIcon(choice);
    console.log(choice);
  };
  useEffect(() => {
    if (activeScrews !== 'none') {
      setSvgIcon(<SVGWrapper Component={screwsSvg} />);
      setFixing('Screws,Caps & Grommets');
      setMEScrews('AC008');

      console.log('fixing ', fixing);
    }
    if (activeAdhesive !== 'none') {
      setSvgIcon(<SVGWrapper Component={adhesiveSvg} />);
      setFixing('Specialist Mirror Adhesive');
      setMEAdhesive('AC015');

      console.log('fixing ', fixing);
    }
    if (activeFittings === 'none') {
      setSvgIcon(<SVGWrapper Component={noneSvg} />);
      setFixing('None');
    }
  }, [activeScrews, activeFittings, activeAdhesive, fixing]);
  return (
    <>
      {!mobileDisplay && (
        <Grid
          templateColumns="repeat(4, 1fr)"
          columnGap="1vw"
          flexDirection="row"
          width="100%"
        >
          <HoverableGridItem
            title="none"
            isActive={activeFittings === 'none'}
            onActivate={handleActivate}
          >
            <SVGWrapper Component={noneSvg} fontSize="2.5vw" />
          </HoverableGridItem>
          <HoverableGridItem
            title="screws"
            isActive={activeScrews !== 'none'}
            onActivate={handleActivate}
          >
            <SVGWrapper Component={screwsSvg} fontSize="2.5vw" />
          </HoverableGridItem>
          <HoverableGridItem
            title="adhesive"
            isActive={activeAdhesive !== 'none'}
            onActivate={handleActivate}
          >
            <SVGWrapper Component={adhesiveSvg} fontSize="2.5vw" />
          </HoverableGridItem>
        </Grid>
      )}
      {mobileDisplay && (
        <Center {...outerBoxStyle}>
          <Center
            display="flex"
            columnGap="0vw"
            border="solid 0px red"
            width="100%"
            alignItems="center"
            margin="3vw 0"
            justifyContent={'center'}
          >
            <Center width="12vw" style={{ fontSize: '6vw' }}>
              {svgIcon}
            </Center>
            <Center fontSize="3vw">{fixing}</Center>
          </Center>
          <Button {...buttonStyle} onClick={() => openFixingModal()}>
            Change Fixing Option
          </Button>
        </Center>
      )}
      <FixingsModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
