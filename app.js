/* =========================================================
   DYLUX — dylux-beats.com
   Edit CONFIG to fill in your links. Empty strings hide things.
   ========================================================= */
const CONFIG = {
  // SoundCloud profile, playlist or track URL shown in the Music player
  soundcloud: "https://soundcloud.com/dylux-beats",
  socials: {                       // full URLs, leave "" to hide
    soundcloud: "https://soundcloud.com/dylux-beats",
    instagram:  "https://www.instagram.com/dylux_beats/",
    facebook:   "https://www.facebook.com/DYLUXBEATS",
    tiktok:     "",
    spotify:    "",
    youtube:    "",
  },
  // Shop: your Gumroad product link, e.g. "https://dylux.gumroad.com/l/wavetable-generator".
  // While empty, the button shows "Coming soon".
  gumroadUrl: "https://sk8erdstein.gumroad.com/l/odbob",
  bookingEmail: "",                // e.g. booking@dylux-beats.com
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let energy = 0.15;       // 0..1 — drives visuals; jumps when music plays
let playing = false;

/* ---------- loader ---------- */
document.body.classList.add("loading");
(() => {
  const pct = $("#loaderPct"); let p = 0;
  const t = setInterval(() => {
    p = Math.min(100, p + Math.ceil(Math.random() * 18));
    pct.textContent = p;
    if (p >= 100) {
      clearInterval(t);
      setTimeout(() => { $("#loader").classList.add("done"); document.body.classList.remove("loading"); glitch($(".hero .glitch")); }, 200);
    }
  }, reduced ? 10 : 70);
})();
$("#year").textContent = new Date().getFullYear();

/* ---------- socials ---------- */
const ICONS = {
  soundcloud: '<path d="M1 14.5c0 1 .8 1.8 1.7 1.8V12.7c-1 0-1.7.8-1.7 1.8zm2.6 1.8h.9v-5h-.9zm1.8 0h.9V9.9h-.9zm1.8 0h.9V9.4h-.9zm1.8 0h.9V8.8h-.9zm1.8 0h.9V7.6c-.3.1-.6.3-.9.5zm2-8.6v8.6h7.6c1.8 0 3.3-1.5 3.3-3.3s-1.5-3.3-3.3-3.3c-.4 0-.8.1-1.2.2C17.8 7.2 15.6 5.2 13 5.2c-.4 0-.8.1-1.2.2z"/>',
  instagram: '<path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.9 8c-.1-1.5-.4-2.8-1.5-3.9S17.9 2.7 16.4 2.6C14.8 2.5 9.2 2.5 7.6 2.6 6.1 2.7 4.8 3 3.7 4.1S2.2 6.5 2.1 8c-.1 1.6-.1 6.4 0 8 .1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.6.1 7.2.1 8.8 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.6.1-6.4 0-8zm-2 9.7a3.2 3.2 0 0 1-1.8 1.8c-1.3.5-4.3.4-6.1.4s-4.8.1-6.1-.4a3.2 3.2 0 0 1-1.8-1.8c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7a3.2 3.2 0 0 1 1.8-1.8C7.2 4 10.2 4.1 12 4.1s4.8-.1 6.1.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7z"/>',
  facebook: '<path d="M14 22v-8.1h2.7l.4-3.2H14V8.7c0-.9.3-1.5 1.6-1.5h1.7V4.3a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3v2.3H7.8v3.2h2.8V22z"/>',
  tiktok: '<path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.5a2.9 2.9 0 1 1-2-2.7V9.3a6.3 6.3 0 1 0 5.4 6.2V8.6a8.2 8.2 0 0 0 4.8 1.5V6.8z"/>',
  spotify: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4a.6.6 0 0 1-.9.2c-2.4-1.5-5.4-1.8-8.9-1a.6.6 0 1 1-.3-1.2c3.9-.9 7.2-.5 9.9 1.1.3.2.4.6.2.9zm1.2-2.7a.8.8 0 0 1-1.1.3c-2.7-1.7-6.9-2.2-10.1-1.2a.8.8 0 1 1-.5-1.5c3.7-1.1 8.3-.6 11.4 1.3.4.2.5.7.3 1.1zm.1-2.8C14.7 9 9.4 8.8 6.3 9.7a1 1 0 1 1-.6-1.8c3.5-1.1 9.4-.9 13.1 1.3a1 1 0 0 1-.9 1.7z"/>',
  youtube: '<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15V9l5.8 3z"/>',
};
for (const ul of [$("#socials"), $("#socialsFoot")]) {
  ul.innerHTML = Object.entries(CONFIG.socials).filter(([, u]) => u).map(([k, u]) =>
    `<li><a href="${u}" target="_blank" rel="noopener" aria-label="${k}" class="magnetic"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg></a></li>`).join("");
}

/* ---------- header, nav indicator, active tab ---------- */
const topbar = $("#topbar"), navInd = $("#navInd"), links = $$(".nav-link");
function moveInd(a) { navInd.style.left = a.offsetLeft + "px"; navInd.style.width = a.offsetWidth + "px"; }
function setActive(id) {
  links.forEach(l => l.classList.toggle("is-active", l.hash === "#" + id));
  const a = links.find(l => l.hash === "#" + id); if (a) moveInd(a);
}
addEventListener("scroll", () => topbar.classList.toggle("scrolled", scrollY > 20), { passive: true });
addEventListener("resize", () => { const a = $(".nav-link.is-active"); if (a) moveInd(a); });
document.fonts?.ready.then(() => moveInd($(".nav-link.is-active")));
const secObs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
$$("main > section").forEach(s => secObs.observe(s));

$("#menuBtn").addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  $("#menuBtn").setAttribute("aria-expanded", open);
});
links.forEach(l => l.addEventListener("click", () => document.body.classList.remove("menu-open")));

