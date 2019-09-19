import React from "react";
import "../css/Galery.css";

class Galery extends React.Component {
  state = {
    currentIndex: 0,
    modal: false
  };

  onGaleryClick = e => {
    if (e.target.classList.contains("image")) {
      const targetDataAttr = e.target.dataset.image;

      this.setState({
        currentIndex: targetDataAttr,
        modal: true
      });
    }
  };

  onModalClose = e => {
    if (e.target.classList.contains("modal")) {
      this.setState({
        modal: false
      });
    }
  };

  render() {
    return (
      <div className='galery'>
        <div
          className='galery-container'
          onClick={this.onGaleryClick}
          style={{
            maxWidth: `${
              typeof this.props.width === "number" ? this.props.width : 800
            }px`
          }}
        >
          {this.props.galeryImages.map((image, index) => {
            return (
              <div className='image-box' key={index}>
                <img src={image} alt='' className='image' data-image={index} />
              </div>
            );
          })}
        </div>
        {this.state.modal
          ? this.props.children({
              ...this.state,
              onModalClose: this.onModalClose
            })
          : null}
      </div>
    );
  }
}

export default Galery;
