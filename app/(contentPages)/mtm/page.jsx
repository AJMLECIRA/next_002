import React from 'react';

export const metadata = {
  title: 'Mirror Calculator Tools',
  description:
    'Create your own designer mirror, with our online calculator tools',
};

import { Suspense } from 'react';
import {
  Center,
  Spacer,
  Grid,
  GridItem,
  List,
  ListItem,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faSquareDashed,
  faFrame,
  faTv,
  faSheetPlastic,
  faTableCells,
} from '@fortawesome/pro-solid-svg-icons';

//images
import styleOther from '/public/images/style-other.png';
import styleGlass from '/public/images/style-glass.png';
import styleSmart from '/public/images/style-smart.png';
import styleSynthetic from '/public/images/style-synthetic.png';
import styleTiles from '/public/images/style-tiles.png';
import styleFramed from '/public/images/style-framed.png';
import Link from 'next/link';

const itemDot = () => (
  <FontAwesomeIcon
    icon={faCircle}
    size="sm"
    style={{ color: '##40474f', fontSize: '0.2em', marginRight: '20px' }}
  />
);
const IconWrapper = ({ icon }) => (
  <FontAwesomeIcon
    icon={icon}
    style={{ fontSize: '1em', marginRight: '10px' }}
  />
);

const SquareDashed = () => <IconWrapper icon={faSquareDashed} />;
const Frame = () => <IconWrapper icon={faFrame} />;
const SheetPlastic = () => <IconWrapper icon={faSheetPlastic} />;
const TableCells = () => <IconWrapper icon={faTableCells} />;
const Tv = () => <IconWrapper icon={faTv} />;

