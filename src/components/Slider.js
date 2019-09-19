import React from "react";
import CurrentImage from "./CurrentImage";
import "../css/Modal.css";

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: parseInt(this.props.currentIndex, 10) || 0,
      containerChildren: []
    };

    this.childrenLength = this.props.images.length;
    this.sliderContainer = React.createRef();
    this.nextSlide = React.createRef();
    this.prevSlide = React.createRef();

    this.options = {
      currentImage: true,
      duration: 2000,
      width: 700
    };
  }

  slide = directionSlide => {
    const width = this.sliderContainer.current.clientWidth;
    const style = this.sliderContainer.current.style;

    switch (directionSlide) {
      case "next":
        style.transform = `translateX(-${width}px)`;
        style.transition = `transform ${this.duration(
          this.options.duration
        )}s cubic-bezier(0.42, 0, 0.15, 0.74)`;
        break;
      case "prev":
        style.transform = `translateX(-${width}px)`;
        break;
      default:
        break;
    }

    return style;
  };

  disable = items => {
    items.forEach(item => {
      item.style.pointerEvents = "none";
    });
  };

  enable = items => {
    items.forEach(item => {
      item.style.pointerEvents = "auto";
    });
  };

  duration = duration => {
    let getDelay = null;

    if (typeof this.props.duration === "number") {
      this.options = Object.assign(this.options, {
        duration: this.props.duration
      });

      getDelay = this.options.duration.toString();
      return getDelay.substring(0, 1);
    }

    getDelay = duration.toString();

    return getDelay.substring(0, 1);
  };

  width = width => {
    if (typeof this.props.width === "number") {
      this.options = Object.assign(this.options, {
        width: this.props.width
      });

      return this.options.width;
    }

    return width;
  };

  next = () => {
    const elDisplay = this.state.containerChildren[this.state.currentIndex];

    if (this.state.currentIndex < this.childrenLength - 1) {
      const style = this.slide("next");

      this.disable([this.nextSlide.current, this.prevSlide.current]);

      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1
      }));

      this.setTimeId = setTimeout(() => {
        elDisplay.style.display = "none";
        style.transform = `translateX(0px)`;
        style.transition = ``;

        this.enable([this.nextSlide.current, this.prevSlide.current]);
      }, this.options.duration);
    }
  };

  prev = () => {
    if (
      this.childrenLength > this.state.currentIndex &&
      this.state.currentIndex > 0
    ) {
      const elDisplay = this.state.containerChildren[
        this.state.currentIndex - 1
      ];
      elDisplay.style.display = "block";

      const style = this.slide("prev");

      this.disable([this.nextSlide.current, this.prevSlide.current]);

      if (elDisplay.clientWidth) {
        style.transition = `transform ${this.duration(
          this.options.duration
        )}s cubic-bezier(0.42, 0, 0.15, 0.74)`;
        style.transform = `translateX(0px)`;
      }

      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1
      }));

      this.setTimeId = setTimeout(() => {
        style.transition = ``;
        this.enable([this.nextSlide.current, this.prevSlide.current]);
      }, this.options.duration);
    }
  };

  componentDidMount() {
    const sliderContainerChildren = Array.from(
      this.sliderContainer.current.children
    );

    if (this.props.currentIndex && parseInt(this.props.currentIndex, 10) >= 0) {
      sliderContainerChildren.forEach((child, index) => {
        if (index < this.state.currentIndex) {
          child.style.display = "none";
        }
      });
    }

    this.setState({
      containerChildren: sliderContainerChildren
    });
  }

  componentWillUnmount() {
    if (this.setTimeId) {
      clearTimeout(this.setTimeId);
    }
  }

  render() {
    return (
      <div
        className='modal'
        onClick={this.props.onModalClose && this.props.onModalClose}
      >
        <div
          className='slider'
          style={{ maxWidth: `${this.width(this.options.width)}px` }}
        >
          <i
            className='fas fa-chevron-left'
            onClick={this.prev}
            ref={this.prevSlide}
          ></i>

          <div ref={this.sliderContainer} className='slider-container'>
            {this.props.images.map((image, index) => {
              return (
                <div className='image' key={index}>
                  <img src={image} alt='' />
                </div>
              );
            })}
          </div>
          <i
            className='fas fa-chevron-right'
            onClick={this.next}
            ref={this.nextSlide}
          ></i>
          {this.options.currentImage && (
            <CurrentImage
              current={this.state.currentIndex}
              all={this.childrenLength}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
