import React from "react"

export default function Search({handleInputChange}) {
    return(
        <div className="search-container">
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