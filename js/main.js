const tienda = new Tienda('3d dreams', 'balcarce 450', 4885548, baseDeDatos);
const carrito = new Carrito([]);
tienda.listarProductos(tienda.baseDeDatos);
verificarLocalStorage(carrito);
btnComprarOnClic(carrito);
eventosBotones(carrito);
$(document).ready(function () {
    btnComprarOnClic(carrito);
    eventosBotones(carrito);

    
});

console.log(tienda.baseDeDatos);

console.log("Instancia de Tienda en main.js:", tienda);
class Producto {
    constructor(idProducto, nombreProducto, marcaProducto, categoria, descripcionProducto, precio, img, cantidad) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.marcaProducto = marcaProducto;
        this.categoria = categoria;
        this.descripcionProducto = descripcionProducto;
        this.precio = precio;
        this.img = img;
        this.cantidad= cantidad || 1;
    }
    agregarCantidad(valor){
        this.cantidad += valor
    }
    subTotal(){
        return this.cantidad * this.precio;
    }
    vaciarCantidad(){
        this.cantidad = 1;
    }
    modificarCantidad(valor){
        this.cantidad = valor
    }
}











/* AGREGAR AL CARRITO Y MODIFICAR POR MEDIO DE MODALS */

function btnComprarOnClic(carrito) {
    let botones = document.querySelectorAll('.product-grid .btnComprar');
    for (const boton of botones) {
        boton.onclick = function () {
            let producto = tienda.buscarProductoPorId(boton.id);
            carrito.agregarAlCarrito(producto);
        }
    }
}

    function selectFiltroOnChange(carrito) {
        let listasCategorias = document.querySelectorAll('.navbar-nav .nav-item.dropdown');
    
        listasCategorias.forEach(lista => {
            let enlaceCategoria = lista.querySelector('.nav-link');
    
            enlaceCategoria.addEventListener('click', function (event) {
                event.preventDefault();
    
                // Cambios aquí
                let categoriaSeleccionada = enlaceCategoria.textContent.trim();
                console.log("Categoría seleccionada:", categoriaSeleccionada);
    
                if (categoriaSeleccionada !== "Todas") {
                    tienda.filtrarProductoPorCategoria(categoriaSeleccionada, carrito);
                } else {
                    tienda.listarProductos(tienda.baseDeDatos, carrito);
                }
            });
        });
    }
function verificarLocalStorage(carrito) {
    if ('Carrito' in localStorage) {
        const productosStorage = JSON.parse(localStorage.getItem("Carrito"));
        for (const producto of productosStorage) {
            const found = baseDeDatos.find(p => p.idProducto == producto.idProducto)
            found.modificarCantidad(producto.cantidad)
            carrito.productos.push(found);
        }
    } else {
        carrito.productos = [];
    } 
    let contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.innerHTML = contadorCarritos();
}

function carritoOnClick(carrito) {
    let btnCarrito = document.getElementById('btnCarrito')
    console.log("asdasd", btnCarrito);
    console.log("asdasd", carrito);
    btnCarrito.onclick = function () {
        carrito.listarProductos(carrito)
    }
}

function VaciarCarritoOnClick(carrito) {
    let btnVaciar = document.getElementById('btnVaciarCarrito')
    btnVaciar.onclick = function () {
        localStorage.clear();
        for (const producto of carrito.productos) {
            producto.vaciarCantidad()
        }
        carrito.productos = [];
        let contadorCarrito = document.getElementById("contadorCarrito");
        contadorCarrito.innerHTML = 0;
        carrito.listarProductos();

    }
}

function eventosBotones(carrito) {
    btnComprarOnClic(carrito);
    selectFiltroOnChange(carrito);
    carritoOnClick(carrito);
    VaciarCarritoOnClick(carrito);
}

$("#btnFinalizar").click(enviarEmail);

function enviarEmail(e) {
    e.preventDefault();
    $.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(carrito.productos), function (respuesta, estado) {
        if (estado == "success") {
            // Calcular el total de la compra
            let total = 0;
            for (const producto of carrito.productos) {
                total += producto.subTotal();
            }

            // Mostrar mensaje de confirmación con SweetAlert
            Swal.fire({
                title: 'Compra confirmada',
                html: `¡Gracias por tu compra!<br>El total es: $${total.toFixed(2)}`,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Eliminar el carrito del localStorage
                    localStorage.removeItem('Carrito');

                    // Reiniciar la lista de productos del carrito
                    for (const producto of carrito.productos) {
                        producto.vaciarCantidad();
                    }
                    carrito.productos = [];

                    // Actualizar la interfaz, por ejemplo, mostrando el carrito vacío
                    let contadorCarrito = document.getElementById("contadorCarrito");
                    contadorCarrito.innerHTML = 0;
                    carrito.listarProductos();
                }
            });
        }
    });
}
// Agrega la siguiente línea para inicializar la funcionalidad al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    eventosBotones(carrito);
    console.log("Página cargada");
    // Puedes agregar más inicializaciones si es necesario
});


