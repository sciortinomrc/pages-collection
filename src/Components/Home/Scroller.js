import React from 'react';
import PagesList from '../Main/PagesList';
import _ from 'lodash';
import "./Scroller.css";
const Scroller=({...props})=>{
	if(props.at){
	const filteredPages= _.uniqBy(props.db, 'category');
	const filteredCategories= filteredPages.map(category=>category.category)
	return(
		<div className="full-screen">
			{	
			props.cards.length?
				(
					filteredCategories.map(category=>{
						return(
							<fieldset key={category} className="b m-2 pt-0 ">
								<legend className="b w-25 d-flex text-left pl-1 ml-3 "><p className="ml-5 mb-0">{category}</p></legend>
									<div className="d-inline-flex justify-content-start scroll w-100 m-0 p-1 mtminus">
						 				<PagesList category={category} cards={props.cards} db={props.db}/>
									</div>
							</fieldset>
							)
					})
				):
				(
					<p className="text-center">... FETCHING DATA FROM FACEBOOK - PLEASE WAIT ...</p>
				)
			}
		</div>
		)
	}else{
		return(
			<div className="full-screen">
				<p className="text-center">... GETTING ACCESS TO FACEBOOK DATA ...</p>
			</div>
			)
	}
}

export default Scroller;