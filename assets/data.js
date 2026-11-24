/* Données fictives : clients, véhicules, numéros, montants. Modèles BYD et atelier de la route de l'Aéroport réels. */
window.R = (function () {
  var SITE = 'atelier BYD, route de l\u2019A\u00e9roport';
  var TEL = '07 00 00 46 46';

  // Règles automatiques : déclencheur, délai, canaux, message WhatsApp, e-mail
  var REGLES = [
    { id: 'g60', ic: 'shield', nom: 'Fin de garantie, J-60', quand: '60 jours avant la fin de la garantie v\u00e9hicule (date ou kilom\u00e9trage, le premier atteint)', cible: 'Particuliers et flottes', heure: '9 h', mois: 42,
      ex: { nom: 'Mari\u00e9tou', modele: 'Atto 3', immat: '4821 KL 01' },
      wa: 'Bonjour {pr\u00e9nom}, la garantie constructeur de votre BYD {mod\u00e8le} ({immat}) se termine dans 60 jours. C\u2019est le bon moment pour un contr\u00f4le complet \u00e0 l\u2019{site}, offert pendant la garantie.',
      btns: ['Prendre rendez-vous', 'Voir ma garantie', 'Parler \u00e0 un conseiller'],
      objet: 'Votre garantie BYD se termine dans 60 jours',
      mail: ['Bonjour {pr\u00e9nom},', 'La garantie constructeur de votre BYD {mod\u00e8le}, immatricul\u00e9e {immat}, arrive \u00e0 son terme dans 60 jours.', 'Nous vous proposons un contr\u00f4le complet avant cette date : tout d\u00e9faut couvert relev\u00e9 maintenant sera pris en charge.'],
      cta: 'Choisir mon cr\u00e9neau', taux: { lu: 91, rep: 38, rdv: 29 } },
    { id: 'g15', ic: 'shield', nom: 'Fin de garantie, J-15', quand: '15 jours avant la fin, seulement si aucun rendez-vous n\u2019a \u00e9t\u00e9 pris apr\u00e8s J-60', cible: 'Particuliers et flottes', heure: '9 h', mois: 17,
      ex: { nom: 'Abdoulaye', modele: 'Shark 6', immat: '2210 GH 01' },
      wa: '{pr\u00e9nom}, il reste 15 jours de garantie sur votre BYD {mod\u00e8le} ({immat}). Deux cr\u00e9neaux sont encore libres cette semaine \u00e0 l\u2019{site} pour le contr\u00f4le de fin de garantie.',
      btns: ['Jeudi 9 h', 'Vendredi 14 h', 'Autre date'],
      objet: 'Plus que 15 jours de garantie sur votre BYD',
      mail: ['Bonjour {pr\u00e9nom},', 'Il reste 15 jours de garantie sur votre BYD {mod\u00e8le} ({immat}).', 'Deux cr\u00e9neaux sont encore disponibles cette semaine pour le contr\u00f4le de fin de garantie, sans frais.'],
      cta: 'R\u00e9server un des deux cr\u00e9neaux', taux: { lu: 94, rep: 52, rdv: 44 } },
    { id: 'rev', ic: 'wrench', nom: 'R\u00e9vision due', quand: '30 jours avant l\u2019\u00e9ch\u00e9ance, ou 1\u202f500 km avant, selon le kilom\u00e9trage remont\u00e9 \u00e0 chaque passage', cible: 'Particuliers et flottes', heure: '9 h', mois: 118,
      ex: { nom: 'Mari\u00e9tou', modele: 'Song Plus DM-i', immat: '6107 MN 01' },
      wa: 'Bonjour {pr\u00e9nom}, votre BYD {mod\u00e8le} ({immat}) approche de sa r\u00e9vision des 20\u202f000 km. Elle dure environ 2 heures \u00e0 l\u2019{site}. Souhaitez-vous un cr\u00e9neau ?',
      btns: ['Oui, je choisis', 'Rappelez-moi', 'D\u00e9j\u00e0 fait'],
      objet: 'R\u00e9vision de votre BYD {mod\u00e8le} : choisissez votre cr\u00e9neau',
      mail: ['Bonjour {pr\u00e9nom},', 'Votre BYD {mod\u00e8le} ({immat}) arrive \u00e0 sa r\u00e9vision des 20\u202f000 km.', 'Respecter le calendrier d\u2019entretien BYD pr\u00e9serve votre garantie. Comptez environ 2 heures sur place.'],
      cta: 'Prendre rendez-vous', taux: { lu: 88, rep: 41, rdv: 33 } },
    { id: 'vt', ic: 'clip', nom: 'Visite technique, J-30', quand: '30 jours avant la date limite de la visite technique', cible: 'Particuliers, gestionnaire et conducteur pour les flottes', heure: '9 h', mois: 64,
      ex: { nom: 'Mari\u00e9tou', modele: 'Atto 3', immat: '4821 KL 01' },
      wa: 'Bonjour {pr\u00e9nom}, la visite technique de votre BYD {mod\u00e8le} ({immat}) est \u00e0 faire avant le 19 d\u00e9cembre. Un contr\u00f4le avant visite (freins, \u00e9clairage, pneus) \u00e0 l\u2019{site} vous \u00e9vite une contre-visite.',
      btns: ['R\u00e9server le contr\u00f4le', 'Merci, c\u2019est not\u00e9'],
      objet: 'Visite technique de votre BYD avant le 19 d\u00e9cembre',
      mail: ['Bonjour {pr\u00e9nom},', 'La visite technique de votre BYD {mod\u00e8le} ({immat}) doit \u00eatre faite avant le 19 d\u00e9cembre.', 'Nous vous proposons un contr\u00f4le avant visite : freinage, \u00e9clairage, pneus et essuie-glaces.'],
      cta: 'R\u00e9server le contr\u00f4le avant visite', taux: { lu: 90, rep: 35, rdv: 24 } },
    { id: 'pret', ic: 'car', nom: 'V\u00e9hicule pr\u00eat en atelier', quand: 'D\u00e8s que le technicien passe l\u2019ordre de r\u00e9paration en \u00ab Pr\u00eat \u00bb', cible: 'Particuliers, gestionnaire et conducteur pour les flottes', heure: 'imm\u00e9diat', mois: 96,
      ex: { nom: 'Yao', modele: 'Shark 6', immat: '2214 GH 01' },
      wa: 'Bonne nouvelle {pr\u00e9nom} : votre BYD {mod\u00e8le} ({immat}) est pr\u00eate. Vous pouvez la r\u00e9cup\u00e9rer \u00e0 l\u2019{site} jusqu\u2019\u00e0 17 h 30. La facture est dans votre espace client.',
      btns: ['Je passe aujourd\u2019hui', 'Je passe demain', 'Voir la facture'],
      objet: 'Votre BYD {mod\u00e8le} est pr\u00eate',
      mail: ['Bonjour {pr\u00e9nom},', 'Les travaux sur votre BYD {mod\u00e8le} ({immat}) sont termin\u00e9s.', 'Vous pouvez la r\u00e9cup\u00e9rer du lundi au vendredi, de 7 h 30 \u00e0 12 h et de 14 h \u00e0 17 h 30.'],
      cta: 'Voir le d\u00e9tail et la facture', taux: { lu: 98, rep: 71, rdv: 0 } },
    { id: 'devis', ic: 'clip', nom: 'Devis \u00e0 valider', quand: 'D\u00e8s que le devis est \u00e9tabli, puis relance apr\u00e8s 24 heures sans r\u00e9ponse', cible: 'Particuliers ; gestionnaire et comptabilit\u00e9 pour les flottes', heure: 'imm\u00e9diat', mois: 58,
      ex: { nom: 'Serge', modele: 'Song Plus DM-i', immat: '4411 LM 01' },
      wa: '{pr\u00e9nom}, le devis pour votre BYD {mod\u00e8le} ({immat}) est pr\u00eat : 480\u202f000 FCFA TTC (pare-chocs arri\u00e8re, peinture et pose). R\u00e9pondez OUI pour lancer la r\u00e9paration.',
      btns: ['OUI, je valide', 'Voir le d\u00e9tail', 'Une question'],
      objet: 'Devis DV 26-11466 \u00e0 valider',
      mail: ['Bonjour {pr\u00e9nom},', 'Voici le devis pour votre BYD {mod\u00e8le} ({immat}) : 480\u202f000 FCFA TTC.', 'D\u00e8s votre accord, la r\u00e9paration d\u00e9marre et le v\u00e9hicule est pr\u00eat sous 48 heures ouvr\u00e9es.'],
      cta: 'Valider le devis', taux: { lu: 97, rep: 83, rdv: 0 } },
    { id: 'evt', ic: 'star', nom: 'Invitation \u00e0 un \u00e9v\u00e9nement', quand: '15 jours avant l\u2019\u00e9v\u00e9nement, rappel la veille aux inscrits', cible: 'Selon le mod\u00e8le et le profil (flottes pour les essais Shark 6)', heure: '10 h', mois: 210,
      ex: { nom: 'Mari\u00e9tou', modele: 'Atto 3', immat: '4821 KL 01' },
      wa: '{pr\u00e9nom}, vous \u00eates invit\u00e9e \u00e0 d\u00e9couvrir le BYD Ti7 en avant-premi\u00e8re, jeudi 10 d\u00e9cembre de 17 h \u00e0 20 h au showroom BYD, route de l\u2019A\u00e9roport. Essais sur r\u00e9servation.',
      btns: ['Je m\u2019inscris', 'Je viens accompagn\u00e9e', 'Pas cette fois'],
      objet: 'Invitation : le BYD Ti7 en avant-premi\u00e8re',
      mail: ['Bonjour {pr\u00e9nom},', 'En tant que cliente BYD, vous \u00eates invit\u00e9e \u00e0 d\u00e9couvrir le Ti7 en avant-premi\u00e8re, le jeudi 10 d\u00e9cembre de 17 h \u00e0 20 h.', 'Showroom BYD, route de l\u2019A\u00e9roport. Essais sur r\u00e9servation.'],
      cta: 'Je m\u2019inscris', taux: { lu: 86, rep: 47, rdv: 39 } },
    { id: 'sat', ic: 'heart', nom: 'Enqu\u00eate de satisfaction, J+3', quand: '3 jours apr\u00e8s la restitution du v\u00e9hicule', cible: 'Particuliers et conducteurs des flottes', heure: '11 h', mois: 92,
      ex: { nom: 'Konan', modele: 'Shark 6', immat: '2211 GH 01' },
      wa: 'Bonjour {pr\u00e9nom}, votre BYD {mod\u00e8le} est pass\u00e9e \u00e0 l\u2019atelier il y a 3 jours. Sur une note de 1 \u00e0 5, comment s\u2019est pass\u00e9e votre visite ?',
      btns: ['5, tr\u00e8s bien', '3 ou 4', '1 ou 2, un souci'],
      objet: 'Votre avis sur votre passage \u00e0 l\u2019atelier BYD',
      mail: ['Bonjour {pr\u00e9nom},', 'Votre BYD {mod\u00e8le} ({immat}) est pass\u00e9e \u00e0 l\u2019atelier il y a 3 jours.', 'Une question, 30 secondes : comment s\u2019est pass\u00e9e votre visite ? Une note basse est transmise le jour m\u00eame au chef d\u2019atelier.'],
      cta: 'Donner ma note', taux: { lu: 84, rep: 46, rdv: 0 } }
  ];

  // Journal des envois (fictif)
  var J = [
    ['24/11 9 h 00', 'Mari\u00e9tou Kouadio', 'Particulier', 'Atto 3, 4821 KL 01', 'vt', 'wa', 'rdv', 'R\u00e9serv\u00e9 : jeudi 26/11 \u00e0 9 h'],
    ['24/11 9 h 00', 'Mari\u00e9tou Kouadio', 'Particulier', 'Atto 3, 4821 KL 01', 'vt', 'mail', 'lu', ''],
    ['24/11 8 h 02', 'Mari\u00e9tou Kouadio', 'Particulier', 'Song Plus DM-i, 6107 MN 01', 'devis', 'wa', 'repondu', '\u00ab Est-ce que les plaquettes sont d\u2019origine ? \u00bb'],
    ['24/11 7 h 50', 'Lagune Express Logistique', 'Flotte', 'Shark 6, 2214 GH 01', 'rev', 'wa', 'rdv', 'D\u00e9pos\u00e9 ce matin \u00e0 7 h 45'],
    ['23/11 17 h 40', 'Lagune Express Logistique', 'Flotte', 'Song Plus DM-i, 4411 LM 01', 'devis', 'mail', 'lu', 'Ouvert par la comptabilit\u00e9'],
    ['23/11 17 h 40', 'Lagune Express Logistique', 'Flotte', 'Song Plus DM-i, 4411 LM 01', 'devis', 'wa', 'lu', ''],
    ['23/11 16 h 12', 'Ibrahim Ouattara', 'Particulier', 'Dolphin, 7712 PQ 01', 'pret', 'wa', 'repondu', '\u00ab Je passe \u00e0 17 h \u00bb'],
    ['23/11 11 h 00', 'Konan Brou', 'Flotte', 'Shark 6, 2211 GH 01', 'sat', 'wa', 'repondu', 'Note 5 sur 5'],
    ['23/11 9 h 00', 'Lagune Express Logistique', 'Flotte', 'Shark 6, 2210 GH 01', 'g60', 'wa', 'rdv', 'R\u00e9serv\u00e9 : lundi 30/11 \u00e0 8 h'],
    ['23/11 9 h 00', 'Lagune Express Logistique', 'Flotte', 'Shark 6, 2215 GH 01', 'g60', 'mail', 'parti', ''],
    ['22/11 11 h 00', 'Christelle Aka', 'Particulier', 'Atto 3, 6620 KL 01', 'sat', 'wa', 'repondu', 'Note 2 sur 5, transmise au chef d\u2019atelier'],
    ['21/11 10 h 00', 'Rodrigue Ble', 'Particulier', 'Song Plus DM-i, 5503 MN 01', 'evt', 'wa', 'rdv', 'Inscrit au lancement du Ti7'],
    ['21/11 10 h 00', 'Fatou Camara', 'Particulier', 'Dolphin, 8801 PQ 01', 'evt', 'mail', 'lu', ''],
    ['20/11 9 h 00', 'Transports S\u00e9curis\u00e9s du Sud', 'Flotte', 'Atto 3, 1190 JK 01', 'rev', 'wa', 'parti', 'Relance pr\u00e9vue le 27/11'],
    ['20/11 9 h 00', 'Pharmacie des Deux Plateaux', 'Flotte', 'Atto 2 DM-i, 9902 NP 01', 'vt', 'wa', 'rdv', 'R\u00e9serv\u00e9 : mardi 1/12 \u00e0 14 h']
  ];

  // Destinataires possibles d'une campagne
  var CLIENTS = [
    { id: 'c1', nom: 'Mari\u00e9tou Kouadio', prenom: 'Mari\u00e9tou', type: 'Particulier', modele: 'Atto 3', ville: 'Cocody', tel: '07 48 21 63 05', canal: 'WhatsApp et e-mail' },
    { id: 'c2', nom: 'Ibrahim Ouattara', prenom: 'Ibrahim', type: 'Particulier', modele: 'Dolphin', ville: 'Marcory', tel: '05 66 12 08 47', canal: 'WhatsApp' },
    { id: 'c3', nom: 'Christelle Aka', prenom: 'Christelle', type: 'Particulier', modele: 'Atto 3', ville: 'Riviera', tel: '07 09 55 31 20', canal: 'WhatsApp et e-mail' },
    { id: 'c4', nom: 'Rodrigue Ble', prenom: 'Rodrigue', type: 'Particulier', modele: 'Song Plus DM-i', ville: 'Plateau', tel: '01 42 77 90 13', canal: 'E-mail' },
    { id: 'c5', nom: 'Fatou Camara', prenom: 'Fatou', type: 'Particulier', modele: 'Dolphin', ville: 'Bingerville', tel: '07 77 30 18 64', canal: 'WhatsApp' },
    { id: 'c6', nom: 'Didier Kouakou', prenom: 'Didier', type: 'Particulier', modele: 'Song Plus DM-i', ville: 'Yopougon', tel: '05 01 84 26 39', canal: 'WhatsApp et e-mail' },
    { id: 'c7', nom: 'A\u00efcha Bamba', prenom: 'A\u00efcha', type: 'Particulier', modele: 'Atto 2 DM-i', ville: 'Cocody', tel: '07 58 40 22 91', canal: 'WhatsApp' },
    { id: 'f1', nom: 'Lagune Express Logistique', prenom: 'Serge', type: 'Flotte', modele: 'Shark 6', ville: '12 v\u00e9hicules', tel: '07 59 13 40 22', canal: 'WhatsApp et e-mail' },
    { id: 'f2', nom: 'Transports S\u00e9curis\u00e9s du Sud', prenom: 'Mireille', type: 'Flotte', modele: 'Atto 3', ville: '8 v\u00e9hicules', tel: '07 21 64 85 03', canal: 'WhatsApp et e-mail' },
    { id: 'f3', nom: 'Pharmacie des Deux Plateaux', prenom: 'Arsène', type: 'Flotte', modele: 'Atto 2 DM-i', ville: '3 v\u00e9hicules', tel: '05 44 70 19 86', canal: 'E-mail' },
    { id: 'f4', nom: 'BTP Ivoire Construction', prenom: 'Koffi', type: 'Flotte', modele: 'Shark 6', ville: '15 v\u00e9hicules', tel: '07 03 92 57 14', canal: 'WhatsApp et e-mail' },
    { id: 'f5', nom: 'Groupe scolaire Les Lauriers', prenom: 'Odile', type: 'Flotte', modele: 'Song Plus DM-i', ville: '4 v\u00e9hicules', tel: '01 70 18 33 52', canal: 'WhatsApp' }
  ];

  var MODELES_CAMP = [
    { id: 'ti7', nom: 'Lancement du Ti7', txt: 'Bonjour {pr\u00e9nom}, vous roulez en BYD {mod\u00e8le} : nous vous invitons \u00e0 d\u00e9couvrir le Ti7 en avant-premi\u00e8re, jeudi 10 d\u00e9cembre de 17 h \u00e0 20 h, showroom BYD route de l\u2019A\u00e9roport. R\u00e9pondez OUI pour r\u00e9server votre place.' },
    { id: 'po', nom: 'Portes ouvertes atelier', txt: 'Bonjour {pr\u00e9nom}, samedi 12 d\u00e9cembre de 9 h \u00e0 15 h, l\u2019atelier BYD ouvre ses portes : contr\u00f4le offert de la batterie et des pneus de votre {mod\u00e8le}. R\u00e9pondez OUI pour r\u00e9server un passage.' },
    { id: 'shark', nom: 'Essais Shark 6 pour les flottes', txt: 'Bonjour {pr\u00e9nom}, matin\u00e9e essais Shark 6 r\u00e9serv\u00e9e aux flottes le samedi 5 d\u00e9cembre, 8 h 30 \u00e0 12 h : charge utile, autonomie et co\u00fbt au kilom\u00e8tre compar\u00e9s. Combien de conducteurs souhaitez-vous inscrire ?' }
  ];

  // Conversations : relance automatique puis réponse du client jusqu'au rendez-vous
  var CONV = [
    { id: 'k1', titre: 'Visite technique : la cliente r\u00e9serve en 40 secondes', client: 'Mari\u00e9tou Kouadio', regle: 'vt', resultat: 'Rendez-vous pris sans appel', duree: '40 s', fil: [
      ['b', '9:00', 'Bonjour Mari\u00e9tou, la visite technique de votre BYD Atto 3 (4821 KL 01) est \u00e0 faire avant le 19 d\u00e9cembre. Un contr\u00f4le avant visite \u00e0 l\u2019atelier BYD, route de l\u2019A\u00e9roport, vous \u00e9vite une contre-visite.', ['R\u00e9server le contr\u00f4le', 'Merci, c\u2019est not\u00e9']],
      ['c', '9:14', 'R\u00e9server le contr\u00f4le'],
      ['b', '9:14', 'Voici les prochains cr\u00e9neaux libres :', ['Mer. 25/11, 14 h', 'Jeu. 26/11, 9 h', 'Ven. 27/11, 10 h 30']],
      ['c', '9:15', 'Jeu. 26/11, 9 h'],
      ['b', '9:15', '\u2705 C\u2019est r\u00e9serv\u00e9 : <b>jeudi 26 novembre \u00e0 9 h</b>, atelier BYD route de l\u2019A\u00e9roport. Dur\u00e9e : 45 minutes. Je vous le rappelle mercredi \u00e0 17 h.', null, 'Rendez-vous ajout\u00e9 au planning de l\u2019atelier']
    ] },
    { id: 'k2', titre: 'Devis : la question va au conseiller, la r\u00e9ponse revient', client: 'Mari\u00e9tou Kouadio', regle: 'devis', resultat: 'Devis valid\u00e9 dans l\u2019heure', duree: '52 min', fil: [
      ['b', '8:02', 'Mari\u00e9tou, le devis pour votre BYD Song Plus DM-i (6107 MN 01) est pr\u00eat : <b>131\u202f000 FCFA TTC</b> (plaquettes avant, main-d\u2019\u0153uvre 1 h 30). R\u00e9pondez OUI pour lancer la r\u00e9paration.', ['OUI, je valide', 'Voir le d\u00e9tail', 'Une question']],
      ['c', '8:31', 'Est-ce que les plaquettes sont d\u2019origine BYD ?'],
      ['b', '8:31', 'Je transmets votre question \u00e0 votre conseiller atelier, il vous r\u00e9pond ici m\u00eame.', null, 'Question transmise au conseiller atelier'],
      ['h', '8:49', 'Bonjour Madame Kouadio, oui : plaquettes d\u2019origine BYD, garanties 12 mois. Kouam\u00e9, conseiller atelier.'],
      ['c', '8:54', 'OUI, je valide'],
      ['b', '8:54', '\u2705 Devis valid\u00e9. La r\u00e9paration d\u00e9marre ; vous recevrez un message d\u00e8s que votre v\u00e9hicule sera pr\u00eat, pr\u00e9vu mercredi vers 16 h.', null, 'Statut atelier : En r\u00e9paration']
    ] },
    { id: 'k3', titre: 'Flotte : fin de garantie sur un pick-up tr\u00e8s roulant', client: 'Lagune Express Logistique', regle: 'g60', resultat: 'Contr\u00f4le planifi\u00e9 avant la fin', duree: '3 min', fil: [
      ['b', '9:00', 'Bonjour Serge, la garantie constructeur du BYD Shark 6 <b>2210 GH 01</b> (conducteur : Abdoulaye Sanogo) se termine dans environ 51 jours : le v\u00e9hicule atteindra 150\u202f000 km vers mi-janvier au rythme actuel.', ['Planifier le contr\u00f4le', 'Voir la flotte', 'Parler \u00e0 un conseiller']],
      ['c', '9:02', 'Planifier le contr\u00f4le'],
      ['b', '9:02', 'Le v\u00e9hicule 2211 GH 01 arrive au m\u00eame seuil peu apr\u00e8s. Je peux grouper les deux le m\u00eame matin :', ['Lundi 30/11, 8 h', 'Mardi 1/12, 8 h']],
      ['c', '9:03', 'Lundi 30/11, 8 h'],
      ['b', '9:03', '\u2705 Deux contr\u00f4les de fin de garantie r\u00e9serv\u00e9s <b>lundi 30 novembre \u00e0 8 h</b> pour 2210 GH 01 et 2211 GH 01. Abdoulaye Sanogo et Konan Brou sont pr\u00e9venus sur WhatsApp.', null, 'Conducteurs pr\u00e9venus automatiquement']
    ] },
    { id: 'k4', titre: 'Note basse : le chef d\u2019atelier rappelle le jour m\u00eame', client: 'Christelle Aka', regle: 'sat', resultat: 'Client rappel\u00e9 en 25 minutes', duree: '25 min', fil: [
      ['b', '11:00', 'Bonjour Christelle, votre BYD Atto 3 est pass\u00e9e \u00e0 l\u2019atelier il y a 3 jours. Sur une note de 1 \u00e0 5, comment s\u2019est pass\u00e9e votre visite ?', ['5, tr\u00e8s bien', '3 ou 4', '1 ou 2, un souci']],
      ['c', '11:06', '1 ou 2, un souci'],
      ['b', '11:06', 'Merci de nous le dire. Qu\u2019est-ce qui n\u2019a pas \u00e9t\u00e9 ?'],
      ['c', '11:08', 'J\u2019ai attendu 2 heures de plus que pr\u00e9vu et personne ne m\u2019a pr\u00e9venue.'],
      ['b', '11:08', 'Je suis d\u00e9sol\u00e9. Je transmets tout de suite au chef d\u2019atelier, qui vous appelle aujourd\u2019hui.', null, 'Alerte envoy\u00e9e au chef d\u2019atelier'],
      ['h', '11:31', 'Madame Aka, ici Ange, chef d\u2019atelier. Je vous appelle dans 5 minutes pour comprendre ce qui s\u2019est pass\u00e9.']
    ] }
  ];

  return { SITE: SITE, TEL: TEL, REGLES: REGLES, J: J, CLIENTS: CLIENTS, MODELES_CAMP: MODELES_CAMP, CONV: CONV };
})();
