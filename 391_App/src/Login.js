import React from 'react';
//import axios from 'axios';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react';
import './Login.css';
import ReactDOM from 'react-dom';
import Helper from './helper';
import { RouteComponentProps, useHistory } from "react-router-dom";


function Login() {
    const moImg = 'https://www.macewan.ca/data/people/people/e/elhajjm/fullpicture.jpg'

    let email = '';
	let password = '';
	let errorMessage = '';

    /**
	 * Captures user input from an input element and set the value into
	 * username variable.
	 * @param e An input event that is typed in by the user
	 */
	function onEmailChange(e) {
		email = e.detail.value;
		console.log(email);
	}

	/**
	 * Captures user input from an input element and set the value into
	 * password variable.
	 * @param e An input event that is typed in by the user
	 */
	function onPasswordChange(e) {
		password = e.detail.value;
		console.log(password);
	}

	function onLoginButton() {
		console.log(email);
		console.log(password);
	  
		//let { email, password } = this;
	  
		if (email.length < 3) {
		  return sendError('The email you have entered is invalid.');
		}
	  
		if (password.length < 3) {
		  return sendError('The password you have entered is invalid.');
		}
		console.log('here1');
		Helper.post(Helper.getAPIUrl('login'), { email, password }).then(response => {
			console.log('here2');
			if (!response || !response.data || !response.data.success) {
			return sendError('The credentials you have entered are invalid.');
		  }
		  console.log(response);
		  console.log('here3');
		  //Helper.setUserId(response.data.userId);
		  //props.history.push('/dashboard');
		  console.log('here4');
		  window.location.replace('/dashboard');
		});
	}
	
	/**
	 * Send error of parameter 'message' to the 'error-message' in
	 * ReactDOM.render().
	 * @param message a string error message to be displayed
	 */
	function sendError(message = '') {
		ReactDOM.render((<p id="error-message">{message}</p>), document.getElementById('error-message'));
	}
	  

    return (
		<IonPage>
			<IonContent>
				<div id='fullpage'>
					<div id='branding-wrapper' className="float">
						<div id='branding' className='img'></div>
					</div>
					<div id='content-wrapper' className='float'>
						<div id='login-content'>
							<div className='header'>
								<img src={moImg}></img>
							</div>
							<div className='login-box'>
								<div id='upper-box-wrapper'>
									<div id='upper-box'>
										<h1>Login</h1>
										<h6>Log in with your MO's Portal Account</h6>
									</div>
								</div>
								<div id='lower-box'>
									<br/>
										{ <span id="error-message">{errorMessage}</span> }
									<br/>
									<IonItem className='user-info-box input'>
										<IonInput className='input-label' onIonChange={onEmailChange.bind(this)} required type="email" placeholder="Username or Email"></IonInput>
									</IonItem>
									<IonItem className='user-info-box input'>
										<IonInput className='input-label' onIonChange={onPasswordChange.bind(this)} required type="password" placeholder="Password"></IonInput>
									</IonItem>
									<IonLabel className='forgot-password'><a href='/login'>Forgot Username or Password?</a></IonLabel>
									<div className='button-divider'></div>
									<IonButton className='login-button' onClick={() =>onLoginButton()}>
										Log In
									</IonButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
}

export default Login;