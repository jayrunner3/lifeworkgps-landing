/* HUB: the single seam between lifeworkgps.tech and the LifeWork hub.
   The same pattern as Spoke-Template's src/config/hub.js, for a static page.

   Every hub-provided value enters through this file. Nothing hub-dependent is hard-coded in the
   page's own code (js/account.js asks this seam). A slot starts unresolved; the hub's browser
   script (listed in config/hub.values.js) resolves it when the harness publishes it, and the page
   switches the matching function on with no code change.

   Until a slot is resolved, the page behaves exactly as it does today: the header shows the same
   Sign in link, and every compass link keeps its public address.

   No secrets ever. Only non-secret browser values and functions the hub's script provides. */
(function (w) {
  "use strict";

  var SLOTS = {
    "identity.current": {
      kind: "endpoint", source: "hub", resolved: false,
      description: "The one LifeWork login. Proposed browser shape: { getPerson() -> Promise<{ firstName, initials } | null>, signIn(returnTo), signOut(returnTo) }. null = signed out.",
    },
    "endpoint.navigation": {
      kind: "endpoint", source: "hub", resolved: false,
      description: "Where each compass route opens for a signed-in person: { destinations: { <key>: url } }. The keys are the data-dest values on the page's links. The hub owns every destination.",
    },
  };

  var values = {};

  function resolve(id, value) {
    if (!SLOTS[id]) throw new Error("Unknown hub slot \"" + id + "\" (config/hub.js)");
    values[id] = value;
    SLOTS[id].resolved = true;
    try { w.dispatchEvent(new CustomEvent("lw-hub", { detail: { id: id } })); } catch (e) { /* old browser: the page checks again on load */ }
  }

  function isWired(id) { return !!(SLOTS[id] && SLOTS[id].resolved); }

  function use(id) {
    if (!isWired(id)) throw new Error("Hub slot \"" + id + "\" isn't connected yet (config/hub.js)");
    return values[id];
  }

  function status() {
    return Object.keys(SLOTS).map(function (id) { return { id: id, kind: SLOTS[id].kind, resolved: SLOTS[id].resolved }; });
  }

  w.LW_HUB = { SLOTS: SLOTS, resolve: resolve, isWired: isWired, use: use, status: status };
})(window);
