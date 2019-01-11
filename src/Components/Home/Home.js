import React from 'react';
import PagesList from '../Main/PagesList';
import _ from 'lodash';
import "./Scroller.css";
import ErrorBoundary from '../ErrorBoundary';
const Home=({...props})=>{
	const filteredPages= _.uniqBy(props.db, 'category');
	const filteredCategories= filteredPages.map(category=>category.category).sort()
	return (
		<React.Fragment>{
			filteredCategories.map((category,i)=>{
				let calcWidth=props.db.filter(card=>card.category===category).length;
				calcWidth=(calcWidth>4)?4:calcWidth
				return(
					<fieldset key={category} className="b m-3 pt-0 scroll">
						<legend className="b rounded w-auto d-flex text-left pl-1 ml-3 " onClick={()=>props.onPageChange('display',category)}><p className="pr-3 pl-3 mb-0">{category.toUpperCase()}</p></legend>
							<div className="m-0 p-1 mtminus" style={{width: calcWidth*416+"px"}}>
				 			{
				 				!props.user?<ErrorBoundary><PagesList categoryFilter={category} database={props.db} countryFilter="" limit={4}/></ErrorBoundary>
				 				:<ErrorBoundary><PagesList categoryFilter={category} database={props.db} countryFilter="" limit={4} userFavourites={props.user.fav}/></ErrorBoundary>
				 			}
							</div>
					</fieldset>
					)
			})
		}</React.Fragment>
	)
}

export default Home;