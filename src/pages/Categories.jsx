import React, { useState } from "react";
import CategoryCard from '../components/CategoryCard'
import { useEffect } from "react";
import { API, } from "../constants";

function Categories() {

    const [categoryData, setCategoryData] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/categories`, {
                headers: {},
            });
            const data = await response.json();

            setCategoryData(data);
        } catch (error) {
            console.error(error);
            //error messaage
        } finally {
            setIsLoading(false);
        }
    };

    const displayCategories = () => {
        if (!categoryData) {
            return null; // or return a loading spinner or some placeholder content
        }

        const categories = categoryData.data;
        let jsxElements = [];
        categories?.map((element, index) => {
            jsxElements?.push(<CategoryCard category={element} key={index} />);
        });

        return jsxElements;
    };



    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <div className='w-full flex justify-center'>

            <div className='contentContainer verticalContent flex flex-col  w-full'>
                <h1 className='text-center font-heading font-bold text-[2em] my-12'>Categories</h1>
                <div className='w-full flex justify-center'>

                    <div className='w-full flex flex-row flex-wrap gap-x-[3rem] gap-y-[3rem] justify-around  content-start '>
                        {
                            displayCategories()
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories