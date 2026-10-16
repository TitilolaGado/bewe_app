
const C = document.getElementById('content');
const STORAGE_KEY = 'bewe_organisation_data_v1';

const defaults = {
  members: [
    {id:1,name:'A. Mensah',quality:'Membre actif',cell:'Atlantique',dues:'À jour',email:'a.mensah@bewe.org'},
    {id:2,name:'F. Kora',quality:'Membre actif',cell:'Littoral',dues:'À jour',email:'f.kora@bewe.org'},
    {id:3,name:'S. Dossou',quality:'Membre fondateur',cell:'Ouémé',dues:'À vérifier',email:'s.dossou@bewe.org'},
    {id:4,name:'M. Bio',quality:'Membre sympathisant',cell:'Borgou',dues:'—',email:'m.bio@bewe.org'}
  ],
  meetings: [
    {id:1,instance:"Conseil d’Administration",type:'Ordinaire',date:'2026-10-12',subject:'Suivi des activités',status:'Préparation'},
    {id:2,instance:'Assemblée Générale',type:'Ordinaire',date:'2026-11-15',subject:'Rapports & budget',status:'À planifier'}
  ],
  decisions: [
    {id:1,title:'Mettre à jour le registre des membres',body:'CA',owner:'Secrétariat général',due:'2026-10-15',status:'En cours'},
    {id:2,title:'Consolider les pièces financières',body:'CA',owner:'Trésorerie',due:'2026-10-20',status:'À faire'}
  ],
  documents: [
    {id:1,title:'Statuts du Réseau BeWE',category:'Texte organique',version:'08/04/2026',access:'Référence'},
    {id:2,title:'Règlement intérieur',category:'Texte organique',version:'2026',access:'Interne'},
    {id:3,title:'Registre des délibérations',category:'Registre',version:'En cours',access:'Restreint'}
  ],
  finances: [
    {id:1,date:'2026-09-20',label:'Cotisations membres',type:'Recette',amount:450000,status:'Enregistrée',proof:'Oui'},
    {id:2,date:'2026-09-25',label:'Logistique activité',type:'Dépense',amount:175000,status:'Payée',proof:'Oui'},
    {id:3,date:'2026-10-01',label:'Communication',type:'Dépense',amount:120000,status:'À valider',proof:'Non'}
  ],
  programs: [
    {id:1,title:'Renforcement des capacités entrepreneuriales',owner:'Programmes',date:'2026-10-18',status:'Planifiée'},
    {id:2,title:'Atelier accès aux marchés',owner:'Cellule Littoral',date:'2026-10-25',status:'En préparation'}
  ],
  opportunities: [
    {id:1,title:'Appel à exposantes',type:'Marché',due:'2026-10-18',target:'Membres BeWE',status:'À diffuser'},
    {id:2,title:'Programme de financement PME',type:'Financement',due:'2026-10-30',target:'PME féminines',status:'À analyser'}
  ],
  partners: [
    {id:1,name:'Partenaire A',domain:'Formation',contact:'Point focal A',status:'Actif',next:'Revue trimestrielle'},
    {id:2,name:'Institution B',domain:'Financement',contact:'Point focal B',status:'Prospect',next:'Envoyer dossier'}
  ],
  communications: [
    {id:1,title:'Campagne visibilité membres',channel:'Réseaux sociaux',date:'2026-10-10',status:'Planifiée'},
    {id:2,title:'Annonce activité BeWE',channel:'Presse / Web',date:'2026-10-15',status:'Brouillon'}
  ]
};

function clone(v){ return JSON.parse(JSON.stringify(v)); }

