import React from 'react';
import {connect} from 'react-redux';
import {setLoginState, changePage} from '../../State/actions';
import './Login.css';
const mapStateToProps=state=>{
	return{
		loggedUser: state.onLogin.loggedUser,
		loginMessage: state.onLogin.loginMessage,
		isPending: state.onLogin.isPending
	}
}
const mapDispatchToProps=dispatch=>{
	return	{
		loginAttempt: (user,password)=>dispatch(setLoginState(user,password)),
		onLoginAccepted: (page)=>dispatch(changePage(page))
	}
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

	hashPassword=()=>{

	}

	tryToLogin=()=>{
		const {username, password}=this.state
		if(username.length && password.length)
			this.props.loginAttempt(this.state.username, this.state.password);
		this.setState({username:'', password:''})
		setTimeout(()=>{if(this.props.loggedUser){
			this.props.onLoginAccepted('home');
		}},1000)
		this.formReset()

	}

	formReset=()=>{
		this.setState({username: '', password: ''})
		const form=document.getElementById('login-form');
		form.reset()
	}
	render(){
		return(
				<div className="login-form-1 border shadow1 box">
					<form id="login-form" className="text-left">
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
							<p className="m-auto p-0 text-center">{this.props.loginMessage}</p>
							<button type="button" className="login-button p-0 text-top" onClick={this.tryToLogin}><span className="p-absolute span">></span></button>
						</div>
						<div className="etc-login-form">
							<p>New user? <span className="link">Register</span></p>
						</div>
					</form>
				</div>

		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);