import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { IonButton } from '@ionic/react';
import {
	Typography,
  } from "@mui/material";


const TabFive = () => {

	return (
	<>
      <div style={{ height: "89vh", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingBottom: "30px",
            flexDirection: "column",
          }}
        >
        <Typography variant="h3">XML File ETL</Typography>
        </div>
        
        <IonButton onClick={() => {console.log("ETL Here")}} 
            style={{ display: "flex", height: "88%" }} expand='block' size='large'>
            Export Button 
        </IonButton>

        <div style={{ display: "flex", height: "75%" }}>
		
        </div>
      </div>
    </>
	);

}

export default TabFive; 