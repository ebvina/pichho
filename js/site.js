(function () {
  const root = document.body.dataset.root || "";
  const active = document.body.dataset.page || "";

  const pages = [
    ["product.html", "Product"],
    ["features.html", "Features"],
    ["solutions.html", "Solutions"],
    ["pricing.html", "Pricing"],
    ["about.html", "About"],
    ["blog.html", "Blog"],
    ["contact.html", "Contact", true],
  ];

  function nav() {
    const links = pages
      .map(([href, label, cta]) => {
        const cls = [cta ? "nav-cta" : "", active === href ? "active" : ""].filter(Boolean).join(" ");
        return `<li><a class="${cls}" href="${root}${href}">${label}</a></li>`;
      })
      .join("");

    return `
      <nav class="nav" id="nav">
        <div class="nav-inner">
          <a class="brand" href="${root}index.html">
            <img src="${root}assets/logo.svg" alt="Pichho">
            <div>Pichho<small>by Coplanar AI</small></div>
          </a>
          <button class="nav-toggle" id="navToggle" aria-label="Open menu"><span></span><span></span><span></span></button>
          <ul class="nav-links" id="navLinks">${links}</ul>
        </div>
      </nav>`;
  }

  function footer() {
    return `
      <footer class="footer">
        <div class="container footer-grid">
          <div>
            <a class="brand" href="${root}index.html">
              <img src="${root}assets/logo.svg" alt="Pichho">
              <div>Pichho</div>
            </a>
            <p style="margin-top:14px;max-width:320px;color:#cfc6b8">Pichho is the product of Coplanar AI Pty Ltd — an AI planning workspace for teams that need one living plan.</p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="${root}product.html">Pichho</a></li>
              <li><a href="${root}features.html">Features</a></li>
              <li><a href="${root}solutions.html">Solutions</a></li>
              <li><a href="${root}pricing.html">Pricing</a></li>
              <li><a href="${root}security.html">Security</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="${root}about.html">About Coplanar AI</a></li>
              <li><a href="${root}blog.html">Blog</a></li>
              <li><a href="${root}careers.html">Careers</a></li>
              <li><a href="${root}faq.html">FAQ</a></li>
              <li><a href="${root}contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="${root}privacy.html">Privacy</a></li>
              <li><a href="${root}terms.html">Terms</a></li>
              <li><a href="${root}security.html">Security</a></li>
            </ul>
          </div>
        </div>
        <div class="container copy">
          <span>© 2026 Coplanar AI Pty Ltd. Pichho is a product of Coplanar AI.</span>
          <span>Melbourne, Australia · hello@pichho.com</span>
        </div>
      </footer>`;
  }

  document.getElementById("site-header").innerHTML = nav();
  document.getElementById("site-footer").innerHTML = footer();

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => links.classList.toggle("open"));

  const navEl = document.getElementById("nav");
  const onScroll = () => navEl.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("aos-animate")),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll("[data-aos]").forEach((el) => observer.observe(el));

  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("Pichho enquiry — " + (data.get("topic") || "General"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:hello@pichho.com?subject=${subject}&body=${body}`;
    document.getElementById("formOk").style.display = "block";
  });
})();
