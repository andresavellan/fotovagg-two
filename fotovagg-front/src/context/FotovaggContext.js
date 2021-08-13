import React, { useEffect, useState, createContext, useRef } from "react";
import loader from "./../assets/img/circles.svg";
import axios from "axios";

export const FotovaggContext = createContext();

const FotovaggContextProvider = (props) => {
  //States
  const [error, setError] = useState(null);
  const [render, setRender] = useState(false);
  //Refs
  const isLoadedRef = useRef(false);
  const pageRef = useRef(1);
  const searchTermRef = useRef("Semla");
  const totalPagesRef = useRef();
  const newPhotosRef = useRef([]);
  const timerRef = useRef();

  useEffect(() => {
    //Fetch data. 1st round show without pause, second and forward with pause.
    console.log("useEffect");
    axios
      .get("/api", {
        params: {
          pageNumber: pageRef.current,
          searchTerm: searchTermRef.current,
        },
      })
      .then(function (res) {
          const result = JSON.parse(res.data)
          newPhotosRef.current = result.photos.photo;
          totalPagesRef.current = result.photos.pages;

          isLoadedRef.current = true;
          
          if (pageRef.current === 1) {
            pageRef.current = 2;
            setRender(render => !render);
            //pauses from second round onwards
          } else if (pageRef.current > 1) {
            timerRef.current = setTimeout(() => {
              if (pageRef.current === totalPagesRef.current) {
                pageRef.current = 1;
              } else {
                pageRef.current += 1;
              }
              setRender(render => !render);
            }, 7000);
          }
      })
      .catch(function (error) {
        isLoadedRef.current = true;
        setError(error);
      })
      .then(function () {
        // always executed
      });
      
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [render]);

  //search function from search component. Reset and ads new search term.
  const newSearch = (newSearchTerm) => {
    clearTimeout(timerRef.current);
    isLoadedRef.current = false;
    pageRef.current = 1;
    searchTermRef.current = newSearchTerm;
    setRender((render) => !render);
  };

  if (error) {
    return (
      <div className="error">
        <p>Error: {error.message}</p>
      </div>
    );
  } else if (isLoadedRef.current !== true) {
    return (
      <div className="loader">
        <img src={loader} width="160" alt="loader" />
      </div>
    );
  } else {
    return (
      <FotovaggContext.Provider
        value={{
          pageRef,
          newSearch,
          newPhotosRef,
          render,
        }}
      >
        {props.children}
      </FotovaggContext.Provider>
    );
  }
};
export default FotovaggContextProvider;
