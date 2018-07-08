var BaseID = "1qH1CuKgJ-96L36ejXr3iivo5xkV87Fnjy3quy3bknvc"

/**
 * cree un objet de type personne pour etre utilisé ensuite
 * 
 */
function createPersonne() {
	var personne = {
		nom: "",
		prenom: "",
		sexe: "",
		dateNaissance: "",
      categorie : "",
		nationalite: "",
		type: "",
		lateralite: "",
		adresse: "",
		codePostal: "",
		ville: "",
		email: "",
		tel: "",
		nomPere: "",
		prenomPere: "",
		emailPere: "",
		telPere: "",
		nomMere: "",
		prenomMere: "",
		emailMere: "",
		telMere: "",
      emailContact:"",
      inscritCetteAnnee:""
	}
	return personne
}




/**
 * Cherche si un tireur est présent dans la base.
 *
 * Usage example : existeTireur(personne p)
 * @return : numero de ligne  si le tireur est trouvé, -1 sinon
 * 
 */
function existeTireur(p) {

	loggerIn("existeTireur. " + p.nom + " " + p.prenom + " " + Date(p.dateNaissance))
	var spreadsheet = SpreadsheetApp.openById(BaseID);
	var sheet = spreadsheet.getSheetByName('liste');
	var data = sheet.getDataRange().getValues();
	var value = '';
	for (var i = 1; i < data.length; i++) {
		// loggerDebug("On teste avec "+data[i][0]+data[i][1]+data[i][3])
		if (data[i][0].toUpperCase() == p.nom.toUpperCase() && data[i][1].toUpperCase() == p.prenom.toUpperCase()) {
			//&& data[i][3]== Date(dateNaissance)){
          	loggerOut("existeTireur. " + i)

			return i;

		}
	}
  loggerOut("existeTireur. " + "Pas trouvé")
	return -1;

}




function createTireur(p)

/**
 * cree  un tireur dans la base.
 *
 * Usage example : createTireur(tireur)
 * @return : 0 si le tireur est créé, numéro de ligne si déja existant, -1  si erreur
 * 
 */
{
  loggerIn("createTireur")
	e = existeTireur(p)
	// loggerDebug("existe "+e)
	if (e > 0) {
		return e;
	}
  logTireur(p)
	var spreadsheet = SpreadsheetApp.openById(BaseID);
	var sheet = spreadsheet.getSheetByName('liste');
  // On met à jour la categorie
  if (typeof p.dateNaissance != "string") { p.dateNaissance = dateFormat(p.dateNaissance, "DD/MM/YYYY")}
  p.categorie = getCategorie (p.dateNaissance)
  
	sheet.appendRow([p.nom.toUpperCase(), p.prenom.toUpperCase(), p.sexe, p.dateNaissance, p.categorie, p.nationalite, p.type, p.lateralite,
		p.adresse.toUpperCase(), p.codePostal, p.ville.toUpperCase(), p.email,
		formatTelephone(p.tel), p.nomPere.toUpperCase(), p.prenomPere.toUpperCase(),
		formatTelephone(p.telPere), p.emailPere, p.nomMere.toUpperCase(), p.prenomMere.toUpperCase(),
		formatTelephone(p.telMere), p.emailMere,p.emailContact, p.inscritCetteAnnee
	])
	return 0;
}
/**
 * efface  un tireur dans la base.
 *
 * Usage example : effaceTireur(nom, prenom, dateNaissance)
 * @return : 0 si le tireur est effacé, -1  si non trouvé
 * 
 */
function deleteTireur(p) {
	loggerIn("deleteTireur" + p.nom + " " + p.prenom + " " + p.dateNaissance)
	var spreadsheet = SpreadsheetApp.openById(BaseID);
	var sheet = spreadsheet.getSheetByName('liste');
	ligne = existeTireur(p)
	if (ligne > 0) {
		loggerDebug("il existe on le supprime " + ligne)
		sheet.deleteRow(ligne + 1);
		loggerDebug("suppression done " + ligne)

		return 0;
	}
	loggerDebug("il n'existe pas")

	return -1;
}



function updateTireur(p) {

	// ex = existeTireur(p)
	// if (existeTireur <0) { return -1}
	deleteTireur(p)
	createTireur(p)
	return 0


}



                     
function readTireur(nom, prenom) 
                     {

	var p = createPersonne()
	p.nom = nom
	p.prenom = prenom
	var spreadsheet = SpreadsheetApp.openById(BaseID);
	var sheet = spreadsheet.getSheetByName('liste');
	ligne = existeTireur(p)
	if (ligne < 0) {
		return -1
	}

	var data = sheet.getDataRange().getValues();
	p.sexe = data[ligne][2]
    p.dateNaissance = data[ligne][3]
    p.categorie = data[ligne][4]
	p.nationalite = data[ligne][5]
	p.type = data[ligne][6]
	p.lateralite = data[ligne][7]
	p.adresse = data[ligne][8]
	p.codePostal = data[ligne][9]
	p.ville = data[ligne][10]
	p.email = data[ligne][11]
	p.tel = data[ligne][12]
	p.nomPere = data[ligne][13]
	p.prenomPere = data[ligne][14]
	p.emailPere = data[ligne][16]
	p.telPere = data[ligne][15]
	p.nomMere = data[ligne][17]
	p.prenomMere = data[ligne][18]
	p.emailMere = data[ligne][20]
	p.telMere = data[ligne][19]
    p.emailContact=data[ligne[21]]
    p.inscritCetteAnnee=data[ligne[22]]

	return p
                    }                  
                    
  function logTireur(p)
  {
  	loggerDebug(" - - - - - -  - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - ")
  	loggerDebug("Nom " + p.nom)
  	loggerDebug("Prénom " + p.prenom)
    loggerDebug("Sexe " + p.sexe)
  	loggerDebug("Date Naissance " + p.dateNaissance)
  	loggerDebug("Nationalité " + p.nationalite)
  	loggerDebug("Type " + p.type)
  	loggerDebug("Latéralité " + p.lateralite)
  	loggerDebug("Adresse " + p.adresse)
  	loggerDebug("Code Postal " + p.codePostal)
  	loggerDebug("Ville " + p.ville)
  	loggerDebug("email " + p.email)
  	loggerDebug("Téléphone " + p.tel)
  	loggerDebug("Nom Père " + p.nomPere)
  	loggerDebug("Prénom Père " + p.prenomPere)
  	loggerDebug("Email Père " + p.emailPere)
  	loggerDebug("Téléphone Père " + p.telPere)
  	loggerDebug("Nom Mère " + p.nomMere)
  	loggerDebug("Prénom Mère" + p.prenomMere)
  	loggerDebug("Email Mère" + p.emailMere)
  	loggerDebug("Téléphone Mère " + p.telMere)
    loggerDebug("Email Contact  " + p.emailContact)
    loggerDebug("Email Contact  " + p.inscritCetteAnnee)

        

  	loggerDebug(" - - - - - -  - - - - - - - - - - - -")
  }
