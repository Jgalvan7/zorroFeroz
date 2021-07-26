var teclas = {UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39}; // Asignamos nombre a los valores numericos de las teclas
var villa = document.getElementById("villaplatzi"); // Accedemsoa l canvas mediante su ID
var lienzo = villa.getContext("2d"); // Definimos el tipo de contexto
var ancho = document.body.offsetWidth; // Capturamos el ancho de la pantalla para cargar una imagenes u otras

/**
 * En este condicional establecemos el ancho del canvas en funcion del ancho que tenga la pantalla y cargamos
 * las imagenesen funcion de ese ancho tambien.
 */
if (ancho < 500){
    villa.width = 320;
    villa.height = 320;
    var anchoAnimal = 45;
    var fondo = { url: "./assets/img/tile320.png", cargaOK: false }
    var vaca = { url: "./assets/img/vaca320.png", cargaOK: false }
    var pollo = { url: "./assets/img/pollo320.png", cargaOK: false }
    var cerdo = { url: "./assets/img/cerdo320.png", cargaOK: false }
    var zorro = { url: "./assets/img/zorro320.png", cargaOK: false }
} else {
    villa.width = 500;
    villa.height = 500;
    var anchoAnimal = 70;
    var fondo = { url: "./assets/img/tile.png", cargaOK: false }
    var vaca = { url: "./assets/img/vaca2.png", cargaOK: false }
    var pollo = { url: "./assets/img/pollo3.png", cargaOK: false }
    var cerdo = { url: "./assets/img/cerdo3.png", cargaOK: false }
    var zorro = { url: "./assets/img/zorro.png", cargaOK: false }
}

/**
 * Declaramos las variables que utilizaremos a lo largo del codigo
 */
var estado = "inicial";
var nivel;
var aleatorioVacas, aleatorioCerdos, animales;
var xStart, xEnd, yStart, yEnd, walking;
var granja = [];
var ganado = [];
var piara = [];

/**
 * Creamos las instancias del objeto imagen, le pasamos la url al src y añadimos el evento load.
 * En cuanto este listo dispara la funcion para cargar las imagenes
 */
fondo.objeto = new Image();
fondo.objeto.src = fondo.url;
fondo.objeto.addEventListener("load", cargarFondo);

vaca.objeto = new Image();
vaca.objeto.src = vaca.url;
vaca.objeto.addEventListener("load", cargarVacas);

pollo.objeto = new Image();
pollo.objeto.src = pollo.url;
pollo.objeto.addEventListener("load", cargarPollo);

cerdo.objeto = new Image();
cerdo.objeto.src = cerdo.url;
cerdo.objeto.addEventListener("load", cargarCerdos);

zorro.objeto = new Image();
zorro.objeto.src = zorro.url;
zorro.objeto.addEventListener("load", cargarZorro);
document.addEventListener("keyup", moverZorro);

/**
 * Este bloque de codigo va en relacion al anterior, estas son las funciones que cargan las imaganes dentro
 * del canvas una en cuanto esten listas.
 */
function cargarFondo() {
    fondo.cargaOK = true;
    cargar();
}
function cargarVacas() {
    vaca.cargaOK = true;
    cargar();
}
function cargarPollo() {
    pollo.cargaOK = true;
    cargar();
}
function cargarCerdos() {
    cerdo.cargaOK = true;
    cargar();
}
function cargarZorro() {
    zorro.cargaOK = true;
    cargar();
}

/**
 * Esta funcion es la encargada de pintar todas las imaganes.
 * El condicional switch lo usamos para definir el estado del juego.
 */
