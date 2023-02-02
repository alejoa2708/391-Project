import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { gridOutline, imageOutline, peopleOutline, basketballOutline, homeOutline, closeOutline, expandOutline, chevronForward, menuOutline, powerOutline } from 'ionicons/icons';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import './Dashboard.css';
import Helper from '../helper';

const Dashboard = () => {
	
	const [presentAlert] = useIonAlert();			// Triggers logout ion alert
	const [layoutItems, setLayout] = useState([]);  // layout item holder
	const [sidebar, setSidebar] = useState(false);	// Sets nav side bar state to false (closed)
	const showSidebar = () => setSidebar(!sidebar); // Triggering sidebar to expand
	const [students, setStudents] = useState({});
	const history = useHistory();

	useEffect(() => {
		Helper.get(Helper.getAPIUrl('getStudents')).then(response => {
			if (!response) {
				console.log("dont have it")
			}
			console.log("found it")
		})
		.catch((error) => {
			console.error(error);
		})
	})

	function onSelectMenu (elementId){
		document.getElementById(elementId)?.setAttribute("id", "menu-items1");
	}

	/**
	 * Retrieves current viewport's width
	 * @returns the viewport's width
	 */
	function getWindowDimensions() {
		const {innerWidth: width} = window;
		return width
	}

	function  routeChange() { 
		let path = '/controller'; 
		history.push(path);
		window.location.reload();
	  }

	/** 
	 * Gets the list of items from API response and stores the data into layout item holder 
	 * for displaying in current viewport
	 */ 
	// useEffect(()=>{
		
	// 	axios.get('http://192.168.1.173:9091/api/v1/layouts', {withCredentials: true})
	// 	  .then(res=>{
	// 		//console.log(res.data);
	// 		setLayout(res.data);
	// 		//console.log(layoutItems);
	// 	  })
	// 	  .catch(err=>{
	// 		console.log(err);
	// 	  })
	//  }, [])

	let tempData = ['control', 'layout', 'scoreboard', 'test'] // Hardcoded data for when API is down
	 /**
	  * Maps all the items from layout items holder and creates HTML for each item
	  * @returns an HTML element to be used to display each layout item
	  */
	 //console.log(layoutItems);
	 const items = tempData.map((layoutItem, index)=>{
		if (layoutItem === 'control'){
			return  ( <IonCol className='layout-col-item' key={index} onClick={routeChange}>
						{layoutItem} 
					</IonCol >);
		}

		else {
			return (<IonCol className='layout-col-item' key={index} onClick={() => console.log("It's clicking")}>
						{layoutItem} 
					</IonCol >);
		}
		  
	})

	/**
	 * Send error of parameter 'message' to the 'errorMessage' in 
	 * ReactDOM.render().
	 * @param message a string error message to be displayed 
	 */
	function sendError(message = '') {
		ReactDOM.render((<p id="errorMessage">{message}</p>), document.getElementById('errorMessage'));
	}

	return (
		<IonPage id='dashboard-page'>
			
			<IonContent fullscreen>
			
				<IonToolbar  id='dashboard-toolBar'>
					<IonRow id='row-container'>
						
						<IonButton fill='clear' color="medium" id='menu-button' shape='round' size='small' onClick={showSidebar}>
							<IonIcon slot='icon-only' icon={menuOutline}></IonIcon>
						</IonButton>

						<a href='dashboard'> <img id="scorevu-img" src={process.env.PUBLIC_URL + '/macewan.PNG'} alt="macewan"></img>	</a>

						<h1 id='page-header-title' >Dashboard</h1>

						{/* <IonButton id='create-user-btn' expand='block' fill='outline' color="medium" size='small'>Create  User</IonButton> */}

						{/* <IonLabel >
							<a id='logout' onClick={() => presentAlert({
								cssClass: 'secondary',
								header: 'Log out',
								subHeader: 'Are you sure you want to log out?',
								buttons: [{
									text: 'No',
									role: 'cancel',
									id: 'cancel-button',
								},
								{
									text: 'Yes', 
									id: 'confirm-button',
									handler: () => window.location.replace('/login') 
								}],
								})}>
								Log out
							</a>
						</IonLabel> */}

						<IonButton /* key={topButtons?.length ?? 0} */ data-tip data-for="logout-tooltip" size='small' id='logout' fill='clear'
							onClick={() => presentAlert({
								cssClass: 'secondary',
								header: 'Log out',
								subHeader: 'Are you sure you want to log out?',
								buttons: [{
									text: 'No',
									role: 'cancel',
									id: 'cancel-button',
								},
								{
									text: 'Yes',
									id: 'confirm-button',
									handler: () => window.location.replace('/login')
								}],
								})}>
							<IonIcon slot='icon-only' icon={powerOutline} size='small'></IonIcon>
						</IonButton>
						
					</IonRow>

				</IonToolbar>

				<div id='dashboard-fullpage'>
					
					<aside aria-label='Project navigation' className={sidebar ? 'nav-sidebar active' : 'nav-sidebar'}>
							
						<IonContent className='sidebar-content'>

							<IonList id='menu-list' color= "dark">
								
								<IonButton className='menu-items' onClick={() => { }}>
									<IonIcon className={getWindowDimensions() < 768 ? 'menu-icons-mobile': 'menu-icons'} icon={homeOutline} size='small'></IonIcon>	
									<IonLabel className={sidebar ? 'menu-labels' : 'menu-labels collapsed' }>Dashboard</IonLabel>
								</IonButton>

								<IonButton className='menu-items' onClick={() => { }}>
									<IonIcon className={getWindowDimensions() < 768 ? 'menu-icons-mobile': 'menu-icons'} icon={peopleOutline} size='small'></IonIcon>	
									<IonLabel className={sidebar ? 'menu-labels' : 'menu-labels collapsed' }>Users</IonLabel>
								</IonButton>

								<IonButton className='menu-items' onClick={() => { }}>
									<IonIcon className={getWindowDimensions() < 768 ? 'menu-icons-mobile': 'menu-icons'} icon={gridOutline} size='small'></IonIcon>	
									<IonLabel className={sidebar ? 'menu-labels' : 'menu-labels collapsed' }>Courses</IonLabel>
								</IonButton>

								<IonButton className='menu-items' onClick={() => { }}>
									<IonIcon className={getWindowDimensions() < 768 ? 'menu-icons-mobile': 'menu-icons'} icon={imageOutline} size='small'></IonIcon>	
									<IonLabel className={sidebar ? 'menu-labels' : 'menu-labels collapsed' }>Lorem</IonLabel>
								</IonButton>

								<IonButton className='menu-items' onClick={() => { }}>
									<IonIcon className={getWindowDimensions() < 768 ? 'menu-icons-mobile': 'menu-icons'} icon={basketballOutline} size='small'></IonIcon>	
									<IonLabel className={sidebar ? 'menu-labels' : 'menu-labels collapsed' }>Lorem</IonLabel>
								</IonButton>

							</IonList>

							<IonButton className={sidebar ? 'expand-sidebar-button active' : 'expand-sidebar-button'}  onClick={showSidebar}>
								<IonIcon className={sidebar ? 'expand-icon backward' : 'expand-icon'} icon={chevronForward} size='small'></IonIcon>
								<IonIcon id='close-icon' icon={closeOutline} size='small'></IonIcon>	
								<IonLabel id='collapse-label' className={sidebar ? 'collapse-label' : 'collapse-label collapsed'}>Collapse menu</IonLabel>
								<IonLabel id='close-label'>Close menu</IonLabel>
							</IonButton>

						</IonContent>
					</aside>
					
						<IonGrid id='item-grid'>
							<div>
								hello
							</div>
								
							{/* <IonRow id='item-main-row'> 
								<IonCol id='layout-col'>
									
									<div>
										<IonTitle>
											Layout box
											<IonIcon className='expand-btn' icon={expandOutline} size='small'></IonIcon>
										</IonTitle>
									</div>
									
									<IonRow id='layout-items-row'>

										{items}
										
									</IonRow>
								</IonCol>

								<IonCol id='media-col'>
									<div>
										<IonTitle>
											Media box?
											<IonIcon className='expand-btn' icon={expandOutline} size='small'></IonIcon>
										</IonTitle>
									</div>
								</IonCol>
							</IonRow>

							
							<IonRow onClick={() => console.log(getWindowDimensions())}>
								<IonCol id='device-col'>
									

									<div>
										<IonTitle>
											Device box
											<IonIcon className='expand-btn' icon={expandOutline} size='small'></IonIcon>
										</IonTitle>
									</div>

									<div id='device-col-item-container'>
										<IonList id='device-col-items'>
											<IonListHeader id='device-col-header'>
												<IonLabel>Name</IonLabel>
												<IonLabel>Layout</IonLabel>
												<IonLabel>HB?</IonLabel>
											</IonListHeader>
										
											<IonItem color='dark'>
												<IonLabel>Pokémon Yellow</IonLabel>
												<IonLabel>Pokémon Yellow</IonLabel>
												<IonLabel>Pokémon Yellow</IonLabel>
											</IonItem>
											<IonItem color='dark'>
												<IonLabel>Mega Man X</IonLabel>
											</IonItem>
											<IonItem color='dark'>
												<IonLabel>The Legend of Zelda</IonLabel>
											</IonItem>
											<IonItem color='dark'>
												<IonLabel>Pac-Man</IonLabel>
											</IonItem>
											<IonItem color='dark'>
												<IonLabel>Super Mario World</IonLabel>
											</IonItem>
										</IonList>
									</div>
									
								</IonCol>
								
								<IonCol id='sports-col'>
									
									<div>
										<IonTitle>
											Sports box?
											<IonIcon className='expand-btn' icon={expandOutline} size='small'></IonIcon>
										</IonTitle>
									</div>

								</IonCol>
							</IonRow> */}
						</IonGrid>
								
				</div>

			</IonContent>
			
		</IonPage>
	);

}

export default Dashboard; 