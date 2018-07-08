var FormID = '1AHxg7Y4K265VWa8cW_yG3cbSt1JlO8ukeHZ-TQlB6XM' // Le formulaire de réponse
var SheetFormId = 'Réponses au formulaire 1' // L onglet où sont stockées les réponses
var SuiviInscriptionsID = '1mrunf8xzgyVjm0Cd062LC-RHrhpJVHRPK8lTDrhgHDA' // Le fichier de suivi des inscriptions.
var FolderInscriptionsId = '0By9FaGhQFbEVM012RlhfSlNZcms' // le folder des inscriptions (où seront stockés les fichiers)
var DocTemplateRecapId = "1Pq0IBQr46JGH8kp1pLEmAfLwllP0gyde38VoquKu9Fk"; // template recap
var DocTemplateRecapCardioId = "165IgN9hea97rTITV0ndgg0sxP6UU289TyJOdypP-EQE"; // template recap Cardio

var DocNameRecap = "recap Inscription 2017"; // nom du fichier de recap

/**
 * cree un objet de type ligneInscription pour etre utilisé ensuite
 * 
 */
function newLigneInscription()
{
	var ligneInscription = {
		horodateur: "",
		nom: "",
		prenom: "",
		sexe: "",
		dateNaissance: "",
		nationalite: "",
		lateralite: "",
		adresse: "",
		codePostal: "",
		ville: "",
		telephone: "",
		email: "",
		nomPere: "",
		prenomPere: "",
		telPere: "",
		emailPere: "",
		nomMere: "",
		prenomMere: "",
		telMere: "",
		emailMere: "",
		emailDoc: "",
		categorie: "",
		assurance: "",
		coefFamilial: "",
		mra: "",
		chequierJeune: "",
		nbCheques: "",
		deuxiemeEnfant: "",
		location: "",
		etudiant: "",
		lienModif: "",
		detailGenere: "",
		recapEnvoye: "",
		preInscription: "",
		modifApresRecap: ""

	}
	return ligneInscription
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function ack()
// Cete fonction parcours le fichier des réponses et pour va traiter chaque ligne qui ne l'a pas encore été pour mettre à jour le fichier de suivi des inscriptions
// (ajout d'une ligne si c'est une nouvelle entrée, mise à jour d'une ligne existante)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

{

	LibUtil.loggerIn("Ack")

	var aTraiter = new Array(100) // Le tableau dans lequel on va noter les lignes à traiter.
	var nbATraiter = 0 // le nombre de ligne à traiter

	// On met à jour l'ensemble des URL d'édition
	// assignEditUrls()

	var form = FormApp.openById(FormID);
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetFormId);

	var l = sheet.getLastRow()
	LibUtil.loggerDebug("lastrow..." + l)

	//var c = sheet.getRange(3, 1, l, 48) // On selectionne tout le fichier de réponses.
    	var c = sheet.getRange(187, 1, l, 48) // On selectionne tout le fichier de réponses.

	v = c.getValues()

	LibUtil.loggerDebug("------- avant le for")
	//temporaire
	// l=3;
	for (var z = 0; z < l - 2; z++)

	{
		LibUtil.loggerDebug("------- On va traiter la ligne " + z)
		//LibUtil.loggerDebug("------- Ligne " + z + " On compare " + v[z][0] + "et " +
		//	v[z][41] + " et pré inscription : " + v[z][44])
		
		var ins = LibUtil.newInscription()
        ins.nom = v[z][1]
        ins.prenom = v[z][2]
        
        if (LibUtil.existeInscription(ins) >0)
        {
          LibUtil.loggerDebug("Inscription de "+ins.nom+" " +ins.prenom+" existe")
        }
      else
      {
        var ligne = newLigneInscription();
		ligne.horodateur = v[z][0]
		ligne.nom = v[z][1]
		ligne.prenom = v[z][2]
		ligne.sexe = v[z][3]
		ligne.dateNaissance = v[z][4]
		ligne.nationalite = v[z][5]
		ligne.lateralite = v[z][6]
		ligne.adresse = v[z][7]
		ligne.codePostal = v[z][8]
		ligne.ville = v[z][9]
		ligne.telephone = v[z][10]
		ligne.email = v[z][11]
		ligne.nomPere = v[z][12]
		ligne.prenomPere = v[z][13]
		ligne.telephonePere = v[z][14]
		ligne.emailPere = v[z][15]
		ligne.nomMere = v[z][16]
		ligne.prenomMere = v[z][17]
		ligne.telephoneMere = v[z][18]
		ligne.emailMere = v[z][19]
		ligne.emailDoc = v[z][23]
		ligne.categorie = v[z][24]
		ligne.assurance = v[z][25]
		ligne.coefFamilial = v[z][26]
		ligne.mra = v[z][27]
		ligne.chequierJeune = v[z][28]
		ligne.nbCheques = v[z][29]
		ligne.deuxiemeEnfant = v[z][30]
		ligne.location = v[z][31]
		ligne.etudiant = v[z][32]
		ligne.detailGenere = v[z][34]
		ligne.recapEnvoye = v[z][35]
		ligne.preInscription = v[z][36]
		ligne.modifApresRecap = v[z][37]
		LibUtil.loggerDebug("Nom " + ligne.nom + "| tel du pere " + ligne.telephonePere +
			" | coef familial  " + ligne.coefFamilial + " | mra  " + ligne.mra)
      
                LibUtil.loggerDebug("Inscription de "+ligne.nom+" " +ligne.prenom+" n'existe pas")

        
        
        ligne.lienModif = getEditUrl(ligne)

        traiter(ligne)
      }
        
      /*
        if (!(ligne.horodateur < ligne.detailGenere) && ligne.preInscription !=
			"OUI") // si la date de modif est inférieure à la date de génération du récap et que ce n'est pas une pré insription
		{
			traiter(ligne)
			var d = new Date();
			sheet.getRange(z + 3, 35).setValue(d)
			sheet.getRange(z + 3, 43).setValue("JUST DID IT")

		}
        */
	}

	LibUtil.loggerOut("Ack")
}

