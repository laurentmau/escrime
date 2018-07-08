var SuiviInscriptionsID = '1mrunf8xzgyVjm0Cd062LC-RHrhpJVHRPK8lTDrhgHDA' // Le fichier de suivi des inscriptions.

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getLicence(assurance, categorie)

// Détermination du cout de la licence
// assurance : le type d'assurance choisi
// categorie : la date de naissance
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
{

	loggerIn("getLicence " + assurance + ";" + categorie)

	var suiviIncriptions = SpreadsheetApp.openById(SuiviInscriptionsID);
	var sheet = suiviIncriptions.getSheetByName("paramLicence");

	var licence = "-10000"
	var base = sheet.getRange(1, 1)
	last = sheet.getLastRow()
	var decalage = 1

	switch (assurance)
	{

		case "P":
			decalage = 1;
			break;
		case 0:
			decalage = 2;
			break;
		case "+":
			decalage = 3;
			break;
		default:
			decalage = 4;
			break;
	}
	decalage = 2

	for (var i = last - 1; i >= 0; i--)
	{

		// loggerDebug("On compare " +base.offset(i,0).getValue().valueOf() + " et "+ categorie)
		if (base.offset(i, 0).getValue().valueOf() == categorie)
		{
			licence = base.offset(i, decalage).getValue()
		}

		// loggerDebug(" Licence : "+licence);

	}
	loggerOut("getLicence");

	return licence;

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getCategorie(n)
// Détermine la tatégorie en fonction de l'année de naissance
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

{
	loggerIn("getCategorie n = "+n)

	var suiviIncriptions = SpreadsheetApp.openById(SuiviInscriptionsID);
	var sheet = suiviIncriptions.getSheetByName("paramCategories");
	var dateParts = n.split("/");

var naissance = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); 
    var anneeNaissance = naissance.getFullYear()  

	categorie = "INCONNUE"
	var base = sheet.getRange(1, 1)
	last = sheet.getLastRow()

	for (var i = last - 1; i >= 0; i--)
	{

	//	loggerDebug("On compare" + base.offset(i, 1).getValue() + " " + base.offset(i, 1).getValue().valueOf().toString() + " <=" + n + " " + naissance.valueOf().toString())
	//	loggerDebug("On copare vraiment "+base.offset(i, 1).getValue().valueOf()+"<="+naissance.valueOf())
	//	if (base.offset(i, 1).getValue().valueOf() <= naissance.valueOf())
   //   loggerDebug("On compare "+base.offset(i,1).getValue().getFullYear()+" <= "+anneeNaissance)
      if (base.offset(i,1).getValue().getFullYear() <= anneeNaissance)
		{
          
	//	loggerDebug("La réponse est OUI donc  On change Categorie : " + base.offset(i, 0).getValue().valueOf())
			categorie = base.offset(i, 0).getValue()
            g=i
		}
      else
      {
     //   loggerDebug("La réponse est NON")
      }
      

	}
  categorie = base.offset(g, 0).getValue()

	//loggerDebug(" Categorie : " + categorie);
loggerOut("getCategorie "+categorie);

	return categorie;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getCotisation(categorie, coef, ville, type, deuxieme, chomeur)
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
{

	loggerIn("getCotisation");

	var suiviIncriptions = SpreadsheetApp.openById(SuiviInscriptionsID);
	var sheet = suiviIncriptions.getSheetByName("paramCotisation");

	loggerDebug("categorie " + categorie + " coef " + coef + " type  " +
		type + " deuxieme " + deuxieme + " chomeur " + chomeur)

	offsetColonne = 1

	offsetLigne = -1;
	if (chomeur == "Oui")
	{
		offsetLigne = 6
	};
	if (type == "Loisirs Adulte")
	{
		offsetLigne = 7
	}
	if (categorie == "M7" ||categorie == "M5" )
	{
		offsetLigne = 8
	}
	if (type == "Section Handisport")
	{
		offsetLigne = 9
	}
	if (type == "CREFED, INSEP, PFJ" || type == "Extérieur")
	{
		offsetLigne = 10
	}
  if (type == "Cardio")
	{
		offsetLigne = 11
	}
  
	if (offsetLigne == -1)
	{
		switch (coef)
		{

			case "T1-T2 ( <546 )":
				offsetLigne = 1;
				break;
			case "T3-T4 ( 546-875 )":
				offsetLigne = 2;
				break;
			case "T5-T6 ( 876-1205 )":
				offsetLigne = 3;
				break;

			case "T7-T8 ( >1205 )":
				offsetLigne = 4;
				break;
			case "Hors Quotient":
				offsetLigne = 5;
				break;

			default:
				offsetLigne = 9;
				break;
		}

	}

	var base = sheet.getRange(1, 1)
	c = base.offset(offsetLigne, offsetColonne).getValue()
	loggerDebug("On prend la valeur " + offsetLigne + ";" + offsetColonne +
		" = " + c)

	if (deuxieme == "Oui")
	{
		c = c * 0.9
	}

	loggerOut("getCotisation");
	return c

}