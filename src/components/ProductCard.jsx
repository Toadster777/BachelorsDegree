import React from 'react'
import { addToCheckout, addToFavorites } from '../helpers'
function ProductCard({ product, isLoggedIn }) {

    function isProductInFavorites(productId) {
        // Retrieve the favorites from local storage
        const favorites = localStorage.getItem('favorites');
        if (!favorites) {
            // If there are no favorites in local storage, return false
            return false;
        }

        // Parse the favorites from a JSON string to an array of objects
        const favoritesArray = JSON.parse(favorites);

        // Check if any object in the array has a productId that matches the one we're looking for
        const productExists = favoritesArray.some(item => item.productId === productId);

        // Return true if the product is found, otherwise return false
        return productExists;
    }

    return (
        <div className="w-full sizeProductCard max-w-[16rem] bg-white border border-gray-300 rounded-lg shadow flex flex-col justify-between h-fit">
            <a href={`/product/${product.id}`} className='px-5 pt-5 mb-3'>
                <img className=" rounded-t-md aspect-square object-cover" src={`http://localhost:1337${product?.cardPhoto?.url}`} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href={`/product/${product.id}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 product-name">{product.name}</h5>
                </a>
                <h3 className='text-md font-semibold pt-4'>{`In Stoc: ${product.units} bucati`}</h3>
                <div className="flex items-center justify-between pt-4">
                    <div className='flex flex-col gap-2'>
                        <span className="font-secondary font-semibold text-xl tracking-wider text-gray-900">{`${product.price} Lei`}</span>
                        <button disabled={product.units == 0} onClick={() => addToCheckout(product.id)} className={`${product.units == 0 ? "bg-error" : ""}text-white bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>{`${product.units == 0 ? "Lipsa Stoc!" : "Adauga In Cos"}`}</button>
                    </div>

                    {isLoggedIn ? <><button onClick={(e) => addToFavorites(product.id, e.currentTarget)} className={`self-end removeBtn px-2.5 pt-2.5 ${isProductInFavorites(product.id) ? "" : "hidden"}`}>
                        <svg width="36px" height="36px" viewBox="0 0 24 24" fill="#dc2626" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                        <button onClick={(e) => addToFavorites(product.id, e.currentTarget)} className={`self-end addBtn px-2.5 pt-2.5 ${isProductInFavorites(product.id) ? "hidden" : ""}`}> <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#215196" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></button></> : null}



                </div>
            </div>
        </div>
    )
}

export default ProductCard