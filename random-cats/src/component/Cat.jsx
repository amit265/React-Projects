import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";

const Cat = () => {
  const { currentImage, showNextImage, loading, error } =
    useContext(DataContext);
  const [borderColor, setBorderColor] = useState("#000");
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [buttonColor, setButtonColor] = useState("#000");
  const [buttonText, setButtonText] = useState("New Cat");
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState("#6B7");

  console.log(currentImage, "currentImage");

  const randomColor = () => {
    let str = "0123456789abcdef";
    let colors = "#";
    for (let i = 0; i < 6; i++) {
      let char = Math.floor(Math.random() * str.length);
      colors += str.charAt(char);
    }
    return colors;
  };

  const generateRandomButtonColor = () => {
    const randomColors = randomColor();
    setButtonBackgroundColor(randomColors);

    // Determine contrasting text color
    const brightness = calculateBrightness(randomColor);
    const textColor = brightness > 180 ? "#000000" : "#FFFFFF"; // Use black or white based on brightness
    setButtonColor(textColor);
  };

  const calculateBrightness = (color) => {
    // Ensure color is a valid string
    if (typeof color !== 'string' || !color.match(/^#[0-9a-fA-F]{6}$/)) {
      console.warn('Invalid color format:', color);
      return 128; // Default to middle brightness if color format is invalid
    }
  
    // Remove the # and convert hex to RGB
    const hex = color.substring(1); // Remove the #
    const rgb = parseInt(hex, 16); // Convert hex to RGB
  
    // Calculate brightness using luminance formula
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
    return brightness;
  };
  

  const generateRandomButtonText = () => {
    const buttonTextOptions = [
      "New Cat",
      "Next Kitty",
      "Show Meow",
      "Purr More",
    ];
    const randomIndex = Math.floor(Math.random() * buttonTextOptions.length);
    setButtonText(buttonTextOptions[randomIndex]);
  };

  const generateDistinctColors = () => {
    let borderColor = randomColor();
    let backgroundColor = randomColor();
    let buttonColor = randomColor();

    while (
      borderColor === backgroundColor ||
      borderColor === buttonColor ||
      backgroundColor === buttonColor
      
    ) {
      backgroundColor = randomColor();
      borderColor = randomColor();
      buttonColor = randomColor();
    }

    setBorderColor(borderColor);
    setBackgroundColor(backgroundColor);
    setButtonColor(buttonColor);
  };

  useEffect(() => {
    generateDistinctColors();
    generateRandomButtonText();
    generateRandomButtonColor()
  }, [currentImage]);

  return (
    <div
      className="flex flex-col items-center w-[100vw] h-[100vh]"    
      style={{ backgroundColor: backgroundColor }}    
      >    
      {loading && <p>Loading...</p>}    
      {error && <p>{error}</p>}    
    
      <div className="mt-2 flex justify-center items-center">    
        {currentImage && !loading && !error && (    
          <img    
            src={currentImage}    
            alt="Random Cat"    
            style={{ borderColor: borderColor }}    
            className="w-[80vw] h-[80vh] object-cover border-8 r    ounded-lg shadow-xl shadow-slate-500"
          />)}
        
      </div>
      {currentImage && !loading && !error && (
      <button
        onClick={() => {
          showNextImage();
          randomColor();
          generateRandomButtonText();
          generateRandomButtonColor();
        }}
        style={{ backgroundColor: buttonBackgroundColor, color: buttonColor }}
        className="hover:bg-orange-500 flex justify-end  p-4 mt-3 rounded-xl shadow-md transition-all duration-200 ease-in-out bg-green-500 font-bold text-2xl"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Loading..." : buttonText}
      </button>)}
    </div>
  );
};

export default Cat;
