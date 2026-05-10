export const COURSES_DATA = [
  { cat:'Base liquide & shakes', bc:'#5BB8F5', items:[
    { n:'Lait entier', q:'2.5L/sem', w:'Base shakes' },
    { n:'Fromage blanc 0%', q:'1kg', w:'Protéines lentes' },
    { n:'Yaourt grec entier', q:'4 pots', w:'Collation' },
    { n:"Jus d'orange 100%", q:'1L', w:'Glucides rapides' },
  ]},
  { cat:'Fruits', bc:'#F0A050', items:[
    { n:'Bananes', q:'14-16', w:'Tous les shakes' },
    { n:'Dattes Medjool', q:'200g', w:'Pré-workout' },
    { n:'Mangue surgelée', q:'500g', w:'Shakes' },
    { n:'Myrtilles', q:'200g', w:'Récup' },
  ]},
  { cat:'Protéines', bc:'#8BE8C8', items:[
    { n:'Œufs entiers', q:'18', w:'PDJ' },
    { n:'Poulet', q:'600g', w:'Déjeuner ×3' },
    { n:'Steak haché 15%', q:'400g', w:'Déjeuner ×2' },
    { n:'Saumon', q:'400g', w:'Dîner' },
    { n:'Thon boîte', q:'3', w:'Rapide' },
    { n:'Comté', q:'150g', w:'Calories' },
  ]},
  { cat:'Féculents', bc:'#C8F04A', items:[
    { n:"Flocons d'avoine", q:'1kg', w:'PDJ+shakes' },
    { n:'Riz blanc', q:'1kg', w:'Déjeuner' },
    { n:'Pâtes', q:'500g', w:'Dîner' },
    { n:'Pain complet', q:'1', w:'Snack' },
    { n:'Patate douce', q:'500g', w:'Post-workout' },
  ]},
  { cat:'Graisses', bc:'#F0A050', items:[
    { n:'Beurre cacahuète', q:'500g', w:'+120kcal/20g' },
    { n:'Avocats', q:'4-5', w:'Dîner' },
    { n:'Amandes', q:'200g', w:'Collation' },
    { n:"Huile d'olive", q:'1 bouteille', w:'Cuisson' },
    { n:'Miel', q:'1 pot', w:'Shakes' },
  ]},
  { cat:'Compléments', bc:'#B8A0F8', items:[
    { n:'Whey protéine', q:'1kg', w:'+25g P' },
    { n:'Créatine 5g/jour', q:'500g', w:'Force+masse' },
    { n:'Vitamine D3', q:'1 boîte', w:'Carence' },
    { n:'Oméga-3', q:'1 boîte', w:'Récup' },
  ]},
  { cat:'Légumes', bc:'#8BE8C8', items:[
    { n:'Épinards', q:'500g', w:'Shakes' },
    { n:'Brocolis', q:'400g', w:'Repas' },
    { n:'Tomates cerises', q:'250g', w:'Vitamines' },
    { n:'Courgettes', q:'2-3', w:'Digeste' },
  ]},
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
    ing:[['2','dattes Medjool'],['1','banane'],['200ml',"jus d'orange"],['1 pincée','sel']] },
  { bc:'#B8A0F8', t:'Recovery shake', h:'19h25 · 200 kcal · 30g P',
    ing:[['300ml','lait ou eau'],['1 dose','whey'],['1','banane']] },
  { bc:'#444', t:'Casein nuit (si faim)', h:'21h30 · 200 kcal · 20g P',
    ing:[['200g','fromage blanc 0%'],['20g','amandes'],['1 c.à.s','miel']] },
]
