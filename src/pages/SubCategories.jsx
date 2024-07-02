import React from 'react'
import { useEffect, useState } from "react";
import { API, } from "../constants";
import SubCategoryCard from '../components/SubCategoryCard';
import { useSearchParams } from 'react-router-dom';


function SubCategories() {

    const [subCategoryData, setSubCategoryData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [queryParameters] = useSearchParams()


    const fetchSubCategories = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/categories/${queryParameters.get('id')}/subcategories`, {
                headers: {},
            });
            const data = await response.json();
            setSubCategoryData(data);
        } catch (error) {
            console.error(error);
            //error messaage
        } finally {
            setIsLoading(false);
        }
    };

    const displaySubCategories = () => {
        if (!subCategoryData) {
            return null; // or return a loading spinner or some placeholder content
        }
        const subCategories = subCategoryData;
        let jsxElements = [];
        subCategories?.map((element, index) => {
            jsxElements?.push(<SubCategoryCard subCategory={element} key={index} />);
        });

        return jsxElements;


    };



    useEffect(() => {
        fetchSubCategories();
    }, [true]);

    return (
        <div className='w-full flex justify-center'>

            <div className='contentContainer verticalContent flex flex-col w-full'>
                <h1 className='text-center font-heading font-bold text-[2em] my-12'>{queryParameters.get('category')}</h1>
                <div className='w-full flex justify-center'>

                    <div className='    w-full flex flex-row flex-wrap gap-x-[3rem] gap-y-[3rem] justify-around  content-start '>
                        {
                            displaySubCategories()
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubCategories