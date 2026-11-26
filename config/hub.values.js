/* What the wiring harness has published for this page. Empty until Login is ready-in-dev.

   When the harness entry identity.current@1 (and endpoint.navigation) is ready, this file loads
   the hub's own browser script, which calls LW_HUB.resolve("identity.current", ...) and
   LW_HUB.resolve("endpoint.navigation", ...). The harness entry says which script and which
   non-secret values. Never a secret here: this file is public.

   Until then the page works exactly as it does today. */
