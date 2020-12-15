//import React from 'react'

   
export function FetchData(callback) { 
    fetch('./fakeJsonData.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
    .then(response => response.json())
    .then(data => callback(data))
    .catch( err  => console.error("loading data error: ", err ))
  }
  
  