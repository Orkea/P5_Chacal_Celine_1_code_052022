/***** Déclaratin des variable globale */
let totalPrice = 0
// Récupération des produits de l'api
async function infoAPIProduct(product) {
  const reponse = await fetch("http://localhost:3000/api/products/" + product.id)
  const products = await reponse.json()
  // on recupere l'element du Dom ou va étre insere l'image
  const article = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] `)
  //On crée la div de l'image
  const divImage = document.createElement("div")
    divImage.className = "cart__item__img"
  // On crée l'image  
  const productImage = document.createElement("img")
  productImage.src = products.imageUrl
  productImage.alt = products.altTxt
  // On crée la description
  const divContent = document.createElement("div")
  divContent.className = "cart__item__content"
  const divContentDescritption = document.createElement("div")
  divContentDescritption.className = "cart__item__content__description"
  const h2 = document.createElement("h2")
  h2.innerText = products.name
  // Création d'une balise pour afficher la couleur
  const color = document.createElement("p")
  color.innerText = product.color
  // Création d'une balise pour afficher le prix
  const price = document.createElement("p")
  price.id = "price"
  price.innerText = `${products.price} € ` 
  // On crée la Quantité
  const divContentSettings = document.createElement("div")
  divContentSettings .className = "cart__item__content__settings"
  const divContentSettingsQuantity = document.createElement("div")
  divContentSettingsQuantity.className = "cart__item__content__settings__quantity"
  // Création d'une balise pour afficher la quantite
  const quantity = document.createElement("p")
  quantity.innerText = "Qté : " 
  const input = document.createElement("input")
  input.type = "number"
  input.className = "itemQuantity"
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = product.quantity
  // Création d'une balise pour le bouton suprimer
  const divContentSettingsDelete = document.createElement("div")
  divContentSettingsDelete.className = "cart__item__content__settings__delete"
  const suprimer = document.createElement("p")
  suprimer.className = "deleteItem"
  suprimer.innerText = "Suprimer"
  //on ajout les elements a la balise article
  article.appendChild(divImage)
  divImage.appendChild(productImage)
  article.appendChild(divContent)
  divContent.appendChild(divContentDescritption)
  divContentDescritption.appendChild(h2)
  divContentDescritption.appendChild(color)
  divContentDescritption.appendChild(price)
  divContent.appendChild(divContentSettings)
  divContentSettings.appendChild(divContentSettingsQuantity)
  divContentSettingsQuantity.appendChild(quantity)
  divContentSettingsQuantity.appendChild(input)
  divContent.appendChild(divContentSettingsDelete)
  divContentSettingsDelete.appendChild(suprimer)

  // On calcul le prix d'un ensemble de produit er on l'ajout au prix total
  totalPrice += ((products.price)*(product.quantity))
  // Récupération de l'élement du DOM ou le prix total est affichée
  const spanTotalPrice = document.getElementById("totalPrice")
  spanTotalPrice.innerText = totalPrice

//  // Gestion de la supression du produit
//     // On recuperer l'élément du DOM de supression
//     const btnDelete = document.querySelectorAll(".deleteItem")
//     console.log(btnDelete)
  
//     // // On ecoute son click du Supprimer
//     for (let i =0; i< btnDelete.length; i++ ){
//       const supprimer = btnDelete[i]   
//         suprimer.addEventListener("click", (event)=>{
//           event.preventDefault()
//           // On recupere les données de l'element parent
//           const article = supprimer.closest("article")
//           console.log( "Pour l'article " + article.dataset.id + " de couleur : " + article.dataset.color )
//         })
//     }
}
 
// Récupération du panier dans le localStotrage
let basket = JSON.parse(localStorage.getItem("Basket"))

function genererProductBasket(products) {
  // Récupération de l'élement du DOM ou le(s) produit(s) du panier seront insérer
  const sectionProducts = document.getElementById("cart__items")
  let totalQuantity = 0
  // On parcouru le panier recuperer
  for (let i = 0; i < basket.length; i++) {
    const productBasket = products[i]
    // Création d’une balise dédiée à un produit
    const productElement = document.createElement("article")
    productElement.className = "cart__item"
    productElement.dataset.id = productBasket.id
    productElement.dataset.color = productBasket.color
    // Création d'une balise pour afficher la couleur
    const color = document.createElement("p")
    color.innerText = productBasket.color
    //on recupèrer les autres informations du produit dans l'api et on les affiche dans le DOM
    infoAPIProduct(productBasket)
    // On recupere les quantités
    totalQuantity+= productBasket.quantity
    // On rattache la balise article a la section "cart__items"
    sectionProducts.appendChild(productElement)
  }


  // Récupération de l'élement du DOM ou la quantité total est affichée
  const spanTotalQuantity = document.getElementById("totalQuantity")
  spanTotalQuantity.innerText = totalQuantity
 
}

genererProductBasket(basket)

