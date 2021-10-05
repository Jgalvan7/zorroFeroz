import { ElementoHTML } from "./modules/clases.mjs"
// Accedemos al section donde se cargará el juego y declaramos las variables de la imagen inicial y el botón jugar.
const ModuleGame = document.getElementById("game");
const ImageStart = "./assets/zorroFeroz.jpg";
const BtnStart = "./assets/boton__play.png";
const BtnStart2 = "./assets/boton__play2.png";
// Creamos un elemento imagen y lo agregamos al módulo.
const LaunchImg = new ElementoHTML({
    element: "img",
    id: "imgLaunch",
    parent: "game",
    src: ImageStart
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
    src: BtnStart
});
LaunchBtnImg.agregarImagen();
// Accedemos al botón mediante su ID y le asignamis un par de escuchas para darle interactividad.
const BtnGame = document.getElementById("btnStart");
BtnGame.addEventListener("mouseenter", function(){
    LaunchBtnImg.eliminar();
    LaunchBtnImg = new ElementoHTML({
        element: "img",
        id: "imgBtnStart",
        parent: "btnStart",
        src: BtnStart2
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
        src: BtnStart
    });
    LaunchBtnImg.agregarImagen();
});
// Asignamos la escucha para el evento click.
BtnGame.addEventListener("click", lauchStart);
// Creamos la funcion que mostrará el menú del juego.
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
    // Le damos la funcionalidad al botón Nuevo Juego mediante la escucha del evento click.
    // Al darle al botón este eliminará el div que muestra el menú y la imagen principal.
    TextBtnNewGame.addEventListener("click", function() {
        GameMenu.eliminar();
        LaunchImg.eliminar();
        // Creamos un elemento imagen que será el fondo del juego y lo cargamos en pantalla con las dimensiones correspondientes.
        const BaseGame = new ElementoHTML({
            element: "img",
            clase: "moduloZorroFeroz__game",
            parent: "game",
            src: "./assets/farm.png",
            width: "1000px",
            height: "600px"
        });
        BaseGame.agregarImagen();
        // Cargamos la función que inicia la partida.
        startGame();
    });
    // Le damos funcionalidad al botón Salir del Juego, el cual al darle click recargará la página.
    TextBtnExit.addEventListener("click", _ => { location.reload() });
}
// Creamos la función que iniciará la partida.
function startGame() {
    // Creamos el canvas donde se desarrollará el juego y lo cargamos.
    const GameZone = new ElementoHTML({
        element: "canvas",
        clase: "moduloZorroFeroz__gameZone",
        id: "foxFoxy",
        parent: "game",
        width: "960px",
        height: "440px"
    });
    GameZone.agregarCanvas();
    // Asignamos el canvas a una variable y le pasamos el contexto que tendrá el dibujo.
    const Farm = document.getElementById("foxFoxy");
    const FarmZone = Farm.getContext("2d");
    // Inicializamos las variables que nos hacen falta para el juego y declaramos las teclas que se usarán para jugar, el estado inicial del juego y el ancho que tendrán los animales.
    const Keys = {UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39};
    let aleatorioVacas, aleatorioCerdos, animales, nivel;
    let xStart, xEnd, yStart, yEnd, walking;
    let estado = "inicial";
    const anchoAnimal = 70;
    let Granja = [];
    let Ganado = [];
    let Piara = [];
    // Declaramos las variables que contendrán las imágenes que usaremos para el juego.
    let Base = { url: "./assets/farm.png", cargaOK: false }
    let Fox = { url: "./assets/zorro.png", cargaOK: false };
    let Chicken = { url: "./assets/pollo.png", cargaOK: false };
    let Cow = { url: "./assets/vaca.png", cargaOK: false };
    let Pig = { url: "./assets/cerdo.png", cargaOK: false };
    // Creamos la instancia de las imáganes y las pasamos para su carga.
    Base.objeto = new Image();
    Base.objeto.src = Base.url;
    Fox.objeto = new Image();
    Fox.objeto.src = Fox.url;
    Chicken.objeto = new Image();
    Chicken.objeto.src = Chicken.url;
    Cow.objeto = new Image();
    Cow.objeto.src = Cow.url;
    Pig.objeto = new Image();
    Pig.objeto.src = Pig.url;
    Pig.objeto.addEventListener("load", loading);
    // Cargamos las imágenes y llamamos a la funciona cargar que se encargará de crear la disposición que tendrán los animales en el tablero de juego.
    function loading() {
        if(Base.cargaOK == false) {
            Base.cargaOK = true;
        }
        if(Fox.cargaOK == false) {
            Fox.cargaOK = true;
        }
        if(Chicken.cargaOK == false) {
            Chicken.cargaOK = true;
        }
        if(Cow.cargaOK == false) {
            Cow.cargaOK = true;
        }
        if(Pig.cargaOK == false) {
            Pig.cargaOK = true;
        }
        if(Base.cargaOK == true && Fox.cargaOK == true && Chicken.cargaOK == true && Cow.cargaOK == true && Pig.cargaOK == true) {
            cargar();
        }
    }
    // Añadimos una escuhca al document para saber cuando se pulsa una tecla y pasamos el evento keyup a la función para saber si debemos mover el zorro o no.
    document.addEventListener("keyup", moverZorro);
    // cargamos la función que generará la posición de los animales de forma aleatoria y se encargará de dibujar los animales en el tablero.
    function cargar () {
        // Con este condicional determinamos en que punto de la partida nos encontramos para saber que debemos hacer con el juego.
        switch (estado) {
            // Este estado carga el primer mapa y genera los arrays que contendrán las posiciones.
            case "inicial":
                nivel = 0;
                // Creamos un número aleatorio de vacas y se lo asignamos a una variable.
                aleatorioVacas = aleatorio(1, 10);
                // Creamos un número aleatorio de cerdos y se lo asignamos a una variable.
                aleatorioCerdos = aleatorio(1, 10);
                // Sumamos la cantidad total de animales que tendrá el tablero es decir, total de vacas y cerdos mas 2, que corresponden al zorro y al pollo.
                animales = aleatorioVacas + aleatorioCerdos + 2;
                // Con este cicllo rellemanos el array Granja que contendra toda las posiciones de los animales
                for (let v = 0; v < animales; v++) {
                    // Por cada iteración del ciclo se crea un número aleatorio para la posición X e Y. El rango para calcular el número aleatorio viene dado por la cantidad de animales que caben en el tablero.
                    // Si el tablero es cuadrado el rango será igual para ambas coordenadas y el tablero es mas ancho que largo el rango de la coordenada X será mayor que el de la coordenada Y.
                    // Para calcular los rangos simplemente se divide el ancho del tablero entre el ancho de la imagen de los animales y para el largo utilizaremos el alto del tablero y lo dividimos por el alto de la imagen de los animales.
                    let x = aleatorio(0, 12);
                    let y = aleatorio(0, 5);
                    // una vez tenemos las coordenadas las pasamos guardamos en el array.
                    Granja[v] = [x, y];
                    // Con este ciclo comprobamos que en la posición que acabamos de guardar no este repetida con otra, asi los animales no se superpondrán.
                    // Si la posición que acabamos de guardar ya existe en el array borramos la última posición del array  y restasmos uno al ciclo inicial para volver a repetir esta última iteración nuevamente.
                    for(let g in Granja) {
                        if(v != g) {
                            if(Granja[v][0] == Granja[g][0] && Granja[v][1] == Granja[g][1]) {
                                Granja.pop();
                                v--;
                            }
                        }
                    }
                }
                // Una ves terminado de rellenar el array cambiamos el estado del juego para indicar que esta listo para jugar.
                estado = "jugando";
                break
            // Este estado borra los arrays que teniamos, le suma uno a la variable nivel y genera un nuevo array con las posiciones de los animales
            case "win":
                borrarArray(Granja);
                borrarArray(Ganado);
                borrarArray(Piara);
                // Le sumamos uno a la variable nivel.
                nivel++;
                aleatorioVacas = aleatorio(1, 10);
                aleatorioCerdos = aleatorio(1, 10);
                // Como seguimos jugando lo que hacemos es aumentar el nivel de dificultad, para eso al número aleatorio le vamos sumando la variable nivel lo que aumenta el número de vacas y cerdos que aparecerán en el tablero progresivamente
                aleatorioVacas = aleatorioVacas + nivel;
                aleatorioCerdos = aleatorioCerdos + nivel;
                animales = aleatorioVacas + aleatorioCerdos + 2;
                for (let v = 0; v < animales; v++) {
                    let x = aleatorio(0, 12);
                    let y = aleatorio(0, 5);
                    Granja[v] = [x, y];
                    for(let g in Granja) {
                        if(v != g) {
                            if(Granja[v][0] == Granja[g][0] && Granja[v][1] == Granja[g][1]) {
                                Granja.pop();
                                v--;
                            }
                        }
                    }
                }
                estado = "jugando";
                break
            // Esta estado borra los arrays que teniamos, resetea el nivel y genera un nuevo array con las posiciones de los animales.
            case "lose":
                borrarArray(Granja);
                borrarArray(Ganado);
                borrarArray(Piara);
                nivel = 0;
                aleatorioVacas = aleatorio(1, 10);
                aleatorioCerdos = aleatorio(1, 10);
                aleatorioVacas = aleatorioVacas + nivel;
                aleatorioCerdos = aleatorioCerdos + nivel;
                animales = aleatorioVacas + aleatorioCerdos + 2;
                for (let v = 0; v < animales; v++) {
                    let x = aleatorio(0, 12);
                    let y = aleatorio(0, 5);
                    Granja[v] = [x, y];
                    for(let g in Granja) {
                        if(v != g) {
                            if(Granja[v][0] == Granja[g][0] && Granja[v][1] == Granja[g][1]) {
                                Granja.pop();
                                v--;
                            }
                        }
                    }
                }
                estado = "jugando";
                break;
        }
        // Lo primero que hacemos es verificar que la imagen base está cargada, si es asi la mostramos en pantalla.
        if(Base.cargaOK) {
            FarmZone.drawImage(Base.objeto, -40, -105);
        }
        // Se verifica si la imagen Chicken esta carga, buscamos la posición que le corresponde al pollo y cargamos la imagen en dicha posición.
        if (Chicken.cargaOK) {
            // Para colocar los animales de manera ordenada en el tablero lo que hacemos es que la posición la multiplicamos por el ancho de la imagen.
            Chicken.x = Granja[0][0] * anchoAnimal;
            Chicken.y = Granja[0][1] * anchoAnimal;
            FarmZone.drawImage(Chicken.objeto, Chicken.x, Chicken.y);
        }
        // Se verifica si la imagen Fox esta carga, buscamos la posición que le corresponde al pollo y cargamos la imagen en dicha posición.
        if (Fox.cargaOK) {
            Fox.x = Granja[1][0] * anchoAnimal;
            Fox.y = Granja[1][1] * anchoAnimal;
            FarmZone.drawImage(Fox.objeto, Fox.x, Fox.y);
        }
        if (Cow.cargaOK) {
            // Para cargar los animales que se repiten utilizamos un ciclo que nos dira cuantas vacas tenemos que cargar.
            for (let v = 0; v < aleatorioVacas; v++) {
                // La variable X representa la posición en el array de coordenadas, le sumamos 2 ya que las dos primeras coordenadas corresponden al pollo y al zorro, por lo que debemos empezar a utilizar las coordenadas a partir de la 2 posición del array o tercera coordenada.
                let x = v + 2;
                Cow.x = Granja[x][0] * anchoAnimal;
                Cow.y = Granja[x][1] * anchoAnimal;
                let vaquita = [Cow.x,Cow.y];
                Ganado[v] = vaquita;
                FarmZone.drawImage(Cow.objeto, Cow.x, Cow.y);
            }
        }
        if (Pig.cargaOK) {
            for (let c = 0; c < aleatorioCerdos; c++) {
                let x = c + 2 + aleatorioVacas;
                Pig.x = Granja[x][0] * anchoAnimal;
                Pig.y = Granja[x][1] * anchoAnimal;
                let cerdito = [Pig.x,Pig.y];
                Piara[c] = cerdito;
                FarmZone.drawImage(Pig.objeto, Pig.x, Pig.y);
            }
        }
    }
    // Esta función determina si debemos mover el zorro o no, recibe el parámetro del evento keyup que establecimos antes.
    function moverZorro(evento) {
        // Establecemos el movimiento que tendrá el zorro, para ello asignamos a la variable movimiento el ancho de la imagen y declaramos las coordenadas X e Y que tiene actualmente el zorro.
        let movimiento = anchoAnimal;
        let x = Fox.x;
        let y = Fox.y;
        // Verificamos que el evento.
        if(evento.keyCode == undefined){
            evento = evento;
        } else {
            evento = evento.keyCode;
        }
        // Con este condicional determinamos hacia donde se moverá el zorro, según la tecla que pulsemos.
        switch(evento) {
            case Keys.UP:
                // Esta condición establece que si la coordenada Y ya es 0 el zorro no puede salir de la pantalla así que no lo moverá.
                // Si por el contrario la coordenada Y no es igual a 0 el zorro tienen espacio para moverser haca arriba, por lo que le restaremos la variable movimiento a la coordenada Y.
                if(Fox.y == 0){
                    Fox.y = Fox.y;
                } else {
                    Fox.y = y - movimiento;
                }
                // Una vez establecida las coordenadas de movimiento las pasamos a la función caminar.
                caminar(x, y, x, y - movimiento, FarmZone);
                break;
            case Keys.DOWN:
                // En esta otra condición verificamos si el zorro llego a bajo del todo de ser así no moveremos al zorro y mantendrá su posición.
                // De lo contrario al igual que en el caso anterior si tienen espacio para moverse lo que tendremos que hacer es subar la variable movimiento a la coordenada Y.
                if(Fox.y >= 300){
                    Fox.y = Fox.y;
                } else {
                    Fox.y = y + movimiento;
                }
                caminar(x, y, x, y + movimiento, FarmZone);
                break;
            case Keys.LEFT:
                // Aquí realizamos la misma operacion que con la coordenada Y pero con la coordenada X
                if(Fox.x == 0){
                    Fox.x = Fox.x;
                } else {
                    Fox.x = x - movimiento;
                }
                caminar(x, y, x- movimiento, y, FarmZone);
                break;
            case Keys.RIGHT:
                // Aquí realizamos la misma operacion que con la coordenada Y pero con la coordenada X
                if(Fox.x >= 820){
                    Fox.x = Fox.x;
                } else {
                    Fox.x = x + movimiento;
                }
                caminar(x, y, x + movimiento, y, FarmZone);
                break;
        }
    }
    // Creamos la función caminar, esta funció recibe como parámetro las coordenadas del zorro que establecimos en la función anterior y lo dibuja en el tablero.
    function caminar(xi, yi, xf, yf, mapFarm) {
        mapFarm.beginPath();
        mapFarm.moveTo(xi, yi);
        mapFarm.lineTo(xf, yf);
        mapFarm.closePath();
        // Aquí pintamos nuevamente el tablero y los animales que no han sufrido ningún movimiento.
        if(Base.cargaOK) {
            mapFarm.drawImage(Base.objeto, -40, -105);
        }
        if (Chicken.cargaOK) {
            mapFarm.drawImage(Chicken.objeto, Chicken.x, Chicken.y);
        }
        if (Cow.cargaOK) {
            for (let positionVaca in Ganado) {
                Cow.x = Ganado[positionVaca][0];
                Cow.y = Ganado[positionVaca][1];
                mapFarm.drawImage(Cow.objeto, Cow.x, Cow.y);
            }
        }
        if (Pig.cargaOK) {
            for (let positionCerdo in Piara) {
                Pig.x = Piara[positionCerdo][0];
                Pig.y = Piara[positionCerdo][1];
                mapFarm.drawImage(Pig.objeto, Pig.x, Pig.y);
            }
        }
        // Una vez esta todas las piezas del tablero en su sitio pasamos a pintar a zorro en su nueva posición.
        if (Fox.cargaOK) {
            mapFarm.drawImage(Fox.objeto, Fox.x, Fox.y);
            // Tras pintar al zorro comprobamos si en la nueva posición esta el pollo o algun otro animal, con la función comprobar.
            setTimeout(comprobar, 50);
            // Creamos la función comprobar.
            function comprobar() {
                // Este condicional comprueba si el pollo y el zorro están en la misma posición, si es así lanza una alerta para indicar que se atrapo al pollo, cambia el estado a "WIN" y llama a la función cargar para seguir con el juego.
                // Si el pollo y el zorro no estan en la misma posición comprueba si la posición del zorro coincide con la cualquier otro animal que tengamos cargado, de ser así lanza una alerta para indicar que el animal no es un pollo y que ha perdido, cambia el estado a "LOSE" y llama nuevamente a la función cargar para empezar de nuevo.
                // Si ninguna de las dos codiciones se cumple puede seguir moviendo al zorro a una nueva posición
                if(Fox.x == Chicken.x && Fox.y == Chicken.y) {
                    alert("Atrapaste al pollito");
                    estado = "win";
                    cargar();
                } else {
                    for(let i = 2; i < Granja.length; i++) {
                        var x = Granja[i][0] * anchoAnimal;
                        var y = Granja[i][1] * anchoAnimal;
                        if(Fox.x == x && Fox.y == y) {
                            alert("No es un pollo, has perdido");
                            estado = "lose";
                            cargar();
                        }
                    }
                }
            }
        }
    }
}
// Estas funcionas nos sirven de apoyo para poder realizar algunas tareas en el código.
function aleatorio(min, max) {
    var resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    return resultado;
}
function borrarArray(array) {
    for (var x = array.length; x > 0; x--) {
        array.pop();
    }
}