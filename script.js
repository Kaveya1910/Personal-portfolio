const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
// typing effect
const words=["Full Stack Developer","React.js Developer","Node.js Developer","Frontend Enthusiast"];
let w=0,i=0,del=false;
(function type(){
  const t=$("#typed"),word=words[w];
  t.textContent=word.slice(0,del?--i:++i);
  let d=del?45:90;
  if(!del&&i===word.length){del=true;d=1400}
  else if(del&&i===0){del=false;w=(w+1)%words.length;d=350}
  setTimeout(type,d);
})();
// scroll reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add("in");
  e.target.querySelectorAll("[data-n]").forEach(el=>{
    const n=+el.dataset.n;let c=0;const step=Math.max(1,Math.ceil(n/50));
    const iv=setInterval(()=>{c=Math.min(n,c+step);el.textContent=c;if(c===n)clearInterval(iv)},30);
  });
  io.unobserve(e.target);
}),{threshold:.15});
$$(".reveal").forEach((el,k)=>{el.style.transitionDelay=(k%4)*90+"ms";io.observe(el)});
// scroll progress, nav state, back-to-top, active link
const secs=[...$$("main section")],links=[...$$("#links a:not(.cta)")];
addEventListener("scroll",()=>{
  const h=document.documentElement,y=h.scrollTop;
  $("#progress").style.width=(y/(h.scrollHeight-h.clientHeight)*100)+"%";
  $("#nav").classList.toggle("scrolled",y>20);
  $("#top").classList.toggle("show",y>500);
  const cur=secs.filter(s=>s.offsetTop-140<=y).pop();
  links.forEach(a=>a.classList.toggle("active",cur&&a.hash==="#"+cur.id));
},{passive:true});
// mobile menu
$("#menu").onclick=()=>$("#links").classList.toggle("open");
$$("#links a").forEach(a=>a.onclick=()=>$("#links").classList.remove("open"));
// theme toggle
const root=document.documentElement,icon=$("#theme i");
try{const s=localStorage.getItem("theme");if(s){root.dataset.theme=s;icon.className=s==="light"?"fa-solid fa-sun":"fa-solid fa-moon"}}catch(e){}
$("#theme").onclick=()=>{
  const l=root.dataset.theme!=="light";root.dataset.theme=l?"light":"dark";
  icon.className=l?"fa-solid fa-sun":"fa-solid fa-moon";
  try{localStorage.setItem("theme",root.dataset.theme)}catch(e){}
};
// contact form opens the visitor's email app (no backend needed)
$("#form").onsubmit=e=>{
  e.preventDefault();
  const b=encodeURIComponent(`${$("#fm").value}\n\nFrom: ${$("#fn").value} (${$("#fe").value})`);
  location.href=`mailto:k.kaveya10@gmail.com?subject=${encodeURIComponent("Portfolio message from "+$("#fn").value)}&body=${b}`;
};
$("#yr").textContent=new Date().getFullYear();
