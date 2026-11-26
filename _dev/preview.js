/* Developer preview only (loaded by js/account.js on localhost with ?preview=). Never published:
   GitHub Pages (Jekyll) leaves out folders that start with "_".

   A stand-in for what the hub will provide, so the journey can be walked before Login is wired:
     ?preview=signed-out   the hub is connected and nobody is signed in
     ?preview=signed-in    a synthetic person (Alex Rivera, invented) is signed in

   Clicking a compass link in preview shows where it would go instead of leaving the page.
   Destinations marked "from the hub" are addresses only the hub's navigation will know. */
(function (w, d) {
  "use strict";
  var mode = new URLSearchParams(w.location.search).get("preview");
  var signedIn = mode === "signed-in";

  var DEST = {
    "explore":               { label: "Explore, signed in (Spoke-Explore shell)", url: "http://localhost:5070/?preview=partway" },
    "mentor":                { label: "Mentor, signed in (Spoke-Mentor shell)", url: "http://localhost:5071/?preview=partway" },
    "mentor.get-coaching":   { label: "Coaching: find a coach (Spoke-Coach, opened from Mentor)", url: null },
    "mentor.become-a-coach": { label: "Coaching: set up my practice (Spoke-Coach, coach side)", url: null },
    "outfitters":            { label: "lifeworkgps.com, straight to the Outfitters space", url: null },
    "outfitters.provider":   { label: "lifeworkgps.com, Outfitters: list my services (provider side)", url: null },
    "careers":               { label: "lifeworkgps.com, straight to the main dashboard", url: null },
    "careers.employer":      { label: "lifeworkgps.com, post a job (employer side)", url: null },
    "vetnav":                { label: "vetnav.org with the LifeWork profile (once VetNav syncs with the hub)", url: null },
    "vetnav.provider":       { label: "vetnav.org, provider sign-up (once VetNav syncs with the hub)", url: null },
  };

  var bar = d.createElement("div");
  bar.setAttribute("role", "status");
  bar.style.cssText = "position:fixed;left:16px;right:16px;bottom:16px;z-index:50;padding:12px 16px;border-radius:12px;" +
    "background:#013a56;color:#fff;font:600 14px Montserrat,system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.3)";
  bar.textContent = "Preview: " + (signedIn ? "signed in as Alex Rivera (synthetic). Click any compass link to see where it goes." : "signed out. Links keep their public addresses.");
  d.body.appendChild(bar);

  function show(text, url) {
    bar.textContent = text;
    if (url) {
      var a = d.createElement("a");
      a.href = url; a.textContent = " Open it"; a.style.color = "#9fd0f5";
      bar.appendChild(a);
    }
  }

  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-dest]");
    if (!a) return;
    e.preventDefault();
    var key = a.getAttribute("data-dest");
    if (!signedIn) return show("Signed out: " + key + " opens its public page, " + a.getAttribute("href"));
    var t = DEST[key];
    show("Signed in: " + key + " opens " + (t ? t.label : "its public page") + (t && !t.url ? " (address from the hub)." : "."), t && t.url);
  }, true);

  w.LW_HUB.resolve("identity.current", {
    getPerson: function () { return Promise.resolve(signedIn ? { firstName: "Alex", lastName: "Rivera", initials: "AR" } : null); },
    signIn: function () { show("Sign in: the hub's LifeWork login opens, then returns here (returnTo)."); },
    signOut: function () { show("Sign out: the hub signs Alex out everywhere and returns here."); },
  });
  var destinations = {};
  Object.keys(DEST).forEach(function (k) { destinations[k] = DEST[k].url || "#hub-destination-" + k; });
  w.LW_HUB.resolve("endpoint.navigation", { destinations: destinations });
})(window, document);
