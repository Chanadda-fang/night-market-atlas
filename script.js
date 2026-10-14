const stalls = [
  {id:1,name:'Auntie May’s Wok',category:'Street food',description:'Wok hei noodles, tossed fast and loud.',price:'฿฿ · 80–140',rating:'★ 4.9',emoji:'🍜',tone:'#f5d9ca'},
  {id:2,name:'Little Bao Club',category:'Street food',description:'Pillowy buns with a sticky secret.',price:'฿ · 45–90',rating:'★ 4.8',emoji:'🥟',tone:'#e7dfc8'},
  {id:3,name:'Mango Moon',category:'Sweet things',description:'Ripe mango, warm rice, cool coconut.',price:'฿ · 65',rating:'★ 5.0',emoji:'🥭',tone:'#f3e5ad'},
  {id:4,name:'Skewer Theory',category:'Street food',description:'Charcoal-grilled bites, sweet smoke.',price:'฿ · 30–120',rating:'★ 4.7',emoji:'🍢',tone:'#eed5c2'},
  {id:5,name:'Cloud Nine Toast',category:'Sweet things',description:'Crisp edges. Soft middle. Big joy.',price:'฿ · 75–110',rating:'★ 4.8',emoji:'🍞',tone:'#f2dbba'},
  {id:6,name:'The Tamarind Press',category:'Sips',description:'Sour, sweet, bright, and ice cold.',price:'฿ · 55–85',rating:'★ 4.9',emoji:'🍹',tone:'#d9e8d5'},
  {id:7,name:'Midnight Dumpling',category:'Street food',description:'Hand-folded, hot from the bamboo.',price:'฿ · 70–110',rating:'★ 4.8',emoji:'🥡',tone:'#e4d8ce'},
  {id:8,name:'Jasmine Afterglow',category:'Sips',description:'Tea brewed slow, poured over ice.',price:'฿ · 50–75',rating:'★ 4.6',emoji:'🧋',tone:'#e9dce8'}
];
const grid=document.querySelector('#stall-grid'), search=document.querySelector('#search'), count=document.querySelector('#result-count'), empty=document.querySelector('#empty-state'), favToggle=document.querySelector('#favorites-toggle');
let category='All', favorites=new Set(), favoritesOnly=false;
function render(){
  const query=search.value.trim().toLowerCase();
  const filtered=stalls.filter(s=>(category==='All'||s.category===category)&&(!favoritesOnly||favorites.has(s.id))&&(!query||`${s.name} ${s.category} ${s.description}`.toLowerCase().includes(query)));
  grid.innerHTML=filtered.map((s,i)=>`<article class="stall-card"><div class="card-art" style="--tone:${s.tone}"><span class="food-emoji" aria-hidden="true">${s.emoji}</span><span class="stall-number">STALL ${String(s.id).padStart(2,'0')}</span><button class="save-btn ${favorites.has(s.id)?'saved':''}" data-save="${s.id}" aria-label="${favorites.has(s.id)?'Remove':'Save'} ${s.name}" aria-pressed="${favorites.has(s.id)}">${favorites.has(s.id)?'♥':'♡'}</button></div><div class="card-copy"><div class="card-meta"><span class="category">${s.category}</span><span class="rating">${s.rating}</span></div><h3>${s.name}</h3><p>${s.description}</p><div class="card-bottom"><span class="price">${s.price}</span><span class="location">✦ ROW ${String.fromCharCode(65+(i%4))}</span></div></div></article>`).join('');
  count.textContent=`SHOWING ${filtered.length} ${filtered.length===1?'STALL':'STALLS'}`;
  empty.hidden=filtered.length!==0; grid.hidden=filtered.length===0;
  grid.querySelectorAll('[data-save]').forEach(btn=>btn.addEventListener('click',()=>{const id=Number(btn.dataset.save);favorites.has(id)?favorites.delete(id):favorites.add(id);render()}));
}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');btn.classList.add('active');category=btn.dataset.category;render()}));
search.addEventListener('input',render);
favToggle.addEventListener('click',()=>{favoritesOnly=!favoritesOnly;favToggle.setAttribute('aria-pressed',String(favoritesOnly));favToggle.innerHTML=`${favoritesOnly?'♥':'♡'} <span>${favoritesOnly?'Showing favorites':'Saved favorites'}</span>`;render()});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus()}if(e.key==='Escape'&&document.activeElement===search){search.value='';search.blur();render()}});
render();
