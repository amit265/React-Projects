import React, { useState } from "react";

const LibraryLayout = () => {
    const squares = Array.from(Array(52).keys());

  const [colors, setColors] = useState(squares.map(() => "bg-blue-500"));

  const handleClick = (index) => {
    const newColors = [...colors];
    newColors[index] = getRandomColor();
    setColors(newColors);
  };

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex justify-center items-center flex-wrap">
      {squares.map((index) => (
        <div key={index} className="w-1/4 p-2 flex justify-center">
          <div
            className={`w-12 h-12 cursor-pointer ${colors[index]}`}
            onClick={() => handleClick(index)}
          >
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryLayout;
