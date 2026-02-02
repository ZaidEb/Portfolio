const header = document.getElementById("header");
const homeSection = document.getElementById("home");

let homeHeight = homeSection.offsetHeight;

window.addEventListener("resize", () => {
  homeHeight = homeSection.offsetHeight;
});

window.addEventListener("scroll", () => {
  if (window.scrollY < homeHeight - 50) {
    header.classList.add("opacity-0", "pointer-events-none");
  } else {
    header.classList.remove("opacity-0", "pointer-events-none");
  }
});
