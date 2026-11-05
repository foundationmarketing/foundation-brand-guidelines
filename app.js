/* Foundation Brand Guidelines
   Highlights the sidebar link for the section currently in view. */
(function () {
  "use strict";

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav [data-spy]"));
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute("data-spy")); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      if (a.getAttribute("data-spy") === id) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }

  // The active section is the last one whose top has passed a line 30% down the viewport.
  // At the very bottom of the page, the last section wins even if it is short.
  function update() {
    var line = window.innerHeight * 0.3;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top - line <= 0) current = sections[i];
    }
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) current = sections[sections.length - 1];
    if (current) setActive(current.id);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { ticking = false; update(); });
  }

  // Any in-page link (sidebar, overview cards, buttons, "See also" chips) lights up its
  // section straight away rather than waiting for the scroll to finish.
  var spyIds = links.map(function (a) { return a.getAttribute("data-spy"); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (spyIds.indexOf(id) !== -1) setActive(id);
  });
  window.addEventListener("hashchange", function () { window.requestAnimationFrame(update); });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  // ---------- Example prompt tabs ----------
  // Without JavaScript every prompt stays visible; with it, one shows at a time.
  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    var list = box.querySelector('[role="tablist"]');

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      // On narrow screens the tab row scrolls sideways: bring the chosen tab fully into view.
      if (list && list.scrollWidth > list.clientWidth) {
        var t = tab.getBoundingClientRect();
        var l = list.getBoundingClientRect();
        if (t.left < l.left) list.scrollLeft -= l.left - t.left;
        else if (t.right > l.right) list.scrollLeft += t.right - l.right;
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") next = tabs[0];
        else if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });

    var current = tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || tabs[0];
    if (current) select(current, false);
  });

  // ---------- Copy buttons ----------
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    var target = document.getElementById(btn.getAttribute("data-copy"));
    if (!target) return;
    btn.addEventListener("click", function () {
      function selectText() {
        var range = document.createRange();
        range.selectNodeContents(target);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        btn.textContent = "Selected, press Ctrl+C";
      }
      function reset() { setTimeout(function () { btn.textContent = "Copy"; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(target.textContent).then(function () { btn.textContent = "Copied"; reset(); }, function () { selectText(); reset(); });
      } else {
        selectText();
        reset();
      }
    });
  });
})();
