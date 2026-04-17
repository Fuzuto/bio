const CONFIG = {
  galleryPreview: 6,
  gallery: [
    { src: "myfirstgtamcpevnserver.jpg", title: "GTA5 — Minecraft PE Server",    description: "a project I’m very passionate about. I’m lucky to have support from many YouTubers and players.",   palette: "linear-gradient(135deg,#ff4655,#f86b1f)" },
    { src: "firstminecraftpeserver.jpg", title: "SkyBlock - Minecraft PE Server",          description: "my first server and the one I’ve spent the most time on over the years. It has been stable with over 20 players and also provided me with income. It is one of my biggest achievements and a very important memory for me.",         palette: "linear-gradient(135deg,#7c3aed,#22d3ee)" },
    { src: "myfirstgtamcpevnserver2.jpg", title: "SkyBlock - Minecraft PE Server",   description: "another image of a Minecraft server I’m proud of. At that time, I was still a middle school student with many mistakes and limited experience in management. I learned a lot from that experience.",                palette: "linear-gradient(135deg,#f43f5e,#8b5cf6)" },
    { src: "myfirstlaptopsetup.jpg", title: "Setup Photo — First Laptop",    description: "This is my laptop setup with an old 720p monitor. For me, this is where everything started and where I grew up. I love my parents because they trusted me and gave me this meaningful gift.",         palette: "linear-gradient(135deg,#0ea5e9,#22d3ee)" },
  ],
  videosPreview: 2,
  youtubeVideos: [
    { url: "https://www.youtube.com/embed/64d1ysI9420", title: "Simple reforge system",       meta: "Server Development · Project" },
    { url: "https://www.youtube.com/embed/8IRspHLNfEA", title: "Simple Dungeon", meta: "Server Development · Project" },
    { url: "https://www.youtube.com/embed/oG41X5n3v0E", title: "Simple PvP Server",         meta: "Server Development · Project"  },
    { url: "https://www.youtube.com/embed/aNxy0unvDGk", title: "Job Selection System",            meta: "Server Development · Project"     },
    { url: "https://www.youtube.com/embed/T-I0R3Vg5cc", title: "Gathering System",            meta: "Server Development · Project"     },
    { url: "https://www.youtube.com/embed/QpY_lRDOJ3Q", title: "Lootchest/Crate System",            meta: "Server Development · Project"     },
    { url: "https://www.youtube.com/embed/h49YkDK7u6c&list=PL24R7nW3-Uj8pdxOicCkyNw8GT89yNrMJ&index=2", title: "My GTA Gameplay Clip",            meta: "Server Development · Project"     },
  ],

  supabase: {
    url: "https://fuzfzrwgyfrmqbownrvz.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1emZ6cndneWZybXFib3ducnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjE4NzgsImV4cCI6MjA5MTMzNzg3OH0.gqbgrSSzL5Ce3uOHyNNJeQsEJYN119ULvyi0kSc5WS0",
    table:  "profile_views",
    rowId:  1,
  },
};

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

function showToast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 1800);
}

function formatTime(s) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function initNav() {
  const nav = $(".nav");
  const toggle = $("#navToggle");
  if (!nav || !toggle) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$(".nav__link").forEach((l) =>
    l.addEventListener("click", () => nav.classList.remove("open"))
  );
}

let _revealObserver = null;
function observeReveal(root = document) {
  if (!("IntersectionObserver" in window)) {
    root.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    return;
  }
  if (!_revealObserver) {
    _revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = Number(e.target.dataset.delay || 0);
            setTimeout(() => e.target.classList.add("in"), delay);
            _revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
  }
  root.querySelectorAll(".reveal:not(.in)").forEach((el) => _revealObserver.observe(el));
}
function initReveal() { observeReveal(); }

