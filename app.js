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

let mx = innerWidth / 2, my = innerHeight / 2;
addEventListener("pointermove", e => { mx=e.clientX; my=e.clientY; }, {passive:true});

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

/* ---------- SoundCloud transport and generative orbital sculpture ---------- */
(() => {
  const canvas=$("#deckScope"),ctx=canvas.getContext("2d");
  let width=1,height=1,phase=0,last=0,duration=0,currentId=null;
  const time=ms=>{const s=Math.floor((ms||0)/1000);return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");};
  function size(){const d=Math.min(devicePixelRatio||1,2);width=canvas.clientWidth;height=canvas.clientHeight;canvas.width=width*d;canvas.height=height*d;ctx.setTransform(d,0,0,d,0,0);draw();}
  function draw(){
    ctx.clearRect(0,0,width,height);
    const radius=Math.min(width*.34,height*.39),cx=width*.5,cy=height*.49;
    for(let ring=0;ring<48;ring++){
      const latitude=(ring/47-.5)*Math.PI;
      ctx.beginPath();
      for(let i=0;i<=150;i++){
        const u=i/150*Math.PI*2;
        const ripple=1+.13*Math.sin(u*3+latitude*4+phase)+.06*Math.cos(u*7-phase);
        let X=Math.cos(u)*Math.cos(latitude)*radius*ripple;
        let Y=Math.sin(latitude)*radius;
        let Z=Math.sin(u)*Math.cos(latitude)*radius*ripple;
        const turn=phase*.13+.5, xx=X*Math.cos(turn)+Z*Math.sin(turn),zz=-X*Math.sin(turn)+Z*Math.cos(turn);
        const yy=Y*.83-zz*.55,depth=1+zz/(radius*5);
        const px=cx+(xx*.92+yy*.24)*depth,py=cy+yy*depth;
        i?ctx.lineTo(px,py):ctx.moveTo(px,py);
      }
      ctx.strokeStyle=ring%5===0?"rgba(218,255,126,.78)":"rgba(182,159,248,.35)";
      ctx.lineWidth=ring%5===0?1.2:.65;ctx.stroke();
    }
    ctx.fillStyle="#d8ff7e";ctx.beginPath();ctx.arc(cx+radius*1.13*Math.cos(phase*.35),cy+radius*.75*Math.sin(phase*.35),3,0,Math.PI*2);ctx.fill();
  }
  function animate(now){requestAnimationFrame(animate);if(document.hidden||now-last<40)return;last=now;if(!reduced)phase+=playing?.035:.008;draw();}
  new ResizeObserver(size).observe(canvas);size();if(!reduced)requestAnimationFrame(animate);
  $("#scFollow").href=CONFIG.soundcloud;
  $("#scFrame").innerHTML='<iframe id="sc" allow="autoplay" scrolling="no" title="DYLUX on SoundCloud" src="https://w.soundcloud.com/player/?url='+encodeURIComponent(CONFIG.soundcloud)+'&color=%237a63b5&auto_play=false&hide_related=true&show_comments=false&show_artwork=true&visual=false"></iframe>';
  let attempts=0;
  function wire(){
    if(!window.SC?.Widget){if(++attempts<40)setTimeout(wire,300);else $("#deckStatus").textContent="LISTEN ON SOUNDCLOUD ↗";return;}
    const wd=SC.Widget($("#sc"));
    function set(on){playing=on;$(".deck").classList.toggle("is-playing",on);$("#led").classList.toggle("on",on);$("#deckStatus").textContent=on?"NOW PLAYING":"READY TO PLAY";$("#scopeState").textContent=on?"IN MOTION":"STANDBY";$("#playTrack").textContent=on?"Ⅱ":"▶";$("#playTrack").setAttribute("aria-label",on?"Pause":"Play");}
    function update(){wd.getCurrentSound(sound=>{
      if(!sound)return;
      if(currentId!==sound.id){currentId=sound.id;$("#trackSeek").value=0;$("#elapsed").textContent="0:00";}
      duration=sound.duration||0;$("#duration").textContent=time(duration);
      $("#nowPlaying").textContent=sound.title||"DYLUX";
      $("#trackLink").href=sound.permalink_url||CONFIG.soundcloud;
      const art=$("#trackArtwork");art.src=(sound.artwork_url||sound.user?.avatar_url||"assets/dylux-logo.png").replace("-large.","-t500x500.");art.alt=(sound.title||"DYLUX")+" artwork";
      const tags=parseSoundCloudTags(sound.tag_list);if(!tags.length&&sound.genre)tags.push(sound.genre);
      $("#trackTags").replaceChildren(...tags.map(tag=>{const el=document.createElement("span");el.className="track-tag";el.textContent=tag;return el;}));
      $$("#trackList button").forEach(el=>{const active=el.dataset.id===String(sound.id);el.classList.toggle("active",active);el.setAttribute("aria-current",String(active));});
    });}
    wd.bind(SC.Widget.Events.READY,()=>{
      set(false);update();wd.setVolume(80);
      ["playTrack","prevTrack","nextTrack","trackSeek"].forEach(id=>$("#"+id).disabled=false);
      wd.getSounds(sounds=>{
        $("#trackList").replaceChildren(...sounds.map((sound,index)=>{
          const btn=document.createElement("button");btn.type="button";btn.dataset.id=String(sound.id);
          const number=document.createElement("span");number.className="track-number mono";number.textContent=String(index+1).padStart(2,"0");
          const title=document.createElement("span");title.textContent=sound.title||"DYLUX";
          const length=document.createElement("span");length.className="mono";length.textContent=time(sound.duration);
          btn.append(number,title,length);btn.addEventListener("click",()=>{wd.skip(index);wd.play();});return btn;
        }));update();
      });
    });
    $("#playTrack").addEventListener("click",()=>wd.toggle());
    $("#prevTrack").addEventListener("click",()=>{wd.prev();wd.play();});
    $("#nextTrack").addEventListener("click",()=>{wd.next();wd.play();});
    $("#trackSeek").addEventListener("input",e=>{wd.seekTo(Number(e.target.value)/1000*duration);});
    $("#trackVolume").addEventListener("input",e=>wd.setVolume(Number(e.target.value)));
    wd.bind(SC.Widget.Events.PLAY,()=>{update();set(true);});
    wd.bind(SC.Widget.Events.PAUSE,()=>set(false));
    wd.bind(SC.Widget.Events.FINISH,()=>set(false));
    wd.bind(SC.Widget.Events.PLAY_PROGRESS,data=>{$("#trackSeek").value=Math.round((data.relativePosition||0)*1000);$("#elapsed").textContent=time(data.currentPosition);});
    wd.bind(SC.Widget.Events.SEEK,data=>{$("#trackSeek").value=Math.round((data.relativePosition||0)*1000);$("#elapsed").textContent=time(data.currentPosition);});
    wd.bind(SC.Widget.Events.ERROR,()=>{set(false);$("#deckStatus").textContent="PLAYBACK UNAVAILABLE — OPEN SOUNDCLOUD";$(".native-player").open=true;});
  }
  wire();
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
    const rows=38,cols=90,points=[];
    for(let row=0;row<rows;row++){
      const z=row/(rows-1),line=[];
      for(let col=0;col<=cols;col++){
        const u=col/cols,ph=u*Math.PI*4,shift=z*2+t*.3;
        let v;
        if(mode==="sub")v=Math.sin(ph*.5+shift)*(1-amount*.3)+Math.sin(ph)*amount*.3;
        else if(mode==="morph")v=Math.sin(ph+shift)*(1-amount)+Math.tanh(Math.sin(ph+shift)*8)*amount;
        else v=Math.sin(ph+Math.sin(ph*2+shift)*amount*4);
        const envelope=Math.sin(u*Math.PI)*Math.sin(z*Math.PI);
        line.push([w*.12+u*w*.7+z*w*.15,h*.25+z*h*.58-v*envelope*h*(.12+amount*.1)-u*h*.16]);
      }points.push(line);
    }
    for(let row=0;row<rows;row++){
      const z=row/(rows-1);x.beginPath();
      points[row].forEach(([px,py],i)=>i?x.lineTo(px,py):x.moveTo(px,py));
      x.strokeStyle=row%6===0?"rgba(217,255,135,.95)":"rgba(186,166,238,"+(.15+z*.6)+")";x.lineWidth=row%6===0?1.5:.8;x.stroke();
    }
    for(let col=0;col<=cols;col+=4){
      x.beginPath();points.forEach((line,i)=>i?x.lineTo(...line[col]):x.moveTo(...line[col]));
      x.strokeStyle="rgba(186,166,238,.19)";x.lineWidth=.6;x.stroke();
    }
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
