import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import "./HomeCarousel.css"
const carouselData = [
  {
    imgSrc: '/one.png',
    altText: '',
    title: ['']
  },
  {
    imgSrc: '/two.png',
    altText: '',
    title: []
  },
  {
    imgSrc: '/three.png',
    altText: '',
    title: [ ]
  }
];

const HomeCarousel2 = () => {
    const carouselRef = useRef(null);
  
    return (
      <div className="hero-section">
        <Carousel ref={carouselRef} autoplay>
          {carouselData.map((item, index) => (
            <div key={index} className="carousel-item">
              <img
                src={item.imgSrc}
                alt={item.altText}
                className="carousel-image"
              />
              <div className="carousel-title">
                {item.title.map((line, i) => (
                  <h2 key={i} className="text-center">
                    {line}
                  </h2>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
  
        {/* Carousel control buttons */}
        <div className="carousel-controls">
          <Button 
             shape='circle'
            
            icon={<LeftOutlined />}
            onClick={() => carouselRef.current.prev()}
            className="carousel-control-button left"
          />
          <Button
            shape='circle'
            icon={<RightOutlined />}
            onClick={() => carouselRef.current.next()}
            className="carousel-control-button right"
          />
        </div>
      </div>
    );
  };
  
  export default HomeCarousel2;
