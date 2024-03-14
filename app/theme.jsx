// theme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    body: `'Montserrat', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: `'Montserrat', sans-serif`,
        backgroundImage:
          props.colorMode === "light"
            ? "linear-gradient(to right, #ffffff, rgba(237, 237, 237, 1.0))"
            : "linear-gradient(to right, #ffffff, #ffffff)",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {},
      variants: {
        link: {
          fontSize: { md: "1.0vw", lg: "1.0vw" },
          borderRadius: "2.5vw",
          padding: {
            md: "0.8vw 6vw 1.0vw 6vw",
            lg: "0.8vw 2vw 1.0vw 2vw",
          },
          backgroundColor: "#40474f",
          color: "#fff",
          mt: "1.5vw",
          textDecoration: "none",
          _hover: {
            backgroundColor: "#dee3e8",
            color: "#40474f",
            textDecoration: "none",
          },
        },
        smlink: {
          backgroundColor: "#40474f",
          color: "#fff",
          textDecoration: "none",
          _hover: {
            backgroundColor: "#dee3e8",
            color: "#40474f",
            textDecoration: "none",
          },
        },
      },
    },
  },
});

export default customTheme;
