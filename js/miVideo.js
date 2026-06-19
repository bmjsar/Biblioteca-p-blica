// miVideo.js
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("botonVideo");
    const video = document.getElementById("miVideo");

    boton.addEventListener("click", () => {
        if (video.paused) {
            video.muted = false;   // activa sonido
            video.play();
            boton.textContent = "Pausar video";
        } else {
            video.pause();
            boton.textContent = "Reproducir video";
        }
    });
});

