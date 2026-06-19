document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // CARRUSEL
    // ========================
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slides img');
    let currentIndex = 0;
    let intervalId = null;

    function showSlide(index) {
        if (slides.length === 0) return;

        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function startCarousel() {
        if (slides.length > 0) {
            showSlide(0); // Mostrar la primera imagen inmediatamente
            intervalId = setInterval(nextSlide, 5000); // 5 segundos
        }
    }

    function stopCarousel() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // Pausar carrusel al pasar el mouse
    if (slidesContainer) {
        slidesContainer.addEventListener('mouseenter', stopCarousel);
        slidesContainer.addEventListener('mouseleave', () => {
            if (slides.length > 0) intervalId = setInterval(nextSlide, 5000);
        });
    }

    // Iniciar carrusel
    startCarousel();


    // ========================
    // MODALES
    // ========================
    const modalRegistro = document.getElementById("modalRegistro");
    const modalLogin = document.getElementById("modalLogin");
    const btnRegistro = document.getElementById("btnRegistro");
    const btnLogin = document.getElementById("btnLogin");

    // Abrir modales
    if (btnRegistro) {
        btnRegistro.addEventListener("click", () => {
            modalRegistro.style.display = "flex";
            modalRegistro.querySelector("input").focus(); // Mejor UX
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            modalLogin.style.display = "flex";
            modalLogin.querySelector("input").focus();
        });
    }

    // Cerrar modales con la "X"
    document.querySelectorAll(".cerrar").forEach(cerrarBtn => {
        cerrarBtn.addEventListener("click", () => {
            const modal = cerrarBtn.closest(".modal");
            if (modal) modal.style.display = "none";
        });
    });

    // Cerrar modal haciendo clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });

    // Cerrar modales con tecla Escape (mejora de accesibilidad)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (modalRegistro.style.display === "flex") {
                modalRegistro.style.display = "none";
            }
            if (modalLogin.style.display === "flex") {
                modalLogin.style.display = "none";
            }
        }
    });


    // ========================
    // FORMULARIOS (Básico)
    // ========================
    const forms = document.querySelectorAll('.modal-contenido form');

    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita recargar la página

            const emailInput = form.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim() !== "") {
                alert("✅ Acción realizada con éxito (simulado)");
                // Aquí podrías agregar fetch() para enviar datos reales
                form.closest(".modal").style.display = "none";
                form.reset();
            } else {
                alert("Por favor completa los campos obligatorios.");
            }
        });
    });

    console.log("✅ Script de Faro de Cultura cargado correctamente");
});