import React, { useState, useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-flow: column;
align-items: flex-start;
justify-content: flex-start;
 .widget-prop-unit{
   display: flex;
   border-bottom: 1px solid #e2e6e9;
   margin-top: 6px;
 },
 .keyvalue-pairs{
   display: flex;
   flex-flow: column;
   align-items: flex-start;
   justify-content: flex-start;
 },
 .keyvalue-ul{
   margin-top: 10px;
   margin-top: 10px;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: flex-start;
 },
 .keyvalue-pairs-list{
  list-style-type:none;
  display: flex;
  align-items: center;
  justify-content: space-between;
 },
 .keyvalue-cont{
  display: flex;
  align-items: center;
  justify-content: space-between;
 }
 .keyvalue-unit{
  margin: 0  10px;
 }
 .keyvalue-unit span{
  margin: 0  8px;
 }
  .footer-icons-container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 20px;
  },
  .prop-span{
    margin-left: 10px;
    margin-bottom: 8px;
  },
  .wli-icons{
    cursor: pointer;
    margin-right: 24px;
  }
`;

export const WidgetsArea = (props) => {
  const [wKeyValueArr, setWkeyValueArr] = useState([]);
  
  useEffect(() => {
    //setWkeyValueArr([...props.data.keyvalue.values()]);
    const myMap = props.data.keyvalue;
    const keysArr = [...myMap.keys()];
    const valuesArr = [...myMap.values()];
    const tmpArr = []
    for(let i = 0; i< myMap.size; i++){
      tmpArr.push({key:keysArr[i], value:valuesArr[i]});
      //setWkeyValueArr(prev => [...prev, {key:keysArr[i], value:valuesArr[i]}]);
    }
    setWkeyValueArr([...tmpArr]);
  }, [props.data]);
  
 

  const onDeleteItem = () =>{
    props.deleteItem(props.data.id);
  }  
  const onEditItem = () => {
     props.editItem(props.data.id)
  }  

  return (
  <Container className='widgets-area' style={{display:"flex", flexFlow:"column", alignItems:"flex-start", justifyContent:"flex-start"}}>
    <div className='widget-prop-unit'><strong>widget id:</strong><span className="prop-span">{props.data.id}</span></div>
    <div className='widget-prop-unit'><strong>widget name:</strong><span className="prop-span">{props.data.name}</span></div>
    <div className='widget-prop-unit'><strong>widget magic number:</strong><span className="prop-span">{props.data.mn}</span></div>
    <div className='keyvalue-pairs'><strong>widget key/value pairs:</strong>
      <ul className='keyvalue-ul'>
      {
       wKeyValueArr.map((item, index) =>{
         return <li className='keyvalue-pairs-list' key={index}>
                  <div className='keyvalue-cont'>
                    <div className='keyvalue-unit'><strong>key:</strong><span >{item.key}</span></div>
                    <div className='keyvalue-unit'><strong>value:</strong><span >{item.value}</span></div>
                  </div>
                </li>    
       })
    }
    </ul>
    </div>
    <div className="footer-icons-container">
         <div className="wli-icons" onClick={onDeleteItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="ionicon" viewBox="0 0 512 512"><title>Trash</title><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
         </div>
         <div className="wli-icons" onClick={onEditItem}>
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="ionicon" viewBox="0 0 512 512"><title>Pencil</title><path fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M364.13 125.25L87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z"/></svg>
         </div>
    </div>
  </Container>
  )
}
