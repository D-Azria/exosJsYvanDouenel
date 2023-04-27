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

//création du formulaire
const form = createMarkup("form", "", document.body);

/* Sélecteur de la région */
const selectRegion = createMarkup("select", "", form, [
  { name: "id", value: "chooseRegion" },
]);

const regions = createMarkup("option", "Choisir une région", selectRegion);

/* Options du sélecteur */
function optionsOfRegions() {
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
            createMarkup("option", region.nom, selectRegion, [
              { name: "id", value: `${region.code}` },
            ]);
            //vérification en console du succès de la récupération de chaque région individuellement
            console.log(region);
          });
        })
        .catch((error) => console.log(`Erreur catched :`, error))
    );
  }
  getRegions();
}
//execution de la fonction pour générer les options
optionsOfRegions();

selectRegion.onchange = async function (event) {
  event.preventDefault();
  const selectedRegion = document.querySelector("#chooseRegion").value;
  console.log(selectedRegion);
  return selectedRegion;
  //  allRegions = await getRegions(selectedRegion);
};



// Sélecteur du département
const selectDepartement = createMarkup("select", "", form, [
  { name: "id", value: "chooseDepartement" },
]);
const departement = createMarkup("option", "Choisir un département", selectDepartement);

// Options du sélecteur de département
function optionsOfDepartements() {
  // Récupération des régions avec fetch
  function getDepartements() {
    return (
      fetch(`https://geo.api.gouv.fr/regions/11/departements`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Le serveur ne répond pas !");
            //récupération des région sous forme d'un object json
          } else return response.json();
        })
        //les données de la promesse résolue sont utilisée pour générer les options du sélecteur
        .then((departements) => {
          //pour chaque région, une createMarkup permet de générer une option avec le département, l'id étant le code de la région
          departements.forEach((departement) => {
            createMarkup("option", departement.nom, selectDepartement, [
              { name: "id", value: `${departement.code}` },
            ]);
            //vérification en console du succès de la récupération de chaque département individuellement
            console.log(departement);

          });
        })
        .catch((error) => console.log(`Erreur catched :`, error))
    );
  }
  getDepartements();
}
//execution de la fonction pour générer les options
optionsOfDepartements();

selectDepartement.onchange = async function (event) {
  event.preventDefault();
  const selectedDepartement = selectDepartement.value;
  console.log(selectedDepartement);
  return selectedDepartement;
  //  allRegions = await getRegions(selectedRegion);
};



// Sélecteur de la ville
const selectCity = createMarkup("select", "", form, [
  { name: "class", value: "chooseCity" },
]);
const city = createMarkup("option", "Choisir une ville", selectCity);

// Options du sélecteur de département
function optionsOfCities() {
  // Récupération des régions avec fetch
  function getCities() {
    return (
      fetch(`https://geo.api.gouv.fr/departements/75/communes`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Le serveur ne répond pas !");
            //récupération des région sous forme d'un object json
          } else return response.json();
        })
        //les données de la promesse résolue sont utilisée pour générer les options du sélecteur
        .then((cities) => {
          //pour chaque région, une createMarkup permet de générer une option avec le département, l'id étant le code de la région
          cities.forEach((city) => {
            createMarkup("option", city.nom, selectCity, [
              { name: "id", value: `${city.code}` },
            ]);
            //vérification en console du succès de la récupération de chaque département individuellement
            console.log(city);
          });
        })
        .catch((error) => console.log(`Erreur catched :`, error))
    );
  }
  getCities();
}
//execution de la fonction pour générer les options
optionsOfCities();

selectCity.onchange = async function (event) {
  event.preventDefault();
  const selectedCity = selectCity.value;
  console.log(selectedCity);
  return selectedCity;
  //  allRegions = await getRegions(selectedRegion);
};






const article = createMarkup("article", "Test", form);