(function () {
  'use strict';
  var R = window.R, pg = document.getElementById('page');
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function nb(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f'); }
  function toast(t) { var e = document.getElementById('toast'); e.textContent = t; e.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { e.classList.remove('on'); }, 2800); }
  var P = {
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="m9 12 2 2 4-4"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
    car: '<path d="M5 17h14M3 13l2-5.5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.5L21 13v4a1 1 0 0 1-1 1h-1.5M3 13v4a1 1 0 0 0 1 1h1.5M3 13h18"/><circle cx="7.5" cy="17" r="1.6"/><circle cx="16.5" cy="17" r="1.6"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    msg: '<path d="M4 5h16v11H9l-5 4z"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    bolt: '<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6z"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/>',
    chat: '<path d="M4 18.5 5.3 15A7.5 7.5 0 1 1 8.6 18z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    play: '<path d="M7 5v14l12-7z"/>',
    send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
    redo: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/>'
  };
  function ic(n, c) { return '<svg class="ico ' + (c || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + '</svg>'; }
  function regle(id) { return R.REGLES.filter(function (r) { return r.id === id; })[0]; }
  function remplir(t, ex) { return t.replace(/\{pr\u00e9nom\}/g, ex.nom).replace(/\{mod\u00e8le\}/g, ex.modele).replace(/\{immat\}/g, ex.immat).replace(/\{site\}/g, R.SITE); }

  var ONG = [['regles', 'R\u00e8gles automatiques', 'bolt'], ['conversations', 'Conversations', 'chat'], ['journal', 'Journal des envois', 'list'], ['campagne', 'Campagne', 'users']];
  var S = { vue: 'regles', regle: 'g60', actives: {}, conv: 0, camp: { modele: 0, sel: { c1: 1, c3: 1, c6: 1, f1: 1, f2: 1 }, filtre: 'Tous', etape: 1, canal: 'wa' }, jf: 'tous' };
  R.REGLES.forEach(function (r) { S.actives[r.id] = true; });

  function route() {
    var h = location.hash.replace(/^#\/?/, '');
    S.vue = ONG.some(function (o) { return o[0] === h; }) ? h : 'regles';
    $('#tabs').innerHTML = ONG.map(function (o) { return '<a class="ong' + (o[0] === S.vue ? ' on' : '') + '" href="#' + o[0] + '">' + ic(o[2], 's') + o[1] + '</a>'; }).join('');
    ({ regles: vRegles, conversations: vConv, journal: vJournal, campagne: vCamp })[S.vue]();
    var t = $('.ong.on'); if (t) $('#tabs').scrollLeft = t.offsetLeft - 20;
  }
  window.addEventListener('hashchange', function () { route(); window.scrollTo(0, 0); });

  // ---------- Aperçus WhatsApp et e-mail ----------
  function telWA(r) {
    return '<div class="phone"><div class="notch"></div><div class="screen">' +
      '<div class="sbar"><span>9:00</span><span>4G</span></div>' +
      '<div class="wa-head"><span class="back">\u2039</span><span class="wav"><img src="assets/favicon.png?v=20261124a" alt=""></span><div><p class="nm">CFAO Mobility BYD <span class="tick">\u2714</span></p><p class="st">compte professionnel</p></div></div>' +
      '<div class="chat"><div class="day">Aujourd\u2019hui</div><div class="row in"><div class="b"><span class="tag-auto">' + ic('bolt', 's') + 'Message automatique</span>' + esc(remplir(r.wa, r.ex)) + '<span class="meta">' + (r.heure === 'imm\u00e9diat' ? '16:12' : r.heure.replace(' h', ':00')) + '</span>' +
      '<div class="btns">' + r.btns.map(function (b) { return '<span>' + esc(b) + '</span>'; }).join('') + '</div></div></div></div>' +
      '<div class="wa-foot"><div class="inp"><em>Message</em></div><div class="mic"></div></div>' +
      '</div></div>';
  }
  function mailBox(r) {
    var o = remplir(r.objet, r.ex);
    return '<div class="mail"><div class="mail-h"><div class="mh-l"><span class="lib">De</span>CFAO Mobility BYD &lt;service.byd@cfao-exemple.ci&gt;</div><div class="mh-l"><span class="lib">\u00c0</span>' + esc(r.ex.nom.toLowerCase()) + '@exemple.ci</div><div class="mh-l"><span class="lib">Objet</span><b>' + esc(o) + '</b></div></div>' +
      '<div class="mail-c"><div class="mail-top"><img src="assets/logo-cfao.png?v=20261124a" alt="CFAO Mobility" width="900" height="266"><span class="byd-mark">BYD</span></div>' +
      r.mail.map(function (p) { return '<p>' + esc(remplir(p, r.ex)) + '</p>'; }).join('') +
      '<div class="mail-veh"><span class="lib">Votre v\u00e9hicule</span><b>BYD ' + esc(r.ex.modele) + '</b><span class="immat">' + esc(r.ex.immat) + '</span></div>' +
      '<a class="btn" href="#" onclick="return false">' + esc(r.cta) + '</a>' +
      '<p class="mail-sig">L\u2019\u00e9quipe apr\u00e8s-vente BYD, CFAO Mobility C\u00f4te d\u2019Ivoire<br>Atelier BYD, route de l\u2019A\u00e9roport, Abidjan. ' + R.TEL + '</p></div></div>';
  }

  // ---------- Règles ----------
  function vRegles() {
    var tot = R.REGLES.reduce(function (s, r) { return s + r.mois; }, 0);
    var rdv = R.REGLES.reduce(function (s, r) { return s + r.mois * r.taux.rdv / 100; }, 0);
    var lu = R.REGLES.reduce(function (s, r) { return s + r.mois * r.taux.lu / 100; }, 0) / tot * 100;
    var r = regle(S.regle);
    pg.innerHTML =
      '<div class="hello"><div><p class="lib">Huit r\u00e8gles, aucun envoi \u00e0 la main</p><h2>Les relances partent seules, au bon moment</h2></div><span class="note">Chiffres sur 30 jours, donn\u00e9es fictives</span></div>' +
      '<div class="kpis">' +
      ' <div class="kpi"><p class="k-lib">' + ic('send', 's') + 'Messages envoy\u00e9s</p><p class="k-val">' + nb(tot) + '</p><p class="k-ref">WhatsApp et e-mail, 30 derniers jours</p></div>' +
      ' <div class="kpi vert"><p class="k-lib">' + ic('check', 's') + 'Lus</p><p class="k-val">' + Math.round(lu) + ' %</p><p class="k-ref">sur WhatsApp, 61 % par e-mail</p></div>' +
      ' <div class="kpi"><p class="k-lib">' + ic('cal', 's') + 'Rendez-vous pris</p><p class="k-val">' + nb(rdv) + '</p><p class="k-ref">depuis un message, sans appel</p></div>' +
      ' <div class="kpi noir"><p class="k-lib">' + ic('clock', 's') + 'Temps conseiller \u00e9conomis\u00e9</p><p class="k-val">' + Math.round(tot * 4 / 60) + ' h</p><p class="k-ref">base 4 minutes par relance faite \u00e0 la main</p></div>' +
      '</div>' +
      '<div class="rg">' +
      ' <section class="bloc rl"><div class="bloc-tete"><h2>' + ic('bolt') + 'R\u00e8gles</h2></div><ul class="regles">' +
      R.REGLES.map(function (x) {
        return '<li class="' + (x.id === S.regle ? 'on' : '') + (S.actives[x.id] ? '' : ' off') + '" data-r="' + x.id + '"><span class="ti">' + ic(x.ic) + '</span><span class="rt"><b>' + esc(x.nom) + '</b><small>' + x.mois + ' envois, ' + x.taux.lu + ' % lus</small></span>' +
          '<label class="sw" title="Activer ou couper"><input type="checkbox" data-sw="' + x.id + '"' + (S.actives[x.id] ? ' checked' : '') + '><i></i></label></li>';
      }).join('') + '</ul></section>' +
      ' <section class="bloc rd">' +
      '  <div class="rd-h"><span class="ti">' + ic(r.ic) + '</span><div><h2>' + esc(r.nom) + '</h2><p class="note">' + (S.actives[r.id] ? '<span class="badge b-vert">' + ic('check', 's') + 'Active</span>' : '<span class="badge b-gris">Coup\u00e9e</span>') + '</p></div><button class="btn" id="tester">' + ic('play', 's') + 'D\u00e9clencher un essai</button></div>' +
      '  <dl class="rd-dl"><div><dt>Quand</dt><dd>' + esc(r.quand) + '</dd></div><div><dt>Pour qui</dt><dd>' + esc(r.cible) + '</dd></div><div><dt>Heure d\u2019envoi</dt><dd>' + esc(r.heure) + ', jamais apr\u00e8s 19 h ni le dimanche</dd></div><div><dt>Canaux</dt><dd>' + ic('msg', 's') + ' WhatsApp, puis ' + ic('mail', 's') + ' e-mail le m\u00eame jour</dd></div></dl>' +
      '  <div class="funnel">' + [['Envoy\u00e9s', 100], ['Lus', r.taux.lu], ['R\u00e9pondus', r.taux.rep], ['Rendez-vous', r.taux.rdv]].filter(function (f) { return !(f[0] === 'Rendez-vous' && f[1] === 0); }).map(function (f) { return '<div class="fu"><span>' + f[0] + '</span><div class="barre"><i style="width:' + f[1] + '%"></i></div><b class="mono">' + f[1] + ' %</b></div>'; }).join('') + '</div>' +
      '  <div class="apercus"><div class="ap"><p class="lib">' + ic('msg', 's') + ' Message WhatsApp</p>' + telWA(r) + '</div><div class="ap"><p class="lib">' + ic('mail', 's') + ' E-mail</p>' + mailBox(r) + '</div></div>' +
      ' </section>' +
      '</div>';
    $$('[data-r]').forEach(function (li) { li.onclick = function (e) { if (e.target.closest('.sw')) return; S.regle = li.getAttribute('data-r'); vRegles(); if (window.innerWidth < 900) $('.rd').scrollIntoView({ behavior: 'smooth' }); }; });
    $$('[data-sw]').forEach(function (c) { c.onchange = function () { S.actives[c.getAttribute('data-sw')] = c.checked; toast(c.checked ? 'R\u00e8gle activ\u00e9e.' : 'R\u00e8gle coup\u00e9e : plus aucun envoi pour elle.'); vRegles(); }; });
    $('#tester').onclick = function () { toast('Essai envoy\u00e9 sur le num\u00e9ro de test du service apr\u00e8s-vente, pas au client.'); };
  }

  // ---------- Conversations ----------
  var timer = [];
  function vConv() {
    var c = R.CONV[S.conv];
    pg.innerHTML =
      '<div class="hello"><div><p class="lib">De la relance au rendez-vous</p><h2>Le client r\u00e9pond, la conversation continue toute seule</h2></div></div>' +
      '<div class="scen">' + R.CONV.map(function (x, i) { return '<button class="sc' + (i === S.conv ? ' on' : '') + '" data-c="' + i + '"><span class="lib">' + esc(regle(x.regle).nom) + '</span><b>' + esc(x.client) + '</b></button>'; }).join('') + '</div>' +
      '<div class="stage">' +
      ' <div class="phone grand"><div class="notch"></div><div class="screen">' +
      '  <div class="sbar"><span>' + c.fil[0][1] + '</span><span>4G</span></div>' +
      '  <div class="wa-head"><span class="back">\u2039</span><span class="wav"><img src="assets/favicon.png?v=20261124a" alt=""></span><div><p class="nm">CFAO Mobility BYD <span class="tick">\u2714</span></p><p class="st" id="st">compte professionnel</p></div></div>' +
      '  <div class="chat" id="chat"><div class="day">Aujourd\u2019hui</div></div>' +
      '  <div class="wa-foot"><div class="inp"><em>Message</em></div><div class="mic"></div></div>' +
      ' </div></div>' +
      ' <aside class="side bloc"><p class="lib">Conversation ' + (S.conv + 1) + ' sur ' + R.CONV.length + '</p><h2 class="st-t">' + esc(c.titre) + '</h2>' +
      '  <ol class="etapes" id="et"></ol>' +
      '  <div class="kpi2"><div><b>' + esc(c.duree) + '</b><span>du premier message au r\u00e9sultat</span></div><div><b>' + esc(c.resultat) + '</b><span>r\u00e9sultat</span></div></div>' +
      '  <div class="ctrl"><button class="btn" id="rejouer">' + ic('redo', 's') + 'Rejouer</button><button class="btn ghost" id="tout">Tout afficher</button></div>' +
      '  <p class="mini">Un conseiller reprend la main d\u00e8s qu\u2019une question demande un humain : prix, d\u00e9lai, geste commercial.</p>' +
      ' </aside>' +
      '</div>';
    $$('[data-c]').forEach(function (b) { b.onclick = function () { S.conv = +b.getAttribute('data-c'); vConv(); }; });
    $('#rejouer').onclick = function () { jouer(c, false); };
    $('#tout').onclick = function () { jouer(c, true); };
    jouer(c, false);
  }
  function bulle(m) {
    var cls = m[0] === 'c' ? 'out' : 'in';
    var who = m[0] === 'h' ? '<span class="who h">Kouam\u00e9, conseiller atelier</span>' : (m[0] === 'b' ? '' : '');
    return '<div class="row ' + cls + '"><div class="b">' + who + m[2] + '<span class="meta">' + m[1] + (cls === 'out' ? ' <span class="tk">\u2713\u2713</span>' : '') + '</span>' +
      (m[3] ? '<div class="btns">' + m[3].map(function (b) { return '<span>' + esc(b) + '</span>'; }).join('') + '</div>' : '') + '</div></div>' +
      (m[4] ? '<div class="sys">' + ic('check', 's') + esc(m[4]) + '</div>' : '');
  }
  function jouer(c, d) {
    timer.forEach(clearTimeout); timer = [];
    var ch = $('#chat'), et = $('#et');
    ch.innerHTML = '<div class="day">Aujourd\u2019hui</div>'; et.innerHTML = '';
    c.fil.forEach(function (m, i) {
      var f = function () {
        if (!document.body.contains(ch)) return;
        ch.insertAdjacentHTML('beforeend', bulle(m).replace(/<span class="who h">[^<]*<\/span>/, m[0] === 'h' ? '<span class="who h">' + (c.regle === 'sat' ? 'Ange, chef d\u2019atelier' : 'Kouam\u00e9, conseiller atelier') + '</span>' : ''));
        ch.scrollTop = ch.scrollHeight;
        var lab = m[0] === 'c' ? 'Le client r\u00e9pond' : m[0] === 'h' ? 'Un humain reprend la main' : (i === 0 ? 'Relance automatique envoy\u00e9e' : 'R\u00e9ponse automatique');
        et.insertAdjacentHTML('beforeend', '<li class="' + m[0] + '"><span class="pt"></span><span><b>' + m[1] + '</b> ' + lab + '</span></li>');
        $('#st').textContent = m[0] === 'c' ? 'en ligne' : 'compte professionnel';
      };
      if (d) f(); else timer.push(setTimeout(f, 350 + i * 1100));
    });
    if (d) ch.scrollTop = ch.scrollHeight;
  }

  // ---------- Journal ----------
  var ST = { parti: ['Parti', 'b-gris'], lu: ['Lu', 'b-bleu'], repondu: ['R\u00e9pondu', 'b-orange'], rdv: ['Rendez-vous pris', 'b-vert'] };
  function vJournal() {
    var cpt = { parti: 0, lu: 0, repondu: 0, rdv: 0 };
    R.J.forEach(function (j) { cpt[j[6]]++; });
    var l = R.J.filter(function (j) { return S.jf === 'tous' || j[6] === S.jf || (S.jf === 'flotte' && j[2] === 'Flotte'); });
    // graphe 7 jours
    var jours = [['mer. 18', 31, 27, 9], ['jeu. 19', 44, 39, 12], ['ven. 20', 38, 33, 10], ['sam. 21', 22, 19, 6], ['lun. 23', 57, 50, 17], ['mar. 24', 26, 21, 8]];
    var mx = 60;
    pg.innerHTML =
      '<div class="hello"><div><p class="lib">Chaque envoi est trac\u00e9</p><h2>Journal des envois</h2></div><span class="note">Mis \u00e0 jour en continu</span></div>' +
      '<div class="kpis">' + ['parti', 'lu', 'repondu', 'rdv'].map(function (k) { return '<button class="kpi kf ' + (k === 'rdv' ? 'vert' : k === 'repondu' ? 'orange' : '') + '" data-jf="' + k + '"><p class="k-lib">' + ST[k][0] + '</p><p class="k-val">' + cpt[k] + '</p><p class="k-ref">sur les ' + R.J.length + ' derniers envois</p></button>'; }).join('') + '</div>' +
      '<div class="g2j">' +
      ' <section class="bloc"><div class="bloc-tete"><h2>' + ic('list') + 'Derniers envois</h2><div class="chips">' + [['tous', 'Tous'], ['rdv', 'Rendez-vous pris'], ['repondu', 'R\u00e9pondus'], ['flotte', 'Flottes']].map(function (f) { return '<button class="chip' + (S.jf === f[0] ? ' on' : '') + '" data-jf="' + f[0] + '">' + f[1] + '</button>'; }).join('') + '</div></div>' +
      '  <ul class="jl">' + l.map(function (j) { var r = regle(j[4]); return '<li><span class="mc ' + j[5] + '">' + ic(j[5] === 'wa' ? 'msg' : 'mail') + '</span><div class="jt"><p><b>' + esc(j[1]) + '</b> <span class="badge ' + (j[2] === 'Flotte' ? 'b-bleu' : 'b-gris') + '">' + j[2] + '</span></p><p class="note">' + esc(r.nom) + ', ' + esc(j[3]) + '</p>' + (j[7] ? '<p class="jd">' + esc(j[7]) + '</p>' : '') + '</div><div class="jr"><span class="badge ' + ST[j[6]][1] + '">' + ST[j[6]][0] + '</span><span class="note">' + j[0] + '</span></div></li>'; }).join('') + '</ul>' +
      ' </section>' +
      ' <section class="bloc"><div class="bloc-tete"><h2>' + ic('cal') + 'Six derniers jours ouvr\u00e9s</h2></div>' +
      '  <div class="leg"><span><i class="c1"></i>Envoy\u00e9s</span><span><i class="c2"></i>Lus</span><span><i class="c3"></i>Rendez-vous</span></div>' +
      '  <div class="gb">' + jours.map(function (d) { return '<div class="gc"><div class="gbs"><i class="c1" style="height:' + (d[1] / mx * 100) + '%"></i><i class="c2" style="height:' + (d[2] / mx * 100) + '%"></i><i class="c3" style="height:' + (d[3] / mx * 100) + '%"></i></div><small>' + d[0] + '</small></div>'; }).join('') + '</div>' +
      '  <div class="statuts"><p class="lib">Ce que veut dire chaque statut</p><p><span class="badge b-gris">Parti</span> remis au t\u00e9l\u00e9phone ou \u00e0 la bo\u00eete du client</p><p><span class="badge b-bleu">Lu</span> double coche bleue ou e-mail ouvert</p><p><span class="badge b-orange">R\u00e9pondu</span> le client a \u00e9crit ou cliqu\u00e9 un bouton</p><p><span class="badge b-vert">Rendez-vous pris</span> cr\u00e9neau inscrit au planning de l\u2019atelier</p></div>' +
      ' </section>' +
      '</div>';
    $$('[data-jf]').forEach(function (b) { b.onclick = function () { S.jf = b.getAttribute('data-jf'); vJournal(); }; });
  }

  // ---------- Campagne ----------
  function vCamp() {
    var C = S.camp, M = R.MODELES_CAMP[C.modele];
    var liste = R.CLIENTS.filter(function (c) { return C.filtre === 'Tous' || c.type === C.filtre; });
    var sel = R.CLIENTS.filter(function (c) { return C.sel[c.id]; });
    var ex = sel[0] || R.CLIENTS[0];
    var txt = M.txt.replace(/\{pr\u00e9nom\}/g, ex.prenom).replace(/\{mod\u00e8le\}/g, ex.modele);
    if (C.etape === 3) return suivi(sel, M);
    pg.innerHTML =
      '<div class="hello"><div><p class="lib">Plusieurs clients en une fois</p><h2>Campagne WhatsApp et e-mail</h2></div><ol class="pas"><li class="on">1 Choisir</li><li class="' + (C.etape >= 2 ? 'on' : '') + '">2 Relire</li><li>3 Suivre</li></ol></div>' +
      '<div class="cg">' +
      ' <section class="bloc"><div class="bloc-tete"><h2>' + ic('users') + 'Destinataires</h2><span class="note"><b id="nsel">' + sel.length + '</b> s\u00e9lectionn\u00e9s</span></div>' +
      '  <div class="chips cf">' + ['Tous', 'Particulier', 'Flotte'].map(function (f) { return '<button class="chip' + (C.filtre === f ? ' on' : '') + '" data-f="' + f + '">' + (f === 'Particulier' ? 'Particuliers' : f === 'Flotte' ? 'Flottes B2B' : f) + '</button>'; }).join('') + '<button class="chip" id="tous">Tout cocher</button></div>' +
      '  <ul class="cl">' + liste.map(function (c) { return '<li><label><input type="checkbox" data-s="' + c.id + '"' + (C.sel[c.id] ? ' checked' : '') + '><span class="av ' + (c.type === 'Flotte' ? 'pro' : '') + '">' + c.nom.split(' ').slice(0, 2).map(function (x) { return x[0]; }).join('') + '</span><span class="ct"><b>' + esc(c.nom) + '</b><small>BYD ' + esc(c.modele) + ', ' + esc(c.ville) + '</small></span><span class="badge ' + (c.type === 'Flotte' ? 'b-bleu' : 'b-gris') + '">' + c.type + '</span></label></li>'; }).join('') + '</ul>' +
      ' </section>' +
      ' <section class="bloc"><div class="bloc-tete"><h2>' + ic('msg') + 'Message</h2></div>' +
      '  <div class="chips">' + R.MODELES_CAMP.map(function (m, i) { return '<button class="chip' + (i === C.modele ? ' on' : '') + '" data-m="' + i + '">' + esc(m.nom) + '</button>'; }).join('') + '</div>' +
      '  <p class="lib mt">Texte commun, personnalis\u00e9 pour chacun</p><div class="modele">' + esc(M.txt).replace(/\{([^}]+)\}/g, '<mark>$1</mark>') + '</div>' +
      '  <p class="lib mt">Aper\u00e7u pour ' + esc(ex.nom) + '</p><div class="wa-mini"><div class="b">' + esc(txt) + '<span class="meta">10:00</span></div></div>' +
      '  <div class="canaux"><label><input type="radio" name="cn" value="wa"' + (C.canal === 'wa' ? ' checked' : '') + '> WhatsApp, e-mail si pas de WhatsApp</label><label><input type="radio" name="cn" value="2"' + (C.canal === '2' ? ' checked' : '') + '> WhatsApp et e-mail</label></div>' +
      '  <div class="valid"><span class="ti">' + ic('user') + '</span><p>Une campagne part apr\u00e8s validation du responsable apr\u00e8s-vente. Envoi \u00e9tal\u00e9 entre 10 h et 12 h, jamais le dimanche.</p></div>' +
      '  <button class="btn large" id="go"' + (sel.length ? '' : ' disabled') + '>' + ic('send', 's') + 'Envoyer \u00e0 ' + sel.length + ' destinataire' + (sel.length > 1 ? 's' : '') + '</button>' +
      ' </section>' +
      '</div>';
    $$('[data-f]').forEach(function (b) { b.onclick = function () { C.filtre = b.getAttribute('data-f'); vCamp(); }; });
    $$('[data-m]').forEach(function (b) { b.onclick = function () { C.modele = +b.getAttribute('data-m'); vCamp(); }; });
    $$('[data-s]').forEach(function (c) { c.onchange = function () { if (c.checked) C.sel[c.getAttribute('data-s')] = 1; else delete C.sel[c.getAttribute('data-s')]; vCamp(); }; });
    $$('[name=cn]').forEach(function (r) { r.onchange = function () { C.canal = r.value; }; });
    $('#tous').onclick = function () { liste.forEach(function (c) { C.sel[c.id] = 1; }); vCamp(); };
    $('#go').onclick = function () { C.etape = 3; vCamp(); window.scrollTo(0, 0); };
  }
  function suivi(sel, M) {
    var C = S.camp;
    var etats = sel.map(function () { return 0; });
    var fin = [3, 2, 3, 1, 3, 2, 1, 3, 2, 3, 1, 2];
    var lab = ['En file', 'Parti', 'Lu', 'R\u00e9pondu'];
    var rep = ['OUI, deux places', 'OUI', 'OUI, je viens avec mon \u00e9pouse', 'Combien de conducteurs maximum ?', 'Je confirme vendredi'];
    pg.innerHTML =
      '<div class="hello"><div><p class="lib">' + esc(M.nom) + '</p><h2>Suivi de la campagne</h2></div><ol class="pas"><li class="on">1 Choisir</li><li class="on">2 Relire</li><li class="on">3 Suivre</li></ol></div>' +
      '<div class="kpis" id="sk"></div>' +
      '<section class="bloc"><div class="tab-wrap"><table class="tab cartes"><thead><tr><th>Destinataire</th><th>Canal</th><th>Statut</th><th>R\u00e9ponse</th></tr></thead><tbody id="sb"></tbody></table></div>' +
      '<div class="ctrl2"><button class="btn ghost" id="new">Pr\u00e9parer une autre campagne</button></div></section>';
    function draw() {
      var n = [0, 0, 0, 0]; etats.forEach(function (e) { for (var k = 1; k <= e; k++) n[k]++; });
      $('#sk').innerHTML = [['Envoy\u00e9s', n[1], ''], ['Lus', n[2], 'vert'], ['R\u00e9pondus', n[3], 'orange'], ['Sur', sel.length, 'noir']].map(function (k) { return '<div class="kpi ' + k[2] + '"><p class="k-lib">' + k[0] + '</p><p class="k-val">' + k[1] + '</p><p class="k-ref">' + (k[0] === 'Sur' ? 'destinataires choisis' : Math.round(k[1] / sel.length * 100) + ' % des destinataires') + '</p></div>'; }).join('');
      $('#sb').innerHTML = sel.map(function (c, i) { var e = etats[i]; return '<tr><td data-l="Destinataire"><b>' + esc(c.nom) + '</b><small class="sub">BYD ' + esc(c.modele) + ', ' + esc(c.type === 'Flotte' ? 'flotte' : 'particulier') + '</small></td><td data-l="Canal">' + esc(c.canal) + '</td><td data-l="Statut"><span class="badge ' + ['b-gris', 'b-gris', 'b-bleu', 'b-vert'][e] + '">' + lab[e] + '</span></td><td data-l="R\u00e9ponse" class="note">' + (e === 3 ? '\u00ab ' + esc(rep[i % rep.length]) + ' \u00bb' : '') + '</td></tr>'; }).join('');
    }
    draw();
    var t = 0;
    var iv = setInterval(function () {
      if (!document.body.contains($('#sb'))) return clearInterval(iv);
      var bouge = false;
      etats = etats.map(function (e, i) { if (e < fin[i % fin.length] && Math.random() < .6) { bouge = true; return e + 1; } return e; });
      draw(); t++;
      if (t > 12) clearInterval(iv);
    }, 550);
    $('#new').onclick = function () { clearInterval(iv); C.etape = 1; vCamp(); };
  }

  route();
})();
