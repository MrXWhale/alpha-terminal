(()=>{const d=document,P=(location.pathname.split('/').pop()||'index.html').replace('.html','')||'index';
const el=(t,c,h)=>{const e=d.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
d.body.classList.add('pg-'+P);
d.querySelectorAll('.nav a').forEach(a=>{const on=(a.getAttribute('href')||'').replace('.html','')===P;a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
// toast
const tw=el('div','toasts');tw.setAttribute('role','status');tw.setAttribute('aria-live','polite');d.body.append(tw);
window.toast=(m,k)=>{const t=el('div','toast '+(k||'ok'),(k==='err'?'⚠️ ':'✔ ')+esc(m));tw.append(t);setTimeout(()=>t.classList.add('out'),2600);setTimeout(()=>t.remove(),3000)};
d.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(b&&!/toast/.test(b.getAttribute('onclick')||''))toast('Copied to clipboard')});
const NOTE='⚠️ No $HAT token or Alpha Terminal NFTs are live yet. Any token, contract or mint link you see is fake. Only trust official updates from <a href="https://x.com/HiAlphaTerminal" target="_blank" rel="noopener">@HiAlphaTerminal</a>.';
if(!sessionStorage.getItem('atNoteX')){const nb=el('div','notebar','<span>'+NOTE+'</span><button aria-label="Dismiss notice">✕</button>');nb.setAttribute('role','alert');d.body.prepend(nb);nb.querySelector('button').onclick=()=>{nb.remove();sessionStorage.setItem('atNoteX','1')}}
const ft=d.querySelector('footer');if(ft)ft.insertAdjacentHTML('beforeend','<p class="fnote">'+NOTE+'</p>');
if(['points','giveaway','roadmap'].includes(P)){const t=d.querySelector('.phead')||d.querySelector('h1');t&&t.after(el('div','safe',NOTE))}
if(P==='upcoming'){const ob=new MutationObserver(()=>{d.querySelectorAll('#sec .card').forEach(c=>{if(/\$HAT/.test(c.querySelector('h3')?.textContent||'')&&!c.querySelector('.safe'))c.querySelector('h3').after(el('div','safe',NOTE))})});ob.observe(d.getElementById('sec'),{childList:true})}
// back to top
const bt=el('button','totop','↑');bt.setAttribute('aria-label','Back to top');bt.onclick=()=>scrollTo({top:0,behavior:'smooth'});d.body.append(bt);
addEventListener('scroll',()=>bt.classList.toggle('show',scrollY>600),{passive:true});
// page header + breadcrumbs
const NM={quiz:'Quiz Battle',sponsor:'Sponsor a Round',giveaway:'NFT Giveaway',points:'Alpha Points',roadmap:'Roadmap',upcoming:'Upcoming',news:'News',quests:'Quests','404':'Not found'};
const SUB={quiz:'Game',sponsor:'Partners',giveaway:'Community',points:'Rewards',roadmap:'Project',upcoming:'Launches',news:'Updates',quests:'Earn'};
const h1=d.querySelector('h1.ptitle');
if(h1&&P!=='index'){const ph=el('section','phead');ph.innerHTML=`<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span aria-current="page">${NM[P]||P}</span></nav><span class="kick">${SUB[P]||''}</span>`;h1.before(ph);ph.append(h1);let n=ph.nextElementSibling;if(n&&n.classList.contains('tag'))ph.append(n)}
// skeletons
const sk=n=>Array.from({length:n},()=>'<div class="skel"><i></i><i></i><i></i></div>').join('');
['grid','tasks','earn','sec','list','tl'].forEach(i=>{const g=d.getElementById(i);if(g&&!g.children.length)g.innerHTML=sk(i==='tl'?3:6)});
const sec=(cls,html,after)=>{const s=el('section',cls,html);after.after(s);return s};
// ---------- INDEX
if(P==='index'){const g=d.getElementById('grid');
let a=sec('blk how','<div class="shead"><span class="k">// 02</span><h2>How it works</h2></div><div class="steps3"><div class="st3"><b>1</b><h3>Discover</h3><p class="meta">Browse hand-picked airdrops, testnets and creator campaigns with steps and official links.</p></div><div class="st3"><b>2</b><h3>Complete</h3><p class="meta">Follow the steps on each official project site. Use a separate wallet and DYOR.</p></div><div class="st3"><b>3</b><h3>Earn</h3><p class="meta">Play Quiz Battle and do tasks to collect free Alpha Points, planned to convert to $HAT.</p></div></div>',g);
const car=sec('blk feat','<div class="shead"><span class="k">// 03</span><h2>Featured</h2><div class="carnav"><button class="btn2 sm" data-dir="-1" aria-label="Previous">←</button><button class="btn2 sm" data-dir="1" aria-label="Next">→</button></div></div><div class="carousel" id="car">'+sk(3)+'</div>',a);
Promise.all([fetch('data/airdrops.json').then(r=>r.json()).catch(()=>[]),fetch('data/upcoming.json').then(r=>r.json()).catch(()=>({}))]).then(([A,U])=>{const it=[...A.filter(x=>x.featured||x.status==='live').slice(0,6).map(x=>({n:x.name,t:x.chain||'',s:x.status,u:'#grid',k:'Airdrop'})),...[...(U.tokens||[]),...(U.nfts||[])].slice(0,6).map(x=>({n:x.name,t:x.chain||x.type||'',s:x.status||'upcoming',u:'upcoming.html',k:'Upcoming'}))];
d.getElementById('car').innerHTML=it.map(x=>`<a class="slide" href="${x.u}"><span class="kick">${x.k}</span><h3>${esc(x.n)}</h3><p class="meta">${esc(x.t)}</p><span class="b ${esc(x.s)}">${esc(x.s)}</span></a>`).join('')||'<p class="meta">Nothing featured yet.</p>'});
car.querySelectorAll('[data-dir]').forEach(b=>b.onclick=()=>{const c=d.getElementById('car');c.scrollBy({left:b.dataset.dir*c.clientWidth*.8,behavior:'smooth'})});
const F=[['Is Alpha Terminal free?','Yes. Browsing, Quiz Battle, tasks and giveaways are free. We never ask for payments, seed phrases or private keys.'],['What are Alpha Points?','Free points you earn from the quiz and community tasks. They have no cash value today and are planned to convert to $HAT; details will be announced by @HiAlphaTerminal and may change.'],['Are these airdrops guaranteed?','No. Listings are hand-picked from official sources, but rewards are decided by each project. Always DYOR.'],['Do I need to connect a wallet here?','No. Alpha Terminal never asks you to connect a wallet. You only interact with each project on its own official site.'],['Are some links referral links?','Some are. Alpha Terminal may earn from sign-ups at no extra cost to you.'],['How can my project get listed or sponsor a round?','DM @HiAlphaTerminal on X. See the Sponsor page for options.']];
a=sec('blk faq','<div class="shead"><span class="k">// 04</span><h2>FAQ</h2></div>'+F.map(([q,x])=>`<details class="fq"><summary>${q}</summary><p class="meta">${x}</p></details>`).join(''),car);
sec('ctab','<div><h2>Ready to find the next alpha?</h2><p class="meta">Follow @HiAlphaTerminal for new listings, quiz rounds and giveaways.</p></div><div class="links"><a class="btn" href="https://x.com/HiAlphaTerminal" target="_blank" rel="noopener">Follow on X ↗</a><a class="btn2" href="points.html">Join Alpha Points</a></div>',a)}
// ---------- SPONSOR
if(P==='sponsor'){const c=d.querySelector('.cta');
const w=el('section','blk','<h2>Why sponsor</h2><div class="grid"><div class="card"><h3>🎯 Real learning</h3><p class="meta">Players answer questions about your project, so they remember what you build.</p></div><div class="card"><h3>🛡️ Brand-safe</h3><p class="meta">Free to play: no entry fees, no wagering, no wallet connection.</p></div><div class="card"><h3>✅ Verified winners</h3><p class="meta">Top 3 are checked by the team and announced publicly on X.</p></div><div class="card"><h3>🤝 Flexible</h3><p class="meta">Questions, prize and dates are agreed with your team.</p></div></div>');
const t=el('section','blk','<h2>Packages</h2><div class="tiers"><div class="tier"><span class="kick">Starter</span><h3>Quiz Round</h3><ul><li>Branded quiz round</li><li>Your prize pool for top 3</li><li>Winner announcement on X</li></ul><a class="btn2" href="https://x.com/messages/compose" target="_blank" rel="noopener">DM for packages</a></div><div class="tier hot"><span class="kick">Most complete</span><h3>Round + Featured</h3><ul><li>Everything in Quiz Round</li><li>Featured pin on the airdrop board</li><li>Announcement &amp; reminder posts</li></ul><a class="btn" href="https://x.com/messages/compose" target="_blank" rel="noopener">DM for packages</a></div><div class="tier"><span class="kick">Custom</span><h3>Campaign</h3><ul><li>Multi-round or season campaigns</li><li>NFT giveaway collab</li><li>Tailored to your goals</li></ul><a class="btn2" href="https://x.com/messages/compose" target="_blank" rel="noopener">DM for packages</a></div></div><p class="meta" style="text-align:center;margin-top:10px">Pricing on request. DM @HiAlphaTerminal.</p>');
c.before(w);c.before(t);c.classList.add('ctab')}
// ---------- GIVEAWAY
if(P==='giveaway'){const g=d.querySelector('.grid');const s=el('div','gsteps3','<div class="st3"><b>1</b><h3>Follow</h3><p class="meta">Follow @HiAlphaTerminal on X.</p></div><div class="st3"><b>2</b><h3>Enter</h3><p class="meta">Complete the steps on the giveaway post.</p></div><div class="st3"><b>3</b><h3>Win</h3><p class="meta">Winners are announced only by @HiAlphaTerminal.</p></div>');g.before(s);
const cd=d.getElementById('gcd');if(cd){const bx=el('div','cdbox');cd.closest('p').after(bx);const up=()=>{const t=cd.textContent,m=t.match(/(\d+)d (\d+)h (\d+)m (\d+)s/);bx.innerHTML=m?['Days','Hrs','Min','Sec'].map((l,i)=>`<div><b>${String(m[i+1]).padStart(2,'0')}</b><span>${l}</span></div>`).join(''):`<div class="tba"><b>${esc(t)}</b><span>${t==='TBA'?'Date to be announced':''}</span></div>`};up();new MutationObserver(up).observe(cd,{childList:true,characterData:true,subtree:true})}}
// ---------- POINTS
if(P==='points'){const tot=d.getElementById('total');const L=[['Rookie',0],['Explorer',100],['Hunter',500],['Alpha',1500],['Legend',5000]];
const box=el('div','lvl');tot.closest('.panel').prepend(box);
const up=()=>{const v=+tot.textContent||0;let k=0;L.forEach((l,i)=>{if(v>=l[1])k=i});const nx=L[k+1];const pc=nx?Math.min(100,(v-L[k][1])/(nx[1]-L[k][1])*100):100;
box.innerHTML=`<div class="tiers5">${L.map((l,i)=>`<div class="t5${i<=k?' on':''}"><b>${l[0]}</b><span>${l[1]}+</span></div>`).join('')}</div><div class="bar"><i style="width:${pc}%"></i></div><p class="meta">Level: <b>${L[k][0]}</b>${nx?` · ${nx[1]-v} to ${nx[0]}`:' · max level'} <small>(cosmetic, this device only)</small></p>`};up();new MutationObserver(up).observe(tot,{childList:true,characterData:true,subtree:true})}
// ---------- QUIZ
if(P==='quiz'){const st=d.getElementById('start');st.insertAdjacentHTML('afterbegin','<div class="lobby"><div><span class="kick">Lobby</span><h2>Ready, player?</h2><p class="meta">10 questions · 15s each · speed bonus</p></div><div class="lstats"><div><b>10</b><span>Questions</span></div><div><b>15s</b><span>Per question</span></div><div><b>150</b><span>Max / Q</span></div></div></div>');
const tm=d.getElementById('timer');const ring=el('span','ring','<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17"/><circle class="fg" cx="20" cy="20" r="17"/></svg>');tm.before(ring);const fg=ring.querySelector('.fg');
new MutationObserver(()=>{const v=parseFloat(tm.textContent)||0;fg.style.strokeDashoffset=106.8*(1-v/15);ring.classList.toggle('low',v<5)}).observe(tm,{childList:true,characterData:true,subtree:true});
const dn=d.getElementById('done');new MutationObserver(()=>{if(!dn.hidden){dn.classList.remove('pop');void dn.offsetWidth;dn.classList.add('pop')}}).observe(dn,{attributes:true,attributeFilter:['hidden']})}
// ---------- NEWS
if(P==='news'){const l=d.getElementById('list');l&&l.classList.add('feed')}
})();
