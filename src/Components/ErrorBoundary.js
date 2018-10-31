import React, {Component} from 'react';

class ErrorBoundary extends Component{
	constructor(props){
		super(props)
		this.state={
			hasError: false
		}
	}

	componentDidCatch(){
		this.setState({hasError: true})
	}
	render(){
		if(this.state.hasError){
			return(
			<div className="d-flex m-auto w-75 text-center">
				<h1>Oooops... Something went wrong</h1><hr />
				<p>If you are using IE, IE Mobile, Opera or Blackberry Browser some functionalities might not work.</p><br />
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