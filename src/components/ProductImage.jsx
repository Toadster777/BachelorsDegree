import React from 'react';

const ProductImage = ({ image }) => {
    return (
        <div>
            <img src={image} alt="Product" className="carousel-image" />
        </div>
    );
};

export default ProductImage;