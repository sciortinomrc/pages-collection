import React, {Component} from 'react';

class ErrorBoundary extends Component{
	constructor(props){
		super(props)
		this.state={
			hasError: false
		}
	}
  componentDidCatch(error, info) {
  	this.setState({hasError:true})
	console.log(error, info);
  }
	render(){
		if(this.state.hasError){
			return(
			<div id="error">
				<h1>Oooops... Something went wrong</h1><hr />
				<p>If you are using IE, IE Mobile, Opera or Blackberry Browser this website might not work.</p><br />
				<p>Try using a different browser. Thanks </p>
			</div>
				)
		}
		else{
			return	this.props.children
		}
	}
}


export default ErrorBoundary;