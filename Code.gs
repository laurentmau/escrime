/*- Variables globales - - - - - - - - */

var IndentSpaces = '                               ';
var MaxIndent = 8;
var Indent = 0;

var SuiviInscriptionsID = "1oC-nE7hMjUijWtZs1O7aCX9m9Ss-VJFJ3rzqQY49RUI" // Le fichier de suivi des inscriptions
var DocTemplateRecapId = "1Pq0IBQr46JGH8kp1pLEmAfLwllP0gyde38VoquKu9Fk";   // template recap
var DocNameRecap     = "recap Inscription 2016"; // nom du fichier de recap
var DocTemplateDetailsId = "1rJKEyG_uhUK0ZKO7yc6-AKxirdZ5gmcbrJLAhpldan0";   // template détail
var DocDetailsName     = "Fiche contact 2016 "; // nom du fichier de contact
var LogSheetName = "log"
var LogSpreadsheetId = "1E0vC2U4NYDMjJIuAy6b3An_GDPPd7klGE7LgpDHZHd0"
var FormID = '1_1_0oPAM_5lpzDTBiiXy-EIYgm8oK2VhBfDzqgBee7c' // Le spreadsheet de réponse
var SheetFormId = 'Réponses au formulaire 1' // L onglet où sont stockées les réponses
var FolderInscriptionsId = '0By9FaGhQFbEVTEtpLW44UURudlE' // le folder des inscriptions (où seront stockés les fichiers)

var NiveauLog = "Execution";
//var NiveauLog = "Debug";

/*- Fin des Variables globales - - - - - - - - */



