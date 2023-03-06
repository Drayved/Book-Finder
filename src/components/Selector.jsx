import React from "react"

export default function Selector({searchOption, handleSearchOptionChange}) {
    
    
  
    return (
    <div className='selector-container'>
        <input 
            type='radio' 
            id='title' 
            name='searchOption' 
            value='title' 
            checked={searchOption === 'title'} 
            onChange={handleSearchOptionChange} 
        />
        <label htmlFor='title'>Title</label>
        <input 
            type='radio' 
            id='genre' 
            name='searchOption' 
            value='genre' 
            checked={searchOption === 'genre'} 
            onChange={handleSearchOptionChange} 
        />
        <label htmlFor='genre'>Genre</label>
        <input 
            type='radio' 
            id='author' 
            name='searchOption' 
            value='author' 
            checked={searchOption === 'author'} 
            onChange={handleSearchOptionChange} 
        />
        <label htmlFor='author'>Author</label>
    </div>
    );
  }