function traiter(ligne)
{
	LibUtil.loggerIn("traiter")
	LibUtil.loggerDebug("On traite " + ligne.nom + " " + ligne.prenom)
	// On met à jour la base des tireurs
	tireur = LibUtil.createPersonne()
	tireur.nom = ligne.nom
	tireur.prenom = ligne.prenom
	tireur.sexe = ligne.sexe
	tireur.dateNaissance = ligne.dateNaissance
	tireur.nationalite = ligne.nationalite
	tireur.type = ligne.type
	tireur.lateralite = ligne.lateralite
	tireur.adresse = ligne.adresse
	tireur.codePostal = ligne.codePostal
	tireur.ville = ligne.ville
	tireur.email = ligne.email
	tireur.tel = ligne.telephone
	tireur.nomPere = ligne.nomPere
	tireur.prenomPere = ligne.prenomPere
	tireur.emailPere = ligne.emailPere
	tireur.telPere = ligne.telephonePere
	//LibUtil.loggerDebug("tel du pere " + ligne.telephonePere + " " + tireur.telPere)

	tireur.nomMere = ligne.nomMere
	tireur.prenomMere = ligne.prenomMere
	tireur.emailMere = ligne.emailMere
	tireur.telMere = ligne.telephoneMere
    tireur.emailContact = ligne.emailDoc
    tireur.inscritCetteAnnee = "OUI"
	

	// On regarde si le tireur existe
	e = LibUtil.existeTireur(tireur)
	if (e == -1)
	{
		// C'est un nouveau tireur
      LibUtil.loggerJournal("Nouveau Tireur |"+tireur.nom +" "+tireur.prenom+ " "+tireur.dateNaissance )

	}

	LibUtil.updateTireur(tireur)
//LibUtil.loggerDebug("Apres update Tireur")

	var inscription = LibUtil.newInscription()
   
    inscription.complet =  "INCOMPLET"

	inscription.nom = ligne.nom
	inscription.prenom = ligne.prenom
	inscription.dateNaissance = ligne.dateNAissance
	inscription.mra = ligne.mra
	inscription.chequierJeune = ligne.chequierJeune
	inscription.locMateriel = ligne.locMateriel
	inscription.lienModif = ligne.lienModif
 //   LibUtil.loggerDebug("liens "+inscription.lienModif+ " "+ligne.lienModif)
    inscription.type = ligne.categorie
    inscription.chomeurEtudiant =  ligne.etudiant
//LibUtil.loggerDebug("Avant categorie 0")
  if (typeof ligne.dateNaissance != "string") { ligne.dateNaissance = LibUtil.dateFormat(ligne.dateNaissance, "DD/MM/YYYY")}
  
inscription.categorie = LibUtil.getCategorie(ligne.dateNaissance) // calcul de la catégorie en fonction de la date de naissance (pupille, ..)
inscription.cotisation = LibUtil.getCotisation(inscription.categorie, ligne.coefFamilial, ligne.ville, ligne.categorie, ligne.deuxiemeEnfant, ligne.etudiant) // Calcul cotisation
	if (inscription.type == "Section Handisport" || inscription.type == "Cardio")
	{
		inscription.licence = 0
	}
  else
  {
    	inscription.licence = +LibUtil.getLicence("P", inscription.categorie) // Calcul Licence

  }
    
    inscription.locMateriel = ligne.location
	inscription.mtLocMateriel = 0;
	if (ligne.location == "Oui")
	{
		inscription.mtLocMateriel = 15

	} // montant location

	inscription.total = inscription.cotisation + inscription.licence +
		inscription.mtLocMateriel
	//LibUtil.loggerDebug("Total : " + inscription.total)
	inscription.mtMra = 0
	inscription.mtChequierJeune = 0
	if (ligne.mra != "")
	{
		inscription.mtMra = 30
	} // carte mra ?
	if (ligne.chequierJeune == "Oui")
	{
		inscription.mtChequierJeune = 15
	} // chéquier jeune ?

	var reste = inscription.cotisation - inscription.mtMra - inscription.mtChequierJeune
//	LibUtil.loggerDebug("Reste = " + inscription.cotisation + "- " + inscription.mtMra +
		//"-" + inscription.mtChequierJeune)
	inscription.cheque1 = inscription.licence + inscription.mtLocMateriel
	//LibUtil.loggerDebug("Cheque 1 = licence " + inscription.licence + "+ loc " +
		//inscription.mtLocMateriel)
	if (ligne.type == "Section Handisport")
	{
		reste = 0
	} // Si handisport, la cotisation sera payée par un organisme externe
	inscription.cheque2 = 0
	inscription.cheque3 = 0
	//LibUtil.loggerDebug("cheques 1 2 3  : " + inscription.cheque1 + " " +
		//inscription.cheque2 + " " +
		//inscription.cheque3 + " nombreCheque " + ligne.nbCheques)

	if (ligne.nbCheques == 0)
	{
		ligne.nbCheques = 1
	}
	if (ligne.nbCheques == 1)
	{
		inscription.cheque1 = inscription.cheque1 + reste
	}
	//LibUtil.loggerDebug("cheques 1 2 3  : " + inscription.cheque1 + " " +
	//	inscription.cheque2 + " " +
	//	inscription.cheque3)

	var parCheque = reste / ligne.nbCheques
	//LibUtil.loggerDebug("parCheque " + parCheque)
	if (ligne.nbCheques == 2)
	{
		//LibUtil.loggerDebug("avant pow")
		inscription.cheque1 = inscription.cheque1 + Math.floor(parCheque);
		//LibUtil.loggerDebug("apres pow")
		inscription.cheque2 = reste - inscription.cheque1 + inscription.licence +
			inscription.mtLocMateriel
	}
	//LibUtil.loggerDebug("cheques 1 2 3  : " + inscription.cheque1 + " " +
		//inscription.cheque2 + " " +
		//inscription.cheque3)
	if (ligne.nbCheques == 3)
	{
		inscription.cheque1 = inscription.cheque1 + Math.floor(parCheque);
		inscription.cheque2 = Math.floor(parCheque);
		inscription.cheque3 = reste - inscription.cheque1 - inscription.cheque2 +
			inscription.licence + inscription.mtLocMateriel
	}

	//LibUtil.loggerDebug("cheques 1 2 3  : " + inscription.cheque1 + " " +
	//	inscription.cheque2 + " " +
		//inscription.cheque3)
    
    	inscription.lienRecap = genererRecap(inscription)   
    	
    //LibUtil.loggerDebug("lien Modif "+inscription.lienModif)
	e = LibUtil.createInscription(inscription)
	if (e > 0)
	{
          LibUtil.loggerJournal("Mise à Jour Inscription | " + tireur.nom + " " +tireur.prenom)

		LibUtil.updateInscription(inscription)
	}
  else
  {
    LibUtil.loggerJournal("Nouvelle Inscription | " + tireur.nom + " " +tireur.prenom)
  }
  
  // On envoie l'email de recap
   var subject = "Meylan Escrime - Etapes suivantes pour l'inscription de "+ tireur.nom+ " "+tireur.prenom;
                    
   
      var body    = "Bonjour, <br><br>Nous avons bien reçu votre demande d'inscription pour " + tireur.nom+ " "+tireur.prenom+
        " à Meylan Escrime et nous vous en remercions.<br>"+
          "La marche à suivre pour finaliser l'inscription se trouve dans le fichier joint.<br>"+
            "Pour toutes questions, n'hésitez-pas à répondre à cet e-mail.<br><br>"+
              "A très bientôt<br><br>L'équipe de Meylan Escrime.";
   
   var nomFichier = DocNameRecap+'-'+tireur.nom+"-"+tireur.prenom+".pdf"
      var fichiers = DriveApp.getFilesByName(nomFichier)
      var nb=0
      var attachement
      while (fichiers.hasNext()) 
      { 
        var attachement = fichiers.next(); 
        nb++}
      //LibUtil.loggerDebug("On a trouvé " +nb+ " fichiers avec le nom "+nomFichier)
    
    if (nb !=1)
    {
      LibUtil.loggerDebug("Il y a plus "+nb+" fichiers pour "+nomFichier+" email non envoyé")
      subject = "ERREUR "+subject +"( "+nb+" fichiers trouvés"
      
      MailApp.sendEmail("inscriptions.meylanescrime@gmail.com",subject, body, {name: "Inscription Meylan Escrime", from:"inscriptions.meylanescrime@gmail.com", replyTo:"inscriptions.meylanescrime@gmail.com"})
    }
    else
  
                        {
 MailApp.sendEmail(tireur.emailContact,subject, body, {name: "Inscription Meylan Escrime", from:"inscriptions.meylanescrime@gmail.com", replyTo:"inscriptions.meylanescrime@gmail.com" ,htmlBody: body, attachments:attachement}); 
       // MailApp.sendEmail("laurent.maumet@gmail.com",subject, body, {name: "Inscription Meylan Escrime", from:"inscriptions.meylanescrime@gmail.com", replyTo:"inscriptions.meylanescrime@gmail.com" ,htmlBody: body, attachments:attachement}); 

                        }

	LibUtil.loggerOut("traiter")

}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function assignEditUrls()
// Parcours le fichier de résultat du form et rempli la colonne 49 avec le lien de modification
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

