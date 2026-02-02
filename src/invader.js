// Playful runaway invader CTA
(() => {
  const insect = document.getElementById("invader");
  if (!insect) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const size = {
    w: 110,
    h: 90
  };
  const margin = 20;
  let pos = {
    x: margin,
    y: margin
  };
  let flyTimer;

  const clamp = (value, max) => Math.max(margin, Math.min(value, max));

  const randomPosition = () => {
    const maxX = Math.max(window.innerWidth - size.w - margin, margin);
    const maxY = Math.max(window.innerHeight - size.h - margin, margin);
    return {
      x: clamp(Math.random() * maxX, maxX),
      y: clamp(Math.random() * maxY, maxY),
    };
  };

  const place = (coords) => {
    insect.style.transform = `translate3d(${coords.x}px, ${coords.y}px, 0)`;
  };

  // Initial placement
  pos = randomPosition();
  place(pos);

  const fly = () => {
    const next = randomPosition();
    insect.classList.remove("is-moving");
    // force reflow so animation restarts
    void insect.offsetWidth;

    const durationMs = 1100 + Math.random() * 700; // slower glide
    insect.style.setProperty("--move-duration", `${durationMs / 1000}s`);
    insect.style.setProperty("--from-x", `${pos.x}px`);
    insect.style.setProperty("--from-y", `${pos.y}px`);
    insect.style.setProperty("--to-x", `${next.x}px`);
    insect.style.setProperty("--to-y", `${next.y}px`);

    insect.classList.add("is-moving");

    const onEnd = () => {
      pos = next;
      insect.removeEventListener("animationend", onEnd);
    };

    insect.addEventListener("animationend", onEnd);
  };

  if (!prefersReducedMotion) {
    flyTimer = window.setInterval(fly, 2200); // slower hop cadence
  }

  window.addEventListener(
    "resize",
    () => {
      const maxX = Math.max(window.innerWidth - size.w - margin, margin);
      const maxY = Math.max(window.innerHeight - size.h - margin, margin);
      pos = {
        x: clamp(pos.x, maxX),
        y: clamp(pos.y, maxY)
      };
      place(pos);
    }, {
      passive: true
    }
  );

  insect.addEventListener("click", () => {
    if (flyTimer) window.clearInterval(flyTimer);
    insect.classList.remove("is-moving");
    insect.classList.add("is-dead");
    insect.addEventListener(
      "animationend",
      () => {
        insect.remove();
      }, {
        once: true
      }
    );
  });
})();
