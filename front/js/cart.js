/***** Déclaratin des variables globale */
let totalPrice = 0
let totalQuantity = 0

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
  divContentSettingsDelete.appendChild(supprimer)

  // On recupere les quantités
  totalQuantity += Number(product.quantity)
  // Récupération de l'élement du DOM ou la quantité total est affichée
  const spanTotalQuantity = document.getElementById("totalQuantity")
  spanTotalQuantity.innerText = totalQuantity

  // On calcul le prix d'un ensemble de produit et on l'ajout au prix total
  totalPrice += ((products.price) * (product.quantity))

  // Récupération de l'élement du DOM ou le prix total est affichée
  const spanTotalPrice = document.getElementById("totalPrice")
  spanTotalPrice.innerText = totalPrice

  removeProduct(product, products)
  changeQuantity(product, products)
}

// Gestion de le supression de l'article qui contient un produit
function removeArticleProduct(product, products, btn) {
  // Récupération du panier dans le localStotrage
  let basket = JSON.parse(localStorage.getItem("Basket"))
  // On recupere les données de l'element parent
  const article = btn.closest("article")
  // On retirer l'aticle du DOM
  article.remove()
  // on met a jour le total price
  totalPrice -= ((products.price) * (product.quantity))
  // Récupération de l'élement du DOM ou le prix total est affichée 
  const spanTotalPrice = document.getElementById("totalPrice")
  spanTotalPrice.innerText = totalPrice
  // On met a jour le total quantity
  totalQuantity -= product.quantity
  // Récupération de l'élement du DOM ou la quantité total est affichée
  const spanTotalQuantity = document.getElementById("totalQuantity")
  spanTotalQuantity.innerText = totalQuantity
  // On filtre du localStorage le produit à suprimer et on le met à jour
  let newBasket = basket.filter(p => !(p.id === product.id && p.color === product.color))
  localStorage.setItem("Basket", JSON.stringify(newBasket))
}

// Gestion de la supression du produit
function removeProduct(product, products) {
  // On recuperer l'élément du DOM de supression
  const btndDelete = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] ` + `p[class=deleteItem ]`)
  // On ecoute le click du btnDelete
  btndDelete.addEventListener("click", (event) => {
    event.preventDefault()
    removeArticleProduct(product, products, btndDelete)
  })
}
// Gestion du changement de produit
function changeQuantity(product, products) {
  const btnChange = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] ` + `input`)
  btnChange.addEventListener("change", (event) => {
    event.preventDefault()
    // Récupération du panier dans le localStotrage
    let basket = JSON.parse(localStorage.getItem("Basket"))
    // On recupere la nouvelle valeur de la quantité
    let newQuantity = btnChange.value
    if (newQuantity > 0 && newQuantity <= 100) {
      // On calcule la différence de quantité et on la rajoute au totalQuantity 
      totalQuantity += (newQuantity - product.quantity)
      // on met a jour le total price
      // On calcule la difference de prix pour un produit 
      let newPrice = (products.price * newQuantity) - ((products.price) * (product.quantity))
      totalPrice += newPrice
      // Récupération de l'élement du DOM ou le prix total est affichée 
      const spanTotalPrice = document.getElementById("totalPrice")
      spanTotalPrice.innerText = totalPrice
      // On met à jour la quantité de produite
      product.quantity = newQuantity
      // Récupération de l'élement du DOM ou la quantité total est affichée
      const spanTotalQuantity = document.getElementById("totalQuantity")
      spanTotalQuantity.innerText = totalQuantity
      // On cherche dans le panier si le produit existe
      let foundProduct = basket.find(p => p.id === product.id && p.color === product.color)
      foundProduct.quantity = newQuantity
      localStorage.setItem("Basket", JSON.stringify(basket))
    }
    else if (newQuantity <= 0) {
      removeArticleProduct(product, products, btnChange)
    } else {
      alert("Veuillez entrer un nombre d'article (1-100)")
    }
  })
}
function generateProductBasket(products) {
  // Récupération de l'élement du DOM ou le(s) produit(s) du panier seront insérer
  const sectionProducts = document.getElementById("cart__items")
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
    // On rattache la balise article a la section "cart__items"
    sectionProducts.appendChild(productElement)
  }
}
// Récupération du panier dans le localStotrage
let basket = JSON.parse(localStorage.getItem("Basket"))

