/* Shared chrome for every CKB page: the header, the footer, scroll reveals
   and the PDF opener. Each page carries <div id="site-header"></div> and
   <div id="site-footer"></div>; this fills them so the navigation lives in
   one file rather than being copy-pasted across nine pages. */
(function () {
  "use strict";

  /* Each About Us dropdown item is a page of its own. The list is shared by
     the dropdown and by the "More about us" row at the foot of each of
     those pages, so the two can never drift apart. */
  var ABOUT_PAGES = [
    { href: "about.html",      label: "Who We Are" },
    { href: "legal.html",      label: "Legal Status" },
    { href: "vision.html",     label: "Vision & Mission" },
    { href: "board.html",      label: "Board Members" },
    { href: "profile.html",    label: "Organisation Profile" },
    { href: "supporters.html", label: "Our Supporters" }
  ];

  var NAV = [
    { href: "index.html",       label: "Home",         key: "home" },
    { href: "about.html",       label: "About Us",     key: "about", sub: ABOUT_PAGES },
    { href: "programs.html",    label: "Programs",     key: "programs" },
    { href: "gallery.html",     label: "Gallery",      key: "gallery" },
    { href: "reports.html",     label: "Reports",      key: "reports" },
    { href: "contact.html",     label: "Contact",      key: "contact", sub: [
      { href: "contact.html",          label: "Contact Details" },
      { href: "contact.html#involved", label: "Get Involved" }
    ] }
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  window.CKB_esc = esc;

  /* Content comes from Blob via the /data/:name rewrite. A cache-buster keeps
     an admin edit from being hidden behind a stale copy. */
  window.CKB_get = function (name) {
    return fetch("data/" + name + "?" + Date.now())
      .then(function (r) { return r.json(); })
      .catch(function () { return {}; });
  };

  /* The logo falls back to a "CKB" monogram until assets/logo.png exists. */
  function brand() {
    return '<a class="brand" href="index.html">' +
      '<img class="brand-mark" src="assets/logo-sm.png" alt="CKB" ' +
      'style="object-fit:contain;background:#fff" ' +
      'onerror="this.outerHTML=\'<span class=&quot;brand-mark&quot;>CKB</span>\'">' +
      '<span><b>Chaithanya Kala Bharathi</b><small>Compassion in Action</small></span></a>';
  }

  function header() {
    var page = document.body.getAttribute("data-page") || "";
    /* An item with a sub list becomes a hover/focus dropdown, the same
       shape APARD uses, so About Us can hold its sections without adding
       a page for each one. */
    var links = NAV.map(function (n) {
      var cls = n.key === page ? ' class="active"' : "";
      if (!n.sub) return '<a href="' + n.href + '"' + cls + ">" + n.label + "</a>";
      var subs = n.sub.map(function (x) {
        return '<a href="' + x.href + '">' + x.label + "</a>";
      }).join("");
      return '<span class="has-sub"><a href="' + n.href + '"' + cls + ">" + n.label +
        '</a><span class="subnav">' + subs + "</span></span>";
    }).join("");
    return '<nav class="nav"><div class="nav-inner">' + brand() +
      '<button class="nav-toggle" id="navToggle" aria-label="Menu">&#9776;</button>' +
      '<div class="nav-links" id="navLinks">' + links +
      '<a href="donate.html" class="btn btn-sun" style="margin-left:.4rem">Donate</a>' +
      "</div></div></nav>";
  }

  function footer() {
    var y = new Date().getFullYear();
    return '<footer class="foot"><div class="wrap"><div class="foot-grid">' +
      '<div><img class="foot-logo" src="assets/logo-sm.png" alt="" onerror="this.remove()">' +
      "<h4>Chaithanya Kala Bharathi<small>Compassion in Action</small></h4>" +
      "<p>A registered non-governmental organisation working since 1992 in Kurnool and Nandyal " +
      "districts of Andhra Pradesh, with tribal communities, Dalits, women, children and people " +
      "with disabilities.</p></div>" +
      "<div><h4>Explore</h4><ul>" +
      '<li><a href="about.html">About &amp; legal status</a></li>' +
      '<li><a href="programs.html">Our programs</a></li>' +
      '<li><a href="reports.html">Reports &amp; certificates</a></li>' +
      '<li><a href="gallery.html">Gallery</a></li>' +
      '<li><a href="contact.html#involved">Get involved</a></li>' +
      "</ul></div>" +
      '<div><h4>Contact</h4><ul id="footContact"><li>Nandyal, Andhra Pradesh</li></ul></div>' +
      "</div><div class=\"foot-base\"><span>&copy; " + y + " Chaithanya Kala Bharathi. All rights reserved.</span>" +
      '<span><a href="admin.html" class="admin-link">🔒 Admin</a></span></div></div></footer>';
  }

  function mount() {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = header();
    if (f) f.innerHTML = footer();

    var t = document.getElementById("navToggle");
    var l = document.getElementById("navLinks");
    if (t && l) t.addEventListener("click", function () { l.classList.toggle("open"); });

    /* the footer's contact block is content, so it comes from Blob too */
    window.CKB_get("contact.json").then(function (c) {
      var el = document.getElementById("footContact");
      var o = (c && c.office) || {};
      if (!el || !o.address) return;
      var rows = (o.address || []).map(function (line) { return "<li>" + esc(line) + "</li>"; });
      if (o.phone) rows.push('<li><a href="tel:' + esc(o.phone.replace(/\s/g, "")) + '">' + esc(o.phone) + "</a></li>");
      (o.emails || []).forEach(function (e) {
        rows.push('<li><a href="mailto:' + esc(e) + '">' + esc(e) + "</a></li>");
      });
      el.innerHTML = rows.join("");
    });
  }

  /* Reveal-on-scroll, skipped entirely when the visitor prefers less motion. */
  function reveals() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }
  window.CKB_reveals = reveals;


  /* ---- PDF cover thumbnails ----
     Draws the first page of each PDF into a small canvas, so a report is
     shown by its own cover rather than a generic icon. Lazy: a cover is
     only rendered once it is near the viewport, because each one fetches
     and decodes a multi-megabyte PDF. The emoji stays underneath as the
     fallback when pdf.js is unavailable or a file fails to load. */
  window.CKB_pdfURL = function (file) { return "pdf/" + encodeURIComponent(file); };

  window.CKB_renderCovers = function (rootSel) {
    var lib = window.pdfjsLib;
    if (!lib) return;
    try {
      lib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    } catch (e) {}
    var root = document.querySelector(rootSel || "body");
    if (!root) return;
    var covers = [].slice.call(root.querySelectorAll(".pdf-cover[data-cover]"));
    if (!covers.length) return;

    function render(el) {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      var file = el.getAttribute("data-cover");
      var canvas = el.querySelector("canvas");
      if (!file || !canvas) return;
      lib.getDocument(window.CKB_pdfURL(file)).promise
        .then(function (pdf) { return pdf.getPage(1); })
        .then(function (page) {
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var w = el.getBoundingClientRect().width || 56;
          var base = page.getViewport({ scale: 1 });
          var vp = page.getViewport({ scale: (w * dpr) / base.width });
          canvas.width = Math.round(vp.width);
          canvas.height = Math.round(vp.height);
          return page.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
        })
        .then(function () { el.classList.add("is-loaded"); })
        .catch(function () { el.dataset.done = ""; });   /* leave the emoji showing */
    }
    function sweep() {
      var h = window.innerHeight || 800;
      covers.forEach(function (el) {
        if (!el.dataset.done && el.getBoundingClientRect().top < h + 500) render(el);
      });
    }
    var tick;
    window.addEventListener("scroll", function () {
      if (tick) return;
      tick = setTimeout(function () { tick = null; sweep(); }, 150);
    }, { passive: true });
    sweep();
    setTimeout(sweep, 1000);
  };

  /* The row of sibling links at the foot of every About Us page. */
  window.CKB_aboutNav = function (currentHref) {
    var el = document.getElementById("aboutNav");
    if (!el) return;
    el.innerHTML = '<span class="eyebrow">More about us</span><div class="about-links">' +
      ABOUT_PAGES.filter(function (x) { return x.href !== currentHref; })
        .map(function (x) { return '<a href="' + x.href + '">' + esc(x.label) + "</a>"; })
        .join("") + "</div>";
  };

  /* Any element carrying data-doc opens that PDF in the shared viewer.
     The page it was opened from travels along as ?from= so the viewer can
     offer a "Back to Reports" button that works even when the document was
     reached by a direct link and there is no history to go back through. */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-doc]");
    if (!el) return;
    var q = "?file=" + encodeURIComponent(el.dataset.doc);
    if (el.dataset.title) q += "&title=" + encodeURIComponent(el.dataset.title);
    q += "&from=" + encodeURIComponent(location.pathname.split("/").pop() || "index.html");
    location.href = "pdfviewer.html" + q;
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();

/* ---- "Designed by Support2NGOs" credit under the footer ----
   Clicking the name offers an e-mail, or a short WhatsApp message the visitor
   types in the box (up to MAX characters). The WhatsApp
   number is put together only when that option is clicked, so it never
   shows on the page, in a link preview or as plain text in the source. */
(function () {
  var EMAIL = "supp2ngo@gmail.com", MAX = 200;   /* about one or two sentences */
  function waNumber() { return ["91", "9440", "462", "232"].join(""); }

  function css() {
    if (document.getElementById("s2n-css")) return;
    var s = document.createElement("style");
    s.id = "s2n-css";
    s.textContent =
      ".s2n-credit{text-align:center;font-size:.8rem;opacity:.85;padding:.9rem 1rem 1.1rem;position:relative}" +
      ".s2n-wrap{position:relative;display:inline-block}" +
      ".s2n-name{font:inherit;font-weight:700;color:inherit;background:none;border:0;padding:0;cursor:pointer;text-decoration:underline;text-underline-offset:3px}" +
      ".s2n-name:hover,.s2n-name:focus-visible{opacity:.75}" +
      ".s2n-pop{position:absolute;left:50%;bottom:calc(100% + 10px);transform:translateX(-50%);z-index:60;min-width:230px;" +
        "background:#fff;color:#1d2b22;border-radius:12px;box-shadow:0 14px 40px -12px rgba(0,0,0,.35);padding:.5rem;text-align:left;font-size:.88rem}" +
      ".s2n-pop[hidden]{display:none}" +
      ".s2n-pop::after{content:'';position:absolute;left:50%;top:100%;margin-left:-7px;border:7px solid transparent;border-top-color:#fff}" +
      ".s2n-pop b{display:block;padding:.35rem .6rem .45rem;font-size:.78rem;color:#5b6b61;font-weight:600}" +
      ".s2n-opt{display:flex;align-items:center;gap:.6rem;width:100%;padding:.6rem .6rem;border:0;border-radius:8px;background:none;color:inherit;font:inherit;font-weight:600;cursor:pointer;text-decoration:none;text-align:left}" +
      ".s2n-opt:hover,.s2n-opt:focus-visible{background:#eef3ee}" +
      ".s2n-ic{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;flex:none;color:#fff}" +
      ".s2n-ic svg{width:16px;height:16px;fill:currentColor}" +
      ".s2n-mail .s2n-ic{background:#2f6f4f}.s2n-wa .s2n-ic{background:#25d366}" +
      ".s2n-form{padding:.2rem .5rem .5rem}.s2n-form[hidden]{display:none}" +
      ".s2n-form label{display:block;font-size:.8rem;font-weight:600;color:#3d4c43;margin:.2rem 0 .35rem}" +
      ".s2n-form textarea{width:100%;box-sizing:border-box;min-height:74px;resize:vertical;font:inherit;font-size:.86rem;color:#1d2b22;background:#fff;border:1px solid #c9d4cc;border-radius:8px;padding:.5rem .6rem}" +
      ".s2n-form textarea:focus{outline:2px solid #25d366;outline-offset:1px;border-color:#25d366}" +
      ".s2n-row{display:flex;align-items:center;justify-content:space-between;gap:.5rem;margin-top:.45rem}" +
      ".s2n-count{font-size:.72rem;color:#6b7a70}" +
      ".s2n-back{font:inherit;font-size:.8rem;color:#3d4c43;background:none;border:0;cursor:pointer;padding:.3rem .2rem;text-decoration:underline}" +
      ".s2n-send{font:inherit;font-size:.82rem;font-weight:700;color:#fff;background:#25d366;border:0;border-radius:999px;padding:.45rem .95rem;cursor:pointer}" +
      ".s2n-send:disabled{opacity:.45;cursor:default}" +
      ".s2n-pop.s2n-writing{min-width:280px}";
    document.head.appendChild(s);
  }

  function build(bar) {
    if (!bar || document.querySelector(".s2n-credit")) return;
    css();
    var site = location.hostname.replace(/^www\./, "") || "the website";
    var subject = encodeURIComponent("Website enquiry (from " + site + ")");
    var box = document.createElement("div");
    box.className = "s2n-credit";
    box.innerHTML =
      'This website is designed by <span class="s2n-wrap">' +
        '<button type="button" class="s2n-name" aria-haspopup="true" aria-expanded="false">Support2NGOs</button>' +
        '<span class="s2n-pop" role="menu" hidden><b>Contact Support2NGOs</b>' +
          '<a class="s2n-opt s2n-mail" role="menuitem" href="mailto:' + EMAIL + "?subject=" + subject + '">' +
            '<span class="s2n-ic"><svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/></svg></span>Send an e-mail</a>' +
          '<button type="button" class="s2n-opt s2n-wa" role="menuitem">' +
            '<span class="s2n-ic"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .3-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.6-.1 1.3z"/></svg></span>WhatsApp message</button>' +
          '<span class="s2n-form" hidden>' +
            '<label for="s2n-msg">Your message (a sentence or two)</label>' +
            '<textarea id="s2n-msg" maxlength="' + MAX + '" placeholder="e.g. We would like a website for our NGO. Please contact us."></textarea>' +
            '<span class="s2n-row"><button type="button" class="s2n-back">&larr; Back</button><span class="s2n-count">0 / ' + MAX + '</span>' +
            '<button type="button" class="s2n-send" disabled>Send on WhatsApp</button></span>' +
          "</span>" +
        "</span></span>";
    bar.parentNode.insertBefore(box, bar.nextSibling);

    var btn = box.querySelector(".s2n-name"), pop = box.querySelector(".s2n-pop");
    var menu = [].slice.call(pop.querySelectorAll("b, .s2n-opt")), form = pop.querySelector(".s2n-form");
    var msg = form.querySelector("textarea"), count = form.querySelector(".s2n-count"), send = form.querySelector(".s2n-send");
    function writing(on) {
      menu.forEach(function (el) { el.hidden = on; el.style.display = on ? "none" : ""; });
      form.hidden = !on; pop.classList.toggle("s2n-writing", on);
      if (on) msg.focus();
    }
    function open(on) {
      pop.hidden = !on; btn.setAttribute("aria-expanded", on ? "true" : "false");
      if (!on) writing(false);
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); open(pop.hidden); });
    pop.querySelector(".s2n-wa").addEventListener("click", function () { writing(true); });
    form.querySelector(".s2n-back").addEventListener("click", function () { writing(false); });
    msg.addEventListener("input", function () {
      count.textContent = msg.value.length + " / " + MAX;
      send.disabled = !msg.value.trim();
    });
    send.addEventListener("click", function () {
      var text = msg.value.trim().slice(0, MAX);
      if (!text) return;
      window.open("https://wa.me/" + waNumber() + "?text=" + encodeURIComponent(text + "\n\n(from " + site + ")"), "_blank", "noopener");
      msg.value = ""; count.textContent = "0 / " + MAX; send.disabled = true;
      open(false);
    });
    document.addEventListener("click", function (e) { if (!box.contains(e.target)) open(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") open(false); });
  }

  /* the footer is drawn by script on most pages, so wait for it briefly */
  var SEL = ".footer-bottom, .foot-base";
  function tryBuild() { var bar = document.querySelector(SEL); if (bar) { build(bar); return true; } return false; }
  function start() {
    if (tryBuild()) return;
    var mo = new MutationObserver(function () { if (tryBuild()) mo.disconnect(); });
    mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 8000);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
