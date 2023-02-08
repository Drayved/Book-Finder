import React from 'react';

export default function Readlist(props) {
 
  function handleClick(bookId){
    props.removeBook(bookId)
  }
  
  return (
    <div>
      
      {props.readArr.length === 0 ? (
        <div className='no-books-container'>
          <h3>No books added to list</h3>
          <img className='no-books-gif' src="../images/nobooks.gif" alt="No books added" />
        </div>
        
        
      ) : (
        <>
          
             <div>
              <ul>
                {props.readArr.map((book) => (
                  <li key={book.id}>
                    
                    <div className="book-img-container">
                      <a href={book.link} target="_blank">
                        <img
                          className="book-img"
                          src={book.img}
                          alt={book.title}
                        />
                      </a>
              </div>
                    
                      <div className='book-info'>
                        <h3 className="title">{book.title.length > 40 ? book.title.slice(0, 40) + "...." : book.title}</h3>
                        {/* <h4 className="sub-title">{book.subtitle && book.subtitle.length > 15 ? book.subtitle.slice(0, 15) + "...." : book.subtitle}</h4> */}
                        <h4 className="rating">{book.rating > 0 ? book.rating + "⭐": ""}</h4>
                        <p className="author">
                          <span className="author-id">{book.author ? "Author:" : ""}</span>
                          {book.author && book.author.length > 0 ? book.author.map(name => name.slice(0, 20)) + "..." : book.authors}
                        </p>
                        <button onClick={() => handleClick(book.id)} className='readlist-btn'>Remove from list</button>
                      </div>
                      
                    </li>
                  ))}
                </ul>
              </div>
            
            
            
          
        </>
      )}
    </div>
  );
}