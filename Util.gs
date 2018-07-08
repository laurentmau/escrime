var LogSheetName = "log"
var JournalSheetName = "journal"
var LogSpreadsheetId = "1E0vC2U4NYDMjJIuAy6b3An_GDPPd7klGE7LgpDHZHd0"
/**
* move a file to the target Folder given by Id. All others folders are removed.
*
*<pre>
* Usage example : moveFileToFolder(spreadsheetId,targetFolderId);
*</pre>
* @param {string} fileId Id of the file
* @param {string} folderId Id of folder where you want to move the file
* @return {boolean} true if move has been executed with success, else false
* 
*/
function driveMoveFileToFolder(fileId,folderId) {
  var fileObj = DriveApp.getFileById(fileId);
  var folderObj = DriveApp.getFolderById(folderId);
  var folderOriginId = driveGetFolderId(fileId);
 loggerIn("driveMoveFileToFolder " + fileId +"("+folderOriginId+") vers "+folderId)
  if (folderOriginId == folderId){ 
    loggerError( 'Warning  no move as targetFolder = Origin fodler for fileId = ' + fileId);  
    return false;
  } else {    
    // Attempt the move only if folderObj has a value.
    // Otherwise, the file will be left without a folder.
    // (Lost files can be found in the "All items" area.)
    if (folderObj) {
      var folders = fileObj.getParents();
      folderObj.addFile(fileObj);
      while (folders.hasNext()){
        var folder = folders.next();
        //do not remove the new folder
        if (folder.getId() != folderObj.getId()) {folder.removeFile(fileObj);}        
      }
       loggerIn("driveMoveFileToFolder OK")

      return true;
    }
    loggerError(  'no move as targetFolder is Empty for fileId = ' + fileId, 'driveMoveFileToFolder');  
           loggerIn("driveMoveFileToFolder KO")

    return false;
  }
}

/**
* this function returns the value of the parameter defined in setup Sheet<br/>
* parameter name is stored in column A and value is stored in column B
*
* <pre>
* Usage example : 
*
* var spreadsheetId = getParam('spreadsheetId');
* </pre>
* 
* @param  {string} variableName the name of the parameter (or variable)
* @return {string} the value of the parameter found in 'setup' sheet
*/
function getParam(fileId,variableName){
  var spreadsheet = SpreadsheetApp.openById(fileId);

  var sheetname = 'param';
  var sheet = spreadsheet.getSheetByName(sheetname);
  var data = sheet.getDataRange().getValues();
  var value = '';
  for (var i=1 ; i < data.length ; i++) {
    if (data[i][0]==variableName){
      value = data[i][1];
      return value;
    }
  }
  if (value == '') {loggerError(variableName + ' value not defined in ' + sheetname );}
 }



/**
* create a log
* result : a new row in the target spreadsheet : Date / Type / ActiveUser /  Message
*
*<pre>
* Usage example : writeLogSpreadsheet('Error', 'function MyTest, wrong parameter', 'mylog', 'EeIzKI_SazP-RfbqBpH');
*  or with default value : writeLogSpreadsheet ('Warning','missing value in MyFunction'); ==> result message is inserted in 'log' sheet
*</pre>
* @param  {string} type expected values : 'Warning' or 'Error' or 'Info'
* @param  {string} message content to be recorded into sheet
* @param {string} optSheetName name of the sheet that contains the log 
* @param {string} optSpreadsheetId ID of the spreadsheet (optional - default value : current spreadsheet)
*/
function logWriteLogSpreadsheet(type, message, optSheetName, optSpreadsheetId) {    
  //test type parameters
  //Browser.msgBox ('debut logWrite');
  if (((type != 'Debug')&&(type != 'Error')&&(type != 'Execution'))){
    Browser.msgBox ('Wrong parameter in writeLogSpreadsheet function - type:expected values : Debug or Error or Execution');
    return;
  }
  //manage optional parameters
  var sheet;
  switch (arguments.length - 2) {case 0:  optSheetName = 'log'; case 1:  optSpreadsheetId = -1; }
  if (optSpreadsheetId == -1) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(optSheetName);
  } else {
    sheet = SpreadsheetApp.openById(optSpreadsheetId).getSheetByName(optSheetName);
  }
  
    // Browser.msgBox ('avant le return' +NiveauLog+' '+type);

  if (NiveauLog == "Execution" && type != "Execution") {return}
  
  // Browser.msgBox ('on a passé les return');
  //if sheet doesn't exist - creation of 'log' spreadsheet, write column names and freeze first row
  if (sheet == null){ 
    if (optSpreadsheetId == -1) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('log');
    } else {
      sheet = SpreadsheetApp.openById(optSpreadsheetId).insertSheet('log');
    }
    sheet.appendRow(['Date','Type','User','Message']);
    sheet.setFrozenRows(1);    
  }
  
  // create a new row + write the message 
  sheet.appendRow([new  Date(), type, Session.getActiveUser(), message]);
}