/*---- Ajout du menu  - - - - - - - - - */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Gestion')
      .addItem('Ack', 'ack2016')
  .addItem('liens modif', 'assignEditUrls')
  .addItem('Envoi email recap', 'envoiEmailsRecap')
      .addToUi();
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function envoiEmailsRecap()
// Envoie des emails de recap pour toutes les lignes qui ne sont pas à "OUI"
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
{
    LibUtil.loggerIn("envoieEmailsRecap")

  var form = FormApp.openById(FormID);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetFormId);
  var lastRow = sheet.getLastRow()
  var  base= sheet.getRange(3, 1)
  var nbEmail=0
  var noms = []
  var prenoms = []
  var emails = []
  var places =[]

 for (var j = 0; j < lastRow; j++)
 {
   var nom = base.offset(j, 1).getValue().toUpperCase()
   var prenom = base.offset(j,2).getValue().toUpperCase()
   var email=base.offset(j,30).getValue()
   var emailEnvoye = base.offset(j,42).getValue()
   var place =j
  // LibUtil.loggerDebug(nom +"|"+prenom+"|"+email+"|"+emailEnvoye+"|")
   if (emailEnvoye != "OUI" && nom!="") 
   {
     
     noms[nbEmail]=nom; prenoms[nbEmail]=prenom; emails[nbEmail]=email; places[nbEmail]= j;nbEmail ++
   }
   
                                                                   
 }
  var msg = "Pas d'email à envoyer"
  if (nbEmail >0) {msg = "On va envoyer "+nbEmail+" emails"}
  
                                                                                             
   for (var i = 0; i < nbEmail; i++)
   {
     msg = msg + " "+noms[i]+" "+prenoms[i]+" " +emails[i]
   }
  LibUtil.loggerDebug(msg)
  var reponse=Browser.msgBox('Confirmation', msg, Browser.Buttons.YES_NO);
  LibUtil.loggerDebug(reponse)
  if (reponse == "yes")
  {
    LibUtil.loggerDebug("YES " + nbEmail)
    
    for (var i = 0; i < nbEmail; i++)
    {
      LibUtil.loggerDebug(i + "/"+nbEmail)
 
      var nomFichier = DocNameRecap+'-'+noms[i]+"-"+prenoms[i]+".pdf"
      var fichiers = DriveApp.getFilesByName(nomFichier)
      var nb=0
      var attachement
      while (fichiers.hasNext()) 
      { 
        var attachement = fichiers.next(); 
        nb++}
      LibUtil.loggerDebug("On a trouvé " +nb+ " fichiers avec le nom "+nomFichier)
    
    if (nb >1)
    {
      LibUtil.loggerDebug("Il y a plus "+nb+" fichiers pour "+nomFichier+" email non envoyé")
    }
    else
    {
      LibUtil.loggerDebug("On envoie le mail pour "+noms[i] +" "+prenoms[i]+"à "+emails[i])
   
      var subject = "Meylan Escrime - Etapes suivantes pour l'inscription de "+ noms[i] + " "+prenoms[i];
                    
   
      var body    = "Bonjour, <br><br>Nous avons bien reçu votre demande d'inscription pour " + noms[i] + " "+prenoms[i]+
        " à Meylan Escrime et nous vous en remercions.<br>"+
          "La marche à suivre pour finaliser l'inscription se trouve dans le fichier joint.<br>"+
            "Pour toutes questions, n'hésitez-pas à répondre à cet e-mail.<br><br>"+
              "A très bientôt<br><br>L'équipe de Meylan Escrime.";
   
      MailApp.sendEmail(emails[i],subject, body, {name: "Inscription Meylan Escrime", from:"inscriptions.meylanescrime@gmail.com", replyTo:"inscriptions.meylanescrime@gmail.com" ,htmlBody: body, attachments:attachement}); 
      base.offset(places[i],42).setValue("OUI")
    }
      LibUtil.loggerDebug(i + "/"+nbEmail)
    } // fin for
  } // fin if "envoyer"
 LibUtil.loggerOut("envoieEmailsRecap")
  
}



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function assignEditUrls() {
  
// Parcours le fichier de résultat du form et rempli la colonne 49 avec le lien de modification
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  
  var form = FormApp.openById(FormID);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetFormId);
  var data = sheet.getDataRange().getValues();
  var urlCol = 41;
  var responses = form.getResponses();
  var timestamps = [], urls = [], resultUrls = [];
  LibUtil.loggerIn("assignEditUrls")
  LibUtil.loggerDebug("Il y a "+responses.length+" reponses")

  for (var i = 0; i < responses.length; i++) {

    timestamps.push(responses[i].getTimestamp().setMilliseconds(0));
    urls.push(responses[i].getEditResponseUrl());
  }
  
  for (var j = 2; j < data.length; j++) {
 //   LibUtil.loggerDebug("on traite j "+j)
  //  LibUtil.loggerDebug(responses[i])

    resultUrls.push([data[j][0]?urls[timestamps.indexOf(data[j][0].setMilliseconds(0))]:'']);
  }
      LibUtil.loggerDebug("On met à jour l URL en colonne "+ urlCol +"pour un nb d'URL de " + resultUrls.length)

  sheet.getRange(3, urlCol, resultUrls.length).setValues(resultUrls);  
    LibUtil.loggerOut("assignEditUrls")

}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function traiter(e) {
  
// Traiter les lignes du fichier de réponse
// Pour chaque ligne nouvelle ou modifiée, ajouter une ligne dans SuiviInscriptionsID et générer les fichiers de détail et de récap.
// param e : une ligne du fichier de réponse
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  var v = [] ;
  LibUtil.loggerIn("traiter")  
  LibUtil.loggerDebug(e)
  var suiviIncriptions = SpreadsheetApp.openById(SuiviInscriptionsID);
  var sheet = suiviIncriptions.getSheetByName("liste");
  v[0]=[]
  
  // on recupere tous les champs du formulaire dont on a besoin
 
  var nom = e[1].toUpperCase();
  var prenom = e[2].toUpperCase();
  var dateNaissance = e[4]
  var ville = e[10].toUpperCase(); // ville
  var type = e[31] // Type (compétition, loisirs, handi)
  var assurance = e[32] // Assurance
  var coef = e[33] // coeficient familial
  var mra = e[34]// carte mra ?
  var chequier = e[35]// chéquier jeune ?
  var nombreCheque = +e[36]// Nombre de cheques
  var deuxieme = e[37]// 2eme enfant ?
  var location = e[38]// Location ?
  var chomeur =  e[39] // Chomeur etudiant ?
  var urlModif = e[40]
  
  LibUtil.loggerExecution("On traite nom " +nom+" "+prenom+" assurance "+assurance+" coef fam "+coef)
  
  effaceFichiersNom(nom,prenom)   //On efface les fichiers générés précédemment


  var categorie=getCategorie(dateNaissance) // calcul de la catégorie en fonctinon de la date de naissance (pupille, ..)
  var cotisation = +getCotisation(categorie, coef, ville, type,deuxieme,chomeur) // Calcul cotisation
  var licence = +getLicence(assurance, categorie) // Calcul Licence
  if (type == "Section Handisport") {licence = 0}
  
  var locationMt=0;
  if (location == "Oui") {locationMt = 15 } // montant location
  
  var total = cotisation + licence + locationMt
  LibUtil.loggerDebug("Total : "+total)
  var mtMra = 0
  var mtChequier=0
  if (mra != "") {mtMra = 30} // carte mra ?
  if (chequier == "Oui") {mtChequier = 15} // chéquier jeune ?
  
  
  var reste = cotisation - mtMra-mtChequier
  var cheque1 = licence+locationMt
  if (type == "Section Handisport") { reste = 0 } // Si handisport, la cotisation sera payée par un organisme externe
  var cheque2 = 0
  var cheque3 = 0
  LibUtil.loggerDebug("cheques 1 2 3  : "+cheque1 + " " +cheque2 + " "+cheque3+" nombreCheque " + nombreCheque)

  if (nombreCheque == 0) {nombreCheque = 1}
  if (nombreCheque == 1) { cheque1 = cheque1 + reste}
  LibUtil.loggerDebug("cheques 1 2 3  : "+cheque1 + " " +cheque2 + " "+cheque3)
  
   var parCheque = reste / nombreCheque
   LibUtil.loggerDebug("parCheque "+parCheque)
   if (nombreCheque ==2) {
     LibUtil.loggerDebug("avant pow")
     cheque1 = cheque1+ Math.floor(parCheque); 
     LibUtil.loggerDebug("apres pow")
     cheque2 = reste - cheque1 + licence + locationMt}
  LibUtil.loggerDebug("cheques 1 2 3  : "+cheque1 + " " +cheque2 + " "+cheque3)
  if (nombreCheque ==3) {cheque1 = cheque1 + Math.floor(parCheque); cheque2 = Math.floor(parCheque); cheque3 = reste - cheque1 -cheque2+ licence + locationMt}

 LibUtil.loggerDebug("cheques 1 2 3  : "+cheque1 + " " +cheque2 + " "+cheque3)
// Préparation de la nouvelle ligne à mettre à jour dans suivi inscription
 v[0][0] = nom // Nom
 v[0][1] = prenom // prenom
 v[0][2] = "" //status
 v[0][3] = ""
 v[0][4] = categorie //Catégorie
 
 v[0][5] = cotisation //cotisation
 v[0][6] = licence //licence
 v[0][7] = location //location
 v[0][8] = total //total
 v[0][9] = cheque1
 v[0][10] = " "
 v[0][11] = cheque2
 if (cheque2 ==0) {v[0][12] = "X"} else {v[0][12] = " "}
 v[0][13] = cheque3
  if (cheque3 ==0) {v[0][14] = "X"} else {v[0][14] = " "}
 v[0][15] = mra
 if (mra !="") {v[0][16] =" "} else {v[0][16] = "X"}
 v[0][17] = chequier
 if (chequier == "Oui") { v[0][18] = " "} else { v[0][18] = "X"} 
 
  // On va chercher si la personne est déja dans la liste
 var base = sheet.getRange(1,1)

 var l=-1;
 for (var i=0;l==-1;i++)
 {
  // LibUtil.loggerDebug("on compare "+ nom + " et "+ base.offset(i,0).getValue()+" "+prenom+" et "+ base.offset(i,1).getValue())
   if (base.offset(i,0).getValue() == nom && base.offset(i,1).getValue() == prenom) {LibUtil.loggerDebug("OUI");l=i}
   if(base.offset(i,0).getValue() == "") {l=i}
  // LibUtil.loggerDebug("l "+l)
 }
   
  if ( base.offset(l,0).getValue() != "")
   {
     if (total == base.offset(i,9).getValue() )
     { 
       v[0][10] = base.offset(i,9).getValue(); 
       v[0][12] = base.offset(i,11).getValue(); 
       v[0][14] = base.offset(i,13).getValue(); 
       v[0][16] = base.offset(i,15).getValue(); 
       v[0][18] = base.offset(i,17).getValue(); 
       
     }
   }
   
  
 sheet.getRange(l+1, 1).setValue("t")
 var c=sheet.getRange(l+1, 1, 1, 19)
 c.setValues(v)
 
 var texteAdditionnel = ""
 if (type == "CREFED") { texteAdditionnel = "Inscrit au CREFED, un chèque additionnel sera à envoyer à la ligue pour la cotisation."}
 // Génération du fichier de récap 
 var recap= genererRecap(nom,prenom,cotisation,licence,location,locationMt, total,cheque1,cheque2,cheque3,mra,mtMra, chequier, mtChequier,texteAdditionnel)
// Génération du fichier de détails
 var details =  genererDetails(e)
 
 sheet.getRange(l+1, 30).setValue(recap)
 sheet.getRange(l+1, 31).setValue(details) 
 sheet.getRange(l+1,32).setValue(urlModif)
// genererReceptionDocs(e)
 

LibUtil.loggerOut("Traiter")  
  
}



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function getLicence(assurance, categorie)
  