{

	var form = FormApp.openById(FormID);
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetFormId);
	var data = sheet.getDataRange().getValues();
	var urlCol = 40;
	var responses = form.getResponses();
	var timestamps = [],
		urls = [],
		resultUrls = [];
	LibUtil.loggerIn("assignEditUrls")
	LibUtil.loggerDebug("Il y a " + responses.length + " reponses")

	for (var i = 0; i < responses.length; i++)
	{
     // LibUtil.loggerDebug("data : "+data[i][urlCol-1])
      /*  if (data[i][urlCol] != "")
        {
          // on a deja la valeur
          timestamps.push(data[i][0]);
		urls.push(data[i][urlCol-1]);
        }
      else
      {
      */
        
		timestamps.push(responses[i].getTimestamp().setMilliseconds(0));
		urls.push(responses[i].getEditResponseUrl());
    //  }
	}
  	LibUtil.loggerIn("entre les 2 boucles")

  

	for (var j = 2; j < data.length; j++)
	{
		//   LibUtil.loggerDebug("on traite j "+j)
		//  LibUtil.loggerDebug(responses[i])

		resultUrls.push([data[j][0] ? urls[timestamps.indexOf(data[j][0].setMilliseconds(
			0))] : '']);
	}
	LibUtil.loggerDebug("On met à jour l URL en colonne " + urlCol +
		"pour un nb d'URL de " + resultUrls.length)

	sheet.getRange(3, urlCol, resultUrls.length).setValues(resultUrls);
	LibUtil.loggerOut("assignEditUrls")

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// Renvoie l'url d'edition
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function getEditUrl(ligne)

