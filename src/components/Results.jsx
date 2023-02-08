import React from "react"


function Results({results, readArr, addToReadlist, removeBook }) {
     // `filteredResults` filters the results to only include books that have `imageLinks` and `thumbnail` properties
    const filteredResults = results.filter(book => book.volumeInfo.hasOwnProperty("imageLinks") && book.volumeInfo.imageLinks.hasOwnProperty("thumbnail"))

    // `sortedResults` sorts the filtered books by average rating, with books with no average rating coming last
    const sortedResults = filteredResults.sort((a, b) => {
        if (!a.volumeInfo.averageRating && !b.volumeInfo.averageRating) {
            return 0;
        } else if (!a.volumeInfo.averageRating) {
            return 1;
        } else if (!b.volumeInfo.averageRating) {
            return -1;
        } else {
            return b.volumeInfo.averageRating - a.volumeInfo.averageRating;
        }
    });

     // `renderedResults` maps over the sorted books and creates a list item for each book with information about the book
    // including its image, title, author, average rating, and a button to add or remove it from the readlist
    const renderedResults = sortedResults.map(book => (
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
                <h4 className="rating">{book.volumeInfo.averageRating > 0 ? book.volumeInfo.averageRating + "⭐" : ""}</h4>
                <p className="author">
                    <span className="author-id">{book.volumeInfo.authors ? "Author:" : ""}</span>
                    {/* Shorten the author's name if it's too long */}
                    {book.volumeInfo.authors && book.volumeInfo.authors.length > 1 ? book.volumeInfo.authors.map(author => author.slice(1, 15)) + "..." : book.volumeInfo.authors}
                </p>
                {readArr.find(read => read.id === book.id) ? (
                    <button
                        className="readlist-btn"
                        onClick={() => removeBook(book.id)}
                    >
                        Remove from list
                    </button>
                ) : (
                    <button
                        className="readlist-btn"
                        onClick={() => addToReadlist(book)}
                    >
                        Add to list
                    </button>
                )}
            </div>
        </li>
    ));

    return (
        <ul>
            {renderedResults}
        </ul>
    )
}
export default Results