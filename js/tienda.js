class Tienda {
    constructor(nombre, direccion, telefono, baseDeDatos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.baseDeDatos = baseDeDatos;
    }
    filtrarProductoPorCategoria(valor, carrito) {
        let espacioProductos = document.querySelector(".product-grid");
        espacioProductos.innerHTML = "";
        const encontrado = this.baseDeDatos.filter(producto => producto.categoria == valor);
        this.listarProductos(encontrado, carrito);
    };

    buscarProductoPorId(valorId) {
        const encontrado = this.baseDeDatos.find(producto => producto.idProducto == valorId);
        return encontrado;
    };



    listarProductos(baseDeDatos, carrito) {
        let espacioProductos = document.querySelector(".product-grid");
        espacioProductos.innerHTML = "";
    
        for (const producto of baseDeDatos) {
            let productItem = document.createElement("div");
            productItem.className = "product-item";
    
            let card = document.createElement("div");
            card.className = "card";
    
            let imgContainer = document.createElement("div");
            imgContainer.className = "img-container";
    
            let imagen = document.createElement("img");
            imagen.src = `../img/${producto.img}`;
            imagen.className = "card-img-top";
            imagen.alt = `${producto.descripcionProducto}`;
    
            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
    
            cardBody.innerHTML = `
                <h3 class="card-title">${producto.nombreProducto}</h3>
                <p class="card-text">$${producto.precio}</p>
                <p class="installments">6 cuotas sin interés</p>        
                <button id="${producto.idProducto}" type="button" class="btn btn-primary btnComprar">Agregar al carrito</button>                      
            `;
    
            cardBody.querySelector('.btnComprar').onclick = function () {
                carrito.agregarAlCarrito(producto);
            };
    
            imgContainer.appendChild(imagen); // Agrega la imagen al contenedor de la imagen
            card.appendChild(imgContainer);
            card.appendChild(cardBody);
            productItem.appendChild(card);
            espacioProductos.appendChild(productItem);
        }
    
        btnComprarOnClic(carrito);
    }




}