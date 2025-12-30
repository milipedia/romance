// ---------------------------
// SLIDES AUTOMÁTICOS + DOTS
// ---------------------------
let index = 0;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dot");
const total = dots.length;

function updateSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
}

setInterval(() => {
    index = (index + 1) % total;
    updateSlide();
}, 3000);

// Clique nos dots também funciona
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        updateSlide();
    });
});


// ---------------------------
// CONTADOR REAL-TIME
// ---------------------------

const inicio = new Date("2025-09-18T00:00:00");


function atualizarContador() {
    const agora = new Date();
    let diff = agora - inicio;

    const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    diff -= anos * (1000 * 60 * 60 * 24 * 365);

    const meses = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375));
    diff -= meses * (1000 * 60 * 60 * 24 * 30.4375);

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= dias * (1000 * 60 * 60 * 24);

    const horas = Math.floor(diff / (1000 * 60 * 60));
    diff -= horas * (1000 * 60 * 60);

    const minutos = Math.floor(diff / (1000 * 60));
    diff -= minutos * (1000 * 60);

    const segundos = Math.floor(diff / 1000);

    document.getElementById("contador").innerText =
        `${anos} anos, ${meses} meses, ${dias} dias — ${horas}h ${minutos}m ${segundos}s`;
}

setInterval(atualizarContador, 1000);
atualizarContador();


// ---------------------------
// PLAYER DE MÚSICA
// ---------------------------
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value * audio.duration) / 100;
});

audio.addEventListener("ended", () => {
    playBtn.textContent = "▶";
});
