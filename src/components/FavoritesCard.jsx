import React, { useState, } from 'react'
import { showToastMessage } from '../helpers.js';
function FavoritesCard({ product }) {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')));

    const removeFromFavorites = () => {
        const updatedFavorites = favorites.filter(item => item.productId !== product.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        showToastMessage("Produsul a fost eliminat din favorite", "success");

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };


    return (
        <div className='w-full p-8  max-w-[48rem] bg-white border border-gray-300 rounded-lg shadow gap-x-8  flex content-center justify-between h-fit'>

            <div className='flex justify-center items-center'>
                <a href={`/product/${product.id}`}>
                    <img className=" rounded-t-md aspect-square object-cover max-w-[8rem]" src={`http://localhost:1337${product?.cardPhoto?.url}`} alt="product image" />
                </a>
            </div>
            {/* Text DIV */}
            <div>
                <a href={`/product/${product.id}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 product-name max-w-[19rem]">{product.name}</h5>
                </a>
            </div>
            {/* PRICE, QTY, REMOVE PRODUCT DIV */}

            <div className='flex flex-col gap-y-12 items-center justify-center content-center'>
                <span className="font-secondary font-semibold text-xl tracking-wider text-gray-900">{`${product.price} Lei`}</span>
                <button onClick={removeFromFavorites} className='text-error'>Sterge</button>

            </div>
        </div>
    )
}

export default FavoritesCard