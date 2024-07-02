import React, { useEffect, useState } from 'react'
import { API, } from "../constants";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { addToCheckout } from '../helpers'
import { splitCamelCase, getFirstWord, getSecondWord } from '../utils';
import { ToastContainer } from "react-toastify";


function ProductPage() {

    const [productData, setProductData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [swiperInitialized, setSwiperInitialized] = useState(false);
    const productIdentifier = window.location.pathname;

    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/products/${productIdentifier.match(/([^\/]*)\/*$/)[1]}?populate=*`, {
                headers: {},
            });
            const data = await response.json();
            setProductData(data.data);
        } catch (error) {
            console.error(error);
            //error messaage
        } finally {
            setIsLoading(false);
        }
    };


    const initSwiper = () => {
        if (!swiperInitialized && productData) {
            new Swiper('.swiper', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
            setSwiperInitialized(true);
        }
    };


    const handleResize = (swiperElement) => {
        if (window.innerWidth <= 1520 && window.innerWidth >= 769 && swiperElement != undefined) {
            swiperElement.style.width = (window.innerWidth / 2) + 'px';
            swiperElement.style.height = (window.innerWidth / 2) + 'px';
        }
        else if (window.innerWidth <= 768 && swiperElement != undefined) {
            swiperElement.style.width = window.innerWidth + 'px';
            swiperElement.style.height = window.innerWidth + 'px';
        }
        else {
            swiperElement.style.width = '800px';
            swiperElement.style.height = '800px';
        }
    };



    const populateCarousel = () => {
        if (!productData) {
            return null; // or return a loading spinner or some placeholder content
        }
        const carouselMedia = productData.attributes.carouselMedia.data;
        let jsxElements = [];
        carouselMedia?.forEach(element => {
            jsxElements.push(<div className="swiper-slide"><img src={`http://localhost:1337${element?.attributes.url}`} className='carousel-image' /></div>)

        });

        return jsxElements;

    }



    const generateSpecificationsTables = (tableHeads) => {
        let jsxTables = []; // Initialize jsxTables here

        tableHeads.forEach((head) => {
            let table = []; // Create a new table for each head
            Object.entries(productData.attributes.subcategorySpecificAttributes[0]).slice(2).forEach(element => {
                if (head === getSecondWord(element[0])) {
                    // Add a row to the current table
                    table.push(
                        <tr>
                            <td>{getFirstWord(element[0])}</td>
                            <td>{element[1]}</td>
                        </tr>
                    );
                }
            });

            // After the inner loop, push the current table to jsxTables
            jsxTables.push(
                <div className='flex flex-col justify-start'>
                    <h2 className='mb-4 font-bold text-xl uppercase font-heading '>{head}</h2>
                    <table className='table-full-width'>
                        <thead>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                </div>
            );
        });

        return jsxTables; // Return jsxTables after the outer loop
    }



    const generateSpecifications = () => {
        if (!productData) {
            return null; // or return a loading spinner or some placeholder content
        }
        let specificationHeadings = [];
        Object.keys(productData.attributes.subcategorySpecificAttributes[0]).slice(2).forEach(element => {

            specificationHeadings.push(getSecondWord(element));
        })

        specificationHeadings = [...new Set(specificationHeadings)];

        return generateSpecificationsTables(specificationHeadings);

    }

    useEffect(() => {
        initSwiper();
    }, [productData]);


    useEffect(() => {

        const swiperElement = document.getElementById("productImageSwiper");
        handleResize(swiperElement);
        window.addEventListener('resize', () => handleResize(swiperElement));
        fetchProduct();
    }, []);


    return (
        <div className='w-full flex justify-center'>
            <ToastContainer />
            <div className='contentContainer verticalContent flex flex-col w-full'>

                {/* IMAGE CAROUSEL LEFT AND INFO RIGHT */}
                <div className='flex flex-col md:flex-row w-full h-fit  gap-12 pb-48'>
                    <div className='flex'>
                        <div className="swiper " id='productImageSwiper'>
                            {/* <!-- Additional required wrapper --> */}
                            <div className="swiper-wrapper">
                                {/* <!-- Slides --> */}
                                {populateCarousel()}
                            </div>
                            {/* <!-- If we need pagination --> */}
                            <div className="swiper-pagination self-center"></div>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-y-8 w-full px-[20px] md:px-0'>
                        <h1 className=' font-heading font-bold text-[2rem]'>{productData?.attributes.name}</h1>
                        <h2 className='font-secondary font-semibold text-[2.5rem] tracking-wider' id='priceDisplay'>{`${productData?.attributes.price} Lei`}</h2>
                        <button onClick={() => addToCheckout(productData?.id)} className='text-white  bg-secondary font-medium rounded-lg text-xl w-full px-5 py-2.5 text-center ' id='addToCart'>Add To Cart</button>
                        <p className='font-secondary text-[1.5rem]'>{productData?.attributes.description}</p>
                    </div>
                </div>
                {/* DESCIRPTIONS */}
                <div className='flex flex-col w-full px-[20px] md:px-0'>
                    <h2 className='font-secondary font-semibold text-[2.5rem] pb-12'>Specificatii</h2>
                    <div className='flex flex-col gap-8'>
                        {generateSpecifications()}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductPage