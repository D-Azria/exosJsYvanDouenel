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




const form = createMarkup("form", "", document.body);


/* Sélecteur de la région */
const selectRegion = createMarkup("select", "", form, [
    { name: "id", value: "chooseRegion" },
]);
/* Options du sélecteur */
const regions = createMarkup("option", "", selectRegion, [
    { name: "value", value: "France" },
]);
const italy = createMarkup("option", "Italy", selectRegion, [
    { name: "value", value: "Italy" },
]);


/* Sélecteur de la région */
function optionsOfRegions () {
  function getRegions() {
      return fetch(`https://geo.api.gouv.fr/regions`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Le serveur ne répond pas !");
          } else return response.json();
        })
        .then((regions) => {
          return regions;
        })
        .catch((error) => console.log(`Erreur catched :`, error));
  }
console.log(getRegions());
/* const regionsArray = getRegions();

regionsArray.forEach((region) =>
)

console.log(regionsArray); */

/*     getRegions.forEach((region) => {
      createMarkup("option", region.name, selectRegion [{name:"id", value:`${region.code}`}]) ;
  }) */
}

optionsOfRegions();









selectRegion.onchange = async function (event) {
  event.preventDefault();
  const selectedRegion = selectRegion.value;
  console.log(selectedRegion);
  allRegions = await getRegions(selectedRegion);
}

/* 
// Récupération des données avec fetch
function getRegions(selectedRegion) {
  return fetch(`https://geo.api.gouv.fr/regions`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Le serveur ne répond pas !");
      } else return response.json();
    })
    .then((regions) => {
      return regions;
    })
    .catch((error) => console.log(`Erreur catched :`, error));
}
 */







// Sélecteur du département
const selectDepartment = createMarkup("select", "", form, [
  { name: "id", value: "chooseDepartement" },
]);
const spain = createMarkup("option", "Spain", selectDepartment, [
  { name: "value", value: "Spain" },
]);
const selectedDepartment = selectDepartment.value;
console.log(selectedDepartment);


// Sélecteur de la ville
const selectCity = createMarkup("select", "", form, [
  { name: "id", value: "chooseCity" },
]);



const article = createMarkup ("article", "Test", form);

