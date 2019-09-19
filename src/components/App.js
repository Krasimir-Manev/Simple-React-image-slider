import React from "react";
import Slider from "./Slider";

const imagesFor = {
  slider: [
    "./images/image-one.jpg",
    "./images/image-two.jpg",
    "./images/image-three.jpg",
    "./images/image-four.jpg",
    "./images/image-five.jpg"
  ]
};

const { slider } = imagesFor;

const App = () => {
  return <Slider images={slider} />;
};

export default App;
