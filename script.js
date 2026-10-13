<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RINA BANK - Demo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app">
    <div class="header">
      <p class="demo-badge">MODALITÀ DEMO - SIMULAZIONE</p>
      <h1 id="welcome">Benvenuto, Utente Demo</h1>
      <p>Conto dimostrativo RINA BANK</p>
    </div>

    <div class="card">
      <span>Saldo disponibile</span>
      <h2 id="saldo">€ 4.234,46</h2>
      <p>IBAN Demo: IT00 X000 0000 0000 0000</p>
    </div>

    <div class="buttons">
      <button onclick="showSection('bonifico')">Invia Bonifico</button>
      <button onclick="showSection('transazioni')">Transazioni Eseguite</button>
      <button onclick="showSection('conto')">Conto Bancario</button>
    </div>

    <div id="bonifico" class="section hidden">
      <h3>Invia Bonifico - DEMO</h3>
      <input type="text" placeholder="IBAN destinatario">
      <input type="number" placeholder="Importo €">
      <button onclick="alert('Bonifico DEMO inviato! (finto)')">Conferma</button>
    </div>

    <div id="transazioni" class="section hidden">
      <h3>Transazioni - DEMO</h3>
      <ul>
        <li>12/10/2026 - Spesa Market - € -45,20</li>
        <li>11/10/2026 - Accredito - € +1.200,00</li>
        <li>10/10/2026 - Bonifico Uscita - € -150,00</li>
      </ul>
    </div>

    <div id="conto" class="section">
      <h3>Dettaglio Conto - DEMO</h3>
      <p><strong>Intestatario:</strong> Utente Demo</p>
      <p><strong>Saldo contabile:</strong> € 4.234,46</p>
      <p><strong>Saldo disponibile:</strong> € 4.234,46</p>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>