/* ---------- reveal on scroll + counters ---------- */
const revObs = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  $$(".sec-title", e.target).forEach(t => t.classList.add("in"));
  $$(".count", e.target).forEach(countUp);
  revObs.unobserve(e.target);
}), { threshold: .15 });
$$(".reveal").forEach(el => revObs.observe(el));
function countUp(el) {
  const to = +el.dataset.to, t0 = performance.now();
  const step = t => { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + (k === 1 && to ? "+" : ""); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/* ---------- glitch ---------- */
function glitch(el) { if (!el || reduced) return; el.classList.remove("on"); void el.offsetWidth; el.classList.add("on"); setTimeout(() => el.classList.remove("on"), 380); }
const heroGlitch = $(".hero .glitch");
heroGlitch.addEventListener("mouseenter", () => glitch(heroGlitch));
(function loop() { setTimeout(() => { glitch(heroGlitch); loop(); }, (playing ? 900 : 2600) + Math.random() * 2500); })();

/* ---------- cursor + magnetic buttons ---------- */
const cur = $("#cursor"); let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
(function cursorLoop() { cx += (mx - cx) * .2; cy += (my - cy) * .2; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(cursorLoop); })();
document.addEventListener("pointerover", e => cur.classList.toggle("big", !!e.target.closest("a,button,input")));
if (!reduced) $$(".magnetic").forEach(m => {
  m.addEventListener("pointermove", e => { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
  m.addEventListener("pointerleave", () => { m.style.transform = ""; });
});

/* ---------- HERO visualizer: oscilloscope ribbons + particles ---------- */
(() => {
  const c = $("#viz"), x = c.getContext("2d"); let w, h, dpr;
  const parts = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), z: Math.random() * .8 + .2 }));
  function size() { dpr = Math.min(devicePixelRatio, 2); w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
  size(); addEventListener("resize", size);
  let t = 0;
  function frame() {
    t += reduced ? 0 : .016;
    const target = playing ? .55 + .45 * Math.abs(Math.sin(t * Math.PI * 2.13)) ** 6 : .15; // ~128bpm pulse while playing
    energy += (target - energy) * .12;
    x.clearRect(0, 0, w, h);
    const mid = h * .62, px = (mx / w - .5), py = (my / h - .5);
    const cols = ["255,255,255", "170,170,176", "90,90,96"];
    for (let r = 0; r < 3; r++) {
      x.beginPath();
      for (let i = 0; i <= w; i += 4) {
        const k = i / w, env = Math.sin(k * Math.PI) ** 2;
        const y = mid + py * 40 + env * (Math.sin(k * 14 + t * (2 + r) + r) * 30 + Math.sin(k * 41 - t * 3 + px * 6) * 12) * (0.6 + energy * 2.2);
        i ? x.lineTo(i, y) : x.moveTo(i, y);
      }
      x.strokeStyle = `rgba(${cols[r]},${.12 + energy * .35})`; x.lineWidth = 1; x.shadowColor = "rgba(255,255,255,.4)"; x.shadowBlur = 8; x.stroke();
    }
    x.shadowBlur = 0;
    for (const p of parts) {
      p.y -= .0007 * p.z * (1 + energy * 6); if (p.y < 0) { p.y = 1; p.x = Math.random(); }
      const X = (p.x + px * .03 * p.z) * w, Y = p.y * h, s = p.z * (1.4 + energy * 2);
      x.fillStyle = `rgba(255,255,255,${.05 + p.z * .25})`; x.fillRect(X, Y, s, s);
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ---------- MUSIC: native SoundCloud player + metadata + signal display ---------- */
(() => {
  const canvas = $("#deckScope"), ctx = canvas.getContext("2d");
  const frame = $("#scFrame"), follow = $("#scFollow");
  let progress = 0, phase = 0, width = 1, height = 1, lastFrame = 0, currentTrackId = null;
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    width = canvas.clientWidth; height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  new ResizeObserver(size).observe(canvas); size();
  const url = CONFIG.soundcloud;
  if (url) {
    frame.innerHTML = `<iframe id="sc" allow="autoplay" scrolling="no" title="DYLUX on SoundCloud"
      src="https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff792e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&show_artwork=true&visual=false"></iframe>`;
    follow.href = url;
    let attempts = 0;
    const wire = () => {
      if (!window.SC?.Widget) {
        if (++attempts < 40) setTimeout(wire, 300);
        return;
      }
      const wd = SC.Widget($("#sc"));
      const updateTrack = () => wd.getCurrentSound(sound => {
        if (!sound) return;
        if (sound.id !== currentTrackId) { currentTrackId = sound.id; progress = 0; }
        $("#nowPlaying").textContent = sound.title || "DYLUX";
        const tags = parseSoundCloudTags(sound.tag_list);
        if (!tags.length && sound.genre) tags.push(sound.genre);
        const root = $("#trackTags");
        root.replaceChildren(...tags.map(tag => {
          const chip = document.createElement("span");
          chip.className = "track-tag"; chip.textContent = tag;
          return chip;
        }));
        root.hidden = !tags.length;
      });
      const set = on => {
        playing = on; $("#led").classList.toggle("on", on);
        $(".deck").classList.toggle("is-playing", on);
        $("#deckStatus").textContent = on ? "NOW PLAYING" : "PAUSED";
        $("#scopeState").textContent = on ? "PLAYING" : "IDLE";
      };
      wd.bind(SC.Widget.Events.READY, updateTrack);
      wd.bind(SC.Widget.Events.PLAY, () => { updateTrack(); set(true); });
      wd.bind(SC.Widget.Events.PAUSE, () => set(false));
      wd.bind(SC.Widget.Events.FINISH, () => { set(false); progress = 0; });
      wd.bind(SC.Widget.Events.PLAY_PROGRESS, data => { progress = Math.max(0, Math.min(1, data.relativePosition || 0)); });
      wd.bind(SC.Widget.Events.SEEK, data => { progress = Math.max(0, Math.min(1, data.relativePosition || 0)); updateTrack(); });
      wd.bind(SC.Widget.Events.ERROR, () => { set(false); $("#deckStatus").textContent = "OPEN IN SOUNDCLOUD"; });
    };
    wire();
  } else {
    frame.textContent = "New music is on the way."; follow.hidden = true;
  }
  function draw(now = 0) {
    if (!reduced) requestAnimationFrame(draw);
    if (now - lastFrame < 32 && now !== 0) return;
    lastFrame = now;
    if (!reduced) phase += playing ? 0.055 : 0.012;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#8dbbff12"; ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 32) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,height); ctx.stroke(); }
    for (let y = 0; y < height; y += 24) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(width,y); ctx.stroke(); }
    const gradient = ctx.createLinearGradient(0,0,width,0);
    gradient.addColorStop(0,"#77deff"); gradient.addColorStop(.52,"#c6b3ff"); gradient.addColorStop(1,"#77deff");
    const count = Math.max(24, Math.floor(width / 7)), step = width / count;
    for (let i = 0; i < count; i++) {
      const k = i / count, envelope = Math.pow(Math.sin(k * Math.PI),.6);
      const movement = .3 + .7 * Math.abs(Math.sin(i*.34 + phase) * Math.cos(i*.09 - phase*.7));
      const bar = 5 + envelope * movement * height * (playing ? .76 : .38);
      ctx.fillStyle = gradient; ctx.globalAlpha = .18 + movement * (playing ? .55 : .3);
      ctx.fillRect(i * step, (height - bar)/2, Math.max(1, step-3),bar);
    }
    ctx.globalAlpha = 1;
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const k = x / width, env = Math.sin(k * Math.PI);
        const y = height/2 + Math.sin(k*24 + phase*(layer+1)) * Math.cos(k*9 - phase) * env * height * (playing ? .23 : .12) * (1-layer*.2);
        x ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
      }
      ctx.strokeStyle = layer === 1 ? "#c4aaff" : "#8fe5ff";
      ctx.globalAlpha = .7 - layer*.2; ctx.lineWidth = layer === 0 ? 1.7 : 1;
      ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = 10; ctx.stroke();
    }
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff08"; ctx.fillRect(0,height-2,width,2);
    ctx.fillStyle = "#a0ddff"; ctx.fillRect(0,height-2,width*progress,2);
  }
  draw();
})();

function parseSoundCloudTags(value) {
  const matches = String(value || "").match(/"([^"]+)"|([^\s"]+)/g) || [];
  return [...new Set(matches.map(tag => tag.replace(/^"|"$/g, "").trim()).filter(Boolean))];
}

