$(() => {
  var palabra = null;
  var errores = 0;
  var array_palabra = new Array();
  var array_palabra_auxiliar = new Array();

  $("#comenzar").on("click", () => {
    //Guardamos la palabra secreta
    palabra = $("#plb_inicio").val().toLowerCase();

    //Quitamos y ponemos palabra, evitamos dejar al descubierto la palabra secreta
    $("#plb_inicio").val("");

    //La palabra la convertimos en array
    array_palabra = palabra.split("");

    //Creamos otro array con guiones según la longitud de la palabra
    array_palabra.forEach(() => {
      array_palabra_auxiliar.push("_");
    });

    mostrar_array_aux(array_palabra_auxiliar);

    $("#plb_inicio").val("");

    $(document).on("keypress", (e) => {
      if (palabra != null) {
        //Guardamos letra pulsada en teclado
        var letra = String.fromCharCode(e.keyCode);

        //Desactivamos letra pulsada en el abecedario
        desactivarLetra(letra);

        $("#palabra").val("");

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
          $("#horca").css("visibility", "hidden");
          $("#cabeza").css("visibility", "visible");
          break;
        case 2:
          $("#cabeza").css("visibility", "hidden");
          $("#tronco").css("visibility", "visible");
          break;
        case 3:
          $("#tronco").css("visibility", "hidden");
          $("#brz-drch").css("visibility", "visible");
          break;
        case 4:
          $("#brz-drch").css("visibility", "hidden");
          $("#brazos").css("visibility", "visible");
          break;
        case 5:
          $("#brazos").css("visibility", "hidden");
          $("#prn-izq").css("visibility", "visible");
          break;
        case 6:
          //En este caso, el juego ya se ha acabado
          $("#prn-izq").css("visibility", "hidden");
          $("#piernas").css("visibility", "visible");
          $("#perdedor").css("visibility", "visible");
          $("#palabra").val("La palabra correcta era: " + palabra);
          break;
        default:
          break;
      }
    }

    function desactivarLetra(letra) {
      $("#" + letra)
        .parent()
        .css({
          backgroundColor: "#64646491",
          transform: "translateY(10px)",
        });
    }
  });
  //Mostrar palabra incompleta
  function mostrar_array_aux(aux) {
    aux.forEach((i) => {
      $("#palabra").val(() => {
        return $("#palabra").val() + i + " ";
      });
    });
  }
});

//Cargamos las letras del abecedario de forma dinámica
$(() => {
  var abc = "abcdefghijklmnñopqrstuvwxyz";

  for (var i = 0; i < abc.length; i++) {
    var letra_abc = abc.charAt(i);

    var nodo = $($.parseHTML("<div>")).html(
      "<p id=" + letra_abc + ">" + letra_abc.toUpperCase() + "</p>"
    );

    $(".contenedor__letras").append(nodo);
  }
});
