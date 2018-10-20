import React from 'react';
import {connect} from 'react-redux';
import {setLoginState} from '../../State/actions';
import './Login.css';
const mapStateToProps=state=>{
	return{
		loginMessage: state.onLogin.loginMessage,
		isPending: state.onLogin.isPending
	}
}
const mapDispatchToProps=dispatch=>{
	return	{loginAttempt: (user,password)=>dispatch(setLoginState(user,password))}
}
class Login extends React.Component{
	constructor(){
		super()
		this.state={
			username: '',
			password: ''
		}
	}

	onUserChange=(event)=>{
		this.setState({username:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({password: event.target.value})
	}
	tryToLogin=()=>{
		console.log(	)
		const {username, password}=this.state
		if(username.length && password.length)
			this.props.loginAttempt(this.state.username, this.state.password);
		this.setState({username:'', password:''})
		console.log('message',this.props.loginMessage)
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
									<input type="password" className="form-control" id="lg_password" name="lg_password" placeholder="password" onChange={this.onPasswordChange}/>
								</div>
							</div>
							<button type="submit" className="login-button p-0 text-top" onClick={this.tryToLogin}><span className="p-absolute span">></span></button>
						</div>
						<div className="etc-login-form">
							<p>New user? <span className="link">Register</span></p>
						</div>
					</div>
				</div>

		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);