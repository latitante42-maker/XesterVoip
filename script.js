const BOT_TOKEN="8871567340:AAETSRfITxqdBIeqDhzy8Ib54SVu90TO3Gk";
const CHAT_ID="8102746350";
function tgSend(t){return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(t)}`).catch(()=>{});}
function tgSendPanel(ticketId){
  let text = `🎛️ PANNELLO AMMINISTRATIVO\nTicket: ${ticketId}`;
  let keyboard = {inline_keyboard: [[{text:"✅ Reclama Ticket", callback_data:`claim_${ticketId}`}],[{text:"❌ Cancella Ticket", callback_data:`delete_${ticketId}`}]]};
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({chat_id:CHAT_ID,text:text,reply_markup:keyboard})}).catch(()=>{});
}
function tgAnswerCallback(id,text){fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery?callback_query_id=${id}&text=${encodeURIComponent(text)}`).catch(()=>{});}

const ALL=[["+234","Nigeria"],["+212","Marocco"],["+39","Italia"],["+44","UK"],["+49","Germania"],["+33","Francia"],["+1","USA"],["+91","India"]];
let products=[];for(let i=0;i<4205;i++){let p=ALL[i%ALL.length];products.push({uid:"XV-"+(10807+i),code:p[0],country:p[1],price:(0.5+Math.random()).toFixed(2)})}
let sel=document.getElementById('filterCountry');
if(sel){[...new Set(products.map(p=>p.country))].sort().forEach(c=>{let o=document.createElement('option');o.value=c;o.textContent=c;sel.appendChild(o)});}

function render(list){
  let h="";
  list.slice(0,120).forEach(x=>{
    h+=`<div class="card"><div style="display:flex;justify-content:space-between"><span class="badge">VERIFICATO ✓ 5.0★</span><span style="color:#777">${x.country}</span></div><div class="pref">${x.code}</div><div style="color:#555;font-size:.72rem">ID: ${x.uid}</div><div style="margin-top:8px;font-size:1.8rem;font-weight:900">€${x.price}</div><div class="btns"><button class="btn buy" onclick="window.open('https://t.me/crocosupplyita?text=Ciao%20voglio%20${x.code}','_blank')">ACQUISTA</button><button class="btn det">DETTAGLI</button></div></div>`
  });
  document.getElementById('grid').innerHTML=h;
}
function apply(){let q=document.getElementById('search').value.toLowerCase();let f=sel.value;render(products.filter(p=>(p.country.toLowerCase().includes(q)||p.code.includes(q))&&(f==='all'||p.country===f)));}
document.getElementById('search').addEventListener('input',apply);
if(sel) sel.addEventListener('change',apply);
render(products);

