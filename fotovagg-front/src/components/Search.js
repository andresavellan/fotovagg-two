import React, { useContext, useLayoutEffect, useRef } from 'react'
import { FotovaggContext } from './../context/FotovaggContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search() {

  const { newSearch } = useContext(FotovaggContext);
  const textInputRef = useRef();
  //Icons

  //Set focus on input
  useLayoutEffect(() => {
    textInputRef.current.focus()
  }, [])

  //Send the input value to the "newSearch" function in the Context component
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textInputRef.current.value !== '') {
      newSearch(textInputRef.current.value);
      textInputRef.current.value = "";
    }
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search photos..." ref={textInputRef} />
        <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
      </form>
    </div >
  )
}

export default Search;
