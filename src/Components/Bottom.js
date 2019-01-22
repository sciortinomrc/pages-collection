import React from 'react';
import "./Bottom.css";
const Bottom=({type})=>{
	return(
		<footer>
			<a href="http://github.com/sciortinomrc" target="_blank" rel="noopener noreferrer">
				<i className="fab fa-github"></i>
			</a>
			<a href="https://www.linkedin.com/in/marco-sciortino-429938155/" target="_blank" rel="noopener noreferrer">
				<i className="fab fa-linkedin"></i>
			</a>
			<a href="https://www.facebook.com/marco.sciortino.37" target="_blank" rel="noopener noreferrer">
				<i className="fab fa-facebook-square"></i>
			</a>
		</footer>
		)
}

export default Bottom;