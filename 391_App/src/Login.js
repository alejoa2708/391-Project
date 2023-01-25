import React from 'react';
//import axios from 'axios';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react';
import './Login.css';
import ReactDOM from 'react-dom';
import { RouteComponentProps, useHistory } from "react-router-dom";

function Login() {
    const lightVuLogo = 'https://www.macewan.ca/data/people/people/e/elhajjm/fullpicture.jpg'

    let username = '';
	let password = '';
	let errorMessage = '';
	const history = useHistory();

    /**
	 * Captures user input from an input element and set the value into
	 * username variable.
	 * @param e An input event that is typed in by the user
	 */
	 function onEmailChange(e) {
		username = e.detail.value;
		//console.log(username);
	}

	/**
	 * Captures user input from an input element and set the value into
	 * password variable.
	 * @param e An input event that is typed in by the user
	 */
	 function onPasswordChange(e) {
		password = e.detail.value;
		//console.log(password);
	}

    function onLoginButton () {
        console.log("Sike...")
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
								<img src={lightVuLogo} alt="LightVU"></img>
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