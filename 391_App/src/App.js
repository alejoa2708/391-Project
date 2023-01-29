import logo from './logo.svg';
import '@ionic/react/css/core.css';
import './App.css';
import React from 'react';
import { IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import Login from './/Login';
import Dashboard from './/Dashboard';

setupIonicReact();

const App = () => {
  return (
    
      <IonApp>
				<IonReactRouter>
					<IonRouterOutlet>
						<Route path="/login" component={Login} />
						<Redirect exact from="/" to="/login" />

						<Route exact path="/dashboard" component={Dashboard} />
						
						{/* <Route exact path="/admin" component={Admin} />
			
						<Route exact path="/admin/users" component={Users}/>

						<Route exact path="/admin/createUser" component={CreateUser}/>

						<Route exact path="/admin/userProfile" component={UserProfile}/>
						
						<Route exact path="/layouts" component={Layouts} />

						<Route exact path="/media" component={Media} />

						<Route exact path="/sports" component={Sports} />

						<Route exact path="/setUserItems" component={SetUserItems} /> */}

					</IonRouterOutlet>
					
				</IonReactRouter>
		</IonApp>
    );
}

export default App;