// Détermination du cout de la licence
// assurance : le type d'assurance choisi
// categorie : la date de naissance
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
{
   
    LibUtil.loggerIn("getLicence "+assurance+";"+categorie)

  var suiviIncriptions = SpreadsheetApp.openById(SuiviInscriptionsID);
  var sheet = suiviIncriptions.getSheetByName("paramLicence");
  
  var licence="-10000"
  var base = sheet.getRange(1,1)
  last = sheet.getLastRow()
var decalage  = 1

    switch (assurance)
    {
        
        case "P":
            decalage=1;
            break;
        case 0:
             decalage=2;
            break;
      case "+":
        decalage=3;
        break;
      default:
        decalage=4;
        break;
    }





 for (var i = last-1; i>=0; i--) {
   
  // LibUtil.loggerDebug("On compare " +base.offset(i,0).getValue().valueOf() + " et "+ categorie)
   if (base.offset(i,0).getValue().valueOf() ==  categorie)
   {
     licence = base.offset(i,decalage).getValue() }
   
   
  // LibUtil.loggerDebug(" Licence : "+licence);
 
  
 } 
     LibUtil.loggerOut("getLicence");

  return licence;
  
  
  
  
}



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getCategorie(n)
// Détermine la tatégorie en fonction de l'année de naissance
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

