import Dom from "./Dom.js";

export default class Regions extends Dom {
  constructor(name, web_pages) {
    super();
    this.name = name;
    this.web_pages = web_pages;
    this.render();
  }
  render () {
    const select = this.createMarkup("article", "", document.querySelector("#allData"), [{name:"class", value:"border p-3 col-md-3"}]);
    this.createMarkup("h2", this.name, article);
    this.createMarkup("p", this.web_pages, article);
  }
}



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

const jsonRegions = getRegions();
const regionsArray = JSON.parse(jsonRegions);

console.log(regionsArray.nom);

/*     getRegions.forEach((region) => {
        createMarkup("option", region.name, selectRegion [{name:"id", value:`${region.code}`}]) ;
    }) */



}



const selectRegiona = createMarkup("select", "", form, [
    { name: "id", value: "chooseRegion" },
]);
/* Options du sélecteur */
const regions = createMarkup("option", await getRegions(), selectRegion, [
    { name: "value", value: "France" },
]);






selectRegion.onchange = async function (event) {
    event.preventDefault();
    const selectedRegion = selectRegion.value;
    console.log(selectedRegion);
    allRegions = await getRegions(selectedRegion);
  }
  
  
  /* Récupération des données avec fetch */
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