const baseDeDatos = [];
$.get("../data/productos/productos.json", function(respuesta,estado){
    if(estado=="success"){
        for (const generico of respuesta) {
            baseDeDatos.push(new Producto(generico.idProducto, generico.nombreProducto, generico.marcaProducto, generico.categoria, generico.descripcionProducto, generico.precio, generico.img));
        }
    }else{
        console.log("Error en la carga de los datos");
    } 
    tienda.listarProductos(tienda.baseDeDatos);
})