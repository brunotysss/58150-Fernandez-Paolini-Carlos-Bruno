class Carrito {
    constructor(productos) {
        this.productos = productos;
    }

    agregarAlCarrito(producto) {
        const idProducto = producto.idProducto;
        const existe = this.productos.find(p => p.idProducto === idProducto);

        if (existe === undefined) {
            this.productos.push(producto);
        } else {
            producto.agregarCantidad(1);
        }

        localStorage.setItem('Carrito', JSON.stringify(this.productos));
        actualizarContadorCarrito();
    }

    totalCarrito() {
        let total = 0;

        for (const producto of this.productos) {
            total += producto.precio * producto.cantidad;
        }

        let bodyCarrito = document.getElementById("bodyCarrito");
        let contenedor = document.createElement("tr");
        contenedor.innerHTML = `
            <th scope="row"></th>
            <td colspan=3>Total:</td>
            <td>$${total}</td>
        `;
        bodyCarrito.appendChild(contenedor);
    }

    listarProductos() {
        let bodyCarrito = document.getElementById("bodyCarrito");
        bodyCarrito.innerHTML = "";

        for (const producto of this.productos) {
            let contenedor = document.createElement("tr");
            contenedor.innerHTML = `
                <th scope="row">${producto.idProducto}</th>
                <td>${producto.nombreProducto}</td>
                <td>${producto.categoria}</td>
                <td>$${producto.precio}</td>
                <td>
                    <button id="${producto.idProducto}" type="button" class="btnSub btn btn-danger btn-sm p-2">-</button>
                    ${producto.cantidad}
                    <button id="${producto.idProducto}" type="button" class="btnAdd btn btn-danger btn-sm p-2">+</button>
                </td>
                <td>${producto.precio * producto.cantidad}</td>
                <td class="btnEliminarProducto"><button id="${producto.idProducto}" type="button" class="btnDelete btn btn-danger btn-sm p-2">X</button></td>
            `;
            bodyCarrito.appendChild(contenedor);
        }

        this.totalCarrito();
        vincularEventosBotones();
    }
}

function eliminarDelCarrito(e) {
    let posicion = carrito.productos.findIndex(producto => producto.idProducto == e.target.id);
    carrito.productos[posicion].vaciarCantidad();
    carrito.productos.splice(posicion, 1);
    actualizarContadorCarrito();
    carrito.listarProductos();
    localStorage.setItem('Carrito', JSON.stringify(carrito.productos));
}

function btnEliminar() {
    let botonesDelete = document.querySelectorAll(".btnDelete");
    botonesDelete.forEach(btn => btn.addEventListener("click", eliminarDelCarrito));
}

function addCantidad() {
    let producto = carrito.productos.find(p => p.idProducto == this.id);
    producto.agregarCantidad(1);
    addcontadorCarrito(1);
    carrito.listarProductos();
    localStorage.setItem('Carrito', JSON.stringify(carrito.productos));
}

function btnAdd() {
    let botonesAdd = document.querySelectorAll(".btnAdd");
    botonesAdd.forEach(btn => btn.addEventListener("click", addCantidad));
}

function restarCantidad() {
    let producto = carrito.productos.find(p => p.idProducto == this.id);

    if (producto.cantidad > 1) {
        producto.agregarCantidad(-1);
        addcontadorCarrito(-1);
    }

    carrito.listarProductos();
    localStorage.setItem('Carrito', JSON.stringify(carrito.productos));
}

function btnSub() {
    let botonesSub = document.querySelectorAll(".btnSub");
    botonesSub.forEach(btn => btn.addEventListener("click", restarCantidad));
}

function contadorCarritos() {
    let total = 0;

    for (const producto of carrito.productos) {
        total += producto.cantidad;
    }

    return total;
}

function addcontadorCarrito(valor) {
    let total = parseInt(document.getElementById("contadorCarrito").innerHTML);
    document.getElementById("contadorCarrito").innerHTML = total + valor;
}

function actualizarContadorCarrito() {
    document.getElementById('contadorCarrito').innerHTML = contadorCarritos();
}

function vincularEventosBotones() {
    btnEliminar();
    btnAdd();
    btnSub();
}

// Agrega la siguiente línea para inicializar la funcionalidad al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    vincularEventosBotones();
    console.log("Página cargada");
    // Puedes agregar más inicializaciones si es necesario
});
