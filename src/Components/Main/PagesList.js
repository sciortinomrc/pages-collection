import React from 'react';
import Card from './Card';
import {connect} from 'react-redux';
import {setFilters} from '../../State/actions';
import _ from 'lodash';
const mapStateToProps=state=>{
	return{
		searchField: state.addFilter.searchField,
		filters: state.addFilter.filters
	}
}
const mapDispatchToProps=dispatch=>{
	return{
	setFilters: (categoryFilters, countryFilters)=> dispatch(setFilters(categoryFilters, countryFilters))
	}
}
class PagesList extends React.Component{
	returnFilters=(records)=>{
		
		const filteredPagesCategory= _.uniqBy(records, 'category');
		const categoryFilters= filteredPagesCategory.map(record=>record.category);
		const filteredPagesCountry= _.uniqBy(records, 'country');
		const countryFilters= filteredPagesCountry.map(record=>record.country);
		if(this.props.filters.countryFilters.length!==countryFilters.length || this.props.filters.categoryFilters.length!==categoryFilters.length)
			this.props.setFilters(categoryFilters, countryFilters)
	}
	render(){
		const {categoryFilter,countryFilter,limit,database,userFavourites} =this.props
		let lim=0;
		let filteredRecords=database.filter(record=>{
			return record.name.toLowerCase().includes(this.props.searchField.toLowerCase()) && (categoryFilter==="" || record.category===categoryFilter)
		})
		filteredRecords=filteredRecords.filter(record=>{
			lim++
			if(limit && lim>limit){
				return undefined
			}
			return countryFilter==="" || record.country===countryFilter
		})


		if(!limit)this.returnFilters(filteredRecords)
		return(
			<div className=" height m-auto align-content-center grid">
			{
				filteredRecords.map(card=>{
					return (
						(userFavourites && userFavourites.includes(card.id)?(
							<Card
								key={card.id}
								id={card.id}
								name={card.name}
								picture={card.picture}
								url={card.url}
								favourites={card.favourite}
								category={card.category}
								country={card.country}
								favToggle={true}
							/>)	
						:(
							<Card
								key={card.id}
								id={card.id}
								name={card.name}
								picture={card.picture}
								url={card.url}
								favourites={card.favourite}
								category={card.category}
								country={card.country}
								favToggle={false}
							/>)	
						)
					)
				})
			}
			</div>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PagesList);