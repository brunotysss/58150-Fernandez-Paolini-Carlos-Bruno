class Tienda {
    constructor(nombre, direccion, telefono, baseDeDatos) {
        console.log("Instancia de Tienda creada");
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.baseDeDatos = baseDeDatos;
    }


    filtrarProductoPorCategoria(valor, carrito) {
        let espacioProductos = document.getElementsByClassName("product-grid")
        espacioProductos[0].innerHTML = "";
        const encontrado = this.baseDeDatos.filter(producto => producto.categoria == valor);
        console.log("Productos encontrados:", encontrado);
        this.listarProductos(encontrado, carrito);
    };
/*
    filtrarProductoPorCategoria(valor, carrito) {
        let espacioProductos = document.querySelector(".product-grid");
        espacioProductos.innerHTML = "";
    
        if (valor !== "Todas") {
            const categoriaSeleccionada = valor.trim().toLowerCase();

            console.log("Productos filtrados1111:", categoriaSeleccionada);
           /// console.log("Productos filtrados2222:", producto.categoria.trim().toLowerCase());

           const filtrados = this.baseDeDatos.filter(producto => limpiarCategorias(producto.categoria) === categoriaSeleccionada);///////// no funcionaaaaaaaaaaaaaaaaaa arreglar
//           const limpiarCategorias = categoria => categoria.trim().toLowerCase();

            console.log("Productos filtrados:", filtrados);
    
            this.listarProductos(filtrados, carrito);
        } else {
            this.listarProductos(this.baseDeDatos, carrito);
        }
    };
*/





    
    buscarProductoPorId(valorId) {
        const encontrado = this.baseDeDatos.find(producto => producto.idProducto == valorId);
        return encontrado;
    };

    listarProductos(encontrado,carrito) {
        console.log(carrito);
        let espacioProductos = document.querySelector(".product-grid");
        espacioProductos.innerHTML = "";
    
        for (const producto of encontrado) {
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
    
            imgContainer.appendChild(imagen);
            card.appendChild(imgContainer);
            card.appendChild(cardBody);
            productItem.appendChild(card);
            espacioProductos.appendChild(productItem);
        }
    
        btnComprarOnClic(carrito);
    
        console.log("Productos listados:", this.baseDeDatos);
    }
    
}
