export class ElementMain {
    constructor({
        clase,
        id
    }) {
        this.element = "main";
        this.clase = clase;
        this.id = id;
    }
    agregar() {
        const elemento = document.createElement(this.element);
        elemento.setAttribute("class", this.clase);
        elemento.setAttribute("id", this.id);
        document.body.appendChild(elemento);
    }
    eliminar() {
        const elemento = document.getElementById(this.id);
        document.body.removeChild(elemento);
    }

}

export class ElementoHTML {
    constructor({
        element,
        clase,
        id,
        parent,
        src,
        href,
        alt,
        title,
        type,
        name,
        width,
        height
    }) {
        this.element = element;
        this.clase = clase;
        this.id = id;
        this.parent = parent;
        if(this.element == "img") {
            this.src = src;
            this.title = title;
            this.alt = alt;
            this.width = width;
            this.height = height;
        }
        if(this.element == "a") {
            this.href = href;
        }
        if(this.element == "input") {
            this.type = type;
            this.name = name;
            this.size = size;
        }
        if(this.element == "canvas") {
            this.width = width;
            this.height = height;
        }
    }
    agregarContenedor() {
        const elemento = document.createElement(this.element);
        elemento.setAttribute("class", this.clase);
        elemento.setAttribute("id", this.id);
        const ElementParent = document.getElementById(this.parent);
        ElementParent.appendChild(elemento);
    }
    agregarImagen() {
        let elemento = document.createElement(this.element);
        elemento.setAttribute("id", this.id);
        elemento.setAttribute("src", this.src);
        elemento.setAttribute("alt", this.alt);
        elemento.setAttribute("title", this.title);
        elemento.setAttribute("width", this.width);
        elemento.setAttribute("height", this.height);
        const ElementParent = document.getElementById(this.parent);
        ElementParent.appendChild(elemento);
    }
    agregarParrafo() {
        let elemento = document.createElement(this.element);
        elemento.setAttribute("", this.src);
    }
    agregarBoton() {
        const elemento = document.createElement(this.element);
        elemento.setAttribute("class", this.clase);
        elemento.setAttribute("id", this.id);
        const ElementParent = document.getElementById(this.parent);
        ElementParent.appendChild(elemento);
    }
    agregarLink() {
        const elemento = document.createElement(this.element);
        elemento.setAttribute("class", this.clase);
        elemento.setAttribute("id", this.id);
        elemento.setAttribute("href", this.href);
        const ElementParent = document.getElementById(this.parent);
        ElementParent.appendChild(elemento);
    }
    agregarCanvas() {
        let elemento = document.createElement(this.element);
        elemento.setAttribute("class", this.clase);
        elemento.setAttribute("id", this.id);
        elemento.setAttribute("width", this.width);
        elemento.setAttribute("height", this.height);
        const ElementParent = document.getElementById(this.parent);
        ElementParent.appendChild(elemento);
    }
    eliminar() {
        const ID = this.id;
        const elemento = document.getElementById(ID);
        const elementoPadre = elemento.parentNode;
        elementoPadre.removeChild(elemento);
    }
    changeSrc(newValor) {
        this.src = newValor;
    }
}