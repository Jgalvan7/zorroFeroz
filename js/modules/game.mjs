import { ElementoHTML } from "./clases.mjs";
import { contenedorMarcador, marcadorLife } from "./marcador.mjs";
import { aleatorio, rellenoArray, borrarArray } from "./helpers.mjs";

export function gameToPlay () {
    const menuInicial = document.getElementById("contenedorMenu");
    menuInicial.remove();
    const portadaInicial = document.getElementById("imgLaunch");
    portadaInicial.remove();
    // Creamos un elemento imagen que será el fondo del juego y lo cargamos en pantalla con las dimensiones correspondientes.
    const BaseGame = new ElementoHTML({
        element: "img",
        clase: "moduloZorroFeroz__game",
        parent: "game",
        src: "../assets/icons/farm.png",
        width: "1000px",
        height: "600px"
    });
    BaseGame.agregarImagen();
    // Cargamos el marcador de la partida
    contenedorMarcador();
    // Cargamos la función que inicia la partida.
    startGame();
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
    //let xStart, xEnd, yStart, yEnd, walking;
    let estado = "inicial";
    const anchoAnimal = 70;
    let Granja = [];
    let Ganado = [];
    let Piara = [];
    let Life = 5;
    let Points = 0;
    // Declaramos las variables que contendrán las imágenes que usaremos para el juego.
    let Base = { url: "../assets/icons/farm.png", cargaOK: false };
    let Fox = { url: "../assets/icons/zorro.png", cargaOK: false };
    let Chicken = { url: "../assets/icons/pollo.png", cargaOK: false };
    let Cow = { url: "../assets/icons/vaca.png", cargaOK: false };
    let Pig = { url: "../assets/icons/cerdo.png", cargaOK: false };
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
    // Cargamos las imágenes y llamamos a la función cargar que se encargará de crear la disposición que tendrán los animales en el tablero de juego.
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

    // cargamos la función que generará la posición de los animales de forma aleatoria y se encargará de dibujar los animales en el tablero.
    function cargar () {
        // Con este condicional determinamos en que punto de la partida nos encontramos para saber que debemos hacer con el juego.
        switch (estado) {

            // Este estado carga el primer mapa y genera los arrays que contendrán las posiciones.
            case "inicial":
                // Establecemos el nivel inicial
                nivel = 0;
                // Agregamos el numero de vidas que tendra el zorrito
                marcadorLife(Life);
                // Creamos un número aleatorio de vacas y se lo asignamos a una variable.
                aleatorioVacas = aleatorio(1, 10);
                // Creamos un número aleatorio de cerdos y se lo asignamos a una variable.
                aleatorioCerdos = aleatorio(1, 10);
                // Sumamos la cantidad total de animales que tendrá el tablero es decir, total de vacas y cerdos mas 2, que corresponden al zorro y al pollo.
                animales = aleatorioVacas + aleatorioCerdos + 2;
                // Con esta función rellemanos el array Granja que contendrá toda las posiciones de los animales
                rellenoArray(animales,Granja);
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
                // Generamos nuevamente un número aleatorio de vacas y cerdos
                aleatorioVacas = aleatorio(1, 10);
                aleatorioCerdos = aleatorio(1, 10);
                // Como seguimos jugando lo que hacemos es aumentar el nivel de dificultad, para eso al número aleatorio le vamos sumando la variable nivel lo que aumenta el número de vacas y cerdos que aparecerán en el tablero progresivamente
                aleatorioVacas = aleatorioVacas + nivel;
                aleatorioCerdos = aleatorioCerdos + nivel;
                animales = aleatorioVacas + aleatorioCerdos + 2;
                rellenoArray(animales,Granja);
                estado = "jugando";
                break

            // Esta estado borra los arrays que teniamos, resetea el nivel y genera un nuevo array con las posiciones de los animales.
            case "lose":
                borrarArray(Granja);
                borrarArray(Ganado);
                borrarArray(Piara);
                aleatorioVacas = aleatorio(1, 10);
                aleatorioCerdos = aleatorio(1, 10);
                aleatorioVacas = aleatorioVacas + nivel;
                aleatorioCerdos = aleatorioCerdos + nivel;
                animales = aleatorioVacas + aleatorioCerdos + 2;
                rellenoArray(animales,Granja);
                marcadorLife(Life);
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
            // Para cargar los animales que se repiten utilizamos un ciclo que nos dirá cuantas vacas tenemos que cargar.
            for (let v = 0; v < aleatorioVacas; v++) {
                // La variable p representa la posición en el array de coordenadas, le sumamos 2 ya que las dos primeras coordenadas corresponden al pollo y al zorro, por lo que debemos empezar a utilizar las coordenadas a partir de la 2 posición del array o tercera coordenada.
                let p = v + 2;
                Cow.x = Granja[p][0] * anchoAnimal;
                Cow.y = Granja[p][1] * anchoAnimal;
                let vaquita = [Cow.x,Cow.y];
                Ganado[v] = vaquita;
                FarmZone.drawImage(Cow.objeto, Cow.x, Cow.y);
            }
        }
        if (Pig.cargaOK) {
            for (let c = 0; c < aleatorioCerdos; c++) {
                let p = c + 2 + aleatorioVacas;
                Pig.x = Granja[p][0] * anchoAnimal;
                Pig.y = Granja[p][1] * anchoAnimal;
                let cerdito = [Pig.x,Pig.y];
                Piara[c] = cerdito;
                FarmZone.drawImage(Pig.objeto, Pig.x, Pig.y);
            }
        }
    }

    // Añadimos una escuhca al document para saber cuando se pulsa una tecla y pasamos el evento keyup a la función para saber si debemos mover el zorro o no.
    document.addEventListener("keyup", moverZorro);
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
                            if(Life != 0) {
                                Life -= 1;
                            } else {
                                nivel = 0;
                            }
                            cargar();
                        }
                    }
                }
            }
        }
    }
}

