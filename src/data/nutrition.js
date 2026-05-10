export const DEF_COURSES = [
  {
    cat: 'Protéines', bc: '#8BE8C8',
    items: [
      { n:'Œufs',                q:'18',   w:'PDJ + cuisson' },
      { n:'Poulet',              q:'600g', w:'Déjeuner ×3' },
      { n:'Dinde',               q:'400g', w:'Alternative poulet' },
      { n:'Steak haché 5%',      q:'400g', w:'Déjeuner ×2' },
      { n:'Bœuf',                q:'300g', w:'Dîner' },
      { n:'Saumon',              q:'400g', w:'Oméga-3 + protéines' },
      { n:'Thon (boîte)',        q:'3',    w:'Rapide' },
      { n:'Sardines',            q:'2',    w:'Oméga-3' },
      { n:'Fromage blanc 0%',    q:'1kg',  w:'Protéines lentes' },
      { n:'Skyr',                q:'500g', w:'Collation protéinée' },
      { n:'Yaourt grec entier',  q:'4',    w:'Collation' },
      { n:'Lait entier',         q:'2L',   w:'Base shakes' },
      { n:'Whey protéine',       q:'1kg',  w:'+25g P par dose' },
    ],
  },
  {
    cat: 'Glucides', bc: '#C8F04A',
    items: [
      { n:'Riz blanc',           q:'1kg',  w:'Déjeuner' },
      { n:'Pâtes',               q:'500g', w:'Dîner' },
      { n:"Flocons d'avoine",    q:'1kg',  w:'PDJ + shakes' },
      { n:'Pain complet',        q:'1',    w:'Snack' },
      { n:'Pommes de terre',     q:'1kg',  w:'Post-workout' },
      { n:'Patates douces',      q:'500g', w:'Post-workout' },
      { n:'Bananes',             q:'14',   w:'Tous les shakes' },
      { n:'Miel',                q:'1 pot',w:'Shakes + énergie' },
      { n:'Granola',             q:'400g', w:'PDJ rapide' },
      { n:'Semoule',             q:'500g', w:'Alternative riz' },
      { n:'Tortillas / wraps',   q:'1 pqt',w:'Snack rapide' },
    ],
  },
  {
    cat: 'Calories faciles', bc: '#F06080',
    items: [
      { n:'Jus de fruits 100%',  q:'1L',   w:'Glucides rapides' },
      { n:'Fruits secs',         q:'200g', w:'+500kcal/100g' },
      { n:'Barres céréales',     q:'6',    w:'En-cas rapide' },
      { n:'Chocolat noir 70%',   q:'100g', w:'Graisses + calories' },
    ],
  },
  {
    cat: 'Bonnes graisses', bc: '#F0A050',
    items: [
      { n:'Avocats',             q:'4-5',  w:'Dîner' },
      { n:"Huile d'olive",       q:'1',    w:'Cuisson' },
      { n:'Amandes',             q:'200g', w:'Collation' },
      { n:'Noix',                q:'150g', w:'Collation' },
      { n:'Noix de cajou',       q:'150g', w:'Collation' },
      { n:'Beurre de cacahuète', q:'500g', w:'+120kcal/20g' },
      { n:'Fromage (Comté)',      q:'150g', w:'Calories denses' },
    ],
  },
  {
    cat: 'Légumes', bc: '#8BE8C8',
    items: [
      { n:'Épinards',            q:'500g', w:'Shakes verts' },
      { n:'Brocolis',            q:'400g', w:'Repas' },
      { n:'Tomates cerises',     q:'250g', w:'Vitamines' },
      { n:'Courgettes',          q:'2-3',  w:'Digeste' },
    ],
  },
  {
    cat: 'Compléments', bc: '#B8A0F8',
    items: [
      { n:'Créatine 5g/jour',    q:'500g', w:'Force + masse' },
      { n:'Vitamine D3',         q:'1 boîte', w:'Carence' },
      { n:"Oméga-3",             q:'1 boîte', w:'Récup' },
    ],
  },
]

export const REPAS = [
  { ic:'🥚', bc:'#F0A050', n:'Petit-déjeuner — 700 kcal', items:[
    ["Flocons d'avoine",'80g','300 kcal'],
    ['Lait entier','200ml','120 kcal'],
    ['Œufs entiers','2','140 kcal'],
    ['Beurre de cacahuète','20g','120 kcal'],
    ['Banane','1','90 kcal'],
  ]},
  { ic:'🍚', bc:'#8BE8C8', n:'Déjeuner — 750 kcal', items:[
    ['Riz blanc cuit','200g','260 kcal'],
    ['Poulet/steak haché','150g','250 kcal'],
    ["Huile d'olive",'15ml','135 kcal'],
    ['Légumes','100g','50 kcal'],
    ['Comté','20g','80 kcal'],
  ]},
  { ic:'🐟', bc:'#B8A0F8', n:'Dîner — 650 kcal', items:[
    ['Pâtes cuites','180g','265 kcal'],
    ['Saumon ou thon','130g','200 kcal'],
    ['Avocat','½','120 kcal'],
    ['Fromage blanc 0%','100g','57 kcal'],
  ]},
]

export const SHAKES = [
  { bc:'#5BB8F5', t:'Gainer maison', h:'10h00 · 420 kcal · 28g P',
    ing:[['300ml','lait entier'],['1','banane'],['30g',"flocons d'avoine"],['20g','beurre de cacahuète'],['1 dose','whey (optionnel)'],['1 c.à.s','miel']] },
  { bc:'#8BE8C8', t:'Smoothie masse vert', h:'15h30 · 390 kcal · 25g P',
    ing:[['250ml','lait entier'],['100g','fromage blanc 0%'],['1','banane'],['30g',"flocons d'avoine"],['1 poignée','épinards'],['15g','amandes']] },
  { bc:'#F06080', t:'Boost pré-workout', h:'18h30 · 200 kcal',
    ing:[['2','dattes / fruits secs'],['1','banane'],['200ml',"jus d'orange"],['1 pincée','sel']] },
  { bc:'#B8A0F8', t:'Recovery shake', h:'19h25 · 200 kcal · 30g P',
    ing:[['300ml','lait ou eau'],['1 dose','whey'],['1','banane']] },
  { bc:'#444', t:'Casein nuit (si faim)', h:'21h30 · 200 kcal · 20g P',
    ing:[['200g','fromage blanc 0%'],['20g','amandes'],['1 c.à.s','miel']] },
]
