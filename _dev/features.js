/* Every function lifeworkgps.tech shows and what it depends on. Read by the command center
   (spoke.json -> seam.features) and the developer map. Standard: Spoke-SpokeHealth
   docs/DEV-VIEW-STANDARD.md. Never published: _dev/ is left out of GitHub Pages.
   The text after "window.LW_FEATURES =" must stay plain JSON. */
window.LW_FEATURES = {
 "version": 1,
 "updated": "2026-11-08",
 "standards": [
  { "id": "lw.dev-view", "title": "Developer view and developer map", "kind": "engineering", "version": "1.0", "source": "Spoke-SpokeHealth docs/DEV-VIEW-STANDARD.md", "status": "adopted" },
  { "id": "lw.spoke-manifest", "title": "Spoke manifest", "kind": "engineering", "version": "0.2", "source": "Spoke-SpokeHealth schema/spoke.schema.json", "status": "validated" }
 ],
 "features": [
  { "id": "site", "area": "Page", "label": "The compass page and how it is served", "where": "Whole page", "status": "live", "needs": [],
    "does": "One static page on GitHub Pages at lifeworkgps.tech. No account needed to read it." },
  { "id": "mode-toggle", "area": "Compass", "label": "Navigating as an individual or an organization", "where": "Compass, top", "status": "live", "needs": [],
    "does": "Switches the compass cards between the individual and organization side. On phones, the same choice leads to a short list of routes." },
  { "id": "header-signin", "area": "Header", "label": "Sign in", "where": "Header, right", "status": "demo", "needs": ["identity.current"],
    "dependsOn": [{ "on": "hub:login", "need": "required", "why": "One LifeWork login for every site." }],
    "fallback": { "mode": "alternate", "sees": "Today's Sign in link: the LifeWork sign-in, which then opens the dashboard on lifework.live.", "restore": "Once Login is wired, Sign in returns the person to this page." },
    "does": "Opens the hub's LifeWork sign-in and comes back to this page (returnTo)." },
  { "id": "header-account", "area": "Header", "label": "Your name and initials", "where": "Header, right", "status": "demo", "needs": ["identity.current"],
    "dependsOn": [{ "on": "hub:login", "need": "required", "why": "The person comes from the one LifeWork login." }],
    "fallback": { "mode": "none", "sees": "Sign in, as today. Nothing personal shows.", "restore": "Shows the person on the next page load once Login answers." },
    "does": "Shows the signed-in person's first name and initials. Opens a menu with who is signed in." },
  { "id": "header-signout", "area": "Header", "label": "Sign out", "where": "Header account menu", "status": "demo", "needs": ["identity.current"],
    "dependsOn": [{ "on": "hub:login", "need": "required", "why": "Signing out ends the one LifeWork session everywhere." }],
    "fallback": { "mode": "hide", "sees": "No account menu, so no Sign out.", "restore": "Appears with the account menu once Login is wired." },
    "does": "Signs the person out through the hub and returns them to this page, signed out." },
  { "id": "route-west", "area": "Compass", "label": "West: Explore", "where": "West card, header Explore link, mobile row", "status": "demo", "needs": ["identity.current", "endpoint.navigation"],
    "dependsOn": [{ "on": "hub:navigation", "need": "enhances", "why": "The hub knows the signed-in Explore address." }],
    "fallback": { "mode": "alternate", "sees": "explore.lifeworkgps.tech, the Explore information page.", "restore": "Signed-in people go straight to the signed-in Explore page once navigation is wired." },
    "does": "Signed out: the Explore information page. Signed in: the signed-in Explore page (Compass, Social profile, Persona Deck, assessments)." },
  { "id": "route-south", "area": "Compass", "label": "South: Mentor", "where": "South card, header Mentors link, mobile rows", "status": "demo", "needs": ["identity.current", "endpoint.navigation"],
    "dependsOn": [{ "on": "hub:navigation", "need": "enhances", "why": "The hub knows the signed-in Mentor and Coach addresses." }],
    "fallback": { "mode": "alternate", "sees": "mentor.lifeworkgps.tech, the coaching information page.", "restore": "Signed-in people go straight to the signed-in page once navigation is wired." },
    "does": "Signed out: the coaching information page. Signed in: the Mentor page, or Coach directly for find a coach and become a coach." },
  { "id": "route-north", "area": "Compass", "label": "North: Outfitters", "where": "North card, mobile rows", "status": "demo", "needs": ["identity.current", "endpoint.navigation"],
    "dependsOn": [{ "on": "hub:navigation", "need": "enhances", "why": "The Outfitters address inside lifeworkgps.com comes from the hub." }],
    "fallback": { "mode": "alternate", "sees": "lifeworkgps.com, its landing page.", "restore": "Signed-in people go straight to the Outfitters space once navigation is wired." },
    "does": "Signed out: the lifeworkgps.com landing page. Signed in: the Outfitters space in the lifeworkgps.com app (people: get outfitted; providers: list services)." },
  { "id": "route-east", "area": "Compass", "label": "East: Careers", "where": "East card, header Careers link, mobile rows", "status": "demo", "needs": ["identity.current", "endpoint.navigation"],
    "dependsOn": [{ "on": "hub:navigation", "need": "enhances", "why": "The dashboard address comes from the hub." }],
    "fallback": { "mode": "alternate", "sees": "lifeworkgps.com, its landing page.", "restore": "Signed-in people go straight to the dashboard once navigation is wired." },
    "does": "Signed out: the lifeworkgps.com landing page. Signed in: the main dashboard (people: search careers; employers: post a job)." },
  { "id": "route-nw", "area": "Compass", "label": "Northwest: VetNav (partner)", "where": "Northwest card, partner band, mobile rows", "status": "live", "needs": [],
    "dependsOn": [{ "on": "hub:navigation", "need": "enhances", "why": "Once VetNav syncs with the hub, it can open signed in with the LifeWork profile." }],
    "fallback": { "mode": "alternate", "sees": "vetnav.org in a new tab, after the eligibility note.", "restore": "No change needed: VetNav is a separate partner site." },
    "does": "Explains who VetNav is for, then opens vetnav.org in a new tab." }
 ]
};
