import React, { useContext, useLayoutEffect, useRef } from 'react';
import { FotovaggContext } from './../context/FotovaggContext';

function Wall() {
  const { newPhotosRef, render } = useContext(FotovaggContext);

  const ulRef = useRef();

  useLayoutEffect(() => {
    //Toggle between chronological or random appearance
    if (render) {
      //Create chronological arr of newPhotos
      let indexArr = [];
      newPhotosRef.current.map((i, index) => {
        return indexArr.push(index)
      });
      //Shuffle the the indexArr to randomize the values
      shuffle(indexArr);
      //Set random classes to images to create a random appearance with css
      indexArr.map((x, index) => {
        let img = ulRef.current.children[index].children[0];
        return img.className = `photo inset-shadow img-${x}`;
      });
    }
  }, [render, newPhotosRef])

  //Shuffle function from : https://bost.ocks.org/mike/shuffle/
  const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  return (
    <ul className="wall" ref={ulRef}>
      {newPhotosRef.current.map((i, index) => {
        return <li className="frame" key={i.id}><img alt={i.title} className={"photo inset-shadow img-" + index} src={`https://live.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`} /></li>
      })}
    </ul>
  )

}

export default Wall