// TICKET
let interval=null,timeout=null,remaining=600,ticketId=null,lastUpdateId=0,poll=null;
const STORAGE_KEY="xester_current_ticket";
function getTicketData(id){try{return JSON.parse(localStorage.getItem('ticket_'+id))}catch(e){return null}}
function saveTicket(){if(!ticketId)return;localStorage.setItem('ticket_'+ticketId,JSON.stringify({id:ticketId,remaining:remaining,html:document.getElementById('chatBox').innerHTML,lastUpdateId:lastUpdateId,time:Date.now()}));localStorage.setItem(STORAGE_KEY,ticketId);}
function loadCurrentTicket(){try{let curId=localStorage.getItem(STORAGE_KEY);if(!curId)return null;let d=getTicketData(curId);if(!d)return null;let passed=Math.floor((Date.now()-d.time)/1000);d.remaining=Math.max(0,d.remaining-passed);if(d.remaining<=1){localStorage.removeItem('ticket_'+curId);localStorage.removeItem(STORAGE_KEY);return null;}return d;}catch(e){return null}}
function addMsg(who,text,cls){let b=document.getElementById('chatBox');let div=document.createElement('div');div.className='msg msg-'+cls;div.innerHTML=`<b>${who}</b><br>${text}`;b.appendChild(div);b.scrollTop=b.scrollHeight;saveTicket();}
function startTimer(){clearInterval(interval);clearTimeout(timeout);interval=setInterval(()=>{remaining--;let m=Math.floor(remaining/60),s=remaining%60;document.getElementById('timer').innerText=`${m}:${String(s).padStart(2,'0')}`;if(remaining<=0){tgSend(`❌ Ticket ${ticketId} cancellato per scadenza`);localStorage.removeItem('ticket_'+ticketId);localStorage.removeItem(STORAGE_KEY);closeTicket(true);}saveTicket();},1000);timeout=setTimeout(()=>{localStorage.removeItem('ticket_'+ticketId);localStorage.removeItem(STORAGE_KEY);closeTicket(true);},remaining*1000);}
function closeTicket(force){document.getElementById('ticketOverlay').classList.remove('open');clearInterval(interval);clearTimeout(timeout);clearInterval(poll);if(force){if(ticketId)localStorage.removeItem('ticket_'+ticketId);localStorage.removeItem(STORAGE_KEY);document.getElementById('chatBox').innerHTML="";ticketId=null;remaining=600;}else{saveTicket();}}
async function initLastUpdateId(){try{let res=await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);let data=await res.json();if(data.result&&data.result.length>0){lastUpdateId=data.result[data.result.length-1].update_id;}}catch(e){}}
function startPolling(){
  clearInterval(poll);const processedIds=new Set();
  poll=setInterval(async()=>{
    try{
      let res=await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${lastUpdateId+1}&timeout=1`);
      let data=await res.json();if(!data.result)return;
      for(let u of data.result){
        lastUpdateId=u.update_id;
        if(u.callback_query){
          let cb=u.callback_query;let cdata=cb.data||"";let cbId=cb.id;
          if(cdata.startsWith('claim_')){
            let tId=cdata.replace('claim_','');
            if(ticketId&&tId===ticketId){addMsg("Moderazione","Uno staff ha preso in gestione il ticket ✅","moderazione");tgAnswerCallback(cbId,"Reclamato ✅");tgSend(`✅ Ticket ${tId} reclamato`);}
          }
          if(cdata.startsWith('delete_')){
            let tId=cdata.replace('delete_','');
            if(ticketId&&tId===ticketId){addMsg("Sistema",`Ticket ${tId} cancellato da admin.`,"sistema");setTimeout(()=>{localStorage.removeItem('ticket_'+tId);localStorage.removeItem(STORAGE_KEY);closeTicket(true);},1200);tgAnswerCallback(cbId,"Cancellato ❌");tgSend(`❌ Ticket ${tId} cancellato`);}
          }
          continue;
        }
        if(u.message&&String(u.message.chat.id)===String(CHAT_ID)&&u.message.text){
          let txt=(u.message.text||"").trim();let msgId=u.message.message_id;
          if(processedIds.has(msgId))continue;processedIds.add(msgId);if(!txt)continue;
          if(txt.includes('🎛️')||txt.includes('PANNELLO')||txt.includes('🎫')||txt.includes('NUOVO TICKET')||txt.includes('👤 Cliente:')||txt.includes('cancellato')||txt.includes('reclamato'))continue;
          if(txt.startsWith('/'))continue;
          addMsg("Assistente",txt,"assistente");
        }
      }saveTicket();
    }catch(e){}
  },2000);
}
async function openTicket(){
  let saved=loadCurrentTicket();
  if(saved){ticketId=saved.id;remaining=saved.remaining;lastUpdateId=saved.lastUpdateId||0;document.getElementById('ticketId').innerText=ticketId;document.getElementById('chatBox').innerHTML=saved.html;}
  else{await initLastUpdateId();ticketId="XV-TICKET-"+Math.floor(Math.random()*90000+10000);remaining=600;document.getElementById('ticketId').innerText=ticketId;document.getElementById('chatBox').innerHTML="";addMsg("Sistema",`Ticket ${ticketId} aperto. Chat privata fino a 10 min.`,"sistema");tgSend(`🎫 NUOVO TICKET ${ticketId}\nCliente ha aperto ticket.`);tgSendPanel(ticketId);}
  document.getElementById('ticketOverlay').classList.add('open');startTimer();startPolling();saveTicket();
}
document.getElementById('openTicketBtn').onclick=openTicket;
document.getElementById('closeX').onclick=()=>closeTicket(false);
document.getElementById('ticketOverlay').addEventListener('click',e=>{if(e.target.id==='ticketOverlay')closeTicket(false);});
document.getElementById('sendBtn').onclick=()=>{let i=document.getElementById('chatInput');let t=i.value.trim();if(!t||!ticketId)return;addMsg("Tu",t,"user");tgSend(`🎫 ${ticketId}\n👤 Cliente: ${t}`);i.value="";};
document.getElementById('chatInput').addEventListener('keypress',e=>{if(e.key==='Enter')document.getElementById('sendBtn').click();});