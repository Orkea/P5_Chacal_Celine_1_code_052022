// Récuperation de l'id du produit via l'Url
let productUrl = new URL (window.location.href)
let productId = productUrl.searchParams.get("id")

// Récupération des détails d'un produit
const reponse = await fetch("http://localhost:3000/api/products/" + productId)
const product = await reponse.json()
// Récupération de l'élements du DOM qui acueillent le logo d'un canapé
const logo = document.querySelector(".item__img")
const logoProduct = document.createElement("img")
logoProduct.src = product.imageUrl
logo.appendChild(logoProduct)
// On rajoute le nom du canapé
const titleProduct = document.getElementById("title")
titleProduct.innerText = product.name
// On rajoute le prix
const priceProduct = document.getElementById("price")
priceProduct.innerText = product.price
// On rajoute la description
const descriptionProduct = document.getElementById("description")
descriptionProduct.innerText = product.description
// On rajoute les couleurs
    // On récuèere la liste des couleurs
    const colorsProduct = product.colors
    // On récupere l'élement du DOM qui accueille les couleurs
    const sectionColors = document.getElementById("colors")
    for(let i=0; i<colorsProduct.length; i++){
        // On ajoute la balise option avec sa couleur
        const optionProduct = document.createElement("option")
        optionProduct.value = colorsProduct[i]
        optionProduct.innerText = colorsProduct[i]
        sectionColors.appendChild(optionProduct)
    }

// Gestion du produit au sein du panier   
// Cette fonction permet d'enregister le panier dans le local Storage
function saveBasket(product){
    localStorage.setItem("Basket", JSON.stringify(product))
}
// Cette fonction permet de recuperer le panier du local storage
function getBasket(){
    return JSON.parse(localStorage.getItem ("Basket")) || []
}

// Cette fonction permet de rajouter le produit dans le panier ou augmenter le quantitée s'il existe deja
function addBasket(product){
    // On recupère le panier du localStorage
    let basket = getBasket()
    let quantity = document.getElementById("quantity")
    let quantityValue = quantity.valueAsNumber
    let color = document.getElementById("colors").value
    // On cherche dans le panier s'il y'a un produit ayant le même id et la même couleur
    let foundProduct = basket.find(p => p.id === productId && p.color === color)
    if(quantityValue > 0 && quantityValue <= 100 ){
        if (foundProduct !== undefined) {
           foundProduct.quantity+= quantityValue
                } else {
                    product.quantity = quantityValue
                    basket.push(product)
                }
                // On sauvegarde le nouveau panier
                saveBasket(basket)
                alert("Vous avez ajouté un/des article(s) dans votre panier")
    }else{
        alert("Veuillez entrer un nombre d'article (1-100)")
    }
}

// On recupère la balise du DOM qui gérer l'ajout au panier
const btnAddBasket = document.querySelector("button")
//On écoute le click sur le btn "Ajouter au panier"
btnAddBasket.addEventListener("click", (event)=>{
    event.preventDefault()
    let color = document.getElementById("colors").value
    // On prend en compte la présence d'une option de personalisation du produit
    if (color !== ""){
        //On crée le produit à ajouter
        const productBasket = {
            id : productId,
            color : color,
            quantity: document.getElementById("quantity").valueAsNumber
        }
        addBasket(productBasket)
    }else{
        alert("Veuillez sélectionnez une couleur")
    }
})