{
    LibUtil.loggerIn("getCategorie")

  var suiviIncriptions = SpreadsheetApp.openById(SuiviInscriptionsID);
  var sheet = suiviIncriptions.getSheetByName("paramCategories");
  naissance = new Date(n);
  
  categorie="INCONNUE"
  var base = sheet.getRange(1,1)
  last = sheet.getLastRow()
 // LibUtil.loggerDebug(" Categorie : "+categorie);


 for (var i = last-1; i>=0; i--) {
   
  // LibUtil.loggerDebug("On compare " +base.offset(i,1).getValue().valueOf() + " et "+ naissance.valueOf())
   if (base.offset(i,1).getValue().valueOf() <=  naissance.valueOf())
   {
  //   LibUtil.loggerDebug(" On change Categorie : "+ base.offset(i,0).getValue().valueOf())
     categorie = base.offset(i,0).getValue() }
   
   
   LibUtil.loggerDebug(" Categorie : "+categorie);
 
  
 } 
     LibUtil.loggerOut("getCategorie");

  return categorie;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getCotisation(categorie, coef, ville, type,deuxieme,chomeur)
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
{     
  
  LibUtil.loggerIn("getCotisation");
  
 var suiviIncriptions = SpreadsheetApp.openById(SuiviInscriptionsID);
 var sheet = suiviIncriptions.getSheetByName("paramCotisation");
  
  LibUtil.loggerDebug("categorie "+categorie+" coef "+ coef)
 
 offsetColonne=2
 if (ville == "Meylan") {offsetColonne=1};
 
 offsetLigne = -1;
 if (chomeur == "Oui") { offsetLigne = 6};
 if (type  == "Loisirs Adulte") {offsetLigne = 7}
 if (categorie == "M7") {offsetLigne = 8}
 if (type == "Section Handisport" ) {offsetLigne = 9 }
  if (type == "CREFED, INSEP, PFJ" || type == "Extérieur") {offsetLigne=10}
  if (offsetLigne == -1)
  {
     switch (coef)
    {
        
        case "T1-T2 ( <546 )":
            offsetLigne=1;
            break;
        case "T3-T4 ( 546-875 )":
             offsetLigne=2;
            break;
      case "T5-T6 ( 876-1205 )":
        offsetLigne=3;
        break;
        
      case "T7-T8 ( >1205 )":
        offsetLigne=4;
        break;
        case "Hors Quotient":
        offsetLigne=5;
        break;
        
        default:
            offsetLigne=9;
            break;
    }

  }
  
  
 var base = sheet.getRange(1,1)
 c = base.offset(offsetLigne, offsetColonne).getValue()
 LibUtil.loggerDebug("On prend la valeur " +offsetLigne+ ";"+offsetColonne)
 
 if (deuxieme == "Oui") { c = c*0.9}
                          

  LibUtil.loggerOut("getCotisation");
 return c

}


 


/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/

function genererDetails(e) {
  //Générer le fichier détail pour la ligne 'e'
/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/


  
  LibUtil.loggerIn("genererDetails")
//Get information from form and set our variables

var nom = "....."
var prenom = "....."
var sexe = "....."
var dateNaissance = "....."
var nationalite = "....."
var lateralite = "....."
var profession  = "....."
var adresse = "....."
var codePostal = "....."
var ville = "....."
var telephone = "....."
var mail = "....."
var nomPere = "....."
var prenomPere = "....."
var adressePere = "....."
var codePostalPere = "....."
var villePere = "....."
var telephonePere = "....."
var nomMere = "....."
var prenomMere = "....."
var adresseMere = "....."
var codePostalMere = "....."
var villeMere = "....."
var telephoneMere = "....."
var nomContact = "....."
var prenomContact = "....."
var telephoneContact = "....."
var categorie = "....."
var assurance = "....."
var coefficient = "....."
var carteMRA= "....."
var chequierJeune = "....."
var nombreCheques = "....."
var deuxieme = "....."
var location = "....."
var chomeur = "....."
var adresseMailPere= "....."
var adresseMailMere= "....."
var adresseMailEnvoi = "....."

nom = e[1].toUpperCase()
 prenom = e[2].toUpperCase()
 sexe = e[3]
 dateNaissance = LibUtil.dateFormat(e[4], "DD/MM/YYYY")
 nationalite = e[5].toUpperCase()
 lateralite = e[6]
 profession  = e[7]
 adresse = e[8]
 codePostal = e[9]
 ville = e[10].toUpperCase()
 telephone = LibUtil.formatPhone("0"+e[11])
 mail = e[12]
 nomPere = e[13].toUpperCase()
 prenomPere = e[14].toUpperCase()
 adressePere = e[15]
 codePostalPere = e[16]
 villePere = e[17].toUpperCase()
 telephonePere = LibUtil.formatPhone("0"+e[18])
 adresseMailPere= e[19]
 nomMere = e[20].toUpperCase()
 prenomMere = e[21].toUpperCase()
 adresseMere = e[22]
 codePostalMere = e[23]
 villeMere = e[24].toUpperCase()
 telephoneMere = LibUtil.formatPhone("0"+e[25])
 adresseMailMere= e[26]
 nomContact = e[27].toUpperCase()
 prenomContact = e[28].toUpperCase()
 telephoneContact = LibUtil.formatPhone("0"+e[29])
 adresseMailEnvoi = e[30]
 categorie = e[31]
 assurance = e[32]
 coefficient = e[33]
 carteMRA= e[34]
 chequierJeune = e[35]
 nombreCheques = e[36]
 deuxieme = e[37]
 location = e[38]
 chomeur = e[39]
  
// Get document template, copy it as a new temp doc, and save the Doc’s id
LibUtil.loggerDebug("On va ouvrir le doc "+ DocTemplateDetailsId +" et le renommer "+ DocDetailsName+'-'+nom+"-"+prenom)

   var copyId = DriveApp.getFileById(DocTemplateDetailsId)
                .makeCopy(DocDetailsName+'-'+nom+"-"+prenom)
                .getId();
   
  LibUtil.loggerDebug("Apres copie du fichier template")
// Open the temporary document
   var copyDoc = DocumentApp.openById(copyId);
    LibUtil.loggerDebug("Apres ouverture du fichier copié ")

  
// Get the document’s body section
   var copyBody = copyDoc.getActiveSection();
  
// Replace place holder keys,in our google doc template  
copyBody.replaceText('keynom', nom);
copyBody.replaceText('keyprenom', prenom);
copyBody.replaceText('keysexe', sexe);
copyBody.replaceText('keydateNaissance', dateNaissance);
copyBody.replaceText('keynationalite', nationalite);
copyBody.replaceText('keylateralite', lateralite);
copyBody.replaceText('keyprofession', profession);
copyBody.replaceText('keyadresse', adresse);
copyBody.replaceText('keycodePostal', codePostal);
copyBody.replaceText('keyville', ville);
copyBody.replaceText('keytelephone', telephone);
copyBody.replaceText('keymail', mail);
copyBody.replaceText('keypereNom', nomPere);
copyBody.replaceText('keyperePrenom', prenomPere);
copyBody.replaceText('keypereAdresse', adressePere);
copyBody.replaceText('keypereCodePostal', codePostalPere);
copyBody.replaceText('keypereVille', villePere);
copyBody.replaceText('keypereTelephone', telephonePere);
copyBody.replaceText('keymereNom', nomMere);
copyBody.replaceText('keymerePrenom', prenomMere);
copyBody.replaceText('keymereAdresse', adresseMere);
copyBody.replaceText('keymereCodePostal', codePostalMere);
copyBody.replaceText('keymereVille', villeMere);
copyBody.replaceText('keymereTelephone', telephoneMere);
copyBody.replaceText('keycontactNom', nomContact);
copyBody.replaceText('keycontactPrenom', prenomContact);
copyBody.replaceText('keycontactTelephone', telephoneContact);
copyBody.replaceText('keycategorie', categorie);
copyBody.replaceText('keyassurance', assurance);
copyBody.replaceText('keycoefficient', coefficient);
copyBody.replaceText('keycarteMRA', carteMRA);
copyBody.replaceText('keychequierJeune', chequierJeune);
copyBody.replaceText('keycheques', nombreCheques);
copyBody.replaceText('keydeuxieme', deuxieme);
copyBody.replaceText('keylocation', location);
copyBody.replaceText('keychomeur', chomeur);
copyBody.replaceText('keymereMailAdresse', adresseMailMere);
copyBody.replaceText('keypereMailAdresse', adresseMailPere);
copyBody.replaceText('keychomeur', chomeur);

  
// Save and close the temporary document
copyDoc.saveAndClose();
copyDoc = DocumentApp.openById(copyId);
var pdfFile = DriveApp.createFile(copyDoc.getAs("application/pdf"));  
   
LibUtil.driveMoveFileToFolder(pdfFile.getId(), FolderInscriptionsId)

  
LibUtil.loggerDebug("Apres addfile ")



// Delete temp file
          
   DriveApp.getFileById(copyId).setTrashed(true);
  LibUtil.loggerOut("genererDetails")
  return pdfFile.getUrl()
}



/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/

function  genererRecap(nom,prenom,cotisation,licence,location,locationMt, total,cheque1,cheque2,cheque3,numMra,mtMra, chequierON, mtChequier,texteAdditionnel) {
  //Générer le fichier de récap pour la ligne 'v'
/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/
  
  LibUtil.loggerIn("genererRecap")

  
// Get document template, copy it as a new temp doc, and save the Doc’s id
LibUtil.loggerDebug("On va ouvrir le doc "+ DocTemplateRecapId +" et le renommer "+ DocNameRecap+'-'+nom+"-"+prenom)

   var copyId = DriveApp.getFileById(DocTemplateRecapId)
                .makeCopy(DocNameRecap+'-'+nom+"-"+prenom)
                .getId();
  
   
  LibUtil.loggerDebug("Apres copie du fichier template")
// Open the temporary document
   var copyDoc = DocumentApp.openById(copyId);
    LibUtil.loggerDebug("Apres ouverture du fichier copié ")

  
// Get the document’s body section
   var copyBody = copyDoc.getActiveSection();
  
// Replace place holder keys,in our google doc template  
copyBody.replaceText('<<prenom>>', prenom);
copyBody.replaceText('<<nom>>', nom);
copyBody.replaceText('<<cotisation>>', cotisation.toFixed(2));
copyBody.replaceText('<<licence>>', licence.toFixed(2));
copyBody.replaceText('<<locationMt>>', locationMt.toFixed(2));
copyBody.replaceText('<<total>>', total.toFixed(2));
copyBody.replaceText('<<cheque1>>', cheque1.toFixed(2));
copyBody.replaceText('<<cheque2>>', cheque2.toFixed(2));
copyBody.replaceText('<<cheque3>>', cheque3.toFixed(2));
  copyBody.replaceText('<<nummra>>', numMra);
  copyBody.replaceText('<<mtmra>>', mtMra.toFixed(2));
  copyBody.replaceText('<<chequierON>>', chequierON);
  copyBody.replaceText('<<mtchequier>>', mtChequier.toFixed(2));
    copyBody.replaceText('<<texteAdditionnel>>', texteAdditionnel);
  
  LibUtil.loggerDebug("Apres replaceText ")
// Save and close the temporary document

   copyDoc.saveAndClose();
    LibUtil.loggerDebug("Apres saveAndClose ") 
    copyDoc = DocumentApp.openById(copyId);
     var   pdfFile = DriveApp.createFile(copyDoc.getAs("application/pdf"));  
          LibUtil.loggerDebug("Apres pdf ")
          
         LibUtil.driveMoveFileToFolder(pdfFile.getId(), FolderInscriptionsId)


// Delete temp file
          
   DriveApp.getFileById(copyId).setTrashed(true);
  LibUtil.loggerOut("genererRecap")
    return pdfFile.getUrl()

}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function ack2016()
// Cete fonction parcours le fichier des réponses et pour va traiter chaque ligne qui ne l'a pas encore été pour mettre à jour le fichier de suivi des inscriptions
// (ajout d'une ligne si c'est une nouvelle entrée, mise à jour d'une ligne existante)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


{

  
LibUtil.loggerIn("Ack")  

var aTraiter = new Array(100) // Le tableau dans lequel on va noter les lignes à traiter.
var nbATraiter  = 0 // le nombre de ligne à traiter

 /*
 Getion du démaphore d'execution non active à activer plus tard
 if (LibUtil.getParam(SuiviInscriptionsID, "SemaphoreExecution") <1)
    {
      LibUtil.loggerExecution("Execution en cours --> on s'arrete")
              //LibUtil.loggerExecution ("Fin Ack")


      return
    }
    */
  
    
  // On met à jour l'ensemble des URL d'édition
  assignEditUrls()
  

 var form = FormApp.openById(FormID);
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetFormId);

  var l = sheet.getLastRow()
  LibUtil.loggerDebug("lastrow..."+l)
  
  var c=sheet.getRange(3, 1, l, 48) // On selectionne tout le fichier de réponses.
  v = c.getValues()
  
  
for ( var z=0; z<l-2; z++)

{
 // LibUtil.loggerDebug("------- On va traiter la ligne "+z)
 //LibUtil.loggerDebug("------- Ligne "+z+" On compare "+ v[z][0] +"et "+v[z][41]+" et pré inscription : "+v[z][44])
  
    
  if (! ( v[z][0] < v[z][41]) && v[z][44] != "OUI") // si la date de modif est inférieure à la date de génération du récap et que ce n'est pas une pré insription
  {
    
    aTraiter[nbATraiter] = z
    nbATraiter ++ // une ligne de plus à traiter
    
  }
  
}
  // On va demander l'autorisation de traiter
  var msg = "Pas de ligne à traiter"
  if (nbATraiter >0) {msg = "On doit traiter  "+nbATraiter+" lignes"}
  
                                                                                             
   for (var i = 0; i < nbATraiter; i++)
   {
     msg = msg + " "+aTraiter[i]+" ("+v[aTraiter[i]][1]+","+v[aTraiter[i]][2]+")"
   }
  LibUtil.loggerDebug(msg)
  //var reponse=Browser.msgBox('Confirmation', msg, Browser.Buttons.YES_NO);
  reponse = "yes"
  LibUtil.loggerDebug(reponse)
  if (reponse == "yes")
  {
    for (var i = 0; i < nbATraiter; i++)
   {
    LibUtil.loggerDebug("on traite")
    traiter(v[aTraiter[i]])
    var d = new Date();
    sheet.getRange(aTraiter[i]+3,42).setValue(d)
    sheet.getRange(aTraiter[i]+3,43).setValue("JUST DID IT")
    }
  
  }
  else
  {
    LibUtil.loggerDebug("on ne traite pas")
  }
  
  
LibUtil.loggerOut ("Ack")  
}







