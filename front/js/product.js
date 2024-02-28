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
    // On recupere la liste des couleurs
    const colorsProduct = product.colors
    // on récupere l'élement du DOM qui accueille les couleurs
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
// Cette fonction permet de recupèrer le panier du local storage, s'il est vide on crée un array vide
export function getBasket(){
    let basket = localStorage.getItem ("Basket")
    if (basket === null) {
        return []   
    } else {
        return JSON.parse(basket)
    }
}
// Cette fonction permet de rajouter le produit dans le panier ou augmente le quantité s'il existe
function addBasket(product){
    // On recupèrer le panier
    let basket = getBasket()
    let quantityProduct = document.getElementById("quantity").valueAsNumber
    let colorProduct = document.getElementById("colors").value
    // On cherche dans le panier si le produit existe
    let foundProduct = basket.find(p => p.id === productId && p.colorProduct === colorProduct)
    console.log("j'ai trouvé : " + foundProduct)
    if (foundProduct !== undefined) {
                foundProduct.quantityProduct+= quantityProduct
            } else {
                product.quantityProduct = quantityProduct
                basket.push(product)
            }
    // On sauvegarde le nouveau panier
    saveBasket(basket)
}

    // On recupèrer la balise du DOM qui gerer l'ajout au panier
    const btnAddBasket = document.querySelector("button")
    //On ecoute le click sur le btn "Ajouter au panier"
    btnAddBasket.addEventListener("click", (event)=>{
        event.preventDefault()
        //On crée le produit à ajouter
        const productBasket = {
            id : productId,
            colorProduct : document.getElementById("colors").value,
            quantityProduct: document.getElementById("quantity").valueAsNumber
        }
        addBasket(productBasket)
    })




