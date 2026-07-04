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
// PEDIDOS: quantidade por cookie + envio pro WhatsApp
// =========================

const WHATSAPP_NUMBER = "5547996956773";
const MAX_QTY = 20;

document.querySelectorAll(".cookie-card").forEach((card) => {

  const qtyValueEl = card.querySelector(".qty-value");
  const decreaseBtn = card.querySelector('[data-action="decrease"]');
  const increaseBtn = card.querySelector('[data-action="increase"]');
  const orderBtn = card.querySelector(".order-btn");

  if (!qtyValueEl || !orderBtn) return;

  let quantity = 1;

  const updateQtyDisplay = () => {
    qtyValueEl.textContent = quantity;
  };

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity -= 1;
        updateQtyDisplay();
      }
    });
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
      if (quantity < MAX_QTY) {
        quantity += 1;
        updateQtyDisplay();
      }
    });
  }

  orderBtn.addEventListener("click", () => {
    const baseName = card.dataset.name || "Cookie";

    const selectedFill = card.querySelector('.fill-options input[type="radio"]:checked');
    const fillLabel = selectedFill ? selectedFill.value : "";
    const unitPrice = selectedFill ? parseFloat(selectedFill.dataset.price) || 0 : 0;

    const fullName = fillLabel && fillLabel !== "Sem recheio"
      ? `${baseName} (${fillLabel})`
      : baseName;

    const total = (unitPrice * quantity).toFixed(2).replace(".", ",");

    const message = `Olá! Gostaria de pedir ${quantity}x ${fullName} (Total: R$ ${total})`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener");
  });

});