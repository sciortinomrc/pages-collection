import React from 'react';
import _ from 'lodash';
import './Categories.css';

const Categories=({categories,onPageChange})=>{
	const filteredPages= _.uniqBy(categories, 'category');
	const filteredCategories= filteredPages.map(category=>category.category)
	return(
			<div className="d-flex m-auto flex-wrap justify-content-baseline w-75">
				{
					filteredCategories.map(category=>{
						return <p key={category} className="border m-auto pointer btn-primary p-2" onClick={()=>onPageChange('display-category',category)}>{category.toUpperCase()}</p>
					})
				}
			</div>
		)
}

export default Categories;