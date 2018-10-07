import React from 'react';
import PagesList from '../Main/PagesList';
import _ from 'lodash';
import "./Scroller.css";
const Scroller=({at,categories,pages,cross, apiCall})=>{
	const filteredPages= _.uniqBy(categories, 'category');
	const filteredCategories= filteredPages.map(category=>category.category)
	if(at){
	return(
		<div className="full-screen">
			{	
			filteredCategories.map(category=>{
				return(
					<fieldset key={category} className="b m-2 pt-0 ">
						<legend className="b w-25 d-flex text-left pl-1 ml-3 "><p className="ml-5 mb-0">{category}</p></legend>
							<div className="d-inline-flex justify-content-start scroll w-100 m-0 p-1 mtminus">
								<PagesList category={category} pages={pages} cross={categories} onApiCall={apiCall}/>
								
							</div>
					</fieldset>
					)
			})}
		</div>
		)
	}
	return(
		<p className="text-center">... LOADING ...</p>
		)
}

export default Scroller;