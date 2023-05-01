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

////// Création dees éléments HTML d'interaction
//
//
//création de la div contenant le formulaire
const main = createMarkup("main", "", document.body);
const title = createMarkup("h1", "Informations", main);
const div = createMarkup("div", "", main);

//création du formulaire
const form = createMarkup("form", "", div);

//// Régions
//
//
// Sélecteur de la région
const selectRegion = createMarkup("select", "", form, [
  { name: "id", value: "chooseRegion" },
]);
// Première option par défaut
const chooseRegions = createMarkup(
  "option",
  "Choisir une région",
  selectRegion
);

//// Départements
//
//
// Sélecteur du département
const selectDepartement = createMarkup("select", "", form, [
  { name: "id", value: "chooseDepartement" },
]);
// Première option par défaut
const departement = createMarkup(
  "option",
  "Choisir un département",
  selectDepartement
);

//// Villes
//
//
// Sélecteur de la ville
const selectCity = createMarkup("select", "", form, [
  { name: "class", value: "chooseCity" },
]);
// Première option par défaut
const city = createMarkup("option", "Choisir une ville", selectCity);

//// Génération des options des sélecteurs par fetch des informations
//
//
// 1 Régions
// 2 Départements
// 3 Villes
//
//
//// 1 : Options du sélecteur de régions
//
//
//
// Récupération des régions avec fetch
function getRegions() {
  return (
    fetch(`https://geo.api.gouv.fr/regions`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le serveur ne répond pas !");
        } else return response.json();
      })
      //récupération des région sous forme d'un object json
      //les données de la promesse résolue sont utilisée pour générer les options du sélecteur
      //pour chaque région, une createMarkup permet de générer une option avec la région, l'id étant le code de la région
      .then((regions) => {
        regions.forEach((region) => {
          createMarkup("option", `${region.nom}`, selectRegion, [
            { name: "id", value: `${region.code}` },
            { name: "name", value: `${region.nom}` },
            { name: "class", value: "regions" },
          ]);
        });
      })
      .catch((error) => console.log(`Erreur catched :`, error))
  );
}

//// 2 : Options du sélecteur de départements
//
//
//
// Récupération des départements avec fetch
function getDepartements(ofThisRegion) {
  return (
    fetch(`https://geo.api.gouv.fr/regions/${ofThisRegion}/departements`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le serveur ne répond pas !");
          //récupération des départements sous forme d'un object json
        } else return response.json();
      })
      //les données de la promesse résolue sont utilisée pour générer les options du sélecteur
      .then((departements) => {
        //pour chaque département, une createMarkup permet de générer une option
        departements.forEach((departement) => {
          createMarkup("option", departement.nom, selectDepartement, [
            { name: "id", value: `${departement.code}` },
            { name: "class", value: "departements" },
          ]);
        });
      })
      .catch((error) => console.log(`Erreur catched :`, error))
  );
}

//// 3 : Options du sélecteur de villes
//
//
//
// Récupération des villes avec fetch
function getCities(ofThisDepartement) {
  return (
    fetch(`https://geo.api.gouv.fr/departements/${ofThisDepartement}/communes`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le serveur ne répond pas !");
          //récupération des villes sous forme d'un object json
        } else return response.json();
      })
      //les données de la promesse résolue sont utilisée pour générer les options du sélecteur
      .then((cities) => {
        //pour chaque ville, une createMarkup permet de générer une option
        cities.forEach((city) => {
          createMarkup("option", city.nom, selectCity, [
            { name: "id", value: `${city.code}` },
            { name: "class", value: "cities" },
          ]);
        });
      })
      .catch((error) => console.log(`Erreur catched :`, error))
  );
}

// Fonction permettant de générer la carte affichant les informations des villes.
// L'affichage se fera en fonction de la ville sélectionnée, le département est utilisé pour réalisé le bon fetch
function cityToFeature(ofThisDepartement, choosenCity) {
  return (
    fetch(`https://geo.api.gouv.fr/departements/${ofThisDepartement}/communes`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le serveur ne répond pas !");
          //récupération des villes sous forme d'un object json
        } else return response.json();
      })
      //les données de la promesse résolue sont utilisée pour générer les récupérer les informations à afficher
      .then((cities) => {
        // Recherche dans le json de la ville sélectionnée par l'utilisateur
        const city = cities.find((obj) => obj.nom === choosenCity);
        const codesPostaux = city.codesPostaux;
        const population = city.population;
        const divCity = createMarkup("article", "", form, [
          { name: "class", value: "cityArticle" },
        ]);
        const titleCity = createMarkup("h2", `${choosenCity}`, divCity, [
          { name: "class", value: "cityFeatured" },
        ]);
        const codeCity = createMarkup(
          "p",
          `Code postal : ${codesPostaux}`,
          divCity,
          [
            { name: "class", value: "cityFeatured" },
            { name: "id", value: "cityFeaturedCP" },
          ]
        );
        const popCity = createMarkup(
          "p",
          `Population : ${population}`,
          divCity,
          [{ name: "class", value: "cityFeatured" }]
        );
      })
      .catch((error) => console.log(`Erreur catched :`, error))
  );
}

// Dès le chargement de la page, les options de régions sont créées en appelant la fonction
getRegions();

