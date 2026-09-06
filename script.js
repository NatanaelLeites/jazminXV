// Fecha objetivo (20 de Febrero de 2027)
const partyDate = new Date("Feb 20, 2027 21:00:00").getTime();

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
  // 1. Inicializar reloj
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 2. Animación de entrada de la portada únicamente
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
    }, "-=0.4");
});

// Copiar Alias Bancario con notificación personalizada
function copyAlias() {
  const aliasText = document.getElementById("alias-text").innerText;
  
  navigator.clipboard.writeText(aliasText).then(() => {
    showToast("¡Alias copiado al portapapeles! ✨");
  });
}

function showToast(message) {
  // Eliminar toast anterior si existe para evitar duplicados
  const existingToast = document.querySelector(".custom-toast");
  if (existingToast) existingToast.remove();

  // Crear el elemento toast
  const toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  // Animar entrada con GSAP
  gsap.fromTo(toast, 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
  );

  // Desvanecer y remover después de 3 segundos
  setTimeout(() => {
    gsap.to(toast, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => toast.remove()
    });
  }, 3000);
}