function formatPhone(p) {
  
  var rst=p.replace(/(.{2})(?!$)/g,"$1-");
  
  return rst
}

function loggerOut(toLog)
{  
logWriteLogSpreadsheet("Debug", "OUT-"+toLog, LogSheetName, LogSpreadsheetId)
}

function loggerIn(toLog)
{  
logWriteLogSpreadsheet("Debug", "IN-"+toLog, LogSheetName, LogSpreadsheetId)

  
}

function loggerExecution(toLog)
{ 
logWriteLogSpreadsheet("Execution", toLog, LogSheetName, LogSpreadsheetId)
  

}
function loggerDebug(toLog)
{
   logWriteLogSpreadsheet("Debug", toLog, LogSheetName, LogSpreadsheetId)
  
}
function loggerJournal(toLog)
{
   logWriteLogSpreadsheet("Execution", toLog, JournalSheetName, LogSpreadsheetId)
  
}


function loggerError(toLog)
{ 
 
   logWriteLogSpreadsheet("Error", toLog, LogSheetName, LogSpreadsheetId) 
  
}


/**
* Format date as a string
* @param date - a date object (usually "new Date();")
* @param format - a string format, eg. "DD-MM-YYYY"
*/
function dateFormat(date, format) {
    // Calculate date parts and replace instances in format string accordingly
  loggerDebug("dateFormat de "+date+" au format "+format)
    format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate()); // Pad with '0' if needed
    format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)); // Months are zero-based
    format = format.replace("YYYY", date.getFullYear());
    return format;
}

/**
* get the first folder of the file given by id
*
*<pre>
* Usage example : driveGetFolderId(spreadsheetId);
*</pre>
* @param  {string} fileId Id of the file
* @return {folder} the folder that contains the file
* 
*/
function driveGetFolderId(fileId){
  /*
  * author : xavier Philippe
  * approver : 
  * date :
  */
  loggerIn("driveGetFolderId")
//  logWriteLogSystemSpreadsheet_( 'Info',  'Start', 'getFolder' );
  try {
    var file = DriveApp.getFileById(fileId);
    var folders = file.getParents();
    if (folders.hasNext()){
      var folder = folders.next();  
      loggerOut("driveGetFolderId")
     // logWriteLogSystemSpreadsheet_( 'Info',  'End', 'getFolder' );  
      return folder.getId();
    } else {
      loggerOut("driveGetFolderId no folder found for fileId = ' + fileId")
     // logWriteLogSystemSpreadsheet_( 'Warning',  'no folder found for fileId = ' + fileId , 'getFolder');  
      return false;
    } 
  }   catch(e) {
   loggerError( 'Error',  e.message , 'getFolder');  
    return false;
  }
  
}

function formatTelephone(number) {

  if (number == null) { number = "INCONNU"}
  var num = number.toString();
  num=num.replace(/-/g,"");
  num=num.replace(/\./g,"");
  num=num.replace(/s/g,"");

  
  var length = num.length;
  if(num.length == 9){

    num = "0" + num;
  }
  // On rajoute les "."
 var numReformat = num.substring(0,2)+"."+num.substring(2,4)+"."+num.substring(4,6)+"."+num.substring(6,8)+"."+num.substring(8,10)
  return numReformat; 

}
