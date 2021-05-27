document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if(document.getElementById('toast')) {
            document.getElementById('toast').style.display = 'none';
        }
    }, 2000);
});

circulos = document.querySelectorAll("[data-circulo]");

circulos.forEach(circulo => {
    const fechaCreacion = new Date(circulo.dataset.createdAt);
    const fechaFin = new Date(circulo.dataset.fechaFin);

    const diferencia = (fechaFin - fechaCreacion) / (fechaFin - new Date());
    let diferenciaDias = Math.round((fechaFin - new Date()) / (24 * 60 * 60 * 1000));

    if (diferenciaDias <= 2) {
        circulo.classList.add("bg-danger");
    } else if (diferenciaDias <= 4) {
        circulo.classList.add("bg-warning");
    } else {
        if (diferencia < 0.333) {
            circulo.classList.add("bg-danger");
        } else if (diferencia < 0.666) {
            circulo.classList.add("bg-warning");
        } else {
            circulo.classList.add("bg-success");
        }
    }
});