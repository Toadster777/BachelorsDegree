import React, { useState, useEffect } from 'react'
import FavoritesCard from '../components/FavoritesCard';
import { API, } from "../constants";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from '../helpers.js';
function Favorites() {

    const [productData, setProductData] = useState();


    const fetchProductsByIds = async (cartIds) => {
        try {
            const response = await fetch(`${API}/products/find-by-ids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: cartIds }),
            });

            if (!response.ok) {
                showToastMessage("A apărut o eroare la aducerea produselor favorite", "error");
            }

            const data = await response.json();
            setProductData(data);
        } catch (error) {
            showToastMessage("A apărut o eroare la aducerea produselor favorite", "error");
        }
    }


    const displayFavoriteProducts = (productData) => {
        if (!productData) {
            return null; // or return a loading spinner or some placeholder content
        }
        let jsxElements = [];
        productData?.forEach((element, index) => {
            jsxElements?.push(<FavoritesCard product={element} />);
        });

        return jsxElements;


    };

    useEffect(() => {
        const favoritesStorageData = localStorage.getItem('favorites');
        if (favoritesStorageData) {
            const favoritesData = JSON.parse(favoritesStorageData);
            const idArray = favoritesData.map(item => item.productId);
            fetchProductsByIds(idArray);
        }
    }, []);



    return (
        <div className='w-full flex justify-center'>
            <ToastContainer />
            <div className='contentContainer verticalContent flex flex-col w-full'>
                <h1 className='text-center font-heading font-bold text-[2em] my-12'>Produse Favorite</h1>
                <div className='w-full flex justify-center'>
                    <div className='w-full flex flex-row flex-wrap shrink grow basis-0 gap-x-[1rem] gap-y-[2rem] justify-around  content-start '>

                        {displayFavoriteProducts(productData)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites