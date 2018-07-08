var FormID = '1AHxg7Y4K265VWa8cW_yG3cbSt1JlO8ukeHZ-TQlB6XM' // Le formulaire de réponse

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function ApendResponses() 
// Prends les datas qui sont dans '1poffUAc9LDoqNzc41ticK2_lqc__d7HIr0p_QfQzbfQ' pour les insérer
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
{
  var form = FormApp.openById(FormID);
  var sheet = SpreadsheetApp.openById('1poffUAc9LDoqNzc41ticK2_lqc__d7HIr0p_QfQzbfQ').getSheetByName('liste');
  
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
LibUtil.loggerIn("ApendResponses")
a=values.length;
//  if (a>20) {a=20}

  for (var x = 2; x < a; x++) {
        var row = values[x];

if (row[0]!="")
{
  
    
    var formResponse = form.createResponse();
    var items = form.getItems();

    LibUtil.loggerDebug(row[0])
    LibUtil.loggerDebug(row[1])
    LibUtil.loggerDebug(row[2])
    LibUtil.loggerDebug(row[3])
    LibUtil.loggerDebug(row[4])


    
    var formItem = items[2.0].asTextItem();   // nom
    var response = formItem.createResponse(row[1]);     
    formResponse.withItemResponse(response);
    
    var formItem = items[3.0].asTextItem();   // prenom
    var response = formItem.createResponse(row[2]);     
    formResponse.withItemResponse(response);
    

    var formItem = items[4.0].asListItem();  //sexe
    var response = formItem.createResponse(row[3]);     
    formResponse.withItemResponse(response);
    
    
    var formItem = items[5.0].asDateItem();    // date naissance
    var response = formItem.createResponse(row[4]);     
    formResponse.withItemResponse(response);
    
 var formItem = items[6.0].asTextItem();    // nationalité
    var response = formItem.createResponse(row[5]);     
    formResponse.withItemResponse(response);
                                               
    var formItem = items[7.0].asListItem();  // latéralité 
 
    formResponse.withItemResponse(response); 
    
    var formItem = items[9.0].asParagraphTextItem(); //  adresse
    var response = formItem.createResponse(row[7]);     
    formResponse.withItemResponse(response); 
                                               
    var formItem = items[10.0].asTextItem();   // code postal 
    var response = formItem.createResponse(row[8]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[11.0].asTextItem();   // ville
    var response = formItem.createResponse(row[9]);     
    formResponse.withItemResponse(response); 
                                               
var formItem = items[12.0].asTextItem();   // telephone
    var response = formItem.createResponse(row[10]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[13.0].asTextItem();   // email
    var response = formItem.createResponse(row[11]);     
    formResponse.withItemResponse(response); 
                                               
var formItem = items[15.0].asTextItem(); // nom pere 
    var response = formItem.createResponse(row[12]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[16.0].asTextItem();    // prenom pere
    var response = formItem.createResponse(row[13]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[17.0].asTextItem();   // tel pere
    var response = formItem.createResponse(row[14]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[18.0].asTextItem();   // email pere
    var response = formItem.createResponse(row[15]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[20.0].asTextItem();   //nom mere
    var response = formItem.createResponse(row[16]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[21.0].asTextItem();   //prenom mere
    var response = formItem.createResponse(row[17]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[22.0].asTextItem();    // tel mere
    var response = formItem.createResponse(row[18]);     
    formResponse.withItemResponse(response); 
     
    var formItem = items[23.0].asTextItem();   // email mere
    var response = formItem.createResponse(row[19]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[25.0].asTextItem();   // nom autre
    var response = formItem.createResponse(row[20]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[26.0].asTextItem();    // prenom autre
    var response = formItem.createResponse(row[21]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[27.0].asTextItem();   // tel autre
    var response = formItem.createResponse(row[22]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[28.0].asTextItem();   //email docs
    var response = formItem.createResponse(row[23]);     
    formResponse.withItemResponse(response); 
    
    
    var formItem = items[30.0].asListItem();   
    var response = formItem.createResponse(row[24]);      // categorie
    formResponse.withItemResponse(response); 
    LibUtil.loggerDebug(row[25])
    var formItem = items[31.0].asListItem();   // assurance
    var response = formItem.createResponse(row[25]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[32.0].asListItem();   // coef familial
    var response = formItem.createResponse(row[26]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[33.0].asTextItem();   //mra
    var response = formItem.createResponse(row[27]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[34.0].asListItem();    // chequi jeune
    var response = formItem.createResponse(row[28]);     
    formResponse.withItemResponse(response); 
       

    var formItem = items[35.0].asListItem();   // nb cheques
    var response = formItem.createResponse(row[29]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[36.0].asListItem();   // 2eme enfant
    var response = formItem.createResponse(row[30]);     
    formResponse.withItemResponse(response); 
        
    LibUtil.loggerDebug("Location " +row[31])

   var formItem = items[37.0].asListItem();   // location
   var response = formItem.createResponse(row[31]);     
    formResponse.withItemResponse(response); 
    
    var formItem = items[38.0].asListItem();    // etudiant
    var response = formItem.createResponse(row[32]);     
    formResponse.withItemResponse(response); 


    formResponse.submit();
    Utilities.sleep(5000);
    // On supprime la ligne
        LibUtil.loggerDebug("On supprime la ligne "+x)
}
    sheet.getRange(x+1,1).setValue("")

  }

};


function testGetCategorie()

{
  
  var dates=["09/03/2010"]
  
  for (i=0;i<dates.length; i++)
  {
    LibUtil.loggerDebug(dates[i]+" "+LibUtil.getCategorie(dates[i]))
  }
    
}
  

