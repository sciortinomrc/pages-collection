import React, {Component} from 'react';
import './Top.css';
import {connect} from 'react-redux';
import {setLoginState, windowResize, 
  changePage, displayCard} from '../../State/actions.js';
 import fbwhite from '../../f-Logo_Assets/F_Logo_Online_09_2018/White/SVG/flogo-HexRBG-Wht-58.svg'
 import fbblack from '../../f-Logo_Assets/F_Logo_Online_09_2018/Black/SVG/flogo-RGB-HEX-Blk-58.svg'

const mapStateToProps=state=>{
	return{
		user: state.onLogin.loggedUser,
		open: state.onPageChange.open,
		size: state.onWindowResize.size,
		database: state.addNewPage.database,
		card: state.displaySingleCard.card
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		onLoginChange: (userId)=> dispatch(setLoginState(userId)),
		onPageChange: (page,category)=>dispatch (changePage(page,category)),
		onWindowResize: (size)=>dispatch(windowResize (size)),
		displaySingleCard: (id,name,url,picture,favourite, category, country)=>dispatch( displayCard(id,name,url,picture,favourite, category, country))
	}
}
class Top extends Component {
	constructor(props){
		super(props)
		this.state=({search: '',cards:[]});
	}
//addEventListener
componentDidMount(){
	document.addEventListener('click',(event)=>{
		if(document.getElementById("dropdown-div")){
			const dropdownDiv=document.getElementById("dropdown-div");
			const element=event.target;
			if(element && dropdownDiv.style.display.length && element!==dropdownDiv && element.parentNode.id!=="dropdown"
				&& element.id!=="dropdown" )
				dropdownDiv.style.display="";
		}
	})
	document.addEventListener('click',(eventClick)=>{
			if(eventClick.target.id!=='hidden' || eventClick.target.parentNode.id!== 'hidden'){
				this.resetState()
			}
		})
}

//open dropdown menu
	dropdown=(event)=>{
		const dropdownDiv=document.getElementById('dropdown-div');
		const button=event.target.tagName==='I'?event.target.parentNode:event.target;
		if(button.id==='dropdown'){
			if(dropdownDiv.style.display==="")dropdownDiv.style.display='flex'
			else dropdownDiv.style.display=''
		}
	}
//searchPage
	searchPage=(event)=>{
		const hidden= document.getElementById('hidden');
			this.setState({search: event.target.value},()=>{
				let filterCards=[];
				if(this.state.search.length){
					hidden.style.display="flex"
					filterCards=this.props.database.filter(card=>{
						return card.name.toLowerCase().includes(this.state.search.toLowerCase());
					})
				}
				else	hidden.style.display="";
				this.setState({cards: filterCards});
			})
	}
//resetState onFocusOut
	 resetState=()=>{
	 	const s=document.getElementById('search');
	 	if(s) s.value="";
	 	this.setState({search: '',cards:[]})
	 }

//logout
 	logout=()=>{
 		this.props.reset();
 		this.props.onLoginChange();
 		this.props.onPageChange('home')
 		window.FB.logout();
 		this.setState({user: null})
 	}

//conditional rendering small responsive
	loggedSmall=()=>{
		const {user, onPageChange}=this.props;
		if(user){
			return (
				<div id="dropdown-logged">
					<p className="dropdown-item" onClick={()=>onPageChange('add')}>Add</p>
		   			<p className="dropdown-item" onClick={()=>onPageChange('favourites')}>Favourites</p>
		   			<p className="dropdown-item" onClick={()=>onPageChange('user')}>Profile</p>
					{(user.id==="1723130954465225")?<p className="dropdown-item" onClick={()=>onPageChange('overview')}>Overview</p>:""}
		   			<p className="dropdown-item" onClick={this.logout}>Logout</p>
		    		</div>
		   	 )
		}
		else{
			return <p className="dropdown-item" onClick={this.props.fblogin}><img id="fb" src={fbblack} alt="Facebook Logo"/>Login with Facebook</p>
		}
	}
	//conditional rendering large responsive
	loggedXL=()=>{
		const {user, onPageChange}=this.props;
		if(user){
		// if(true){
			return(
				<React.Fragment>
					<p onClick={()=>onPageChange('add')}>Add</p>
					<p onClick={()=>onPageChange('favourites')}>Favourites</p>
					<p onClick={()=>onPageChange('user')}>Profile</p>
					{(user.id==="1723130954465225")?<p onClick={()=>onPageChange('overview')}>Overview</p>:""}
					<p onClick={this.logout}>Logout</p>
				</React.Fragment>
			)
		}
		else{
			return <p onClick={this.props.fblogin}><img id="fb" src={fbwhite} alt="Facebook Logo"/>Login with Facebook</p>
		}
			
	}
	//component mount small responsive
	show=()=>{
		const {onPageChange}=this.props;
		return(
			<div id="dropdown-div" >
		 		    <p className="dropdown-item" onClick={()=>onPageChange('home')}>Home</p>
		 		    <p className="dropdown-item" onClick={()=>onPageChange('display','all')}>All Pages</p>
		 		    <p className="dropdown-item" onClick={()=>onPageChange('about')}>About</p>
		 		    <div className="dropdown-divider"></div>
		 		    { this.loggedSmall()}
			</div>		
			)
	}
	//component mount large responsive
	login=()=>{
		this.props.fblogin()
	}
	showXL=()=>{
		const {onPageChange}=this.props;
		return(
			<div id="large-nav">	
				<p onClick={()=>onPageChange('home')}>Home</p>
				<p onClick={()=>onPageChange('display','all')}>Pages</p> 
				<p onClick={()=>onPageChange('about')}>About</p> 
				{this.loggedXL()}
			</div>
			)
	}
	//responsive function
	displayResponsiveTop=()=>{
		let limit=0;
		const {onPageChange, displaySingleCard}=this.props;
		return(
		<div id="main-navigation" >
			{this.props.userName?<p id="show-name">Welcome back, {this.props.userName}</p>:""}
			<div id="small-navigation" >
		  		<div>
					{this.showXL()}
					<input id="search" type="search" className="" placeholder="Search..." onChange={this.searchPage} />
			  		<div id="hidden" className="">
			  			{	
			  				this.state.cards.map(card=>{
			  				if(limit>4) return undefined;
			  				limit ++;
							return <p key={card.id} onClick={()=>{onPageChange('card');displaySingleCard(card.id,card.name,card.url,card.picture,card.country, card.category, card.favourite);}} className="plain-link">{card.name}</p>
							})	
			  			}
			  		</div>
		  		</div>
		  		<div>
				  <button id="dropdown" className=" dropdown navbar-light bg-light" onClick={this.dropdown}><i className="fas fa-bars"></i> </button>
				  {this.show()}
				 </div>
	  		</div>
		</div>
		)
	}
	//definition and rendering
	render(){
		return(
			<div id="container">
				<div id="logo" onClick={()=>this.props.onPageChange("home")}><p>P</p></div>
				{this.displayResponsiveTop()}
			</div>
		)
	}	
}
//export default Top;
export default connect(mapStateToProps, mapDispatchToProps)(Top);