import React, { useEffect, useState, createContext, useRef } from 'react';
import loader from './../assets/img/circles.svg'
import axios from 'axios'

export const FotovaggContext = createContext();

const FotovaggContextProvider = (props) => {
  //States 
  const [error, setError] = useState(null);
  const [render, setRender] = useState(false);
  //Refs
  const isLoadedRef = useRef(false);
  const totalPagesRef = useRef();
  const newPhotosRef = useRef([]);
  const timerRef = useRef();
  
  useEffect(() => {
  //Fetch data. 1st round show without pause, second and forward with pause.
  console.log('result')
    fetch('/api')  
    .then(res => res.json())
      .then(
        (res) => {
          console.log(res[0].currentPage)
          const result = JSON.parse(res[1])
          // const currentPag = JSON.parse(res[0])
          
          newPhotosRef.current = result.photos.photo;
          totalPagesRef.current = result.photos.pages;
          isLoadedRef.current = true;
          console.log(newPhotosRef.current)
          // if (pageRef.current === 1) {
          //   pageRef.current = 2;
          //   setRender(render => !render);
          //   //pauses from second round onwards
          // } else if (pageRef.current > 1) {
          //   timerRef.current = setTimeout(() => {
          //     if (pageRef.current === totalPagesRef.current) {
          //       pageRef.current = 1;
          //     } else {
          //       pageRef.current += 1;
          //     }
          //     setRender(render => !render);
          //   }, 7000);
          // }

          if (res[0].currentPage === 1) {
            //pageRef.current = 2;
            setRender(render => !render);
            //pauses from second round onwards
          } else if (res[0].currentPage > 1) {
            timerRef.current = setTimeout(() => {

              // if (pageRef.current === totalPagesRef.current) {
              //   pageRef.current = 1;
              // } else {
              //   pageRef.current += 1;
              // }


              setRender(render => !render);
            }, 7000);
          }



          // setTimeout(()=>{
          //   setRender(render => !render);
          // }, 7000)
        },
        (error) => {
          isLoadedRef.current = true;
          setError(error);
        }
      )
    
    return () => {
      clearTimeout(timerRef.current);
    }
      
  }, [render]);


  //search function from search component. Reset and ads new search term.
  const newSearch = (newSearchTerm) => {

    clearTimeout(timerRef.current);
    isLoadedRef.current = false;
    setRender(render => !render);
    
    axios.post('/api', {
      "filter": newSearchTerm
      })
    .then(res => {
      console.log('this is the response', res)
    })
    .catch(error => {
      console.log('heres is the errror', error)
    })
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error.message}</p>
      </div>
    )
  } else if (isLoadedRef.current !== true) {
    return <div className="loader" ><img src={loader} width="160" alt="loader" /></div>;
  } else {
    return (
      <FotovaggContext.Provider value={
        {
          newSearch,
          newPhotosRef,
          render
        }
      }>
        {props.children}
      </FotovaggContext.Provider>
    );
  }
}
export default FotovaggContextProvider; 