function initCopyCards() {
  $$(".card--copy").forEach((card) => {
    card.addEventListener("click", async () => {
      const text = card.dataset.copy || "";
      const label = card.dataset.label || "value";
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      card.classList.add("copied");
      const hint = card.querySelector(".card__hint span");
      const prev = hint ? hint.textContent : null;
      if (hint) hint.textContent = "Copied!";
      showToast(`${label} copied to clipboard`);
      setTimeout(() => {
        card.classList.remove("copied");
        if (hint && prev) hint.textContent = prev;
      }, 1600);
    });

    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  $$(".card--link").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  $$(".loc").forEach((loc) => {
    loc.addEventListener("pointermove", (e) => {
      const r = loc.getBoundingClientRect();
      loc.style.setProperty("--mx", `${e.clientX - r.left}px`);
      loc.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

async function initViewCounter() {
  const el1 = $("#viewCount");
  const el2 = $("#viewCountBig");
  if (!el1 && !el2) return;

  const render = (n) => {
    if (el1) animateNumber(el1, n);
    if (el2) animateNumber(el2, n);
  };

  const sb = CONFIG.supabase;
  const endpoint = `${sb.url}/rest/v1/${sb.table}?id=eq.${sb.rowId}`;
  const headers = {
    apikey:        sb.anonKey,
    Authorization: `Bearer ${sb.anonKey}`,
  };

  try {
    const getRes = await fetch(endpoint, { headers, cache: "no-store" });
    if (!getRes.ok) throw new Error(`GET ${getRes.status}`);
    const rows = await getRes.json();
    const current = Number(rows?.[0]?.count ?? 0);
    const next = (Number.isFinite(current) ? current : 0) + 1;

    render(next);

    await fetch(endpoint, {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ count: next }),
    });
    return;
  } catch (err) {
    console.warn("[views] Supabase counter failed, using local fallback:", err);
  }

  const KEY = "portfolio_views";
  let count = parseInt(localStorage.getItem(KEY) || "0", 10);
  if (!count) count = 1280 + Math.floor(Math.random() * 90);
  count += 1;
  localStorage.setItem(KEY, String(count));
  render(count);
}

function animateNumber(el, target) {
  const duration = 1400;
  const start = performance.now();
  const from = 0;
  const format = (n) => n.toLocaleString();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = Math.floor(from + (target - from) * eased);
    el.textContent = format(v);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initGallery() {
  const grid = $("#galleryGrid");
  if (!grid) return;

  const isFullPage = grid.dataset.full === "true";
  const items = CONFIG.gallery;
  const limit = isFullPage ? items.length : (CONFIG.galleryPreview || 6);
  const visible = items.slice(0, limit);

  visible.forEach((item, i) => grid.appendChild(buildTile(item, i)));

  const moreHost = $("#galleryMore");
  if (moreHost && !isFullPage && items.length > limit) {
    moreHost.innerHTML = `
      <a href="gallery.html" class="btn btn--ghost gallery__more-btn">
        <span>View all ${items.length} photos</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>`;
  }
}

function buildTile(item, i) {
  const tile = document.createElement("button");
  tile.type = "button";
  tile.className = "gallery__tile";
  tile.dataset.index = String(i);
  tile.setAttribute("aria-label", `View ${item.title || "gallery item"}`);

  if (item.src) {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title || "Gallery image";
    img.loading = "lazy";
    tile.appendChild(img);
  } else {
    const ph = document.createElement("div");
    ph.className = "gallery__placeholder";
    ph.style.setProperty("--ph", item.palette || "linear-gradient(135deg,#7c3aed,#22d3ee)");
    ph.textContent = item.title || "Photo";
    tile.appendChild(ph);
  }

  tile.addEventListener("click", () => openModal(i));
  return tile;
}

let modalIndex = 0;
function openModal(i) {
  const box = $("#modal");
  if (!box) return;
  modalIndex = i;
  renderModal();
  box.classList.add("open");
  box.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  const box = $("#modal");
  if (!box) return;
  box.classList.remove("open");
  box.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function stepModal(dir) {
  const n = CONFIG.gallery.length;
  if (!n) return;
  modalIndex = (modalIndex + dir + n) % n;
  renderModal();
}
function renderModal() {
  const item = CONFIG.gallery[modalIndex];
  if (!item) return;

  const media = $("#modalMedia");
  const title = $("#modalTitle");
  const desc  = $("#modalDesc");
  if (!media) return;

  media.innerHTML = "";
  if (item.src) {
    const img = document.createElement("img");
    img.alt = item.title || "";
    img.decoding = "async";
    const markLoaded = () => requestAnimationFrame(() => img.classList.add("loaded"));
    if (img.complete && img.naturalWidth) markLoaded();
    else img.addEventListener("load", markLoaded, { once: true });
    img.src = item.src;
    media.appendChild(img);
  } else {
    const ph = document.createElement("div");
    ph.className = "modal__placeholder";
    ph.style.setProperty("--ph", item.palette || "linear-gradient(135deg,#7c3aed,#22d3ee)");
    ph.textContent = item.title || "Photo";
    media.appendChild(ph);
  }
  if (title) title.textContent = item.title || "";
  if (desc)  desc.textContent  = item.description || "";
}
function initModal() {
  const box = $("#modal");
  if (!box) return;
  $(".modal__close", box)?.addEventListener("click", closeModal);
  $(".modal__nav--prev", box)?.addEventListener("click", () => stepModal(-1));
  $(".modal__nav--next", box)?.addEventListener("click", () => stepModal(1));
  box.addEventListener("click", (e) => { if (e.target === box) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") stepModal(1);
    if (e.key === "ArrowLeft") stepModal(-1);
  });
}

function extractYouTubeId(input) {
  if (!input) return null;
  const raw = String(input).trim();

  if (/^[\w-]{11}$/.test(raw)) return raw;

  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      return /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const m = u.pathname.match(/\/(?:embed|shorts|live|v)\/([\w-]{11})/);
      if (m) return m[1];
    }
  } catch { 
    console.log("Not a valid YouTube URL");
  }

  const m = raw.match(/[\w-]{11}/);
  return m ? m[0] : null;
}

function initVideos() {
  const grid = $("#videos");
  if (!grid) return;

  const isFullPage = grid.dataset.full === "true";
  const items = CONFIG.youtubeVideos;
  const limit = isFullPage ? items.length : (CONFIG.videosPreview || 2);
  const visible = items.slice(0, limit);

  visible.forEach((v) => {
    const id = extractYouTubeId(v.url || v.id);
    if (!id) return;

    const card = document.createElement("article");
    card.className = "video reveal";
    card.innerHTML = `
      <div class="video__frame">
        <iframe
          src="https://www.youtube.com/embed/${id}"
          title="${escapeHtml(v.title)}"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
      <div class="video__body">
        <h3 class="video__title">${escapeHtml(v.title)}</h3>
        <p class="video__meta">${escapeHtml(v.meta || "")}</p>
      </div>
    `;
    grid.appendChild(card);
  });

  const moreHost = $("#videosMore");
  if (moreHost && !isFullPage && items.length > limit) {
    moreHost.innerHTML = `
      <a href="highlights.html" class="btn btn--ghost gallery__more-btn">
        <span>View all ${items.length} highlights</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>`;
  }

  observeReveal();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function initPlayer() {
  const player  = $("#player");
  const audio   = $("#audio");
  const trigger = $("#playerTrigger");
  const panel   = $("#playerPanel");
  const slider  = $(".vslider");
  const range   = $("#volume");
  const fill    = $("#volFill");
  const knob    = $("#volKnob");
  const pct     = $("#volPct");
  if (!player || !audio) return;

  const savedVol = parseFloat(localStorage.getItem("pf_volume"));
  const initial = isFinite(savedVol) ? Math.min(1, Math.max(0, savedVol)) : 0.6;
  setVolume(initial, false);

  function setVolume(v, save = true) {
    v = Math.min(1, Math.max(0, v));
    audio.volume = v;
    if (range) range.value = String(v);
    const percent = Math.round(v * 100);
    if (pct) pct.textContent = String(percent);
    player.style.setProperty("--fill", `${percent}%`);

    if (v === 0) player.dataset.vol = "mute";
    else if (v < 0.5) player.dataset.vol = "mid";
    else player.dataset.vol = "high";

    if (save) localStorage.setItem("pf_volume", String(v));
  }

  function openPanel() {
    player.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
  }
  function closePanel() {
    player.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  }

  trigger?.addEventListener("click", (e) => {
    e.stopPropagation();
    player.classList.contains("open") ? closePanel() : openPanel();
  });
  document.addEventListener("click", (e) => {
    if (!player.contains(e.target)) closePanel();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });

  range?.addEventListener("input", (e) => setVolume(Number(e.target.value)));

  if (slider) {
    const computeFromPointer = (clientY) => {
      const rect = slider.getBoundingClientRect();
      const y = Math.min(rect.bottom, Math.max(rect.top, clientY));
      return 1 - (y - rect.top) / rect.height;
    };
    const onMove = (e) => {
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      setVolume(computeFromPointer(y));
    };
    const endDrag = () => {
      player.classList.remove("dragging");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
    slider.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      player.classList.add("dragging");
      setVolume(computeFromPointer(e.clientY));
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);
    });
    slider.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = (e.deltaY > 0 ? -1 : 1) * 0.05;
      setVolume(audio.volume + delta);
    }, { passive: false });
  }

  const ensurePlaying = () => {
    const p = audio.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        const resume = () => {
          audio.play().catch(() => {});
          window.removeEventListener("pointerdown", resume);
          window.removeEventListener("keydown", resume);
          window.removeEventListener("touchstart", resume);
        };
        window.addEventListener("pointerdown", resume, { once: true });
        window.addEventListener("keydown", resume, { once: true });
        window.addEventListener("touchstart", resume, { once: true });
      });
    }
  };
  ensurePlaying();
  audio.addEventListener("pause", () => {
    setTimeout(() => { if (audio.paused) audio.play().catch(() => {}); }, 0);
  });
  audio.addEventListener("ended", () => audio.play().catch(() => {}));
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && audio.paused) audio.play().catch(() => {});
  });
}

