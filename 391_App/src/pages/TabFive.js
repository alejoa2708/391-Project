import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { IonButton } from '@ionic/react';
import {
	Typography,
  } from "@mui/material";
import xmlFilePath from '../XMLDataTest.xml';
import Helper from '../helper';

const TabFive = () => {
  // Extract Data from XML file
  function dataParser() {

    let transformedDataObj = {};
    // Fetches the XML file, then converts it to a text, then 
    // parses the text
    fetch(xmlFilePath)
      .then(response => response.text())
      .then(xmlText => {
        // Parses the XML text
        const xmlDoc = new DOMParser().parseFromString(xmlText, "text/xml");
        //console.log(xmlDoc);
        const facts = xmlDoc.querySelectorAll('fact');

        // Transforms data from XML to an array of array
        let index = 0;
        for (const fact of facts) {
          const inst_id = fact.querySelector('ins_id').textContent.replace(/[\t\n]/g, '');
          const date_id = fact.querySelector('date_id').textContent.replace(/[\t\n]/g, '');
          const course_id = fact.querySelector('course_id').textContent.replace(/[\t\n]/g, '');
          const count = fact.querySelector('count').textContent.replace(/[\t\n]/g, '');

          //console.log(inst_id, date_id, course_id)
          transformedDataObj[index] = [parseInt(inst_id), parseInt(date_id), parseInt(course_id), parseInt(count)];
          index += 1;
        }
        //console.log(transformedDataObj);
        /* Helper.post(Helper.getAPIUrl('storeXMLData'), transformedDataObj).then(response => {
			    console.log(response);
		    }); */

        storeData(transformedDataObj)
      })
      .catch(error => {
        console.error(error);
    });
    //console.log(transformedData);
  }

  function storeData(transformedData) {
    Helper.post(Helper.getAPIUrl('storeXMLData'), {transformedData}).then(response => {
			console.log(response);
		});
  }

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
        
        <IonButton onClick={() => dataParser()} 
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