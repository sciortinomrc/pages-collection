import React from 'react'; 
import PagesList from './PagesList';
import {connect} from 'react-redux';
import { setSearchfield, setCountryFilter, setCategoryFilter, setFilters } from '../../State/actions';
import './../Home/Scroller.css';
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
			<div id="hidden-country" >
			<p key="nofilter" id="nofilter" onClick={(event)=>this.setFilter(event,"")}>No Filter</p>
			  	{
					this.props.filters.countryFilters.map((country,i)=>{
						return<p key={country+i} id={country} onClick={(event)=>this.setFilter(event,country)}>{country}</p>
					})					
			  	}
		  	</div>
			)
	}

//category select flter
	categorySelect=()=>{
		return(
			<div id="hidden-category" >
				<p key="nocateogory" id="noCategory"  onClick={(event)=>this.setFilter(event,'')}>No filter</p>
			  	{
					this.props.filters.categoryFilters.map((category,i)=>{
						return<p key={category+i} id={category}  onClick={(event)=>this.setFilter(event,category)}>{category}</p>
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
				<div id="filter-buttons" >
					<input type="search" id="searchField" placeholder="Filter by Name" onChange={this.nameSearch}/>
					<React.Fragment>
				  		<button id="filter-country"  title="Filter By Country" onClick={(event)=>this.expandSelection(event.target,'filter-country')}>Country<i className="fas fa-filter"></i></button>
				  		{this.countrySelect()}
			  		</React.Fragment>
			  		<React.Fragment>
				  		<button id="filter-category"  title="Filter By Category"  onClick={(event)=>this.expandSelection(event.target,'filter-country')}>Category<i className="fas fa-filter"></i></button>
				  		{this.categorySelect()}
			  		</React.Fragment>
			  		<input type="button" value="Remove All" onClick={this.removeFilters}/>
			  	</div>
				  	{
					window.addEventListener('click', this.dropdown)
					}
				<hr />
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