const demoData = {
  members: [
    {id:1,name:'Aïcha Mensah',quality:'Membre fondateur',cell:'Atlantique',dues:'À jour',email:'aicha.mensah@demo.bewe'},
    {id:2,name:'Fatou Kora',quality:'Membre actif',cell:'Littoral',dues:'À jour',email:'fatou.kora@demo.bewe'},
    {id:3,name:'Solange Dossou',quality:'Membre actif',cell:'Ouémé',dues:'À vérifier',email:'solange.dossou@demo.bewe'},
    {id:4,name:'Mariama Bio',quality:'Membre sympathisant',cell:'Borgou',dues:'En retard',email:'mariama.bio@demo.bewe'},
    {id:5,name:'Grâce Hounkpatin',quality:'Membre actif',cell:'Zou',dues:'À jour',email:'grace.h@demo.bewe'},
    {id:6,name:'Nadia Toko',quality:'Membre actif',cell:'Atacora',dues:'À jour',email:'nadia.toko@demo.bewe'},
    {id:7,name:'Rokia Sabi',quality:'Membre d’honneur',cell:'Alibori',dues:'—',email:'rokia.sabi@demo.bewe'},
    {id:8,name:'Estelle Agossou',quality:'Membre actif',cell:'Mono',dues:'À jour',email:'estelle.agossou@demo.bewe'}
  ],
  meetings: [
    {id:1,instance:"Conseil d’Administration",type:'Ordinaire',date:'2026-10-12',subject:'Suivi du plan d’actions et des cellules départementales',status:'Confirmée'},
    {id:2,instance:'Assemblée Générale',type:'Ordinaire',date:'2026-11-15',subject:'Rapports d’activités, finances et perspectives',status:'Préparation'},
    {id:3,instance:'Direction Exécutive',type:'Technique',date:'2026-10-08',subject:'Préparation du programme entrepreneuriat féminin',status:'Tenue'},
    {id:4,instance:'Conseil de Surveillance',type:'Ordinaire',date:'2026-10-22',subject:'Revue des pièces et procédures financières',status:'À planifier'}
  ],
  decisions: [
    {id:1,title:'Mettre à jour le registre consolidé des membres',body:'CA',owner:'Secrétariat général',due:'2026-10-15',status:'En cours'},
    {id:2,title:'Consolider les justificatifs du troisième trimestre',body:'Conseil de Surveillance',owner:'Trésorerie',due:'2026-10-20',status:'À faire'},
    {id:3,title:'Diffuser l’appel à participation à toutes les cellules',body:'Direction Exécutive',owner:'Communication',due:'2026-10-10',status:'Exécutée'},
    {id:4,title:'Préparer le rapport semestriel des activités',body:'CA',owner:'Direction Exécutive',due:'2026-10-30',status:'En cours'}
  ],
  documents: [
    {id:1,title:'Statuts du Réseau BeWE',category:'Texte organique',version:'08/04/2026',access:'Référence'},
    {id:2,title:'Règlement intérieur BeWE',category:'Texte organique',version:'2026',access:'Interne'},
    {id:3,title:'Procès-verbal réunion du CA',category:'Procès-verbal',version:'Septembre 2026',access:'Restreint'},
    {id:4,title:'Rapport semestriel des activités',category:'Rapport',version:'Brouillon',access:'Interne'},
    {id:5,title:'Budget prévisionnel annuel',category:'Budget',version:'2026',access:'Restreint'}
  ],
  finances: [
    {id:1,date:'2026-09-20',label:'Cotisations des membres',type:'Recette',amount:1450000,status:'Enregistrée',proof:'Oui'},
    {id:2,date:'2026-09-25',label:'Logistique atelier entrepreneuriat',type:'Dépense',amount:375000,status:'Payée',proof:'Oui'},
    {id:3,date:'2026-10-01',label:'Communication institutionnelle',type:'Dépense',amount:220000,status:'À valider',proof:'Non'},
    {id:4,date:'2026-10-03',label:'Appui partenaire au programme',type:'Recette',amount:2500000,status:'Enregistrée',proof:'Oui'},
    {id:5,date:'2026-10-05',label:'Location salle de formation',type:'Dépense',amount:180000,status:'Validée',proof:'Oui'}
  ],
  programs: [
    {id:1,title:'Renforcement des capacités entrepreneuriales',owner:'Direction Exécutive',date:'2026-10-18',status:'Planifiée'},
    {id:2,title:'Atelier accès aux marchés',owner:'Cellule Littoral',date:'2026-10-25',status:'En préparation'},
    {id:3,title:'Leadership et gouvernance des femmes entrepreneures',owner:'Programmes',date:'2026-11-05',status:'Planifiée'},
    {id:4,title:'Formalisation et certification des entreprises',owner:'Cellule Atlantique',date:'2026-10-28',status:'En cours'}
  ],
  opportunities: [
    {id:1,title:'Appel à exposantes – Salon entrepreneuriat féminin',type:'Marché',due:'2026-10-18',target:'Membres BeWE',status:'À diffuser'},
    {id:2,title:'Programme de financement PME féminines',type:'Financement',due:'2026-10-30',target:'PME féminines',status:'À analyser'},
    {id:3,title:'Formation au commerce numérique',type:'Formation',due:'2026-11-03',target:'Entrepreneures membres',status:'Ouverte'},
    {id:4,title:'Rencontre B2B avec entreprises partenaires',type:'Partenariat',due:'2026-11-12',target:'Entreprises membres',status:'Ouverte'}
  ],
  partners: [
    {id:1,name:'Fondation Démo Alpha',domain:'Formation',contact:'Mme A. Demo',status:'Actif',next:'Revue trimestrielle'},
    {id:2,name:'Institution Finance Démo',domain:'Financement',contact:'M. K. Demo',status:'Contact établi',next:'Transmettre la note conceptuelle'},
    {id:3,name:'Réseau Entreprendre Démo',domain:'Accès aux marchés',contact:'Mme F. Demo',status:'Prospect',next:'Organiser une réunion de cadrage'},
    {id:4,name:'Tech Women Démo',domain:'Numérique',contact:'Mme N. Demo',status:'Actif',next:'Préparer un atelier conjoint'}
  ],
  communications: [
    {id:1,title:'Campagne visibilité des membres',channel:'Réseaux sociaux',date:'2026-10-10',status:'Planifiée'},
    {id:2,title:'Annonce de l’atelier accès aux marchés',channel:'WhatsApp',date:'2026-10-15',status:'Brouillon'},
    {id:3,title:'Communiqué institutionnel BeWE',channel:'Presse / Web',date:'2026-10-20',status:'Planifiée'},
    {id:4,title:'Newsletter mensuelle du Réseau',channel:'E-mail',date:'2026-10-31',status:'Brouillon'}
  ]
};

