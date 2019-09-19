import React from "react";

const CurrentImage = ({ current, all }) => {
  return (
    <div className='currentImage'>
      <span className='current'>{`${current + 1} / ${all}`}</span>
    </div>
  );
};

export default CurrentImage;
