"use strict";
/* Gener-8 site interactions */
/** Mobile nav drawer toggle */
function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    if (!toggle || !nav)
        return;
    toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A")
            nav.classList.remove("open");
    });
}
/** Click-to-enlarge gallery lightbox */
function initLightbox() {
    const items = document.querySelectorAll("[data-lightbox]");
    if (items.length === 0)
        return;
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML =
        '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(overlay);
    const img = overlay.querySelector("img");
    const close = () => overlay.classList.remove("open");
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay || e.target.classList.contains("lightbox-close"))
            close();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape")
            close();
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
function initContactForm() {
    const form = document.querySelector("#contact-form");
    if (!form)
        return;
    const status = form.querySelector(".form-status");
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
        const href = `mailto:info@gener-8.com?subject=${encodeURIComponent("Website inquiry from " + name)}&body=${encodeURIComponent(body)}`;
        window.location.href = href;
        if (status) {
            status.textContent = "Opening your email app… if nothing happens, email info@gener-8.com directly.";
            status.classList.add("show");
        }
    });
}
/** Mark the current page's nav link active */
function initActiveNav() {
    const here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav a").forEach((a) => {
        const href = a.getAttribute("href") || "";
        if (href === here || (here === "" && href === "index.html"))
            a.classList.add("active");
        else
            a.classList.remove("active");
    });
}
document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initLightbox();
    initContactForm();
    initActiveNav();
});
//# sourceMappingURL=main.js.map