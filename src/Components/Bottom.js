import React from 'react';
import "./Bottom.css";
const Bottom=({type})=>{
	return(
		<div className="bottom w-100 pt-5">
			<a href="http://github.com/sciortinomrc" className="no-deco" target="_blank">
				<img alt="github" src={require("./Pics/GitHub-Mark-64px.png")} height="40px" width="auto" className="semi-transparent m-2"/>
			</a>
			<a href="https://www.linkedin.com/in/marco-sciortino-429938155/" className="no-deco" target="_blank">
				<img alt="github" src={require("./Pics/In-Black-66px-R.png")} height="40px" width="auto" className="semi-transparent m-2"/>
			</a>
			<a href="https://www.facebook.com/marco.sciortino.37" className="no-deco" target="_blank">
				<img alt="github" src={require("./Pics/facebook-logo.png")} height="40px" width="auto" className="semi-transparent m-2"/>
			</a>
		</div>
		)
}

export default Bottom;