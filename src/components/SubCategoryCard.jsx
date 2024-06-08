import React from 'react'


function SubCategoryCard({ subCategory, key }) {

    return (
        <a href={`/products/filter?subcategory=${subCategory.slug}`} id={key} className='categoryCard mb-12 flex flex-col h-fit items-center gap-4 group sizeCategoryCard'>
            <img src="../../public/phoneCategory.avif" alt="" className='circular--square border-2 border-secondary group-hover:animate-bounce' />
            <h2 className='text-center'>{subCategory.name}</h2>
        </a>
    )
}

export default SubCategoryCard