/* The header account and the sign-in-aware compass links.

   Signed out (or Login not connected yet): nothing changes. The header shows the same Sign in link,
   and every compass link keeps its public address: Explore and Mentor open their information pages,
   North and East open lifeworkgps.com, VetNav opens vetnav.org.

   Signed in: the header shows the person's name and initials, with Sign out in its menu. Each link
   that carries a data-dest key opens the signed-in destination the hub's navigation gives for that
   key (Explore and Mentor: the signed-in pages; North: the Outfitters space; East: the dashboard).
   A key the hub doesn't know yet keeps its public address.

   Everything comes through the seam (config/hub.js). No sign-in of the page's own. */
(function (w, d) {
  "use strict";
  var HUB = w.LW_HUB;
  var link = d.getElementById("lw-signin");
  var acct = d.getElementById("lw-acct");
  if (!HUB || !link || !acct) return;

  var btn = acct.querySelector(".acct-btn");
  var menu = acct.querySelector(".acct-menu");
  var started = false;

  function here() { return w.location.href; }

  function initials(p) {
    if (p.initials) return p.initials;
    var n = (p.firstName || "") + " " + (p.lastName || "");
    return n.trim().split(/\s+/).map(function (s) { return s.charAt(0); }).join("").slice(0, 2).toUpperCase() || "?";
  }

  function openMenu(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) acct.querySelector(".acct-out").focus();
  }

  function showSignedIn(identity, person) {
    acct.querySelector(".acct-name").textContent = person.firstName || "Account";
    acct.querySelector(".acct-av").textContent = initials(person);
    acct.querySelector(".acct-who b").textContent = person.displayName || [person.firstName, person.lastName].filter(Boolean).join(" ") || "your LifeWork account";
    link.hidden = true;
    acct.hidden = false;
    btn.addEventListener("click", function () { openMenu(menu.hidden); });
    d.addEventListener("click", function (e) { if (!acct.contains(e.target)) openMenu(false); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { openMenu(false); btn.focus(); } });
    acct.querySelector(".acct-out").addEventListener("click", function () { identity.signOut(here()); });
  }

  // Signed in: every tagged link opens the hub's destination for its key. Signed out: untouched.
  function routeLinks() {
    if (!HUB.isWired("endpoint.navigation")) return;
    var dest = (HUB.use("endpoint.navigation") || {}).destinations || {};
    var links = d.querySelectorAll("a[data-dest]");
    for (var i = 0; i < links.length; i++) {
      var url = dest[links[i].getAttribute("data-dest")];
      if (url) links[i].href = url;
    }
  }

  function start() {
    if (started || !HUB.isWired("identity.current")) return; // Login not connected: today's page, unchanged
    started = true;
    var identity = HUB.use("identity.current");
    // Sign in goes through the hub and comes back to this page, instead of leaving for the dashboard.
    link.addEventListener("click", function (e) { e.preventDefault(); identity.signIn(here()); });
    Promise.resolve()
      .then(function () { return identity.getPerson(); })
      .then(function (person) {
        if (!person) return;            // signed out: the page stays as it is
        showSignedIn(identity, person);
        routeLinks();
      })
      .catch(function () { /* the sign-in check failed: stay signed out, links unchanged */ });
  }

  w.addEventListener("lw-hub", function (e) { if (e.detail && e.detail.id === "identity.current") start(); });

  // Developer preview, on a developer's own computer only: ?preview=signed-in or signed-out.
  // _dev/ is never published (Jekyll leaves out folders that start with "_").
  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(w.location.hostname);
  var preview = local && new URLSearchParams(w.location.search).get("preview");
  if (preview) {
    var s = d.createElement("script");
    s.src = "_dev/preview.js";
    s.onload = start;
    d.body.appendChild(s);
  } else {
    start();
  }
})(window, document);
