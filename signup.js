(function(){
const SK="alphaPlayer",SL="alphaSignups",g=i=>document.getElementById(i);
const nh=h=>String(h||"").trim().toLowerCase().replace(/^@+/,"");
window.alphaPlayer=()=>{try{return JSON.parse(localStorage.getItem(SK))}catch(e){return null}};
let CFG=null;const cfg=async()=>{if(CFG)return CFG;try{CFG=await (await fetch("data/config.json",{cache:"no-store"})).json()}catch(_){CFG={}}return CFG};
const POSTRE=/^https?:\/\/(www\.|mobile\.)?(x|twitter)\.com\/[A-Za-z0-9_]{1,15}\/status\/\d+/i;
function drawCard(cv,handle,link,cb){const x=cv.getContext("2d"),W=1200,H=675;cv.width=W;cv.height=H;
const bg=x.createLinearGradient(0,0,W,H);bg.addColorStop(0,"#060a17");bg.addColorStop(1,"#0d1330");x.fillStyle=bg;x.fillRect(0,0,W,H);
x.globalAlpha=.07;x.fillStyle="#2ad4ff";x.font="bold 520px monospace";x.fillText(">_",560,560);x.globalAlpha=1;
const gr=x.createLinearGradient(0,0,W,0);gr.addColorStop(0,"#2ad4ff");gr.addColorStop(1,"#8a5cff");x.fillStyle=gr;x.fillRect(0,0,W,10);x.fillRect(0,H-10,W,10);
const fin=()=>{x.fillStyle="#e8f0ff";x.font="bold 40px sans-serif";x.fillText("ALPHA TERMINAL",220,128);
x.fillStyle="#2ad4ff";x.font="bold 30px monospace";x.fillText(">_ player activated",220,170);
x.fillStyle=gr;x.font="bold 76px sans-serif";x.fillText("I'm playing for $HAT",80,330);x.fillText("on Alpha Terminal",80,420);
x.fillStyle="#e8f0ff";x.font="bold 48px monospace";x.fillText("@"+handle,80,510);
x.fillStyle="#9fb0d0";x.font="30px sans-serif";x.fillText(link?"Join: "+link:"Join: @HiAlphaTerminal on X",80,600);
x.textAlign="right";x.fillText("#AlphaTerminal #HAT",W-60,600);x.textAlign="left";cb&&cb()};
const im=new Image();im.onload=()=>{x.save();x.beginPath();x.arc(140,140,64,0,7);x.clip();x.drawImage(im,76,76,128,128);x.restore();x.strokeStyle="#2ad4ff";x.lineWidth=4;x.beginPath();x.arc(140,140,64,0,7);x.stroke();fin()};im.onerror=fin;im.src="assets/logo.jpg"}
window.alphaDrawCard=drawCard;
async function activate(p){const b=g("signup"),c=await cfg(),link=(c.siteUrl||"").trim();
let OPTS=[];try{OPTS=await (await fetch("data/joinposts.json",{cache:"no-store"})).json()}catch(_){}
const fill=t=>t.replace(/\{link\}/g,link).replace(/\s{2,}/g," ").trim();OPTS=OPTS.map(fill);
const text0="I'm playing for $HAT on Alpha Terminal >_ Earn Alpha Points with the daily quiz and NFT giveaways."+(link?" Join here: "+link:"")+" @HiAlphaTerminal #AlphaTerminal #HAT";
b.innerHTML=`<div class="panel jp"><p><b>Step 2 of 2 — Post on X to activate</b> (required, +50 Alpha Points). Registered as <b>@${p.handle}</b>. <a href="#" id="su-x">Not you?</a></p>
<canvas id="jp-cv" width="1200" height="675"></canvas>
<div class="row"><button class="btn" id="jp-dl" type="button">⬇ Download card</button><button class="btn" id="jp-sh" type="button">🔀 Shuffle</button></div>
<p class="meta">Pick a post (you can edit it):</p><div class="row" id="jp-chips"></div>
<textarea id="jp-tx" rows="3" style="width:100%;background:#0a0f1e;color:var(--txt);border:1px solid var(--line);border-radius:10px;padding:10px"></textarea>
<div class="row"><a class="btn" id="jp-post" target="_blank" rel="noopener" href="#">Post on X ↗</a></div>
<p class="meta">X can't attach images from a link: download the card first, then attach it to your post.</p>
<div class="row"><input id="jp-url" placeholder="Paste your post link (https://x.com/you/status/…)"><button class="btn" id="jp-ok" type="button">Activate ✔</button></div><p id="jp-m" class="meta"></p></div>`;
g("su-x").onclick=e=>{e.preventDefault();localStorage.removeItem(SK);location.reload()};
if(!OPTS.length)OPTS=[text0];const tx=g("jp-tx");
const pick=i=>{tx.value=OPTS[i];document.querySelectorAll("#jp-chips button").forEach((c,k)=>c.style.outline=k===i?"2px solid #2ad4ff":"")};
g("jp-chips").innerHTML=OPTS.map((t,i)=>`<button type="button" class="btn" style="font-size:12px;opacity:.9" data-i="${i}">${["Daily alpha","Brains > luck","No bots","Daily habit","Prove it"][i]||"Option "+(i+1)}</button>`).join("");
document.querySelectorAll("#jp-chips button").forEach(c=>c.onclick=()=>pick(+c.dataset.i));pick(0);
g("jp-sh").onclick=()=>{let i;do{i=Math.floor(Math.random()*OPTS.length)}while(OPTS.length>1&&OPTS[i]===tx.value);pick(i)};
g("jp-post").onclick=e=>{e.preventDefault();window.open("https://x.com/intent/post?text="+encodeURIComponent(tx.value.trim()||OPTS[0]),"_blank","noopener")};
const cv=g("jp-cv");drawCard(cv,p.handle,link);
g("jp-dl").onclick=()=>{const a=document.createElement("a");a.download="alpha-terminal-"+p.handle+".png";a.href=cv.toDataURL("image/png");a.click()};
g("jp-ok").onclick=async()=>{const m=g("jp-m"),u=g("jp-url").value.trim();if(!POSTRE.test(u)){m.textContent="Paste a valid x.com or twitter.com post link containing /status/.";return}
const ep=(c.signupEndpoint||"").trim(),rec={handle:p.handle,email:p.email,ts:p.ts,postUrl:u,activatedAt:new Date().toISOString()};
if(ep){m.textContent="Submitting…";try{const r=await fetch(ep,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(rec)});if(!r.ok)throw 0}catch(_){m.textContent="Couldn't submit right now. Please try again.";return}}
const L=JSON.parse(localStorage.getItem(SL)||"[]"),i=L.findIndex(r=>r.handle===p.handle);i>=0?Object.assign(L[i],rec):L.push(rec);localStorage.setItem(SL,JSON.stringify(L));
const np=Object.assign({},p,{postUrl:u,active:true,activatedAt:rec.activatedAt});localStorage.setItem(SK,JSON.stringify(np));
try{const s=JSON.parse(localStorage.getItem("alphaPoints"))||{};s.claimed=s.claimed||{};s.history=s.history||[];if(!s.claimed["join-post"]){s.claimed["join-post"]=Date.now();s.history.push({t:Date.now(),why:"Join post (pending verification)",pts:0});localStorage.setItem("alphaPoints",JSON.stringify(s))}}catch(_){}
done(np,"Activated — post submitted for verification.")}}
function done(p,msg){const b=g("signup");if(!b)return;const f=g("f");if(!p.active){if(f)f.hidden=true;activate(p);return}
b.innerHTML=`<div class="panel">✅ Active as <b>@${p.handle}</b>. ${msg||""} <a href="#" id="su-x">Not you?</a></div>`;
g("su-x").onclick=e=>{e.preventDefault();localStorage.removeItem(SK);location.reload()};
const xh=g("xh");if(xh){xh.value="@"+p.handle;xh.readOnly=true}if(f)f.hidden=false}
function form(){const b=g("signup");if(!b)return;const f=g("f");if(f)f.hidden=true;
b.innerHTML=`<form id="suf" class="panel joinf"><p><b>Step 1 of 2 — Join Alpha Points</b> — no password, no X login. Required to play the quiz.</p>
<input id="su-h" placeholder="X username (e.g. @you)" maxlength="16" required>
<input id="su-e" type="email" placeholder="Email" required>
<label class="meta"><input type="checkbox" id="su-c" required> I agree to the rules: one X account per person, at least 1,000 followers, account at least 3 months old, no bots or farming.</label>
<button class="btn" type="submit">Join ▶</button><p id="su-m" class="meta"></p>
<p class="meta">We only use your email for Alpha Terminal updates and $HAT eligibility. We will never ask for your seed phrase or private keys.</p></form>`;
g("suf").onsubmit=async e=>{e.preventDefault();const m=g("su-m"),handle=nh(g("su-h").value),email=g("su-e").value.trim().toLowerCase();
if(!/^[a-z0-9_]{1,15}$/.test(handle)){m.textContent="Enter a valid X username.";return}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){m.textContent="Enter a valid email.";return}
if(!g("su-c").checked){m.textContent="Please agree to the rules.";return}
const rec={handle,email,ts:new Date().toISOString()};let ep="";
try{ep=((await (await fetch("data/config.json",{cache:"no-store"})).json()).signupEndpoint||"").trim()}catch(_){}
let msg;if(ep){m.textContent="Submitting…";try{const r=await fetch(ep,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(rec)});if(!r.ok)throw 0;msg="Registration received."}catch(_){m.textContent="Couldn't submit right now. Please try again.";return}}
else{const L=JSON.parse(localStorage.getItem(SL)||"[]");L.push(rec);localStorage.setItem(SL,JSON.stringify(L));msg="Registered on this device; official registration opens soon."}
localStorage.setItem(SK,JSON.stringify({handle,email,ts:rec.ts}));done({handle,email,ts:rec.ts},msg)}}
const p=window.alphaPlayer();p&&p.handle?done(p):form();
})();
