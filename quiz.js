const $=i=>document.getElementById(i),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const N=10,T=15,LB="alphaQuizLB";let BANK=[],qs=[],i=0,score=0,correct=0,left=T,tick,player={},roundName="Round 1";
let MULT=1;fetch("data/round.json").then(r=>r.json()).then(r=>{roundName=r.name||roundName;if(r.sponsor)MULT=2;$("round").innerHTML=`${r.sponsorLogo?`<img src="${esc(r.sponsorLogo)}" alt="">`:""}<b>🏆 Current round: ${esc(roundName)}</b>${r.sponsor?`<span>Sponsored by ${esc(r.sponsor)}</span>`:""}<span>Prize: ${esc(r.prize||"TBA")}</span><span class="meta">Ends: ${esc(r.endDate||"TBA")}</span>`}).catch(()=>{$("round").textContent="Round 1 — prize TBA"});
fetch("data/quiz.json").then(r=>r.json()).then(d=>BANK=d);
const shuf=a=>{a=[...a];for(let k=a.length-1;k>0;k--){const j=Math.random()*(k+1)|0;[a[k],a[j]]=[a[j],a[k]]}return a};
const PK="alphaQuizPlays",istDay=()=>new Date(Date.now()+19800000).toISOString().slice(0,10),normH=h=>h.trim().toLowerCase().replace(/^@+/,"");
function plays(){try{return JSON.parse(localStorage.getItem(PK))||{}}catch(e){return{}}}
let cdT;function blocked(h){clearInterval(cdT);const m=$("blk");m.hidden=false;const f=()=>{const ms=86400000-((Date.now()+19800000)%86400000),s=ms/1000|0;m.innerHTML=`⏳ <b>@${esc(h)}</b> has already played today. Come back tomorrow! Next game unlocks at midnight IST in <b>${String(s/3600|0).padStart(2,"0")}:${String(s%3600/60|0).padStart(2,"0")}:${String(s%60).padStart(2,"0")}</b>.`};f();cdT=setInterval(f,1000)}
$("f").onsubmit=e=>{e.preventDefault();{const ap=window.alphaPlayer&&window.alphaPlayer();if(!ap||!ap.active){alert("Sign up and post on X to activate first.");return}}const hn=normH($("xh").value);if(!/^[a-z0-9_]{1,15}$/.test(hn)){alert("Enter a valid X handle");return}
const P=plays();if(P[hn]===istDay()){blocked(hn);return}$("blk").hidden=true;P[hn]=istDay();localStorage.setItem(PK,JSON.stringify(P));let h="@"+hn;player={nick:$("nick").value.trim(),x:h};
qs=shuf(BANK).slice(0,N).map(q=>{const o=shuf(q.options.map((t,k)=>({t,ok:k==q.answer})));return{q:q.q,o}});i=score=correct=0;$("start").hidden=true;$("done").hidden=true;$("play").hidden=false;show()};
function show(){const q=qs[i];$("qn").textContent=`Question ${i+1}/${N}`;$("qt").textContent=q.q;$("opts").innerHTML="";q.o.forEach(o=>{const b=document.createElement("button");b.textContent=o.t;b.onclick=()=>pick(b,o.ok);$("opts").append(b)});left=T;upd();clearInterval(tick);tick=setInterval(()=>{left-=.1;upd();if(left<=0)pick(null,false)},100)}
function upd(){$("timer").textContent=Math.max(0,left).toFixed(1)+"s";$("barf").style.width=Math.max(0,left/T*100)+"%"}
function pick(b,ok){clearInterval(tick);const bs=[...$("opts").children];bs.forEach((x,k)=>{x.disabled=true;if(qs[i].o[k].ok)x.classList.add("ok")});if(b&&!ok)b.classList.add("bad");
if(ok){correct++;score+=100+Math.round(50*Math.max(0,left)/T)}setTimeout(()=>{i++;i<N?show():finish()},900)}
function finish(){$("play").hidden=true;$("done").hidden=false;$("score").textContent=score;$("sum").textContent=`${correct}/${N} correct · ${player.nick} (${player.x}) · ${roundName}`;
const ap=awardAP(score);$("ap").textContent=`+${ap} Alpha Points`;const txt=`I scored ${score} pts (${correct}/${N}) and earned +${ap} Alpha Points in Alpha Quiz Battle ${roundName}! 🧠⚡ Free to play — can you beat me? #AlphaQuizBattle @HiAlphaTerminal`;
$("share").href="https://x.com/intent/post?text="+encodeURIComponent(txt)+"&url="+encodeURIComponent(location.href.split("#")[0]);
const l=load();l.push({...player,score,correct,t:Date.now()});localStorage.setItem(LB,JSON.stringify(l));lb()}
const load=()=>{try{return JSON.parse(localStorage.getItem(LB))||[]}catch{return[]}};
function lb(){const l=load().sort((a,b)=>b.score-a.score||a.t-b.t).slice(0,10);$("lb").innerHTML=l.map((e,k)=>`<li class="${k<3?"w":""}">${k<3?["🥇","🥈","🥉"][k]+" ":""}${esc(e.nick)} <span class="meta">${esc(e.x)}</span> — ${e.score}${k<3?" · Winner spot":""}</li>`).join("")||"<li class='meta'>No scores yet. Be first!</li>"}
$("again").onclick=()=>{$("done").hidden=true;$("start").hidden=false};$("clr").onclick=()=>{localStorage.removeItem(LB);lb()};lb();

function awardAP(score){const K="alphaPoints",d=new Date().toISOString().slice(0,10);let s;try{s=JSON.parse(localStorage.getItem(K))||{}}catch(e){s={}}s.total=s.total||0;s.history=s.history||[];s.claimed=s.claimed||{};
let p=Math.floor(score/10)*MULT;s.history.push({t:Date.now(),why:"Quiz score "+score+(MULT>1?" (sponsored round 2x)":""),pts:p});s.total+=p;localStorage.setItem(K,JSON.stringify(s));return p}
