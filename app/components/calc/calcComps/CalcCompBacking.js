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
  setMEBacking,
  setMESafety,
  setMEPremium,
  setMEFoil,
} from '../../../redux/slices/configGlassSlice';
// Icons
import safetySvg from '/public/svgs/shield-solid.svg';
import premiumSvg from '/public/svgs/shield-plus-solid.svg';
import foilSvg from '/public/svgs/shield-shine-solid.svg';
import noneSvg from '/public/svgs/none.svg';
import BackingModal from '../modals/BackingModal';

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

export default function CalcCompBacking() {
  const mobileDisplay = useBreakpointValue({ base: true, md: false });
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openBackingModal = () => {
    console.log('open Model');
    onOpen();
  };
  // Fetch the activeElements from Redux state
  const activeBacking = useSelector(
    (state) => state.configGlass.mirrorExtraBacking
  );
  const activeSafety = useSelector(
    (state) => state.configGlass.mirrorExtraSafety
  );
  const activePremium = useSelector(
    (state) => state.configGlass.mirrorExtraPremium
  );
  const activeFoil = useSelector((state) => state.configGlass.mirrorExtraFoil);
  const [svgIcon, setSvgIcon] = useState('none');
  const [fixing, setFixing] = useState('none');
  const handleActivate = (choice) => {
    console.log(choice);
    dispatch(setMEBacking('none'));
    dispatch(setMESafety('none'));
    dispatch(setMEPremium('none'));
    dispatch(setMEFoil('none'));
    setFixing('No Backing');
    if (choice === 'safety') {
      dispatch(setMEBacking('yes'));
      dispatch(setMESafety('yes'));
      setFixing('Saftey Backing');
    } else if (choice === 'premium') {
      dispatch(setMEBacking('yes'));
      dispatch(setMEPremium('yes'));
      setFixing('Premium Backing');
    } else if (choice === 'foil') {
      dispatch(setMEBacking('yes'));
      dispatch(setMEFoil('yes'));
      setFixing('Foil Backing');
    }
    setSvgIcon(choice);
  };
  useEffect(() => {
    if (activeBacking === 'none') {
      setMEBacking('no');
      setSvgIcon(<SVGWrapper Component={noneSvg} />);
    }
    if (activeSafety === 'yes') {
      setSvgIcon(<SVGWrapper Component={safetySvg} />);
      setFixing('Safety Backing');
      setMESafety('yes');

      console.log('fixing ', fixing);
    }
    if (activePremium === 'yes') {
      setSvgIcon(<SVGWrapper Component={premiumSvg} />);
      setFixing('Premium Backing');
      setMEPremium('yes');

      console.log('fixing ', fixing);
    }
    if (activeFoil === 'yes') {
      setSvgIcon(<SVGWrapper Component={foilSvg} />);
      setMEFoil('yes');
      setFixing('Foil Backing');
      console.log('fixing ', fixing);
    }
  }, [activeSafety, activePremium, activeBacking, activeFoil, fixing]);
  return (
    <>
      {!mobileDisplay && (
        <Grid
          templateColumns="repeat(4, 1fr)"
          columnGap="1vw"
          flexDirection="row"
        >
          <HoverableGridItem
            title="none"
            isActive={activeBacking === 'none'}
            onActivate={handleActivate}
          >
            <SVGWrapper Component={noneSvg} fontSize="2.5vw" />
          </HoverableGridItem>
          <HoverableGridItem
            title="safety"
            isActive={activeSafety !== 'none'}
            onActivate={handleActivate}
          >
            <SVGWrapper Component={safetySvg} fontSize="2.5vw" />
          </HoverableGridItem>
          <HoverableGridItem
            title="premium"
            isActive={activePremium !== 'none'}
            onActivate={handleActivate}
          >
            <SVGWrapper Component={premiumSvg} fontSize="2.5vw" />
          </HoverableGridItem>
          <HoverableGridItem
            title="foil"
            isActive={activeFoil !== 'none'}
            onActivate={handleActivate}
          >
            <SVGWrapper Component={foilSvg} fontSize="2.5vw" />
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
            <Center width="12vw" height="30px" style={{ fontSize: '6vw' }}>
              {svgIcon}
            </Center>
            <Center fontSize="3vw">{fixing}</Center>
          </Center>
          <Button {...buttonStyle} onClick={() => openBackingModal()}>
            Change Backing Option
          </Button>
        </Center>
      )}
      <BackingModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
