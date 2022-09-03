//Declaramos variables globales
var palabra = null;
var errores = 0;
var array_palabra = new Array();
var array_palabra_auxiliar = new Array();

function comenzar() {
  //Guardamos la palabra secreta
  palabra = document.getElementById("plb_inicio").value.toLowerCase();

  //Quitamos y ponemos palabra, evitamos dejar al descubierto la palabra secreta
  document.getElementById("palabra").value = "";

  //La palabra la convertimos en array con la funcion split
  array_palabra = palabra.split("");

  //Creamos otro array con guiones según la longitud de la palabra
  array_palabra.forEach(() => {
    array_palabra_auxiliar.push("_");
  });

  mostrar_array_aux(array_palabra_auxiliar);

  document.getElementById("plb_inicio").value = "";
}

//Mostrar palabra incompleta
function mostrar_array_aux(aux) {
  aux.forEach((i) => {
    document.getElementById("palabra").value += i + " ";
  });
}

document.addEventListener("keypress", (e) => {
  if (palabra != null) {
    //Guardamos letra pulsada en teclado
    var letra = String.fromCharCode(e.keyCode);

    //Desactivamos letra pulsada en el abecedario
    desactivarLetra(letra);

    document.getElementById("palabra").value = "";

    var letra_incorrecta = true;

    //Comprobar si la letra es correcta o no
    for (let i = 0; i < array_palabra.length; i++) {
      if (array_palabra[i] == letra) {
        array_palabra_auxiliar[i] = letra;
        letra_incorrecta = false;
      }
    }

    mostrar_array_aux(array_palabra_auxiliar);

    //Si la letra es incorrecta cambiamos de imágen
    letra_incorrecta ? cambiar_imagen(++errores) : "";
  }
});

function cambiar_imagen(err) {
  switch (err) {
    case 1:
      document.getElementById("horca").style.visibility = "hidden";
      document.getElementById("cabeza").style.visibility = "visible";
      break;
    case 2:
      document.getElementById("cabeza").style.visibility = "hidden";
      document.getElementById("tronco").style.visibility = "visible";
      break;
    case 3:
      document.getElementById("tronco").style.visibility = "hidden";
      document.getElementById("brz-drch").style.visibility = "visible";
      break;
    case 4:
      document.getElementById("brz-drch").style.visibility = "hidden";
      document.getElementById("brazos").style.visibility = "visible";
      break;
    case 5:
      document.getElementById("brazos").style.visibility = "hidden";
      document.getElementById("prn-izq").style.visibility = "visible";
      break;
    case 6:
      //En este caso, el juego ya se ha acabado
      document.getElementById("prn-izq").style.visibility = "hidden";
      document.getElementById("piernas").style.visibility = "visible";
      document.getElementById("perdedor").style.visibility = "visible";
      document.getElementById("palabra").value =
        "La palabra correcta era: " + palabra;
      break;
    default:
      break;
  }
}

function desactivarLetra(letra) {
  document.getElementById(letra).parentNode.style.backgroundColor = "#64646491";
  document.getElementById(letra).parentNode.style.transform =
    "translateY(10px)";
}

//Cargamos las letras del abecedario de forma dinámica
document.addEventListener("DOMContentLoaded", () => {
  var abc = "abcdefghijklmnñopqrstuvwxyz";

  for (var i = 0; i < abc.length; i++) {
    var letra_abc = abc.charAt(i);
    var nodo = document.createElement("div");
    var sub_nodo = document.createElement("p");
    sub_nodo.setAttribute("id", letra_abc);
    sub_nodo.innerHTML = letra_abc.toUpperCase();
    nodo.appendChild(sub_nodo);
    document.getElementsByClassName("contenedor__letras")[0].appendChild(nodo);
  }
});
