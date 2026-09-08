console.log("Torneo ENERSA iniciado");

const jugadores = {
    eric: {
        nombre: "Eric",
        puntos: 0,
        juegosGanados: 0,
        infracciones: 0,
        historial: []
    },

    amaro: {
        nombre: "Amaro",
        puntos: 0,
        juegosGanados: 0,
        infracciones: 0,
        historial: []
    },

    adrian: {
        nombre: "Adrián",
        puntos: 0,
        juegosGanados: 0,
        infracciones: 0,
        historial: []
    }
};

function guardarDatos() {

    localStorage.setItem(
        "torneoEnersa",
        JSON.stringify(jugadores)
    );

}

function cargarDatos() {

    const datosGuardados =
        localStorage.getItem("torneoEnersa");

    if (datosGuardados) {

        const datos =
            JSON.parse(datosGuardados);

        if (datos.eric) {
            jugadores.eric.puntos = datos.eric.puntos || 0;
            jugadores.eric.juegosGanados = datos.eric.juegosGanados || 0;
            jugadores.eric.infracciones = datos.eric.infracciones || 0;
            jugadores.eric.historial = datos.eric.historial || [];
        }

        if (datos.amaro) {
            jugadores.amaro.puntos = datos.amaro.puntos || 0;
            jugadores.amaro.juegosGanados = datos.amaro.juegosGanados || 0;
            jugadores.amaro.infracciones = datos.amaro.infracciones || 0;
            jugadores.amaro.historial = datos.amaro.historial || [];
        }

        if (datos.adrian) {
            jugadores.adrian.puntos = datos.adrian.puntos || 0;
            jugadores.adrian.juegosGanados = datos.adrian.juegosGanados || 0;
            jugadores.adrian.infracciones = datos.adrian.infracciones || 0;
            jugadores.adrian.historial = datos.adrian.historial || [];
        }

    }

}

function sumarPuntos(idJugador, cantidad, motivo) {

    jugadores[idJugador].puntos += cantidad;

    jugadores[idJugador].historial.push({
        tipo: "suma",
        puntos: cantidad,
        motivo: motivo
    });

    console.log(
        jugadores[idJugador].nombre +
        " recibió +" +
        cantidad +
        " puntos por: " +
        motivo
    );

    guardarDatos();
}


function restarPuntos(idJugador, cantidad, motivo) {

    jugadores[idJugador].puntos -= cantidad;

    jugadores[idJugador].historial.push({
        tipo: "resta",
        puntos: -cantidad,
        motivo: motivo
    });

    console.log(
        jugadores[idJugador].nombre +
        " perdió -" +
        cantidad +
        " puntos por: " +
        motivo
    );

    guardarDatos();
}


function registrarVictoria(idJugador, juego, puntos) {

    jugadores[idJugador].juegosGanados += 1;

    sumarPuntos(
        idJugador,
        puntos,
        "Ganó " + juego
    );

    console.log(
        jugadores[idJugador].nombre +
        " ganó " +
        juego +
        " y ahora tiene " +
        jugadores[idJugador].juegosGanados +
        " juegos ganados"
    );

    actualizarMarcador();
}


function actualizarMarcador() {

    document.getElementById("puntos-eric").textContent =
        "Eric: " + jugadores.eric.puntos + " puntos — " +
        jugadores.eric.juegosGanados + " juegos ganados";

    document.getElementById("puntos-amaro").textContent =
        "Amaro: " + jugadores.amaro.puntos + " puntos — " +
        jugadores.amaro.juegosGanados + " juegos ganados";

    document.getElementById("puntos-adrian").textContent =
        "Adrián: " + jugadores.adrian.puntos + " puntos — " +
        jugadores.adrian.juegosGanados + " juegos ganados";
}


function registrarVictoriaSeleccionada() {

    const jugadorGanador =
        document.getElementById("jugador-ganador").value;

    const juegoSeleccionado =
        document.getElementById("juego").value;

    registrarVictoria(
        jugadorGanador,
        juegoSeleccionado,
        3
    );
}

function registrarVictoriaTruco() {

    const jugadorGanador =
        document.getElementById("jugador-truco").value;

    registrarVictoria(
        jugadorGanador,
        "Truco",
        3
    );
}

function registrarVictoriaAjedrez() {

    const jugadorGanador =
        document.getElementById("jugador-ajedrez").value;

    registrarVictoria(
        jugadorGanador,
        "Ajedrez",
        3
    );
}

function registrarVictoriaCartas() {

    const jugadorGanador =
        document.getElementById("jugador-cartas").value;

    registrarVictoria(
        jugadorGanador,
        "Juego de cartas",
        3
    );
}

