import React from "react"

// A functional component that returns a search box for the user to search for books
export default function Search({handleInputChange}) {
    return(
        <div className="search-container">
            {/* Search input box */}
            <input
                className="search-box"
                type="text"
                onChange={handleInputChange}
                onKeyPress={handleInputChange}
                placeholder='Search for book title'
            />
        </div>
    )
    
}