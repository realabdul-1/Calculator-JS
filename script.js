let total = 0;
let previousOperator = null;
let buffer = "0";
const calcResult = document.querySelector(".result");

document.querySelector('.iconButtons').addEventListener("click",function(event){
    buttonClick(event.target.innerHTML);
});
function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerenderScreen();
}
function handleSymbol(value){
  if(value === "C") {
    buffer = "0";
    total = 0;
    previousOperator = null;
  }
  else if(value === "="){
    if(previousOperator === null) {
      return;
    }
    else {
      flushOperation(parseInt(buffer));
      buffer = "" + total;
      previousOperator = null;
      total = 0;

    }
  }
  else if(value === "DEL") {
    if(buffer.length === 1){
      buffer =0;
    }
    else {
      buffer = buffer.substring(0,buffer.length-1);
    }
  }
  else {
    handleMath(value);
  }
}
function handleNumber(value){
    if(buffer === "0"){
        buffer = value;
    }else{
        buffer += value;
    }
}
function handleMath(value){
    const internalBuffer = parseInt(buffer);
    
    if (total === 0){
        total = internalBuffer;
    }else{
        flushOperation(internalBuffer);
    }

    previousOperator = value;

    buffer = "0";
}
function flushOperation(internalBuffer){
    if(previousOperator === "+"){
        total += internalBuffer;
    }else if(previousOperator === "-"){
        total -= internalBuffer;
    }else if(previousOperator === "x"){
        total *= internalBuffer;
    }else{
        total /= internalBuffer;
    }
}
function rerenderScreen(){
  calcResult.value = buffer;
}