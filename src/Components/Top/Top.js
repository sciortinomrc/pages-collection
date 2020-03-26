import React, {Component,createRef} from 'react';
import {Link} from 'react-router-dom';
import './Top.css';
import fbwhite from '../../f-Logo_Assets/F_Logo_Online_09_2018/White/SVG/flogo-HexRBG-Wht-58.svg'
import fbblack from '../../f-Logo_Assets/F_Logo_Online_09_2018/Black/SVG/flogo-RGB-HEX-Blk-58.svg'

class Top extends Component {
	constructor(props){
		super(props)
		this.state=({search: '',cards:[]});
		this.hidden = createRef();
		this.dropdownDiv = createRef();
		this.search = createRef();
	}
//addEventListener
componentDidMount(){
	document.addEventListener('click',(event)=>{
		if(this.dropdownDiv.current){
			const dropdownDiv=this.dropdownDiv.current;
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
		const dropdownDiv=this.dropdownDiv.current;
		const button=event.target.tagName==='I'?event.target.parentNode:event.target;
		if(button.id==='dropdown'){
			if(dropdownDiv.style.display==="")dropdownDiv.style.display='flex'
			else dropdownDiv.style.display=''
		}
	}
//searchPage
	searchPage=(event)=>{
		const hidden=this.hidden.current;
			this.setState({search: event.target.value},()=>{
				let filterCards=[];
				if(this.state.search.length){
					hidden.style.display="flex"
					filterCards=this.props.pages.filter(card=>{
						return card.name.toLowerCase().includes(this.state.search.toLowerCase());
					})
				}
				else	hidden.style.display="";
				this.setState({cards: filterCards});
			})
	}
//resetState onFocusOut
	 resetState=()=>{
	 	const searchfield=this.search.current;
	 	if(searchfield) searchfield.value="";
	 	this.setState({search: '',cards:[]})
	 }


//conditional rendering small responsive
	logged=(isAdmin, className)=>{
		return (
			<React.Fragment>
				<Link to="/add">
					<p className={className}>Add</p>
				</Link>
				<Link to="/favourites">
					<p className={className}>Favourites</p>
				</Link>
				<Link to="/user">
					<p className={className}>Profile</p>
				</Link>
				{(isAdmin)?<Link to="/overview"><p className={className}>Overview</p></Link>:""}
				<Link to="/">
					<p className={className} onClick={this.props.logout}>Logout</p>
				</Link>
			</React.Fragment>
			)
	}

	loggedWrapper=(full)=>{
		const {user} = this.props;
		const className=full?"":"dropdown-item";
		if(!user.id){
			if(full){
				return <p onClick={this.props.login}><img id="fb" src={fbwhite} alt="Facebook Logo"/>Login with Facebook</p>
			}
			return <p className="dropdown-item" onClick={this.props.login}><img id="fb" src={fbblack} alt="Facebook Logo"/>Login with Facebook</p>

		}

		if(full){
			return(
				<React.Fragment>
					{this.logged(user.admin, className)}
				</React.Fragment>
			)
		}
		return(
			<div id="download-logger">
				{this.logged(user.admin, className)}
			</div>
		)

	}

	//component mount small responsive
	mainNavigation=(full)=>{
		const className=full?"":"dropdown-item";
		const id = full?"large-nav":"dropdown-div"
		return(
			<div id={id} ref={!full?this.dropdownDiv:null}>
				<Link to="/">
		 		    <p className={className} >Home</p>
				</Link>
				<Link to="/display">
		 		    <p className={className} >All Pages</p>
				</Link>
				<Link to="/about">
		 		    <p className={className} >About</p>
				</Link>
		 		{full?"":<div className="dropdown-divider"></div>}
				{ this.loggedWrapper(full)}
			</div>		
			)
	}
	//component mount large responsive

	//responsive function
	displayResponsiveTop=()=>{
		let limit=0;
		return(
		<div id="main-navigation" >
			{this.props.user && this.props.user.name?<p id="show-name">Welcome back, {this.props.user.name}</p>:""}
			<div id="small-navigation" >
		  		<div>
					{this.mainNavigation(true)}
					<input id="search" type="search" autoComplete="off" ref={this.search} className="" placeholder="Search..." onChange={this.searchPage} />
			  		<div id="hidden" ref={this.hidden}>
			  			{	
			  				this.state.cards.map(card=>{
			  				if(limit>4) return undefined;
			  				limit ++;
							return <Link key={card.id}  to="/card"><p onClick={()=>{this.props.setCardToDisplay(card);}} className="plain-link">{card.name}</p></Link>
							})	
			  			}
			  		</div>
		  		</div>
		  		<div>
				  <button id="dropdown" className=" dropdown navbar-light bg-light" onClick={this.dropdown}><i className="fas fa-bars"></i> </button>
				  {this.mainNavigation(false)}
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
export default Top;