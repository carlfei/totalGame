$(document).ready(function () {
    
  for (var k = 1; k < 10; k++) { //crea las img en los div

        var imgA = $("<img>", { src: "img/1.PNG",  width: "45", height: "45", id: "a" + k
        });

        var imgB = $("<img>", {  src: "img/2.PNG",  width: "45", height: "45", id: "b" + k
        });

        $("#" + k).append(imgA); //mete las img
        $("#" + k).append(imgB);

        $("#a" + k).hide();
        $("#b" + k).hide();//oculta las img
  }

});

var theArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var arrayDesordenado = desordenarArray(theArray); //randomizar contenido array
var index = 0;

var bucleInterval, reloadInterval;
var tiempoClick;

function initGame(varNivelSeleccionado) {
  tiempoClick = parseInt(varNivelSeleccionado); //el tiempo que en que va desaparecer la img
  $("#boton").prop("disabled", true);
  $("#boton2").prop("disabled", true);
  bucleInterval = setInterval(functionInterval, 20); //llamadas asincronas a la funcion
  desvanece(index);
}

function functionGetId(varId) { //cada vez que se hace click
  if (varId == arrayDesordenado[index]) { // el id donde se hace click coincide con el id del div

    $("#" + varId).stop(); //para el fadeTo

    jQuery("#" + varId).css("opacity", "1"); //devuelve la opacidad si no no se veria el careto

    $("#a" + varId).show(); //muestra careto sonriente

    desvanece(index++);
  }
}

function desvanece() {
  $("#" + arrayDesordenado[index]).fadeTo(tiempoClick, 0.0);

  tiempoClick = tiempoClick * 0.9; 
}

function functionInterval() { //funcion asincrona, comprueba si algun div a llegado a opacidad 0
  for (var h = 1; h < 10; h++) {
    if ($("#" + h).css("opacity") == 0) { //no ha sido capaz de hacer click
      jQuery("#" + h).css("opacity", "1");
      $("#b" + h).show(); //muestra careto de rabia
      desvanece(index++);
    }
  }

  if (index == 9) { //fin del juego
    clearInterval(bucleInterval); //para el bucle de intervalo
    reloadInterval = setInterval(reloadGame, 2000); //dar un tiempo antes de hacer el reload
  }
}

function desordenarArray(array) {
  return array.sort(() => Math.random() - 0.5); //desordena array, proceso estocastico !
}

function reloadGame() {
  clearInterval(reloadInterval);
  location.reload();
}
