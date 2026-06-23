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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const params = new URLSearchParams();
    data.forEach((v, k) => params.append(k, String(v)));

    const showStatus = (msg: string): void => {
      if (status) {
        status.textContent = msg;
        status.classList.add("show");
      }
    };

    try {
      // Netlify Forms: POST the encoded form back to the site root
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      showStatus("Thanks — your message has been sent. We'll be in touch shortly.");
    } catch {
      // Fallback when not served by Netlify (e.g. local preview): open mail client
      const name = String(data.get("name") || "");
      const body = `Name: ${name}\nEmail: ${data.get("email") || ""}\nPhone: ${data.get("phone") || ""}\n\n${data.get("message") || ""}`;
      window.location.href = `mailto:info@gener-8.com?subject=${encodeURIComponent(
        "Website inquiry from " + name
      )}&body=${encodeURIComponent(body)}`;
      showStatus("Opening your email app… if nothing happens, email info@gener-8.com directly.");
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

/** Pre-fill the contact form message from a ?topic= query param */
function initContactPrefill(): void {
  const form = document.querySelector<HTMLFormElement>("#contact-form");
  if (!form) return;
  const topic = new URLSearchParams(location.search).get("topic");
  if (!topic) return;
  const messages: Record<string, string> = {
    info: "I'd like more information about the Gener-8\u00ae.",
    warranty: "I'd like details about the Gener-8\u00ae warranty (rental or purchase).",
    telemonitoring: "I'd like to learn more about Gener-8\u00ae telemonitoring.",
    "app-demo": "I'd like to request a demo of the Gener-8\u00ae Patient Monitoring App.",
  };
  const msg = messages[topic];
  const ta = form.querySelector<HTMLTextAreaElement>('[name="message"]');
  if (ta && msg && !ta.value) ta.value = msg;
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initLightbox();
  initContactForm();
  initContactPrefill();
  initActiveNav();
});
