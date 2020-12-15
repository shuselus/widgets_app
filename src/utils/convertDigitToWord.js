//import React, { useState, useEffect, useRef} from 'react';

export const ConvertDigitToWord = (num) => {
    if (num.length > 4) return
    const unitsMap = new Map([[0,"zero"],[1,"one"],[2,"two"],[3,"three"],[4,"four"],[5,"five"],[6,"six"],[7,"seven"],[8,"eight"],[9,"nine"]]);
    const tensMap = new Map([[10,"ten"],[11,"eleven"],[12,"twelve"],[13,"thirteen"],[14,"fourteen"],[15,"fifteen"],[16,"sixteen"],[17,"seventeen"],[18,"eighteen"],[19,"nineteen"],[2,"twenty"],[3,"thirty"],[4,"fourty"],[5,"fifty"],[6,"sixty"],[7,"seventy"],[8,"eighty"],[9,"ninety"]]);
    const hundredsMap = new Map([[1,"one hundred"],[2,"two hundred"],[3,"three hundred"],[4,"four hundred"],[5,"five hundred"],[6,"six hundred"],[7,"seven hundred"],[8,"eight hundred"],[9,"nine hundred"]]);
    const thousandsMap = new Map([[1,"one thousand"],[2,"two thousand"],[3,"three thousand"],[4,"four thousand"],[5,"five thousand"],[6,"six thousand"],[7,"seve thousand"],[8,"eight thousand"],[9,"nine thousand"]]);
    const mapsArray = [thousandsMap, hundredsMap, tensMap, unitsMap];
    let resStr = "";
    let splitNum = num.split("");
    if(num.length === 1 && num === "0"){
        resStr = unitsMap.get(parseInt(num));
    }
    if(num.length === 2 && (parseInt(num) > 9 &&  parseInt(num)) < 20){
        resStr = tensMap.get(parseInt(num));
    }else{
        let mapsArrayIndex = mapsArray.length - splitNum.length;
        for(let i=0; i < splitNum.length; i++){
            if(i === splitNum.length - 1  && splitNum[splitNum.length - 1] === "0") break;
            if(i === splitNum.length - 2 && splitNum.length > 2 && (parseInt(num.slice(num.length - 2)) > 9 && parseInt(num.slice(num.length - 2)) < 20)){
                resStr += tensMap.get(parseInt(parseInt(num.slice(num.length - 2))));
                break;
            }
            resStr += mapsArray[mapsArrayIndex].get(parseInt(splitNum[i])) + " ";
            mapsArrayIndex++;
        }
    }
    return resStr;
    
}