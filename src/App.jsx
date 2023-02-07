import {useEffect, useState } from 'react'
import Readlist from "./components/Readlist"

import './App.css'

function App() {
  const [searchBooks, setSearchBooks] = useState("");
  const [results, setResults] = useState([]);
  const [readArr, setReadArr] = useState(
    JSON.parse(localStorage.getItem("readArr")) || []
  );
  const [showReadlist, setShowReadlist] = useState(false);

  useEffect(() => {
    localStorage.setItem("readArr", JSON.stringify(readArr));
  }, [readArr]);

  function handleInputChange(e) {
    setSearchBooks(e.target.value);
  }

  function addToReadlist(book) {
    const bookData = {
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      author: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      id: book.id,
      img:book.volumeInfo.imageLinks.thumbnail,
      rating: book.volumeInfo.averageRating,
      link: book.volumeInfo.canonicalVolumeLink
    };

    // Check if the book already exists in the readArr
    if (!readArr.find((read) => read.id === bookData.id)) {
      setReadArr([...readArr, bookData]);
      localStorage.setItem("readArr", JSON.stringify([...readArr, bookData]));
      console.log("Book added to readlist: ", bookData);
      console.log(readArr.length)
    }
  }

  function removeBook(bookId){
    setReadArr(readArr.filter(book => book.id !== bookId));
  }

  useEffect(() => {
    if (searchBooks.trim() !== "") {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchBooks}&maxResults=40&orderBy=relevance`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setResults(data.items);
        });
    }
  }, [searchBooks]);


  
  return (
    <div>
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
      
      {!showReadlist ? (
        
      <>
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            onChange={handleInputChange}
            placeholder='Search for book title'
          />
        </div>
        {results.length === 0 ? (
          <div className='home-gif-container'>
            <h3>Find your next adventure 😁</h3>
            <img className='home-gif' src="./public/images/findbooks.gif" alt="No books found" />
          </div>
          
        ) : (
          <ul>
            {results
              .filter(
                book =>
                  book.volumeInfo.hasOwnProperty("imageLinks") &&
                  book.volumeInfo.imageLinks.hasOwnProperty("thumbnail")
              )
              .sort((a, b) => {
                if (!a.volumeInfo.averageRating && !b.volumeInfo.averageRating) {
                  return 0;
                } else if (!a.volumeInfo.averageRating) {
                  return 1;
                } else if (!b.volumeInfo.averageRating) {
                  return -1;
                } else {
                  return b.volumeInfo.averageRating - a.volumeInfo.averageRating;
                }
              })
              .map((book) => (
                <li key={book.id}>
                  <div className="book-img-container">
                    <a href={book.volumeInfo.canonicalVolumeLink} target="_blank">
                      <img
                        className="book-img"
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                      />
                    </a>
                  </div>
                  <div className='book-info'>
            <h3 className="title">
              <a className='title-link' href={book.volumeInfo.canonicalVolumeLink} target="_blank">
              {book.volumeInfo.title.length > 40 ? book.volumeInfo.title.slice(0, 40) + "...." : book.volumeInfo.title}
              </a>
              </h3>
              
            {/* <p className="sub-title">{book.volumeInfo.subtitle && book.volumeInfo.subtitle.length > 15 ? book.volumeInfo.subtitle.slice(0, 15) + "...." : book.volumeInfo.subtitle}</p> */}
            <h4 className="rating">{book.volumeInfo.averageRating > 0 ? book.volumeInfo.averageRating + "⭐": ""}</h4>
            <p className="author">
              <span className="author-id">{book.volumeInfo.authors ? "Author:" : ""}</span>
              {book.volumeInfo.authors && book.volumeInfo.authors.length > 0 ? book.volumeInfo.authors.map(author => author.slice(0, 20)) + "..." : book.volumeInfo.authors}
            </p>
            
            {readArr.find((read) => read.id === book.id)
              ? (
                <button
                  className="readlist-btn"
                  onClick={() => removeBook(book.id)}
                >
                  Remove from list
                </button>
              )
              : (
                <button
                  className="readlist-btn"
                  onClick={() => addToReadlist(book)}
                >
                  Add to list
                </button>
              )
            }
        </div>
                </li>
              ))}
          </ul>
        )}
      </>
      ) : (
        <Readlist readArr={readArr} removeBook={removeBook} />
      )}
    </div>
  );
}



export default App
