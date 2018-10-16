import React, {Component} from 'react';
import './Top.css';
import {connect} from 'react-redux';
import {setLoginState, windowResize, 
  changePage, displayCard} from '../../State/actions.js';

const mapStateToProps=state=>{
	return{
	logged: state.onLogin.logged,
	open: state.onPageChange.open,
    size: state.onWindowResize.size,
    cards: state.fbApiCall.cards,
    card: state.displaySingleCard.card
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		onLoginChange: (loginStatusChange) =>dispatch (setLoginState(loginStatusChange)),
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

//conditional rendering small responsive
	loggedSmall=()=>{
		const {logged,onLoginChange, onPageChange}=this.props;
		if(logged){return (
			<div>
			<p className="dropdown-item" onClick={()=>{onPageChange('add')}}>Add</p>
		    <p className="dropdown-item">Favourites</p>
		    <p className="dropdown-item" onClick={()=>onLoginChange(false)}>Logout</p>
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
		const {logged, onLoginChange, onPageChange}=this.props;
		if(logged){
			return(
				<div className=" p-0 m-0">
					<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('add')}>Add</p>
					<p className=" btn border mb-0 rounded-top">Favourites</p>
					<p className=" btn border mb-0 rounded-top" onClick={()=>onLoginChange(false)}>Logout</p>
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
			<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
		 		    <p className="dropdown-item" onClick={()=>onPageChange('home')}>Home</p>
		 		    <p className="dropdown-item" onClick={()=>onPageChange('categories')}>Categories</p>
		 		    <p className="dropdown-item" onClick={()=>onPageChange('display-all','all')}>All Pages</p>
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
			<div className="d-flex col pt-3 p-0 justify-content-end">	
				<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('home')}>Home</p>
				<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('categories')}>Categories</p>
				<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('display-all','all')}>All Pages</p> 
				{this.loggedXL()}
				<div className="p-0 m-0 set-height" tabindex="0">
			  		<input id="search" type="search"  className=" btn mb-0 rounded-right search text-center" placeholder="Search..." onChange={this.searchPage} tabindex="1"/>
			  		<div id="hidden" className="d-none p-absolute set-width">
			  			{	

			  				this.state.cards.map(card=>{
			  				if(limit>4) return;
			  				limit ++;
							return <p key={card.id} onClick={()=>{onPageChange('card');displaySingleCard(card.id,card.name,card.link,card.picture,card.fan_count);}}>{card.name}</p>
							})	
			  			}
			  		</div>
		  		</div>
			</div>
			)
	}
	//responsive function
	loggedin=()=>{
		let limit=0;
		const {size}=this.props;
		if(size[0]<1000){
			return (
			<div className=" dropdown d-flex col pt-3 p-0 justify-content-end navbar-light" >
				<div onBlur={this.resetState}>
			  		<input id="search" type="search" className=" btn mb-0 rounded-right search text-center" placeholder="Search..." onChange={this.searchPage} />
			  		<div id="hidden" className="d-none p-absolute set-width">
			  			{	

			  				this.state.cards.map(card=>{
			  				if(limit>4) return;
			  				limit ++;
							return <p key={card.id}>{card.name}</p>
							})	
			  			}
			  		</div>
		  		</div>

				  <p className="navbar-toggler bg-light btn dropdown-toggle border mb-0 p-0 rounded-right bg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </p>
				  {this.show()}
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
				<div className="container header pt-5">
					<div className="d-inline-flex w-100">
						<div id="logo" className="shadow">P</div>
						{this.loggedin()}
					</div>
				</div>
			)
		}	
}
//export default Top;
export default connect(mapStateToProps, mapDispatchToProps)(Top);