import {useEffect, useState } from 'react'
import Readlist from "./components/Readlist"
import Header from "./components/Header"
import Search from "./components/Search"
import NoResults from './components/NoResults'
import Results from './components/Results'
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
    if(e.key === 'Enter') {
      setSearchBooks(e.target.value);
    }
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
      <Header 
        showReadlist = {showReadlist}
        setShowReadlist = {setShowReadlist}
      />
      {!showReadlist ? (
      <>
        <Search 
          handleInputChange={handleInputChange} 
        />
        {results.length === 0 ? (
          <NoResults /> 
        ) : (
          <Results 
            results={results}
            readArr={readArr}
            addToReadlist={addToReadlist}
            removeBook={removeBook}
          />
        )}
      </>
      ) : (
        <Readlist readArr={readArr} removeBook={removeBook} />
      )}
    </div>
  );
}



export default App
