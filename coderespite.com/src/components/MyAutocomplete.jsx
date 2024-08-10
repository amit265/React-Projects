import React, { useState } from 'react';

const MyAutocomplete = ({ value, setValue, inputValue, setInputValue, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    setIsOpen(true);
  };

  // Handle selection change
  const handleSelectionChange = (selectedValue) => {
    setValue(selectedValue);
    setIsOpen(false);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const clearInput = () => {
    setValue('');
    setInputValue('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mx-auto max-w-[300px] text-[var(--background-color)] bg-[var(--text-color)]]">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={value ? value : "Search Projects"}
        onClick={toggleDropdown}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
       {value && (
          <button
            onClick={clearInput}
            className="absolute pt-3 right-4 text-black hover:text-gray-700"
          >
            ✕
          </button>
       )}
      {isOpen && (
        <ul className="absolute text-[var(--background-color)] bg-[var(--text-color)] w-full mt-2 border border-gray-300 rounded-md max-h-60 overflow-y-auto z-10">
          {data
            .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
            .map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelectionChange(item)}
                className={`p-2 cursor-pointer ${
                  value === item ? 'bg-[var(--background-color)] text-[var(--text-color)]' : ''
                }`}
              >
                {item}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MyAutocomplete;