/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/
function effaceFichiersNom(nom,prenom)
// Cette fonction efface tous les fichiers du drive (recap et détails) pour la personne @nom @prenom
/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/


{
  
  // On va effacer les fichiers de recap
  var nomFichier = DocNameRecap+'-'+nom+"-"+prenom+".pdf"
  var fichiers = DriveApp.getFilesByName(nomFichier)
 var  nb=0
 LibUtil.loggerIn("effaceFichiersNom "+nomFichier)
 while (fichiers.hasNext()) 
 { 
   LibUtil.loggerDebug("On efface");
   var file = fichiers.next(); 
  file.setTrashed(true);

   nb++
 }
  LibUtil.loggerDebug("On a effacé " +nb+ " fichiers avec le nom "+nomFichier)
  
  // On va effacer les fichiers de détails
  var nomFichier = DocDetailsName+'-'+nom+"-"+prenom+".pdf"
  var fichiers = DriveApp.getFilesByName(nomFichier)
 var  nb=0
 while (fichiers.hasNext()) 
 { 
   LibUtil.loggerDebug("On efface");
   var file = fichiers.next(); 
  file.setTrashed(true);

   nb++
 }
  LibUtil.loggerDebug("On a effacé " +nb+ " fichiers avec le nom "+nomFichier)
    LibUtil.loggerOut("effaceFichiersNom")

}

