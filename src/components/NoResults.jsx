import React from "react"

function NoResults({searchPerformed}) {
    return(
        <div className='no-results-container'>
            {searchPerformed ? 
            <h3 className="no-results">No results found, please try another search</h3>
            : <h3 className="no-results">Please enter your search to find your next adventure</h3>
            }
        </div>
    )
    
}

export default NoResults