/* Gener-8 site interactions */

/** Mobile nav drawer toggle */
function initNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const nav = document.querySelector<HTMLElement>(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).tagName === "A") nav.classList.remove("open");
  });
}

/** Click-to-enlarge gallery lightbox */
function initLightbox(): void {
  const items = document.querySelectorAll<HTMLImageElement>("[data-lightbox]");
  if (items.length === 0) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(overlay);
  const img = overlay.querySelector("img") as HTMLImageElement;

  const close = (): void => overlay.classList.remove("open");
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || (e.target as HTMLElement).classList.contains("lightbox-close")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  items.forEach((el) => {
    el.style.cursor = "zoom-in";
    el.addEventListener("click", () => {
      img.src = el.getAttribute("data-full") || el.src;
      img.alt = el.alt;
      overlay.classList.add("open");
    });
  });
}

/** Contact form: validate, then hand off to the user's mail client */
function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>("#contact-form");
  if (!form) return;
  const status = form.querySelector<HTMLElement>(".form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");

    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
    const href = `mailto:info@gener-8.com?subject=${encodeURIComponent(
      "Website inquiry from " + name
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    if (status) {
      status.textContent = "Opening your email app… if nothing happens, email info@gener-8.com directly.";
      status.classList.add("show");
    }
  });
}

/** Mark the current page's nav link active */
function initActiveNav(): void {
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll<HTMLAnchorElement>(".nav a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (href === here || (here === "" && href === "index.html")) a.classList.add("active");
    else a.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initLightbox();
  initContactForm();
  initActiveNav();
});