function initScrollSpy() {
  const links = $$('.nav__link[href^="#"]');
  if (!links.length) return;
  const map = new Map();
  links.forEach((l) => {
    const id = l.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) map.set(target, l);
  });
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          map.get(e.target)?.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  map.forEach((_, target) => io.observe(target));
}

function initOverscrollBounce() {
  const target = document.querySelector("main");
  if (!target) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const MAX_PULL   = 140;   
  const INPUT_MULT = 0.35;  
  const FOLLOW     = 0.22; 
  const RELEASE    = 0.82;  
  const SETTLE     = 0.35; 

  let pull = 0;
  let targetPull = 0;
  let rafId = null;
  let returning = false;
  let wheelStopTimer = 0;

  const atTop    = () => window.scrollY <= 0;
  const atBottom = () =>
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 0.5;

  const apply = () => {
    target.style.transform = pull
      ? `translate3d(0, ${pull.toFixed(2)}px, 0)`
      : "translate3d(0, 0, 0)";
  };

  const stop = () => {
    pull = 0;
    targetPull = 0;
    apply();
    document.body.classList.remove("bouncing");
    rafId = null;
  };

  const tick = () => {
    pull += (targetPull - pull) * FOLLOW;
    if (returning) targetPull *= RELEASE;

    apply();

    if (Math.abs(pull) > SETTLE || Math.abs(targetPull) > SETTLE) {
      rafId = requestAnimationFrame(tick);
    } else {
      stop();
    }
  };

  const release = () => {
    returning = true;
    if (rafId == null) rafId = requestAnimationFrame(tick);
  };

  const addPull = (deltaPx) => {
    const resist = 1 - Math.min(0.88, Math.abs(targetPull) / MAX_PULL);
    let next = targetPull + deltaPx * resist;
    if (next > MAX_PULL) next = MAX_PULL;
    if (next < -MAX_PULL) next = -MAX_PULL;
    targetPull = next;

    returning = false;
    document.body.classList.add("bouncing");
    if (rafId == null) rafId = requestAnimationFrame(tick);

    clearTimeout(wheelStopTimer);
    wheelStopTimer = setTimeout(release, 70);
  };

  window.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) return;

      const dy = e.deltaY;
      if (!dy) return;

      const topEdge = dy < 0 && atTop();
      const botEdge = dy > 0 && atBottom();
      if (!topEdge && !botEdge) return;

      if (topEdge && targetPull >= MAX_PULL) { e.preventDefault(); return; }
      if (botEdge && targetPull <= -MAX_PULL) { e.preventDefault(); return; }

      e.preventDefault();
      addPull(-dy * INPUT_MULT);
    },
    { passive: false }
  );

  let touchStartY = null;
  let lastDeltaY = 0;

  window.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      lastDeltaY = 0;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      if (touchStartY == null) return;
      const dy = e.touches[0].clientY - touchStartY;
      const pullingDown = dy > 0 && atTop();
      const pullingUp   = dy < 0 && atBottom();

      if (pullingDown || pullingUp) {
        const incremental = dy - lastDeltaY;
        lastDeltaY = dy;
        returning = false;
        document.body.classList.add("bouncing");
        const resist = 1 - Math.min(0.88, Math.abs(targetPull) / MAX_PULL);
        targetPull += incremental * 0.55 * resist;
        targetPull = Math.max(-MAX_PULL, Math.min(MAX_PULL, targetPull));
        if (rafId == null) rafId = requestAnimationFrame(tick);
        if (e.cancelable) e.preventDefault();
      }
    },
    { passive: false }
  );

  const endTouch = () => {
    if (touchStartY == null) return;
    touchStartY = null;
    lastDeltaY = 0;
    release();
  };
  window.addEventListener("touchend", endTouch);
  window.addEventListener("touchcancel", endTouch);

  window.addEventListener(
    "scroll",
    () => {
      if (!atTop() && !atBottom() && (pull || targetPull)) release();
    },
    { passive: true }
  );
}

