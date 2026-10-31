(()=>{const d=document;d.body.insertAdjacentHTML('afterbegin','<div class="bgfx" aria-hidden="true"></div>');
const h=d.querySelector('header'),n=d.querySelector('.nav');
if(h&&n){const b=d.createElement('button');b.className='menubtn';b.setAttribute('aria-label','Menu');b.setAttribute('aria-expanded','false');b.textContent='☰';h.insertBefore(b,n);b.onclick=()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'✕':'☰'}}
const f=d.querySelector('footer');if(f){f.innerHTML='<div class="fwrap"><div><div class="fb2"><img src="assets/logo.jpg" alt="">Alpha Terminal <span class="prompt">&gt;_</span></div><div>'+f.innerHTML+'</div></div><div><b style="color:var(--txt)">Not financial advice.</b><br>DYOR · Never share your seed phrase<br>Planned rewards may change.</div></div>'}
// hero on index
const hero=d.querySelector('header .hero');if(hero){const s=d.createElement('section');s.className='heroBlock';s.innerHTML='<img src="assets/banner.jpg" alt="Alpha Terminal banner"><div class="hx"><h1>Find the <span class="gtxt">alpha</span><br>before the crowd.</h1><div class="typing" aria-label="Live airdrops, testnets, points and creator campaigns, hand-picked"><span class="prompt">&gt;_</span> <span class="tt"></span><span class="cur"></span></div><div class="heroCta"><a class="btn" href="#grid">Browse airdrops</a><a class="btn2" href="quiz.html">Play Quiz Battle</a><a class="btn2" href="points.html">Earn Alpha Points</a></div></div>';h.after(s);
const st=d.createElement('section');st.className='stats';st.innerHTML='<div class="stat"><b id="sAll">–</b><span>Listed projects</span></div><div class="stat"><b id="sLive">–</b><span>Live now</span></div><div class="stat"><b id="sUp">–</b><span>Upcoming launches</span></div><div class="stat"><b id="sCh">–</b><span>Chains</span></div>';s.after(st);
const sh=d.createElement('div');sh.className='shead';sh.innerHTML='<span class="k">// 01</span><h2>Live airdrops &amp; campaigns</h2>';d.querySelector('.controls').before(sh);
const msgs=['live airdrops, testnets & points','Kaito creator campaigns','hand-picked. no fluff. DYOR.'];let m=0,i=0,del=false;const tt=s.querySelector('.tt');
(function tick(){const w=msgs[m];tt.textContent=w.slice(0,i);if(!del&&i<w.length)i++;else if(!del){del=true;return setTimeout(tick,1600)}else if(i>0)i--;else{del=false;m=(m+1)%msgs.length}setTimeout(tick,del?28:55)})();
const cnt=(el,v)=>{let c=0;const t=setInterval(()=>{c=Math.min(v,c+Math.ceil(v/20));el.textContent=c;if(c>=v)clearInterval(t)},35)};
fetch('data/airdrops.json').then(r=>r.json()).then(a=>{cnt(d.getElementById('sAll'),a.length);cnt(d.getElementById('sLive'),a.filter(x=>x.status==='live').length);cnt(d.getElementById('sCh'),new Set(a.map(x=>x.chain).filter(Boolean)).size)}).catch(()=>{});
fetch('data/upcoming.json').then(r=>r.json()).then(u=>cnt(d.getElementById('sUp'),(u.tokens||[]).length+(u.nfts||[]).length)).catch(()=>{})}
// reveal
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08}):null;
const mark=()=>d.querySelectorAll('.card:not(.reveal),.panel:not(.reveal),.stat:not(.reveal)').forEach(e=>{if(!io)return;e.classList.add('reveal');io.observe(e)});mark();
new MutationObserver(mark).observe(d.body,{childList:true,subtree:true});})();
