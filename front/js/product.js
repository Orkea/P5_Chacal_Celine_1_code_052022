// Récuperation de l'id du produit via l'Url
let productUrl = new URL (window.location.href)
let productId = productUrl.searchParams.get("id")

// Récupération des détails d'un produit
const reponse = await fetch("http://localhost:3000/api/products/" + productId)
const product = await reponse.json()

// Récupération de l'élements du DOM qui acueillent le logo d'un canapé
const logo = document.querySelector(".item__img")
const logoProduct = document.createElement("img")
logoProduct.src = "../images/logo.png"
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
    console.log(colorsProduct)
    for(let i=0; i<colorsProduct.length; i++){
        let value = colorsProduct[i]
        console.log(value)
        // on récupere l'élement du DOM qui accueille les couleurs
        const sectionColors = document.getElementById("colors")
        // On ajoute la balise option
        const optionProduct = document.createElement("option")
        optionProduct.value = colorsProduct[i]
        optionProduct.innerText = colorsProduct[i]
        sectionColors.appendChild(optionProduct)


    }





