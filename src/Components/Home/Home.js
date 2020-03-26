import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import PagesList from '../Main/PagesList';
import "./Scroller.css";
import ErrorBoundary from '../ErrorBoundary';

const getCategories = (pages)=>{
	return pages.reduce((acc,page)=>{
		if(!acc.includes(page.category)) 
			acc.push(page.category); 
		return acc
	},[])
}
const Home = ({pages, user}) => {
	const [width, setWidth] = useState(0)
	const categories = getCategories(pages);
	return (
		<React.Fragment>{
			categories.map((category, i) => {
				let calcWidth = pages.filter(card => card.category === category).length;
				calcWidth = (calcWidth > 4) ? 4 : calcWidth
				const currentWidth = (window.innerWidth <= 490) ? 315 : 430;
				if (currentWidth !== width) setWidth(currentWidth);
				return (

					<fieldset key={category} >
						<legend><Link to={"/display?category="+category}>{category.toUpperCase()}</Link></legend>
						<ErrorBoundary>
							<PagesList categoryFilter={category} pages={pages} countryFilter="" limit={4} userFavourites={user?user.fav:null} style={calcWidth * width + "px"} />
						</ErrorBoundary>
					</fieldset>
				)
			})
		}</React.Fragment>
	)
}

export default Home;