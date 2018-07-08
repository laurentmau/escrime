function importFromInscriptions2016() {

  loggerIn("importFromInscriptions2016. ")
  var spreadsheet = SpreadsheetApp.openById("1nDnzHx1atnsorYy97SMi7nHlvFGQboYP28LwtCE2bio");
  var sheet = spreadsheet.getSheetByName('tmp');
  var data = sheet.getDataRange().getValues();
  var value = '';
  p=createPersonne();
  for (var i=2 ;data.length ; i++) 
  {
    p.nom = data[i][1]
    p.prenom  = data[i][2]
    p.dateNaissance = data[i][4]
    p.sexe = data[i][3]
    p.nationalite  = data[i][5]
  p.lateralite = data[i][6]
  p.adresse = data[i][8]
  p.codePostal = data[i][9]
  p.ville = data[i][10]
  p.email = data[i][12]
  p.tel = data[i][11]
  p.nomPere =data[i][13]
  p.prenomPere = data[i][14]
  p.emailPere = data[i][19]
  p.telPere = data[i][18]
  p.nomMere = data[i][20]
  p.prenomMere = data[i][21]
  p.emailMere = data[i][26]
  p.telMere= data[i][25]
    
    
    updateTireur(p)
   
  } /// end For
}