{

	var form = FormApp.openById(FormID);
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetFormId);
	var data = sheet.getDataRange().getValues();
	var urlCol = 34;
	var responses = form.getResponses();
  
	var timestamps = [],
		urls = [],
		resultUrls = [];
	LibUtil.loggerIn("getEditUrl")

	// on retourne l'url de la derniere reponse
      d = new Date(ligne.horodateur).valueOf()

	for (var i = 0; i < responses.length; i++)
	{
      
      var formResponse = responses[i];
   var itemResponses = formResponse.getItemResponses();
      var vnom= itemResponses[0].getResponse()
      var vprenom = itemResponses[1].getResponse()
    //  LibUtil.loggerDebug("nom "+vnom+" prénom "+vprenom)
    //  LibUtil.loggerDebug("On compare"+ vnom+" et "+ligne.nom+" / "+vprenom+ " et "+ligne.prenom)
     if (vnom==ligne.nom && vprenom==ligne.prenom)
       
		
		{
			LibUtil.loggerDebug("Trouve !" + responses[i].getEditResponseUrl())
LibUtil.loggerOut("getEditUrl")
			return responses[i].getEditResponseUrl()
		}

	}
	LibUtil.loggerDebug(" pas Trouve !")
	return 'PAS TROUVE'
	LibUtil.loggerOut("getEditUrl")

}

