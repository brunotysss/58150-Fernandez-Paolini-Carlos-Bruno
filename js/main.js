  
  
  // Objeto JavaScript con países de América Latina
  var paisesLatinoamerica = {
    "Argentina": [ "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"],
    "Brasil": ["Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahía",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"],
    // Agrega más países y sus provincias aquí
};

// Clase Persona y array para almacenar objetos de personas registradas
class Persona {
    constructor(nombre, apellido, direccion, departamento, correo, dni, telefono, pais, provincia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.departamento = departamento;
        this.correo = correo;
        this.dni = dni;
        this.telefono = telefono;
        this.pais = pais;
        this.provincia = provincia;
    }
}

const personasRegistradas = [];


if (document.getElementById("pais") && document.getElementById("provincia")) {
    // Las funciones se ejecutarán solo si los elementos con los ID "pais" y "provincia" existen en la página
    function cargarPaises() {
        var paisSelect = document.getElementById("pais");

        for (var pais in paisesLatinoamerica) {
            var option = document.createElement("option");
            option.value = pais;
            option.text = pais;
            paisSelect.add(option);
        }
    }

    function mostrarProvincias() {
        var paisSelect = document.getElementById("pais");
        var provinciaSelect = document.getElementById("provincia");
        var selectedCountry = paisSelect.value;

        // Habilita el select de provincias si se ha seleccionado un país
        provinciaSelect.disabled = selectedCountry === "";

        // Limpia y carga las provincias correspondientes al país seleccionado
        provinciaSelect.innerHTML = ""; // Limpia las opciones existentes

        if (selectedCountry) {
            var provincias = paisesLatinoamerica[selectedCountry];
            provincias.forEach(function (provincia) {
                var option = document.createElement("option");
                option.value = provincia;
                option.text = provincia;
                provinciaSelect.appendChild(option);
            });
        }
    }
    cargarPaises();
}






// Obtén el formulario
const formulario = document.getElementById("registroForm");

if (formulario) {
// Maneja el evento "submit" del formulario
formulario.addEventListener("submit", function (event) {
    // Cancela el envío del formulario por defecto
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;
    const departamento = document.getElementById("departamento").value;
    const correo = document.getElementById("correo").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;
    const pais = document.getElementById("pais").value;
    const provincia = document.getElementById("provincia").value;

    // Verifica si algún campo está vacío o no cumple con las validaciones HTML
    if (
        nombre === "" ||
        apellido === "" ||
        direccion === "" ||
        correo === "" ||
        dni === "" ||
        telefono === "" ||
        pais === "" ||
        provincia === "" ||
        !formulario.checkValidity() // Verifica las validaciones HTML
    ) {
        // Muestra un mensaje de error
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente antes de registrarte.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        // Todos los campos están llenos y pasan las validaciones HTML, procede con el registro
        const nuevaPersona = new Persona(nombre, apellido, direccion, departamento, correo, dni, telefono, pais, provincia);
        personasRegistradas.push(nuevaPersona);

        // Guarda la información en localStorage
        localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevaPersona));

        // Mostrar SweetAlert 2 para confirmación
        Swal.fire({
            title: 'Registro Exitoso',
            text: '¡' + nombre + ' ' + apellido + ' ha sido registrado con éxito!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirige a la página de inicio después de registrar
                window.location.href = "../index.html";

                // Actualiza el enlace en el navbar con el nombre del usuario
                const enlaceNavbar = document.getElementById("usuario-nav");
                enlaceNavbar.textContent = nombre; // Personaliza el texto como desees
            }
        });
    }
});

}
// Actualiza el enlace en el navbar con el nombre del usuario
const enlaceNavbar = document.getElementById("usuario-nav");
const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

if (enlaceNavbar && usuarioRegistrado) {
    enlaceNavbar.textContent = usuarioRegistrado.nombre;
}




