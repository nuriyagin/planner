(function(){
'use strict';
var LS = 'planner.v1';
var IC = {
  program:'M4 8h16v12H4zM4 8l3-4M10 8l3-4M16 8l3-4',
  decor:'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18',
  food:'M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2 7 0 9v9',
  guests:'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 7.5M22 21a7 7 0 0 0-4-6.3',
  budget:'M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12M16 14h.01',
  custom:'M4 4h7l9 9-7 7-9-9zM8 8h.01',
  back:'M15 6l-6 6 6 6', plus:'M12 5v14M5 12h14', x:'M6 6l12 12M18 6L6 18',
  zones:'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z', camera:'M4 8h3l2-3h6l2 3h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', image:'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 9.5h.01', link:'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  money:'M3 7h18v10H3zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6.5 10v.01M17.5 14v.01',
  tasks2:'M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2', work:'M4 8h16v11H4zM9 8V5h6v3M4 13h16', star:'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z', down:'M6 9l6 6 6-6', up:'M6 15l6-6 6 6',
  market:'M4 10h16l-1.5 10h-13zM8 10a4 4 0 0 1 8 0M12 3v3', pharm:'M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z', house:'M3 11l9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z',
  party:'M5 21l3-12 8 8zM8 9c2-3 6-3 7 1M14 4l1-2M18 7l2-1M17 11h3', cal:'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4', bulb:'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z', user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0', prev:'M15 6l-6 6 6 6', next:'M9 6l6 6-6 6',
  cloud:'M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z', edit:'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  send:'M5 12h14M13 6l6 6-6 6', tg:'M21 4L3 11l6 2 2 6 3-4 5 4z',
  film:'M4 4h16v16H4zM8 4v16M16 4v16M4 8h4M4 12h4M4 16h4M16 8h4M16 12h4M16 16h4', tv:'M3 7h18v12H3zM8 3l4 4 4-4M7 22h10', book:'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21a2 2 0 0 1 2-2h13v2H6M8 7h7', lists:'M4 4h6v8H4zM14 4h6v8h-6zM4 16h6M14 16h6M4 20h6M14 20h6',
  check:'M5 12l5 5 9-10', tasks:'M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2', cart:'M3 4h2l2.4 11h11L21 7H6.2M10 20h.01M17 20h.01', box:'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10', dbl:'M1.5 12.5l4.5 4.5L16 7M10 15.5l1.5 1.5L22 7'
};
function ic(n){ return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="'+IC[n]+'"></path></svg>'; }
function uid(){ return Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-3); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function today0(){ var d=new Date(); d.setHours(0,0,0,0); return d; }
function isoPlus(n){ var d=today0(); d.setDate(d.getDate()+n); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function parseD(s){ return s ? new Date(s+'T00:00:00') : null; }
function daysUntil(s){ var d=parseD(s); return d ? Math.round((d-today0())/86400000) : null; }
function plural(n,f){ var a=Math.abs(n)%100, b=a%10; if(a>10&&a<20) return f[2]; if(b>1&&b<5) return f[1]; if(b===1) return f[0]; return f[2]; }
function fmtLong(s){ var d=parseD(s); return d ? d.toLocaleDateString('ru-RU',{weekday:'short',day:'numeric',month:'long'}) : 'без даты'; }
function fmtShort(s){ var d=parseD(s); return d ? d.toLocaleDateString('ru-RU',{day:'numeric',month:'short'}).replace('.','') : ''; }
function money(n){ n=Math.round(n||0); return (n<0?'−':'')+'$ '+Math.abs(n).toLocaleString('ru-RU'); }
function untilText(s){ var n=daysUntil(s); if(n===null) return ''; if(n<0) return 'прошло'; if(n===0) return 'сегодня'; if(n===1) return 'завтра'; return 'через '+n+' '+plural(n,['день','дня','дней']); }
function num(v){ var n=parseFloat(String(v||'').replace(/\s/g,'').replace(',','.')); return isFinite(n)?n:0; }

/* ---------- data ---------- */
function defaultSections(size){ var all=[
  {id:uid(),name:'Программа',kind:'tasks',icon:'program'},
  {id:uid(),name:'Декор',kind:'decor',icon:'decor'},
  {id:uid(),name:'Еда',kind:'food',icon:'food'},
  {id:uid(),name:'Зоны',kind:'zones',icon:'zones'}]; return size==='big'?all:all.filter(function(x){return x.kind!=='decor'&&x.kind!=='zones';}); }
function secUsed(e,sid){ var s=secById(e,sid); return e.tasks.some(function(x){return x.sec===sid;})||e.buys.some(function(x){return x.sec===sid;})||e.insp.some(function(x){return x.sec===sid;})||
  (e.zones||[]).some(function(x){return x.sec===sid;})||(e.expenses||[]).some(function(x){return x.sec===sid;})||(s&&s.kind==='decor'&&e.storeUse.length>0); }
/* small: drop empty Декор/Зоны; big: bring them back */
function fitSections(e){ var kept=[];
  if(e.size==='big'){ var ds=defaultSections('big'); ['decor','zones'].forEach(function(k){ if(!e.sections.some(function(x){return x.kind===k;})){ var d=ds.find(function(x){return x.kind===k;}); e.sections.splice(k==='decor'?Math.min(1,e.sections.length):e.sections.length,0,d); } }); }
  else e.sections=e.sections.filter(function(x){ if(x.kind!=='decor'&&x.kind!=='zones') return true; if(secUsed(e,x.id)){ kept.push(x.name); return true; } return false; });
  return kept; }
function migrate(d){ if(!d||!d.events) return d; d.events.forEach(function(e){ e.insp=e.insp||[]; e.zones=e.zones||[]; e.sections=e.sections||[]; }); if(!d.store) d.store=[]; if(!d.shop) d.shop=[]; if(!d.shopHist) d.shopHist={}; if(!d.todos) d.todos=[]; if(!d.lists) d.lists={}; ['films','series','books'].forEach(function(k){ if(!d.lists[k]) d.lists[k]=[]; });
  if(!d.tblocks) d.tblocks=[{id:'b-party',name:'Продвижение вечеринок'},{id:'b-app',name:'Приложение планер'},{id:'b-docs',name:'Бюрократия'},{id:'b-hobby',name:'Хобби'}];
  d.todos.forEach(function(t){ if(t.done&&!t.doneAt) t.doneAt=Date.now(); }); return d; }
function newEvent(o){ var x=Object.assign({id:uid(),title:'',date:isoPlus(14),time:'19:00',size:'small',price:0,seats:0,budget:0,concept:'',
  tasks:[],buys:[],storeUse:[],dishes:[],guests:[],expenses:[],insp:[],zones:[],createdAt:Date.now()},o||{}); if(!x.sections) x.sections=defaultSections(x.size); return x; }
function seed(){
  var store=[{id:uid(),name:'Гирлянда тёплая, 10 м',qty:3},{id:uid(),name:'Свечи в бутылках',qty:20},{id:uid(),name:'Вазочки для цветов',qty:8},{id:uid(),name:'Скатерти белые',qty:6},{id:uid(),name:'Подушки на пол',qty:10}];
  var e=newEvent({title:'Киноужин «Амели»',date:isoPlus(12),time:'20:00',size:'big',price:1500,seats:16,budget:10000,sample:true,
    concept:'Парижское кафе: красно-зелёная гамма, свечи в бутылках, гирлянды, постеры фильма'});
  var P=e.sections[0].id, D=e.sections[1].id, F=e.sections[2].id;
  e.tasks=[{id:uid(),sec:P,title:'Скачать фильм с субтитрами',date:isoPlus(1),done:true},{id:uid(),sec:P,title:'Вопросы для обсуждения',date:isoPlus(8),done:false},{id:uid(),sec:P,title:'Проверить проектор и звук',date:isoPlus(11),done:false},
    {id:uid(),sec:D,title:'Фотозона «Монмартр»',date:isoPlus(12),done:false},{id:uid(),sec:F,title:'Заказать багеты в пекарне',date:isoPlus(10),done:false}];
  e.buys=[{id:uid(),sec:D,title:'Скатерти в клетку × 4',price:1600,done:true},{id:uid(),sec:D,title:'Постеры «Амели» A3 × 3',price:450,done:false},{id:uid(),sec:F,title:'Сливки 35% 1,6 л',price:520,done:false}];
  e.storeUse=[{id:uid(),storeId:store[0].id,qty:2,done:true},{id:uid(),storeId:store[1].id,qty:12,done:false}];
  e.dishes=[{id:uid(),name:'Крем-брюле',type:'Десерт',ing:[{id:uid(),name:'Сливки 35%',qty:'1,6 л',st:'listed'},{id:uid(),name:'Яйца',qty:'16 шт',st:'buy'},{id:uid(),name:'Сахар',qty:'400 г',st:'have'}]},
    {id:uid(),name:'Сырная тарелка',type:'Закуска',ing:[{id:uid(),name:'Камамбер',qty:'2 шт',st:'buy'},{id:uid(),name:'Виноград',qty:'1 кг',st:'buy'}]}];
  e.guests=[{id:uid(),name:'Маша Крылова',tg:'masha_k',conf:true,paid:true},{id:uid(),name:'Лена Соколова',tg:'lenasok',conf:true,paid:false},{id:uid(),name:'Даша Ким',tg:'dasha_kim',conf:false,paid:false},{id:uid(),name:'Оля Мартинес',tg:'olya_mvd',conf:true,paid:true}];
  e.expenses=[{id:uid(),title:'Аренда проектора',amount:1200,sec:P}];
  var e2=newEvent({title:'Музыкальное лото',date:isoPlus(26),time:'19:30',size:'big',price:1200,seats:24,budget:8000,sample:true});
  e2.tasks=[{id:uid(),sec:e2.sections[0].id,title:'Собрать плейлист 90-х',date:'',done:false},{id:uid(),sec:e2.sections[0].id,title:'Распечатать карточки лото',date:isoPlus(20),done:false}];
  var e3=newEvent({title:'МК: свечи с травами',date:isoPlus(34),time:'17:00',size:'small',price:2000,seats:8,budget:6000,sample:true});
  e3.tasks=[{id:uid(),sec:e3.sections[0].id,title:'Купить воск и фитили',date:isoPlus(25),done:false}];
  return {v:1,events:[e,e2,e3],store:store,ideas:sampleIdeas(),lastCat:'',updatedAt:Date.now()};
}
function sampleIdeas(){ return [
  {id:uid(),title:'«Мамма Миа» + караоке',format:'Киноужин',text:'Греческая еда, бело-синий декор, после фильма поём ABBA',link:'',sample:true},
  {id:uid(),title:'Лото по саундтрекам',format:'Лото',text:'Только музыка из фильмов 90-х. Призы — попкорн-наборы',link:'',sample:true},
  {id:uid(),title:'Террариумы с суккулентами',format:'МК',text:'Стеклянные шары, грунт, мох. До 8 человек',link:'',sample:true},
  {id:uid(),title:'Вечер Миядзаки',format:'Киноужин',text:'Японские закуски, бумажные фонарики',link:'',sample:true},
  {id:uid(),title:'Пижамная вечеринка',format:'Вечеринка',text:'Дресс-код, панкейки, мультфильмы',link:'',sample:true}]; }
function load(){ try{ var r=localStorage.getItem(LS); if(r){ var s=JSON.parse(r); if(s&&s.events) return s; } }catch(e){} return seed(); }
var S=migrate(load()); if(!S.ideas) S.ideas=sampleIdeas();
var quotaWarned=false;
function persist(){ try{ localStorage.setItem(LS,JSON.stringify(S)); }catch(e){ if(!quotaWarned&&e&&/quota/i.test(String(e.name||e.message))){ quotaWarned=true; setTimeout(function(){ toast('Память на устройстве заполнена — войдите в аккаунт, чтобы фото хранились в облаке',true); },300); } } }
function save(){ S.updatedAt=Date.now(); persist(); schedulePush(); }
/* done personal/work tasks disappear at 23:59 of the day they were ticked */
function dayEnd(ts){ var d=new Date(ts); d.setHours(23,59,0,0); return d.getTime(); }
function autoClear(quiet){ if(UI&&UI.sheet) return; var now=Date.now(), n0=S.todos.length;
  S.todos=S.todos.filter(function(t){ return !(t.done&&(t.list==='personal'||t.list==='work')&&now>=dayEnd(t.doneAt||now)); });
  if(S.todos.length!==n0){ save(); if(!quiet) render(); } }

/* ---------- photos ---------- */
var PH={}; try{ PH=JSON.parse(localStorage.getItem('planner.ph')||'{}')||{}; }catch(e){ PH={}; }
function phSave(){ try{ var o={}; Object.keys(PH).forEach(function(k){ if(PH[k]&&PH[k].u&&PH[k].u.indexOf('blob:')!==0) o[k]=PH[k]; }); localStorage.setItem('planner.ph',JSON.stringify(o)); }catch(e){} }
function canPhoto(){ return !!(sb&&USER); }
function phUrl(path){ var c=PH[path]; return c&&c.x>Date.now()?c.u:''; }
function img(path,cls,alt){ var u=phUrl(path); return '<img class="'+(cls||'')+'" data-photo="'+esc(path)+'"'+(u?' src="'+esc(u)+'"':'')+' alt="'+esc(alt||'')+'">'; }
var phPending={};
function hydratePhotos(){
  if(!sb||!USER) return;
  var need=[];
  [].slice.call(document.querySelectorAll('img[data-photo]')).forEach(function(i){ if(i.getAttribute('src')) return; var p=i.getAttribute('data-photo'), u=phUrl(p); if(u) i.src=u; else if(!phPending[p]&&need.indexOf(p)<0) need.push(p); });
  if(!need.length) return;
  need.forEach(function(p){ phPending[p]=1; });
  sb.storage.from('photos').createSignedUrls(need,604800).then(function(r){
    (r.data||[]).forEach(function(x){ if(x&&x.signedUrl&&x.path) PH[x.path]={u:x.signedUrl,x:Date.now()+6*86400000}; });
    need.forEach(function(p){ delete phPending[p]; }); phSave();
    document.querySelectorAll('img[data-photo]').forEach(function(i){ if(!i.getAttribute('src')){ var u=phUrl(i.getAttribute('data-photo')); if(u) i.src=u; } });
  },function(){ need.forEach(function(p){ delete phPending[p]; }); });
}
function compressImg(file,max,q){ return new Promise(function(res,rej){
  var url=URL.createObjectURL(file), im=new Image();
  im.onload=function(){ var w=im.naturalWidth||im.width, h=im.naturalHeight||im.height, sc=Math.min(1,max/Math.max(w,h)); var c=document.createElement('canvas'); c.width=Math.max(1,Math.round(w*sc)); c.height=Math.max(1,Math.round(h*sc));
    var cx=c.getContext('2d'); cx.fillStyle='#fff'; cx.fillRect(0,0,c.width,c.height); cx.drawImage(im,0,0,c.width,c.height); URL.revokeObjectURL(url);
    c.toBlob(function(b){ if(b) res(b); else rej(new Error('не удалось обработать фото')); },'image/jpeg',q||0.8); };
  im.onerror=function(){ URL.revokeObjectURL(url); rej(new Error('этот формат фото не открылся')); };
  im.src=url; }); }
async function uploadPhoto(file,max){
  var blob=await compressImg(file,max||1600,0.8), path=USER.id+'/'+uid()+'.jpg';
  var r=await sb.storage.from('photos').upload(path,blob,{contentType:'image/jpeg',upsert:false});
  if(r.error) throw r.error;
  PH[path]={u:URL.createObjectURL(blob),x:Date.now()+3600000}; return path;
}
function anyImg(path,cls,alt){ return /^data:image\//.test(path||'') ? '<img class="'+(cls||'')+'" src="'+esc(path)+'" alt="'+esc(alt||'')+'">' : img(path,cls,alt); }
function blobToData(b){ return new Promise(function(res,rej){ var r=new FileReader(); r.onload=function(){ res(r.result); }; r.onerror=function(){ rej(new Error('не удалось прочитать фото')); }; r.readAsDataURL(b); }); }
/* list covers: cloud storage when signed in, otherwise a small copy kept with the data */
function uploadCover(file){ if(canPhoto()) return uploadPhoto(file,1000); return compressImg(file,420,0.72).then(blobToData); }
function delPhoto(path){ if(!path||/^data:/.test(path)) return;if(sb&&USER) sb.storage.from('photos').remove([path]).catch(function(){}); delete PH[path]; phSave(); }
function snapSheet(){ var sh=document.querySelector('.sheet'); if(!sh) return null; var o={};
  sh.querySelectorAll('input,textarea,select').forEach(function(el){ if(el.type==='file') return;
    if(el.type==='radio'){ if(el.checked) o['r:'+el.name]=el.value; } else if(el.type==='checkbox'){ if(el.id) o['#'+el.id]=el.checked; } else if(el.id) o[el.id]=el.value; });
  return o; }
function restoreSheet(o){ if(!o) return; Object.keys(o).forEach(function(k){
  if(k[0]==='#'){ var c=document.getElementById(k.slice(1)); if(c) c.checked=o[k]; }
  else if(k.indexOf('r:')===0){ var r=document.querySelector('input[name="'+k.slice(2)+'"][value="'+String(o[k]).replace(/"/g,'')+'"]'); if(r) r.checked=true; }
  else { var el=document.getElementById(k); if(el) el.value=o[k]; } }); }
function rerenderKeep(){ var sn=snapSheet(); render(); restoreSheet(sn); syncGpicks(); }
function syncGpicks(){ var gi=document.getElementById('f-genre'); if(!gi) return; var cur=String(gi.value||'').split(',').map(function(x){return x.trim().toLowerCase();});
  document.querySelectorAll('.gpicks button').forEach(function(b){ var on=cur.indexOf(String(b.dataset.v).toLowerCase())>=0; b.classList.toggle('on',on); b.setAttribute('aria-pressed',String(on)); }); }
function photoField(target,id,path,label){
  if(!canPhoto()) return '<div class="field"><span class="lbl">'+esc(label)+'</span><p class="muted" style="margin:0;font-size:13px;font-weight:600">'+(PREVIEW?'Фото работают в установленном приложении.':'Чтобы прикреплять фото, войдите в аккаунт.')+'</p></div>';
  return '<div class="field ph-field"><span class="lbl">'+esc(label)+'</span>'+(path?'<button class="ph-thumb" data-a="zoom" data-p="'+esc(path)+'" aria-label="Открыть фото">'+img(path,'','')+'</button>':'')+
    '<div class="ph-row"><button data-a="photo" data-target="'+target+'" data-id="'+id+'">'+ic('camera')+(path?'Заменить':'Добавить фото')+'</button>'+(path?'<button data-a="photo-rm" data-target="'+target+'" data-id="'+id+'">Убрать</button>':'')+'</div></div>';
}

/* ---------- cloud sync (Supabase) ---------- */
var SUPA_URL='https://zoetnollywrhnkpgnwxd.supabase.co', SUPA_KEY='sb_publishable_FfVJk8-dpm-9DCWOePasJg_oSbQL4ft';
var PREVIEW=/claude/i.test(location.hostname);
var sb=null, USER=null, SYNC={state:'idle',msg:''}, pushT=null, syncing=false, again=false;
try{ if(!PREVIEW&&window.supabase) sb=window.supabase.createClient(SUPA_URL,SUPA_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}}); }catch(e){ sb=null; }
function syncText(){
  if(!USER) return '';
  if(SYNC.state==='saving') return 'Сохраняю…';
  if(SYNC.state==='offline') return 'Нет интернета — сохраню, когда связь появится';
  if(SYNC.state==='error') return 'Не удалось сохранить: '+SYNC.msg;
  if(S.syncedAt&&S.updatedAt>S.syncedAt) return 'Есть несохранённые изменения';
  return S.syncedAt?'Всё сохранено · '+new Date(S.syncedAt).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'Ещё не сохранялось';
}
function setSync(st,msg){ SYNC.state=st; SYNC.msg=msg||''; var el=document.getElementById('sync-status'); if(el) el.textContent=syncText(); }
function schedulePush(){ if(!sb||!USER) return; clearTimeout(pushT); pushT=setTimeout(syncNow,1200); }
function adopt(r){ var d=r.data||{}; if(!d.events) return; d.syncedAt=Date.parse(r.updated_at); d.updatedAt=d.syncedAt; if(!d.ideas) d.ideas=[]; if(!d.store) d.store=[];
  S=migrate(d); persist(); if(!UI.sheet&&!(document.activeElement&&/INPUT|TEXTAREA/.test(document.activeElement.tagName))) render(); }
async function push(){ var stamp=S.updatedAt||Date.now(); var copy=JSON.parse(JSON.stringify(S)); delete copy.syncedAt;
  var res=await sb.from('planner_state').upsert({user_id:USER.id,data:copy,updated_at:new Date(stamp).toISOString()});
  if(res.error) throw res.error; S.syncedAt=stamp; persist(); }
async function syncNow(){
  if(!sb||!USER) return; if(syncing){ again=true; return; } syncing=true; setSync('saving');
  try{
    var res=await sb.from('planner_state').select('data,updated_at').eq('user_id',USER.id).maybeSingle();
    if(res.error) throw res.error;
    var r=res.data, dirty=!S.syncedAt||S.updatedAt>S.syncedAt;
    if(!r) await push();
    else { var rt=Date.parse(r.updated_at);
      if(!S.syncedAt) adopt(r);
      else if(rt>S.syncedAt&&(!dirty||rt>=S.updatedAt)) adopt(r);
      else if(dirty) await push(); }
    setSync('idle');
  }catch(e){ setSync(navigator.onLine===false?'offline':'error',(e&&e.message)||'ошибка связи'); }
  syncing=false; if(again){ again=false; syncNow(); }
}
function authErr(m){ m=String(m||''); if(/invalid login/i.test(m)) return 'Неверная почта или пароль'; if(/already registered|already exists/i.test(m)) return 'Такой аккаунт уже есть — нажмите «Войти»';
  if(/password/i.test(m)&&/6|short|least/i.test(m)) return 'Пароль должен быть не короче 6 символов'; if(/email/i.test(m)&&/invalid/i.test(m)) return 'Проверьте адрес почты'; if(/fetch|network/i.test(m)) return 'Нет связи с интернетом'; return m; }
async function signIn(create){
  var em=val('acc-email'), pw=(document.getElementById('acc-pass')||{}).value||'';
  if(!em||!pw){ UI.authMsg='Введите почту и пароль'; render(); return; }
  UI.authMsg='Подождите…'; var m=document.getElementById('auth-msg'); if(m) m.textContent=UI.authMsg;
  try{ var res=create?await sb.auth.signUp({email:em,password:pw}):await sb.auth.signInWithPassword({email:em,password:pw});
    if(res.error) throw res.error;
    if(!res.data.session){ UI.authMsg='Аккаунт создан. Если пришло письмо — подтвердите почту и нажмите «Войти».'; render(); return; }
    UI.authMsg=''; USER=res.data.session.user; render(); await syncNow(); render(); toast('Вы вошли — данные синхронизируются');
  }catch(e){ UI.authMsg=authErr(e&&e.message); render(); }
}
async function initAuth(){
  if(!sb) return;
  try{ var r=await sb.auth.getSession(); USER=r.data.session?r.data.session.user:null; }catch(e){ USER=null; }
  if(USER){ render(); syncNow(); }
  sb.auth.onAuthStateChange(function(evn,session){ var u=session?session.user:null; var ch=(u&&u.id)!==(USER&&USER.id); USER=u; if(ch){ if(USER) syncNow(); render(); } });
  document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='visible') syncNow(); });
  window.addEventListener('online',function(){ syncNow(); });
}

var R={name:'home'};
var UI={authMsg:'',filter:'upcoming',gfilter:'all',ifilter:'all',quick:'',sheet:null,toast:'',cal:null,calDay:null};
var FORMATS=['Киноужин','Лото','МК','Вечеринка','Другое'];
function iso(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function ev(){ return S.events.find(function(e){return e.id===R.id;}); }
function storeItem(id){ return S.store.find(function(s){return s.id===id;})||{name:'(удалено со склада)',qty:0}; }
function secTone(e,key){ var keys=allKeys(e); var i=keys.indexOf(key); return i%2===0?'o':'g'; }
function allKeys(e){ return e.sections.map(function(s){return s.id;}).concat(['guests','budget']); }
function secById(e,id){ return e.sections.find(function(s){return s.id===id;}); }

/* ---------- stats ---------- */
function secItems(e,sid){
  var t=e.tasks.filter(function(x){return x.sec===sid;}), b=e.buys.filter(function(x){return x.sec===sid;});
  var s=secById(e,sid), u=(s&&s.kind==='decor')?e.storeUse:[];
  var pr=[]; if(s&&s.kind==='zones') (e.zones||[]).forEach(function(z){ if(z.sec===sid) z.props.forEach(function(g){ pr.push({done:g.st==='have'||g.st==='store'}); }); });
  var all=t.length+b.length+u.length+pr.length, done=t.filter(d).length+b.filter(d).length+u.filter(d).length+pr.filter(d).length;
  function d(x){return x.done;}
  return {all:all,done:done};
}
function evProgress(e){ var a=0,dn=0; e.sections.forEach(function(s){ var p=secItems(e,s.id); a+=p.all; dn+=p.done; }); return {all:a,done:dn}; }
function spentBySec(e){
  var m={}; e.buys.forEach(function(b){ if(b.done&&b.price){ m[b.sec]=(m[b.sec]||0)+b.price; } });
  e.expenses.forEach(function(x){ m[x.sec||'other']=(m[x.sec||'other']||0)+(x.amount||0); });
  return m;
}
function money3(e){
  var paid=people(e.guests.filter(function(g){return g.paid;})), ppl=people(e.guests);
  var collected=paid*(e.price||0), expected=ppl*(e.price||0);
  var m=spentBySec(e), spent=0; Object.keys(m).forEach(function(k){spent+=m[k];});
  return {paid:paid,people:ppl,collected:collected,expected:expected,spent:spent,map:m};
}
var PAL=[['#A7C048','Зелёный'],['#F89A6F','Оранжевый'],['#7FB3E0','Голубой'],['#A88BD9','Сиреневый'],['#E88AAE','Розовый'],['#E8B931','Жёлтый'],['#5FB89A','Мятный'],['#C9A227','Золотой'],['#8B5E3C','Коричневый'],['#D64545','Красный'],['#7A1F3D','Бордовый'],['#2C4A7A','Тёмно-синий'],['#2E7D5B','Изумрудный'],['#5B6578','Графит']];
function hexRgb(h){ h=String(h||'').replace('#',''); if(h.length===3) h=h.replace(/./g,'$&$&'); var n=parseInt(h,16); if(isNaN(n)) n=0xA7C048; return [n>>16&255,n>>8&255,n&255]; }
function rgbHex(c){ return '#'+c.map(function(v){ v=Math.max(0,Math.min(255,Math.round(v))); return (v<16?'0':'')+v.toString(16); }).join(''); }
function mixW(h,t){ var c=hexRgb(h); return rgbHex(c.map(function(v){return v+(255-v)*t;})); }
function darken(h,t){ var c=hexRgb(h); return rgbHex(c.map(function(v){return v*(1-t);})); }
function lum(h){ var c=hexRgb(h).map(function(v){ v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4); }); return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]; }
function onColor(h){ return lum(h)>0.6?'#2F3A4F':'#FFFFFF'; }
function evC(e){ var c1=(e&&e.c1)||'#A7C048', c2=(e&&e.c2)||'#F89A6F';
  return {c1:c1,t1:onColor(c1),tint1:mixW(c1,0.78),c2:c2,t2:onColor(c2),tint2:mixW(c2,0.8),deep2:lum(c2)>0.25?darken(c2,0.35):c2}; }
function applyTheme(e){ var r=document.documentElement.style, c=evC(e);
  r.setProperty('--acc',c.c2); r.setProperty('--acc-t',c.t2); r.setProperty('--acc-tint',c.tint2); r.setProperty('--acc-deep',c.deep2);
  r.setProperty('--ev1',c.c1); r.setProperty('--ev1-t',c.t1); }
function gN(g){ return Math.max(1,Math.round(g.n||1)); }
function people(list){ return list.reduce(function(a,g){return a+gN(g);},0); }
function pct(a,b){ return b>0?Math.max(0,Math.min(100,Math.round(100*a/b))):0; }

/* ---------- render ---------- */
var app=document.getElementById('app'), layer=document.getElementById('layer');
var MQ=window.matchMedia?window.matchMedia('(min-width:900px)'):null;
function isWide(){ return !!(MQ&&MQ.matches); }
if(MQ){ var mqf=function(){ if(!isWide()&&R.name==='event'&&R.k){ /* keep */ } render(); }; if(MQ.addEventListener) MQ.addEventListener('change',mqf); else if(MQ.addListener) MQ.addListener(mqf); }
function render(focusId){
  if(isWide()&&R.name==='sec') R={name:'event',id:R.id,k:R.k};
  applyTheme((R.name==='event'||R.name==='sec')?ev():null);
  var h='';
  if(R.name==='home') h=vHome();
  else if(R.name==='event') h=ev()?vEvent():vHome();
  else if(R.name==='sec') h=ev()?vSection():vHome();
  else if(R.name==='settings') h=vSettings();
  else if(R.name==='calendar') h=vCalendar();
  else if(R.name==='ideas') h=vIdeas();
  else if(R.name==='todo') h=vTodo();
  else if(R.name==='lists') h=vLists();
  app.innerHTML=h;
  var top=['home','calendar','ideas','settings','todo','lists'].indexOf(R.name)>=0;
  layer.innerHTML=(R.name==='event'&&ev()?vQuick():'')+(R.name==='todo'?vTodoQuick():'')+vNav(top)+(UI.sheet?vSheet():'')+(UI.zoom?'<div class="lightbox" data-a="unzoom" role="dialog" aria-label="Фото">'+anyImg(UI.zoom,'','Фото')+'</div>':'');
  setTimeout(hydratePhotos,0);
  if(focusId){ var el=document.getElementById(focusId); if(el){ el.focus(); } }
}
function vNav(top){
  var items=[['home','party','События'],['calendar','cal','Календарь'],['todo','tasks2','Задачи'],['lists','book','Списки'],['settings','user','Аккаунт']];
  var cur=(R.name==='event'||R.name==='sec'||R.name==='ideas')?'home':R.name;
  return '<nav class="nav'+(top?'':' sub')+'" aria-label="Разделы приложения"><div class="nav-in"><div class="brand">Планер</div>'+items.map(function(x){ var on=cur===x[0];
    return '<button class="'+(on?'on':'')+(x[0]==='todo'?' lav':'')+(x[0]==='lists'?' pink':'')+'" data-a="nav" data-v="'+x[0]+'"'+(on?' aria-current="page"':'')+'><span class="pillic">'+ic(x[1])+'</span>'+x[2]+'</button>'; }).join('')+'</div></nav>';
}
function vCalendar(){
  var c=UI.cal; if(!c){ var t=today0(); c=UI.cal={y:t.getFullYear(),m:t.getMonth()}; }
  var sel=UI.calDay||iso(today0()), tIso=iso(today0());
  var first=new Date(c.y,c.m,1), off=(first.getDay()+6)%7, n=new Date(c.y,c.m+1,0).getDate();
  var evD={}, tkD={};
  S.events.forEach(function(e){ if(e.date)(evD[e.date]=evD[e.date]||[]).push(e); e.tasks.forEach(function(t){ if(t.date)(tkD[t.date]=tkD[t.date]||[]).push({e:e,t:t}); }); });
  S.todos.forEach(function(t){ if(t.date)(tkD[t.date]=tkD[t.date]||[]).push({td:t,t:t}); });
  var title=first.toLocaleDateString('ru-RU',{month:'long'}); title=title[0].toUpperCase()+title.slice(1);
  var h='<header class="top"><div><div class="eyebrow">'+c.y+'</div><h1>'+esc(title)+'</h1></div><div class="actions"><button class="icon-btn" data-a="cal-m" data-v="-1" aria-label="Предыдущий месяц">'+ic('prev')+'</button><button class="icon-btn" data-a="cal-m" data-v="1" aria-label="Следующий месяц">'+ic('next')+'</button></div></header>';
  h+='<div class="cal-split"><div><div class="cal"><div class="cal-h"><span>пн</span><span>вт</span><span>ср</span><span>чт</span><span>пт</span><span>сб</span><span>вс</span></div><div class="cal-g">';
  for(var i=0;i<off;i++) h+='<span></span>';
  for(var d=1;d<=n;d++){ var k=iso(new Date(c.y,c.m,d)); var cls='cday'+(evD[k]?' evd':'')+(tkD[k]?' dot':'')+(k===sel?' sel':'')+(k===tIso?' today':'')+(k<tIso?' past':'');
    var ecs=evD[k]?evC(evD[k][0]):null;
    h+='<button class="'+cls+'" data-a="cal-day" data-v="'+k+'" aria-label="'+esc(fmtLong(k))+(evD[k]?', событие':'')+(tkD[k]?', есть задачи':'')+'"><b class="num"'+(ecs?' style="background:'+ecs.c1+';color:'+ecs.t1+'"':'')+'>'+d+'</b><i></i></button>'; }
  h+='</div></div><div class="legend2"><span><i style="width:14px;height:14px;border-radius:5px;background:var(--o);display:inline-block"></i>событие</span><span><i style="width:7px;height:7px;border-radius:4px;background:var(--ink);display:inline-block"></i>есть задачи</span><span><i style="width:14px;height:14px;border-radius:5px;background:var(--g-tint);display:inline-block"></i>выбран</span></div></div><div>';
  var evs=evD[sel]||[], tks=(tkD[sel]||[]).slice().sort(function(a,b){return a.t.done-b.t.done;});
  h+='<div class="block"><div class="block-h"><h3 style="text-transform:capitalize">'+esc(fmtLong(sel))+'</h3><small>'+tks.length+' '+plural(tks.length,['задача','задачи','задач'])+'</small></div>';
  evs.forEach(function(e){ var cc=evC(e); h+='<button class="hero" style="padding:14px 16px;gap:4px;background:'+cc.c1+';color:'+cc.t1+'" data-a="open" data-id="'+e.id+'"><span style="font-size:12px;font-weight:800">СОБЫТИЕ'+(e.time?' · '+esc(e.time):'')+'</span><b style="font-family:var(--display);font-size:20px;font-weight:900">'+esc(e.title)+'</b></button>'; });
  if(tks.length){ h+='<div class="list">'+tks.map(function(x){
      if(x.td) return '<div class="row"><button class="ck'+(x.t.done?' on':'')+'" style="'+(x.t.done?'background:#BDBDFB;border-color:#BDBDFB':'')+'" data-a="td-tick" data-id="'+x.t.id+'" aria-pressed="'+!!x.t.done+'" aria-label="Отметить: '+esc(x.t.title)+'"><svg viewBox="0 0 24 24" style="stroke:var(--ink)"><path d="'+IC.check+'"></path></svg></button>'+
        '<span style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px"><button class="t'+(x.t.done?' done':'')+'" style="padding:0" data-a="td-open" data-id="'+x.t.id+'">'+esc(x.t.title)+'</button>'+
        '<span class="evtag" style="background:#ECECFD;color:var(--ink)">'+(x.t.list==='work'?'Работа':'Личное')+'</span></span></div>';
      var s=secById(x.e,x.t.sec);
      return '<div class="row"><button class="ck'+(x.t.done?' on':'')+'" data-a="cal-tick" data-e="'+x.e.id+'" data-id="'+x.t.id+'" aria-pressed="'+!!x.t.done+'" aria-label="Отметить: '+esc(x.t.title)+'"><svg viewBox="0 0 24 24"><path d="'+IC.check+'"></path></svg></button>'+
        '<span style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px"><button class="t'+(x.t.done?' done':'')+'" style="padding:0" data-a="cal-open" data-e="'+x.e.id+'" data-k="'+x.t.sec+'">'+esc(x.t.title)+'</button>'+
        '<span class="evtag" style="background:'+evC(x.e).tint1+';color:var(--ink)">'+esc(x.e.title)+(s?' · '+esc(s.name):'')+'</span></span></div>'; }).join('')+'</div>'; }
  else if(!evs.length) h+='<div class="empty">На этот день ничего не запланировано. Дату задаче можно поставить, нажав на неё в разделе события.</div>';
  return h+'</div></div></div>';
}
function vIdeas(){
  var h='<button class="pill" data-a="home">'+ic('back')+'<span>События</span></button><header class="top" style="margin-top:12px"><div><div class="eyebrow">Копилка</div><h1>Идеи</h1></div></header>';
  h+='<div class="qa-field" style="margin-bottom:12px"><label for="idea-add" class="sr">Новая идея</label><input id="idea-add" data-add="idea" placeholder="А что если…" autocomplete="off" enterkeyhint="done"><button class="qa-go" data-a="idea-go" aria-label="Добавить идею">'+ic('plus')+'</button></div>';
  var list=S.ideas;
  if(!list.length) return h+'<div class="empty" style="margin-top:12px">Здесь пока пусто. Запишите идею одной строкой — описание и ссылку добавите потом.</div>';
  var bgs=['var(--o-tint)','var(--g-tint)','var(--surface)'];
  return h+'<div class="ideas">'+list.map(function(x,i){ return '<button class="idea" style="background:'+bgs[i%3]+'" data-a="sheet-idea" data-id="'+x.id+'">'+(x.sample?'<small>пример</small>':'')+'<b>'+esc(x.title)+'</b>'+(x.text?'<span>'+esc(x.text)+'</span>':'')+'</button>'; }).join('')+'</div>';
}
var STORES=[['food','Продукты','food'],['market','Рынок','market'],['pharm','Аптека','pharm'],['home','Бытовое','house']];
function storeName(k){ var x=STORES.find(function(s){return s[0]===k;}); return x?x[1]:''; }
function vTodo(){
  var seg=UI.tseg||'shop';
  var shopN=S.shop.filter(function(x){return !x.done;}).length;
  var h='<div class="todo-w"><header class="top"><div><div class="eyebrow">Дом и дела</div><h1>Задачи</h1></div>'+(seg==='shop'&&shopN?'<span class="due" style="font-size:13px;padding:6px 11px">'+shopN+' купить</span>':'')+'</header>';
  h+='<div class="lav-seg" role="tablist">'+[['shop','cart','Покупки'],['personal','user','Личные'],['work','work','Работа']].map(function(x){
    return '<button role="tab" aria-selected="'+(seg===x[0])+'" class="'+(seg===x[0]?'on':'')+'" data-a="tseg" data-v="'+x[0]+'">'+ic(x[1]).replace('class="i"','class="i" style="width:18px;height:18px"')+x[2]+'</button>'; }).join('')+'</div>';
  h+=seg==='shop'?vShop():vTodoList(seg);
  return h+'</div>';
}
function vShop(){
  var st=UI.store||'food';
  var h='<div class="stores" role="tablist">'+STORES.map(function(x){ var n=S.shop.filter(function(i){return i.store===x[0]&&!i.done;}).length;
    return '<button role="tab" aria-selected="'+(st===x[0])+'" class="'+(st===x[0]?'on':'')+'" data-a="store" data-v="'+x[0]+'">'+ic(x[2])+x[1]+(n?'<small>'+n+'</small>':'')+'</button>'; }).join('')+'</div>';
  var items=S.shop.filter(function(i){return i.store===st;}), open=items.filter(function(i){return !i.done;}), done=items.filter(function(i){return i.done;});
  var openNames=open.map(function(i){return i.name.toLowerCase();});
  var hist=S.shopHist[st]||{}, often=Object.keys(hist).map(function(k){return hist[k];}).filter(function(x){return x.c>=2&&openNames.indexOf(x.name.toLowerCase())<0;}).sort(function(a,b){return b.c-a.c;}).slice(0,8);
  if(often.length) h+='<div class="often">'+often.map(function(o){ return '<button data-a="often" data-n="'+esc(o.name)+'">+ '+esc(o.name)+'</button>'; }).join('')+'</div>';
  h+='<div class="lav-list">'+(open.length?open.map(function(i){
      return '<div class="row"><button class="ck sq" data-a="shop-tick" data-id="'+i.id+'" aria-pressed="false" aria-label="Куплено: '+esc(i.name)+'"><svg viewBox="0 0 24 24"><path d="'+IC.check+'"></path></svg></button><button class="t" data-a="sheet-shop" data-id="'+i.id+'">'+esc(i.name)+'</button>'+(i.qty?'<span class="r">'+esc(i.qty)+'</span>':'')+'</div>'; }).join('')
    :'<div class="row"><span class="t muted" style="font-weight:600">Здесь пусто. Добавьте товар в строке внизу — можно с количеством через запятую: «молоко, 2»</span></div>')+'</div>';
  if(done.length){
    h+='<div class="bought" style="background:#FDF4DC"><button class="lnk" style="color:var(--ink);font-size:14px;font-weight:700" data-a="show-bought" aria-expanded="'+!!UI.showBought+'">Куплено · '+done.length+' '+ic(UI.showBought?'up':'down').replace('class="i"','class="i" style="width:14px;height:14px;vertical-align:-2px"')+'</button><button class="lnk" data-a="clear-bought">Очистить</button></div>';
    if(UI.showBought) h+='<div class="lav-list">'+done.map(function(i){ return '<div class="row"><button class="ck sq on" data-a="shop-tick" data-id="'+i.id+'" aria-pressed="true" aria-label="Вернуть: '+esc(i.name)+'"><svg viewBox="0 0 24 24"><path d="'+IC.check+'"></path></svg></button><span class="t done">'+esc(i.name)+'</span></div>'; }).join('')+'</div>';
  }
  return h;
}
function tdRow(t,tag){
  var subs=t.subs||[], dn=subs.filter(function(x){return x.done;}).length, open=!!(UI.tdOpen||{})[t.id];
  var due='';
  if(t.date){ var n=daysUntil(t.date); due='<span class="due'+(n!==null&&n>3?' soft':'')+'">'+(n<0?'просрочено':n===0?'сегодня':n===1?'завтра':fmtShort(t.date))+'</span>'; }
  var h='<div class="tdwrap"><div class="tdrow"><button class="ck'+(t.done?' on':'')+'" data-a="td-tick" data-id="'+t.id+'" aria-pressed="'+!!t.done+'" aria-label="Готово: '+esc(t.title)+'"><svg viewBox="0 0 24 24"><path d="'+IC.check+'"></path></svg></button>'+
    '<button class="mid" data-a="td-open" data-id="'+t.id+'"><b'+(t.done?' style="color:#9AA1AF;text-decoration:line-through;font-weight:500"':'')+'>'+esc(t.title)+'</b>'+
    (tag&&blkOf(t)?'<span class="blk-tag">'+esc(blkName(blkOf(t)))+'</span>':'')+
    (subs.length?'<span class="prog"><i><b style="width:'+pct(dn,subs.length)+'%"></b></i>'+dn+'/'+subs.length+'</span>':'')+'</button>'+due+
    (t.done?'':'<button class="star'+(t.focus?' on':'')+'" data-a="td-focus" data-id="'+t.id+'" aria-pressed="'+!!t.focus+'" aria-label="'+(t.focus?'Убрать из фокуса':'В фокус')+'">'+ic('star')+'</button>')+
    (subs.length?'<button class="chev" data-a="td-toggle" data-id="'+t.id+'" aria-expanded="'+open+'" aria-label="Подзадачи">'+ic(open?'up':'down')+'</button>':'')+'</div>';
  if(open&&subs.length){
    h+='<div class="subs">'+subs.map(function(x){ return '<div class="row"><button class="ck sq'+(x.done?' on':'')+'" data-a="sub-tick" data-t="'+t.id+'" data-id="'+x.id+'" aria-pressed="'+!!x.done+'" aria-label="Отметить: '+esc(x.title)+'"><svg viewBox="0 0 24 24"><path d="'+IC.check+'"></path></svg></button><span class="t'+(x.done?' done':'')+'">'+esc(x.title)+'</span></div>'; }).join('')+
      addRow('add-sub-'+t.id,'sub','Подпункт…',t.id)+'</div>';
    if(!t.done&&dn===subs.length) h+='<button class="close-all" data-a="td-tick" data-id="'+t.id+'">Все пункты готовы — закрыть дело</button>';
  }
  return h+'</div>';
}
function blkOf(t){ return t&&t.block&&S.tblocks.some(function(b){return b.id===t.block;})?t.block:''; }
function blkName(id){ var b=S.tblocks.find(function(x){return x.id===id;}); return b?b.name:''; }
function curBlk(){ var b=UI.tblk||''; return b&&S.tblocks.some(function(x){return x.id===b;})?b:''; }
function vTodoList(list){
  var all=S.todos.filter(function(t){return t.list===list;});
  var pers=list==='personal', cb=pers?curBlk():'', h='';
  if(pers){ h+='<div class="chips t-chips" role="group" aria-label="Блоки">'+[['','Все']].concat(S.tblocks.map(function(b){return [b.id,b.name];})).map(function(x){ var on=cb===x[0], n=all.filter(function(t){return !t.done&&(!x[0]||blkOf(t)===x[0]);}).length;
      return '<button class="chip'+(on?' on':'')+'" data-a="tblk" data-v="'+x[0]+'" aria-pressed="'+on+'">'+esc(x[1])+(n&&x[0]?' <small style="opacity:.6">'+n+'</small>':'')+'</button>'; }).join('')+
      '<button class="chip add" data-a="sheet-tblock">'+ic('plus').replace('class="i"','class="i" style="width:16px;height:16px"')+'Блок</button></div>';
    if(cb) all=all.filter(function(t){return blkOf(t)===cb;}); }
  var act=all.filter(function(t){return !t.done;}), done=all.filter(function(t){return t.done;});
  var byDue=function(a,b){ var A=a.date||'9999', B=b.date||'9999'; return A<B?-1:A>B?1:0; };
  var focus=act.filter(function(t){return t.focus;}).sort(byDue), rest=act.filter(function(t){return !t.focus;});
  rest=rest.filter(function(t){return t.date;}).sort(byDue).concat(rest.filter(function(t){return !t.date;}));
  if(cb&&!all.length) return h+'<div class="lh"><b>'+esc(blkName(cb))+'</b><button class="lh-ed" data-a="sheet-tblock" data-id="'+cb+'">Изменить</button></div><div class="empty" style="margin-top:8px">В этом блоке пока пусто. Напишите дело в строке внизу — оно попадёт сюда.</div>';
  if(!all.length) return h+'<div class="empty" style="margin-top:14px">'+(list==='work'?'Рабочих задач пока нет.':'Личных дел пока нет.')+' Напишите первое в строке внизу. Звёздочка поднимет дело в «В фокусе».</div>';
  if(focus.length) h+='<div class="focus"><div class="fh">'+ic('star').replace('class="i"','class="i" style="width:17px;height:17px;fill:#F2C744;color:#C99A12"')+'<b>В фокусе</b><small>'+focus.length+'</small></div>'+focus.map(function(t){return tdRow(t,pers&&!cb);}).join('')+'</div>';
  if(cb) h+='<div class="lh"><b>'+esc(blkName(cb))+'</b><span style="display:flex;gap:10px;align-items:baseline"><small>'+rest.length+'</small><button class="lh-ed" data-a="sheet-tblock" data-id="'+cb+'">Изменить</button></span></div>'+(rest.length?'<div class="lav-list" style="margin-top:6px">'+rest.map(function(t){return tdRow(t);}).join('')+'</div>':'');
  else if(pers){ var groups=S.tblocks.map(function(b){ return [b.name,rest.filter(function(t){return blkOf(t)===b.id;})]; }).filter(function(g){return g[1].length;});
    var nob=rest.filter(function(t){return !blkOf(t);}); if(nob.length) groups.push([groups.length?'Без блока':'Все дела',nob]);
    h+=groups.map(function(g){ return '<div class="lh"><b>'+esc(g[0])+'</b><small>'+g[1].length+'</small></div><div class="lav-list" style="margin-top:6px">'+g[1].map(function(t){return tdRow(t);}).join('')+'</div>'; }).join(''); }
  else if(rest.length) h+='<div class="lh"><b>Все дела</b><small>'+rest.length+'</small></div><div class="lav-list" style="margin-top:6px">'+rest.map(function(t){return tdRow(t);}).join('')+'</div>';
  if(done.length){
    h+='<div class="bought" style="background:#F7F7FE"><button class="lnk" style="color:var(--ink);font-size:14px;font-weight:700" data-a="show-tdone" aria-expanded="'+!!UI.showTdone+'">Готово · '+done.length+' '+ic(UI.showTdone?'up':'down').replace('class="i"','class="i" style="width:14px;height:14px;vertical-align:-2px"')+'</button><button class="lnk" data-a="clear-tdone" data-v="'+list+'">Очистить</button></div>';
    if(UI.showTdone) h+='<div class="lav-list">'+done.map(function(t){return tdRow(t,pers&&!cb);}).join('')+'</div><p class="muted" style="margin:6px 4px 0;font-size:12px;font-weight:600">Выполненные исчезают сами в 23:59.</p>';
  }
  return h;
}
function vTodoQuick(){
  var seg=UI.tseg||'shop', ph=seg==='shop'?'Что купить в «'+storeName(UI.store||'food')+'»…':seg==='work'?'Новая рабочая задача…':curBlk()?'Новое дело в «'+blkName(curBlk())+'»…':'Новое дело…';
  return '<div class="qa todo"><div class="qa-in"><div class="qa-field"><label for="td-add" class="sr">'+esc(ph)+'</label><input id="td-add" data-add="'+(seg==='shop'?'shop':'todo')+'" placeholder="'+esc(ph)+'" autocomplete="off" enterkeyhint="done"><button class="qa-go" data-a="add-go" data-for="td-add" aria-label="Добавить">'+ic('plus')+'</button></div></div></div>';
}
/* ---------- lists: films / series / books ---------- */
var LKINDS=[['films','film','Фильмы','Фильм','фильм'],['series','tv','Сериалы','Сериал','сериал'],['books','book','Книги','Книга','книгу']];
/* status per list: [want label, done label, done verb, date label, empty-done text] */
var LST={films:['Хочу посмотреть','Посмотрено','посмотрено','Когда посмотрела','Просмотренных фильмов пока нет.'],
  series:['Хочу посмотреть','Посмотрено','посмотрено','Когда посмотрела','Просмотренных сериалов пока нет.'],
  books:['Хочу прочитать','Прочитано','прочитано','Когда прочитала','Прочитанных книг пока нет.']};
function curBst(k){ return (UI.bsts||{})[k]||'want'; }
var LGENRES={
  films:['Драма','Комедия','Триллер','Фантастика','Ужасы','Мелодрама','Детектив','Мультфильм','Документальный'],
  series:['Драма','Комедия','Детектив','Триллер','Фантастика','Мелодрама','Ситком','Мини-сериал','Документальный'],
  books:['Совр. романтика','Ромфэнтези','Драмиона','Детектив','Спортивный роман','Фантастика']};
function lkind(k){ return LKINDS.find(function(x){return x[0]===k;})||LKINDS[0]; }
function lFind(id){ if(!id) return null; for(var i=0;i<LKINDS.length;i++){ var k=LKINDS[i][0], it=(S.lists[k]||[]).find(function(x){return x.id===id;}); if(it) return {k:k,it:it}; } return null; }
function splitG(s){ return String(s||'').split(',').map(function(x){return x.trim();}).filter(Boolean); }
function lGenres(list){ var seen={}, out=[]; list.forEach(function(it){ splitG(it.genre).forEach(function(g){ var k=g.toLowerCase(); if(!seen[k]){ seen[k]=1; out.push(g); } }); }); return out.sort(function(a,b){return a.localeCompare(b,'ru');}); }
function vLists(){
  var lk=UI.lk||'films', K=lkind(lk), all=S.lists[lk]||[];
  var h='<div class="lists-w"><header class="top"><div><div class="eyebrow">Посмотреть и прочитать</div><h1>Списки</h1></div>'+
    '<button class="plus" data-a="sheet-litem" aria-label="Добавить: '+K[4]+'">'+ic('plus')+'</button></header>';
  h+='<div class="l-seg" role="tablist">'+LKINDS.map(function(x){ var n=(S.lists[x[0]]||[]).length, on=lk===x[0];
    return '<button role="tab" aria-selected="'+on+'" class="'+(on?'on':'')+'" data-a="lk" data-v="'+x[0]+'">'+ic(x[1])+x[2]+(n?'<small>'+n+'</small>':'')+'</button>'; }).join('')+'</div>';
  var bst=curBst(lk), LS0=LST[lk];
  { var nW=all.filter(function(it){return (it.st||'want')==='want';}).length, nD=all.length-nW;
    h+='<div class="l-sub" role="tablist">'+[['want',LS0[0],nW],['done',LS0[1],nD]].map(function(x){ var on=bst===x[0];
      return '<button role="tab" aria-selected="'+on+'" class="'+(on?'on':'')+'" data-a="lbst" data-v="'+x[0]+'">'+x[1]+(x[2]?'<small>'+x[2]+'</small>':'')+'</button>'; }).join('')+'</div>';
    all=all.filter(function(it){return (it.st||'want')===bst;});
    if(bst==='done') all=all.slice().sort(function(a,b){ var A=a.doneAt||'', B=b.doneAt||''; return A<B?1:A>B?-1:0; }); }
  var gs=lGenres(all), gf=UI.lgenre&&gs.some(function(g){return g.toLowerCase()===UI.lgenre.toLowerCase();})?UI.lgenre:'';
  if(gs.length>1) h+='<div class="chips l-chips" role="group" aria-label="Жанр">'+[''].concat(gs).map(function(g){ var on=(gf||'').toLowerCase()===g.toLowerCase();
    return '<button class="chip'+(on?' on':'')+'" data-a="lgenre" data-v="'+esc(g)+'" aria-pressed="'+on+'">'+(g?esc(g):'Все жанры')+'</button>'; }).join('')+'</div>';
  if(!all.length) return h+'<div class="empty" style="margin-top:14px">'+(bst==='done'?LS0[4]+' Добавьте через «+» или откройте карточку из «'+LS0[0]+'» и отметьте «'+LS0[1]+'».':'Здесь пока пусто. Нажмите «+», чтобы добавить '+K[4]+': обложку, жанр и пару слов о нём.')+'</div></div>';
  var list=gf?all.filter(function(it){ return splitG(it.genre).some(function(g){return g.toLowerCase()===gf.toLowerCase();}); }):all;
  h+='<div class="lgrid">'+list.map(function(it){
    return '<button class="lcard" data-a="sheet-litem" data-id="'+it.id+'"><span class="lcover">'+(it.photo?anyImg(it.photo,'',''):'<span class="lph">'+ic(K[1])+esc(it.title)+'</span>')+'</span>'+
      '<b>'+esc(it.title)+'</b>'+(it.genre?'<span class="gtags">'+splitG(it.genre).map(function(g){return '<span class="gtag">'+esc(g)+'</span>';}).join('')+'</span>':'')+
      (bst==='done'&&it.doneAt?'<span class="ldate">'+ic('check')+LS0[2]+' '+fmtDone(it.doneAt)+'</span>':'')+
      (it.text?'<p>'+esc(it.text)+'</p>':'')+'</button>'; }).join('')+
    (gf?'':'<button class="l-add" data-a="sheet-litem">'+ic('plus')+'Добавить</button>')+'</div>';
  return h+'</div>';
}
function fmtDone(s){ var d=parseD(s); if(!d) return ''; return d.toLocaleDateString('ru-RU',d.getFullYear()===today0().getFullYear()?{day:'numeric',month:'long'}:{day:'numeric',month:'long',year:'numeric'}).replace(' г.',''); }
function lPhotoField(p){
  return '<div class="field"><span class="lbl">Обложка</span><div class="lph-wrap">'+
    (p?'<button class="lph-thumb" data-a="zoom" data-p="'+esc(p)+'" aria-label="Открыть обложку">'+anyImg(p,'','')+'</button>':'<span class="lph-thumb" aria-hidden="true">'+ic('image')+'</span>')+
    '<div class="ph-row"><button data-a="lphoto">'+ic('camera')+(p?'Заменить':'Добавить фото')+'</button>'+(p?'<button data-a="lphoto-rm">Убрать</button>':'')+'</div></div></div>';
}
function bookStatus(o,lk){ var LS1=LST[lk];
  var bs=UI.sheet.bst||(o?o.st||'want':curBst(lk)); UI.sheet.bst=bs;
  return '<div class="field"><span class="lbl">Статус</span><div class="radios">'+[['want',LS1[0]],['done',LS1[1]]].map(function(x){return '<label><input type="radio" name="f-bst" value="'+x[0]+'"'+(bs===x[0]?' checked':'')+'><span>'+x[1]+'</span></label>';}).join('')+'</div></div>'+
    (bs==='done'?field('f-done',LS1[3],(o&&o.doneAt)||iso(today0()),'date'):'');
}
function closeSheet(){ var s=UI.sheet; if(s&&s.type==='litem'&&s.photo&&s.photo!==s.orig) delPhoto(s.photo); UI.sheet=null; }

function go(r){ R=r; UI.sheet=null; render(); window.scrollTo(0,0); }
var toastT;
function toast(m,noRender){ if(!noRender) render(); var old=document.querySelector('.toast'); if(old) old.remove();
  var t=document.createElement('div'); t.className='toast'; t.setAttribute('role','status'); t.textContent=m; document.body.appendChild(t);
  clearTimeout(toastT); toastT=setTimeout(function(){ t.remove(); },2200); }

function vHome(){
  var month=today0().toLocaleDateString('ru-RU',{month:'long'});
  var list=S.events.slice().sort(function(a,b){return (a.date||'').localeCompare(b.date||'');});
  var up=list.filter(function(e){var n=daysUntil(e.date);return n===null||n>=0;}), past=list.filter(function(e){var n=daysUntil(e.date);return n!==null&&n<0;}).reverse();
  var show=UI.filter==='upcoming'?up:past;
  var h='<header class="top"><div><div class="eyebrow">'+esc(month)+'</div><h1>События</h1></div><div class="actions">'+
    '<button class="icon-btn idea-btn" data-a="nav" data-v="ideas" aria-label="Идеи, '+S.ideas.length+'">'+ic('bulb')+(S.ideas.length?'<em>'+S.ideas.length+'</em>':'')+'</button>'+
    '<button class="plus" data-a="sheet-event" aria-label="Новое событие">'+ic('plus')+'</button></div></header>';
  h+='<div class="chips" role="tablist"><button class="chip'+(UI.filter==='upcoming'?' on':'')+'" data-a="filter" data-v="upcoming">Ближайшие · '+up.length+'</button><button class="chip'+(UI.filter==='past'?' on':'')+'" data-a="filter" data-v="past">Прошедшие · '+past.length+'</button></div>';
  h+='<div class="stack">';
  if(!show.length) h+='<div class="empty">'+(UI.filter==='upcoming'?'Ближайших событий нет. Нажмите «+», чтобы создать первое.':'Прошедших событий пока нет.')+'</div>';
  show.forEach(function(e,i){
    var p=evProgress(e), m=money3(e);
    if(i===0&&UI.filter==='upcoming'){
      var hc=evC(e);
      h+='<button class="hero" data-a="open" data-id="'+e.id+'" style="background:'+hc.c1+';color:'+hc.t1+(e.cover?';overflow:hidden':'')+'">'+(e.cover?'<span class="hero-cover">'+img(e.cover,'','')+'</span>':'')+'<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span class="badge">'+untilText(e.date)+'</span><span class="tag">'+(e.size==='big'?'Большое':'Маленькое')+'</span>'+(e.sample?'<span class="tag">пример</span>':'')+'</div>'+
        '<div><h2>'+esc(e.title||'Без названия')+'</h2><div style="font-size:14px;font-weight:700;margin-top:4px">'+esc(fmtLong(e.date))+(e.time?' · '+esc(e.time):'')+'</div></div>'+
        '<div class="bar" style="background:'+(hc.t1==='#FFFFFF'?'rgba(255,255,255,.35)':'rgba(47,58,79,.15)')+'"><i style="width:'+pct(p.done,p.all)+'%;background:'+hc.t1+'"></i></div><div class="hero-meta num"><span>'+p.done+' из '+p.all+' готово</span><span>'+m.paid+' из '+m.people+' оплатили</span></div></button>';
    } else {
      var d=parseD(e.date);
      h+='<button class="ev" data-a="open" data-id="'+e.id+'"><span class="datebox" style="background:'+evC(e).tint1+'"><b class="num">'+(d?d.getDate():'—')+'</b><span>'+(d?d.toLocaleDateString('ru-RU',{month:'short'}).replace('.',''):'')+'</span></span>'+
        '<span class="t"><b>'+esc(e.title||'Без названия')+'</b><span>'+(e.size==='big'?'Большое':'Маленькое')+' · '+p.done+' из '+p.all+' готово'+(e.sample?' · пример':'')+'</span></span>'+ic('send').replace('class="i"','class="i" style="width:18px;height:18px"')+'</button>';
    }
  });
  return h+'</div>';
}

function vEvent(){
  var e=ev(), p=evProgress(e), m=money3(e);
  var h=(e.cover?'<div class="cover">'+img(e.cover,'','Обложка события')+'<button class="cover-btn" data-a="photo" data-target="cover" data-id="'+e.id+'">Изменить обложку</button></div>':'')+'<div class="hdr"><div class="hdr-row"><button class="round" data-a="home" aria-label="К списку событий">'+ic('back')+'</button>'+
    '<div style="display:flex;gap:8px;align-items:center"><span class="badge">'+untilText(e.date)+'</span>'+(e.cover?'':'<button class="round" data-a="photo" data-target="cover" data-id="'+e.id+'" aria-label="Добавить обложку">'+ic('image')+'</button>')+'<button class="round" data-a="sheet-event" data-id="'+e.id+'" aria-label="Изменить событие">'+ic('edit')+'</button></div></div>'+
    '<div><h1>'+esc(e.title||'Без названия')+'</h1><div class="sub">'+esc(fmtLong(e.date))+(e.time?' · '+esc(e.time):'')+' · '+p.done+' из '+p.all+' готово</div></div>'+
    '<div class="bar" style="background:'+(evC(e).t1==='#FFFFFF'?'rgba(255,255,255,.35)':'rgba(47,58,79,.15)')+'"><i style="width:'+pct(p.done,p.all)+'%;background:var(--ev1-t)"></i></div></div>';
  var wide=isWide(), curK=wide?(R.k&&(R.k==='guests'||R.k==='budget'||secById(e,R.k))?R.k:(e.sections[0]?e.sections[0].id:'guests')):null;
  SEL=curK;
  if(wide){ R.k=curK; return h+vEventWide(e,curK); }
  h+='<div class="secrows">';
  e.sections.forEach(function(s){ var q=secItems(e,s.id);
    h+=srow(s.icon||'custom',s.name,pct(q.done,q.all),q.all?q.done+' / '+q.all:'пусто',s.id); });
  h+=srow('guests','Гости',pct(m.paid,m.people),m.people?m.paid+' / '+m.people+' оплатили':'нет гостей','guests');
  h+=srow('budget','Бюджет',pct(m.spent,e.budget),e.budget?money(m.spent)+' / '+money(e.budget).replace('$ ',''):money(m.spent),'budget');
  h+='<button class="srow-add" data-a="sheet-section">+ Раздел</button></div>';
  var up=e.tasks.filter(function(t){return !t.done;}).sort(function(a,b){ return (a.date||'9999')<(b.date||'9999')?-1:(a.date||'9999')>(b.date||'9999')?1:0; }).slice(0,3);
  if(up.length){
    h+='<div class="block"><div class="block-h"><h3>Ближайшие задачи</h3></div><div class="list">'+up.map(function(t){ var s=secById(e,t.sec);
      return '<div class="row"><button class="ck" data-a="tick" data-t="task" data-id="'+t.id+'" aria-pressed="false" aria-label="Отметить: '+esc(t.title)+'"><svg viewBox="0 0 24 24"><path d="'+IC.check+'"></path></svg></button>'+
        '<button class="t" data-a="sec" data-k="'+t.sec+'">'+esc(t.title)+'</button><span class="r">'+esc((s?s.name:'')+(t.date?' · '+fmtShort(t.date):''))+'</span></div>'; }).join('')+'</div></div>';
  }
  return h;
}
function upBlock(e){
  var up=e.tasks.filter(function(t){return !t.done;}).sort(function(a,b){ return (a.date||'9999')<(b.date||'9999')?-1:(a.date||'9999')>(b.date||'9999')?1:0; }).slice(0,5);
  if(!up.length) return '';
  return '<div class="block" style="margin-top:12px"><div class="block-h"><h3>Ближайшие задачи</h3></div><div class="list">'+up.map(function(t){ var s=secById(e,t.sec);
    return '<div class="row"><button class="ck" data-a="tick" data-t="task" data-id="'+t.id+'" aria-pressed="false" aria-label="Отметить: '+esc(t.title)+'"><svg viewBox="0 0 24 24"><path d="'+IC.check+'"></path></svg></button>'+
      '<span style="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px"><button class="t" style="padding:0" data-a="sec" data-k="'+t.sec+'">'+esc(t.title)+'</button><span class="muted" style="font-size:12px;font-weight:700">'+esc((s?s.name:'')+(t.date?' · '+fmtShort(t.date):''))+'</span></span></div>'; }).join('')+'</div></div>';
}
function vEventWide(e,curK){
  var h='<div class="tabs" role="tablist">'+allKeys(e).map(function(k){
    var s=secById(e,k), name=s?s.name:(k==='guests'?'Гости':'Бюджет'), icon=s?(s.icon||'custom'):k, on=k===curK;
    return '<button class="tab'+(on?' on':'')+'" role="tab" aria-selected="'+on+'" data-a="sec" data-k="'+k+'">'+ic(icon)+esc(name)+'</button>';
  }).join('')+'<button class="tab add" data-a="sheet-section">+ Раздел</button></div>';
  return h+'<div style="min-width:0;max-width:820px">'+secBody(e,curK)+'</div>';
}
var SEL=null;
var SUB={}; try{ SUB=JSON.parse(localStorage.getItem('planner.sub')||'{}')||{}; }catch(e){ SUB={}; }
function srow(icon,name,w,count,key){
  return '<button class="srow'+(SEL===key?' on':'')+'" data-a="sec" data-k="'+key+'"'+(SEL===key?' aria-current="true"':'')+'><span class="ibox">'+ic(icon)+'</span><span class="mid"><span class="top1"><b>'+esc(name)+'</b><small class="num">'+esc(count)+'</small></span><span class="thin"><i style="width:'+w+'%"></i></span></span>'+
    ic('next').replace('class="i"','class="i" style="width:18px;height:18px;color:#9AA1AF"')+'</button>';
}
function tile(tone,icon,name,w,small,a,key){
  return '<button class="tile '+tone+'" data-a="'+a+'" data-k="'+key+'"><span class="head"><span class="ibox">'+ic(icon)+'</span><b>'+esc(name)+'</b></span>'+
    '<span style="display:flex;flex-direction:column;gap:6px"><span class="bar"><i style="width:'+w+'%"></i></span><small class="num">'+esc(small)+'</small></span></button>';
}
var RULES=[[/зон[аеуы]|квест|станци|аттракц|мастерск/i,'zones'],[/шар|свеч|гирлянд|скатер|цвет|постер|фотозон|ваз|декор|подуш|баннер|салфет/i,'decor'],[/багет|сыр|вин|торт|продукт|сидр|лимонад|еда|меню|ингредиент|пекарн|напит|закуск|десерт|готов/i,'food'],[/фильм|проектор|музык|вопрос|лото|звук|плейлист|сценар|ведущ|конкурс|игр/i,'program']];
function suggest(e,text){
  if(!text.trim()) return null;
  for(var i=0;i<RULES.length;i++){ if(RULES[i][0].test(text)){ var k=RULES[i][1]; var s=e.sections.find(function(x){return x.icon===k||x.kind===k;}); if(s) return s.id; } }
  var low=text.toLowerCase(); var named=e.sections.find(function(s){return low.indexOf(s.name.toLowerCase())>=0;}); if(named) return named.id;
  if(S.lastCat&&secById(e,S.lastCat)) return S.lastCat;
  return e.sections[0]&&e.sections[0].id;
}
function vChips(){ var e=ev(); var sg=suggest(e,UI.quick);
  return e.sections.map(function(s){ return '<button class="chip'+(s.id===sg?' sug':'')+'" data-a="qa-pick" data-k="'+s.id+'">'+esc(s.name)+'</button>'; }).join(''); }
function vQuick(){
  return '<div class="qa"><div class="qa-in"><div class="qa-field"><label for="qa" class="sr">Быстро добавить задачу</label><input id="qa" autocomplete="off" placeholder="Добавить задачу…" value="'+esc(UI.quick)+'"><button class="qa-go" data-a="qa-add" aria-label="Добавить">'+ic('plus')+'</button></div><div class="chips" id="qa-chips">'+vChips()+'</div></div></div>';
}

function vSwitcher(e){
  var keys=allKeys(e);
  return '<div class="seg">'+keys.map(function(k){
    var s=secById(e,k), name=s?s.name:(k==='guests'?'Гости':'Бюджет'), icon=s?(s.icon||'custom'):k;
    return '<button class="'+(k===R.k?'on ':'')+secTone(e,k)+'" data-a="sec" data-k="'+k+'" aria-current="'+(k===R.k)+'"><span class="c">'+ic(icon)+'</span>'+esc(name)+'</button>';
  }).join('')+'</div>';
}
function vSection(){
  var e=ev(); SEL=null;
  return '<button class="pill" data-a="open" data-id="'+e.id+'">'+ic('back')+'<span>'+esc(e.title)+'</span></button>'+vSwitcher(e)+secBody(e,R.k);
}
function secBody(e,k){
  var h='';
  if(k==='guests') return vGuests(e);
  if(k==='budget') return vBudget(e);
  var s=secById(e,k); if(!s){ R.k='guests'; return vGuests(e); }
  var tone=secTone(e,k), q=secItems(e,k);
  h+='<div class="sec-card '+tone+'"><div class="row1"><h1>'+esc(s.name)+'</h1><small class="num">'+q.done+' из '+q.all+' готово</small></div><div class="bar"><i style="width:'+pct(q.done,q.all)+'%"></i></div></div>';
  var tasks=e.tasks.filter(function(t){return t.sec===k;}).sort(function(a,b){return (a.done-b.done)||((a.date||'9')>(b.date||'9')?1:-1);});
  var buys0=e.buys.filter(function(b){return b.sec===k;});
  var tabs=['insp']; if(s.kind==='food') tabs.push('menu'); if(s.kind==='zones') tabs.push('zones'); tabs.push('tasks','buy'); if(s.kind==='decor') tabs.push('store');
  var cur=SUB[k]; if(tabs.indexOf(cur)<0){ var dn=daysUntil(e.date); cur=(dn!==null&&dn>14)?'insp':'tasks'; }
  var dn2=function(a){return a.filter(function(x){return x.done;}).length;};
  var cnt={insp:String(e.insp.filter(function(x){return x.sec===k;}).length||''),tasks:tasks.length?dn2(tasks)+'/'+tasks.length:'',buy:buys0.length?dn2(buys0)+'/'+buys0.length:'',
    store:e.storeUse.length?dn2(e.storeUse)+'/'+e.storeUse.length:'',menu:String(e.dishes.length||''),zones:String(e.zones.filter(function(z){return z.sec===k;}).length||'')};
  var LAB={insp:'Вдохновение',tasks:'Задачи',buy:'Купить',store:'Склад',menu:'Меню',zones:'Зоны'};
  h+='<div class="subtabs" role="tablist">'+tabs.map(function(t){ return '<button role="tab" aria-selected="'+(t===cur)+'" class="'+(t===cur?'on':'')+'" data-a="sub" data-k="'+k+'" data-v="'+t+'">'+LAB[t]+(cnt[t]?'<span class="num">'+cnt[t]+'</span>':'')+'</button>'; }).join('')+'</div>';
  if(cur==='insp') h+=inspBlock(e,k);
  if(cur==='tasks') h+=block('Задачи',tasks.filter(function(t){return t.done;}).length+' из '+tasks.length,
    tasks.map(function(t){ return row(t.done,'task',t.id,t.title,t.date?fmtShort(t.date):''); }).join('')+addRow('add-task-'+k,'task','Новая задача…'),'task');
  if(cur==='menu'){
    h+='<div class="block"><div class="block-h"><h3>Меню</h3><small>'+e.dishes.length+' '+plural(e.dishes.length,['блюдо','блюда','блюд'])+' · на '+(people(e.guests)||e.seats||0)+' чел.</small></div>';
    e.dishes.forEach(function(d){
      h+='<div class="dish"><div class="dish-h"><button data-a="sheet-dish" data-id="'+d.id+'">'+esc(d.name)+'</button><span class="mini have">'+esc(d.type||'Блюдо')+'</span></div><div class="list">'+
        d.ing.map(function(g){ var lab=g.st==='have'?'есть':g.st==='listed'?'в покупках':'купить';
          return '<div class="row"><span class="t">'+esc(g.name)+(g.qty?' <span class="muted">· '+esc(g.qty)+'</span>':'')+'</span><button class="mini '+g.st+'" data-a="ing" data-d="'+d.id+'" data-id="'+g.id+'">'+lab+'</button></div>'; }).join('')+
        addRow('add-ing-'+d.id,'ing','Ингредиент, количество',d.id)+'</div>'+
        (d.ing.some(function(g){return g.st==='buy';})?'<button class="link-btn" data-a="ing-to-buy" data-id="'+d.id+'">Недостающее — в покупки</button>':'')+'</div>';
    });
    h+='<button class="soft-btn" data-a="sheet-dish">+ Блюдо</button></div>';
  }
  if(cur==='zones'){
    var zs=e.zones.filter(function(z){return z.sec===k;});
    h+='<div class="block"><div class="block-h"><h3>Зоны</h3><small>'+zs.length+'</small></div>';
    zs.forEach(function(z){
      h+='<div class="dish"><div class="dish-h"><button data-a="sheet-zone" data-id="'+z.id+'">'+esc(z.name)+'</button>'+(z.owner?'<span class="mini have">'+esc(z.owner)+'</span>':'')+'</div>'+(z.desc?'<p class="zone-d">'+esc(z.desc)+'</p>':'')+'<div class="list">'+
        z.props.map(function(g){ var lab={have:'есть',store:'со склада',buy:'купить',listed:'в покупках'}[g.st]||'купить';
          return '<div class="row"><span class="t">'+esc(g.name)+(g.qty?' <span class="muted">· '+esc(g.qty)+'</span>':'')+'</span><button class="mini '+g.st+'" data-a="prop" data-z="'+z.id+'" data-id="'+g.id+'">'+lab+'</button></div>'; }).join('')+
        addRow('add-prop-'+z.id,'prop','Реквизит, количество',z.id)+'</div>'+
        (z.props.some(function(g){return g.st==='buy';})?'<button class="link-btn" data-a="prop-to-buy" data-id="'+z.id+'">Недостающее — в покупки</button>':'')+'</div>';
    });
    h+='<button class="soft-btn" data-a="sheet-zone">+ Зона</button></div>';
  }
  var buys=e.buys.filter(function(b){return b.sec===k;}).sort(function(a,b){return a.done-b.done;});
  var bs=buys.filter(function(b){return b.done;}).reduce(function(a,b){return a+(b.price||0);},0);
  if(cur==='buy') h+=block('Купить',bs?'потрачено '+money(bs):buys.length?buys.filter(function(b){return b.done;}).length+' из '+buys.length:'',
    buys.map(function(b){ return row(b.done,'buy',b.id,b.title,b.price?money(b.price):''); }).join('')+addRow('add-buy-'+k,'buy','Что купить… можно с ценой'),'buy');
  if(cur==='store'){
    var u=e.storeUse;
    h+=block('Со склада','собрано '+u.filter(function(x){return x.done;}).length+' из '+u.length,
      u.map(function(x){ var it=storeItem(x.storeId); return row(x.done,'use',x.id,it.name,'× '+x.qty+' из '+it.qty); }).join('')+
      '<div class="addrow"><span class="dash sq"></span><button class="link-btn" data-a="sheet-store" style="color:var(--g-text)">Выбрать со склада…</button></div>','store');
  }
  h+='<div style="display:flex;gap:8px;margin-top:20px"><button class="soft-btn" style="flex:1" data-a="sheet-section" data-id="'+s.id+'">Изменить раздел</button></div>';
  return h;
}
var STATES={think:'думаю',yes:'берём',no:'не берём'};
function inspBlock(e,k){
  var all=e.insp.filter(function(x){return x.sec===k;}), f=UI.ifl||'all', cnt={think:0,yes:0,no:0};
  all.forEach(function(x){ cnt[x.state]=(cnt[x.state]||0)+1; });
  var list=all.filter(function(x){ return f==='all'||x.state===f; });
  var h='<div class="block k-insp"><div class="block-h"><h3><span class="bh-ic">'+ic('bulb')+'</span>Вдохновение</h3><small>'+(all.length||'')+'</small></div>';
  h+='<div class="insp-add"><label class="sr" for="add-insp-'+k+'">Идея или ссылка</label><input id="add-insp-'+k+'" data-add="insp" placeholder="Идея или ссылка…" autocomplete="off" enterkeyhint="done"><button class="add-go" data-a="add-go" data-for="add-insp-'+k+'">Добавить</button><button class="ph-btn" data-a="photo" data-target="insp-new" data-sec="'+k+'" aria-label="Добавить фото">'+ic('camera')+'</button></div>';
  if(all.length>1) h+='<div class="chips">'+[['all','Все',all.length],['think','Думаю',cnt.think],['yes','Берём',cnt.yes],['no','Не берём',cnt.no]].map(function(c){ return '<button class="chip'+(f===c[0]?' on':'')+'" data-a="ifl" data-v="'+c[0]+'">'+c[1]+' · '+c[2]+'</button>'; }).join('')+'</div>';
  if(list.length) h+='<div class="insp-grid">'+list.map(inspCard).join('')+'</div>';
  else if(!all.length) h+='<p class="muted" style="margin:2px 0 0;font-size:13px;font-weight:600;line-height:1.45">Сюда — референсы, ссылки, фото и мысли. Когда идея созреет, превратите её в задачу.</p>';
  return h+'</div>';
}
function inspCard(c){
  var dom=''; if(c.url){ try{ dom=new URL(c.url).hostname.replace(/^www\./,''); }catch(x){ dom=c.url; } }
  return '<button class="insp '+c.state+'" data-a="sheet-insp" data-id="'+c.id+'">'+(c.photo?img(c.photo,'insp-img',''):'')+
    (c.text?'<span class="insp-t">'+esc(c.text)+'</span>':'')+(dom?'<span class="insp-l">'+ic('link')+esc(dom)+'</span>':'')+
    '<span class="insp-f"><span class="st">'+STATES[c.state]+'</span>'+(c.taskId?'<span class="st task">в задачах</span>':'')+'</span></button>';
}
var KIND={task:['k-task','tasks',''],buy:['k-buy','cart','buy'],store:['k-store','box','store']};
function block(title,meta,inner,kind){ var k=KIND[kind||'task']; return '<div class="block '+k[0]+'"><div class="block-h"><h3><span class="bh-ic">'+ic(k[1])+'</span>'+esc(title)+'</h3><small class="num">'+esc(meta||'')+'</small></div><div class="list '+k[2]+'">'+inner+'</div></div>'; }
function row(done,type,id,title,right){
  var sq=(type==='buy'||type==='use')?' sq':'', rc=type==='buy'?' price':type==='use'?' qty':'';
  return '<div class="row"><button class="ck'+sq+(done?' on':'')+'" data-a="tick" data-t="'+type+'" data-id="'+id+'" aria-pressed="'+!!done+'" aria-label="'+(done?'Снять отметку':'Отметить')+': '+esc(title)+'"><svg viewBox="0 0 24 24"><path d="'+IC.check+'"></path></svg></button>'+
    '<button class="t'+(done?' done':'')+'" data-a="sheet-'+type+'" data-id="'+id+'">'+esc(title)+'</button>'+(right?'<span class="r num'+rc+'">'+esc(right)+'</span>':'')+'</div>';
}
function addRow(id,type,ph,extra){ return '<div class="addrow"><span class="dash'+(type==='buy'||type==='store'?' sq':'')+'"></span><label for="'+id+'" class="sr">'+esc(ph)+'</label><input id="'+id+'" data-add="'+type+'"'+(extra?' data-x="'+extra+'"':'')+' placeholder="'+esc(ph)+'" autocomplete="off" enterkeyhint="done"><button class="add-go" data-a="add-go" data-for="'+id+'">Добавить</button></div>'; }

var AVA=['var(--o-tint)','var(--g-tint)','#FFFFFF'];
function vGuests(e){
  var m=money3(e), conf=people(e.guests.filter(function(g){return g.conf;})), confE=e.guests.filter(function(g){return g.conf;}).length;
  var h='<div class="stats"><div class="stat" style="background:var(--ev1);color:var(--ev1-t)"><b class="num">'+m.people+(e.seats?'<span style="font-size:14px">/'+e.seats+'</span>':'')+'</b><span>'+(e.seats?'мест занято':'гостей')+'</span></div>'+
    '<div class="stat" style="background:var(--surface)"><b class="num">'+conf+'</b><span>подтвердили</span></div><div class="stat" style="background:var(--o-tint)"><b class="num">'+m.paid+'</b><span>оплатили</span></div></div>';
  h+='<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:14px"><span style="font-size:14px;font-weight:700" class="muted">Участие — <b style="color:var(--ink)">'+money(e.price)+'</b> с человека</span><button class="link-btn" data-a="sheet-event" data-id="'+e.id+'">Изменить</button></div>';
  var unpaid=e.guests.filter(function(g){return !g.paid;}).length, noans=e.guests.length-confE;
  h+='<div class="chips" style="margin-top:8px"><button class="chip'+(UI.gfilter==='all'?' on':'')+'" data-a="gfilter" data-v="all">Все</button><button class="chip'+(UI.gfilter==='unpaid'?' on':'')+'" data-a="gfilter" data-v="unpaid">Не оплатили · '+unpaid+'</button><button class="chip'+(UI.gfilter==='noans'?' on':'')+'" data-a="gfilter" data-v="noans">Нет ответа · '+noans+'</button></div>';
  var list=e.guests.filter(function(g){ return UI.gfilter==='all'||(UI.gfilter==='unpaid'&&!g.paid)||(UI.gfilter==='noans'&&!g.conf); });
  h+='<div class="stack guests-grid">';
  if(!e.guests.length) h+='<div class="empty">Гостей пока нет. Нажмите «Добавить гостя».</div>';
  list.forEach(function(g,i){
    var tg=(g.tg||'').replace(/^@/,'');
    h+='<div class="guest"><div class="guest-top"><span class="ava" style="background:'+AVA[i%3]+'">'+esc((g.name||'?')[0])+'</span><div class="tg-row" style="flex:1"><button class="t" data-a="sheet-guest" data-id="'+g.id+'"><b>'+esc(g.name)+(gN(g)>1?' <span class="plus1">+'+(gN(g)-1)+'</span>':'')+'</b>'+(g.with?'<span class="muted" style="font-size:12px;font-weight:700;display:block">с '+esc(g.with)+'</span>':'')+'</button>'+
      (tg?'<a href="https://t.me/'+encodeURIComponent(tg)+'" target="_blank" rel="noopener">'+ic('tg').replace('class="i"','class="i" style="width:13px;height:13px"')+'@'+esc(tg)+'</a>':'<span class="muted" style="font-size:13px;font-weight:600">без Telegram</span>')+'</div></div>'+
      '<div class="toggles"><button class="tog'+(g.conf?' on':'')+'" data-a="gconf" data-id="'+g.id+'" aria-pressed="'+!!g.conf+'"><svg viewBox="0 0 24 24"><path d="'+(g.conf?IC.dbl:IC.user)+'"></path></svg>'+(g.conf?'Придёт':'Ждём ответа')+'</button>'+
      '<button class="tog'+(g.paid?' on':'')+'" data-a="gpaid" data-id="'+g.id+'" aria-pressed="'+!!g.paid+'"><svg viewBox="0 0 24 24"><path d="'+(g.paid?IC.dbl:IC.money)+'"></path></svg>'+(g.paid?'Оплачено':'Ждём оплату')+'</button></div></div>';
  });
  h+='<button class="o-btn" data-a="sheet-guest">+ Добавить гостя</button></div>';
  return h;
}
var SEC_COL=['var(--o)','var(--g)','#E7C36A','var(--ink)','#9DB7D8','#D98BA3'];
function vBudget(e){
  var m=money3(e), profit=m.collected-m.spent, fut=m.expected-m.spent;
  var h='<div class="money"><div><div class="cap">Прибыль сейчас</div><div class="big num">'+(profit>=0?'+':'')+money(profit)+'</div><div style="font-size:13px;font-weight:700;margin-top:2px">если все оплатят: '+(fut>=0?'+':'')+money(fut)+'</div></div>'+
    '<div class="grid num"><div>Собрано<b style="font-size:16px">'+money(m.collected)+' <span style="font-weight:600">/ '+money(m.expected).replace('$ ','')+'</span></b><span class="bar"><i style="width:'+pct(m.collected,m.expected)+'%"></i></span></div>'+
    '<div>Потрачено<b style="font-size:16px">'+money(m.spent)+(e.budget?' <span style="font-weight:600">/ '+money(e.budget).replace('$ ','')+'</span>':'')+'</b><span class="bar"><i style="width:'+pct(m.spent,e.budget||m.spent)+'%"></i></span></div></div></div>';
  var keys=Object.keys(m.map);
  if(keys.length){
    h+='<div class="block"><div class="block-h"><h3>Куда ушли деньги</h3></div><div class="stackbar">';
    keys.forEach(function(k,i){ h+='<i style="flex:'+m.map[k]+';background:'+SEC_COL[i%SEC_COL.length]+'"></i>'; });
    h+='</div><div class="legend num">';
    keys.forEach(function(k,i){ var s=secById(e,k); h+='<span><i style="background:'+SEC_COL[i%SEC_COL.length]+'"></i>'+esc(s?s.name:'Другое')+' '+money(m.map[k])+'</span>'; });
    h+='</div></div>';
  }
  var rows=[];
  e.buys.filter(function(b){return b.done&&b.price;}).forEach(function(b){ var s=secById(e,b.sec); rows.push({t:b.title,sub:(s?s.name:'')+' · из покупок'+(b.photo?' · есть чек':''),a:b.price,type:'buy',id:b.id}); });
  e.expenses.forEach(function(x){ var s=secById(e,x.sec); rows.push({t:x.title,sub:(s?s.name:'Другое')+' · расход'+(x.photo?' · есть чек':''),a:x.amount,type:'expense',id:x.id}); });
  h+='<div class="block"><div class="block-h"><h3>Расходы</h3><small>'+rows.length+'</small></div><div class="list">'+
    (rows.length?rows.map(function(r){ return '<div class="row"><button class="t" data-a="sheet-'+r.type+'" data-id="'+r.id+'">'+esc(r.t)+'<br><span class="muted" style="font-size:12px;font-weight:700">'+esc(r.sub)+'</span></button><span class="r num" style="color:var(--ink);font-size:14px">'+money(r.a)+'</span></div>'; }).join(''):'<div class="row"><span class="t muted">Отмеченные покупки с ценой появятся здесь сами</span></div>')+
    '</div><button class="o-btn" data-a="sheet-expense" style="margin-top:6px">+ Добавить расход</button></div>';
  return h;
}

function vSettings(){
  var h='<header class="top"><div><div class="eyebrow">Настройки</div><h1>Аккаунт</h1></div></header>';
  if(!sb){
    h+='<div class="card" style="background:var(--g-tint)"><div style="display:flex;gap:12px;align-items:center"><span class="ibox" style="color:var(--g-deep)">'+ic('cloud')+'</span><b>'+(PREVIEW?'Это пробная версия':'Облако недоступно')+'</b></div><p>'+(PREVIEW?'Вход и синхронизация работают в установленном приложении. Здесь данные хранятся только в этом браузере.':'Не удалось загрузить облако. Проверьте интернет и откройте приложение заново.')+'</p></div>';
  } else if(!USER){
    h+='<div class="card" style="background:var(--g-tint)"><div style="display:flex;gap:12px;align-items:center"><span class="ibox" style="color:var(--g-deep)">'+ic('cloud')+'</span><b>Войдите, чтобы данные были на iPhone и Mac</b></div>'+
      '<div class="field"><label for="acc-email">Почта</label><input id="acc-email" type="email" autocomplete="email" autocapitalize="off" style="background:#fff"></div>'+
      '<div class="field"><label for="acc-pass">Пароль</label><input id="acc-pass" type="password" autocomplete="current-password" style="background:#fff" placeholder="не короче 6 символов"></div>'+
      '<p id="auth-msg" role="status" style="color:var(--o-text)">'+esc(UI.authMsg||'')+'</p>'+
      '<button class="g-btn" data-a="sign-in">Войти</button><button class="soft-btn" style="background:#fff" data-a="sign-up">Создать аккаунт</button></div>';
  } else {
    h+='<div class="card" style="background:var(--g-tint)"><div style="display:flex;gap:12px;align-items:center"><span class="ibox" style="color:var(--g-deep)">'+ic('cloud')+'</span><div style="display:flex;flex-direction:column;gap:2px;min-width:0"><b>Синхронизация включена</b><span id="sync-status" role="status" style="font-size:13px;font-weight:700;color:var(--soft)">'+esc(syncText())+'</span></div></div>'+
      '<p>Вы вошли как <b style="color:var(--ink)">'+esc(USER.email)+'</b>. Изменения сохраняются в облако сами, через секунду после правки.</p>'+
      '<button class="g-btn" data-a="sync-now">Синхронизировать сейчас</button><button class="soft-btn" style="background:#fff" data-a="sign-out">Выйти</button></div>';
  }
  h+='<div class="block"><div class="block-h"><h3>Склад декора</h3><small>'+S.store.length+' предметов</small></div><div class="list">'+
    S.store.map(function(s){ return '<div class="store-row"><b>'+esc(s.name)+'</b><button class="step" data-a="sq" data-id="'+s.id+'" data-v="-1" aria-label="Меньше">−</button><span class="num" style="min-width:26px;text-align:center;font-weight:800">'+s.qty+'</span><button class="step" data-a="sq" data-id="'+s.id+'" data-v="1" aria-label="Больше">+</button></div>'; }).join('')+
    addRow('add-store','store','Новый предмет, количество')+'</div></div>';
  h+='<div class="block"><div class="block-h"><h3>Резервная копия</h3></div><div class="card" style="margin-top:0"><p>Скопируйте все данные текстом и сохраните в заметках — на всякий случай.</p><button class="soft-btn" style="background:#fff" data-a="backup">Скопировать данные</button><button class="soft-btn" style="background:#fff" data-a="sheet-restore">Восстановить из копии</button></div></div>';
  if(S.events.some(function(e){return e.sample;})||S.ideas.some(function(x){return x.sample;})) h+='<button class="danger" style="margin-top:12px;width:100%" data-a="del-samples">Удалить примеры событий</button>';
  return '<div class="settings-w">'+h+'</div>';
}

/* ---------- sheets ---------- */
function field(id,label,val,type,ph,extra){ return '<div class="field"><label for="'+id+'">'+label+'</label><input id="'+id+'" type="'+(type||'text')+'" value="'+esc(val==null?'':val)+'"'+(ph?' placeholder="'+esc(ph)+'"':'')+(extra||'')+'></div>'; }
function secSelect(e,cur){ return '<div class="field"><label for="f-sec">Раздел</label><select id="f-sec">'+e.sections.map(function(s){return '<option value="'+s.id+'"'+(s.id===cur?' selected':'')+'>'+esc(s.name)+'</option>';}).join('')+'</select></div>'; }
function swatches(name,cur){ cur=String(cur||'').toLowerCase(); var inPal=PAL.some(function(p){return p[0].toLowerCase()===cur;});
  return '<div class="sw" role="radiogroup">'+PAL.map(function(p){ return '<label title="'+p[1]+'"><input type="radio" name="'+name+'" value="'+p[0]+'"'+(p[0].toLowerCase()===cur?' checked':'')+' aria-label="'+p[1]+'"><span style="background:'+p[0]+'"></span></label>'; }).join('')+
    '<label class="sw-c" title="Свой цвет"><input type="radio" name="'+name+'" value="custom"'+(inPal?'':' checked')+' aria-label="Свой цвет"><span><input type="color" id="'+name+'-x" value="'+(inPal?'#8b5e3c':cur)+'" aria-label="Выбрать свой цвет"></span></label></div>'; }
function pickColor(name){ var v=radio(name); if(v==='custom'){ var x=document.getElementById(name+'-x'); return x?x.value:''; } return v; }
function updPrev(){ var pv=document.getElementById('sw-prev'); if(!pv) return; var c=evC({c1:pickColor('f-c1'),c2:pickColor('f-c2')}); pv.style.background=c.c1; pv.style.color=c.t1; var b=pv.querySelector('b'); b.style.background=c.c2; b.style.color=c.t2; }
function sheetWrap(title,body,saveLabel,del){
  return '<div class="backdrop" data-a="close-bg"><div class="sheet" role="dialog" aria-modal="true" aria-label="'+esc(title)+'"><div class="sheet-h"><h2>'+esc(title)+'</h2><button class="x" data-a="close" aria-label="Закрыть">'+ic('x')+'</button></div>'+body+
    (saveLabel?'<button class="primary" data-a="save">'+saveLabel+'</button>':'')+(del?'<button class="danger" data-a="del" data-confirm="0">'+del+'</button>':'')+'</div></div>';
}
function vSheet(){
  var t=UI.sheet.type, e=ev(), id=UI.sheet.id, o;
  if(t==='event'){
    o=id?S.events.find(function(x){return x.id===id;}):null;
    var b=field('f-title','Название',o?o.title:'','text','Киноужин, лото, МК…')+'<div class="two">'+field('f-date','Дата',o?o.date:isoPlus(14),'date')+field('f-time','Время',o?o.time:'19:00','time')+'</div>'+
      '<div class="field"><span class="lbl">Размер</span><div class="radios"><label><input type="radio" name="f-size" value="small"'+(!o||o.size!=='big'?' checked':'')+'><span>Маленькое</span></label><label><input type="radio" name="f-size" value="big"'+(o&&o.size==='big'?' checked':'')+'><span>Большое</span></label></div></div>'+
      '<div class="two">'+field('f-price','Цена участия, $',o?o.price||'':'','number','1500',' inputmode="numeric"')+field('f-seats','Мест',o?o.seats||'':'','number','16',' inputmode="numeric"')+'</div>'+
      field('f-budget','Лимит расходов, $',o?o.budget||'':'','number','10000',' inputmode="numeric"');
    if(!o&&S.events.length) b+='<div class="field"><label for="f-copy">Взять за основу</label><select id="f-copy"><option value="">Начать с чистого листа</option>'+S.events.map(function(x){return '<option value="'+x.id+'">'+esc(x.title||'Без названия')+' — задачи, покупки, меню</option>';}).join('')+'</select></div>';
    var ec=evC(o);
    b+='<div class="field"><span class="lbl">Основной цвет — шапка, главная, календарь</span>'+swatches('f-c1',ec.c1)+'</div>'+
      '<div class="field"><span class="lbl">Акцент — кнопки, вкладки, галочки</span>'+swatches('f-c2',ec.c2)+'</div>'+
      '<div class="sw-prev" id="sw-prev" style="background:'+ec.c1+';color:'+ec.t1+'">Так будет выглядеть<b style="background:'+ec.c2+';color:'+ec.t2+'">Кнопка</b></div>';
    if(o) b+=photoField('cover',o.id,o.cover,'Обложка');
    return sheetWrap(o?'Событие':'Новое событие',b,o?'Сохранить':'Создать событие',o?'Удалить событие':'');
  }
  if(t==='shop'){ o=S.shop.find(function(x){return x.id===id;});
    return sheetWrap('Покупка',field('f-title','Что купить',o.name)+field('f-qty','Сколько',o.qty,'text','2 шт, 1 кг…')+
      '<div class="field"><span class="lbl">Где</span><div class="radios">'+STORES.map(function(x){return '<label><input type="radio" name="f-store" value="'+x[0]+'"'+(o.store===x[0]?' checked':'')+'><span>'+x[1]+'</span></label>';}).join('')+'</div></div>','Сохранить','Удалить'); }
  if(t==='todo'){ o=S.todos.find(function(x){return x.id===id;});
    var sb2='<div class="field"><span class="lbl">Подзадачи</span><div class="lav-list" style="margin-top:0">'+(o.subs||[]).map(function(x){ return '<div class="row"><button class="ck sq'+(x.done?' on':'')+'" data-a="sub-tick" data-t="'+o.id+'" data-id="'+x.id+'" aria-pressed="'+!!x.done+'" aria-label="Отметить: '+esc(x.title)+'"><svg viewBox="0 0 24 24"><path d="'+IC.check+'"></path></svg></button><span class="t'+(x.done?' done':'')+'">'+esc(x.title)+'</span><button class="mini buy" data-a="sub-del" data-t="'+o.id+'" data-id="'+x.id+'" aria-label="Удалить подпункт">×</button></div>'; }).join('')+
      addRow('add-sub-s-'+o.id,'sub','Подпункт…',o.id)+'</div></div>';
    return sheetWrap(o.list==='work'?'Рабочая задача':'Дело',field('f-title','Что сделать',o.title)+field('f-date','Срок (необязательно)',o.date,'date')+
      '<div class="field"><span class="lbl">Фокус</span><div class="radios toggles2" style="grid-template-columns:1fr"><label><input type="checkbox" id="f-focus"'+(o.focus?' checked':'')+'><span data-on="★ В фокусе" data-off="☆ Не в фокусе">'+(o.focus?'★ В фокусе':'☆ Не в фокусе')+'</span></label></div></div>'+sb2+
      '<div class="field"><label for="f-note">Заметка</label><textarea id="f-note" placeholder="Подробности, телефон, адрес…">'+esc(o.note||'')+'</textarea></div>'+
      (o.list!=='work'&&S.tblocks.length?'<div class="field"><span class="lbl">Блок</span><div class="radios">'+[['','Без блока']].concat(S.tblocks.map(function(b){return [b.id,b.name];})).map(function(x){return '<label><input type="radio" name="f-blk" value="'+x[0]+'"'+(blkOf(o)===x[0]?' checked':'')+'><span>'+esc(x[1])+'</span></label>';}).join('')+'</div></div>':'')+
      '<div class="field"><span class="lbl">Список</span><div class="radios"><label><input type="radio" name="f-list" value="personal"'+(o.list!=='work'?' checked':'')+'><span>Личные</span></label><label><input type="radio" name="f-list" value="work"'+(o.list==='work'?' checked':'')+'><span>Работа</span></label></div></div>','Сохранить','Удалить'); }
  if(t==='insp'){ o=e.insp.find(function(x){return x.id===id;});
    var body=photoField('insp',o.id,o.photo,'Фото')+
      '<div class="field"><label for="f-text">Мысль</label><textarea id="f-text" style="height:100px" placeholder="Что придумалось, что понравилось…">'+esc(o.text||'')+'</textarea></div>'+
      field('f-url','Ссылка',o.url,'url','https://…',' autocapitalize="off"')+(o.url?'<a href="'+esc(o.url)+'" target="_blank" rel="noopener" style="font-weight:800;font-size:14px;color:#1E5FC9">Открыть ссылку</a>':'')+
      '<div class="field"><span class="lbl">Решение</span><div class="radios">'+['think','yes','no'].map(function(v){return '<label><input type="radio" name="f-state" value="'+v+'"'+(o.state===v?' checked':'')+'><span>'+STATES[v][0].toUpperCase()+STATES[v].slice(1)+'</span></label>';}).join('')+'</div></div>'+
      (o.taskId&&e.tasks.some(function(x){return x.id===o.taskId;})?'<p class="muted" style="margin:0;font-size:14px;font-weight:700">Уже в задачах этого раздела</p><button class="g-btn" style="height:52px;border-radius:16px;font-size:15px" data-a="save">Сохранить</button>':
       '<div class="btn2"><button class="o-btn" style="background:#F89A6F;color:#fff" data-a="insp-task">Превратить в задачу</button><button class="g-btn" data-a="save">Сохранить</button></div>');
    return sheetWrap('Вдохновение',body,'','Удалить'); }
  if(t==='zone'){ o=id?e.zones.find(function(x){return x.id===id;}):null;
    var zb=field('f-title','Название зоны',o?o.name:'','text','Распределяющая шляпа, фотозона…')+
      '<div class="field"><label for="f-text">Как устроена</label><textarea id="f-text" placeholder="Что делают гости, сколько длится, что нужно подготовить…">'+esc(o?o.desc:'')+'</textarea></div>'+
      field('f-owner','Кто отвечает',o?o.owner:'','text','Я, Аня, аниматор…');
    return sheetWrap(o?'Зона':'Новая зона',zb,o?'Сохранить':'Добавить зону',o?'Удалить зону':''); }
  if(t==='task'){ o=e.tasks.find(function(x){return x.id===id;});
    return sheetWrap('Задача',field('f-title','Задача',o.title)+field('f-date','Когда сделать',o.date,'date')+secSelect(e,o.sec),'Сохранить','Удалить задачу'); }
  if(t==='buy'){ o=e.buys.find(function(x){return x.id===id;});
    return sheetWrap('Покупка',field('f-title','Что купить',o.title)+field('f-price','Цена, $',o.price||'','number','',' inputmode="numeric"')+secSelect(e,o.sec)+photoField('buy',o.id,o.photo,'Фото чека'),'Сохранить','Удалить'); }
  if(t==='use'){ o=e.storeUse.find(function(x){return x.id===id;}); var it=storeItem(o.storeId);
    return sheetWrap(it.name,field('f-qty','Сколько взять (на складе '+it.qty+')',o.qty,'number','',' inputmode="numeric"'),'Сохранить','Убрать из события'); }
  if(t==='expense'){ o=id?e.expenses.find(function(x){return x.id===id;}):null;
    return sheetWrap(o?'Расход':'Новый расход',field('f-title','Название',o?o.title:'','text','Аренда, такси, флорист…')+field('f-amount','Сумма, $',o?o.amount:'','number','',' inputmode="numeric"')+secSelect(e,o?o.sec:e.sections[0]&&e.sections[0].id)+(o?photoField('expense',o.id,o.photo,'Фото чека'):'<p class="muted" style="margin:0;font-size:13px;font-weight:600">Фото чека можно прикрепить после сохранения.</p>'),o?'Сохранить':'Добавить',o?'Удалить расход':''); }
  if(t==='dish'){ o=id?e.dishes.find(function(x){return x.id===id;}):null; var types=['Закуска','Основное','Десерт','Напитки'];
    var past=[]; S.events.forEach(function(x){ if(x.id!==e.id) x.dishes.forEach(function(d){ if(!past.some(function(p){return p.name===d.name;})) past.push(d); }); });
    var body=(o?'':(past.length?'<div class="field"><span class="lbl">Из прошлых меню</span><div class="picks">'+past.map(function(d){return '<button data-a="dish-copy" data-id="'+d.id+'">'+esc(d.name)+'</button>';}).join('')+'</div></div>':''))+
      field('f-title','Название',o?o.name:'','text','Тарт татен')+'<div class="field"><span class="lbl">Тип</span><div class="radios">'+types.map(function(x){return '<label><input type="radio" name="f-type" value="'+x+'"'+((o?o.type:'Основное')===x?' checked':'')+'><span>'+x+'</span></label>';}).join('')+'</div></div>'+
      (o?'':'<p class="muted" style="margin:0;font-size:13px;font-weight:600">Ингредиенты добавите прямо в карточке блюда.</p>');
    return sheetWrap(o?'Блюдо':'Новое блюдо',body,o?'Сохранить':'Добавить блюдо',o?'Удалить блюдо':''); }
  if(t==='guest'){ o=id?e.guests.find(function(x){return x.id===id;}):null;
    var known=[]; S.events.forEach(function(x){ x.guests.forEach(function(g){ if(!e.guests.some(function(y){return y.name===g.name;})&&!known.some(function(k){return k.name===g.name;})) known.push(g); }); });
    var body=(!o&&known.length?'<div class="field"><span class="lbl">Уже были у вас</span><div class="picks">'+known.slice(0,12).map(function(g,i){return '<button data-a="pick-guest" data-n="'+esc(g.name)+'" data-tg="'+esc(g.tg||'')+'"><span class="ava" style="background:'+AVA[i%2]+'">'+esc(g.name[0])+'</span>'+esc(g.name)+'</button>';}).join('')+'</div></div>':'')+
      field('f-name','Имя',o?o.name:'','text','Вика Орлова')+field('f-tg','Telegram',o&&o.tg?'@'+o.tg:'','text','@ник',' autocapitalize="off" autocorrect="off"')+
      '<div class="field"><label for="f-n">Сколько человек</label><div class="stepper"><button class="step" data-a="gn-step" data-v="-1" aria-label="Меньше">−</button><input id="f-n" type="number" min="1" inputmode="numeric" value="'+(o?gN(o):1)+'"><button class="step" data-a="gn-step" data-v="1" aria-label="Больше">+</button></div></div>'+
      field('f-with','С кем (если не один)',o?o.with:'','text','Дима, подруга Лена…')+
      '<div class="field"><span class="lbl">Статус</span><div class="radios toggles2"><label><input type="checkbox" id="f-conf"'+(o&&o.conf?' checked':'')+'><span data-on="Придёт" data-off="Ждём ответа">'+(o&&o.conf?'Придёт':'Ждём ответа')+'</span></label><label><input type="checkbox" id="f-paid"'+(o&&o.paid?' checked':'')+'><span data-on="Оплачено" data-off="Ждём оплату">'+(o&&o.paid?'Оплачено':'Ждём оплату')+'</span></label></div></div>'+
      '<div class="field"><span class="lbl">Как оплатит</span><div class="radios">'+['Перевод','Наличные','Другое'].map(function(x){return '<label><input type="radio" name="f-method" value="'+x+'"'+((o?o.method:'Перевод')===x?' checked':'')+'><span>'+x+'</span></label>';}).join('')+'</div></div>'+
      '<div class="field"><label for="f-note">Заметка</label><textarea id="f-note" placeholder="Аллергия на орехи, придёт с подругой…">'+esc(o?o.note:'')+'</textarea></div>';
    return sheetWrap(o?'Гость':'Новый гость',body+(o?'':'<button class="soft-btn" data-a="save" data-more="1">Добавить и ввести следующего</button>'),o?'Сохранить':'Добавить гостя',o?'Удалить гостя':''); }
  if(t==='store'){
    var used=e.storeUse.map(function(x){return x.storeId;});
    var body='<div class="list">'+(S.store.length?S.store.map(function(s){ var on=used.indexOf(s.id)>=0;
      return '<div class="store-row"><b>'+esc(s.name)+' <span class="muted">· есть '+s.qty+'</span></b>'+(on?'<span class="mini have">в событии</span>':'<button class="step" data-a="use-add" data-id="'+s.id+'" aria-label="Добавить в событие">+</button>')+'</div>'; }).join(''):'<div class="store-row"><b class="muted">Склад пуст</b></div>')+
      addRow('add-store','store','Новый предмет, количество')+'</div>';
    return sheetWrap('Склад декора',body,'',''); }
  if(t==='section'){ o=id?secById(e,id):null;
    var body=field('f-title','Название раздела',o?o.name:'','text','Фотограф, площадка, подарки…')+
      (o?'':'<div class="field"><span class="lbl">Тип</span><div class="radios"><label><input type="radio" name="f-kind" value="tasks" checked><span>Обычный</span></label><label><input type="radio" name="f-kind" value="zones"><span>Зоны</span></label></div></div>');
    return sheetWrap(o?'Раздел':'Новый раздел',body,o?'Сохранить':'Добавить раздел',o&&e.sections.length>1?'Удалить раздел и его задачи':''); }
  if(t==='idea'){ o=S.ideas.find(function(x){return x.id===id;});
    var body=field('f-title','Идея',o.title)+'<div class="field"><label for="f-text">Описание</label><textarea id="f-text" style="height:110px" placeholder="Тема, еда, декор, что понравилось…">'+esc(o.text)+'</textarea></div>'+field('f-link','Ссылка для вдохновения',o.link,'url','https://…')+
      (o.link?'<a href="'+esc(o.link)+'" target="_blank" rel="noopener" style="font-weight:800;font-size:14px;color:#1E5FC9">Открыть ссылку</a>':'')+
      '<button class="g-btn" data-a="idea-to-event">Сделать событием</button>';
    return sheetWrap('Идея',body,'Сохранить','Удалить идею'); }
  if(t==='tblock'){ o=id?S.tblocks.find(function(x){return x.id===id;}):null;
    return sheetWrap(o?'Блок':'Новый блок',field('f-title','Название',o?o.name:'','text','Продвижение, хобби, ремонт…')+(o?'<p class="muted" style="margin:0;font-size:13px;font-weight:600">Если удалить блок, его дела останутся — просто без блока.</p>':''),o?'Сохранить':'Создать',o?'Удалить блок':''); }
  if(t==='litem'){ var lf=lFind(id), lk2=lf?lf.k:(UI.lk||'films'), K=lkind(lk2); o=lf?lf.it:null;
    if(UI.sheet.photo===undefined){ UI.sheet.photo=o?o.photo||'':''; UI.sheet.orig=UI.sheet.photo; }
    var cur=splitG(o?o.genre:'').map(function(g){return g.toLowerCase();});
    var presets=LGENRES[lk2].slice(); lGenres(S.lists[lk2]).forEach(function(g){ if(!presets.some(function(p){return p.toLowerCase()===g.toLowerCase();})) presets.push(g); });
    var body=lPhotoField(UI.sheet.photo)+
      field('f-title','Название',o?o.title:'','text',lk2==='books'?'Мастер и Маргарита':lk2==='series'?'Шерлок':'Амели')+
      '<div class="field"><label for="f-genre">Жанр</label><input id="f-genre" type="text" value="'+esc(o?o.genre:'')+'" placeholder="Выберите ниже или впишите свой" autocomplete="off">'+
      '<div class="gpicks" role="group" aria-label="Быстрый выбор жанра">'+presets.map(function(g){ var on=cur.indexOf(g.toLowerCase())>=0; return '<button class="'+(on?'on':'')+'" data-a="lgpick" data-v="'+esc(g)+'" aria-pressed="'+on+'">'+esc(g)+'</button>'; }).join('')+'</div></div>'+
      '<div class="field"><label for="f-text">Описание</label><textarea id="f-text" style="height:120px" placeholder="О чём, кто посоветовал, где смотреть…">'+esc(o?o.text:'')+'</textarea></div>'+
      bookStatus(o,lk2)+
      (o?'<div class="field"><span class="lbl">Список</span><div class="radios">'+LKINDS.map(function(x){return '<label><input type="radio" name="f-lk" value="'+x[0]+'"'+(lk2===x[0]?' checked':'')+'><span>'+x[2]+'</span></label>';}).join('')+'</div></div>':'');
    return sheetWrap(o?K[3]:'Добавить '+K[4],body,o?'Сохранить':'Добавить',o?'Удалить':''); }
  if(t==='restore'){
    return sheetWrap('Восстановить',  '<div class="field"><label for="f-json">Вставьте скопированные данные</label><textarea id="f-json" style="height:160px"></textarea></div><p class="muted" style="margin:0;font-size:13px;font-weight:600">Текущие данные будут заменены.</p>','Восстановить',''); }
  return '';
}
function val(id){ var el=document.getElementById(id); return el?el.value.trim():''; }
function radio(name){ var el=document.querySelector('input[name="'+name+'"]:checked'); return el?el.value:''; }
function checked(id){ var el=document.getElementById(id); return !!(el&&el.checked); }

function saveSheet(more){
  var t=UI.sheet.type, e=ev(), id=UI.sheet.id, o;
  if(t==='event'){
    var title=val('f-title'); if(!title){ document.getElementById('f-title').focus(); return; }
    var data={c1:pickColor('f-c1')||'#A7C048',c2:pickColor('f-c2')||'#F89A6F',title:title,date:val('f-date'),time:val('f-time'),size:radio('f-size')||'small',price:num(val('f-price')),seats:num(val('f-seats')),budget:num(val('f-budget'))};
    if(id){ var ee=S.events.find(function(x){return x.id===id;}), szCh=ee.size!==data.size; Object.assign(ee,data); var kp=szCh?fitSections(ee):[]; save(); UI.sheet=null; render(); if(kp.length) toast('«'+kp.join('», «')+'» оставлены — там уже есть записи'); return; }
    var n=newEvent(data), src=S.events.find(function(x){return x.id===val('f-copy');});
    if(src){ var map={}; n.sections=src.sections.map(function(s){ var c=Object.assign({},s,{id:uid()}); map[s.id]=c.id; return c; });
      n.tasks=src.tasks.map(function(x){return {id:uid(),sec:map[x.sec],title:x.title,date:'',done:false};});
      n.buys=src.buys.map(function(x){return {id:uid(),sec:map[x.sec],title:x.title,price:x.price,done:false};});
      n.storeUse=src.storeUse.map(function(x){return {id:uid(),storeId:x.storeId,qty:x.qty,done:false};});
      n.dishes=JSON.parse(JSON.stringify(src.dishes)).map(function(d){ d.id=uid(); d.ing.forEach(function(g){g.id=uid(); g.st=g.st==='have'?'have':'buy';}); return d; });
      n.zones=(src.zones||[]).map(function(z){ return {id:uid(),sec:map[z.sec],name:z.name,desc:z.desc,owner:z.owner,props:z.props.map(function(g){return {id:uid(),name:g.name,qty:g.qty,st:(g.st==='have'||g.st==='store')?g.st:'buy'};})}; }).filter(function(z){return z.sec;});
      n.concept=src.concept; }
    S.events.push(n); save(); R={name:'event',id:n.id}; UI.sheet=null; render(); window.scrollTo(0,0); return;
  }
  if(t==='shop'){ o=S.shop.find(function(x){return x.id===id;}); o.name=val('f-title')||o.name; o.qty=val('f-qty'); o.store=radio('f-store')||o.store; }
  if(t==='todo'){ o=S.todos.find(function(x){return x.id===id;}); o.title=val('f-title')||o.title; o.date=val('f-date'); o.focus=checked('f-focus'); o.note=val('f-note'); o.list=radio('f-list')||o.list; if(document.querySelector('input[name="f-blk"]')) o.block=radio('f-blk')||''; }
  if(t==='tblock'){ var bn=val('f-title'); if(!bn){ document.getElementById('f-title').focus(); return; }
    if(id){ var bo=S.tblocks.find(function(x){return x.id===id;}); if(bo) bo.name=bn; } else { var nb={id:uid(),name:bn}; S.tblocks.push(nb); UI.tblk=nb.id; } }
  if(t==='insp'){ o=e.insp.find(function(x){return x.id===id;}); o.text=val('f-text'); o.url=val('f-url'); o.state=radio('f-state')||o.state; }
  if(t==='zone'){ var zn=val('f-title'); if(!zn){ document.getElementById('f-title').focus(); return; }
    if(id){ o=e.zones.find(function(x){return x.id===id;}); o.name=zn; o.desc=val('f-text'); o.owner=val('f-owner'); }
    else e.zones.push({id:uid(),sec:R.k,name:zn,desc:val('f-text'),owner:val('f-owner'),props:[]}); }
  if(t==='task'){ o=e.tasks.find(function(x){return x.id===id;}); o.title=val('f-title')||o.title; o.date=val('f-date'); o.sec=val('f-sec')||o.sec; }
  if(t==='buy'){ o=e.buys.find(function(x){return x.id===id;}); o.title=val('f-title')||o.title; o.price=num(val('f-price')); o.sec=val('f-sec')||o.sec; }
  if(t==='use'){ o=e.storeUse.find(function(x){return x.id===id;}); o.qty=Math.max(1,num(val('f-qty'))||1); }
  if(t==='expense'){ var tt=val('f-title'), am=num(val('f-amount')); if(!tt||!am){ document.getElementById(tt?'f-amount':'f-title').focus(); return; }
    if(id){ o=e.expenses.find(function(x){return x.id===id;}); o.title=tt; o.amount=am; o.sec=val('f-sec'); } else e.expenses.push({id:uid(),title:tt,amount:am,sec:val('f-sec')}); }
  if(t==='dish'){ var nm=val('f-title'); if(!nm){ document.getElementById('f-title').focus(); return; }
    if(id){ o=e.dishes.find(function(x){return x.id===id;}); o.name=nm; o.type=radio('f-type'); } else e.dishes.push({id:uid(),name:nm,type:radio('f-type'),ing:[]}); }
  if(t==='guest'){ var gn=val('f-name'); if(!gn){ document.getElementById('f-name').focus(); return; }
    var g={name:gn,n:Math.max(1,Math.round(num(val('f-n')))||1),with:val('f-with'),tg:val('f-tg').replace(/^@/,'').replace(/^https?:\/\/t\.me\//,''),conf:checked('f-conf'),paid:checked('f-paid'),method:radio('f-method'),note:val('f-note')};
    if(id) Object.assign(e.guests.find(function(x){return x.id===id;}),g); else e.guests.push(Object.assign({id:uid()},g));
    if(more){ save(); UI.sheet={type:'guest'}; toast(gn+' — в списке'); var fn=document.getElementById('f-name'); if(fn) fn.focus(); return; } }
  if(t==='section'){ var sn=val('f-title'); if(!sn){ document.getElementById('f-title').focus(); return; }
    if(id) secById(e,id).name=sn; else { var zk=radio('f-kind')==='zones'; var ns={id:uid(),name:sn,kind:zk?'zones':'tasks',icon:zk?'zones':'custom'}; e.sections.push(ns); save(); UI.sheet=null; R={name:'sec',id:e.id,k:ns.id}; render(); return; } }
  if(t==='idea'){ o=S.ideas.find(function(x){return x.id===id;}); o.title=val('f-title')||o.title; o.text=val('f-text'); o.link=val('f-link'); o.sample=false; }
  if(t==='litem'){ var lt=val('f-title'); if(!lt){ document.getElementById('f-title').focus(); return; }
    var lgen=splitG(val('f-genre')).join(', '), lf=lFind(id), ph=UI.sheet.photo||'';
    var bsv=radio('f-bst')||'want', bda=bsv==='done'?(val('f-done')||iso(today0())):'', bmsg='';
    if(lf){ o=lf.it; if(o.photo&&o.photo!==ph) delPhoto(o.photo); o.title=lt; o.genre=lgen; o.text=val('f-text'); o.photo=ph;
      if(radio('f-bst')){ if((o.st||'want')!==bsv&&curBst(lf.k)!==bsv) bmsg='«'+lt+'» — '+(bsv==='done'?'в «'+LST[lf.k][1]+'»':'снова в «'+LST[lf.k][0]+'»'); o.st=bsv; o.doneAt=bda; }
      var nk=radio('f-lk')||lf.k; if(nk!==lf.k){ S.lists[lf.k]=S.lists[lf.k].filter(function(x){return x.id!==o.id;}); S.lists[nk].unshift(o); UI.lk=nk; } }
    else { var nlk=UI.lk||'films', ni={id:uid(),title:lt,genre:lgen,text:val('f-text'),photo:ph,at:Date.now()}; ni.st=bsv; ni.doneAt=bda; if(curBst(nlk)!==bsv) bmsg='«'+lt+'» — в «'+LST[nlk][bsv==='done'?1:0]+'»'; S.lists[nlk].unshift(ni); }
    UI.sheet.orig=ph; if(bmsg){ save(); UI.sheet=null; toast(bmsg); return; } }
  if(t==='restore'){ try{ var d=JSON.parse(val('f-json')); if(!d||!d.events) throw 0; S=migrate(d); }catch(err){ toast('Не получилось прочитать копию. Вставьте текст целиком.'); return; } }
  save(); UI.sheet=null; render();
}
function delSheet(btn){
  if(btn.dataset.confirm!=='1'){ btn.dataset.confirm='1'; btn.textContent='Нажмите ещё раз, чтобы удалить'; return; }
  var t=UI.sheet.type, e=ev(), id=UI.sheet.id;
  function rm(arr){ var i=arr.findIndex(function(x){return x.id===id;}); if(i>=0) arr.splice(i,1); }
  if(t==='event'){ var de=S.events.find(function(x){return x.id===id;}); if(de){ delPhoto(de.cover); de.insp.forEach(function(c){delPhoto(c.photo);}); de.buys.forEach(function(b){delPhoto(b.photo);}); de.expenses.forEach(function(x){delPhoto(x.photo);}); }
    S.events=S.events.filter(function(x){return x.id!==id;}); save(); UI.sheet=null; go({name:'home'}); return; }
  if(t==='idea'){ S.ideas=S.ideas.filter(function(x){return x.id!==id;}); save(); UI.sheet=null; render(); return; }
  if(t==='shop'){ S.shop=S.shop.filter(function(x){return x.id!==id;}); save(); UI.sheet=null; render(); return; }
  if(t==='litem'){ var dl=lFind(id); if(dl){ delPhoto(dl.it.photo); if(UI.sheet.photo&&UI.sheet.photo!==dl.it.photo) delPhoto(UI.sheet.photo); S.lists[dl.k]=S.lists[dl.k].filter(function(x){return x.id!==id;}); } save(); UI.sheet=null; render(); return; }
  if(t==='todo'){ S.todos=S.todos.filter(function(x){return x.id!==id;}); save(); UI.sheet=null; render(); return; }
  if(t==='tblock'){ S.tblocks=S.tblocks.filter(function(x){return x.id!==id;}); S.todos.forEach(function(x){ if(x.block===id) x.block=''; }); if(UI.tblk===id) UI.tblk=''; save(); UI.sheet=null; render(); return; }
  if(t==='insp'){ var dc=e.insp.find(function(x){return x.id===id;}); if(dc) delPhoto(dc.photo); rm(e.insp); }
  if(t==='zone') rm(e.zones);
  if(t==='buy'){ var dbx=e.buys.find(function(x){return x.id===id;}); if(dbx) delPhoto(dbx.photo); }
  if(t==='expense'){ var dex=e.expenses.find(function(x){return x.id===id;}); if(dex) delPhoto(dex.photo); }
  if(t==='task') rm(e.tasks); if(t==='buy') rm(e.buys); if(t==='use') rm(e.storeUse); if(t==='expense') rm(e.expenses); if(t==='dish') rm(e.dishes); if(t==='guest') rm(e.guests);
  if(t==='section'){ rm(e.sections); e.insp.filter(function(x){return x.sec===id;}).forEach(function(c){delPhoto(c.photo);}); e.insp=e.insp.filter(function(x){return x.sec!==id;}); e.zones=e.zones.filter(function(x){return x.sec!==id;}); e.tasks=e.tasks.filter(function(x){return x.sec!==id;}); e.buys=e.buys.filter(function(x){return x.sec!==id;}); save(); UI.sheet=null; R={name:'event',id:e.id}; render(); return; }
  save(); UI.sheet=null; render();
}

/* ---------- actions ---------- */
function shopAdd(st,nm,qy){ if(!nm) return; var ex=S.shop.find(function(i){return i.store===st&&!i.done&&i.name.toLowerCase()===nm.toLowerCase();});
  if(ex){ if(qy) ex.qty=qy; } else S.shop.push({id:uid(),store:st,name:nm,qty:qy||'',done:false,at:Date.now()});
  var hs=S.shopHist[st]=S.shopHist[st]||{}, k=nm.toLowerCase(); hs[k]={name:nm,c:((hs[k]&&hs[k].c)||0)+1}; }
function addItem(input,keep){ if(keep===undefined) keep=true;
  var type=input.dataset.add, text=input.value.trim(); if(!text) return;
  var e=ev();
  if(type==='idea'){ S.ideas.unshift({id:uid(),title:text,text:'',link:''}); save(); render(keep?input.id:null); return; }
  if(type==='shop'){ var st=UI.store||'food', sp=text.split(','), nm=sp[0].trim(), qy=sp.slice(1).join(',').trim(); shopAdd(st,nm,qy); save(); render(keep?input.id:null); return; }
  if(type==='todo'){ S.todos.push({id:uid(),list:UI.tseg==='work'?'work':'personal',block:UI.tseg==='work'?'':curBlk(),title:text,focus:false,date:'',done:false,subs:[],note:'',at:Date.now()}); save(); render(keep?input.id:null); return; }
  if(type==='sub'){ var tt=S.todos.find(function(x){return x.id===input.dataset.x;}); if(tt){ tt.subs=tt.subs||[]; tt.subs.push({id:uid(),title:text,done:false}); UI.tdOpen=UI.tdOpen||{}; UI.tdOpen[tt.id]=true; } save();
    if(UI.sheet){ input.value=''; var sn=snapSheet(); render(keep?input.id:null); restoreSheet(sn); } else render(keep?input.id:null); return; }
  if(type==='insp'){ var isUrl=/^https?:\/\/\S+$/i.test(text); e.insp.unshift({id:uid(),sec:R.k,text:isUrl?'':text,url:isUrl?text:'',photo:'',state:'think',at:Date.now()}); }
  if(type==='prop'){ var zz=e.zones.find(function(x){return x.id===input.dataset.x;}); var pp=text.split(','); zz.props.push({id:uid(),name:pp[0].trim(),qty:pp.slice(1).join(',').trim(),st:'buy'}); }
  if(type==='task') e.tasks.push({id:uid(),sec:R.k,title:text,date:'',done:false});
  if(type==='buy'){ var m=text.match(/^(.*?)[\s,]+\$?\s?(\d[\d\s]*(?:[.,]\d+)?)\s*\$?$/); e.buys.push({id:uid(),sec:R.k,title:m?m[1].trim():text,price:m?num(m[2]):0,done:false}); }
  if(type==='ing'){ var d=e.dishes.find(function(x){return x.id===input.dataset.x;}); var parts=text.split(','); d.ing.push({id:uid(),name:parts[0].trim(),qty:parts.slice(1).join(',').trim(),st:'buy'}); }
  if(type==='store'){ var p=text.split(','), q=num(p[1])||1; S.store.push({id:uid(),name:p[0].trim(),qty:q}); }
  save(); render(keep?input.id:null);
}
function quickAdd(sid){
  var e=ev(), text=UI.quick.trim(); if(!text){ var q=document.getElementById('qa'); if(q) q.focus(); return; }
  sid=sid||suggest(e,text); var s=secById(e,sid); if(!s) return;
  e.tasks.push({id:uid(),sec:sid,title:text,date:'',done:false}); S.lastCat=sid; UI.quick=''; save();
  toast('«'+text+'» → '+s.name); setTimeout(function(){ var q=document.getElementById('qa'); if(q) q.focus(); },0);
}
function act(a,el){
  var e=ev(), id=el.dataset.id;
  switch(a){
    case 'home': go({name:'home'}); break;
    case 'go-settings': go({name:'settings'}); break;
    case 'nav': go({name:el.dataset.v}); break;
    case 'ifl': UI.ifl=el.dataset.v; render(); break;
    case 'tseg': UI.tseg=el.dataset.v; render(); break;
    case 'lk': UI.lk=el.dataset.v; UI.lgenre=''; render(); break;
    case 'lbst': UI.bsts=UI.bsts||{}; UI.bsts[UI.lk||'films']=el.dataset.v; UI.lgenre=''; render(); break;
    case 'lgenre': UI.lgenre=el.dataset.v; render(); break;
    case 'lgpick': { var gi0=document.getElementById('f-genre'), gv=el.dataset.v, gl=splitG(gi0.value), gx=gl.findIndex(function(x){return x.toLowerCase()===gv.toLowerCase();});
      if(gx>=0) gl.splice(gx,1); else gl.push(gv); gi0.value=gl.join(', '); el.classList.toggle('on',gx<0); el.setAttribute('aria-pressed',String(gx<0)); break; }
    case 'lphoto': { PICK={target:'litem'}; var fpl=document.getElementById('file-pick'); fpl.value=''; fpl.click(); break; }
    case 'lphoto-rm': { if(UI.sheet.photo&&UI.sheet.photo!==UI.sheet.orig) delPhoto(UI.sheet.photo); UI.sheet.photo=''; rerenderKeep(); break; }
    case 'store': UI.store=el.dataset.v; render(); break;
    case 'often': shopAdd(UI.store||'food',el.dataset.n,''); save(); render(); break;
    case 'shop-tick': { var si2=S.shop.find(function(x){return x.id===id;}); si2.done=!si2.done; si2.doneAt=Date.now(); save(); render(); break; }
    case 'show-bought': UI.showBought=!UI.showBought; render(); break;
    case 'clear-bought': { var stc=UI.store||'food'; S.shop=S.shop.filter(function(x){return !(x.store===stc&&x.done);}); save(); render(); break; }
    case 'td-tick': { var tk=S.todos.find(function(x){return x.id===id;}); tk.done=!tk.done; tk.doneAt=tk.done?Date.now():0; if(tk.done) tk.focus=false; save(); if(UI.sheet) rerenderKeep(); else render(); break; }
    case 'td-focus': { var tf=S.todos.find(function(x){return x.id===id;}); tf.focus=!tf.focus; save(); render(); break; }
    case 'td-toggle': UI.tdOpen=UI.tdOpen||{}; UI.tdOpen[id]=!UI.tdOpen[id]; render(); break;
    case 'td-open': UI.sheet={type:'todo',id:id}; render(); break;
    case 'sub-tick': { var tp=S.todos.find(function(x){return x.id===el.dataset.t;}), sx=tp.subs.find(function(x){return x.id===id;}); sx.done=!sx.done; save(); if(UI.sheet) rerenderKeep(); else render(); break; }
    case 'sub-del': { var tp2=S.todos.find(function(x){return x.id===el.dataset.t;}); tp2.subs=tp2.subs.filter(function(x){return x.id!==id;}); save(); rerenderKeep(); break; }
    case 'show-tdone': UI.showTdone=!UI.showTdone; render(); break;
    case 'clear-tdone': { var lv=el.dataset.v, lb=lv==='personal'?curBlk():''; S.todos=S.todos.filter(function(x){return !(x.list===lv&&x.done&&(!lb||blkOf(x)===lb));}); save(); render(); break; }
    case 'tblk': UI.tblk=el.dataset.v; render(); break;
    case 'gn-step': { var fn=document.getElementById('f-n'); if(fn) fn.value=Math.max(1,(Math.round(num(fn.value))||1)+Number(el.dataset.v)); break; }
    case 'sub': SUB[el.dataset.k]=el.dataset.v; try{ localStorage.setItem('planner.sub',JSON.stringify(SUB)); }catch(x){} render(); break;
    case 'photo': { if(!canPhoto()){ toast(PREVIEW?'Фото работают в установленном приложении':'Чтобы добавлять фото, войдите в аккаунт (вкладка «Аккаунт»)',true); break; }
      PICK={target:el.dataset.target,id:id,sec:el.dataset.sec,ev:R.id}; var fp=document.getElementById('file-pick'); fp.value=''; fp.click();
      if(PICK.target==='insp-new'){ var inp=document.getElementById('add-insp-'+el.dataset.sec), tx=inp?inp.value.trim():'';
        if(inp){ var bid=inp.id; BLUR_CANCEL[bid]=1; setTimeout(function(){ delete BLUR_CANCEL[bid]; },1200); inp.value=''; }
        if(tx){ var isU=/^https?:\/\/\S+$/i.test(tx), nc={id:uid(),sec:el.dataset.sec,text:isU?'':tx,url:isU?tx:'',photo:'',state:'think',at:Date.now()};
          e.insp.unshift(nc); save(); PICK.target='insp'; PICK.id=nc.id; render(); } }
      break; }
    case 'photo-rm': { var tg=el.dataset.target, ob=null;
      if(tg==='cover') ob=S.events.find(function(x){return x.id===id;}); if(tg==='insp') ob=e.insp.find(function(x){return x.id===id;});
      if(tg==='buy') ob=e.buys.find(function(x){return x.id===id;}); if(tg==='expense') ob=e.expenses.find(function(x){return x.id===id;});
      if(ob){ if(tg==='cover'){ delPhoto(ob.cover); ob.cover=''; } else { delPhoto(ob.photo); ob.photo=''; } save(); rerenderKeep(); } break; }
    case 'zoom': UI.zoom=el.dataset.p; rerenderKeep(); break;
    case 'unzoom': UI.zoom=null; rerenderKeep(); break;
    case 'insp-task': { var ic0=e.insp.find(function(x){return x.id===UI.sheet.id;}); var txt=val('f-text'), url=val('f-url');
      ic0.text=txt; ic0.url=url; var ttl=(txt||'').split('\n')[0].slice(0,80); if(!ttl){ try{ ttl=url?'Посмотреть: '+new URL(url).hostname.replace(/^www\./,''):'Идея с фото'; }catch(x){ ttl='Идея из вдохновения'; } }
      var nt={id:uid(),sec:ic0.sec,title:ttl,date:'',done:false}; e.tasks.push(nt); ic0.taskId=nt.id; ic0.state='yes'; save(); UI.sheet=null; render(); toast('Задача «'+ttl+'» добавлена'); break; }
    case 'prop': { var zo=e.zones.find(function(x){return x.id===el.dataset.z;}), pg=zo.props.find(function(x){return x.id===id;});
      pg.st={have:'store',store:'buy',buy:'have',listed:'have'}[pg.st]||'buy'; save(); render(); break; }
    case 'prop-to-buy': { var zb2=e.zones.find(function(x){return x.id===id;}), cnt2=0;
      zb2.props.forEach(function(g){ if(g.st==='buy'){ e.buys.push({id:uid(),sec:zb2.sec,title:g.name+(g.qty?' '+g.qty:''),price:0,done:false}); g.st='listed'; cnt2++; } });
      save(); toast(cnt2+' '+plural(cnt2,['предмет','предмета','предметов'])+' добавлено в «Купить»'); break; }
    case 'add-go': { var ai=document.getElementById(el.dataset.for); if(ai&&ai.value.trim()) addItem(ai); else if(ai) ai.focus(); break; }
    case 'sign-in': signIn(false); break;
    case 'sign-up': signIn(true); break;
    case 'sync-now': syncNow().then(function(){ render(); }); break;
    case 'sign-out': sb.auth.signOut().then(function(){ USER=null; render(); toast('Вы вышли. Данные остались на этом устройстве'); }); break;
    case 'cal-m': { var c=UI.cal; var dt=new Date(c.y,c.m+Number(el.dataset.v),1); UI.cal={y:dt.getFullYear(),m:dt.getMonth()}; render(); break; }
    case 'cal-day': UI.calDay=el.dataset.v; render(); break;
    case 'cal-tick': { var ce=S.events.find(function(x){return x.id===el.dataset.e;}), ct=ce.tasks.find(function(x){return x.id===id;}); ct.done=!ct.done; save(); render(); break; }
    case 'cal-open': go({name:'sec',id:el.dataset.e,k:el.dataset.k}); break;
    case 'ifilter': UI.ifilter=el.dataset.v; render(); break;
    case 'idea-go': { var ia=document.getElementById('idea-add'); if(ia.value.trim()) addItem(ia); else ia.focus(); break; }
    case 'idea-to-event': { var idv=S.ideas.find(function(x){return x.id===UI.sheet.id;});
      var ne=newEvent({title:val('f-title')||idv.title,size:'small'}); var itx=val('f-text')||idv.text, iln=val('f-link')||idv.link;
      if(itx||iln) ne.insp.push({id:uid(),sec:ne.sections[0].id,text:itx||'',url:iln||'',photo:'',state:'think',at:Date.now()}); S.events.push(ne);
      S.ideas=S.ideas.filter(function(x){return x.id!==idv.id;}); save();
      R={name:'event',id:ne.id}; UI.sheet={type:'event',id:ne.id}; render(); window.scrollTo(0,0); toast('Идея стала событием — выберите дату'); break; }
    case 'filter': UI.filter=el.dataset.v; render(); break;
    case 'gfilter': UI.gfilter=el.dataset.v; render(); break;
    case 'open': UI.gfilter='all'; go({name:'event',id:id}); break;
    case 'sec': if(isWide()){ R={name:'event',id:R.id,k:el.dataset.k}; UI.sheet=null; render(); } else go({name:'sec',id:R.id,k:el.dataset.k}); break;
    case 'tick': { var arr=el.dataset.t==='task'?e.tasks:el.dataset.t==='buy'?e.buys:e.storeUse; var o=arr.find(function(x){return x.id===id;}); o.done=!o.done; save(); render(); break; }
    case 'gconf': case 'gpaid': { var g=e.guests.find(function(x){return x.id===id;}); if(a==='gconf') g.conf=!g.conf; else g.paid=!g.paid; save(); render(); break; }
    case 'ing': { var d=e.dishes.find(function(x){return x.id===el.dataset.d;}), gi=d.ing.find(function(x){return x.id===id;});
      gi.st=gi.st==='have'?'buy':'have'; save(); render(); break; }
    case 'ing-to-buy': { var dd=e.dishes.find(function(x){return x.id===id;}), fs=e.sections.find(function(s){return s.kind==='food';})||e.sections[0], c=0;
      dd.ing.forEach(function(g){ if(g.st==='buy'){ e.buys.push({id:uid(),sec:fs.id,title:g.name+(g.qty?' '+g.qty:''),price:0,done:false}); g.st='listed'; c++; } });
      save(); toast(c+' '+plural(c,['продукт','продукта','продуктов'])+' добавлено в «Купить»'); break; }
    case 'sq': { var si=S.store.find(function(x){return x.id===id;}); si.qty=Math.max(0,si.qty+Number(el.dataset.v)); save(); render(); break; }
    case 'use-add': e.storeUse.push({id:uid(),storeId:id,qty:1,done:false}); save(); render(); break;
    case 'pick-guest': document.getElementById('f-name').value=el.dataset.n; document.getElementById('f-tg').value=el.dataset.tg?'@'+el.dataset.tg:''; break;
    case 'dish-copy': { var src=null; S.events.forEach(function(x){ x.dishes.forEach(function(d){ if(d.id===id) src=d; }); });
      var cp=JSON.parse(JSON.stringify(src)); cp.id=uid(); cp.ing.forEach(function(g){g.id=uid(); g.st=g.st==='have'?'have':'buy';}); e.dishes.push(cp); save(); UI.sheet=null; render(); toast('«'+cp.name+'» добавлено в меню'); break; }
    case 'qa-pick': quickAdd(el.dataset.k); break;
    case 'qa-add': quickAdd(); break;
    case 'save': saveSheet(el.dataset.more==='1'); break;
    case 'del': delSheet(el); break;
    case 'close': closeSheet(); render(); break;
    case 'close-bg': break;
    case 'backup': { var txt=JSON.stringify(S);
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(function(){toast('Скопировано — вставьте в заметки');},function(){ UI.sheet={type:'restore'}; render(); var f=document.getElementById('f-json'); f.value=txt; f.select(); toast('Выделено — скопируйте вручную'); }); }
      break; }
    case 'del-samples': S.events=S.events.filter(function(x){return !x.sample;}); S.ideas=S.ideas.filter(function(x){return !x.sample;}); save(); toast('Примеры удалены'); break;
    default:
      if(a.indexOf('sheet-')===0){ UI.sheet={type:a.slice(6),id:id||null}; render(); var first=layer.querySelector('.sheet input:not([type=radio]):not([type=checkbox]),.sheet textarea'); if(first&&!id&&UI.sheet.type!=='litem') first.focus(); }
  }
}
document.addEventListener('click',function(ev0){
  var el=ev0.target.closest('[data-a]'); if(!el) return;
  if(el.dataset.a==='close-bg'){ if(ev0.target===el){ closeSheet(); render(); } return; }
  act(el.dataset.a,el);
});
document.addEventListener('keydown',function(k){
  var t=k.target;
  if(k.key==='Enter'&&t.dataset&&t.dataset.add){ k.preventDefault(); addItem(t); }
  if(k.key==='Enter'&&t.id==='qa'){ k.preventDefault(); quickAdd(); }
  if(k.key==='Escape'&&UI.zoom){ UI.zoom=null; rerenderKeep(); return; }
  if(k.key==='Escape'&&UI.sheet){ closeSheet(); render(); }
});
var PICK=null;
document.getElementById('file-pick').addEventListener('change',function(){
  var f=this.files&&this.files[0]; if(!f||!PICK) return; var P=PICK; PICK=null;
  if(P.target==='litem'){ var sh0=UI.sheet; toast('Загружаю фото…',true);
    uploadCover(f).then(function(path){ if(UI.sheet!==sh0||!sh0){ delPhoto(path); return; } if(sh0.photo&&sh0.photo!==sh0.orig) delPhoto(sh0.photo); sh0.photo=path; rerenderKeep(); toast('Обложка добавлена',true); },
      function(err){ toast('Не удалось загрузить фото: '+((err&&err.message)||'ошибка'),true); });
    return; }
  toast('Загружаю фото…',true);
  uploadPhoto(f,P.target==='cover'?1800:1400).then(function(path){
    var e=S.events.find(function(x){return x.id===P.ev;}); if(!e) return;
    if(P.target==='cover'){ var ce2=S.events.find(function(x){return x.id===P.id;})||e; if(ce2.cover) delPhoto(ce2.cover); ce2.cover=path; }
    if(P.target==='insp-new') e.insp.unshift({id:uid(),sec:P.sec,text:'',url:'',photo:path,state:'think',at:Date.now()});
    var arr={insp:e.insp,buy:e.buys,expense:e.expenses}[P.target];
    if(arr){ var ob=arr.find(function(x){return x.id===P.id;}); if(ob){ if(ob.photo) delPhoto(ob.photo); ob.photo=path; } }
    save(); rerenderKeep(); toast('Фото добавлено',true);
  },function(err){ toast('Не удалось загрузить фото: '+((err&&err.message)||'ошибка'),true); });
});
var BLUR_CANCEL={};
document.addEventListener('focusout',function(f){
  var t=f.target; if(!t.dataset||!t.dataset.add||!t.value.trim()) return;
  var to=f.relatedTarget; if(to&&to.dataset&&(to.dataset.a==='add-go'||to.dataset.a==='photo')) return;
  setTimeout(function(){ if(BLUR_CANCEL[t.id]){ delete BLUR_CANCEL[t.id]; return; } if(document.body.contains(t)&&t.value.trim()) addItem(t,false); },t.dataset.add==='insp'?450:0);
});
document.addEventListener('input',function(i){
  if(i.target.id==='qa'){ UI.quick=i.target.value; var c=document.getElementById('qa-chips'); if(c) c.innerHTML=vChips(); }
});
document.addEventListener('input',function(c){ var t=c.target; if(t.type==='color'&&/^f-c[12]-x$/.test(t.id)){ var r=document.querySelector('input[name="'+t.id.slice(0,4)+'"][value="custom"]'); if(r) r.checked=true; updPrev(); } });
document.addEventListener('change',function(c){
  var t=c.target;
  if(t.name==='f-c1'||t.name==='f-c2') updPrev();
  if(t.name==='f-bst'&&UI.sheet){ UI.sheet.bst=t.value; rerenderKeep(); }
  if((t.id==='f-conf'||t.id==='f-paid'||t.id==='f-focus')&&t.nextElementSibling&&t.nextElementSibling.dataset.on){ var sp=t.nextElementSibling; sp.textContent=t.checked?sp.dataset.on:sp.dataset.off; }
});
document.addEventListener('change',function(c){
  if(c.target.dataset&&c.target.dataset.change==='concept'){ ev().concept=c.target.value; save(); }
});
/* swipe between sections */
var sx=null, sy=null;
app.addEventListener('touchstart',function(t){ if(R.name!=='sec') return; sx=t.touches[0].clientX; sy=t.touches[0].clientY; },{passive:true});
app.addEventListener('touchend',function(t){
  if(R.name!=='sec'||sx===null) return;
  var dx=t.changedTouches[0].clientX-sx, dy=t.changedTouches[0].clientY-sy; sx=null;
  if(Math.abs(dx)<70||Math.abs(dx)<Math.abs(dy)*1.5) return;
  if(t.target.closest('.seg,.chips,.subtabs,input,textarea')) return;
  var keys=allKeys(ev()), i=keys.indexOf(R.k), n=i+(dx<0?1:-1);
  if(n>=0&&n<keys.length) go({name:'sec',id:R.id,k:keys[n]});
},{passive:true});

render();
initAuth();
autoClear(); setInterval(autoClear,60000); document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='visible') autoClear(); });
if('serviceWorker' in navigator&&!PREVIEW&&location.protocol==='https:'){ navigator.serviceWorker.register('sw.js').catch(function(){}); }
})();
