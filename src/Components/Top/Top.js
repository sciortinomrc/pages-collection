import React, {Component} from 'react';
import './Top.css';
import {connect} from 'react-redux';
import {setLoginState, windowResize, 
  changePage} from '../../State/actions.js';

const mapStateToProps=state=>{
	return{
	logged: state.onLogin.logged,
	open: state.onPageChange.open,
    size: state.onWindowResize.size
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		onLoginChange: (loginStatusChange) =>{
	     dispatch (setLoginState(loginStatusChange));
	    },
	    onPageChange: (page,category)=>dispatch(changePage(page,category)),
	   onWindowResize: (size)=>dispatch(windowResize(size))
	}
}
class Top extends Component {
	constructor(){
		super()
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
		}else{ return (
			<div>
			<p className="dropdown-item" onClick={()=>onLoginChange(true)}>Login</p>
			<p className="dropdown-item">Register</p>
			</div>
			)
		}
	}
	//conditional rendering large responsive
	loggedXL=()=>{
		const {logged, onLoginChange, onPageChange}=this.props;
		if(logged){
			return(
				<div>
					<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('add')}>Add</p>
					<p className=" btn border mb-0 rounded-top">Favourites</p>
					<p className=" btn border mb-0 rounded-top" onClick={()=>onLoginChange(false)}>Logout</p>
				</div>
				)
		}else{
			return(
				<div>
					<p className=" btn border mb-0 rounded-top"  onClick={()=>onLoginChange(true)}>Login</p>
					<p className=" btn border mb-0 rounded-top">Register</p>
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
		const {onPageChange}=this.props;
		return(
			<div className="d-flex col pt-3 p-0 nav justify-content-end">	
				<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('home')}>Home</p>
				<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('categories')}>Categories</p>
				<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('display-all','all')}>All Pages</p>
				{this.loggedXL()}
				<input type="search" className=" border mb-0 rounded-top search text-center" placeholder="search page"/>
			</div>
			)
	}
	//responsive function
	loggedin=()=>{
		const {size}=this.props;
		if(size[0]<1000){
			return (
				<div className=" dropdown w-100 d-flex justify-content-end align-content-right navbar-light  p-0 h align-self-end " >
				  <input type="search" className=" border mb-0  w-50 rounded-left search text-center h" placeholder="search page"/>
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