function initContentGuard() {
  const isEditable = (t) =>
    !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);

  const isProtected = (t) =>
    !!t && (t.tagName === "IMG" || (t.closest && t.closest("main, header, .player, .modal")));

  document.addEventListener("contextmenu", (e) => {
    if (isProtected(e.target)) e.preventDefault();
  });

  document.addEventListener("dragstart", (e) => {
    if (e.target && e.target.tagName === "IMG") e.preventDefault();
  });

  const lockImg = (img) => {
    img.setAttribute("draggable", "false");
    img.addEventListener("contextmenu", (e) => e.preventDefault());
  };
  $$("img").forEach(lockImg);

  const mo = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.tagName === "IMG") lockImg(node);
        if (node.querySelectorAll) node.querySelectorAll("img").forEach(lockImg);
      });
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });

  ["copy", "cut"].forEach((evt) => {
    document.addEventListener(evt, (e) => {
      if (!isEditable(e.target)) e.preventDefault();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (isEditable(e.target)) return;

    const mod = e.ctrlKey || e.metaKey;
    const key = (e.key || "").toLowerCase();

    if (mod && ["c", "x", "s", "u", "p", "a"].includes(key)) {
      e.preventDefault();
    }
    if (key === "f12") e.preventDefault();
    if (mod && e.shiftKey && ["i", "j", "c"].includes(key)) e.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  initNav();
  initReveal();
  initCopyCards();
  initViewCounter();
  initGallery();
  initModal();
  initVideos();
  initPlayer();
  initScrollSpy();
  initOverscrollBounce();
  initContentGuard();
});
