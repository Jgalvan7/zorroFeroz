# Zorro Feroz
![Portada del juego Zorro Feroz](https://jgalvandesign.com/assets/images/project__zorroFeroz.jpg)
## Descripción
Este pequeño proyecto está realizado con unas pocas líneas de código en HTML5 y Javascript.

El proyecto lo realice mientras practicaba con Javascript, a la vista está que no soy ningún experto, animo a todo aquel que quiera contribuir con mejoras en el código o en el propio juego.

Es un juego bastante sencillo e infantil, pero es un proyecto que me ha gustado mucho realizar ya que lo hice para mi hijo de 5 años.

El juego se trata de llegar a la posición del pollo moviendo el zorrito con las flechas del teclado, también es posible jugar desde una tablet o móvil ya que reconoce el evento touch, solo desliza el dedo en la dirección que deseas mover el zorrito, todo esto sin chocar con ninguna vaca o cerdito.

No está diseñado para que estés jugando durante horas ya que cada vez que atrapas al pollo el número de vacas y cerdos aleatorio sube en +1 puede ser que salgan muchos o pocos eso dependera de tu suerte pero si es cierto que cuanto mas avanzas mas facil es que las vacas o los cerdos bloqueen el camino al pollo.

Seguiré mejorando y realizando actualizaciones para incorporar mejoras, pues aunque mi hijo de 5 años está fascinado con el tiene un buen eje de mejora y escalabilidad para hacerlo más entretenido.


## INSTALACIÓN
Puedes descargar los archivos desde Github directamente o clonar el repositorio.
URL de Descarga: https://github.com/Jgalvan7/zorroFeroz.git
Clonar erpositorio: $ git clone https://github.com/Jgalvan7/zorroFeroz.git


## CÓMO USAR
Para implementarlo en otro proyecto, simplemente debe agregar estas tres líneas de código al proyecto:
En el HEAD:
``<link rel="stylesheet" href="/css/styles.css">
En el BODY:
``<section class="moduloZorroFeroz" id="game"></section>
``<script src="./src/zorroFeroz.js"></script>


### Link de acceso
Https://jgalvandesign.com/zorroFeroz.html


### Tecnologías
HTML5, CSS, Javascript


# LICENCIA
MIT


### Versión
2.0


### Fecha último Update
02/10/2021


### Notas del último parche 02/10/2021
En esté update se han realizado cambios muy importantes, tanto en el diseño como en el proyecto. Se ha sacado el canvas para este separado de mi site, asi si alguien quiere implementarlo en su proyecto o trabajar en el les resultará mas fácil.
Se ha creado una portada del juego y un botón para inicar el juego el cual mostrará un menú para jugar o salir.
Se ha cambiado el mapa de juego y la imagen del pollito.
Se ha eliminado la funcionalidad de jugar en tablet o móvil por el momento ya que ahora el mapa no redimensiona, espero corregir esto en futuras actualizaciones para poder volver a implementar la funcionalidad en tablet y móviles.
**Puntos importantes.**
1.- HTML: Como se ha indicado se ha limpiado el documento de HTML dejando solo el section corespondiante al proyecto.
2.- CSS: Se crea un nuevo archivo para dar estilos al section donde se cargará todo el contenido y el los elementos de HTML que generaremos con JS.
3.- JS: Se han cambiado algunas declaraciones de variables ya que todas estaban con var y se pasan a let o const según corresponda, ahora se genran elemantos HTML desde JS para dar interactividad al juego.
### Notas del parche 26/07/2021
Es cierto que el ultimo parche el la primera versión, pero me gustaría aclarar que aunque no le di seguimiento al principio como proyecto individual para tener el feedback de las mejoras, en sus comienzos solo pintaba los animales, después se le agrego el movimiento al zorro para atrapar al pollo y el último reto que me planteo es el reconocimiento del evento touch, en ese momento lo he considerado proyecto ya que puedo seguir mejorando tanto el juego como el código y de seguro me seguirá planteando nuevos retos que me ayudaran a seguir avanzando en mi aprendizaje de Javascript.

1.- Adaptación del juego para poder utilizarlo en tablet y móvil con el reconocimiento del evento touch en JS.

