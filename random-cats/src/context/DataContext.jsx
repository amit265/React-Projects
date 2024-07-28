// DataContext.js
import { createContext, useState, useEffect } from 'react';

// Create a context with initial value (optional)
export const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [nextImage, setNextImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchRandomCatImage().then((image) => {
      setCurrentImage(image);
      preFetchNextImage();
    });

  }, []);

  const fetchRandomCatImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      return jsonData[0].url;
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch cat image');
      return null;
    } finally {
        setLoading(false)
    }
  };

  const preFetchNextImage = async () => {
    const nextImageUrl = await fetchRandomCatImage();
    const img = new Image();
    img.src = nextImageUrl;
    img.onload = () => setNextImage(nextImageUrl);
  }

  const showNextImage = () => {
    if(nextImage){
      setCurrentImage(nextImage);
      preFetchNextImage();
    }
  }

  return (
    <DataContext.Provider value={{ currentImage, showNextImage, loading }}>
      {children}
    </DataContext.Provider>
  );
};
