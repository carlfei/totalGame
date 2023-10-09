$(document).ready(function () {
  $("#boton").prop("disabled", true);
  $("#boton2").prop("disabled", true);
  $(".progress").hide(); 
});

var faceNumbers;

var theArray = [];
var arrayDesordenado; //randomizar contenido array
var index = 0;
var bucleInterval,  tooltipInterval, tooltipIntervalFail;
var tiempoClick;
var counterFailures=0;


function initContent(varFaceNumber) {
  faceNumbers = varFaceNumber;

  for (var k = 1; k < faceNumbers; k++) {
    //crea las img en los div

    var automaticDiv = $("<div/>", {
      id: k,
      onclick: "functionGetId($(this).attr('id'))",
      class:"rounded-circle shadow-sm",
      text: k,
    });

    automaticDiv.attr("data-toggle", "tooltip");
    automaticDiv.attr("data-placement", "top");
    automaticDiv.attr("title", "OK!");

    

    $("#" + k).tooltip("hide");

    $(".flex-container").append(automaticDiv);

    var imgA = $("<img>", {
      src: "img/1.PNG",
      width: "45",
      height: "45",
      class:"rounded-circle",
      id: "a" + k
    });
    var imgB = $("<img>", {
      src: "img/2.PNG",
      width: "45",
      height: "45",
      class:"rounded-circle",
      id: "b" + k
    });

    imgB.attr("data-toggle", "tooltip");
    imgB.attr("data-placement", "top");
    imgB.attr("title", "NO!");
    $("#b" + k).tooltip("hide");

    $("#" + k).append(imgA); //mete las img
    $("#" + k).append(imgB);

    $("#a" + k).hide();   //class="bg-primary"
    $("#b" + k).hide(); //oculta las img

    theArray[k] = k;
  }

  $("#boton").prop("disabled", false);
  $("#boton2").prop("disabled", false);
  $("#boton3").prop("disabled", true);

  arrayDesordenado = desordenarArray(theArray);
}

function initGame(varNivelSeleccionado) {

  $('#myModal').modal('hide');
  tiempoClick = parseInt(varNivelSeleccionado); //el tiempo que en que va desaparecer la img

  $("#boton").prop("disabled", true);
  $("#boton2").prop("disabled", true);

  bucleInterval = setInterval(functionInterval, 20); //llamadas asincronas a la funcion
  desvanece(index);
}

function functionGetId(varId) {
  //cada vez que se hace click
  if (varId == arrayDesordenado[index]) {
    $("#" + varId).tooltip("show");
    // el id donde se hace click coincide con el id del div
    tooltipInterval = setInterval(functionStopTooltip, 500, "a", varId);
    $("#" + varId).stop(); //para el fadeTo
    jQuery("#" + varId).css("opacity", "1"); //devuelve la opacidad si no no se veria el careto
    $("#a" + varId).show(); //muestra careto sonriente

    desvanece(index++);
  }
}

function functionStopTooltip(a, b) {
  if (a == "a") {
    $("#" + b).tooltip("hide");
    $("#" + b).addClass("bg-success");

    clearInterval(tooltipInterval);
  }

  if (a == "b") {
    $("#b" + b).tooltip("hide");
 
    clearInterval(tooltipIntervalFail);
  }
}


function desvanece() {
     $("#" + arrayDesordenado[index]).fadeTo(tiempoClick, 0.0);

     tiempoClick = tiempoClick * 0.9;

  
}

function functionInterval() {
  //funcion asincrona, comprueba si algun div a llegado a opacidad 0
  for (var h = 1; h < faceNumbers; h++) {
    if ($("#" + h).css("opacity") == 0) {
      //no ha sido capaz de hacer click
      jQuery("#" + h).css("opacity", "1");
      $("#b" + h).show(); //muestra careto de rabia
      $("#b" + h).tooltip("show");
      
      counterFailures++;
      
      $("#" + h).addClass("bg-warning");
      tooltipInterval = setInterval(functionStopTooltip, 200, "b", h);

      desvanece(index++);
    }
  }

  if (index == faceNumbers - 1) barra();

}

function barra(){
  
  $(".progress").show(); 

  var percentGame =1 - (counterFailures / (faceNumbers - 1));
  percentGame = percentGame * 100;
  
  var automaticDiv = $("<div/>", {
    class: "progress-bar bg-success",
    style: "width:"+percentGame+"%",
    text : (percentGame)+"%"
   });


  
  $(".progress").append(automaticDiv);
  
   automaticDiv = $("<div/>", {
    class: "progress-bar bg-warning",
    style: "width:"+(100-percentGame)+"%",
    text : (100-percentGame)+"%"
 
   });

   $(".progress").append(automaticDiv);
  clearInterval(bucleInterval); //para el bucle de intervalo

}



function desordenarArray(array) {
  return array.sort(() => Math.random() - 0.5); //desordena array, proceso estocastico !
}

function newGame(){
  location.reload();
}