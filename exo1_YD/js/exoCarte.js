/**
 * Crée un élément du dom, lui ajoute du texte, le place comme dernier
 * enfant de parent et ajoute un attribut en utilisant le paramètre attribute
 * @param {String} markup_name
 * @param {String} text
 * @param {domElement} parent
 * @param {Array} attributes  (doit comprendre les propriétés name et value)
 * @returns domElement
 */
function createMarkup(markup_name, text, parent, attributes = []) {
  const markup = document.createElement(markup_name);
  markup.textContent = text;
  parent.appendChild(markup);
  attributes.forEach((attribute) => {
    if (
      attribute &&
      attribute.hasOwnProperty("name") &&
      attribute.hasOwnProperty("value")
    ) {
      markup.setAttribute(attribute.name, attribute.value);
    }
  });
  return markup;
}

// Structure de la page html
// main >
//   h1
//   div
//   section
//
const main = createMarkup("main", "", document.body, [
  { name: "class", value: "main d-flex" },
]);
const titleh1 = createMarkup("h1", "Exercice 1 - Afficher des cartes", main);
const div = createMarkup("div", "", main);
const section = createMarkup("section", "", main, [
  { name: "class", value: "section d-flex" },
]);

// Création des 4 boutons de sélection dans le div de la page html
//  div >
//    button * 4
//
// Bouton pour sélectionner tous les articles
const buttonAll = createMarkup("button", "Tous", div, [
  { name: "class", value: "btn" },
  { name: "id", value: `all` },
]);
// Bouton pour sélectionner seulement les articles HTML
const buttonHtml = createMarkup("button", "HTML", div, [
  { name: "class", value: "btn" },
  { name: "id", value: `html` },
]);
// Bouton pour sélectionner seulement les articles CSS
const buttonCss = createMarkup("button", "CSS", div, [
  { name: "class", value: "btn" },
  { name: "id", value: `css` },
]);
// Bouton pour sélectionner seulement les articles JS
const buttonJs = createMarkup("button", "JS", div, [
  { name: "class", value: "btn" },
  { name: "id", value: `js` },
]);

// Création des fonctions de génération des articles qui apparaitont dans la balise section sur la page html
//  section >
//    article * 16
//
// Fonction qui génère un article HTML
function articleHtml() {
  const article_html = createMarkup("article", "", section, [
    { name: "class", value: "article html" },
  ]);
  let article_title = createMarkup("h2", "Article sur le HTML", article_html);
  let article_p = createMarkup("p", "", article_html);
}

// Fonction qui génère un article CSS
function articleCss() {
  const article_css = createMarkup("article", "", section, [
    { name: "class", value: "article css" },
  ]);
  let article_title = createMarkup("h2", "Article sur le CSS", article_css);
  let article_p = createMarkup("p", "", article_css);
}

// Fonction qui génère un article JS
function articleJs() {
  const article_js = createMarkup("article", "", section, [
    { name: "class", value: "article js" },
  ]);
  let article_title = createMarkup(
    "h2",
    "Article sur le Javascript",
    article_js
  );
  let article_p = createMarkup("p", "", article_js);
}

// Fonction permettant d'obtenir des nombres entiers aléatoires entre 1 et 3
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Boucle qui génère de manière aléatoire des articles en fonction des résultats obtenus par getRandomInt
let i = 0;
while (i < 16) {
  const generate = getRandomInt(1, 4);
  if (generate === 1) {
    articleHtml();
    i++;
  } else if (generate === 2) {
    articleCss();
    i++;
  } else if (generate === 3) {
    articleJs();
    i++;
  } else {
    break;
  }
}

// Bouton Tous
buttonAll.onclick = async function (event) {
  event.preventDefault();

  // sélectionne les éléments avec la balise article
  const elements = document.querySelectorAll("article");
  // pour chaque élément, mets la valeur hidden sur false = affiche sur la page html
  elements.forEach((element) => {
    element.hidden = false;
  });
};

// Bouton HTML
buttonHtml.onclick = async function (event) {
  event.preventDefault();

  // sélectionne les éléments avec la balise article
  const allElements = document.querySelectorAll("article");
  //  pour chaque élément, mets la valeur hidden sur true = cache tout sur la page html
  allElements.forEach((element) => {
    element.hidden = true;
  });

  //sélectionne les éléments avec la class html dans les balise article
  const elements = document.querySelectorAll("article.html");
  //  permet l'affichage des éléments sélectionné
  elements.forEach((element) => {
    element.hidden = false;
  });
};

// Bouton CSS
buttonCss.onclick = async function (event) {
  event.preventDefault();

  // sélectionne les éléments avec la balise article
  const allElements = document.querySelectorAll("article");
  //pour chaque élément, mets la valeur hidden sur true = cache tout sur la page html
  allElements.forEach((element) => {
    element.hidden = true;
  });

  // sélectionne les éléments avec la class css dans les balise article
  const elements = document.querySelectorAll("article.css");
  //  permet l'affichage des éléments sélectionné
  elements.forEach((element) => {
    element.hidden = false;
  });
};

// Bouton JS
buttonJs.onclick = async function (event) {
  event.preventDefault();

  // sélectionne les éléments avec la balise article
  const allElements = document.querySelectorAll("article");
  // pour chaque élément, mets la valeur hidden sur true = cache tout sur la page html
  allElements.forEach((element) => {
    element.hidden = true;
  });

  // sélectionne les éléments avec la class js dans les balise article
  const elements = document.querySelectorAll("article.js");
  //  permet l'affichage des éléments sélectionné
  elements.forEach((element) => {
    element.hidden = false;
  });
};
