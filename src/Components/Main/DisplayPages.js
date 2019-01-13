import React from 'react'; 
import PagesList from './PagesList';
import {connect} from 'react-redux';
import { setSearchfield, setCountryFilter, setCategoryFilter, setFilters } from '../../State/actions';
import './Style/Scroller.css';
import ErrorBoundary from '../ErrorBoundary';
const mapStateToProps=state=>{
	return{
		userFavourites: state.onLogin.loggedUser,
		searchField: state.addFilter.searchField,
		countryFilter: state.addFilter.countryFilter,
		categoryFilter: state.addFilter.categoryFilter,
		filters: state.addFilter.filters
	}
}

const mapDispatchToProps=dispatch=>{
	return{
	setSearchfield: (text)=> dispatch(setSearchfield(text)),
	setCategoryFilter: (filter)=> dispatch(setCategoryFilter(filter)),
	setCountryFilter: (filter)=> dispatch(setCountryFilter(filter)),
	setFilters: (categoryFilters,countryFilters)=> dispatch(setFilters(categoryFilters,countryFilters))
	}
}


class DisplayPages extends React.Component{
//set filter
	setFilter=(event,filter)=>{
		switch(event.target.parentNode.id){
			case 'hidden-country': {this.props.setCountryFilter(filter); event.target.parentNode.classList.toggle('d-none'); break;}
			case 'hidden-category': {this.props.setCategoryFilter(filter); event.target.parentNode.classList.toggle('d-none'); break;}
			default: break;
		}
	}
//country select filter
	countrySelect=()=>{
		return(
			<div id="hidden-country" className="d-none p-absolute set-width border on-top">
			<p key="nofilter" id="nofilter" className="link m-0 p-2 border" onClick={(event)=>this.setFilter(event,"")}>No Filter</p>
			  	{
					this.props.filters.countryFilters.map((country,i)=>{
						return<p key={country+i} id={country} className="link m-0 p-2 border" onClick={(event)=>this.setFilter(event,country)}>{country}</p>
					})					
			  	}
		  	</div>
			)
	}

//category select flter
	categorySelect=()=>{
		return(
			<div id="hidden-category" className="d-none p-absolute border set-width on-top">
				<p key="nocateogory" id="noCategory" className="link m-0 p-2 border" onClick={(event)=>this.setFilter(event,'')}>No filter</p>
			  	{
					this.props.filters.categoryFilters.map((category,i)=>{
						return<p key={category+i} id={category} className="link m-0 p-2 border" onClick={(event)=>this.setFilter(event,category)}>{category}</p>
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

	nameSearch=(event)=>{
		this.props.setSearchfield(event.target.value)
	}
dropdown=(event)=>{
					if(document.getElementById('display-pages')){		
						const hiddenCategory=document.getElementById('hidden-category');
						const hiddenCountry=document.getElementById('hidden-country');
						if(
							event.target.id!==hiddenCategory.id &&
							event.target.id!==hiddenCountry.id &&
							event.target.id!=='filter-country' && 
							event.target.id!=='filter-category' && event.target.tagName!=='I')
							{
								hiddenCountry.classList.add('d-none');
								hiddenCategory.classList.add('d-none')
						}
					}
				}
	removeFilters=()=>{
		this.props.setCategoryFilter("");
		this.props.setCountryFilter("");
		this.props.setSearchfield("");
		const search=document.getElementById('searchField');
		search.value=""
	}
	render(){
		const {database}=this.props;
		return(
			<div id="display-pages">
				<div id="filterButtons" className="justify-content-center">
					<input type="search" id="searchField" placeholder="Filter by Name" className="rounded w-auto text-center" onChange={this.nameSearch}/>
					<div className="p-0 m-0 set-height btn-width">
				  		<button id="filter-country"  className=" text-center btn-width" title="Filter By Country" onClick={(event)=>this.expandSelection(event.target,'filter-country')}>Country<i className="fas fa-filter"></i></button>
				  		{this.countrySelect()}
			  		</div>
			  		<div className="p-0 m-0 set-height btn-width">
				  		<button id="filter-category"  className=" text-center btn-width" title="Filter By Category"  onClick={(event)=>this.expandSelection(event.target,'filter-country')}>Category<i className="fas fa-filter"></i></button>
				  		{this.categorySelect()}
			  		</div>
			  	<input type="button" value="Remove All" onClick={this.removeFilters}/>
			  	</div>
				  	{
					window.addEventListener('click', this.dropdown)
					}
				<hr className="mt-2 mb-5"/>
				{
					this.props.userFavourites===undefined?
						(
						<ErrorBoundary>
						<PagesList
							database={database}
							countryFilter={this.props.countryFilter}
							categoryFilter={this.props.categoryFilter}
							previousFilters={this.props.filters}
							userFavourites={[]}
						/>
						</ErrorBoundary>):(
						<ErrorBoundary><PagesList
							database={database}
							countryFilter={this.props.countryFilter}
							categoryFilter={this.props.categoryFilter}
							previousFilters={this.props.filters}
							userFavourites={this.props.userFavourites.fav}
						/>
						</ErrorBoundary>)
				}
			</div>
			)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayPages);