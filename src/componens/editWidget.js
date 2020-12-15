import React, { useState, useEffect, useRef} from 'react';
import  Button  from 'react-bootstrap/Button';
import {ConvertDigitToWord} from "../utils/convertDigitToWord";

import styled from 'styled-components';

const Container = styled.div`
position: fixed;   
display : flex;
z-index: 1; 
padding-top: 100px; 
left: 0;
top: 0;
width: 100% important; 
height: 100% important; 
overflow: auto; 
background-color: rgba(0,0,0,0.2); 
margin: 0 important;
    .modal-container{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 40%;
        min-width: 500px;
        pointer-events: auto;
        background-clip: padding-box;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: .3rem;
        outline: 0;
        padding: 20px;
        background-color: #fefefe;
        margin: 0 auto auto auto;
    },
    .modal-btn{
        margin-left: 10px;
        box-sizing: border-box;
    },
    .modal-edit-widget-but{
        display: flex;
        width: 100%;
        justify-content: flex-end;
        margin-top: 15px;
    },
    .edit-kyevalue{
       display: flex;
       align-items:center;
       justify-content: flex-start;
    },
    .keyvalue-input{
        width: 70%;
        margin: 6px;
    },
    .wli-icons{
      cursor: pointer;
    },
    .edit-props-label-cont{
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    },
    .edit-label{
      color: black;
    },
    .edit-props-btn{
       cursor: pointer;
       color: dodgerblue;
    },
    .edit-props-btn:hover{
      color: #9ecffe;
    },
    .close-btn{
      position: absolute;
      top: 4px;
      right: 16px;
      font-size: 20px;
      color: black;
    }
`;

export const EditWidget = (props) => {
  const [wkeyValueArr, setWkeyValueArr] = useState([]);
  const [magicNumber, setMagicNumber] = useState("");
  const [keyValueMap, setKeyValueMap] = useState(new Map());
  const [keyCounter, setKeyCounter] = useState(0);

  //const formGroup = useRef();
  const inputName = useRef();
  const inputMN = useRef();
  const nmText = useRef();
  const keyRefs= useRef([]);
  const valueRefs= useRef([]);

  useEffect(() => {
    setKeyValueMap(props.data.keyvalue)
  }, [props.data.keyvalue]);

  useEffect(() => {
   //  setWkeyValueArr([...keyValueMap.values()]);
    const keysArr = [...keyValueMap.keys()];
    const valuesArr = [...keyValueMap.values()];
    const tmpArr = [];
    for(let i = 0; i< keyValueMap.size; i++){
      tmpArr.push({key:keysArr[i], value:valuesArr[i]});
     // setWkeyValueArr(wkeyValueArr => [...wkeyValueArr, {key:keysArr[i], value:valuesArr[i]}]);
    }
    setWkeyValueArr([...tmpArr]);
  }, [keyValueMap]);

  const handleClose = () =>  props.closeAlert();

  const handleSave = (e) => { 
      console.log("handleSave>>>");
      const tmpMap = new Map();
      
      wkeyValueArr.map((item, index)=>{
         item.key = keyRefs.current[index].value;
         item.value = valueRefs.current[index].value;
         tmpMap.set(item.key,item.value);
      });
      setKeyValueMap(new Map(tmpMap));
      const data = {
        id: props.data.id,
        name: inputName.current.value,
        mn: magicNumber ? magicNumber : inputMN.current.value ,
        keyvalue: tmpMap
      }    
      props.updateWidget(data);
      handleClose();
    };
  
  const onDeleteItem = (e) =>{
    const key = e.currentTarget.id;
    keyValueMap.delete(key);
    setKeyValueMap(new Map(keyValueMap));
  }  
  
  const onInputMagicNumber = (e) => {
    console.log("onInputMagicNumber>>>", )
    let num = e.target.value;
    if(parseInt(num) < 0) {
      e.target.value = num = num.replace("-", "");
    };
    if(num.length > 4){
      e.target.value = num.slice(0, 4);
    }
    
    const mn = ConvertDigitToWord(num);
    nmText.current.innerHTML = mn;
    setMagicNumber(mn);
  }
  const addEmptyKeyValue=()=>{
    keyValueMap.set("newkey" + keyCounter, "value");
    setKeyCounter(keyCounter + 1)
    setKeyValueMap(new Map(keyValueMap));
    //setWkeyValueArr([...tmpArr]);
    //setWkeyValueArr(wkeyValueArr => [...wkeyValueArr, {key:"", value:""}]);
  }
 
      return (
        <Container className="modal-edit-widget" style={{width:"100%", height:"100%", margin:"0"}}>
            <div className="modal-container">
               <label className="edit-label">set widget name</label>
               <input name="name" type="text"  ref={inputName} defaultValue={props.data.name}/>
               <label className="edit-label">set magic number</label>
               <input name="mn"  type="number"  ref={inputMN} placeholder={props.data.mn} onChange={(e)=>onInputMagicNumber(e)}/>
               <small id="mn-txt" className="form-text text-muted" ref={nmText}></small>
               
               <div className="edit-props-label-cont">
                  <label className="edit-label">edit key-value pairs</label> 
                  <div className="edit-props-btn" height="16px" onClick={addEmptyKeyValue}>add new key-value</div>{' '}
                </div>
               {
                  wkeyValueArr.map((item, index) =>{
                    console.log("wkeyValueArr.map>>>>", item.key, item.value)
                    return <div className="edit-kyevalue" key={index}>
                      <div>
                          <label className="edit-label">key:</label>
                          <input className="keyvalue-input" name={item.key} id={index} type="text"  defaultValue={item.key}  ref={(el) => keyRefs.current[index] = el}/> 
                      </div>
                      <div>
                          <label className="edit-label">value:</label>
                          <input className="keyvalue-input" name={item.key} id={index} type="text"  defaultValue={item.value}  ref={(el) => valueRefs.current[index] = el}/> 
                      </div>
                      <div id={item.key} className="wli-icons" onClick={(e)=>onDeleteItem(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="ionicon" viewBox="0 0 512 512"><title>Trash</title><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
                        </div>
                    </div>
                   })

               }
               
              <div className="modal-edit-widget-but">
                <Button className="modal-btn" variant="secondary" onClick={handleClose}>Close</Button>
                <Button className="modal-btn" variant="primary" type="submit"  onClick={handleSave}>Save Changes</Button>
              </div>
              <div className="close-btn" onClick={handleClose}>x</div> 
            </div> 
        </Container>
      );
}



