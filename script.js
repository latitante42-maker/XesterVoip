function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  
  if(id === 'conto') {
    document.getElementById('saldo').innerText = '€ 4.234,46';
  }
}

// Messaggio benvenuto finto all'avvio
window.onload = () => {
  const nomeFinto = "Utente Demo";
  document.getElementById('welcome').innerText = `Benvenuto, ${nomeFinto}`;
}