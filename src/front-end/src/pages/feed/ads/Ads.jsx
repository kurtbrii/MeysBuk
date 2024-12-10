import React from 'react';
import './ads.css';
import array from './exports';




function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  // splice random starting to the start of array
  let rand = array.splice(1, Math.floor(Math.random() * (array.length+1)));
  console.log(rand);
  return array;
}

class Ads extends React.Component {
  render() {
    return (
      <>
        <h3>Ads</h3>
        <div className='adsContainer'>
          {
            shuffleArray(array).map((image, i) => {
              return (
                <img src={image} className='a-images' key={i} />
              )
            })
          }
        </div>
      </>
    )
  }
}

export default Ads;