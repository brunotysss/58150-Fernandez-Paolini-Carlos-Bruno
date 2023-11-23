const baseDeDatos = [];

// Función para cargar productos desde JSON
function cargarProductos() {
    fetch("../data/productos/productos.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la carga de los datos");
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos cargados:", data); // Agrega esta línea
            for (const generico of data) {
                baseDeDatos.push(new Producto(generico.idProducto, generico.nombreProducto, generico.marcaProducto, generico.categoria, generico.descripcionProducto, generico.precio, generico.img));
            }
            tienda.listarProductos(baseDeDatos);
            // Llama a eventos después de cargar los productos
            eventosBotones(carrito);
            console.log("Productos cargados:", baseDeDatos);

        })
        .catch(error => {
            console.error(error);
        });
}

// Llama a cargarProductos
cargarProductos();