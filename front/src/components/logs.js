const COLORCODELIST = {
  reset : "\x1b[0m",
  bright : "\x1b[1m",
  dim : "\x1b[2m",
  underscore : "\x1b[4m",
  blink : "\x1b[5m",
  reverse : "\x1b[7m",
  hidden : "\x1b[8m",

  fgBlack : "\x1b[30m",
  fgRed : "\x1b[31m",
  fgGreen : "\x1b[32m",
  fgOrange : "\x1b[33m",
  fgYellow : "\x1b[34m",
  fgMagenta : "\x1b[35m",
  fgCyan : "\x1b[36m",
  fgWhite : "\x1b[37m",

  bgBlack : "\x1b[40m",
  bgRed : "\x1b[41m",
  bgGreen : "\x1b[42m",
  bgYellow : "\x1b[43m",
  bgBlue : "\x1b[44m",
  bgMagenta : "\x1b[45m",
  bgCyan : "\x1b[46m",
  bgWhite : "\x1b[47m"

}

function horodater()
{
  var d = new Date(); //Genere une instance d d'un objet de la classe Date()
  var date = ("0" + d.getDate()).slice(-2); //ces fonctions n'ajoute pas de leading zero, si il est 21h03, nous obtiendrons 21 heures 3 minutes
  var mois = ("0" + (d.getMonth()+1)).slice(-2); // afin de rendre ca plus prorpre, j'ajoue un zero devant chaque valeur retourné par ces fonctions
  var heures = ("0" + d.getHours()).slice(-2); // et recupere les deux dernieres valeurs
  var minutes = ("0" + d.getMinutes()).slice(-2); //dans tout les cas nous ne recupererons que les deux derniers caracteres
  var secondes = ("0" + d.getSeconds()).slice(-2); //donc si x = ("0" + "3").slice(-2) -> x = 03
  // si x = ("0" + "10").slice(-2), x = ("010").slice(-2) -> x = 10
  horodatage = date + "/" + mois + "/" + d.getFullYear() + " " + heures + ":" + minutes + ":" + secondes + " : "; //prepare la string contenant la date au format DD/MM/YYYY HH:mm:ss
  return horodatage;
}
module.exports.errorLog = (errorText)=>
{
  console.log(`${COLORCODELIST.blink}${COLORCODELIST.bgRed}${COLORCODELIST.fgBlack}[ERR]${COLORCODELIST.reset} ${horodater()} ${errorText}`)
}
module.exports.infoLog = (infoText)=>
{
  console.log(COLORCODELIST.fgCyan +  "[INFO]" + COLORCODELIST.reset + " " + horodater() + " "  + infoText)
}
module.exports.actionLog = (actionText)=>
{
  console.log(COLORCODELIST.fgYellow + "[ACTION] " + COLORCODELIST.reset + " " + horodater() + " " + actionText)
}
module.exports.consoleLog = (texte) =>
{
  console.log("[LOG] " + horodater() + texte)
}
module.exports.warningLog = (warningText) =>{
  console.log(`${COLORCODELIST.fgBlack}${COLORCODELIST.bgYellow}[WARNING]${COLORCODELIST.reset} ${horodater()} ${warningText}`)
}
module.exports.version = parseFloat(1.1)
