import React, { useEffect, useState } from "react";
import { Box, Center, Grid, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function getClients() {
      try {
        const response = await fetch("/data/clients.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setClients(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getClients();
  }, []);

  // Determine if the screen width is in mobile view
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  // Conditionally slice the data based on screen width
  return (
    <Box
      padding={{ base: "2vw 5vw 5vw", sm: "3vw 5vw 5vw", md: "1.5vw 5vw 5vw" }}
      background='rgba(51, 55, 57, 0.0)'
    >
      <Grid
        templateColumns={{
          base: "1fr 1fr 1fr",
          sm: "1fr 1fr 1fr",
          md: "repeat(5 ,1fr)",
          lg: "repeat(6 ,1fr)",
        }}
        templateRows={{ base: "18vw", md: "10vw", lg: "7.5vw" }}
        padding={{ base: "0vw 0vw", md: "20px 0vw" }}
        gridColumnGap={{ base: "2vw", md: "1.2vw", lg: "1vw" }}
        gridRowGap={{ base: "2vw", md: "1.2vw", lg: "1vw" }}
      >
        {clients.map((client) =>
          client.logo ? (
            <Box
              key={client.id}
              height={{ base: "18vw", md: "10vw", lg: "7.5vw" }}
            >
              <a
                href={client.weblink}
                target='_blank'
                rel='noopener noreferrer'
                title='Go to client web site'
              >
                <Box height={{ base: "18vw", md: "10vw", lg: "7.5vw" }}>
                  <Center
                    height='100%'
                    textAlign='center'
                    backgroundColor='whiteAlpha.200'
                    borderRadius={{ base: "2vw", md: "1vw", lg: "0.5vw" }}
                    width='auto'
                  >
                    <Box height='60%' width='60%' position='relative'>
                      <Image
                        src={`/svgs/${client.logo}`}
                        style={{
                          filter: "contrast(1000%) brightness(0) invert(1)",
                        }}
                        alt={client.client}
                        fill={true}
                        sizes='(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 10vw'
                      />
                    </Box>
                  </Center>
                </Box>
              </a>
            </Box>
          ) : null
        )}
      </Grid>
    </Box>
  );
};

export default Clients;
