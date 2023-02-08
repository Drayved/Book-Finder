import {useEffect, useState } from 'react'
import Readlist from "./components/Readlist"
import Header from "./components/Header"
import Search from "./components/Search"
import NoResults from './components/NoResults'
import Results from './components/Results'

function App() {
  const [searchBooks, setSearchBooks] = useState("");
  const [results, setResults] = useState([]);

  // State for the readlist, which is stored in local storage
  const [readArr, setReadArr] = useState(
    JSON.parse(localStorage.getItem("readArr")) || []
  );
  const [showReadlist, setShowReadlist] = useState(false);

  // Use effect hook to store the readlist in local storage
  useEffect(() => {
    localStorage.setItem("readArr", JSON.stringify(readArr));
  }, [readArr]);

  // Function to handle the input change and trigger the search
  function handleInputChange(e) {
    if(e.key === 'Enter') {
      setSearchBooks(e.target.value);
    }
  }

  function addToReadlist(book) {
    // Object to store the relevant data of the book
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
  const fetchData = async () => {
    if (searchBooks.trim() !== "") {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchBooks}&maxResults=40&orderBy=relevance`
      );
      const data = await response.json();
      setResults(data.items);
    }
  };
  fetchData();
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
