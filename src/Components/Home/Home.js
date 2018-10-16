import React from 'react';
import PagesList from '../Main/PagesList';
import _ from 'lodash';
import "./Scroller.css";
const Home=({...props})=>{
	if(props.at){
	const filteredPages= _.uniqBy(props.db, 'category');
	const filteredCategories= filteredPages.map(category=>category.category)
	return (
		<div className="">{
		props.cards.length?
			(
				filteredCategories.map(category=>{
					return(
						<fieldset key={category} className="b m-2 pt-0 ">
							<legend className="b w-auto d-flex text-left pl-1 ml-3 " onClick={()=>props.onPageChange('display-category',category)}><p className="pr-3 pl-3 mb-0">{category.toUpperCase()}</p></legend>
								<div className="scroll w-100 m-0 p-1 mtminus">
					 				<PagesList category={category} cards={props.cards} db={props.db} limit={4}/>
								</div>
						</fieldset>
						)
				})
			):
			(
				<p className="text-center">... FETCHING DATA FROM FACEBOOK - PLEASE WAIT ...</p>
			)
		}</div>
	)

	}else{
		return(
				<p className="text-center">... GETTING ACCESS TO FACEBOOK DATA ...</p>
			)
	}
}

export default Home;