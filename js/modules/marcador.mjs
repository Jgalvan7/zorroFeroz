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
    const marcadorLife = new ElementoHTML({
        element: "div",
        clase: "moduloZorroFeroz__gameMarcador--life",
        id: "marcadorLife",
        parent: "contenedorMarcador"
    });
    marcadorLife.agregarContenedor();

    // Agregamos el contendedor de los puntos conseguidos
    const marcadorPoints = new ElementoHTML({
        element: "div",
        clase: "moduloZorroFeroz__gameMarcador--point",
        id: "marcadorLife",
        parent: "contenedorMarcador"
    });
    marcadorPoints.agregarContenedor();
}

export function marcadorLife(vidas) {
    const contenedorLife = document.getElementById("marcadorLife");
    contenedorLife.textContent = "";
    let ordenLife = 0;
    for (let v = 0; v < vidas; v++) {
        let foxLife = { url: "../assets/icons/zorroFace.png", id: v };
        foxLife.objeto = new Image();
        foxLife.objeto.src = foxLife.url;
        foxLife.objeto.id = foxLife.id;
        foxLife.objeto.addEventListener("load", () =>{
            contenedorLife.append(foxLife.objeto);
        });
        if(v != 0) {
            ordenLife += 60;
        }
        foxLife.objeto.style.position = "relative";
        foxLife.objeto.style.left = ordenLife;
    }
}
