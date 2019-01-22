import React, {useState} from 'react';
import PagesList from '../Main/PagesList';
import _ from 'lodash';
import "./Scroller.css";
import ErrorBoundary from '../ErrorBoundary';
const Home=({...props})=>{
	const [w, setW] = useState(0)
	const filteredPages= _.uniqBy(props.db, 'category');
	const filteredCategories= filteredPages.map(category=>category.category).sort()
	return (
		<React.Fragment>{
			filteredCategories.map((category,i)=>{
				let calcWidth=props.db.filter(card=>card.category===category).length;
				calcWidth=(calcWidth>4)?4:calcWidth
				const c=(window.innerWidth<=490)?315:430;
				if(c!==w) setW(c);
				return(

					<fieldset key={category} >
						<legend onClick={()=>props.onPageChange('display',category)}><p >{category.toUpperCase()}</p></legend>
				 			{
				 				!props.user?<ErrorBoundary><PagesList categoryFilter={category} database={props.db} countryFilter="" limit={4} style={calcWidth*w+"px"}/></ErrorBoundary>
				 				:<ErrorBoundary><PagesList categoryFilter={category} database={props.db} countryFilter="" limit={4} userFavourites={props.user.fav} style={calcWidth*w+"px"}/></ErrorBoundary>
				 			}
					</fieldset>
					)
			})
		}</React.Fragment>
	)
}

export default Home;