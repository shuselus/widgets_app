import React, { useState, useEffect} from "react";
import { FetchData } from "../utils/fetchData";
import { WidgetsListItem } from "./widgetListItem";
import {WidgetsArea} from "./widgetsArea";
import {AddWidget} from "./addWidget";
import {EditWidget} from "./editWidget";

 
export const Widgets = (props => {
  const [widgetsListArr, setWidgetsListArr] = useState([]);
  const [currentWidgetId, setCurrentWidgetId] = useState(null)
  const [currentWidget, setCurrentWidget] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  useEffect(() => {
    init();
    setCurrentWidgetId(1);
  }, []);
  useEffect(() => {
    if(widgetsListArr.length>0){
      if(!currentWidget){
        setCurrentWidget(widgetsListArr[0]);
      }
      if(!widgetsListArr.find(({id}) => id === currentWidgetId)){
        setCurrentWidgetId(widgetsListArr[0].id)
      }
    }
  }, [widgetsListArr]);
   useEffect(()=>{ 
     setCurrentWidget(widgetsListArr.find(({id}) => id === currentWidgetId))
   },[currentWidgetId,widgetsListArr])
  
  const init = () => {
    FetchData(getDataList);
  };
  const getDataList = (data) => {
    data.map((item)=>{
      item.keyvalue = new Map(objToMap(item.keyvalue));
    });
    console.log("getDataList>>>>>", data);
    setWidgetsListArr([...data]);
  }
  const objToMap = (obj) =>{
    const propMap = new Map();
    for (let k in obj) {
       for (let s in obj[k]) {
         propMap.set(s, obj[k][s]);
       }
    }
    return propMap;
  }
  const updateCurrentId = (id) => {
    console.log("updateCurrentId", id);
        setCurrentWidgetId(id)
   };
  const deleteWidget = (id) => {
    setWidgetsListArr((prev) => prev.filter((item) => item.id !== id));
  };
  const openEditWidget = (id) => {
    setCurrentWidgetId(id);
    setShowModalEdit(true);
  };
  const closeEditWidgetAlert = () => {
    setShowModalEdit(false);
  };
  const onAddNewWidget = () => {
    setShowModalAdd(true);   
  };
  const closeAddWidgetAlert = () => {
    setShowModalAdd(false);
  }; 
  const updateWidget = (data) => {
      console.log("updateWidget>>>>>>>>", data);
      setWidgetsListArr((prev) => prev.map(item => item.id === data.id ? item ={...data}: item));
  }; 
  
  const getNewWidget = (data) => {
    data.id = widgetsListArr[widgetsListArr.length -1].id + 1;
    setWidgetsListArr(widgetsListArr => [...widgetsListArr, data]);
  };
  
  return (
    <>
        <div className="item-list col-sm-3">
            <ul className="list-group">
        {
            widgetsListArr.map((item, index) => 
              <WidgetsListItem
                data={item} 
                updateCurrentIndex={updateCurrentId}
                key={index}/>
            )
        }
        <button className="btn btn-info" role="button" 
          style={{marginTop:"10px", color:"white"}}
          onClick={onAddNewWidget}>add new widget
        </button>
             
        </ul>
        
        </div>
        <div className="col-sm-6 border">
          {
            currentWidget && <WidgetsArea data={currentWidget} deleteItem={deleteWidget} editItem={openEditWidget} />
          }
            
        </div>
        {
           showModalAdd && <AddWidget  updateWidgetsArr={getNewWidget} closeAlert={closeAddWidgetAlert}/>
        }
        {
           showModalEdit && <EditWidget  data={currentWidget} updateWidget={updateWidget} closeAlert={closeEditWidgetAlert}/>
        }
        
    </>
  );
}
)
