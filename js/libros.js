
document.addEventListener("DOMContentLoaded", () => {

    const pedidoForm = document.getElementById("pedido-form");
    const tbody = document.getElementById("estado-prestamos");

    if (!pedidoForm || !tbody) {
        console.error("No se encontraron los elementos necesarios.");
        return;
    }

    /*=========================================
        DATOS INICIALES
    =========================================*/

    const prestamosIniciales = [

        {
            id: 1,
            nombre: "Juan",
            apellido: "Pérez",
            documento: "32145678",
            correo: "juan@mail.com",
            libro: "El Quijote",
            autor: "Miguel de Cervantes",
            comentarios: "",
            fecha: "2026-05-28",
            estado: "Pendiente"
        },

        {
            id: 2,
            nombre: "Ana",
            apellido: "Gómez",
            documento: "28456789",
            correo: "ana@mail.com",
            libro: "Cien años de soledad",
            autor: "Gabriel García Márquez",
            comentarios: "",
            fecha: "2026-06-01",
            estado: "En progreso"
        },

        {
            id: 3,
            nombre: "Carlos",
            apellido: "López",
            documento: "29888777",
            correo: "carlos@mail.com",
            libro: "Ficciones",
            autor: "Jorge Luis Borges",
            comentarios: "",
            fecha: "2026-06-05",
            estado: "Entregado"
        }

    ];

    /*=========================================
        CARGAR LOCALSTORAGE
    =========================================*/

    function cargarPrestamos() {

        try {

            const datos = localStorage.getItem("prestamos");

            return datos
                ? JSON.parse(datos)
                : prestamosIniciales;

        } catch (error) {

            console.error("Error al leer LocalStorage.");

            return prestamosIniciales;
        }

    }

    let prestamos = cargarPrestamos();

    /*=========================================
        GUARDAR LOCALSTORAGE
    =========================================*/

    function guardarPrestamos() {

        localStorage.setItem(
            "prestamos",
            JSON.stringify(prestamos)
        );

    }

    /*=========================================
        CREAR CELDAS
    =========================================*/

    function crearCelda(texto) {

        const td = document.createElement("td");

        td.textContent = texto;

        return td;

    }

    /*=========================================
        RENDERIZAR TABLA
    =========================================*/

    function renderPrestamos() {

        tbody.innerHTML = "";

        prestamos.forEach((prestamo, index) => {

            const fila = document.createElement("tr");

            fila.appendChild(crearCelda(prestamo.nombre));
            fila.appendChild(crearCelda(prestamo.apellido));
            fila.appendChild(crearCelda(prestamo.libro));
            fila.appendChild(crearCelda(prestamo.autor));
            fila.appendChild(crearCelda(prestamo.fecha));

            /*=========================
                ESTADO
            =========================*/

            const tdEstado = document.createElement("td");

            const spanEstado = document.createElement("span");

            spanEstado.className =
                `estado-${prestamo.estado
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`;

            spanEstado.textContent = prestamo.estado;

            tdEstado.appendChild(spanEstado);

            fila.appendChild(tdEstado);

            /*=========================
                BOTÓN ELIMINAR
            =========================*/

            const tdAcciones = document.createElement("td");

            tdAcciones.className = "acciones";

            const btnEliminar = document.createElement("button");

            btnEliminar.className = "btn-eliminar";

            btnEliminar.dataset.index = index;

            btnEliminar.textContent = "Eliminar";

            tdAcciones.appendChild(btnEliminar);

            fila.appendChild(tdAcciones);

            tbody.appendChild(fila);

        });

    }

    /*=========================================
        ENVÍO DEL FORMULARIO
    =========================================*/

    pedidoForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const nombre = document.getElementById("nombreb").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const documento = document.getElementById("documento").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const libro = document.getElementById("libro").value.trim();
        const autor = document.getElementById("autor").value.trim();
        const comentarios = document.getElementById("comentarios").value.trim();
        const estado = document.getElementById("estado").value;

        /*=========================
            VALIDACIONES
        =========================*/

        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        const dniValido = /^\d{7,8}$/;
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !nombre ||
            !apellido ||
            !documento ||
            !correo ||
            !libro ||
            !autor
        ) {
            alert("Complete todos los campos obligatorios.");
            return;
        }

        if (!soloLetras.test(nombre)) {
            alert("El nombre sólo puede contener letras.");
            return;
        }

        if (!soloLetras.test(apellido)) {
            alert("El apellido sólo puede contener letras.");
            return;
        }

        if (!dniValido.test(documento)) {
            alert("El DNI debe contener 7 u 8 números.");
            return;
        }

        if (!correoValido.test(correo)) {
            alert("Ingrese un correo electrónico válido.");
            return;
        }

        /*=========================
            NUEVO PRÉSTAMO
        =========================*/

        const nuevoPrestamo = {

            id: Date.now(),

            nombre,
            apellido,
            documento,
            correo,
            libro,
            autor,
            comentarios,

            fecha: new Date().toLocaleDateString("es-AR"),

            estado

        };

        prestamos.unshift(nuevoPrestamo);

        guardarPrestamos();

        renderPrestamos();

        alert("✅ Pedido enviado correctamente.");

        pedidoForm.reset();

    });

    /*=========================================
        ELIMINAR PRÉSTAMO
    =========================================*/

    tbody.addEventListener("click", (e) => {

        if (!e.target.classList.contains("btn-eliminar")) return;

        const index = Number(e.target.dataset.index);

        if (!confirm("¿Desea eliminar este préstamo?")) return;

        const fila = e.target.closest("tr");

        fila.classList.add("eliminando");

        setTimeout(() => {

            prestamos.splice(index, 1);

            guardarPrestamos();

            renderPrestamos();

        }, 400);

    });

    /*=========================================
        INICIAR TABLA
    =========================================*/

    renderPrestamos();

});