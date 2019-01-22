import React from 'react';
import "./Scroller.css";
const Scroller=(props)=>{
	return(
		<div id="scroller">
			{props.children}
		</div>)
}
export default Scroller;