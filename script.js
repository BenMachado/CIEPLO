// =========================
// CABEÇALHO: esconde ao rolar pra baixo, reaparece ao rolar pra cima
// =========================

const siteHeader = document.getElementById("siteHeader");

if (siteHeader) {

  let lastScrollY = window.scrollY;
  let ticking = false;
  const showAtTop = 80; // sempre visível perto do topo

  const updateHeader = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= showAtTop) {
      siteHeader.classList.remove("header-hidden");
    } else if (currentScrollY > lastScrollY) {
      // rolando pra baixo
      siteHeader.classList.add("header-hidden");
      if (menu) menu.classList.remove("open");
      if (menuToggle) menuToggle.classList.remove("open");
    } else {
      // rolando pra cima
      siteHeader.classList.remove("header-hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

}

// =========================
// MENU MOBILE
// =========================

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {

  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

}

// =========================
// NEWSLETTER (front-end apenas — ligar a um backend/serviço depois)
// =========================

const newsletterForm = document.getElementById("newsletterForm");
const newsletterFeedback = document.getElementById("newsletterFeedback");

if (newsletterForm && newsletterFeedback) {

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterForm.reset();
    newsletterFeedback.hidden = false;
  });

}