function cargar() {
    switch (estado) {
        /**
         * En su estado inicial el codigo crea un numero aleatorio de vacas y cerdos, en la variable animales guardamos
         * los valores aleatorios de vacas, cerdos y le sumamos dos ya que contamos tambien al pollo y al zorro.
         * Con el ciclo for rellenamos el array granja con las posiciones que tendran los animales en el tablero.
         * Para que no coincida a la vez que vamos creando posiciones comprobamos que esas coordenadas no enten en el
         * array ya indroducidas de ser asi las borramos y restamos una posicion a la iteracion para que cree nuevamente otra
         * coordenada.
         * Por ultimo cambiamos la variable estado a jugando, para que no entre al switch mientras el juego esta activo, a no
         * ser que topes con un cerdo, vaca o atrapes al pollo, en cuyo caso el estado cambiaria.
         */
        case "inicial":
            nivel = 0;
            aleatorioVacas = aleatorio(1, 10);
            aleatorioCerdos = aleatorio(1, 10);
            animales = aleatorioVacas + aleatorioCerdos + 2;
            for (v = 0; v < animales; v++) {
                var x = aleatorio(0, 6);
                var y = aleatorio(0, 6);
                granja[v] = [x, y];
                for(g in granja) {
                    if(v != g) {
                        if(granja[v][0] == granja[g][0] && granja[v][1] == granja[g][1]) {
                            granja.pop();
                            v--;
                        }
                    }
                }
            }
            estado = "jugando";
            break;
        /**
         * Una vez atrapas al pollo el estado del juego cambia a "win".
         * En esta parte del codigo lo primero que hacemos es vacias las array de la granja donde estaban todas las
         * coordenadas y las arrays del ganado donde estaban las coordenadas de todas las vacas y la de piara donde
         * se encontraban las coordenadas de los cerdos.
         * Como el juego continua subamos un nivel al juego lo que aumenta en 1 el numero de vacas y cerdos que
         * apareceran.
         * Volvemos a cargar la variable animales para rellenar nuevamente nuestra granaja de animales y cambiamos
         * nuevamente la variable estado a juagndo.
         */
        case "win":
            borrarArray(granja);
            borrarArray(ganado);
            borrarArray(piara);
            nivel++;
            aleatorioVacas = aleatorio(1, 10);
            aleatorioCerdos = aleatorio(1, 10);
            aleatorioVacas = aleatorioVacas + nivel;
            aleatorioCerdos = aleatorioCerdos + nivel;
            animales = aleatorioVacas + aleatorioCerdos + 2;
            for (v = 0; v < animales; v++) {
                var x = aleatorio(0, 6);
                var y = aleatorio(0, 6);
                granja[v] = [x, y];
                for(g in granja) {
                    if(v != g) {
                        if(granja[v][0] == granja[g][0] && granja[v][1] == granja[g][1]) {
                            granja.pop();
                            v--;
                        }
                    }
                }
            }
            estado = "jugando";
            break;
        /**
         * En el estado lose se entra cuando topas con una vaca o con un cerdo.
         * En cuyo caso vaciamos las arrays como en el caso anterior, reinicializamos el nivel y cambiamos la
         * variable estado.
         */
        case "lose":
            borrarArray(granja);
            borrarArray(ganado);
            borrarArray(piara);
            nivel = 0;
            aleatorioVacas = aleatorio(1, 10);
            aleatorioCerdos = aleatorio(1, 10);
            aleatorioVacas = aleatorioVacas + nivel;
            aleatorioCerdos = aleatorioCerdos + nivel;
            animales = aleatorioVacas + aleatorioCerdos + 2;
            for (v = 0; v < animales; v++) {
                var x = aleatorio(0, 6);
                var y = aleatorio(0, 6);
                granja[v] = [x, y];
                for(g in granja) {
                    if(v != g) {
                        if(granja[v][0] == granja[g][0] && granja[v][1] == granja[g][1]) {
                            granja.pop();
                            v--;
                        }
                    }
                }
            }
            estado = "jugando";
            break;
    }
    /**
     * Una vez tenemos todas las coordenadas pasamos a cargar nuestro juego con las imagenes.
     * Primero el fondo y sobre este pintaremos el resto de animales
     * Las coordenadas en la posicion 0 y 1 del array granja son para el pollo y el zorro respectivamente.
     * Por lo que a la hora de pintar las vacas y los cerdos nos saltaremos estas dos coordenadas
     * Al cargar las vacas y los cerdos rellenamos el array de ganado y piara respectivamente para que cuando
     * movamos al zorro sepamos donde estaban ubicadas las vacas y los cerdos.
     */
    if (fondo.cargaOK) {
        lienzo.drawImage(fondo.objeto, 0, 0);
    }
    if (vaca.cargaOK) {
        for (v = 0; v < aleatorioVacas; v++) {
            var x = v + 2;
            vaca.x = granja[x][0] * anchoAnimal;
            vaca.y = granja[x][1] * anchoAnimal;
            var vaquita = [vaca.x,vaca.y];
            ganado[v] = vaquita;
            lienzo.drawImage(vaca.objeto, vaca.x, vaca.y);
        }
    }
    if (cerdo.cargaOK) {
        for (c = 0; c < aleatorioCerdos; c++) {
            var x = c + 2 + aleatorioVacas;
            cerdo.x = granja[x][0] * anchoAnimal;
            cerdo.y = granja[x][1] * anchoAnimal;
            var cerdito = [cerdo.x,cerdo.y];
            piara[c] = cerdito;
            lienzo.drawImage(cerdo.objeto, cerdo.x, cerdo.y);
        }
    }
    if (pollo.cargaOK) {
        pollo.x = granja[0][0] * anchoAnimal;
        pollo.y = granja[0][1] * anchoAnimal;
        lienzo.drawImage(pollo.objeto, pollo.x, pollo.y);
    }
    if (zorro.cargaOK) {
        zorro.x = granja[1][0] * anchoAnimal;
        zorro.y = granja[1][1] * anchoAnimal;
        lienzo.drawImage(zorro.objeto, zorro.x, zorro.y);
    }
}