export default function Content() {
  const dotStyle = {
    width: '10px',
  };

  const gridItem = {
    display: 'grid',
    templateRows: {
      base: '60% 1fr 2fr 1fr',
      sm: '60% 1fr 2fr 1fr',
      md: '60% 1fr 2fr 1fr',
      lg: '55% 1fr 2fr 1fr',
      xl: '50% 1fr 2fr 1fr',
    },
    textAlign: 'center',
    padding: { base: '1vw 1vw 3vw', sm: '1vw' },
    width: '100%',
    height: { base: '80vw', sm: '50vw', lg: '40vw', xl: '30vw' },
    //border: 'solid 2px red',
    borderRadius: '1vw',
    color: '#404d4f',
    mixBlendMode: 'multiply',
    backgroundColor: ' rgba(0, 0, 0, 0.1)',
  };
  const titleStyle = {
    fontSize: { base: '4vw', sm: '2.5vw', lg: '1.8vw', xl: '1.2vw' },
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };
  const listStyleBox = {
    width: '100%',
    //border: 'solid 2px blue',
    //boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '10px',
  };
  const listStyle = {
    fontSize: { base: '2.4vw', sm: '1.7vw', lg: '1.2vw', xl: '0.9vw' },
    lineHeight: { base: '3.5vw', sm: '2.7vw', lg: '2vw', xl: '1.5vw' },
    textTransform: 'proper',
    textAlign: 'left',
  };
  const listItemStyle = {
    display: 'flex',
    gap: '1vw',
  };
  const btnStyle = {
    fontSize: {
      base: '3.5vw',
      sm: '2vw',
      lg: '1.5vw',
      xl: '1.0vw',
    },
    borderRadius: '5vw',
    height: { base: '7vw', sm: '4vw', lg: '3vw', xl: '2vw' },
    width: '90%',
  };
  const imgStyle = {
    style: { opacity: '0.5' },
  };
  return (
    <Suspense>
      <Spacer
        height={{ base: '110px', sm: '120px', md: '130px', lg: '150px' }}
      />
      <Center
        fontSize={{
          base: '5vw',
          sm: '4vw',
          md: '3.5vw',
          lg: '3.5vw',
          xl: '3vw',
        }}
        fontWeight={'600'}
      >
        <Text color="#404d4f"> What Style are you thinking of?</Text>
      </Center>
      <Grid
        templateColumns={{
          base: '1fr 1fr',
          sm: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr',
          xl: 'repeat(6, 1fr)',
        }}
        padding={{ base: '3vw 5vw 8vw', md: '5vw' }}
        gridColumnGap={{ base: '20px', md: '20px' }}
        gridRowGap={{ base: '10px', md: '20px' }}
      >
        <GridItem>
          <Grid {...gridItem}>
            <Center padding="0.5vw">
              <Image
                {...imgStyle}
                src={styleGlass}
                alt="Glass Only pricing tool"
              />
            </Center>
            <Center>
              <Text {...titleStyle}>all-glass</Text>
            </Center>
            <Box {...listStyleBox}>
              <List {...listStyle}>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Any Size &amp; Shape
                </ListItem>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Plain or Bevelled
                </ListItem>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Plain, Tinted &amp; More
                </ListItem>
              </List>
            </Box>
            <Center>
              <Link width="100%" href="/calcGlass">
                <Button {...btnStyle} className="dkButton" variant="smLink">
                  <SquareDashed />
                  Start
                </Button>
              </Link>
            </Center>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid {...gridItem}>
            <Center padding="0.5vw">
              <Image
                {...imgStyle}
                src={styleFramed}
                alt="Framed Mirror pricing tool"
              />
            </Center>
            <Center>
              <Text {...titleStyle}>Framed</Text>
            </Center>
            <Box {...listStyleBox}>
              <List {...listStyle}>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Modern &amp; Classic
                </ListItem>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Std, Mini & Micro
                </ListItem>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Wood, Metal &amp; ABS
                </ListItem>
              </List>
            </Box>
            <Center>
              <Link width="100%" href="/calcFramed">
                <Button {...btnStyle} className="dkButton" variant="smlink">
                  <Frame />
                  Start
                </Button>
              </Link>
            </Center>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid {...gridItem}>
            <Center padding="0.5vw">
              <Image
                {...imgStyle}
                src={styleSmart}
                alt="Smart Mirrors pricing tool"
              />
            </Center>
            <Center>
              <Text {...titleStyle}>Smart Screen</Text>
            </Center>
            <Box {...listStyleBox}>
              <List {...listStyle}>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  TV Mirrors
                </ListItem>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Visual Display
                </ListItem>
              </List>
            </Box>
            <Center>
              <Link width="100%" href="/pages/calcGlass">
                <Button {...btnStyle} className="dkButton" variant="smlink">
                  <Tv />
                  Start
                </Button>
              </Link>
            </Center>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid {...gridItem}>
            <Center padding="0.5vw">
              <Image
                {...imgStyle}
                src={styleSynthetic}
                alt="Acrylic and Polycarbonate pricing tool"
              />
            </Center>
            <Center>
              <Text {...titleStyle}>Synthetic</Text>
            </Center>
            <Box {...listStyleBox}>
              <List {...listStyle}>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Acryilic &amp; Polycarb
                </ListItem>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Tough and Durable
                </ListItem>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Laser cut precision
                </ListItem>
              </List>
            </Box>
            <Center>
              <Link width="100%" href="/pages/calcGlass">
                <Button {...btnStyle} className="dkButton" variant="smlink">
                  <SheetPlastic />
                  Start
                </Button>
              </Link>
            </Center>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid {...gridItem}>
            <Center padding="0.5vw">
              <Image
                {...imgStyle}
                src={styleTiles}
                alt="Mirror Wall tiles pricing tool"
              />
            </Center>
            <Center>
              <Text {...titleStyle}>Tiled Walls</Text>
            </Center>
            <Box {...listStyleBox}>
              <List {...listStyle}>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Full Walls
                </ListItem>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Multiple Patterns
                </ListItem>
                <ListItem {...listItemStyle}>
                  <FontAwesomeIcon icon={faCircle} {...dotStyle} />
                  Plain, Tinted &amp; More
                </ListItem>
              </List>
            </Box>
            <Center>
              <Link width="100%" href="/calcGlass">
                <Button {...btnStyle} className="dkButton" variant="smlink">
                  <TableCells />
                  Start
                </Button>
              </Link>
            </Center>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid {...gridItem}>
            <Center padding="0.5vw">
              <Image
                {...imgStyle}
                src={styleOther}
                alt="For all other designs try giving us a call"
              />
            </Center>
            <Center>
              <Text {...titleStyle}>Other</Text>
            </Center>
            <Box {...listStyleBox}>
              <List {...listStyle}>
                <Center>
                  Seeking something more exclusive? We&aposll tailor to your
                  specific needs.
                </Center>
              </List>
            </Box>
            <Center>
              <Link width="100%" href="/calcGlass">
                <Button {...btnStyle} className="dkButton" variant="smlink">
                  Get In Touch
                </Button>
              </Link>
            </Center>
          </Grid>
        </GridItem>
      </Grid>
      <Spacer />
    </Suspense>
  );
}