/* ---------- SHOP: wavetable art + tilt + Gumroad checkout ---------- */
(() => {
  const c = $("#wtCanvas"), x = c.getContext("2d");
  let w = 1, h = 1, mode = "fm", amount = .5, t = 0, last = 0;
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    w = c.clientWidth; h = c.clientHeight; c.width = Math.round(w*d); c.height = Math.round(h*d);
    x.setTransform(d,0,0,d,0,0); draw();
  }
  const modes = $$("[data-wave-mode]");
  modes.forEach(button => button.addEventListener("click", () => {
    mode = button.dataset.waveMode;
    modes.forEach(other => other.setAttribute("aria-pressed", String(other === button)));
    draw();
  }));
  $("#waveMorph").addEventListener("input", event => {
    amount = Number(event.target.value) / 100;
    $("#morphValue").textContent = Math.round(amount * 100) + "%";
    draw();
  });
  function draw() {
    x.clearRect(0,0,w,h);
    x.strokeStyle = "#89dbff10"; x.lineWidth = 1;
    for(let i = 0; i < 12; i++) {
      const xx = w * .08 + i * w * .076;
      x.beginPath(); x.moveTo(xx,h*.16); x.lineTo(xx-w*.12,h*.88); x.stroke();
    }
    const layers = 30;
    for (let j = 0; j < layers; j++) {
      const k = j / (layers-1), oy = h*.2+k*h*.57, ox = w*.25-k*w*.15, ww = w*.69;
      x.beginPath();
      for(let i=0; i<=180; i++) {
        const p=i/180, ph=p*Math.PI*2, motion=t+k*2;
        const sine=Math.sin(ph*2+motion*.15);
        let v;
        if(mode==="sub") v=Math.sin(ph+motion*.1)*(1-amount*.25)+Math.sin(ph*2)*amount*.25;
        else if(mode==="morph") v=sine*(1-amount)+(1-2*((p*2+k*.1+t*.03)%1))*amount;
        else v=Math.sin(ph*2 + Math.sin(ph*(2+Math.round(k*3))+motion)*amount*5);
        const X=ox+p*ww, Y=oy-v*h*(.06+amount*.025);
        i ? x.lineTo(X,Y) : x.moveTo(X,Y);
      }
      x.strokeStyle=j%4===0 ? `rgba(195,164,255,${.2+k*.7})` : `rgba(112,219,255,${.12+k*.7})`;
      x.lineWidth=j===layers-1?2:1;
      x.shadowColor=j===layers-1?"#84dcff":"transparent"; x.shadowBlur=j===layers-1?12:0;
      x.stroke();
    }
    x.shadowBlur=0;
  }
  function animate(now) {
    if (!reduced) requestAnimationFrame(animate);
    if(now-last<40) return;
    last=now; t+=.018; draw();
  }
  new ResizeObserver(size).observe(c); size();
  if(!reduced) requestAnimationFrame(animate);

  const buy = $("#buyBtn"), label = $("#buyLabel"), fine = $("#buyFine");
  if (CONFIG.gumroadUrl) {
    buy.href = CONFIG.gumroadUrl;          // gumroad.js turns this link into an on-page checkout overlay
    label.textContent = "Get it free / name your price";
  } else {
    buy.removeAttribute("href"); buy.setAttribute("aria-disabled", "true");
    fine.textContent = "The WaveTable Generator drops here soon. Follow on SoundCloud to catch it.";
  }
})();

