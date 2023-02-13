import React from "react"

// A functional component that returns a search box for the user to search for books
export default function Search({handleInputChange, inputRef}) {


    return(
        <div className="search-container">
            {/* Search input box */}
            <input
                className="search-box"
                type="text"
                ref={inputRef}
                onChange={handleInputChange}
                onKeyPress={handleInputChange}
                placeholder='Search for your next adventure'
            />
        </div>
    )
    
}