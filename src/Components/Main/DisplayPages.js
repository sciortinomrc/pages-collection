import React from 'react'; 
import PagesList from './PagesList';
import './Style/Scroller.css';
import _ from 'lodash';

class DisplayPages extends React.Component{
	constructor({category,cards,database,limit}){
		super()
		this.state=({
			searchField: '',
			countryFilter: '',
			categoryFilter: ''
		})
	}
//set filter
	setFilter=(event,filter)=>{
		switch(event.target.parentNode.id){
			case 'hidden-country': {this.setState({countryFilter: filter}); event.target.parentNode.classList.toggle('d-none'); break;}
			case 'hidden-category': {this.setState({categoryFilter: filter}); event.target.parentNode.classList.toggle('d-none'); break;}
			default: break;
		}
	}
//country select filter
	countrySelect=()=>{
		const filteredPages= _.uniqBy(this.props.database, 'country');
		const filteredCountries= filteredPages.map(record=>record.country);
		return(
			<div id="hidden-country" className="d-none p-absolute set-width border on-top">
			<p key="nofilter" id="nofilter" className="link m-0 p-2 border" onClick={(event)=>this.setFilter(event,"")}>No Filter</p>
			  	{
					filteredCountries.map((country,i)=>{
						return<p key={country+i} id={country} className="link m-0 p-2 border" onClick={(event)=>this.setFilter(event,country)}>{country}</p>
					})					
			  	}
		  	</div>
			)
	}

//category select flter
	categorySelect=()=>{
		const filteredPages= _.uniqBy(this.props.database, 'category');
		const filteredCategories= filteredPages.map(record=>record.category);
		return(
			<div id="hidden-category" className="d-none p-absolute border set-width on-top">
				<p key="nocateogory" id="noCategory" className="link m-0 p-2 border" className="link m-0 p-2 border" onClick={(event)=>this.setFilter(event,'')}>No filter</p>
			  	{
					filteredCategories.map((category,i)=>{
						return<p key={category+i} id={category} className="link m-0 p-2 border" className="link m-0 p-2 border" onClick={(event)=>this.setFilter(event,category)}>{category}</p>
					})					
			  	}
		  	</div>
			)
	}
//searchPage
	expandSelection=(event,type)=>{
		const hiddenCategory=document.getElementById('hidden-category');
		const hiddenCountry=document.getElementById('hidden-country');
		const button=event.tagName==='I'?event.parentNode:event
		if(button.id==='filter-country')hiddenCategory.classList.add('d-none')
		if(button.id==='filter-category')hiddenCountry.classList.add('d-none')
		button.parentNode.children[1].classList.contains('d-none')?
			button.parentNode.children[1].classList.remove('d-none'):
			button.parentNode.children[1].classList.add('d-none')
	}
	filterCards=(filter)=>{
		switch(filter){
			case 'country': {
				this.state.filteredCards.filter(card=>{
					return card && card.country.toLowerCase()===this.state.countryFilter.toLowerCase();
				}); 
				break;
			}
			case 'category': {
				this.state.filteredCards.filter(card=>{
					return card && card.category.toLowerCase()===this.state.categoryFilter.toLowerCase()
				});
				break;
			}
			default: return undefined
		}
	}
	nameSearch=(event)=>{
		this.setState({searchField: event.target.value})
	}
dropdown=(event)=>{
					if(document.getElementById('display-pages')){		
						const hiddenCategory=document.getElementById('hidden-category');
						const hiddenCountry=document.getElementById('hidden-country');
						if(
							event.target.id!==hiddenCategory.id &&
							event.target.id!==hiddenCountry.id &&
							event.target.parentNode.id!==hiddenCategory.id &&
							event.target.parentNode.id!==hiddenCountry.id &&
							event.target.id!=='filter-country' && 
							event.target.id!=='filter-category') 
							{
								hiddenCountry.classList.add('d-none');
								hiddenCategory.classList.add('d-none')
						}
					}
				}
	render(){
		const {category,limit,cards,database}=this.props;
		return(
			<div id="display-pages">
			{
				window.addEventListener('click', this.dropdown)
			}
				<div className="d-inline-flex w-75 justify-content-center">
					<input type="search" placeholder="Filter by Name" className="rounded w-25 text-center"/>
					<div className="p-0 m-0 set-height btn-width">
				  		<button id="filter-country"  className=" text-center btn-width" title="Filter By Country" onClick={(event)=>this.expandSelection(event.target,'filter-country')}>Country<i className="fas fa-filter"></i></button>
				  		{this.countrySelect()}
			  		</div>
			  		<div className="p-0 m-0 set-height btn-width">
				  		<button id="filter-category"  className=" text-center btn-width" title="Filter By Category"  onClick={(event)=>this.expandSelection(event.target,'filter-country')}>Category<i className="fas fa-filter"></i></button>
				  		{this.categorySelect()}
			  		</div>
			  	</div>
				<hr />
				<PagesList 
					category={this.state.categoryFilter}
					country={this.state.countryFilter}
					name={this.state.searchField}
					cards={cards}
					database={database}
				/>
			</div>
			)
	}
}
export default DisplayPages;