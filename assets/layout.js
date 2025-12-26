// HEADER
document.getElementById("header").innerHTML = `
<header class="header">
  <nav class="menu">
    <a href="index.html" class="nav-btn">HOME</a>
    <a href="about.html" class="nav-btn">ABOUT</a>
    <a href="projects.html" class="nav-btn">PROJECTS</a>
    <a href="contact.html" class="nav-btn">CONTACT</a>
  </nav>
</header>
`;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Aucune animation
  gsap.set(".presentation section", { opacity: 1, y: 0 });
  gsap.set(".subtitle span", { opacity: 1, y: 0 });
  gsap.set(".developpeur h1", { opacity: 1, y: 0 });
} else {
  const subtitle = document.querySelector(".subtitle");

  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = "";

    text.split("").forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter;
      subtitle.appendChild(span);
    });
  }

  // animation du subtitle (lettres)
  gsap.from(".subtitle span", {
    opacity: 0,
    y: 12,
    duration: 0.6,
    stagger: 0.03,
    ease: "power2.out",
  });

  // apparition du titre développeur
  gsap.from(".developpeur h1", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".a-propos",
      start: "top 85%",
    },
  });

  // apparition des colonnes (mobile-first)
  gsap.fromTo(
    ".presentation section",
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".presentation",
        start: "top 90%",
      },
    }
  );
}
// /ligne sous le H1
document.querySelector(".developpeur h1")?.classList.add("is-visible");

// FOOTER (SANS follow-me)
document.getElementById("footer").innerHTML = `
<footer class="footer">
 <a href="https://github.com/RicAge40"
   target="_blank"
   class="follow-me">
  <img src="assets/images/mdi--github.svg" alt="GitHub" class="git-icon">

  <span>Follow me</span>
</a>
</footer>
`;
