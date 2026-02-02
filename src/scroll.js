function reveal(el, delay = 0) {
  el.classList.add("reveal-effect");
  el.style.transitionDelay = `${delay}ms`;

  el.classList.remove("opacity-0", "translate-y-12", "translate-y-8", "scale-[0.98]");
  el.classList.add("opacity-100", "translate-y-0", "scale-100");
}

// Global spotlight effect
(() => {
  const spotlight = document.createElement("div");
  spotlight.style.position = "fixed";
  spotlight.style.top = "0";
  spotlight.style.left = "0";
  spotlight.style.width = "100%";
  spotlight.style.height = "100%";
  spotlight.style.pointerEvents = "none";
  spotlight.style.zIndex = "5"; // Behind content (z-10) but above backgrounds
  spotlight.style.transition = "opacity 0.3s ease";
  spotlight.style.opacity = "0"; 
  document.body.appendChild(spotlight);

  const colors = "rgba(56,189,248,.15), rgba(99,102,241,.10), rgba(0,0,0,0) 65%";

  window.addEventListener("mousemove", (e) => {
    spotlight.style.opacity = "1";
    spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, ${colors})`;
  });

  document.addEventListener("mouseleave", () => {
    spotlight.style.opacity = "0";
  });
})();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const section = entry.target;
      reveal(section, 0);

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

// Smooth cursor effect for pointer and touch
(() => {
  const cursor = document.getElementById("smooth-cursor");
  const dot = cursor?.querySelector("[data-cursor-dot]");
  const ring = cursor?.querySelector("[data-cursor-ring]");
  if (!cursor || !dot || !ring) return;

  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (isFinePointer) {
    document.documentElement.classList.add("has-smooth-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let pressed = false;
    let visible = false;

    const show = () => {
      if (!visible) {
        cursor.classList.remove("is-hidden");
        visible = true;
      }
    };

    const hide = () => {
      cursor.classList.add("is-hidden");
      visible = false;
    };

    window.addEventListener(
      "mousemove",
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        show();
      },
      { passive: true }
    );

    window.addEventListener("mouseleave", hide, { passive: true });

    const animate = () => {
      dotX += (targetX - dotX) * 0.18;
      dotY += (targetY - dotY) * 0.18;
      ringX += (targetX - ringX) * 0.12;
      ringY += (targetY - ringY) * 0.12;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${pressed ? 0.78 : 1})`;

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener(
      "mousedown",
      () => {
        pressed = true;
        ring.classList.add("is-pressed");
      },
      { passive: true }
    );

    window.addEventListener(
      "mouseup",
      () => {
        pressed = false;
        ring.classList.remove("is-pressed");
      },
      { passive: true }
    );
  } else {
    const spawnPing = (x, y) => {
      const ping = document.createElement("span");
      ping.className = "cursor-touch-ping";
      ping.style.left = `${x}px`;
      ping.style.top = `${y}px`;
      document.body.appendChild(ping);
      ping.addEventListener("animationend", () => ping.remove());
    };

    window.addEventListener(
      "touchstart",
      (e) => {
        const touch = e.touches[0];
        if (!touch) return;
        spawnPing(touch.clientX, touch.clientY);
      },
      { passive: true }
    );
  }
})();

// Initialize spotlight for all containers
// document.querySelectorAll("[data-spotlight-container]").forEach(attachSpotlight);
