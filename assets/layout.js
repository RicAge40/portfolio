const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const links = document.querySelectorAll(".nav a");

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// // ===============================
// GSAP – HERO ANIMATIONS
// ===============================

const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  const title = document.querySelector(".hero-title");
  const p = document.querySelector(".hero p");

  // Split texte en spans
  const text = title.textContent;
  title.innerHTML = text
    .split("")
    .map((char) => (char === " " ? "&nbsp;" : `<span>${char}</span>`))
    .join("");

  const letters = title.querySelectorAll("span");

  // États initiaux
  gsap.set(title, { visibility: "visible" });
  gsap.set(p, { visibility: "visible" });

  gsap.set(letters, {
    y: 80,
    opacity: 0,
  });

  gsap.set(p, {
    y: 20,
    opacity: 0,
  });

  // Timeline
  const tl = gsap.timeline({ delay: 0.3 });

  tl.to(letters, {
    y: 0,
    opacity: 1,
    duration: 1.1,
    ease: "expo.out",
    stagger: 0.14,
  }).to(
    p,
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.4"
  );
});

mm.add("(max-width: 1023px)", () => {
  const title = document.querySelector(".hero-title");
  const p = document.querySelector(".hero p");

  gsap.set([title, p], {
    visibility: "visible",
    opacity: 0,
    y: 20,
  });

  gsap.to(title, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(p, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    delay: 0.2,
    ease: "power2.out",
  });
});

// animation scroll dot
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const dot = document.querySelector(".scroll-dot");

  if (!hero || !dot) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        dot.style.animationPlayState = "running";
      } else {
        dot.style.animationPlayState = "paused";
      }
    },
    {
      threshold: 0.6, // % du hero visible
    }
  );

  observer.observe(hero);
});

// =====================
// ABOUT – DESKTOP
// =====================
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 1024) return;

  const aboutSection = document.querySelector("#about");
  const intro = document.querySelector(".about-intro");
  const cards = document.querySelectorAll(".about-grid > div");

  if (!aboutSection) return;

  const tl = gsap.timeline({ paused: true });

  tl.to(intro, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  }).to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.2,
  });

  // 👇 état initial
  gsap.set(cards, {
    opacity: 0,
    y: 40,
    scale: 0.96,
  });

  // IntersectionObserver (scroll normal)
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        tl.play();
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(aboutSection);

  //  clic sur le menu
  document.querySelectorAll('a[href="#about"]').forEach((link) => {
    link.addEventListener("click", () => {
      gsap.set([intro, cards], {
        opacity: 0,
        y: 40,
      });
      tl.restart();
    });
  });
});

// =====================
// ABOUT – MOBILE
// =====================
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 1024) return;

  const about = document.querySelector("#about");
  const intro = document.querySelector(".about-intro");
  const cards = document.querySelectorAll(".about-grid > div");

  if (!about) return;

  const playMobileAbout = () => {
    gsap.to(intro, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.25,
      delay: 0.15,
    });
  };

  // Scroll normal
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        playMobileAbout();
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(about);

  // Clic menu
  document.querySelectorAll('a[href="#about"]').forEach((link) => {
    link.addEventListener("click", () => {
      gsap.set([intro, cards], {
        opacity: 0,
        y: 30,
      });
      playMobileAbout();
    });
  });
});
