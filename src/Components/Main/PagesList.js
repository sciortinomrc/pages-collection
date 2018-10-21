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
		const {categoryFilter,countryFilter,limit,database,cards} =this.props
		let filteredRecords=[];
		let lim=1;
		let filteredCardsId=cards.filter(card=>{
			return card.name.toLowerCase().includes(this.props.searchField.toLowerCase())
		})
		filteredCardsId=filteredCardsId.map(card=>card.id)
		filteredRecords=database.filter(record=>{
			return filteredCardsId.some(card=>card.includes(record.id))
		})
		filteredRecords=filteredRecords.filter(record=>{
			return categoryFilter==="" || record.category===categoryFilter
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
			<div className="d-flex flex-wrap justify-content-baseline height m-auto" >
			{
				cards.map(card=>{
					const recordMatch=filteredRecords.filter(record=>{
						return record.id===card.id
					})
				if(recordMatch.length){
					return (
							<Card
								id={card.id}
								name={card.name}
								fan_count={card.fan_count}
								picture={card.picture.data.url}
								link={card.link}
								favourites={recordMatch[0].favourite}
								category={recordMatch[0].category}
								country={recordMatch[0].country}
							/>)
				}
				else return undefined
				})
			}
			 </div>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PagesList);