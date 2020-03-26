import React from 'react';
import Card from './Card';

class PagesList extends React.Component{
	constructor(){
		super();
		this.filters={
			category:'',
			country:'',
			name:''
		}
	}


	applyFilters=(pages,limit=9999999)=>{
		if(!pages) return [];
		return pages.filter(page=>!this.filters.category.length || page.category==this.filters.category)
			.filter(page=>!this.filters.country.length || page.country==this.filters.country)
			.filter(page=>page.name.includes(this.filters.name))
			.map((page,i)=>{if(i<limit) return page})
			.filter(page=>page);
	}
	setFilters=()=>{
		this.filters={
			category: this.props.categoryFilter,
			country: this.props.countryFilter,
			name: this.props.nameFilter
		}
	}


	render(){
		const {limit,pages,userFavourites} =this.props
		this.setFilters();
		const filteredRecords = this.applyFilters(pages,limit);
		return(
			<div id="pages-wrapper">
			<div id="pages-list" style={{width: this.props.style}}>
			{
				filteredRecords.map(card=>{
					return (
						<Card
							key={card.id}
							type={card.type}
							likes={card.likes}
							id={card.id}
							name={card.name}
							picture={card.picture}
							url={card.url}
							favourites={card.favourites}
							category={card.category}
							country={card.country}
							favToggle={userFavourites && userFavourites.includes(card.id)}
						/>
					)
				})
			}
			</div>
			</div>
		)
	}
}
export default PagesList;