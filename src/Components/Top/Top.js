import React, {Component} from 'react';
import './Top.css';
import {connect} from 'react-redux';
import {setLoginState, windowResize, 
  displayCard} from '../../State/actions.js';
 import fbwhite from '../../f-Logo_Assets/F_Logo_Online_09_2018/White/SVG/flogo-HexRBG-Wht-58.svg'
 import fbblack from '../../f-Logo_Assets/F_Logo_Online_09_2018/Black/SVG/flogo-RGB-HEX-Blk-58.svg'

const mapStateToProps=state=>{
	return{
		user: state.onLogin.loggedUser,
		size: state.onWindowResize.size,
		database: state.addNewPage.database,
		card: state.displaySingleCard.card
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		onLoginChange: (userId)=> dispatch(setLoginState(userId)),
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
		const {user}=this.props;
		if(user){
			return (
				<div id="dropdown-logged">
					<Link to="/add">
						<p className="dropdown-item">Add</p>
					</Link>
					<Link to="/favourites">
			   			<p className="dropdown-item">Favourites</p>
					</Link>
					<Link to="/user">
		   				<p className="dropdown-item">Profile</p>
					</Link>
					{(user.admin)?<Link to="/overview"><p className="dropdown-item">Overview</p></Link>:""}
		   			<Link to="/">
					   <p className="dropdown-item" onClick={this.logout}>Logout</p>
					</Link>
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
					<Link to="/add">
						<p>Add</p>
					</Link>
					<Link to="/favourites">
			   			<p>Favourites</p>
					</Link>
					<Link to="/user">
		   				<p>Profile</p>
					</Link>
					{(user.admin)?<Link to="/overview"><p>Overview</p></Link>:""}
		   			<Link to="/">
					   <p onClick={this.logout}>Logout</p>
					</Link>
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
				<Link to="/">
		 		    <p className="dropdown-item" >Home</p>
				</Link>
				<Link to="/display">
		 		    <p className="dropdown-item" >All Pages</p>
				</Link>
				<Link to="/about">
		 		    <p className="dropdown-item" >About</p>
				</Link>
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
				<Link to="/">
		 		    <p >Home</p>
				</Link>
				<Link to="/display">
		 		    <p >All Pages</p>
				</Link>
				<Link to="/about">
		 		    <p >About</p>
				</Link>
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
				<Link to="/">
					<div id="logo"><p>P</p></div>
				</Link>
				{this.displayResponsiveTop()}
			</div>
		)
	}	
}
//export default Top;
export default connect(mapStateToProps, mapDispatchToProps)(Top);