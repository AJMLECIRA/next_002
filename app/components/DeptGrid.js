'use client';
import { Grid, GridItem, Text, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function DeptGrid() {
  const [depts, setDepts] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    async function getDepts() {
      try {
        const response = await fetch('/data/depts.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDepts(data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getDepts();
  }, []);

  // Function to handle image load
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <Grid
      templateColumns={{
        sm: '1fr',
        md: '1fr 1fr 1fr 1fr',
      }}
      padding={{ base: '3vw 5vw 8vw', md: '20px 5vw 60px' }}
      gridColumnGap={{ base: '20px', md: '20px' }}
      gridRowGap={{ base: '10px', md: '20px' }}
      fontSize={{ base: '5vw', md: '1.5vw' }}
    >
      {depts.map((dept) => {
        const imgSrc = dept.img ? `/images/${dept.img}` : null;
        const smingSrc = dept.sming ? `/images/${dept.sming}` : null;
        return (
          <Box key={dept.id}>
            <GridItem
              key={dept.id}
              style={{ position: 'relative', display: 'block' }}
              borderRadius="1.0rem"
              display={{ base: 'block' }}
            >
              {/* Image Layer (lowest) */}
              <Box width="100%" height="100%" borderRadius="1.0rem">
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt="Image Alt Text"
                    width={1500}
                    height={3000}
                    onLoad={handleImageLoad}
                    sizes="100vw"
                    style={{
                      borderRadius: '2vw',
                    }}
                  />
                )}
              </Box>
              <Box
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                height="50%"
                display="flex"
                paddingTop={'35%'}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bgGradient="linear(rgba(0,0,0,0), rgba(64,71,79,100))"
                color="white"
                style={{ textTransform: 'uppercase' }}
                borderRadius="1.0rem"
              >
                <Text fontWeight="400">{dept.txtpt1}</Text>
                <Text fontWeight="700">{dept.txtpt2}</Text>
              </Box>
            </GridItem>
          </Box>
        );
      })}
    </Grid>
    // <Grid
    //   templateColumns={{
    //     sm: "1fr",
    //     md: "1fr 1fr 1fr 1fr",
    //   }}
    //   gap={5}
    //   padding={{ base: "3vw 5vw 8vw", md: "20px 5vw 60px" }}
    //   fontSize={{ base: "5vw", md: "1.5vw" }}
    // >
    //   {depts.map((dept) => {
    //     const imgSrc = dept.img ? `/images/${dept.img}` : null;
    //     const smingSrc = dept.sming ? `/images/${dept.sming}` : null;

    //     return (
    //       <div
    //         key={dept.id}
    //         style={{
    //           display: "grid",
    //           gridTemplateColumns: "1fr",
    //           gap: "4px",
    //         }}
    //       >
    //         {imgSrc && (
    //           <Image
    //             src={imgSrc}
    //             alt='Image Alt Text'
    //             width={500}
    //             height={1000}
    //             onLoad={handleImageLoad}
    //             style={{
    //               borderRadius: "2vw",
    //               border: "solid 3px red",
    //             }}
    //           />
    //         )}
    //         <div
    //           style={{
    //             backgroundColor: "rgba(255, 255, 255, 0.7)",
    //             padding: "1rem",
    //             display: "grid",
    //             placeItems: "center",
    //           }}
    //         >
    //           <p >{dept.txtpt1}</p>
    //           <p >{dept.txtpt2}</p>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </Grid>
  );
}