function loadDemoData(){
  const hasData = Object.values(db).some(arr => Array.isArray(arr) && arr.length > 0);
  const message = hasData
    ? "Charger le jeu de démonstration remplacera les données actuellement enregistrées dans ce navigateur. Continuer ?"
    : "Charger le jeu de données de démonstration complet ?";
  if(!confirm(message)) return;
  db = clone(demoData);
  saveData();
  alert("Jeu de données de démonstration chargé dans tous les modules.");
  setActive('dashboard');
  dashboard();
}

function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return clone(defaults);
    const parsed = JSON.parse(raw);
    return Object.fromEntries(
      Object.keys(defaults).map(k=>[k, Array.isArray(parsed[k]) ? parsed[k] : clone(defaults[k])])
    );
  }catch(e){
    console.warn('BeWE: données locales invalides, valeurs par défaut chargées.', e);
    return clone(defaults);
  }
}
let db = loadData();
function saveData(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}
function nextId(collection){
  return collection.length ? Math.max(...collection.map(x=>Number(x.id)||0))+1 : 1;
}
function esc(v=''){
  return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
function fmtDate(v){
  if(!v) return '—';
  const d=new Date(v+'T00:00:00');
  return isNaN(d)?v:d.toLocaleDateString('fr-FR');
}
function money(v){ return new Intl.NumberFormat('fr-FR').format(Number(v)||0)+' FCFA'; }

const depts=['Atlantique','Mono','Couffo','Ouémé','Plateau','Zou','Collines','Donga','Atacora','Borgou','Alibori','Littoral'];
const head=(t,d,b='',action='')=>`<div class="page-head"><div><h1>${t}</h1><div class="muted">${d}</div></div>${b?`<button class="pink" onclick="${action}">${b}</button>`:''}</div>`;
const badge=(s,c='active-b')=>`<span class="badge ${c}">${esc(s)}</span>`;
const statusBadge=s=>{
  const x=(s||'').toLowerCase();
  return badge(s, x.includes('retard')||x.includes('non')?'wait-b':x.includes('cours')||x.includes('pay')||x.includes('enregistr')||x.includes('jour')?'active-b':x.includes('réf')?'pink-b':'navy-b');
};
const table=(h,r)=>`<div class="card" style="overflow:auto"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${r.length?r.join(''):`<tr><td colspan="${h.length}" class="muted">Aucune donnée enregistrée.</td></tr>`}</tbody></table></div>`;

function dashboard(){
  const totalIn=db.finances.filter(x=>x.type==='Recette').reduce((s,x)=>s+Number(x.amount||0),0);
  const totalOut=db.finances.filter(x=>x.type==='Dépense').reduce((s,x)=>s+Number(x.amount||0),0);
  C.innerHTML=`<div class="hero"><h1>Bienvenue dans l’espace de gestion <span class="accent">BeWE</span></h1><p>Les données des membres, réunions, décisions, documents et finances sont maintenant conservées automatiquement dans ce navigateur.</p></div>
  <div class="kpis"><div class="kpi"><b>${db.members.length}</b><span>Membres enregistrés</span></div><div class="kpi"><b>${db.meetings.length}</b><span>Réunions</span></div><div class="kpi"><b>${db.decisions.length}</b><span>Décisions suivies</span></div><div class="kpi"><b>${db.documents.length}</b><span>Documents</span></div><div class="kpi"><b>${money(totalIn-totalOut)}</b><span>Solde de démonstration</span></div></div>
  <div class="grid2"><div class="card"><div class="card-head"><h3>Dernières décisions</h3>${badge('localStorage actif','pink-b')}</div>${db.decisions.slice(-4).reverse().map(x=>`<div style="padding:11px 0;border-bottom:1px solid var(--line)"><b>${esc(x.title)}</b><small class="muted" style="display:block">${esc(x.owner)} • ${fmtDate(x.due)}</small></div>`).join('')||'<p class="muted">Aucune décision.</p>'}</div>
  <div class="card"><h3>Mode démonstration</h3><p class="muted">Chargez en un clic un jeu complet de membres, réunions, décisions, documents, finances, activités, opportunités, partenaires et communications.</p><div class="actions" style="margin-top:15px"><button class="pink" onclick="loadDemoData()">▶ Charger les données de démonstration</button><button class="btn" onclick="exportData()">Exporter JSON</button><button class="btn" onclick="resetData()">Réinitialiser</button></div></div></div>`;
}

function membersPage(){
 C.innerHTML=head('Membres & adhésions','Registre persistant des membres, catégories et cotisations.','＋ Nouveau membre','openForm("member")')+
 table(['Membre','Qualité','Cellule','Cotisation','Actions'],db.members.map(m=>`<tr><td><b>${esc(m.name)}</b><small class="muted" style="display:block">${esc(m.email||'')}</small></td><td>${esc(m.quality)}</td><td>${esc(m.cell)}</td><td>${statusBadge(m.dues)}</td><td><button class="btn" onclick="openForm('member',${m.id})">Modifier</button> <button class="btn" onclick="removeItem('members',${m.id},'members')">Supprimer</button></td></tr>`));
}
function assemblies(){
 C.innerHTML=head('Assemblées & réunions','Convocations, quorum, présences, procès-verbaux et résolutions.','＋ Nouvelle réunion','openForm("meeting")')+
 table(['Instance','Type','Date','Objet','Statut','Actions'],db.meetings.map(m=>`<tr><td><b>${esc(m.instance)}</b></td><td>${esc(m.type)}</td><td>${fmtDate(m.date)}</td><td>${esc(m.subject)}</td><td>${statusBadge(m.status)}</td><td><button class="btn" onclick="openForm('meeting',${m.id})">Modifier</button> <button class="btn" onclick="removeItem('meetings',${m.id},'assemblies')">Supprimer</button></td></tr>`));
}
function decisions(){
 C.innerHTML=head('Décisions & registres','Traçabilité persistante des décisions, responsables et échéances.','＋ Ajouter une décision','openForm("decision")')+
 table(['Décision','Organe','Responsable','Échéance','Exécution','Actions'],db.decisions.map(d=>`<tr><td><b>${esc(d.title)}</b></td><td>${esc(d.body)}</td><td>${esc(d.owner)}</td><td>${fmtDate(d.due)}</td><td>${statusBadge(d.status)}</td><td><button class="btn" onclick="openForm('decision',${d.id})">Modifier</button> <button class="btn" onclick="removeItem('decisions',${d.id},'decisions')">Supprimer</button></td></tr>`));
}
function documents(){
 C.innerHTML=head('Documents & archives','Mémoire institutionnelle persistante et documents statutaires.','＋ Ajouter un document','openForm("document")')+
 table(['Document','Catégorie','Version','Accès','Actions'],db.documents.map(d=>`<tr><td><b>${esc(d.title)}</b></td><td>${esc(d.category)}</td><td>${esc(d.version)}</td><td>${statusBadge(d.access)}</td><td><button class="btn" onclick="openForm('document',${d.id})">Modifier</button> <button class="btn" onclick="removeItem('documents',${d.id},'documents')">Supprimer</button></td></tr>`));
}
function finances(){
 const income=db.finances.filter(x=>x.type==='Recette').reduce((s,x)=>s+Number(x.amount||0),0);
 const expense=db.finances.filter(x=>x.type==='Dépense').reduce((s,x)=>s+Number(x.amount||0),0);
 C.innerHTML=head('Finances & cotisations','Opérations financières sauvegardées automatiquement.','＋ Nouvelle opération','openForm("finance")')+
 `<div class="kpis"><div class="kpi"><b>${money(income)}</b><span>Recettes</span></div><div class="kpi"><b>${money(expense)}</b><span>Dépenses</span></div><div class="kpi"><b>${money(income-expense)}</b><span>Solde</span></div><div class="kpi"><b>${db.finances.filter(x=>x.status==='À valider').length}</b><span>À valider</span></div><div class="kpi"><b>${db.finances.filter(x=>x.proof==='Oui').length}</b><span>Avec justificatif</span></div></div>`+
 table(['Date','Libellé','Type','Montant','Statut','Justificatif','Actions'],db.finances.map(f=>`<tr><td>${fmtDate(f.date)}</td><td><b>${esc(f.label)}</b></td><td>${esc(f.type)}</td><td>${money(f.amount)}</td><td>${statusBadge(f.status)}</td><td>${esc(f.proof)}</td><td><button class="btn" onclick="openForm('finance',${f.id})">Modifier</button> <button class="btn" onclick="removeItem('finances',${f.id},'finances')">Supprimer</button></td></tr>`));
}

function cells(){C.innerHTML=head('Cellules départementales','Pilotage des 12 démembrements départementaux du Réseau BeWE.')+`<div class="grid3">${depts.map((d,i)=>`<div class="dept"><b>Cellule ${d}</b><small>${db.members.filter(m=>m.cell===d).length} membre(s) enregistré(s)</small></div>`).join('')}</div>`}
function governance(){C.innerHTML=head('Gouvernance & organes','Structure statutaire de BeWE et suivi des mandats.')+`<div class="card org"><div class="org-box"><b>Assemblée Générale</b><small>Instance suprême</small></div><div class="org-line"></div><div class="org-row"><div class="org-box"><b>Conseil d’Administration</b><small>Gestion et mise en œuvre</small></div><div class="org-box"><b>Conseil de Surveillance</b><small>Contrôle et régularité</small></div></div><div class="org-line"></div><div class="org-box"><b>Direction Exécutive</b><small>Responsabilité technique</small></div></div>`}
function programs(){
 C.innerHTML=head('Programmes & activités','Créer, modifier et supprimer les activités BeWE.','＋ Nouvelle activité','openForm("program")')+
 table(['Activité','Responsable','Date','Statut','Actions'],db.programs.map(x=>`<tr><td><b>${esc(x.title)}</b></td><td>${esc(x.owner)}</td><td>${fmtDate(x.date)}</td><td>${statusBadge(x.status)}</td><td><button class="btn" onclick="openForm('program',${x.id})">Modifier</button> <button class="btn" onclick="removeItem('programs',${x.id},'programs')">Supprimer</button></td></tr>`));
}
function market(){
 C.innerHTML=head('Marchés & opportunités','Tester le suivi des marchés, appels et financements.','＋ Nouvelle opportunité','openForm("opportunity")')+
 table(['Opportunité','Type','Échéance','Cible','Statut','Actions'],db.opportunities.map(x=>`<tr><td><b>${esc(x.title)}</b></td><td>${esc(x.type)}</td><td>${fmtDate(x.due)}</td><td>${esc(x.target)}</td><td>${statusBadge(x.status)}</td><td><button class="btn" onclick="openForm('opportunity',${x.id})">Modifier</button> <button class="btn" onclick="removeItem('opportunities',${x.id},'market')">Supprimer</button></td></tr>`));
}
function partners(){
 C.innerHTML=head('Partenaires','Tester le registre et le suivi des partenaires.','＋ Nouveau partenaire','openForm("partner")')+
 table(['Partenaire','Domaine','Contact','Statut','Prochaine action','Actions'],db.partners.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.domain)}</td><td>${esc(x.contact)}</td><td>${statusBadge(x.status)}</td><td>${esc(x.next)}</td><td><button class="btn" onclick="openForm('partner',${x.id})">Modifier</button> <button class="btn" onclick="removeItem('partners',${x.id},'partners')">Supprimer</button></td></tr>`));
}
function communication(){
 C.innerHTML=head('Communication','Tester campagnes, canaux et publications.','＋ Nouvelle action','openForm("communication")')+
 table(['Action','Canal','Date','Statut','Actions'],db.communications.map(x=>`<tr><td><b>${esc(x.title)}</b></td><td>${esc(x.channel)}</td><td>${fmtDate(x.date)}</td><td>${statusBadge(x.status)}</td><td><button class="btn" onclick="openForm('communication',${x.id})">Modifier</button> <button class="btn" onclick="removeItem('communications',${x.id},'communication')">Supprimer</button></td></tr>`));
}
function reporting(){C.innerHTML=head('Suivi & rapports','Vue de contrôle pour tester les données enregistrées.')+`<div class="kpis"><div class="kpi"><b>${db.members.length}</b><span>Membres</span></div><div class="kpi"><b>${db.meetings.length}</b><span>Réunions</span></div><div class="kpi"><b>${db.decisions.length}</b><span>Décisions</span></div><div class="kpi"><b>${db.programs.length}</b><span>Activités</span></div><div class="kpi"><b>${db.documents.length}</b><span>Documents</span></div></div><div class="grid3"><div class="card"><h3>${db.opportunities.length}</h3><p>Opportunités</p></div><div class="card"><h3>${db.partners.length}</h3><p>Partenaires</p></div><div class="card"><h3>${db.communications.length}</h3><p>Actions de communication</p></div></div>`}
function admin(){C.innerHTML=head('Administration','Tester la sauvegarde, restauration et réinitialisation des données.')+`<div class="card"><h3>Stockage local</h3><p class="muted">Clé utilisée : <code>${STORAGE_KEY}</code>. Les données restent dans ce navigateur après fermeture.</p><div class="actions" style="margin-top:15px"><button class="pink" onclick="loadDemoData()">▶ Charger le jeu de démonstration complet</button><button class="btn primary" onclick="exportData()">Exporter JSON</button><button class="btn" onclick="document.getElementById('importFile').click()">Importer JSON</button><button class="btn" onclick="resetData()">Réinitialiser</button><input id="importFile" type="file" accept=".json,application/json" hidden onchange="importData(this.files[0])"></div></div>
<div class="card" style="margin-top:18px"><h3>Checklist de test</h3><p>1. Créer un élément dans chaque module. 2. Le modifier. 3. Le supprimer. 4. Actualiser la page pour vérifier la persistance. 5. Exporter le JSON. 6. Réinitialiser. 7. Réimporter le JSON.</p></div>`}

function openForm(type,id=null){
 const config={
  member:{collection:'members',title:id?'Modifier le membre':'Nouveau membre',fields:[
   ['name','Nom complet','text'],['email','E-mail','email'],['quality','Qualité','select',['Membre fondateur','Membre actif',"Membre d’honneur",'Membre sympathisant']],['cell','Cellule','select',depts],['dues','Cotisation','select',['À jour','À vérifier','En retard','—']]
  ]},
  meeting:{collection:'meetings',title:id?'Modifier la réunion':'Nouvelle réunion',fields:[
   ['instance','Instance','select',["Assemblée Générale","Conseil d’Administration","Conseil de Surveillance","Direction Exécutive"]],['type','Type','select',['Ordinaire','Extraordinaire','Technique']],['date','Date','date'],['subject','Objet','text'],['status','Statut','select',['Préparation','À planifier','Confirmée','Tenue','Clôturée']]
  ]},
  decision:{collection:'decisions',title:id?'Modifier la décision':'Nouvelle décision',fields:[
   ['title','Décision','text'],['body','Organe','text'],['owner','Responsable','text'],['due','Échéance','date'],['status','Statut','select',['À faire','En cours','En attente','Exécutée','En retard']]
  ]},
  document:{collection:'documents',title:id?'Modifier le document':'Nouveau document',fields:[
   ['title','Titre','text'],['category','Catégorie','select',['Texte organique','Registre','Rapport','Procès-verbal','Budget','Autre']],['version','Version / date','text'],['access','Accès','select',['Référence','Interne','Restreint','Public']]
  ]},
  program:{collection:'programs',title:id?'Modifier l’activité':'Nouvelle activité',fields:[
   ['title','Activité','text'],['owner','Responsable','text'],['date','Date','date'],['status','Statut','select',['Planifiée','En préparation','En cours','Terminée','Reportée']]
  ]},
  opportunity:{collection:'opportunities',title:id?'Modifier l’opportunité':'Nouvelle opportunité',fields:[
   ['title','Opportunité','text'],['type','Type','select',['Marché','Financement','Formation','Partenariat','Événement']],['due','Échéance','date'],['target','Cible','text'],['status','Statut','select',['À diffuser','À analyser','Ouverte','Clôturée']]
  ]},
  partner:{collection:'partners',title:id?'Modifier le partenaire':'Nouveau partenaire',fields:[
   ['name','Partenaire','text'],['domain','Domaine','text'],['contact','Contact','text'],['status','Statut','select',['Prospect','Contact établi','Actif','Suspendu']],['next','Prochaine action','text']
  ]},
  communication:{collection:'communications',title:id?'Modifier l’action':'Nouvelle action de communication',fields:[
   ['title','Action','text'],['channel','Canal','select',['Réseaux sociaux','Presse / Web','E-mail','WhatsApp','Événement']],['date','Date','date'],['status','Statut','select',['Brouillon','Planifiée','Publiée','Terminée']]
  ]},
  finance:{collection:'finances',title:id?'Modifier l’opération':'Nouvelle opération',fields:[
   ['date','Date','date'],['label','Libellé','text'],['type','Type','select',['Recette','Dépense']],['amount','Montant (FCFA)','number'],['status','Statut','select',['Demandée','À valider','Validée','Payée','Enregistrée']],['proof','Justificatif','select',['Oui','Non']]
  ]}
 }[type];
 const item=id?db[config.collection].find(x=>x.id===id):{};
 document.querySelector('#modal .modal-card h2').textContent=config.title;
 document.querySelector('#modal .modal-card p').innerHTML='';
 document.querySelector('.quick-grid').innerHTML=`<form id="dataForm" style="grid-column:1/-1">${config.fields.map(f=>{
   const val=item?.[f[0]]??'';
   if(f[2]==='select') return `<label style="display:block;margin:10px 0 4px"><b>${f[1]}</b></label><select name="${f[0]}" class="form-input" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:8px">${f[3].map(o=>`<option ${o==val?'selected':''}>${esc(o)}</option>`).join('')}</select>`;
   return `<label style="display:block;margin:10px 0 4px"><b>${f[1]}</b></label><input name="${f[0]}" type="${f[2]}" value="${esc(val)}" required style="width:100%;padding:10px;border:1px solid var(--line);border-radius:8px">`;
 }).join('')}<button class="pink" style="margin-top:18px" type="submit">Enregistrer</button></form>`;
 document.getElementById('modal').classList.add('open');
 document.getElementById('dataForm').onsubmit=e=>{
   e.preventDefault();
   const obj=Object.fromEntries(new FormData(e.target).entries());
   if(type==='finance') obj.amount=Number(obj.amount||0);
   if(id){Object.assign(item,obj)}else{obj.id=nextId(db[config.collection]);db[config.collection].push(obj)}
   saveData(); document.getElementById('modal').classList.remove('open'); routeCurrent();
 };
}
function removeItem(collection,id,page){
 if(!confirm('Supprimer cet élément ?')) return;
 db[collection]=db[collection].filter(x=>x.id!==id); saveData(); pages[page]();
}
function importData(file){
 if(!file) return;
 const r=new FileReader();
 r.onload=()=>{
   try{
     const parsed=JSON.parse(r.result);
     Object.keys(defaults).forEach(k=>{ if(!Array.isArray(parsed[k])) parsed[k]=clone(defaults[k]); });
     db=parsed; saveData(); alert('Sauvegarde BeWE importée avec succès.'); dashboard(); setActive('dashboard');
   }catch(e){ alert('Le fichier JSON est invalide.'); }
 };
 r.readAsText(file);
}
function resetData(){
 if(!confirm('Réinitialiser toutes les données locales BeWE ?')) return;
 db=clone(defaults); saveData(); dashboard(); setActive('dashboard');
}
function exportData(){
 const blob=new Blob([JSON.stringify(db,null,2)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='bewe-sauvegarde.json';a.click();URL.revokeObjectURL(a.href);
}
let currentPage='dashboard';
function setActive(page){document.querySelectorAll('#nav button').forEach(x=>x.classList.toggle('active',x.dataset.page===page));currentPage=page}
function routeCurrent(){pages[currentPage]();}
const pages={dashboard,members:membersPage,cells,governance,assemblies,decisions,programs,market,partners,communication,finances,documents,reporting,admin};
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>{setActive(b.dataset.page);pages[b.dataset.page]();document.querySelector('.sidebar').classList.remove('open')});
document.getElementById('menu').onclick=()=>document.querySelector('.sidebar').classList.toggle('open');
document.getElementById('quick').onclick=()=>{
 document.querySelector('#modal .modal-card h2').textContent='Création rapide';
 document.querySelector('#modal .modal-card p').textContent='Choisissez l’élément à créer.';
 document.querySelector('.quick-grid').innerHTML=`<button onclick="openForm('member')">Membre</button><button onclick="openForm('meeting')">Réunion</button><button onclick="openForm('decision')">Décision</button><button onclick="openForm('program')">Activité</button><button onclick="openForm('opportunity')">Opportunité</button><button onclick="openForm('partner')">Partenaire</button><button onclick="openForm('communication')">Communication</button><button onclick="openForm('finance')">Finance</button><button onclick="openForm('document')">Document</button>`;
 document.getElementById('modal').classList.add('open');
};
document.getElementById('close').onclick=()=>document.getElementById('modal').classList.remove('open');
document.getElementById('modal').onclick=e=>{if(e.target.id==='modal')e.currentTarget.classList.remove('open')};
document.getElementById('search').addEventListener('keydown',e=>{if(e.key==='Enter'){let q=e.target.value.toLowerCase();if(q.includes('membre')){setActive('members');membersPage()}else if(q.includes('finance')||q.includes('cotisation')){setActive('finances');finances()}else if(q.includes('document')){setActive('documents');documents()}else if(q.includes('réunion')||q.includes('reunion')){setActive('assemblies');assemblies()}else if(q.includes('décision')||q.includes('decision')){setActive('decisions');decisions()}}});
saveData(); // crée automatiquement la clé au premier lancement
dashboard();
