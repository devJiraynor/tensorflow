import React, { useEffect, useRef } from 'react';
import './App.css';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import IU from './iu.jpg';

function App() {

  const WIDTH = 800;
  const HEIGHT = 600;

  let net;

  const figure = useRef<HTMLDivElement>(null);
  // const camera = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const run = async () => {
    net = await mobilenet.load();
    // if (!camera.current) return;
    if (!imageRef.current) return;
    // const webcamElement = camera.current;
    const imageElment = imageRef.current;

    // const webcam = await tf.data.webcam(webcamElement, {
    //   resizeWidth: WIDTH,
    //   resizeHeight: HEIGHT
    // });


    while(true) {
      // const image = await webcam.capture();
      const result = await net.classify(imageElment);
      console.log(result);

      if (figure.current) {
        figure.current.innerText = `prediction : ${result[0].className} \n probability: ${result[0].probability}`
      }

      // image.dispose();

      await tf.nextFrame();

    }
  }

  useEffect(() => {
    run();
  });
  

  return (
    <>
      <div ref={figure}></div>
      <img ref={imageRef} src={IU} />
      {/* <video 
        autoPlay
        playsInline
        muted
        ref={camera}
        width={WIDTH}
        height={HEIGHT}
      /> */}
    </>
  );
}

export default App;
