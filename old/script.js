/* ============================================================
   script.js — logic for the entry viewer on main.html
   ============================================================ */


/* ── Entries ─────────────────────────────────────────────────
   Add new entries at the TOP of this array (most recent first).
   Each entry needs three fields:
     date  — displayed in small text above the title
     title — the heading of the entry
     body  — the main text (can be as long as you like)
   ──────────────────────────────────────────────────────────── */
const entries = [
  {
    date:  "18 March 2026",
    title: "First entry",
    body:  "This is the text of the first comment. You can write anything here — thoughts, updates, reflections. Add as much or as little as you like."
  },
  {
    date:  "10 March 2026",
    title: "An earlier note",
    body:  "This is an older entry. Use the arrow on the right to go forward to the newer one, or add more entries above this one in the array."
  },
  {
    date:  "1 March 2026",
    title: "The beginning",
    body:  "The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times. The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times. The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times. The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times.The very first note. When new entries are added at the top of the array, this one will be reachable by clicking the left arrow multiple times. "
  }
];


/* ── State ──
   'current' tracks which entry we are looking at.
   0 = the first item in the array (the most recent entry). */
let current = 0;


/* ── render() ──
   Reads the current entry and writes its data into the page.
   Also updates the counter and enables/disables the arrows. */
function render() {
  const e = entries[current];

  document.getElementById("entry-date").textContent  = e.date;
  document.getElementById("entry-title").textContent = e.title;
  document.getElementById("entry-body").textContent  = e.body;

  /* Counter: "1 / 3", "2 / 3", etc. */
  document.getElementById("counter").textContent = `${current + 1} / ${entries.length}`;

  /* Disable the left arrow when we are already at the first entry,
     and the right arrow when we are at the last one. */
  document.getElementById("prev").disabled = (current === 0);
  document.getElementById("next").disabled = (current === entries.length - 1);
}


/* ── navigate(dir) ──
   Called by the arrow buttons in the HTML.
   dir is -1 (go left / back in time) or +1 (go right / forward).
   After moving, scroll the body area back to the top. */
function navigate(dir) {
  const next = current + dir;

  /* Guard: do nothing if we would go out of bounds */
  if (next >= 0 && next < entries.length) {
    current = next;
    render();
    document.getElementById("entry-body").scrollTop = 0;
  }
}


/* ── Initialise ──
   Run render() once as soon as the script loads
   so the first entry is displayed immediately. */
render();
