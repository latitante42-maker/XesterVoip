const css = document.createElement('style');
css.textContent = '';
document.head.appendChild(css);

function createModal(){
  if(document.getElementById('profile-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'profile-modal';
  modal.innerHTML = `<div class="profile-card"><img id="p-photo" src=""><h2 id="p-name"></h2><p class="username" id="p-username"></p><p class="bio" id="p-bio"></p><button class="close-btn" onclick="closeProfile()">Chiudi</button></div>`;
  modal.addEventListener('click', (e)=>{ if(e.target.id==='profile-modal') closeProfile(); });
  document.body.appendChild(modal);
}
function openProfile(member){
  createModal();
  document.getElementById('p-photo').src = member.photo;
  document.getElementById('p-name').textContent = member.name;
  document.getElementById('p-username').textContent = '@' + member.username.replace('@','');
  document.getElementById('p-bio').textContent = member.bio || 'Nessuna bio';
  document.getElementById('profile-modal').classList.add('active');
}
function closeProfile(){ document.getElementById('profile-modal').classList.remove('active'); }

document.addEventListener('DOMContentLoaded', ()=>{
  createModal();
  document.querySelectorAll('.member-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      openProfile({name:card.dataset.name, username:card.dataset.username, photo:card.dataset.photo, bio:card.dataset.bio});
    });
  });
});