function myOnSubmitHandler(e)
{
	LibUtil.loggerDebug("Debut On submit ")
	//MailApp.sendEmail('laurent.maumet@gmail.com', 'test values', JSON.stringify(e));
	// rest of your code
	ligne = newLigneInscription();
	ligne.horodateur = e.values[0]
	LibUtil.loggerDebug("horodateur " + ligne.horodateur)
    
    var form = FormApp.openById(FormID);
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetFormId);

	var l = sheet.getLastRow()
	LibUtil.loggerDebug("lastrow..." + l)

	var c = sheet.getRange(e.range.rowStart, 1, e.range.rowStart, 48) // On selectionne tout le fichier de réponses.
	v = c.getValues()
    ligne = newLigneInscription();
		ligne.horodateur = v[0][0]
		ligne.nom = v[0][1]
		ligne.prenom = v[0][2]
		ligne.sexe = v[0][3]
		ligne.dateNaissance = v[0][4]
		ligne.nationalite = v[0][5]
		ligne.lateralite = v[0][6]
		ligne.adresse = v[0][7]
		ligne.codePostal = v[0][8]
		ligne.ville = v[0][9]
		ligne.telephone = v[0][10]
		ligne.email = v[0][11]
		ligne.nomPere = v[0][12]
		ligne.prenomPere = v[0][13]
		ligne.telephonePere = v[0][14]
		ligne.emailPere = v[0][15]
		ligne.nomMere = v[0][16]
		ligne.prenomMere = v[0][17]
		ligne.telephoneMere = v[0][18]
		ligne.emailMere = v[0][19]
		ligne.emailDoc = v[0][23]
		ligne.categorie = v[0][24]
		ligne.assurance = v[0][25]
		ligne.coefFamilial = v[0][26]
		ligne.mra = v[0][27]
		ligne.chequierJeune = v[0][28]
		ligne.nbCheques = v[0][29]
		ligne.deuxiemeEnfant = v[0][30]
		ligne.location = v[0][31]
		ligne.etudiant = v[0][32]
        ligne.lienModif = getEditUrl(ligne)
		ligne.detailGenere = v[0][34]
		ligne.recapEnvoye = v[0][35]
		ligne.preInscription = v[0][36]
		ligne.modifApresRecap = v[0][37]
		LibUtil.loggerDebug("Nom " + ligne.nom + "| tel du pere " + ligne.telephonePere +
			" | coef familial  " + ligne.coefFamilial + " | mra  " + ligne.mra)

    
    
    