/**
 * Esta funcion establece el movimiento del zorro, dicho movimiento esta establecido segun el ancho de la pantalla.
 * Despues analiza la tecla que ha pulsado el usuario y en funcion de la que sea establece las coordenadas que se
 * le pasaran a la funcion caminar.
 * Aqui tambien establecemos que el el zorro llega a los bordes del mapa no pueda seguir avanzando y asi evitamos
 * que se salga del mapa.
 */
function moverZorro(evento) {
    var movimiento = anchoAnimal;
    var x = zorro.x;
    var y = zorro.y;
    if(evento.keyCode == undefined){
        evento = evento;
    } else {
        evento = evento.keyCode;
    }
    switch(evento) {
        case teclas.UP:
            if(zorro.y == 0){
                zorro.y = zorro.y;
            } else {
                zorro.y = y - movimiento;
            }
            caminar(x, y, x, y - movimiento, lienzo);
            break;
        case teclas.DOWN:
            if(zorro.y == 420 || zorro.y == 270){
                zorro.y = zorro.y;
            } else {
                zorro.y = y + movimiento;
            }
            caminar(x, y, x, y + movimiento, lienzo);
            break;
        case teclas.LEFT:
            if(zorro.x == 0){
                zorro.x = zorro.x;
            } else {
                zorro.x = x - movimiento;
            }
            caminar(x, y, x- movimiento, y, lienzo);
            break;
        case teclas.RIGHT:
            if(zorro.x == 420 || zorro.x == 270){
                zorro.x = zorro.x;
            } else {
                zorro.x = x + movimiento;
            }
            caminar(x, y, x + movimiento, y, lienzo);
            break;
    }
}

/**
 * Este codigo monitoriza el evento touch cuando utilizamos un movil o tablet
 * Se recogen las coordenadas de inicio y fin con los eventos touchstart y touchend y las pasamos a la funcion moveTouch.
 * La funciona evalua las coordenadas del evento touch e indica ha donde tenemos que mover el zorro.
 */
