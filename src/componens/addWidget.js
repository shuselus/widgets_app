import React, { useState, useEffect, useRef} from 'react';
import  Button  from 'react-bootstrap/Button';
import {ConvertDigitToWord} from "../utils/convertDigitToWord";


import styled from 'styled-components';

const Container = styled.div`
      position: absolute;   
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
    .widget-label{
       margin-top: 7px;
    },
    .modal-add-widget-but{
        display: flex;
        width: 100%;
        justify-content: flex-end;
        margin-top: 15px;
    },
    .modal-btn{
        width:"130px";
        margin-left: 10px;
        box-sizing: border-box;
    },
    .keyvalue-input{
      width: 70%;
      margin: 6px;
    },
    .add-kyevalue{
      display: flex;
      align-items:center;
      justify-content: flex-start;
   },
   .wli-icons{
     cursor: pointer;
   },
   .add-props-label-cont{
     display: flex;
     align-items: baseline;
     justify-content: space-between;
   },
    .add-label{
      color: black;
    }
    .add-props-btn{
       cursor: pointer;
       color: dodgerblue;
    },
    .add-props-btn:hover{
      color: #9ecffe;
    }
    .close-btn{
      position: absolute;
      top: 16px;
      right: 16px;
      font-size: 20px;
      color: black;
    }
`;

export const AddWidget = (props) => {
  const [wkeyValueArr, setWkeyValueArr] = useState([]);
  const [magicNumber, setMagicNumber] = useState("");
  const inputName = useRef();
  const inputMN = useRef();
  const nmText = useRef();
  const keyRefs= useRef([]);
  const valueRefs= useRef([]);
 
  useEffect(()=>{
    addPairsToArray(5);
  },[])

  const addPairsToArray = (iter) => {
    //const tmpArr = [];
    for(let i = 0; i < iter; i++){
      //tmpArr.push({key:"set key_" + i, value:"set value"})
      setWkeyValueArr(wkeyValueArr => [...wkeyValueArr, {key:"set key_" + i, value:"set value"}]);
    }
   // setWkeyValueArr([...tmpArr]);
  }
  const handleClose = () =>  props.closeAlert();
  const handleSave = (e) => { 
      console.log("handleSave>>>");
     
      let notReady = false;
   
      if(inputName.current.value.length <  4){
          inputName.current.style.border = "red solid 1px";
          notReady = true;
      }
      if(inputMN.current.value.length === 0){
          inputMN.current.style.border = "red solid 1px";
          notReady = true;
      }
      if(notReady) return;

      const pairsMap = new Map();
      
      wkeyValueArr.map((item, index)=>{
         item.key = keyRefs.current[index].value;
         item.value = valueRefs.current[index].value;
         pairsMap.set(item.key,item.value);
      });

      const data = {
          name: inputName.current.value,
          mn: magicNumber,
          keyvalue: pairsMap
      }
      props.updateWidgetsArr(data);
      handleClose();
    };
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
    e.target.style.border = "1px solid #ced4da";
  }
  // const onChange = (e) => {
  //   e.target.style.border = "1px solid #ced4da";
  // }
  const onDeleteItem = (e) =>{
    let id = e.currentTarget.id
    //wkeyValueArr.filter((item) => item.key !== e.currentTarget.id);
    setWkeyValueArr((prev) => prev.filter(item => item.key !== id));
    //setWkeyValueArr([...wkeyValueArr])
  }  
  const addKeyValue = () => {
    addPairsToArray(1);
  }
      return (
        <Container id="modal-add-widget" style={{width:"100%", height:"100%", margin:"0"}}>
            <div className="modal-container">
            <label className="widget-label add-label">set widget name</label>
               <input name="name" type="text"  ref={inputName} placeholder="enter widget name"/>
               <label className="widget-label add-label">set magic number</label>
               <input name="mn"  type="number"  ref={inputMN} placeholder="enter integer number" onChange={(e)=>onInputMagicNumber(e)}/>
               <small id="mn-txt" className="form-text text-muted" ref={nmText}></small>
               
               <div className="add-props-label-cont">
                  <div className="add-props-btn" height="16px" onClick={addKeyValue}>add new key-value</div>{' '}
                </div>
               {
                  wkeyValueArr.map((item, index) =>{
                    return <div className="add-kyevalue" key={index}>
                      <div>
                          <label className="add-label">key:</label>
                          <input className="keyvalue-input" name={item.key} id={index} type="text"  defaultValue={item.key}  ref={(el) => {console.log("el",el);keyRefs.current[index] = el}}/> 
                      </div>
                      <div>
                          <label className="add-label">value:</label>
                          <input className="keyvalue-input" name={item.key} id={index} type="text"  defaultValue={item.value}  ref={(el) => valueRefs.current[index] = el}/> 
                      </div>
                      <div id={item.key} className="wli-icons" onClick={(e)=>onDeleteItem(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="ionicon" viewBox="0 0 512 512"><title>Trash</title><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
                        </div>
                    </div>
                   })

               }
               
            
            <div className="modal-add-widget-but">
               <Button className="modal-btn" variant="secondary" onClick={handleClose}>Close</Button>
               <Button className="modal-btn" variant="primary" type="submit"  onClick={handleSave}>Save Changes</Button>
            </div>
             <div className="close-btn" onClick={handleClose}>x</div>
          </div>      
              
        </Container>
      );
}



