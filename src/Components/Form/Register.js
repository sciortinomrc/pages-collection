import React from 'react';
import {connect} from 'react-redux';
import {registerUser,changePage} from '../../State/actions';
import './Login.css';

const mapStateToProps=state=>{
	return {
		message: state.signUp.message
	}
}
const mapDispatchToProps=dispatch=>{
	return{
		onPageChange: (page,category)=>dispatch (changePage(page,category)),
		registerUser: (user,password,email)=>dispatch(registerUser(user,password,email))
	}
}

class Register extends React.Component{
	constructor(){
		super()
		this.state={
			username: '',
			email: '',
			password: '',
			confirm: ''
		}
	}
	reset=()=>{
		this.setState({
			username: '',
			email: '',
			password: '',
			confirm: ''
		})
		const form=document.getElementsByClassName('login-group');
		form[0].reset()
	}
	onUserChange=(event)=>{
		this.setState({username: event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({password: event.target.value})
	}
	onEmailChange=(event)=>{
		this.setState({email: event.target.value})
	}
	onPasswordConfirm=(event)=>{
		this.setState({confirm: event.target.value})
	}
	sendSignupRequest=()=>{
		const {username,password,email,confirm}= this.state
		if(password===confirm && password!==""){
			this.props.registerUser(username, password,email)
		}
		if(this.props.message==="Your account has been created"){
			this.props.onPageChange('login')
		}
		this.reset()
	}

	render(){
		return(
				<div className="login-form-1 border shadow1 box">
					<div id="login-form" className="text-left">
						<div className="login-form-main-message"></div>
						<div className="main-login-form">
							<form className="login-group">
								<div className="form-group">
									<input type="text" required className="form-control" id="lg_username" name="lg_username" placeholder="username" onChange={this.onUserChange}/>
								</div>
								<div className="form-group">
									<input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" className="form-control" id="lg_email" name="lg_email" placeholder="email@email.com" onChange={this.onEmailChange}/>
								</div>
								<div className="form-group">
									<input type="password" required className="form-control" id="lg_password" name="lg_password" placeholder="password" onChange={this.onPasswordChange}/>
								</div>
								<div className="form-group">
									<input type="password" required className="form-control" id="lg_confirm" name="lg_confirm" placeholder="confirm password" onChange={this.onPasswordConfirm}/>
								</div>
								<button type="button" className="login-button p-0 text-top" onClick={this.sendSignupRequest}><span className="p-absolute span">></span></button>
							</form>
							
						</div>
					</div>
				</div>

		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);