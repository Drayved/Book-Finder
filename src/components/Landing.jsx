import React, { useState, useEffect } from "react";
import Selector from "./Selector"
import Search from "./Search"

export default function Landing({searchOption, handleSearchOptionChange, handleInputChange, fadeOut}) {
  const [isVisible, setIsVisible] = useState(false);
  const [componentsVisible, setComponentsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setComponentsVisible(true);
    }, 3000);
  }, []);
console.log(fadeOut)

  return (
    <div className={`front-img-container `}>
        <div className="front-content">
            {isVisible ? <h1 className="test">Find your next adventure</h1> : null}
            {componentsVisible ? 
                <div className="fade">
                    <Selector
                        searchOption={searchOption}
                        handleSearchOptionChange={handleSearchOptionChange}
                        handleInputChange={handleInputChange}
                     />
                    <Search 
                        
                        handleInputChange={handleInputChange}
                    />
                </div>
                : null
            }
            
        </div>
      
    </div>
  );
}