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
							<legend className="b w-25 d-flex text-left pl-1 ml-3 "><p className="ml-5 mb-0">{category.toUpperCase()}</p></legend>
								<div className="scroll w-100 m-0 p-1 mtminus">
					 				<PagesList category={category} cards={props.cards} db={props.db}/>
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