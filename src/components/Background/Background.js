import './Background.css';

import React, { useState, useEffect } from 'react';

import bg0 from '../../img/bg0.jpg';
import bg1 from '../../img/bg1.jpg';
import bg2 from '../../img/bg2.jpg';
import bg3 from '../../img/bg3.jpg';
import bg4 from '../../img/bg4.jpg';
import bg5 from '../../img/bg5.jpg';
import bg6 from '../../img/bg6.jpg';
import bg7 from '../../img/bg7.jpg';

const images = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7];

let imageIndex = Math.floor(Math.random() * images.length);

function Background() {
  const [bgImage, setBgImage] = useState(images[imageIndex]);

  function getNextImage() {
    // increment image index and return
    if (imageIndex >= images.length - 1) imageIndex = 0;
    else imageIndex += 1;
    return images[imageIndex];
  }

  return (
    <div className="Background">
      <img className="background-img" src={bgImage} />
      <button
      className="change-background"
      onClick={() => setBgImage(getNextImage())}
      >
        <p>↺</p>
      </button>
    </div>
  )
}

export default Background;
