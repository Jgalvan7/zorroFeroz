import { ElementoHTML } from "./clases.mjs";

export function contenedorMarcador() {
    const GameMarcador = new ElementoHTML({
        element: "div",
        clase: "moduloZorroFeroz__gameMarcador",
        id: "contenedorMarcador",
        parent: "game"
    });
    GameMarcador.agregarContenedor();

    // Agregamos el contendedor de las vidas del zorrito
    const marcadorLifes = new ElementoHTML({
        element: "div",
        clase: "moduloZorroFeroz__gameMarcador--life",
        id: "marcadorLife",
        parent: "contenedorMarcador"
    });
    marcadorLifes.agregarContenedor();

    // Agregamos el contendedor de los puntos conseguidos
    const marcadorPoints = new ElementoHTML({
        element: "div",
        clase: "moduloZorroFeroz__gameMarcador--point",
        id: "marcadorPoint",
        parent: "contenedorMarcador"
    });
    marcadorPoints.agregarContenedor();
}

export function marcadorLife(vidas) {
    const contenedorLifes = document.getElementById("marcadorLife");
    contenedorLifes.textContent = "";
    let ordenLife = 0;
    for (let v = 0; v < vidas; v++) {
        let foxLife = { url: "../assets/icons/zorroFace.png", id: v };
        foxLife.objeto = new Image();
        foxLife.objeto.src = foxLife.url;
        foxLife.objeto.id = foxLife.id;
        foxLife.objeto.addEventListener("load", () =>{
            contenedorLifes.append(foxLife.objeto);
        });
        if(v != 0) {
            ordenLife += 60;
        }
        foxLife.objeto.style.position = "relative";
        foxLife.objeto.style.left = ordenLife;
    }
}

let acumulado = 0;
export function marcadorPoint(point) {
    let marcador = 0;
    const contenedorPoint = document.getElementById("marcadorPoint");
    if(point != 0) {
        acumulado = acumulado + point;
        marcador = acumulado;
    }
    if(point < 0) {
        marcador = 0;
        acumulado = 0;
    }
    //console.log(point, acumulado, marcador);
    contenedorPoint.textContent = marcador;
}
