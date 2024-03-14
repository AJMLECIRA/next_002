import { useState, useEffect } from 'react';

function useMannequinImage() {
  const [mannequin, setMannequin] = useState(null);

  useEffect(() => {
    const loadMannequinImage = () => {
      return new Promise((resolve, reject) => {
        const mannequinImage = new Image();
        mannequinImage.onload = () => resolve(mannequinImage);
        mannequinImage.onerror = (error) => reject(error);
        mannequinImage.src = '/images/MannequinSm.png';
      });
    };

    loadMannequinImage()
      .then((mannequin) => {
        setMannequin(mannequin);
      })
      .catch((error) => {
        console.error('Error loading mannequin image:', error);
      });
  }, []);

  return mannequin;
}

export default useMannequinImage;
