import React from 'react';
import "./Bottom.css";
const Bottom=({type})=>{
	return(
		<div className="bottom w-100 pt-5">
			<a href="http://github.com/sciortinomrc" className="no-deco" target="_blank" rel="noopener noreferrer">
				<i className="fab fa-github semi-transparent m-2 shadow h1"></i>
			</a>
			<a href="https://www.linkedin.com/in/marco-sciortino-429938155/" className="no-deco" target="_blank" rel="noopener noreferrer">
				<i className="fab fa-linkedin semi-transparent m-2 shadow h1"></i>
			</a>
			<a href="https://www.facebook.com/marco.sciortino.37" className="no-deco" target="_blank" rel="noopener noreferrer">
				<i className="fab fa-facebook-square semi-transparent m-2 shadow h1"></i>
			</a>
		</div>
		)
}

export default Bottom;