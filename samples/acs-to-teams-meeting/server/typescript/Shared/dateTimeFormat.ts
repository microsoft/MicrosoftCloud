let month = undefined;
let day = undefined;
let hour = undefined;
let minute = undefined;
let second = undefined;
const date = new Date();
const year = date.getFullYear();
let endAsync = undefined;
let startAsync = undefined;

async function endDateTimeAsync(){

    if(date.getUTCMonth() + 1 < 10){
        let currentMonth = date.getUTCMonth() + 1;
        month = '0' + currentMonth;
    }
    else{
        month = date.getUTCMonth() + 1;  
    }
    if(date.getUTCDate() < 10){
        day = '0' + date.getUTCDate();
    }
    else{
        day = date.getUTCDate();
    }
    if(date.getUTCHours() + 1 < 10){
        let hourlater = date.getUTCHours() + 1;
        hour = '0' + hourlater;
    }
    else if(date.getUTCHours() + 1 == 24){
       hour = '00';  
    }
    else{
        hour = date.getUTCHours() + 1;
    }
    if(date.getUTCMinutes() < 10){
        minute = '0' + date.getUTCMinutes();
    }
    else{
        minute = date.getUTCMinutes();
    }
    if(date.getUTCSeconds() < 10){
        second = '0' + date.getUTCSeconds();
    }
    else{
        second = date.getUTCSeconds();
    }
   
    endAsync = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second; 
    return endAsync;
}
async function startDateTimeAsync(){

    if(date.getUTCMonth() + 1 < 10){
        let currentMonth = date.getUTCMonth() + 1;
        month = '0' + currentMonth;
    }
    else{
        month = date.getUTCMonth() + 1;  
    }
    if(date.getUTCDate() < 10){
        day = '0' + date.getUTCDate();
    }
    else{
        day = date.getUTCDate();
    }
    if(date.getUTCHours() < 10){
        hour = '0' + date.getUTCHours();
    }
    else{
       hour = date.getUTCHours();  
    }
    if(date.getUTCMinutes() < 10){
        minute = '0' + date.getUTCMinutes();
    }
    else{
        minute = date.getUTCMinutes();
    }
    if(date.getUTCSeconds() < 10){
        second = '0' + date.getUTCSeconds();
    }
    else{
        second = date.getUTCSeconds();
    }
   
    startAsync = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second; 
    return startAsync;
}

export {startDateTimeAsync, endDateTimeAsync};