generateProductBasket(basket)

// Vérification de la validaté du nom et du prémon de l'utilisateur
function checkIdentity(chaine) {
  chaine.addEventListener("change",(event)=>{
    event.preventDefault()
    let chaineDiv = chaine.closest("div")
    let baliseError = chaineDiv.lastElementChild
    baliseError.innerText = ""
    let validString = true
    let chaineRegExp = new RegExp("[a-zA-ZÀ-ÿ\-']{2,}")
    if (!chaineRegExp.test(chaine.value)) {
      baliseError.innerText = `Le champ ${(chaineDiv.innerText).slice(0, -1)} n'est pas valide`
      validString = false
    }
  return validString
  })
}

// Vérification de la validaté de la ville et de l'adresse de l'utilisateur
function checkString(chaine) {
  chaine.addEventListener("input",(event)=>{
    event.preventDefault()
    let chaineDiv = chaine.closest("div")
    let baliseError = chaineDiv.lastElementChild
    baliseError.innerText = ""
    let validString = true
    if (chaine.value.length <= 5) {
      baliseError.innerText = `Le champ ${(chaineDiv.innerText).slice(0, -1)} est trop court.`
      validString = false
    }
    return validString
  })
}

// Gestion du format de l'email de l'utilisation
function checkEmail(email) {
  let emailDiv = email.closest("div")
  let emailBaliseError = emailDiv.lastElementChild
  emailBaliseError.innerText = ""
  let validString = true
  let emailRegExp = new RegExp("[a-zA-Z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
  if (!emailRegExp.test(email.value)) {
    emailBaliseError.innerText = "L'email n'est pas valide."
    validString = false
  }
  return validString
}

// Création du tableau de produit(s) commandé(s)
function generateArrayProducts() {
  // On initailise le tableau de Produits
  let arrayProducts = []
  // on recupere l'ensemble des articles 
  const articles = document.querySelectorAll("article")
  //on rajoute chaque id de produit dans le tabeau
  for (let i = 0; i < articles.length; i++) {
    const articleId = articles[i].dataset.id
    arrayProducts.push(articleId)
  }
  return arrayProducts
}

// Gestion de l'envoi du formulaire : validité des informations utilisateurs et récupération du numéro de commmande
function gererFormulaire() {
  let adresse = document.getElementById("address")
  // Récupération des éléments du DOM qui contiennent les données de l'utilisateur
  let prenom = document.getElementById("firstName")
  let nom = document.getElementById("lastName")
  let email = document.getElementById("email")
  let ville = document.getElementById("city")
  // Vérification de la validité des données utilisateurs
  let prenomValide = checkIdentity(prenom)
  let nomValide = checkIdentity(nom)
  let adresseValide = checkString(adresse)
  let villeValide = checkString(ville)
  let emailValide = checkEmail(email)
  
  // Récuperation de l'élement du DOM du formulaire de commande
  let form = document.querySelector("form")
  // On ecoute l'envoi du formuaire
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    if (prenomValide && nomValide && adresseValide && villeValide && emailValide) {
      console.log("On commande")
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
      // Envoi des information de la commande à l'API
      const response = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
      })
      .then(response => response.json())
      //Récupération du numero de commande de la reponse
      .then(data =>{
        console.log("Commande n° : " + data.orderId)
        const orderId = data.orderId
        // Redirection de l'utilisateur vers la page de confirmation. Le numéro de commande est inscrit dans l'adresse
        window.location.href = `./confirmation.html?id=${orderId}`
      })
    } else {
      alert("Vérifiez que toutes vos informations soient valides ")
    }
  })
}

gererFormulaire()
