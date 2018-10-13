import React from 'react';
import "./Scroller.css";
const Scroller=(props)=>{
	return(
		<div className="full-screen overflowy p-4 ">
			{props.children}
		</div>)
}
export default Scroller;