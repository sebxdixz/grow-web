/* Configuración editable del sitio */
var SITE_CONFIG = {
  // Correo público de contacto. Dejar vacío mientras no exista uno (no usar correos corporativos de otras empresas).
  contactEmail: "",
  contactSubject: "Quiero conversar con GROW"
};

(function () {
  "use strict";

  // Contacto
  var btn = document.getElementById("contactBtn");
  var fb = document.getElementById("contactFallback");
  if (SITE_CONFIG.contactEmail) {
    btn.href = "mailto:" + SITE_CONFIG.contactEmail + "?subject=" + encodeURIComponent(SITE_CONFIG.contactSubject);
    btn.hidden = false;
    if (fb) fb.hidden = true;
  }

  // Año
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Menú móvil
  var mb = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  if (mb && nav) {
    mb.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      mb.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); }
    });
  }

  // Cabecera sólida al hacer scroll
  var top = document.getElementById("top");
  if (top) {
    var onScroll = function () { top.classList.toggle("scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Aparición suave al hacer scroll (respeta reduced-motion vía CSS)
  var els = document.querySelectorAll(".card, .mini, .person, .steps li, .ticks li, .cta, .hero-fig");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { el.classList.add("rv"); io.observe(el); });
  }
})();
