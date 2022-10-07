import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

import { Overlay, Header, CloseBtn, ImgWrapper, SlickWrapper } from './styles';

const ImagesZoom = ({ images, onClose }) => {
  
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow : false,
      };
        
      return (
            <Overlay>
                <Header>
                    <h1>상세 이미지</h1>
                    <CloseBtn onClick={onClose}>X</CloseBtn>
                </Header>
                <SlickWrapper>
                    <Slider {...settings} arrows={false}>
                        {images.map((v) => (
                        <ImgWrapper key={v.src}>
                            <img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v.src} />
                        </ImgWrapper>
                        ))}
                    </Slider>
                </SlickWrapper> 
            </Overlay>
    );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
