// import { graphql, useStaticQuery } from "gatsby";

const useImage = (imageName) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { regex: "/(jpg|jpeg|png)/" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
          }
        }
      }
    }
  `);

  const image = data.allFile.nodes.find((n) => n.name === imageName);

  if (!image) {
    console.warn(`Image with name ${imageName} not found`);
    return null;
  }

  return image.childImageSharp.gatsbyImageData;
};

export default useImage;
