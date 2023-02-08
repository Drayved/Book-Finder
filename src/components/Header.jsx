import React from "react"

export default function Header({showReadlist, setShowReadlist}) {

    return(
        <div className='header'>
            {/* The header-btns container holds the toggle button to switch between the search and reading list page */}
            <div className="header-btns">
                <button onClick={() => setShowReadlist(!showReadlist)} className="header-btn">
                    {/* The text of the button changes based on the current state of the showReadlist variable */}
                    {showReadlist ? "Search Books" : "My list"}
                </button>
            </div>  
            <div className='header-text'>
                <h4 className="discover-text">Discover Your Next Favorite Book</h4>
                <h1>Personalized Book Finder</h1>
                <h2>Your One-Stop Destination for Book Discovery</h2>
            </div>
        </div>
    )
    
}