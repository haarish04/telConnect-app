import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../styles/Carousel.css'; // Your custom CSS
import plan_image1 from '../assets/plan_image1.png';
import plan_image2 from '../assets/plan_image2.png';

const CarouselComponent = ({ plan_carousel1, plan_carousel2 }) => {
  return (
    <Carousel interval={3000} controls={true} indicators={true}>
      {plan_carousel1 && (
        <Carousel.Item>
          <div className="d-flex align-items-center">
            <img
              src={plan_image1}
              alt={plan_carousel1.planName}
              className="carousel-image"
            />
            <Carousel.Caption className="carousel-caption">
              <h5>{plan_carousel1.planName}</h5>
              <p>{plan_carousel1.planDescription}</p>
              <p>Price: {plan_carousel1.planPrice}</p>
              <p>Duration: {plan_carousel1.planDuration}</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      )}
      {plan_carousel2 && (
        <Carousel.Item>
          <div className="d-flex align-items-center">
            <img
              src={plan_image2}
              alt={plan_carousel2.planName}
              className="carousel-image"
            />
            <Carousel.Caption className="carousel-caption">
              <h5>{plan_carousel2.planName}</h5>
              <p>{plan_carousel2.planDescription}</p>
              <p>Price: {plan_carousel2.planPrice}</p>
              <p>Duration: {plan_carousel2.planDuration}</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default CarouselComponent;
