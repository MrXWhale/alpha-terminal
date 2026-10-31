const CAT={airdrop:"Airdrop",testnet:"Testnet",points:"Points",kaito:"Kaito / Yapper",quest:"Quest"},ORD={live:0,upcoming:1,ended:2};let D=[];const $=i=>document.getElementById(i);
const esc=s=>String(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
fetch("data/airdrops.json").then(r=>r.json()).then(d=>{D=d;[...new Set(d.map(x=>x.chain).filter(Boolean))].sort().forEach(c=>$("chain").add(new Option(c,c)));render()});
function render(){const q=$("q").value.toLowerCase(),c=$("cat").value,ch=$("chain").value,s=$("status").value,so=$("sort").value;
let r=D.filter(x=>(!q||JSON.stringify(x).toLowerCase().includes(q))&&(!c||x.category==c)&&(!ch||x.chain==ch)&&(!s||x.status==s));
r.sort((a,b)=>(!!b.featured-!!a.featured)||(so=="name"?a.name.localeCompare(b.name):so=="deadline"?(a.deadline||"9999").localeCompare(b.deadline||"9999"):(ORD[a.status]-ORD[b.status])));
$("count").textContent=r.length+" listing"+(r.length==1?"":"s");
$("grid").innerHTML=r.map(x=>`<article class="card${x.featured?" featured":""}"><div class="badges">${x.featured?'<span class="b feat">★ Featured</span>':""}<span class="b ${x.status}">${x.status}</span><span class="b">${CAT[x.category]||x.category}</span>${x.chain?`<span class="b">${esc(x.chain)}</span>`:""}</div>
<h3>${esc(x.name)}</h3><p class="meta">Effort: ${esc(x.effort)||"?"} · Deadline: ${esc(x.deadline)||"TBA"}</p><p class="meta">${esc(x.summary)}</p>
${x.reward?`<div class="reward">🎁 ${esc(x.reward)}</div>`:""}<ol>${x.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol>
<div class="links">${x.referralUrl?`<a class="btn" href="${esc(x.referralUrl)}" target="_blank" rel="noopener sponsored">Join / Sign up ↗</a>${x.referralCode?`<button class="btn2" type="button" onclick="navigator.clipboard.writeText(this.dataset.c);this.textContent='Copied ✔'" data-c="${esc(x.referralCode)}">Copy code: ${esc(x.referralCode)}</button>`:""}${x.url?`<a class="src" href="${esc(x.url)}" target="_blank" rel="noopener">official</a>`:""}`:(x.url?`<a class="btn" href="${esc(x.url)}" target="_blank" rel="noopener">Official link ↗</a>`:"")}<a class="src" href="${esc(x.source)}" target="_blank" rel="noopener">source</a></div></article>`).join("")||"<p>No matches.</p>"}
["q","cat","chain","status","sort"].forEach(i=>$(i).addEventListener("input",render));
