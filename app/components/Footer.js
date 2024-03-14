import React from 'react';
import { Grid, GridItem, Text, Flex, Link, Box } from '@chakra-ui/react';
import { footer, title, item, noPrint } from '../styles/layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faTiktok,
  faLinkedin,
  faPinterest,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/pro-solid-svg-icons';

// Reusable component for social media icons
const IconLink = ({ href, icon, size = '1x' }) => {
  //console.log("Icon:", icon);

  return (
    <Box
      width={{ base: '8vw', sm: '4vw', md: '2vw' }}
      height={{ base: '8vw', sm: '4vw', md: '2vw' }}
    >
      <Link href={href}>
        <FontAwesomeIcon icon={icon} size="2x" />
      </Link>
    </Box>
  );
};

export default function Footer() {
  return (
    <footer className={(footer, noPrint)}>
      <Grid
        templateColumns={{
          base: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr 1fr',
        }}
        padding={{ base: '3vw 3vw', md: '20px 5vw' }}
        gridColumnGap={{ base: '20px', md: '20px' }}
        gridRowGap={{ base: '30px', md: '30px' }}
        fontSize={{ base: '4vw', sm: '2.2vw', md: '1.0vw' }}
        lineHeight={{ base: '8vw', sm: '4vw', md: '2vw' }}
      >
        <GridItem>
          <Text className={title}>Shop</Text>
          <Link className={item} href="/bespokeDesigns">
            Bespoke Design
          </Link>
          <Link className={item} href="/readyToGo">
            Ready to Go
          </Link>
          <Link className={item} href="/terms">
            Terms & Conditions
          </Link>
          <Link className={item} href="/privacyPolicy">
            Privacy Policy
          </Link>
        </GridItem>

        <GridItem>
          <Text className={title}>Abstract & Asymmetrical</Text>
          <Link className={item} href="/classic">
            Classic & Contemporary Framing
          </Link>
          <Link className={item} href="/smartGlass">
            Futuristic Smart Glass
          </Link>
          <Link className={item} href="/tiledWalls">
            Geometric Tiled Walls
          </Link>
          <Link className={item} href="/naturalTimbers">
            Natural Timbers
          </Link>
          <Link className={item} href="/organicSynthetic">
            Organic & Synthetic
          </Link>
          <Link className={item} href="/tintedTextured">
            Tinted & Textured
          </Link>
        </GridItem>

        <GridItem>
          <Text className={title}>Address</Text>
          <Text className={item}>Unit 3 Deans Road Ind Est.</Text>
          <Text className={item}>Swinton</Text>
          <Text className={item}>Manchester</Text>
          <Text className={item}>M27 0RD</Text>
        </GridItem>

        <GridItem>
          <Text className={title}>Contact</Text>
          <Flex direction="row" wrap="nowrap" gap="15px" alignItems={'center'}>
            <IconLink href="mailto:example@example.com" icon={faEnvelope} />
            <Text width="90%">sales@mirrorworld.co.uk</Text>
          </Flex>
          <Flex direction="row" wrap="nowrap" gap="15px" alignItems={'center'}>
            <IconLink icon={faPhone} />
            <Text>0333 800 8181</Text>
          </Flex>
          <Text className={title} paddingTop="0.5vw">
            Follow Us
          </Text>
          <Flex
            direction="row"
            wrap="nowrap"
            gap="8px"
            alignItems={'center'}
            paddingTop="0.5vw"
          >
            <IconLink
              href="https://www.instagram.com/mirrorworldltd/"
              icon={faInstagram}
            />
            <IconLink
              href="https://www.facebook.com/MirrorworldUK/"
              icon={faFacebook}
            />
            <IconLink
              href="https://twitter.com/mirrorworldltd"
              icon={faTwitter}
            />
            <IconLink
              href="https://www.tiktok.com/@mirrorworldltd"
              icon={faTiktok}
            />
            <IconLink
              href="https://www.linkedin.com/company/mirrorworldltd/"
              icon={faLinkedin}
            />
            <IconLink
              href="https://www.youtube.com/channel/mirrorworldltd"
              icon={faYoutube}
            />
            <IconLink
              href="https://www.pinterest.co.uk/mirrorworldltd/"
              icon={faPinterest}
            />
          </Flex>
        </GridItem>
      </Grid>
    </footer>
  );
}
