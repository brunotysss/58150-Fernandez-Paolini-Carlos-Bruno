const baseDeDatos = [];

fetch("../data/productos/productos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la carga de los datos");
        }
        return response.json();
    })
    .then(data => {
        for (const generico of data) {
            baseDeDatos.push(new Producto(generico.idProducto, generico.nombreProducto, generico.marcaProducto, generico.categoria, generico.descripcionProducto, generico.precio, generico.img));
        }
        tienda.listarProductos(baseDeDatos);
    })
    .catch(error => {
        console.error(error);
    });