function registrarRespuesta(puntos) {

    const jugador =
        document.getElementById("jugador-pregunta").value;

    if (puntos > 0) {

        sumarPuntos(
            jugador,
            puntos,
            "Preguntas y respuestas"
        );

    } else {

        restarPuntos(
            jugador,
            1,
            "Preguntas y respuestas: respuesta incorrecta"
        );

    }

    actualizarMarcador();
}


function registrarRespuestaCorrecta() {

    const jugador =
        document.getElementById("jugador-respuesta-correcta").value;

    sumarPuntos(
        jugador,
        1,
        "Preguntas y respuestas: respondió correctamente después de un error"
    );

    actualizarMarcador();
}

function registrarTirosAlAro() {

    const jugador =
        document.getElementById("jugador-tiros").value;

    const tiros =
        Number(document.getElementById("tiros-anotados").value);

    const puntos = tiros * 3;

    sumarPuntos(
        jugador,
        puntos,
        "Tiros al aro: " + tiros + "/5"
    );

    actualizarMarcador();

    document.getElementById("tiros-anotados").value = "";
}

function mostrarJugador(idJugador) {

    const jugador = jugadores[idJugador];

    let textoHistorial = "";

    for (let i = 0; i < jugador.historial.length; i++) {

        textoHistorial +=
            "<p>" +
            jugador.historial[i].puntos +
            " puntos — " +
            jugador.historial[i].motivo +
            "</p>";
    }

    document.getElementById("historial-jugador").innerHTML =
        "<h3>" + jugador.nombre + "</h3>" +
        "<p>Puntos: " + jugador.puntos + "</p>" +
        "<p>Juegos ganados: " + jugador.juegosGanados + "</p>" +
        "<p>Infracciones: " + jugador.infracciones + "</p>" +
        "<h4>Historial</h4>" +
        textoHistorial;
}

function registrarInfraccion() {

    const jugador = document.getElementById("jugador-infraccion").value;

    const descripcion =
        document.getElementById("descripcion-infraccion").value;

    jugadores[jugador].infracciones += 1;

    restarPuntos(
        jugador,
        1,
        "Infracción: " + descripcion
    );

    actualizarMarcador();

    document.getElementById("descripcion-infraccion").value = "";
}

document.getElementById("juego").addEventListener("change", function() {

    const juegoSeleccionado = this.value;

    const seccionVictoria =
        document.getElementById("seccion-victoria");

    const seccionTruco =
        document.getElementById("seccion-truco");

    const seccionTiros =
        document.getElementById("seccion-tiros-al-aro");

     const seccionAjedrez =
    document.getElementById("seccion-ajedrez");   

    const seccionCartas =
    document.getElementById("seccion-cartas");

    const seccionPreguntas =
    document.getElementById("seccion-preguntas");


    seccionVictoria.style.display = "none";
    seccionTruco.style.display = "none";
    seccionTiros.style.display = "none";
    seccionAjedrez.style.display = "none";
    seccionCartas.style.display = "none";
    seccionPreguntas.style.display = "none";


    if (juegoSeleccionado === "Ping Pong") {
        seccionVictoria.style.display = "block";
    }

    if (juegoSeleccionado === "Truco") {
        seccionTruco.style.display = "block";
    }

    if (juegoSeleccionado === "Tiros al aro") {
        seccionTiros.style.display = "block";
    }

    if (juegoSeleccionado === "Ajedrez") {
    seccionAjedrez.style.display = "block";
}

if (juegoSeleccionado === "Juego de cartas") {
    seccionCartas.style.display = "block";
}

if (juegoSeleccionado === "Preguntas y respuestas") {
    seccionPreguntas.style.display = "block";
}

});

function reiniciarTorneo() {

    const confirmar =
        confirm("¿Seguro desea reiniciar el torneo?");

    if (confirmar) {

        jugadores.eric.puntos = 0;
        jugadores.eric.juegosGanados = 0;
        jugadores.eric.infracciones = 0;
        jugadores.eric.historial = [];

        jugadores.amaro.puntos = 0;
        jugadores.amaro.juegosGanados = 0;
        jugadores.amaro.infracciones = 0;
        jugadores.amaro.historial = [];

        jugadores.adrian.puntos = 0;
        jugadores.adrian.juegosGanados = 0;
        jugadores.adrian.infracciones = 0;
        jugadores.adrian.historial = [];

        localStorage.removeItem("torneoEnersa");

        actualizarMarcador();

        document.getElementById("historial-jugador").innerHTML =
            "Seleccioná un jugador para ver su historial.";

        alert("El torneo fue reiniciado correctamente.");
    }
}

cargarDatos();
actualizarMarcador();

