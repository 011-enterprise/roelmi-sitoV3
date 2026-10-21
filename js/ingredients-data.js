/* ==========================================================================
   Catalogo ingredienti — dati del prototipo (SITO 1, js/finder.js)
   Quando arriva il catalogo vero basta sostituire questo elenco.
   image = foto del prodotto (da SITO 1), mostrata nella scheda; texture =
   riserva se manca la foto.
   Caricato con <script> (non con fetch): funziona anche aprendo il file in locale.
   ========================================================================== */

window.ROELMI_INGREDIENTS = [
  {
    id: 1,
    name: 'CytoFruit®',
    line: 'CytoFruit',
    function: 'Biologically active waters',
    market: ['Personal Care'],
    technology: ['Nature'],
    type: 'Active',
    category: '',
    benefits: [],
    certifications: ['COSMOS/ICEA', 'Palm oil free'],
    description: 'Fruit-derived active waters that replace demineralized water in formulations. Naturally processed and enriched in oligoelements, with protective and cell-vitality benefits for sustainable, high-performance formulas.',
    image: 'images/portfolio/cytofruit.png',
    texture: 'images/portfolio/texture-2.jpg',
    link: 'cytofruit.html'
  },
  {
    id: 2,
    name: 'SelectSIEVE® HopE',
    line: 'SelectSIEVE',
    function: 'GLP-1 natural support',
    market: ['Nutraceutical'],
    technology: ['Nature'],
    type: 'Active',
    category: '',
    benefits: ['Weight management'],
    certifications: ['RSPO', 'Palm oil free'],
    description: 'Hop cone bioactives via supercritical CO₂ extraction, stabilised in powder form — supporting weight management, insulin sensitivity and natural GLP-1 release for metabolic health applications.',
    image: 'images/portfolio/selectsieve-hope.png',
    texture: 'images/portfolio/texture-6.jpg',
    link: '#'
  },
  {
    id: 3,
    name: 'TechnoHYAL® HyaPearl',
    line: 'TechnoHYAL',
    function: 'Active Make-Up',
    market: ['Personal Care'],
    technology: ['Biotech'],
    type: 'Active',
    category: '',
    benefits: ['Active make up', 'Hydration (Long Term)'],
    certifications: ['NATRUE', 'COSMOS/ICEA'],
    description: 'Olive glycerides and hyaluronic acid combined in a patented matrix — delivering hydration and skin nourishment in anhydrous color cosmetic formulations for active make-up.',
    image: 'images/portfolio/hyapearl.png',
    texture: 'images/portfolio/texture-1.jpg',
    link: '#'
  },
  {
    id: 4,
    name: 'ColorGLAM®',
    line: 'ColorGLAM',
    function: 'Color portfolio',
    market: ['Personal Care'],
    technology: ['Nature'],
    type: 'Functional',
    category: 'Pigments',
    benefits: ['Active make up', 'Pigments dispersant'],
    certifications: ['RSPO', 'Palm oil free'],
    description: 'Ester-coated pigments functionalized with Tripelargonin, an upcycled sustainable ester — for high color release, formulation stability and a weightless, refined skin feel.',
    image: 'images/portfolio/colorglam.png',
    texture: 'images/portfolio/texture-5.jpg',
    link: '#'
  }
];
