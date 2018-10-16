import React from 'react';
import './Login.css';

class Register extends React.Component{
	render(){
		return(
				<div className="login-form-1 border">
					<div id="login-form" className="text-left">
						<div className="login-form-main-message"></div>
						<div className="main-login-form">
							<div className="login-group">
								<div className="form-group">
									<input type="text" className="form-control" id="lg_username" name="lg_username" placeholder="username"/>
								</div>
								<div className="form-group">
									<input type="email" className="form-control" id="lg_username" name="lg_username" placeholder="email@email.com"/>
								</div>
								<div className="form-group">
									<input type="password" className="form-control" id="lg_password" name="lg_password" placeholder="password"/>
								</div>
								<div className="form-group">
									<input type="password" className="form-control" id="lg_username" name="lg_username" placeholder="confirm password"/>
								</div>
							</div>
							<button type="submit" className="login-button p-0 text-top"><span className="p-absolute span">></span></button>
						</div>
					</div>
				</div>

		)
	}
}

export default Register;