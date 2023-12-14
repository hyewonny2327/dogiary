
 import React, { createContext, useContext, useEffect, useState } from 'react';

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const onSelect = (option) => {
      setSelectedOption(option);
    };
    useEffect(()=>{
      console.log('DropdownProvider value:', { selectedOption, onSelect });
    },[selectedOption]);
    return (
      <DropdownContext.Provider value={{ selectedOption, onSelect }}>
        {children}
      </DropdownContext.Provider>
    );
};

export const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
      throw new Error('useDropdown must be used within a DropdownProvider');
    }
    return context;
};



