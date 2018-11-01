import React from 'react';
import PagesList from '../Main/PagesList';
import _ from 'lodash';
import "./Scroller.css";
import ErrorBoundary from '../ErrorBoundary';
const Home=({...props})=>{
	const filteredPages= _.uniqBy(props.db, 'category');
	const filteredCategories= filteredPages.map(category=>category.category).sort()
	return (
		<div className="">{
		props.cards.length===props.db.length?
			(
				filteredCategories.map((category,i)=>{
					return(
						<fieldset key={category} className="b m-2 pt-0 ">
							<legend className="b w-auto d-flex text-left pl-1 ml-3 " onClick={()=>props.onPageChange('display',category)}><p className="pr-3 pl-3 mb-0">{category.toUpperCase()}</p></legend>
								<div className="scroll w-100 m-0 p-1 mtminus">
					 			{
					 				!props.user?<ErrorBoundary><PagesList categoryFilter={category} cards={props.cards} database={props.db} countryFilter="" limit={4}/></ErrorBoundary>
					 				:<ErrorBoundary><PagesList categoryFilter={category} cards={props.cards} database={props.db} countryFilter="" limit={4} userFavourites={props.user.fav}/></ErrorBoundary>
					 			}
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
}

export default Home;