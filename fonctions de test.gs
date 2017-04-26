/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function ApendResponses() 
// Prends les datas qui sont dans '1poffUAc9LDoqNzc41ticK2_lqc__d7HIr0p_QfQzbfQ' pour les insérer
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
{
  var form = FormApp.openById('1_1_0oPAM_5lpzDTBiiXy-EIYgm8oK2VhBfDzqgBee7c');
  var sheet = SpreadsheetApp.openById('1poffUAc9LDoqNzc41ticK2_lqc__d7HIr0p_QfQzbfQ').getSheetByName('liste');
  
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
LibUtil.loggerIn("ApendResponses")

  for (var x = 2; x < values.length; x++) {

    var formResponse = form.createResponse();
    var items = form.getItems();

    var row = values[x];
    LibUtil.loggerDebug(row[0])
    LibUtil.loggerDebug(row[1])
    LibUtil.loggerDebug(row[2])
    LibUtil.loggerDebug(row[3])
    LibUtil.loggerDebug(row[4])


    
    var formItem = items[2.0].asTextItem();   
    var response = formItem.createResponse(row[1]);     
    formResponse.withItemResponse(response);
    
    var formItem = items[3.0].asTextItem();   
    var response = formItem.createResponse(row[2]);     
    formResponse.withItemResponse(response);
    

    var formItem = items[4.0].asListItem(); 
    var response = formItem.createResponse(row[3]);     
    formResponse.withItemResponse(response);
    
    
    var formItem = items[5.0].asDateItem();   
    var response = formItem.createResponse(row[4]);     
    formResponse.withItemResponse(response);
    
 var formItem = items[6.0].asTextItem();   
    var response = formItem.createResponse(row[5]);     
    formResponse.withItemResponse(response);
                                               
    var formItem = items[7.0].asListItem();   
    var response = formItem.createResponse(row[6]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[9.0].asTextItem();   
    var response = formItem.createResponse(row[7]);     
    formResponse.withItemResponse(response); 
                                               
    var formItem = items[10.0].asParagraphTextItem();   
    var response = formItem.createResponse(row[8]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[11.0].asTextItem();   
    var response = formItem.createResponse(row[9]);     
    formResponse.withItemResponse(response); 
                                               
var formItem = items[12.0].asTextItem();   
    var response = formItem.createResponse(row[10]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[13.0].asTextItem();   
    var response = formItem.createResponse(row[11]);     
    formResponse.withItemResponse(response); 
                                               
var formItem = items[14.0].asTextItem();   
    var response = formItem.createResponse(row[12]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[16.0].asTextItem();   
    var response = formItem.createResponse(row[13]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[17.0].asTextItem();   
    var response = formItem.createResponse(row[14]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[18.0].asTextItem();   
    var response = formItem.createResponse(row[15]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[19.0].asTextItem();   
    var response = formItem.createResponse(row[16]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[20.0].asTextItem();   
    var response = formItem.createResponse(row[17]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[21.0].asTextItem();   
    var response = formItem.createResponse(row[18]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[22.0].asTextItem();   
    var response = formItem.createResponse(row[19]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[24.0].asTextItem();   
    var response = formItem.createResponse(row[20]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[25.0].asTextItem();   
    var response = formItem.createResponse(row[21]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[26.0].asTextItem();   
    var response = formItem.createResponse(row[22]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[27.0].asTextItem();   
    var response = formItem.createResponse(row[23]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[28.0].asTextItem();   
    var response = formItem.createResponse(row[24]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[29.0].asTextItem();   
    var response = formItem.createResponse(row[25]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[30.0].asTextItem();   
    var response = formItem.createResponse(row[26]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[32.0].asTextItem();   
    var response = formItem.createResponse(row[27]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[33.0].asTextItem();   
    var response = formItem.createResponse(row[28]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[34.0].asTextItem();   
    var response = formItem.createResponse(row[29]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[35.0].asTextItem();   
    var response = formItem.createResponse(row[30]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[37.0].asListItem();   
    var response = formItem.createResponse(row[31]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[38.0].asListItem();   
    var response = formItem.createResponse(row[32]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[39.0].asListItem();   
    var response = formItem.createResponse(row[33]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[40.0].asTextItem();   
    var response = formItem.createResponse(row[34]);     
    formResponse.withItemResponse(response); 
    
 LibUtil.loggerDebug(row[35])
    var formItem = items[41.0].asListItem();   
    var response = formItem.createResponse(row[35]);     
    formResponse.withItemResponse(response); 
       
        LibUtil.loggerDebug(row[36])
           LibUtil.loggerDebug(row[37])

    var formItem = items[42.0].asListItem();   
    var response = formItem.createResponse(row[36]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[43.0].asListItem();   
    var response = formItem.createResponse(row[37]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[44.0].asListItem();   
    var response = formItem.createResponse(row[38]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[45.0].asListItem();   
    var response = formItem.createResponse(row[39]);     
    formResponse.withItemResponse(response); 


    formResponse.submit();
    Utilities.sleep(100);

  }

};


 function testGetCotisation()

//getCotisation(categorie, coef, ville, type,deuxieme,chomeur)
 
 {
          LibUtil.loggerIn("testGetCotisation");
   
   c = getCotisation("pupille", "Hors Quotient", "m", "Escrime sportive", "Oui","NON")
 //  LibUtil.loggerDebug ("pupille, Hors Quotient, m, Escrime sportive, Oui,NON -->" +getCotisation("pupille", "Hors Quotient", "m", "Escrime sportive", "Oui","NON"))
   LibUtil.loggerDebug ("pupille, Hors Quotient, m, Section Handisport, Oui,NON -->" +getCotisation("pupille", "Hors Quotient", "m", "Section Handisport", "Non","Non"))
       LibUtil.loggerOut("testGetCotisation");

   
 }

function testGetLicence()
{
  loggerDebug("P M11 "+getLicence("P", "M11"))
    loggerDebug("0 M17 "+getLicence(0, "M17"))
  loggerDebug("+ M7 "+getLicence("+", "M7"))

//    loggerDebug("15/03/2008 0"+getLicence("0", "15/03/2008"))

}


function testEffaceFichiersNom()
{
  effaceFichiersNom("MAUMET","PAUL")
}


function testdriveMoveFileToFolder()
{

driveMoveFileToFolder('1pUXNUhk02S4wc3FQwOZzdYqFIL4i79vo9fa8LAx7C3g',driveGetFolderId('1oC-nE7hMjUijWtZs1O7aCX9m9Ss-VJFJ3rzqQY49RUI'))

}

function testFormatPhone() {
  
  
  loggerDebug("Resultat "+formatPhone("672681534"))
}
  