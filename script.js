// Registrar Plugin de GSAP
gsap.registerPlugin(ScrollTrigger);

// Fecha objetivo (20 de Febrero de 2027)
const partyDate = new Date("Feb 20, 2027 21:00:00").getTime();

// Función para renderizar el reloj
function updateCountdown() {
  const now = new Date().getTime();
  const diff = partyDate - now;
  const countdownEl = document.getElementById("countdown");

  if (!countdownEl) return;

  if (diff < 0) {
    countdownEl.innerHTML = "<h3>¡Llegó la noche esperada!</h3>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `
    <div class="time-box"><span>${days}</span><small>Días</small></div>
    <div class="time-box"><span>${hours}</span><small>Hs</small></div>
    <div class="time-box"><span>${mins}</span><small>Min</small></div>
    <div class="time-box"><span>${secs}</span><small>Seg</small></div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Iniciar reloj inmediatamente
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 2. Animación de entrada para la portada
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTl
    .from(".subtitle", { opacity: 0, y: -20, duration: 0.8 })
    .from(".title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
    .from(".date", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
    .from("#countdown .time-box", { 
      opacity: 0, 
      y: 25, 
      scale: 0.8,
      duration: 0.7, 
      stagger: 0.15,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .from(".scroll-down", { opacity: 0, duration: 0.5 }, "-=0.2");

  // 3. Animaciones al hacer scroll entre secciones
  gsap.utils.toArray(".gsap-reveal").forEach((section) => {
    const card = section.querySelector(".card");
    gsap.from(card, {
      scrollTrigger: {
        trigger: section,
        start: "top 60%", // Se activa cuando la sección está bien centrada
        toggleActions: "play none none reverse"
      },
      duration: 0.8,
      scale: 0.9,
      y: 30,
      opacity: 0,
      ease: "power2.out"
    });
  });
});

// Copiar Alias al portapapeles
function copyAlias() {
  const aliasText = document.getElementById("alias-text").innerText;
  navigator.clipboard.writeText(aliasText).then(() => {
    alert("¡Alias copiado al portapapeles!");
  }).catch(() => {
    alert("No se pudo copiar el alias.");
  });
}