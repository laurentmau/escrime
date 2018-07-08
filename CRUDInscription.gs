var Inscriptions2017Id = "1mrunf8xzgyVjm0Cd062LC-RHrhpJVHRPK8lTDrhgHDA"

/**
 * cree un objet de type inscription pour etre utilisé ensuite
 * 
 */
function newInscription()
{
	var inscription = {
		nom: "",
		prenom: "",
		dateNaissance: "",
		categorie: "",
		cotisation: "",
		licence: "",
		locMateriel: "",
      mtLocMateriel : "",
		total: "",
		cheque1: "",
		cheque2: "",
		cheque3: "",
		mra: "",
      mtMra: "",
		chequierJeune: "",
      mtChequierJeune :"",
		complet: "",
		dateComplet: "",
		dateLicence: "",
		dateChqJeune: '',
		dateMra: "",
		lienSuivi: "",
		lienRecap: "",
		lienContact: "",
		lienModif: "",
        type : "",
      chomeurEtudiant :""

	}
	return inscription
}

/**
 * Cherche si l'inscription est présente dans la base.
 *
 * Usage example : existeInscription(inscription p)
 * @return : numero de ligne  si l'inscription est trouvée, -1 sinon
 * 
 */
function existeInscription(p)
{

	loggerIn("existeInscription. " + p.nom + " " + p.prenom + " " + Date(p.dateNaissance))
	var spreadsheet = SpreadsheetApp.openById(Inscriptions2017Id);
	var sheet = spreadsheet.getSheetByName('liste');
	var data = sheet.getDataRange().getValues();
	var value = '';
	for (var i = 1; i < data.length; i++)
	{
		// loggerDebug("On teste avec "+data[i][0]+data[i][1]+data[i][3])
		if (data[i][0].toUpperCase() == p.nom.toUpperCase() && data[i][1].toUpperCase() ==
			p.prenom.toUpperCase())
		{
			//&& data[i][3]== Date(dateNaissance)){
			return i;

		}
	}
	return -1;

}

function createInscription(p)

/**
 * cree  une inscription dans la base.
 *
 * Usage example : createInscription(inscription)
 * @return : 0 si le l'inscription est créé, numéro de ligne si déja existant, -1  si erreur
 * 
 */
{
	e = existeInscription(p)
	loggerDebug("existe " + e)
	if (e > 0)
	{
		return e;
	}
	var spreadsheet = SpreadsheetApp.openById(Inscriptions2017Id);
	var sheet = spreadsheet.getSheetByName('liste');
  
  
        // création du lien de suivi
  
        p.lienSuivi  = "https://docs.google.com/forms/d/e/1FAIpQLSdvwAfRL3_FnnfxUwYqobcUjw9LLtBUyXvZizDC3R_5OJ2CEQ/viewform?"+
          "entry.744137187="+p.nom+"&entry.1328293922="+p.prenom
         /*
          if (p.dateComplet!="") 
          {
            p.lienSuivi = p.lienSuivi + "&entry.46813795="+dateFormat(p.dateComplet,"YYYY-MM-DD")
          }
          */
             
	sheet.appendRow([p.nom.toUpperCase(), p.prenom.toUpperCase(), p.categorie, p.cotisation, 
		p.licence,
		p.locMateriel,
		p.total,
		p.cheque1,
		p.cheque2,
		p.cheque3,
		p.mra,
		p.chequierJeune,
		p.complet,            
		p.dateComplet,
		p.dateLicence,
		p.dateChqJeune,
		p.dateMra,
		p.lienSuivi,
        p.lienRecap,
		p.lienContact,
        p.lienModif,
                     p.type,
        p.mtMra,
        p.mtChequierJeune,
        p.mtLocMateriel
	])
    
 

	loggerDebug("Ajout fait")
	return 0;
}
/**
 * efface  une inscription  
 *
 * Usage example : deleteInscription(ninscription)
 * @return : 0 si l'inscription est effacée, -1  si non trouvé
 * 
 */
function deleteInscription(p)
{
	loggerIn("deleteInscription" + p.nom + " " + p.prenom + " " + p.dateNaissance)
	var spreadsheet = SpreadsheetApp.openById(Inscriptions2017Id);
	var sheet = spreadsheet.getSheetByName('liste');
	ligne = existeInscription(p)
	if (ligne > 0)
	{
		loggerDebug("existe on  supprime " + ligne)
		sheet.deleteRow(ligne + 1);
		loggerDebug("suppression done " + ligne)

		return 0;
	}
	loggerDebug(" n'existe pas")

	return -1;
}

function updateInscription(p)
{

	// ex = existeTireur(p)
	// if (existeTireur <0) { return -1}
	deleteInscription(p)
	createInscription(p)
	return 0

}

function readInscription(nom, prenom) 
    {
loggerIn("readInscription "+nom+" "+prenom)
	var p = newInscription()
	p.nom = nom
	p.prenom = prenom
	var spreadsheet = SpreadsheetApp.openById(Inscriptions2017Id);
	var sheet = spreadsheet.getSheetByName('liste');
	ligne = existeInscription(p)
	if (ligne < 0) {
		return -1
	}
   
	var data = sheet.getDataRange().getValues();
		p.categorie= data[ligne][2]
		p.cotisation= data[ligne][3]
		p.licence= data[ligne][4]
		p.locMateriel= data[ligne][5]
      p.mtLocMateriel = data[ligne][21]
		p.total= data[ligne][6]
		p.cheque1= data[ligne][7]
		p.cheque2= data[ligne][8]
		p.cheque3= data[ligne][9]
		p.mra= data[ligne][10]
      p.mtMra= data[ligne][22]
		p.chequierJeune= data[ligne][11]
      p.mtChequierJeune= data[ligne][23]
		p.complet= data[ligne][12]
		p.dateComplet= data[ligne][13]
		p.dateLicence= data[ligne][14]
		p.dateChqJeune = data[ligne][15]
		p.dateMra= data[ligne][16]
		p.lienSuivi= data[ligne][17]
		p.lienRecap= data[ligne][18]
		p.lienContact= data[ligne][19]
		p.lienModif = data[ligne][20]
        		p.type = data[ligne][21]

     

	return p
                    }                  