villa.addEventListener("touchstart", function(eventoInicio) {
    xStart = eventoInicio.changedTouches[0].pageX;
    yStart = eventoInicio.changedTouches[0].pageY;
});
villa.addEventListener("touchend", function(eventoFinal) {
    xEnd = eventoFinal.changedTouches[0].pageX;
    yEnd = eventoFinal.changedTouches[0].pageY;
    moveTouch();
});
function moveTouch() {
    var direccionX = xStart - xEnd;
    var direccionY = yStart - yEnd;
    if(direccionX < 0){ direcX = -(direccionX); } else { direcX = direccionX; }
    if(direccionY < 0){ direcY = -(direccionY); } else { direcY = direccionY; }
    if(direcX > direcY ) {
        if(direccionX < 0){
            walking = teclas.RIGHT;
            moverZorro(walking);
        } else {
            walking = teclas.LEFT;
            moverZorro(walking);
        }
    } else {
        if(direccionY < 0) {
            walking = teclas.DOWN;
            moverZorro(walking);
        } else {
            walking = teclas.UP;
            moverZorro(walking);
        }
    }
}


/**
 * Esta funcion pinta nuevamente a todo el tablero tal cual estaba y coloca al zorro en la nueva coordenada.
 * Por ultimo comprueba si la nueva posicion coincide con alguna coordenada de cualquier otro animal.
 * Si es el pollo lanza un alert de victoria, cambia la variable estado a win y ejecuta la funcion cargar.
 * Si es una vaca o un cerdo lanza un alert de derrota, cambia la variable estado a lose y ejecuta la funcion cargar.
 */
function caminar(xi, yi, xf, yf, lienzo) {
    lienzo.beginPath();
    lienzo.moveTo(xi, yi);
    lienzo.lineTo(xf, yf);
    lienzo.stroke();
    lienzo.closePath();
    if (fondo.cargaOK) {
        lienzo.drawImage(fondo.objeto, 0, 0);
    }
    if (vaca.cargaOK) {
        for (positionVaca in ganado) {
            vaca.x = ganado[positionVaca][0];
            vaca.y = ganado[positionVaca][1];
            lienzo.drawImage(vaca.objeto, vaca.x, vaca.y);
        }
    }
    if (pollo.cargaOK) {
        lienzo.drawImage(pollo.objeto, pollo.x, pollo.y);
    }
    if (cerdo.cargaOK) {
        for (positionCerdo in piara) {
            cerdo.x = piara[positionCerdo][0];
            cerdo.y = piara[positionCerdo][1];
            lienzo.drawImage(cerdo.objeto, cerdo.x, cerdo.y);
        }
    }
    if (zorro.cargaOK) {
        lienzo.drawImage(zorro.objeto, zorro.x, zorro.y);
        setTimeout(comprobar, 50);
        function comprobar() {
            if(zorro.x == pollo.x && zorro.y == pollo.y) {
                alert("Atrapaste al pollito");
                estado = "win";
                cargar();
            } else {
                for(i = 2; i < granja.length; i++) {
                    var x = granja[i][0] * anchoAnimal;
                    var y = granja[i][1] * anchoAnimal;
                    if(zorro.x == x && zorro.y == y) {
                        alert("No es un pollo, has perdido");
                        estado = "lose";
                        cargar();
                    }
                }
            }
        }
    }
}


/**
 * Estas son funciones genericas que se utilizan para que el codigo pueda realizar algunas acciones.
 *
 * Estas funcionaes bloquean el scroll mientras realizamos los movimientos del zorrito y lo vuelven a
 * habilitar una vez movido.
 */
var botonGo = document.getElementById("btnEmpezar");
var botonStop = document.getElementById("btnStop");
botonGo.addEventListener("click", empezamos);
botonStop.addEventListener("click", pausar);
function empezamos() {
    hideOrNot(botonGo);
    hideOrNot(botonStop);
    disableScroll();
}
function pausar() {
    hideOrNot(botonGo);
    hideOrNot(botonStop);
    enableScroll();
}


// Funcion basica que genera numeros aleatorios con los parametros que le damos
function aleatorio(min, max) {
    var resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    return resultado;
}

function borrarArray(array) {
    for (var x = array.length; x > 0; x--) {
        array.pop();
    }
}

function disableScroll(){
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
}
function enableScroll(){
    document.getElementsByTagName("html")[0].style.overflow = "auto";
}

function hideOrNot(etiqueta) {
    etiqueta.classList.contains("hide") ? etiqueta.classList.remove("hide") : etiqueta.classList.add("hide");
}