import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slick from 'react-slick';


const PostImages = ({ images }) => {
    
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    const imgEl = useRef();


    return (
        <Pictures>
            <Slick {...settings}>
                {images.map((v) => (<img key={v.src} src={v.src} alt={v.src} />))}
            </Slick>
        </Pictures>
    );
}

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string,
    })).isRequired,
};

export default PostImages;


const Pictures = styled.div`
    text-align:center;
    margin-bottom:10px;
    &:hover{  
        cursor: pointer;
    }
`;
