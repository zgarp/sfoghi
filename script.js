/* ============================================================
   script.js — logic for the entry viewer on main.html
   ============================================================ */


/* ── Entries ─────────────────────────────────────────────────
   The 'entries' array is defined in entries.js, which is loaded
   before this file in main.html. Each entry has a 'file' field
   pointing to a .txt file. This script fetches those files and
   stores their text in memory before showing anything.
   ──────────────────────────────────────────────────────────── */


/* ── State ──
   'current' tracks which entry we are looking at.
   0 = the first item in the array (the most recent entry).
   'loaded' will hold the fetched text for each entry. */
let current = 0;
let loaded  = [];   /* will be filled with plain text strings */



/* ── fetchAll() ──
   Fetches every .txt file listed in entries.js at once.
   Uses Promise.all so it waits for ALL files to arrive before
   doing anything else. Once everything is ready, calls render(). */
async function fetchAll() {
  loaded = await Promise.all(
    entries.map(entry =>
      fetch(entry.file)
        .then(response => response.text())
        .catch(() => "(Could not load text file: " + entry.file + ")")
    )
  );
  render();
}


/* ── render() ──
   Reads the current entry and writes its data into the page.
   Also updates the counter and enables/disables the arrows. */
function render() {
  const e = entries[current];

  document.getElementById("first").disabled = (current === 0);
  document.getElementById("last").disabled  = (current === entries.length - 1);

  document.getElementById("entry-date").textContent  = e.date;
  document.getElementById("entry-title").textContent = e.title;
  document.getElementById("entry-body").innerHTML = loaded[current];

  /* Counter: "1 / 3", "2 / 3", etc. */
  document.getElementById("counter").textContent = `${current + 1} / ${entries.length}`;

  /* Disable the left arrow on the first entry, right arrow on the last */
  document.getElementById("prev").disabled = (current === 0);
  document.getElementById("next").disabled = (current === entries.length - 1);
}


/* ── navigate(dir) ──
   Called by the arrow buttons in the HTML.
   dir is -1 (go left / older) or +1 (go right / newer).
   After moving, scroll the body area back to the top. */
function navigate(dir) {
  const next = current + dir;

  if (next >= 0 && next < entries.length) {
    current = next;
    render();
    document.getElementById("entry-body").scrollTop = 0;
  }
}

// Double arrow
function jumpTo(index) {
  current = index;
  render();
  document.getElementById("entry-body").scrollTop = 0;
}

// Headers in the menu
function randomEntry() {
  let index;
  do {
    index = Math.floor(Math.random() * entries.length);
  } while (index === current && entries.length > 1);
  return index;
}

function buildNav() {
  const dropdown = document.getElementById("nav-dropdown");
  entries.forEach((e, i) => {
    const item = document.createElement("div");
    item.className = "nav-item";
    item.innerHTML = `<span class="nav-item-date">${e.date}</span>
                      <span class="nav-item-title">${e.title}</span>`;
    item.addEventListener("click", () => {
      current = i;
      render();
      document.getElementById("entry-body").scrollTop = 0;
      closeNav();
    });
    dropdown.appendChild(item);
  });
}

// function toggleNav() {
//   document.getElementById("nav-wrapper").classList.toggle("open");
// }

function toggleNav() {
  document.querySelectorAll(".nav-item").forEach((item, i) => {
    item.classList.toggle("active", i === current);
  });
  document.getElementById("nav-wrapper").classList.toggle("open");
  const activeItem = document.querySelector(".nav-item.active");
  if (activeItem) activeItem.scrollIntoView({ block: "nearest" });
}

function closeNav() {
  document.getElementById("nav-wrapper").classList.remove("open");
}


document.addEventListener("click", (e) => {
  const wrapper = document.getElementById("nav-wrapper");
  const toggle = document.querySelector(".icon-btn[onclick='toggleNav()']");
  if (!wrapper.contains(e.target) && !toggle.contains(e.target)) closeNav();
});

/* ── Start ──
Kick everything off by fetching all text files. */
buildNav();
fetchAll().then(() => render());
