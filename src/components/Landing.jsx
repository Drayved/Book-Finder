import React, { useState, useEffect } from "react";
import Selector from "./Selector"
import Search from "./Search"

export default function Landing({handleMyListClick, showReadlist, searchOption, handleSearchOptionChange, handleInputChange}) {
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


  return (
    <div className={`front-img-container `}>
      <div className="header-btns">
        <button onClick={handleMyListClick} className="header-btn">
          {/* The text of the button changes based on the current state of the showReadlist variable */}
          {showReadlist ? "Search Books" : "My list"}
        </button>
      </div>  
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