/* ---------- booking ---------- */
(() => { const b = $("#bookingBtn"); if (CONFIG.bookingEmail) b.href = "mailto:" + CONFIG.bookingEmail; else b.hidden = true; })();

/* ---------- marquee: repeat the phrase set until it covers any screen width ---------- */
(() => {
  const track = $(".marquee-track"); if (!track) return;
  const unit = track.innerHTML.split("<span>DYLUX</span>").filter(s => s.trim()).slice(0, 1).map(s => "<span>DYLUX</span>" + s)[0];
  function fill() {
    track.innerHTML = unit; let n = 1;
    while (track.scrollWidth < innerWidth * 1.1 && n < 40) { track.innerHTML += unit; n++; }
    const set = track.innerHTML; track.innerHTML = set + set;          // two identical halves → seamless -50% loop
    track.style.animationDuration = (track.scrollWidth / 2 / 90) + "s"; // constant ~90px/s at any width
  }
  fill(); let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(fill, 200); });
})();

/* ---------- page background: slow, dark waveform terrain ---------- */
(() => {
  const c = $("#bg"); if (!c) return; const x = c.getContext("2d"); let w, h, last = 0, t = 0;
  function size() { w = c.width = innerWidth; h = c.height = innerHeight; }
  size(); addEventListener("resize", size);
  function draw(now) {
    requestAnimationFrame(draw);
    if (now - last < 50) return; last = now;                // ~20fps is plenty for ambience
    if (!reduced) t += .006;
    x.clearRect(0, 0, w, h);
    const rows = Math.max(26, Math.round(h / 34)), step = Math.max(6, w / 260);
    for (let r = 0; r < rows; r++) {
      const k = r / rows, base = h * .08 + k * h * .95;
      x.beginPath();
      for (let i = 0; i <= w + step; i += step) {
        const p = i / w, ridge = Math.exp(-((p - .5) ** 2) / .05);
        const y = base - ridge * (Math.sin(p * 18 + t * 2 + r * .6) * .5 + .5) * (18 + 40 * Math.sin(k * Math.PI)) * (1 + energy)
                  - Math.sin(p * 5 - t + r * .3) * 6;
        i ? x.lineTo(i, y) : x.moveTo(i, y);
      }
      x.strokeStyle = `rgba(255,255,255,${.025 + .035 * Math.sin(k * Math.PI)})`; x.lineWidth = 1; x.stroke();
    }
  }
  requestAnimationFrame(draw);
})();
