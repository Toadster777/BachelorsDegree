import React from 'react'

function CategoryCard({ category, key }) {
    return (
        <a href={`/categories/sub-categories?id=${category.id}&category=${encodeURIComponent(category.attributes.name)}`} id={key} className='categoryCard mb-12 flex flex-col h-fit items-center gap-4 group sizeCategoryCard'>
            <img src="../../public/phoneCategory.avif" alt="" className='circular--square border-2 border-secondary group-hover:animate-bounce' />
            <h2 className='text-center'>{category.attributes.name}</h2>
        </a>
    )
}

export default CategoryCard

