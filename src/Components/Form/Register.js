import React from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../../State/actions';
import './Login.css';

const mapStateToProps=state=>{
	return {
		message: state.signUp.message
	}
}
const mapDispatchToProps=dispatch=>{
	return{
		registerUser: (user,password)=>dispatch(registerUser(user,password))
	}
}

class Register extends React.Component{
	constructor(){
		super()
		this.state={
			username: '',
			email: '',
			password: ''
		}
	}

	onUserChange=(event)=>{
		this.setState({username: event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({password: event.target.value})
	}
	sendSignupRequest=()=>{
		this.props.registerUser(this.state.username, this.state.password)
	}

	render(){
		return(
				<div className="login-form-1 border shadow1 box">
					<div id="login-form" className="text-left">
						<div className="login-form-main-message"></div>
						<div className="main-login-form">
							<div className="login-group">
								<div className="form-group">
									<input type="text" className="form-control" id="lg_username" name="lg_username" placeholder="username" onChange={this.onUserChange}/>
								</div>
								<div className="form-group">
									<input type="email" className="form-control" id="lg_username" name="lg_username" placeholder="email@email.com"/>
								</div>
								<div className="form-group">
									<input type="password" className="form-control" id="lg_password" name="lg_password" placeholder="password" onChange={this.onPasswordChange}/>
								</div>
								<div className="form-group">
									<input type="password" className="form-control" id="lg_username" name="lg_username" placeholder="confirm password"/>
								</div>
							</div>
							<button type="submit" className="login-button p-0 text-top" onClick={this.sendSignupRequest}><span className="p-absolute span">></span></button>
						</div>
					</div>
				</div>

		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);