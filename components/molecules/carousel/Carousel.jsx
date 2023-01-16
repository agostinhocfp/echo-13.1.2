import React from "react";
import { CarouselProvider, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import styles from "./Carousel.module.css";

const Carousel = (props) => {
  return (
    <CarouselProvider
      className={styles.root}
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={props.totalSlides}
      currentSlide={props.currentSlide}
      visibleSlides={props.visibleSlides}
    >
      <Slider>{props.children}</Slider>
    </CarouselProvider>
  );
};

export default Carousel;
