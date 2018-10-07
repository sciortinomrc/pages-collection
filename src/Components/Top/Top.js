import React from 'react';
import './Style/Top.css';
//conditional rendering small responsive
const loggedSmall=(logged,onPageChange)=>{
	if(logged){return (
		<div>
		<p className="dropdown-item" onClick={()=>{onPageChange('add')}}>Add</p>
	    <p className="dropdown-item">Favourites</p>
	    <p className="dropdown-item">Logout</p>
	    </div>
	    )
	}else{ return (
		<div>
		<p className="dropdown-item">Login</p>
		<p className="dropdown-item">Register</p>
		</div>
		)
	}
}
//conditional rendering large responsive
const loggedXL=(logged,onPageChange)=>{
	if(logged){
		return(
			<div>
				<p className=" btn border mb-0 rounded-top" onClick={()=>onPageChange('add')}>Add</p>
				<p className=" btn border mb-0 rounded-top">Favourites</p>
				<p className=" btn border mb-0 rounded-top">Logout</p>
			</div>
			)
	}else{
		return(
			<div>
				<p className=" btn border mb-0 rounded-top">Login</p>
				<p className=" btn border mb-0 rounded-top">Register</p>
			</div>
			)
	}
}
//component mount small responsive
const show=(logged,onPageChange)=>{
	return(
		<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
	 		    <p className="dropdown-item" onClick={()=>onPageChange('home')}>Home</p>
	 		    <p className="dropdown-item">Categories</p>
	 		    <p className="dropdown-item">All Pages</p>
	 		    <div className="dropdown-divider"></div>
	 		    { loggedSmall(logged,onPageChange)}
		</div>		
		)
}
//component mount large responsive
const showXL=(logged,onPageChange)=>{
	return(
		<div className="d-flex col pt-3 p-0 nav justify-content-end">	
			<p className=" btn border mb-0 rounded-top " onClick={()=>onPageChange('home')}>Home</p>
			<p className=" btn border mb-0 rounded-top ">Categories</p>
			<p className=" btn border mb-0 rounded-top">All Pages</p>
			{loggedXL(logged,onPageChange)}
			<input type="search" className=" border mb-0 rounded-top search text-center" placeholder="search page"/>
		</div>
		)
}
//responsive function
const loggedin=(w,logged,onPageChange)=>{
	if(w<850){
		return (
			<div className=" dropdown w-100 d-flex justify-content-end align-content-right navbar-light  p-0 h align-self-end " >
			  <input type="search" className=" border mb-0  w-50 rounded-left search text-center h" placeholder="search page"/>
			  <p className="navbar-toggler bg-light btn dropdown-toggle border mb-0 p-0 rounded-right bg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </p>
			  {show(logged,onPageChange)}
			</div>
			)
	}else{
		return(
			showXL(logged,onPageChange)
		)
	}
}
//definition and rendering
const Top=({width,logged,onPageChange})=>{
		return(
			<div className="container header pt-5">
				<div className="row">
					<div id="logo" className="shadow">P</div>
					{loggedin(width,logged,onPageChange)}
				</div>
			</div>
		)	
}

export default Top;