/*
	ligne.nom = e.values[1]
	LibUtil.loggerDebug("apres")

	LibUtil.loggerDebug("nom " + ligne.nom)

	ligne.prenom = e.values[2]
	ligne.sexe = e.values[3]
	ligne.dateNaissance = e.values[4]
	ligne.nationalite = e.values[5]
	ligne.lateralite = e.values[6]
	ligne.adresse = e.values[7]
	ligne.codePostal = e.values[8]
	ligne.ville = e.values[9]
	ligne.telephone = e.values[10]
	ligne.email = e.values[11]
	ligne.nomPere = e.values[12]
	ligne.prenomPere = e.values[13]
	ligne.telephonePere = e.values[14]
	ligne.emailPere = e.values[15]
	ligne.nomMere = e.values[16]
	ligne.prenomMere = e.values[17]
	ligne.telephoneMere = e.values[18]
	ligne.emailMere = e.values[19]
	ligne.emailDoc = e.values[23]
	ligne.categorie = e.values[24]
	ligne.assurance = e.values[25]
	ligne.coefFamilial = e.values[26]
	ligne.mra = e.values[27]
	ligne.chequierJeune = e.values[28]
	ligne.nbCheques = e.values[29]
	ligne.deuxiemeEnfant = e.values[30]
	ligne.location = e.values[31]
	ligne.etudiant = e.values[32]
    
	LibUtil.loggerDebug("avant get url")

	ligne.lienModif = getEditUrl(ligne)
    */
	LibUtil.loggerDebug("url " + ligne.lienModif + "("+ligne.nom+ligne.prenom+")")

	traiter(ligne)

}

/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/

//Générer le fichier de récap pour la ligne 'v'
/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/

