class Carrito {
    constructor(productos) {
        this.productos = productos;
    }

    agregarAlCarrito(producto) {
        const idProducto = producto.idProducto;
        const existeIndex = this.productos.findIndex(p => p.idProducto === idProducto);
    
        if (existeIndex === -1) {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            this.productos.push({ ...producto, cantidad: 1 });
        } else {
            // Si el producto ya está en el carrito, aumentar la cantidad
            this.productos[existeIndex].cantidad++;
        }
    
        localStorage.setItem('Carrito', JSON.stringify(this.productos));
        let contadorCarrito = document.getElementById("contadorCarrito");
        contadorCarrito.innerHTML = contadorCarritos();
    }
    totalCarrito() {
        let total = 0;
        for (const producto of this.productos) {
            total = total + (producto.precio * producto.cantidad);
        }
        let bodyCarrito = document.getElementById("bodyCarrito")
        let contenedor = document.createElement("tr");
        contenedor.innerHTML = `
                                    <th scope="row"></th>
                                    <td colspan=3>Total:</td>
                                    <td>$${total}</td>
                                    `;
        bodyCarrito.appendChild(contenedor);
    }

    listarProductos() {
        let espacioProductos = document.querySelector(".product-grid");
        espacioProductos.innerHTML = "";
  //      let bodyCarrito = document.getElementById("bodyCarrito")
    //    bodyCarrito.innerHTML = "";
        for (const producto of this.productos) {
            let contenedor = document.createElement("tr");
            contenedor.innerHTML = `
                                    <th scope="row">${producto.idProducto}</th>
                                    <td>${producto.nombreProducto}</td>
                                    <td>${producto.categoria}</td>
                                    <td>$${producto.precio}</td>
                                    <td><button id="${producto.idProducto}" type="button" class="btnSub btn btn-danger btn-sm p-2">-</button> ${producto.cantidad} <button id="${producto.idProducto}" type="button" class="btnAdd btn btn-danger btn-sm p-2">+</button></td>
                                    <td>${producto.precio * producto.cantidad}</td>
                                    <td class="btnEliminarProducto"><button id="${producto.idProducto}" type="button" class="btnDelete btn btn-danger btn-sm p-2">X</button></td>
                                    `;
            bodyCarrito.appendChild(contenedor);
        };
        this.totalCarrito();
        btnEliminar();
        btnAdd();
        btnSub();
        contadorCarritos()
    }
}

function eliminarDelCarrito(e) {
    let posicion = carrito.productos.findIndex(producto => producto.idProducto == e.target.id);
    carrito.productos[posicion].vaciarCantidad()
    carrito.productos.splice(posicion, 1)
    $('#contadirCarrito').innerHTML = contadorCarritos();
    carrito.listarProductos()
    localStorage.setItem('Carrito', JSON.stringify(carrito.productos));
}

function btnEliminar() {
    $(".btnDelete ").on("click", eliminarDelCarrito)
}
function btnAdd() {
    $(".btnAdd ").on("click", addCantidad)
}
function addCantidad() {
    let producto = carrito.productos.find(p => p.idProducto == this.id)
    producto.agregarCantidad(1);
    addcontadorCarrito(1)
    carrito.listarProductos()
    localStorage.setItem('Carrito', JSON.stringify(carrito.productos));
}
function btnSub() {
    $(".btnSub ").on("click", restarCantidad)
}

function restarCantidad() {
    let producto = carrito.productos.find(p => p.idProducto == this.id)
    if (producto.cantidad > 1) {
        producto.agregarCantidad(-1);
        addcontadorCarrito(-1)
    }
    carrito.listarProductos()

    localStorage.setItem('Carrito', JSON.stringify(carrito.productos));
}

function contadorCarritos() {
    let total = 0;
    for (const producto of carrito.productos) {
        total += producto.cantidad
    }
    return total
};

function addcontadorCarrito(valor) {
    let total = parseInt(contadorCarrito.innerHTML)
    contadorCarrito.innerHTML = total + valor;
};
