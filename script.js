<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>XesterVoip - Numeri Verificati</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,Arial,sans-serif}
body{background:#0a0a0b;color:#fff;overflow-x:hidden}
#loader{position:fixed;inset:0;background:#000;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center}
#loader h1{font-size:5rem;font-weight:900;letter-spacing:-3px}
#bar{width:80%;max-width:500px;height:6px;background:#222;margin-top:30px;border-radius:10px;overflow:hidden}
#fill{height:100%;width:0%;background:#fff;transition:width 0.1s linear}
#perc{margin-top:15px;font-size:1.2rem;letter-spacing:2px;color:#888}
#welcome{position:fixed;inset:0;background:#fff;color:#000;z-index:9998;display:none;align-items:center;justify-content:center;flex-direction:column}
#welcome h1{font-size:4rem;font-weight:900;animation:pop 0.8s ease}
@keyframes pop{0%{transform:scale(0.5);opacity:0}100%{transform:scale(1);opacity:1}}
header{padding:20px 5%;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1a1a1a;position:sticky;top:0;background:rgba(10,10,11,0.9);backdrop-filter:blur(10px);z-index:10}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;padding:30px 5%}
.card{background:#151517;border:1px solid #222;border-radius:18px;padding:18px;transition:.2s}
.card:hover{transform:translateY(-4px);border-color:#444}
.badge{font-size:.7rem;background:#00ff88;color:#000;padding:4px 8px;border-radius:20px;font-weight:700}
.price{font-size:1.6rem;font-weight:800;margin:10px 0}
.btn{width:100%;background:#fff;color:#000;border:none;padding:12px;border-radius:12px;font-weight:800;cursor:pointer}
.btn:active{transform:scale(.97)}
.details{font-size:.8rem;color:#888;margin:8px 0;line-height:1.4}
.filter{padding:20px 5%;display:flex;gap:10px;overflow:auto}
.filter input, .filter select{background:#1a1a1c;border:1px solid #2a2a2e;color:#fff;padding:12px 16px;border-radius:12px;outline:none}
</style>
</head>
<body>

<div id="loader">
<h1 id="numTxt">0%</h1>
<div id="bar"><div id="fill"></div></div>
<div id="perc">XESTER VOIP - CARICAMENTO SISTEMA VERIFICATO</div>
</div>

<div id="welcome"><h1>BENVENUTO</h1><p style="margin-top:10px;letter-spacing:3px">XESTER VOIP</p></div>

<header>
<b>XESTER VOIP</b>
<span style="color:#888"><span id="count">4205</span> numeri verificati</span>
</header>

<div class="filter">
<input id="search" placeholder="Cerca prefisso, paese...">
<select id="sort"><option value="price-asc">Prezzo crescente</option><option value="price-desc">Prezzo decrescente</option><option value="country">Paese A-Z</option></select>
</div>

<div class="grid" id="grid"></div>

<script>
const prefixes = [
["+39","Italia"],["+44","UK"],["+49","Germania"],["+33","Francia"],["+34","Spagna"],["+1","USA"],["+1","Canada"],["+52","Messico"],["+55","Brasile"],["+54","Argentina"],
["+351","Portogallo"],["+31","Olanda"],["+32","Belgio"],["+41","Svizzera"],["+43","Austria"],["+45","Danimarca"],["+46","Svezia"],["+47","Norvegia"],["+48","Polonia"],["+90","Turchia"],
["+971","Dubai"],["+81","Giappone"],["+82","Corea"],["+86","Cina"],["+91","India"],["+61","Australia"],["+27","Sud Africa"],["+234","Nigeria"],["+212","Marocco"],["+216","Tunisia"],
["+213","Algeria"],["+20","Egitto"],["+353","Irlanda"],["+30","Grecia"],["+380","Ucraina"],["+380","Ucraina"],["+40","Rom