// Fonction de nettoyage de la liste des départements
function clearDpt() {
  // Selection des départements : classe departements. La longueur détermine le nombre de tour de boucle.
  let i = document.querySelectorAll(".departements").length;
  while (i > 0) {
    //suppression des éléments du DOM avec la classe departements
    document.querySelector(".departements").remove();
    i--;
  }
}

// Fonction de nettoyage de la liste des villes
function clearCities() {
  // Selection des villes : classe cities. La longueur détermine le nombre de tour de boucle.
  let i = document.querySelectorAll(".cities").length;
  while (i > 0) {
    //suppression des éléments du DOM avec la classe cities
    document.querySelector(".cities").remove();
    i--;
  }
}

// Fonctions de nettoyage de la ville mise en avant
function clearFeaturedCity() {
  // Selection des éléments de la ville : classe cityFeatured. La longueur détermine le nombre de tour de boucle.
  let i = document.querySelectorAll(".cityFeatured").length;
  while (i > 0) {
    //suppression des éléments du DOM avec la classe cities
    document.querySelector(".cityFeatured").remove();
    i--;
  }
}
function clearArticleFeaturedCity() {
  let i = document.querySelectorAll(".cityArticle").length;
  while (i > 0) {
    document.querySelector(".cityArticle").remove();
    i--;
  }
}

//// Réactions à la sélection d'une région
//
//
// 1 Création dun tableau avec les régions
// 2 La région sélectionnée est lue, puis recherchée dans le tableau, et son id est extrait
// 3 Les options de départements et de villes sont effacées s'il y en a
// 4 Les départements sont fetchés en fonction de l'id de la région sélectionnée
//
//
selectRegion.onchange = async function (event) {
  event.preventDefault();
  
  //// 1
  //
  //
  // Les régions ont été générées avec getRegions() sur la page dans les "options" du sélecteur 'Régions', avec la classe "regions"
  // Un tableau contenant ces régions est créé, avec leur id et leur nom
  const arrayReg = Array.from(document.querySelectorAll(`.regions`)).map(
    (region) => {
      return {
        id: region.id,
        value: region.value,
      };
    }
  );

  //// 2
  //
  //
  // La région sélectionnée par l'utilisateur est lue
  const selectedRegion = selectRegion.value;
  // La région sélectionnée est extraite du tableau des régions
  const choosenRegion = arrayReg.find(
    ({ value }) => value === `${selectedRegion}`
  );

  //// 3
  //
  //
  // Supression des départements de la pages HTML
  clearDpt();
  // Supression des villes de la pages HTML
  clearCities();
  clearFeaturedCity();
  clearArticleFeaturedCity();

  //// 4
  //
  //
  // Les départements sont générés en fonction de l'id de la région sélectionnée
  getDepartements(choosenRegion.id);
};

// Déclaration d'une variable qui permettra de récupérer le numéro du département sélectionné
let dptForCity;
//// Réactions à la sélection d'un département
//
//
// 1 Création dun tableau avec les départements
// 2 Le département sélectionné est lu, puis recherché dans le tableau, et son id est extrait
// 3 Les options de villes sont effacées s'il y en a
// 4 Les villes sont fetchés en fonction de l'id du département sélectionné
//
//
selectDepartement.onchange = async function (event) {
  event.preventDefault();

  //// 1
  //
  //
  // Les départements ont été générées avec getDepartements() sur la page lors de la sélection de la région, ils apparaissent dans les "options" du sélecteur 'Département', avec la classe "departements"
  // Un tableau contenant ces département est créé, avec leur id et leur nom
  const arrayDpt = Array.from(document.querySelectorAll(`.departements`)).map(
    (departement) => {
      return {
        id: departement.id,
        value: departement.value,
      };
    }
  );

  //// 2
  //
  //
  // Le département sélectionné par l'utilisateur est lu
  const selectedDepartement = selectDepartement.value;
  console.log(`Nom du département sélectionné`, selectedDepartement);
  // Le département sélectionné est extrait du tableau des départements
  const choosenDpt = arrayDpt.find(
    ({ value }) => value === `${selectedDepartement}`
  );
  dptForCity = choosenDpt.id;

  //// 3
  //
  //
  // Suppression des villes de la pages HTML
  // Suppression de la ville mise en avant
  clearCities();
  clearFeaturedCity();
  clearArticleFeaturedCity();

  //// 4
  //
  //
  // Les départements sont générés en fonction de l'id de la région sélectionnée
  getCities(choosenDpt.id);
};

//// Réaction à la sélection d'une ville
//
//
// 1 La ville sélectionnée est lue
// 2 La ville mise en avant est effacée s'il y en a
// 3 Les villes sont fetchés en fonction de l'id du département sélectionné, la carte de la ville est générée
//
//
selectCity.onchange = async function (event) {
  event.preventDefault();

  //// 1
  //
  //
  // Les villes ont été générées avec getCities() sur la page lors de la sélection du département, elles apparaissent dans les "options" du sélecteur 'Villes', avec la classe "departements"
  // La ville sélectionnée par l'utilisateur est lue
  const selectedCity = selectCity.value;


  //// 2
  //
  //
  // Supression de la ville affichée s'il y en a une
  clearFeaturedCity();
  clearArticleFeaturedCity();

  //// 3
  //
  //
  // La fiche de la ville est générée en fonction de la ville sélectionnée
  cityToFeature(dptForCity, selectedCity);
};