function genererRecap(inscription)
{
	LibUtil.loggerIn("genererRecap")
	effaceFichiersNom(inscription.nom, inscription.prenom)
	// Get document template, copy it as a new temp doc, and save the Doc’s id
	LibUtil.loggerDebug("On va ouvrir le doc " + DocTemplateRecapId +
		" et le renommer " + DocNameRecap + '-' + inscription.nom + "-" +
		inscription.prenom)
	
    if (inscription.type == "Cardio")
    {
      templ=DocTemplateRecapCardioId
    }
  else
  {
    templ = DocTemplateRecapId
  }
    
    var copyId = DriveApp.getFileById(templ)
		.makeCopy(DocNameRecap + '-' + inscription.nom + "-" + inscription.prenom)
		.getId();
  
  

	LibUtil.loggerDebug("Apres copie du fichier template")
	// Open the temporary document
	var copyDoc = DocumentApp.openById(copyId);
	LibUtil.loggerDebug("Apres ouverture du fichier copié ")

	// Get the document’s body section
	var copyBody = copyDoc.getActiveSection();

	// Replace place holder keys,in our google doc template 
  copyBody.replaceText('<<categorie>>', inscription.categorie);
	copyBody.replaceText('<<prenom>>', inscription.prenom);
	copyBody.replaceText('<<nom>>', inscription.nom);
	copyBody.replaceText('<<cotisation>>', inscription.cotisation.toFixed(2));
	copyBody.replaceText('<<licence>>', inscription.licence.toFixed(2));
	copyBody.replaceText('<<locationMt>>', inscription.mtLocMateriel.toFixed(2));
	copyBody.replaceText('<<total>>', inscription.total.toFixed(2));
	copyBody.replaceText('<<cheque1>>', inscription.cheque1.toFixed(2));
	copyBody.replaceText('<<cheque2>>', inscription.cheque2.toFixed(2));
	copyBody.replaceText('<<cheque3>>', inscription.cheque3.toFixed(2));
	copyBody.replaceText('<<nummra>>', inscription.mra);
	copyBody.replaceText('<<mtmra>>', inscription.mtMra.toFixed(2));
	copyBody.replaceText('<<chequierON>>', inscription.chequierJeune);
	copyBody.replaceText('<<mtchequier>>', inscription.mtChequierJeune.toFixed(2));
  var texte =[];
    if (inscription.cheque2 == 0) 
    {
      texte[0] = "1 chèque de "+inscription.cheque1.toFixed(2)+ "€"
    }
  if  (inscription.cheque2 > 0 )
  {
    texte[0] = "1 chèque de "+inscription.cheque1.toFixed(2)+ "€ et 1 chèque de "+inscription.cheque2.toFixed(2)+ "€" 
  }
  if (inscription.cheque3 > 0)
  {
    texte[0] ="1 chèque de "+inscription.cheque1.toFixed(2)+ "€ , 1 chèque de "+inscription.cheque2.toFixed(2)+ "€ et 1 chèque de "+inscription.cheque3.toFixed(2)+ "€"
  }
  texte[0] = texte[0] + " (en indiquant au dos de chaque chèque les nom et prénom du tireur)"
  copyBody.replaceText('<<texte0>>', texte[0])
  nbTexte = 1
  
  if (inscription.mtLocMateriel >0)
  {
    texte[nbTexte] = "Un chèque de 150 € de caution qui ne sera pas débité (caution pour la location du matériel)."
    copyBody.replaceText('<<texte'+nbTexte+'>>', texte[nbTexte])
    nbTexte++
  }
  if (inscription.mtChequierJeune >0)
  {
    texte[nbTexte] = "Le chèque jeune  (si vous ne l’avez pas encore, faire un chèque de 15 € qui servira de caution en attendant)"
    copyBody.replaceText('<<texte'+nbTexte+'>>', texte[nbTexte])
    nbTexte++
    
  }
  LibUtil.loggerDebug ("type  "+inscription.type+"Categorie"+ inscription.categorie +"Chomeur "+ inscription.chomeurEtudiant)
  if (inscription.type == "Escrime sportive" && inscription.categorie != "M7" && inscription.chomeurEtudiant != "Oui")
  {
    texte[nbTexte] = "Votre attestation de coefficient familial"
    copyBody.replaceText('<<texte'+nbTexte+'>>', texte[nbTexte])
  }
  
  copyBody.replaceText('<<texte1>>', "")
 copyBody.replaceText('<<texte2>>', "")
  copyBody.replaceText('<<texte3>>', "")
   copyBody.replaceText('<<texte4>>', "")

	LibUtil.loggerDebug("Apres replaceText ")
	// Save and close the temporary document

	copyDoc.saveAndClose();
	LibUtil.loggerDebug("Apres saveAndClose ")
	copyDoc = DocumentApp.openById(copyId);
	var pdfFile = DriveApp.createFile(copyDoc.getAs("application/pdf"));
	LibUtil.loggerDebug("Apres pdf ")

	LibUtil.driveMoveFileToFolder(pdfFile.getId(), FolderInscriptionsId)

	// Delete temp file

	DriveApp.getFileById(copyId).setTrashed(true);
	LibUtil.loggerOut("genererRecap")
	return pdfFile.getUrl()

}

/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/
function effaceFichiersNom(nom, prenom)
// Cette fonction efface tous les fichiers du drive (recap et détails) pour la personne @nom @prenom
/*- - - - - - - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -- - - - -*/

{

	// On va effacer les fichiers de recap
	var nomFichier = DocNameRecap + '-' + nom + "-" + prenom + ".pdf"
	var fichiers = DriveApp.getFilesByName(nomFichier)
	var nb = 0
	LibUtil.loggerIn("effaceFichiersNom " + nomFichier)
	while (fichiers.hasNext())
	{
		LibUtil.loggerDebug("On efface");
		var file = fichiers.next();
		file.setTrashed(true);

		nb++
	}
	LibUtil.loggerDebug("On a effacé " + nb + " fichiers avec le nom " +
		nomFichier)

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