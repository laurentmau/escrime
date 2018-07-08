var NiveauLog = "debug" 

function testDateFormat()
{
  d= "15/09/2017"
  loggerDebug(d +" "+dateFormat(d,"YYYY-MM-DD"))
}





function testexisteTireur() {
  p=createPersonne();
  p.nom="Maumet"
  p.prenom = "Leo"
  p.dateNaissance  =""
  ex = existeTireur(p)
  
  loggerExecution(" On cherche Maumet Leo 15/03/2003" + ex)
}
function testcreateTireur() {
  r= createTireur("nom...", "prenom", "sexe", "dateNaissance", "nationalite", "type", 
              "lateralite", "adresse", "codePostal", "ville", "email", "tel", "nomPere", "prenomPere", 
              "telPere", "nomMere", "prenomMere", "telMere" )
 loggerExecution("retour : "+r)
}

function testdeleteTireur()
{
 r =  deleteTireur("nom...", "prenom", "ee")
  loggerExecution("retour : "+r)
}

function testupdateTireur() {
  r= updateTireur("nom...", "prenom!!", "sexe!!!", "dateNaissance", "nationalite", "type", 
              "lateralite", "adresse", "codePostal", "ville", "email", "tel", "nomPere", "prenomPere", 
              "telPere", "nomMere", "prenomMere", "telMere" )
 
  
 loggerExecution("retour : "+r)
}


function testcreatePersonne()
{
  p=createPersonne()
  p.nom="Dalton"
  p.prenom= "Joe"
  
}
//- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -

function testformatTelephone()
{
  loggerDebug("672681534 : " +formatTelephone(672681534))
  loggerDebug("6-7268-1534 : " +formatTelephone("6-7268-1534"))
   loggerDebug("6-7268.15.34 : " +formatTelephone("6-7268.15.34"))
}

//- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -
function testexisteInscription() {
  
  var p=newInscription();
  p.nom="Sénégas"
  p.prenom = "rémi"
  p.dateNaissance  =""
  ex = existeInscription(p)
  
  loggerExecution(" On cherche " + p.nom+" "+p.prénom+ " : " +ex)
}
function testcreateInscription() {
  i = newInscription ()
  i.nom="titi"
  r= createInscription(i)
 
  loggerExecution("retour : "+r)
}

function testdeleteInscription()
{
 r =  deleteInscription("nom...", "prenom", "ee")
  loggerExecution("retour : "+r)
}

function testupdateInscription() {
  r= updateInscription("nom...", "prenom!!", "sexe!!!", "dateNaissance", "nationalite", "type", 
              "lateralite", "adresse", "codePostal", "ville", "email", "tel", "nomPere", "prenomPere", 
              "telPere", "nomMere", "prenomMere", "telMere" )
 
  
 loggerExecution("retour : "+r)
}


// Reformat Base
// Lit tous les tireurs et les recrée
function reformatBase()
{
  
    var spreadsheet = SpreadsheetApp.openById(BaseID);
    var sheet = spreadsheet.getSheetByName('liste');
  var data = sheet.getDataRange().getValues();
  var value = '';
//for (var i=2 ; i < data.length ; i++) {
    for (var i=2 ; i < 6 ; i++) {
    nom = data[i][0]
    prenom = data[i][1]
    t = readTireur(nom, prenom )
     deleteTireur(t)

    createTireur(t)
      
    }
}

function reformatPaul()
{
  
  t = readTireur ("MAUMET", "PAUL")
  logTireur(t)
 deleteTireur(t)
 createTireur(t)
}
  
function  testReadInscription()
{
readInscription("MAUMET", "PAUL")
}



function testGetCategorie()

{
  
 var dates=["16/06/2005", "16/06/2011", "16/06/2009","01/06/2009", "16/06/2000","01/06/2000", "16/03/2000"]
  
  for (i=0;i<dates.length; i++)
  {
  /*  var naissance = new Date(dates[i]);
  var anneeNaissance = naissance.getFullYear()
  
  
  
  
    loggerDebug(dates[i]+" " +naissance + " "+ anneeNaissance)
  
    var dateParts = dates[i].split("/");

var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); 
    var an = dateObject.getFullYear()
    loggerDebug(dates[i]+" " +dateObject + " "+ an)
    */
    
  loggerDebug(dates[i]+" "+getCategorie(dates[i]))
  }
    
}
  
