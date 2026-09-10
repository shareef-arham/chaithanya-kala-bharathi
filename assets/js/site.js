/* Shared chrome for every CKB page: the header, the footer, scroll reveals
   and the PDF opener. Each page carries <div id="site-header"></div> and
   <div id="site-footer"></div>; this fills them so the navigation lives in
   one file rather than being copy-pasted across nine pages. */
(function () {
  "use strict";

  var NAV = [
    { href: "index.html",       label: "Home",         key: "home" },
    { href: "about.html",       label: "About Us",     key: "about", sub: [
      { href: "about.html#story",    label: "Who We Are" },
      { href: "about.html#mission",  label: "Vision & Mission" },
      { href: "about.html#board",    label: "Board Members" },
      { href: "about.html#profile",  label: "Organisation Profile" },
      { href: "about.html#legal",    label: "Legal Status" },
      { href: "about.html#supporters", label: "Our Supporters" }
    ] },
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
      "<div><h4>Chaithanya Kala Bharathi</h4>" +
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

  /* Any element carrying data-doc opens that PDF in the shared viewer. */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-doc]");
    if (!el) return;
    var q = "?file=" + encodeURIComponent(el.dataset.doc);
    if (el.dataset.title) q += "&title=" + encodeURIComponent(el.dataset.title);
    location.href = "pdfviewer.html" + q;
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
