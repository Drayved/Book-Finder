import React from "react"

export default function Header({showReadlist, setShowReadlist}) {

    return(
        <div className='header'>
            <div className="header-btns">
                <button onClick={() => setShowReadlist(!showReadlist)} className="header-btn">
                    {showReadlist ? "Search Books" : "My list"}
                </button>
            </div>  
            <div className='header-text'>
                <h1>Discover Your Next Favorite Book with Our Personalized Book Finder</h1>
                <h2>Your One-Stop Destination for Book Discovery</h2>
            </div>
        </div>
    )
    
}