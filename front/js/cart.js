/*****Déclaratin des variables globale */
let totalPrice = 0
let totalQuantity = 0

// Récupération des informations du produit à partir de l'api
async function infoAPIProduct(product){
  const reponse = await fetch("http://localhost:3000/api/products/" + product.id)
  const productAPI = await reponse.json()
  // Récupération de l'element du Dom ou va étre insere l'image
  const article = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] `)
  // Création de la div de l'image
  const divImage = document.createElement("div")
  divImage.className = "cart__item__img"
  // Création de l'image du produit
  const productImage = document.createElement("img")
  productImage.src = productAPI.imageUrl
  productImage.alt = productAPI.altTxt
  // Création de la description du produit
  const divContent = document.createElement("div")
  divContent.className = "cart__item__content"
  const divContentDescritption = document.createElement("div")
  divContentDescritption.className = "cart__item__content__description"
  const h2 = document.createElement("h2")
  h2.innerText = productAPI.name
  // Création d'une balise pour afficher la couleur d'un produit
  const color = document.createElement("p")
  color.innerText = product.color
  // Création d'une balise pour afficher le prix
  const price = document.createElement("p")
  price.id = "price"
  price.innerText = `${productAPI.price} € `
  // Création de la div qui contient l'input de la quantité
  const divContentSettings = document.createElement("div")
  divContentSettings.className = "cart__item__content__settings"
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
  // Création d'une balise pour le bouton supprimer
  const divContentSettingsDelete = document.createElement("div")
  divContentSettingsDelete.className = "cart__item__content__settings__delete"
  const supprimer = document.createElement("p")
  supprimer.className = "deleteItem"
  supprimer.innerText = "supprimer"
  //Ajout des différents éléments à la balise article
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
  divContentSettingsDelete.appendChild(supprimer)
  // Récupération des quantités des produits
  totalQuantity += Number(product.quantity)
  // Récupération de l'élement du DOM ou la quantité total est affichée
  const spanTotalQuantity = document.getElementById("totalQuantity")
  spanTotalQuantity.innerText = totalQuantity
  // Calcul du prix d'un ensemble de produit et ajout au prix total
  totalPrice += ((productAPI.price) * (product.quantity))
  // Récupération de l'élement du DOM ou le prix total est affichée
  const spanTotalPrice = document.getElementById("totalPrice")
  spanTotalPrice.innerText = totalPrice
  removeProduct(product, productAPI)
  changeQuantity(product, productAPI)
}
// Gestion de le supression de l'article qui contient un produit
function removeArticleProduct(product, productAPI, btn) {
  // Récupération du panier dans le localStotrage
  let basket = JSON.parse(localStorage.getItem("Basket"))
  // Récupération de l'article parent
  const article = btn.closest("article")
  // Retrait de l'article
  article.remove()
  // Mise à jour du prix total
  totalPrice -= ((productAPI.price) * (product.quantity))
  // Récupération de l'élement du DOM ou le prix total est affichée 
  const spanTotalPrice = document.getElementById("totalPrice")
  spanTotalPrice.innerText = totalPrice
  // Mise à jour de la quantité totale
  totalQuantity -= product.quantity
  // Récupération de l'élement du DOM ou la quantité total est affichée
  const spanTotalQuantity = document.getElementById("totalQuantity")
  spanTotalQuantity.innerText = totalQuantity
  // Filtrage du localStorage du produit à suprimer et mise à jour du localStorage
  let newBasket = basket.filter(p => !(p.id === product.id && p.color === product.color))
  localStorage.setItem("Basket", JSON.stringify(newBasket))
}
// Gestion de la supression du produit
function removeProduct(product, productAPI) {
  // Récupération de l'élément du DOM à supprimer
  const btndDelete = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] ` + `p[class=deleteItem ]`)
  // Ecoute du click du bouton "Supprimer"
  btndDelete.addEventListener("click", (event) => {
    event.preventDefault()
    removeArticleProduct(product, productAPI, btndDelete)
  })
}
// Gestion du changement de produit
function changeQuantity(product, productAPI) {
  const btnChange = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] ` + `input`)
  btnChange.addEventListener("change", (event) => {
    event.preventDefault()
    // Récupération du panier dans le localStotrage
    let basket = JSON.parse(localStorage.getItem("Basket"))
    // Récupération de la nouvelle valeur de la quantité
    let newQuantity = btnChange.value
    if (newQuantity > 0 && newQuantity <= 100) {
      // Cacul de la différence de quantité et ajout à la quantité total
      totalQuantity += (newQuantity - product.quantity)
      // Mise à jour du prix total
      // Calcul de la différence de prix pour un produit donné
      let newPrice = (productAPI.price * newQuantity) - ((productAPI.price) * (product.quantity))
      totalPrice += newPrice
      // Récupération de l'élement du DOM ou le prix total est affichée 
      const spanTotalPrice = document.getElementById("totalPrice")
      spanTotalPrice.innerText = totalPrice
      // Mise à jour la quantité du produit
      product.quantity = newQuantity
      // Récupération de l'élement du DOM ou la quantité total est affichée
      const spanTotalQuantity = document.getElementById("totalQuantity")
      spanTotalQuantity.innerText = totalQuantity
      // Récherche dans le panier de l'existance du produit et mise à jour de sa quantité
      let foundProduct = basket.find(p => p.id === product.id && p.color === product.color)
      foundProduct.quantity = newQuantity
      localStorage.setItem("Basket", JSON.stringify(basket))
    }
    else if (newQuantity <= 0) {
      removeArticleProduct(product, productAPI, btnChange)
    } else {
      alert("Veuillez entrer un nombre d'article (1-100)")
    }
  })
}
// Cette fonction d'afficher les produits dans le DOM
function generateProductBasket(products) {
  // Récupération de l'élement du DOM ou le(s) produit(s) du panier seront insérer
  const sectionProducts = document.getElementById("cart__items")
  // Parcoure du panier récupérer
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
    // Récupération des autres informations du produit dans l'api et affichage dans le DOM
    infoAPIProduct(productBasket)
    // Rattachement de la balise article à sa section
    sectionProducts.appendChild(productElement)
  }
}
// Récupération du panier dans le localStotrage
let basket = JSON.parse(localStorage.getItem("Basket"))

generateProductBasket(basket)

//Gestion des donées du formulaire
// Vérification de la validité du nom et du prémon de l'utilisateur
function checkIdentity(chaine) {
  let chaineDiv = chaine.closest("div")
  let baliseError = chaineDiv.lastElementChild
  baliseError.innerText = ""
  let validString = true
  // Création de la RegExp
  let chaineRegExp = new RegExp("^[a-zA-ZÀ-ÿ\-']{2,}$")
  // Ecoute de la saisie de la chaine de caractères
  chaine.addEventListener("change", (event) => {
    event.preventDefault()
    baliseError.innerText = ""
    // Condition de validation de la RegExp
    if (!chaineRegExp.test(chaine.value)) {
      baliseError.innerText = `Le champ ${(chaineDiv.innerText).slice(0, -1)} n'est pas valide`
      validString = false
    }
  })
  return validString
}
// Vérification de la validité de l'adresse et de la ville de l'utilisateur
function checkString(chaine) {
  let chaineDiv = chaine.closest("div")
  let baliseError = chaineDiv.lastElementChild
  baliseError.innerText = ""
  let validString = true
  // Ecoute de la saisie de la chaine de caractères
  chaine.addEventListener("input", (event) => {
    event.preventDefault()
    baliseError.innerText = ""
    // Condition de validation de la chaine de caractère
    if ((chaine.value).trim().length <= 2) {
      baliseError.innerText = `Le champ ${(chaineDiv.innerText).slice(0, -1)} est trop court.`
      validString = false
    }
  })
  return validString
}
// Gestion du format de l'email de l'utilisation
function checkEmail(email) {
  let emailDiv = email.closest("div")
  let emailBaliseError = emailDiv.lastElementChild
  emailBaliseError.innerText = ""
  let validString = true
  // Création de la RegExp
  let emailRegExp = new RegExp("^[a-zA-Z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+$")
  // Ecoute de la saisie de la chaine de caractères
  email.addEventListener("change", (event) => {
    event.preventDefault()
    emailBaliseError.innerText = ""
    // Condition de validation de la RegExp
    if (!emailRegExp.test(email.value)) {
      emailBaliseError.innerText = "L'email n'est pas valide."
      validString = false
    }
  })
  return validString
}
// Création du tableau de produit(s) commandé(s)
function generateArrayProducts() {
  // Initialisation du tableau de Produits
  let arrayProducts = []
  // Récuperation de l'ensemble des articles 
  const articles = document.querySelectorAll("article")
  // Rajout de chaque id de produit dans le tabeau
  for (let i = 0; i < articles.length; i++) {
    const articleId = articles[i].dataset.id
    arrayProducts.push(articleId)
  }
  return arrayProducts
}
// Gestion de l'envoi du formulaire : validité des informations utilisateurs et récupération du numéro de commmande
function gererFormulaire() {
  // Récupération des éléments du DOM qui contiennent les données de l'utilisateur
  let prenom = document.getElementById("firstName")
  let nom = document.getElementById("lastName")
  let adresse = document.getElementById("address")
  let ville = document.getElementById("city")
  let email = document.getElementById("email")
  // Vérification de la validité des données utilisateurs
  let prenomValide = checkIdentity(prenom)
  let nomValide = checkIdentity(nom)
  let adresseValide = checkString(adresse)
  let villeValide = checkString(ville)
  let emailValide = checkEmail(email)
  // Récuperation de l'élement du DOM du formulaire de commande
  let form = document.querySelector("form")
  // Ecoute de l'envoi du formuaire
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    if (prenomValide && nomValide && adresseValide && villeValide && emailValide) {
      // Récupération de la liste de produit(s) commandé(s)
      let listProducts = generateArrayProducts()
      // Création de l'objet qui contient le données de l'objet contact et de la liste d'Id des produits commandés
      const objCommand = {
        "contact": {
          firstName: prenom.value,
          lastName: nom.value,
          address: adresse.value,
          city: ville.value,
          email: email.value,
        },
        "products": listProducts
      }
      // Création de la charge utile au format JSON
      const chargeUtile = JSON.stringify(objCommand)
      // Envoi des informations de la commande à l'API
      const response = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
      })
        .then(response => response.json())
        //Récupération du numero de commande de la reponse
        .then(data => {
          const orderId = data.orderId
          // Redirection de l'utilisateur vers la page de confirmation. Le numéro de commande est inscrit dans l'adresse
          window.location.href = `./confirmation.html?id=${orderId}`
        })
    } else {
      alert("Vérifiez que toutes vos informations soient valides")
    }
  })
}

gererFormulaire()
