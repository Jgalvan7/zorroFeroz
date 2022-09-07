import { ElementoHTML } from "./modules/clases.mjs";
import { gameToPlay } from "./modules/game.mjs";
// Accedemos al section donde se cargará el juego y declaramos las variables de la imagen inicial y el botón jugar.
const ModuleGame = document.getElementById("game");
const HeroImageStart = "../assets/images/zorroFeroz.jpg";
const ImageBtnStart = "../assets/images/boton__play.png";
const ImageBtnStart2 = "../assets/images/boton__play2.png";
// Creamos un elemento imagen y lo agregamos al módulo.
const LaunchImg = new ElementoHTML({
    element: "img",
    id: "imgLaunch",
    parent: "game",
    src: HeroImageStart
});
LaunchImg.agregarImagen();
// Creamos un elemento botón y lo agregamos al módulo, este será el que abra el menú de juego.
const LaunchBtn = new ElementoHTML({
    element: "button",
    clase: "moduloZorroFeroz__start",
    id: "btnStart",
    parent: "game"
});
LaunchBtn.agregarBoton();
// Creamos un elemento que contendra la imagen del botón jugar que definimos antes.
let LaunchBtnImg = new ElementoHTML({
    element: "img",
    id: "imgBtnStart",
    parent: "btnStart",
    src: ImageBtnStart
});
LaunchBtnImg.agregarImagen();
// Accedemos al botón mediante su ID y le asignamos un par de escuchas para darle interactividad.
const BtnGame = document.getElementById("btnStart");
BtnGame.addEventListener("mouseenter", function(){
    LaunchBtnImg.eliminar();
    LaunchBtnImg = new ElementoHTML({
        element: "img",
        id: "imgBtnStart",
        parent: "btnStart",
        src: ImageBtnStart2
    });
    LaunchBtnImg.agregarImagen();
    let startMenu = document.getElementById("imgBtnStart");
    startMenu.addEventListener("click", lauchStart);
});
BtnGame.addEventListener("mouseout", function(){
    LaunchBtnImg.eliminar();
    LaunchBtnImg = new ElementoHTML({
        element: "img",
        id: "imgBtnStart",
        parent: "btnStart",
        src: ImageBtnStart
    });
    LaunchBtnImg.agregarImagen();
});
// Asignamos la escucha para el evento click.
BtnGame.addEventListener("click", lauchStart);

// Funcion del menú inicial del juego.
function lauchStart() {
    // Eliminamos el botón de jugar.
    LaunchBtn.eliminar();
    // Creamos un elemento div que contendrá el menú del juego.
    const GameMenu = new ElementoHTML({
        element: "div",
        clase: "moduloZorroFeroz__gameMenu",
        id: "contenedorMenu",
        parent: "game"
    });
    GameMenu.agregarContenedor();
    // Creamos el botón para iniciar el juego y le insertamos el texto "Nuevo Juego".
    const BtnNewGame = new ElementoHTML({
        element: "button",
        id: "btnNewGame",
        parent: "contenedorMenu"
    });
    BtnNewGame.agregarBoton();
    const TextBtnNewGame = document.getElementById("btnNewGame");
    TextBtnNewGame.innerText= "Nuevo Juego";
    // Creamos el botón para salir del juego y le insertamos el texto "Salir del Juego".
    const BtnExit = new ElementoHTML({
        element: "button",
        id: "btnExit",
        parent: "contenedorMenu"
    });
    BtnExit.agregarBoton();
    const TextBtnExit = document.getElementById("btnExit");
    TextBtnExit.innerText= "Salir del Juego";

    // Le damos la funcionalidad del menú del inicial del juego mediante la escucha del evento click.
    // Al darle al botón este eliminará el div que muestra el menú y la imagen principal.
    TextBtnNewGame.addEventListener("click", gameToPlay);
    // Le damos funcionalidad al botón Salir del Juego, el cual al darle click recargará la página.
    TextBtnExit.addEventListener("click", () => { location.href="./index.html" });
}
