import React,{createRef} from 'react'; 
import PagesList from './PagesList';
import './../Home/Scroller.css';
import ErrorBoundary from '../ErrorBoundary';


class DisplayPages extends React.Component{
	constructor(){
		super();
		this.state={
			country:"",
			category:"",
			name:""
		}
		this.namefieldTimeout = null;
		this.nameField = createRef();
	}

	getFilters=(pages,type)=>{
		return pages.reduce((acc,page)=>{
			if(!acc.includes(page[type]))
				acc.push(page[type]);
			return acc;
		},[])
	}
	componentWillMount(){
		this.categories = this.getFilters(this.props.pages,"category");
		this.countries = this.getFilters(this.props.pages,"country");
	}

//set filter
	setFilter=(type,filter)=>{
		
		this.setState({[type]:filter, showCategoryFilters: false, showCountryFilters: false})
	}
//country select filter
	countrySelect=()=>{
		return(
			<div id="hidden-country"  data-scope="country-dropdown" style={{display: this.state.showCountryFilters?"flex":""}}>
			<p key="nofilter" id="nofilter" onClick={()=>this.setFilter("country","")} data-scope="country-dropdown">No Filter</p>
			  	{
					this.countries.map((country,i)=>{
						return<p key={country+i} id={country.replace(" ","_")} onClick={()=>this.setFilter("country",country)} data-scope="country-dropdown">{country}</p>
					})					
			  	}
		  	</div>
			)
	}

//category select flter
	categorySelect=()=>{
		return(
			<div id="hidden-category"  data-scope="category-dropdown" style={{display: this.state.showCategoryFilters?"flex":""}}>
				<p key="nocateogory" id="noCategory"  onClick={()=>this.setFilter("category",'')} data-scope="category-dropdown">No filter</p>
			  	{
					this.categories.map((category,i)=>{
						return<p key={category+i} id={category.replace(" ","_")}  onClick={()=>this.setFilter("category",category)} data-scope="category-dropdown">{category}</p>
					})					
			  	}
		  	</div>
			)
	}
//searchPage
	expandSelection=(target)=>{
		const trigger=target.dataset.trigger;
		if(trigger==='dropdown-country'){
			this.setState({showCategoryFilters:false, showCountryFilters: true})
		}
		if(trigger==='dropdown-category'){
			this.setState({showCategoryFilters:true, showCountryFilters: false})


		}
	}

	onNameSearch=(event)=>{
		const value = event.target.value
		clearTimeout(this.namefieldTimeout)
		this.namefieldTimeout = setTimeout(()=>{
			this.setState({name:value})
		},1000);
	}

	dropdown=(event)=>{
		if(event.target.dataset.scope!=="dropdown-country" && event.target.dataset.trigger!=="dropdown-country"){
			this.setState({showCountryFilters: false})
		}
		if(event.target.dataset.scope!=="dropdown-category" && event.target.dataset.trigger!=="dropdown-category"){
			this.setState({showCategoryFilters:false})
		}
	}
	removeFilters=()=>{
		this.nameField.current.value='';
		this.setState({
			category:'',
			country:'',
			name:''
		})
	}
	componentDidMount(){
		if(window.location.search.length){
			let category;
			const search = window.location.search.replace("?","").split("&");
			for(const current of search){
				if(current.includes("category")){
					category=current.split("=")[1].toLowerCase();
					break;
				}
			}

			this.setState({category})
		}
	}
	displayFilters=()=>{
		if(window.location.search.includes("category")) return null;
		window.addEventListener('click', this.dropdown);
		return(
			<div id="filter-buttons" >
				<input type="search" ref={this.nameField} id="searchField" placeholder="Filter by Name" onChange={this.onNameSearch}/>
				<React.Fragment>
					<button id="filter-country"  title="Filter By Country" onClick={(event)=>this.expandSelection(event.target,'filter-country')} data-trigger="dropdown-country">Country<i className="fas fa-filter" data-trigger="dropdown-country"></i></button>
					{this.countrySelect()}
				</React.Fragment>
				<React.Fragment>
					<button id="filter-category"  title="Filter By Category"  onClick={(event)=>this.expandSelection(event.target,'filter-category')} data-trigger="dropdown-category">Category<i className="fas fa-filter" data-trigger="dropdown-category"></i></button>
					{this.categorySelect()}
				</React.Fragment>
				<input type="button" value="Remove All" onClick={this.removeFilters}/>
			</div>
		)
	}
	render(){
		const {pages}=this.props;
		return(
			<div id="display-pages">
				{
					this.displayFilters()
				}
				<hr />
				<ErrorBoundary>
					<PagesList
						pages={pages}
						countryFilter={this.state.country}
						categoryFilter={this.state.category}
						nameFilter={this.state.name}
						userFavourites={this.props.userFavourites?this.props.userFavourites.fav:[]}
					/>
				</ErrorBoundary>
				
			</div>
		)
	}
}
export default DisplayPages;