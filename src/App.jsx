import {useEffect, useState, useRef } from "react"
import Readlist from "./components/Readlist"
import Header from "./components/Header"
import Search from "./components/Search"
import NoResults from "./components/NoResults"
import Results from "./components/Results"
import Landing from "./components/Landing"
import Selector from "./components/Selector"


function App() {
  const [searchBooks, setSearchBooks] = useState("");
  const [results, setResults] = useState([]);
  const [searchOption, setSearchOption] = useState("genre")
  const [showLanding, setShowLanding] = useState(true)
  const [readArr, setReadArr] = useState(
    JSON.parse(localStorage.getItem("readArr")) || []
  );
  const [showReadlist, setShowReadlist] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const inputRef = useRef();

  // Use effect hook to store the readlist in local storage
  useEffect(() => {
    localStorage.setItem("readArr", JSON.stringify(readArr));
  }, [readArr]);

  // Function to handle the input change and trigger the search
  function handleInputChange(e) {
    if(e.key === 'Enter') {
      
      setSearchBooks(e.target.value);
      setShowLanding(false)
      e.target.blur();
      inputRef.current.value = "";
    }
  }

  function handleSearchOptionChange(e){
    setSearchOption(e.target.value)
  }

  function handleMyListClick() {
    setShowReadlist(true);
    setShowLanding(false)
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
    try{
      if (searchBooks.trim() !== "") {
        let response;
        if(searchOption === "title"){
          response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=intitle+${searchBooks}&maxResults=40`
          );
        }else if(searchOption === "genre"){
          response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=subject+${searchBooks}&maxResults=40`
          );
        }else if(searchOption === "author"){
          response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchBooks}&maxResults=40`
          );
        }
        
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setSearchPerformed(true)
          const keys = new Set();
          const filteredResults = data.items.filter((item) => {
            if (keys.has(item.id)) {
              return false;
            }
            keys.add(item.id);
            return true;
          });
          setResults(filteredResults);
        } else {
          setSearchPerformed(true)
          setResults("")
          console.error("No results found");
          return <NoResults />
          
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();

}, [searchBooks, searchOption]);

return (
  <div className="content">
    { showReadlist ? 
      <Readlist 
        readArr={readArr} 
        removeBook={removeBook} 
        showReadlist = {showReadlist}
        setShowReadlist = {setShowReadlist}
      />
      : 
      <div>
        { showLanding ? 
          <Landing 
            searchOption = {searchOption}
            handleSearchOptionChange = {handleSearchOptionChange}
            handleInputChange={handleInputChange}
            showReadlist = {showReadlist}
            handleMyListClick={handleMyListClick}
          /> 
          : 
          <div className="main-content">
            <Header 
              showReadlist = {showReadlist}
              setShowReadlist = {setShowReadlist}
            />
            <Selector 
              searchOption={searchOption} 
              handleSearchOptionChange={handleSearchOptionChange} 
            />
            <Search 
              handleInputChange={handleInputChange} 
              inputRef = {inputRef}
            />
            {results.length === 0 ? (
              <NoResults
              searchPerformed={searchPerformed}
              /> 
            ) : (
              <Results 
                results={results}
                readArr={readArr}
                addToReadlist={addToReadlist}
                removeBook={removeBook}
              />
            )}
          </div>
        }
      </div>
    }
  </div>
);
}

export default App;
