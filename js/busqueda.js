document.addEventListener("DOMContentLoaded", () => {

    const searchForm = document.getElementById("searchForm");
    const resultadosContainer = document.getElementById("resultados");
    const resultadosGrid = document.getElementById("resultados-grid");
    const resultadosTitulo = document.getElementById("resultados-titulo");

    // =========================
    // CONSTRUIR CONSULTA OPEN LIBRARY
    // =========================
    function construirConsulta(campo, termino) {

        termino = termino.trim();

        switch (campo) {

            case "titulo":
                return `title=${termino}`;

            case "autor":
                return `author=${termino}`;

            case "tema":
                return `subject=${termino}`;

            case "editorial":
                return `publisher=${termino}`;

            default:
                return `q=${termino}`;
        }
    }

    // =========================
    // BUSCAR EN OPEN LIBRARY
    // =========================
    async function buscarOpenLibrary(campo, termino) {

        const query = construirConsulta(campo, termino);

        const url = `https://openlibrary.org/search.json?${query}&limit=20`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error al consultar Open Library");
        }

        return await respuesta.json();
    }

    // =========================
    // MOSTRAR RESULTADOS
    // =========================
    function mostrarResultados(datos) {

        resultadosGrid.innerHTML = "";

        if (!datos.docs || datos.docs.length === 0) {

            resultadosTitulo.textContent = "Resultados (0)";

            resultadosGrid.innerHTML = `
                <p class="no-resultados">No se encontraron libros.</p>
            `;

            resultadosContainer.classList.add("mostrar");

            return;
        }

        resultadosTitulo.textContent = `Resultados (${datos.docs.length})`;

        datos.docs.forEach(libro => {

            const titulo = libro.title || "Sin título";
            const autores = libro.author_name?.join(", ") || "Autor desconocido";
            const editorial = libro.publisher?.[0] || "No disponible";
            const año = libro.first_publish_year || "N/D";

            // portada
            const cover = libro.cover_i
                ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
                : "https://via.placeholder.com/150x220?text=Sin+portada";

            const item = document.createElement("div");
            item.className = "resultado-item";

            item.innerHTML = `
                <img src="${cover}" alt="${titulo}">
                <h4>${titulo}</h4>
                <p class="autor"><strong>Autor:</strong> ${autores}</p>
                <p><strong>Editorial:</strong> ${editorial}</p>
                <p><strong>Año:</strong> ${año}</p>
            `;

            resultadosGrid.appendChild(item);
        });

        resultadosContainer.classList.add("mostrar");
    }

    // =========================
    // EVENTO BUSCAR
    // =========================
    searchForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const termino = document.getElementById("termino").value.trim();
        const campo = document.getElementById("campo").value;

        if (!termino) {
            alert("Ingresa un término de búsqueda");
            return;
        }

        resultadosGrid.innerHTML = "<p>Buscando libros...</p>";
        resultadosTitulo.textContent = "Buscando...";
        resultadosContainer.classList.add("mostrar");

        try {

            const datos = await buscarOpenLibrary(campo, termino);
            mostrarResultados(datos);

        } catch (error) {

            console.error(error);

            resultadosTitulo.textContent = "Error";
            resultadosGrid.innerHTML = `
                <p class="no-resultados">Error al conectar con Open Library</p>
            `;
        }
    });

    // =========================
    // LIMPIAR
    // =========================
    searchForm.addEventListener("reset", () => {

        resultadosGrid.innerHTML = "";
        resultadosContainer.classList.remove("mostrar");
        resultadosTitulo.textContent = "Resultados de búsqueda";
    });

});