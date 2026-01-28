const ease = "cubic-bezier(.2,.9,.2,1)";

function reveal(el, delay = 0) {
  el.style.transitionProperty = "opacity, transform";
  el.style.transitionDuration = "900ms";
  el.style.transitionTimingFunction = ease;
  el.style.transitionDelay = `${delay}ms`;

  el.classList.remove("opacity-0", "translate-y-12", "translate-y-8", "scale-[0.98]");
  el.classList.add("opacity-100", "translate-y-0", "scale-100");
}

function attachSpotlight(section) {
  const layer = section.querySelector("[data-spotlight]");
  if (!layer) return;

  const onMove = (e) => {
    const r = section.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    layer.style.opacity = "1";
    layer.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(56,189,248,.22), rgba(99,102,241,.12), rgba(0,0,0,0) 65%)`;
  };

  const onLeave = () => {
    layer.style.opacity = "0";
  };

  section.addEventListener("mousemove", onMove, { passive: true });
  section.addEventListener("mouseleave", onLeave, { passive: true });
  section.addEventListener("touchstart", () => (layer.style.opacity = "0"), { passive: true });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const section = entry.target;
      reveal(section, 0);
      attachSpotlight(section);

      const grid = section.querySelector('[data-stagger="cards"]');
      if (grid) {
        const cards = grid.querySelectorAll("article");
        cards.forEach((card, index) => {
          reveal(card, 120 + index * 110);
        });
      }

      observer.unobserve(section);
    });
  },
  { threshold: 0.22 }
);

document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
