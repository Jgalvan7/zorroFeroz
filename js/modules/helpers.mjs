// Estas funcionas nos sirven de apoyo para poder realizar algunas tareas en el código.

export function aleatorio(min, max) {
    var resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    return resultado;
}

export function rellenoArray(animales,Granja) {
    for (let v = 0; v < animales; v++) {
        // Por cada iteración del ciclo se crea un número aleatorio para la posición X e Y. El rango para calcular el número aleatorio viene dado por la cantidad de animales que caben en el tablero.
        // Si el tablero es cuadrado el rango será igual para ambas coordenadas y el tablero es mas ancho que largo el rango de la coordenada X será mayor que el de la coordenada Y.
        // Para calcular los rangos simplemente se divide el ancho del tablero entre el ancho de la imagen de los animales y para el largo utilizaremos el alto del tablero y lo dividimos por el alto de la imagen de los animales.
        let x = aleatorio(0, 12);
        let y = aleatorio(0, 5);
        // una vez tenemos las coordenadas las pasamos y guardamos en el array Granja.
        Granja[v] = [x, y];
        // Con este ciclo comprobamos que en la posición que acabamos de guardar no este repetida con otra, asi los animales no se superpondrán unos encima de otros.
        // Si la posición que acabamos de guardar ya existe en el array borramos la última posición del array y restasmos uno al ciclo inicial para repetir esta última iteración nuevamente.
        for(let g in Granja) {
            if(v != g) {
                if(Granja[v][0] == Granja[g][0] && Granja[v][1] == Granja[g][1]) {
                    Granja.pop();
                    v--;
                }
            }
        }
    }
}

export function borrarArray(array) {
    for (var x = array.length; x > 0; x--) {
        array.pop();
    }
}