import React, {Component} from 'react';
import './Top.css';
import {connect} from 'react-redux';
import {setLoginState, windowResize, 
  changePage, displayCard} from '../../State/actions.js';

const mapStateToProps=state=>{
	return{
	user: state.onLogin.loggedUser,
	open: state.onPageChange.open,
    size: state.onWindowResize.size,
    cards: state.fbApiCall.cards,
    card: state.displaySingleCard.card
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		onLoginChange: (user,password)=> dispatch(setLoginState(user,password)),
		onPageChange: (page,category)=>dispatch (changePage(page,category)),
		onWindowResize: (size)=>dispatch(windowResize (size)),
		displaySingleCard: (id,name,link,picture,fan_count)=>dispatch( displayCard(id,name,link,picture,fan_count))
	}
}
class Top extends Component {
	constructor(){
		super()
		this.state=({search: '',cards:[]});
	}
//addEventListener
componentDidMount(){
	document.addEventListener('click',(event)=>{
		if(document.getElementById("dropdown-div")){
			const dropdownDiv=document.getElementById("dropdown-div");
			const element=event.target;
			if(element.id==="logout" || (element!==dropdownDiv && 
				element.id!=="dropdown" && element.parentNode.id!=="dropdown"))
				dropdownDiv.classList.add('d-none')
		}
	})
}

//open dropdown menu
	dropdown=(event)=>{
		const dropdownDiv=document.getElementById('dropdown-div');
		const button=event.target.tagName==='I'?event.target.parentNode:event.target
		if(button.id==='dropdown'){
			if(dropdownDiv.classList.contains('d-none'))	dropdownDiv.classList.add('d-none')
			else dropdownDiv.classList.remove('d-none')
		}
		button.parentNode.children[1].classList.contains('d-none')?
			button.parentNode.children[1].classList.remove('d-none'):
			button.parentNode.children[1].classList.add('d-none')
	}
//searchPage
	searchPage=(event)=>{
		const hidden= document.getElementById('hidden');
		window.addEventListener('click',(eventClick)=>{
			if(eventClick.target.id!=='searchSuggestion' || event.target.parentNode.id!== 'searchSuggestion'){
				this.resetState()
			}
		})
		this.setState({search: event.target.value},()=>{
				!this.state.search.length?
					hidden.classList.add('d-none') :
					hidden.classList.remove('d-none');
				const filterCards=this.props.cards.filter(card=>{
					return card.name.toLowerCase().includes(this.state.search.toLowerCase());
				})
				this.setState({cards: filterCards});
			})
		
	}
//resetState onFocusOut
	 resetState=()=>{
	 	const search=document.getElementById('search');
	 	search.value="";
	 	this.setState({search: '',cards:[]})
	 }

//logout
 	logout=()=>{
 		this.props.onLoginChange();
 		this.props.onPageChange('home')
 	}

//conditional rendering small responsive
	loggedSmall=()=>{
		const {user, onPageChange}=this.props;
		if(user){return (
			<div>
			<p className="dropdown-item" onClick={()=>onPageChange('add')}>Add</p>
		    <p className="dropdown-item" onClick={()=>onPageChange('favourites')}>Favourites</p>
		    <p id="logout" className="dropdown-item" onClick={this.logout}>Logout</p>
		    </div>
		    )
		}else{
		 return (
			<div >
			<p className="dropdown-item" onClick={()=>onPageChange('login')}>Login</p>
			<p className="dropdown-item" onClick={()=>onPageChange('register')}>Register</p>
			</div>
			)
		}
	}
	//conditional rendering large responsive
	loggedXL=()=>{
		const {user, onPageChange}=this.props;
		if(user){
			return(
				<div className=" p-0 m-0">
					<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('add')}>Add</p>
					<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('favourites')}>Favourites</p>
					<p className=" btn border mb-0 rounded-top" onClick={this.logout}>Logout</p>
				</div>
				)
		}else{
			return(
				<div className=" p-0 m-0">
					<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('login')}>Login</p>
					<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('register')}>Register</p>
				</div>
				)
		}
	}
	//component mount small responsive
	show=()=>{
		const {onPageChange}=this.props;
		return(
			<div id="dropdown-div" className="position-absolute d-none">
		 		    <p className="dropdown-item" onClick={()=>onPageChange('home')}>Home</p>
		 		    <p className="dropdown-item" onClick={()=>onPageChange('display','all')}>All Pages</p>
		 		    <div className="dropdown-divider"></div>
		 		    { this.loggedSmall()}
			</div>		
			)
	}
	//component mount large responsive
	showXL=()=>{
		const {onPageChange, displaySingleCard}=this.props;
		let limit=0;
		return(
			<div className="d-flex col pt-3 p-0 justify-content-end dd">	
				<p className=" btn border mb-0 rounded-top " onClick={()=>onPageChange('home')}>Home</p>
				<p className=" btn border mb-0 rounded-top " onClick={()=>onPageChange('display','all')}>Pages</p> 
				{this.loggedXL()}
				<div className="p-0 m-0 set-height ">
			  		<input id="search" type="search"  className=" btn mb-0 rounded-right search text-center" placeholder="Search..." onChange={this.searchPage}/>
			  		<div id="hidden" className="d-none p-absolute set-width">
			  			{	
			  				this.state.cards.map(card=>{
			  				if(limit>4) return undefined;
			  				limit ++;
							return <p key={card.id} onClick={()=>{onPageChange('card');displaySingleCard(card.id,card.name,card.link,card.picture,card.fan_count);}} className="plain-link">{card.name}</p>
							})	
			  			}
			  		</div>
		  		</div>
			</div>
			)
	}
	//responsive function
	displayResponsiveTop=()=>{
		let limit=0;
		const {size, onPageChange, displaySingleCard}=this.props;
		if(size[0]<1000){
			return (
			<div className=" dropdown d-flex col pt-3 p-0 justify-content-end navbar-light" >
				<div onBlur={this.resetState}>
			  		<input id="search" type="search" className=" btn mb-0 rounded-right search text-center" placeholder="Search..." onChange={this.searchPage} />
			  		<div id="hidden" className="d-none p-absolute set-width">
			  			{	
			  				this.state.cards.map(card=>{
			  				if(limit>4) return undefined;
			  				limit ++;
							return <p key={card.id} onClick={()=>{onPageChange('card');displaySingleCard(card.id,card.name,card.link,card.picture,card.fan_count);}} className="plain-link">{card.name}</p>
							})	
			  			}
			  		</div>
		  		</div>
		  		<div className="h-100">
				  <button id="dropdown" className="bg-light btn border mb-0 p-0 rounded-right bg h-100" onClick={this.dropdown}><i className="fas fa-bars pl-3 pr-3"></i> </button>
				  {this.show()}
				 </div>
			</div>
			)
		}else{
			return(
				this.showXL()
			)
		}
	}
	//definition and rendering
	render(){
			return(
				<div className="container header pt-5 box-shadow">
					<div className="d-inline-flex w-100">
						<div id="logo" className="shadow">P</div>
						{this.displayResponsiveTop()}
					</div>
				</div>
			)
		}	
}
//export default Top;
export default connect(mapStateToProps, mapDispatchToProps)(Top);