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
// Cette fonction permet de recuperer le panier du local storage
function getBasket(){
    return JSON.parse(localStorage.getItem ("Basket")) || []
}

// // Cette fonction verifier la quantité
// function checkQuantity(){
//     quantity.addEventListener("change", (event)=>{ 
//         console.log(event)
//         let quantityValue = event.target.valueAsNumber
//         console.log(quantityValue)
//         let regex = new RegExp(/^\d+$/)
//        if (regex.test(quantityValue) && (quantityValue) <= 100 ) {
//         x = true
//        } 
//        return x
//     })
// }


// Cette fonction permet de rajouter le produit dans le panier ou augmente le quantité s'il existe
function addBasket(product){
    // On recupèrer le panier
    let basket = getBasket()
    let quantity = document.getElementById("quantity")
    let quantityValue = quantity.valueAsNumber
    let color = document.getElementById("colors").value
    // On cherche dans le panier si le produit existe
    let foundProduct = basket.find(p => p.id === productId && p.color === color)
    if(quantityValue > 0 && quantityValue <= 100 ){
        if (foundProduct !== undefined) {
           foundProduct.quantity+= quantityValue
                } else {
                    product.quantity = quantityValue
                    basket.push(product)
                }
    }else{
        alert("Veuillez entrer un nombre d'article (1-100)")
    }
    // On sauvegarde le nouveau panier
    saveBasket(basket)
}

// On recupèrer la balise du DOM qui gerer l'ajout au panier
const btnAddBasket = document.querySelector("button")
//On ecoute le click sur le btn "Ajouter au panier"
btnAddBasket.addEventListener("click", (event)=>{
    event.preventDefault()
    let color = document.getElementById("colors").value
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
