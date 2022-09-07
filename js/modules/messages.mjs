import { ElementoHTML } from "./clases.mjs";

//const Game = document.getElementById("game");

export function message(estado) {
    const GameModal = new ElementoHTML({
        element: "div",
        clase: "moduloZorroFeroz__gameModal",
        id: "contenedorModal",
        parent: "game"
    });
    GameModal.agregarContenedor();

    const messageText = new ElementoHTML({
        element: "div",
        clase: "moduloZorroFeroz__gameModal--text",
        id: "modalText",
        parent: "contenedorModal"
    });
    messageText.agregarContenedor();
    const text = document.getElementById("modalText");

    switch(estado) {
        case "win":
            text.textContent = "Enhorabuena. Atrapaste al pollito.";
            break;
        case "lose":
            text.textContent = "No es un pollo, has perdido una vida, ánimo que tu puedes.";
            break;
        case "inicial":
            text.textContent = "No atrapaste al pollito, ya no te quedan vidas, vuelve a intentarlo.";
            break;
    }

    setTimeout(() => {
        const modal = document.getElementById("contenedorModal");
        if(estado == "inicial") {
            location.reload();
        }
        modal.remove();
    },3000)

}