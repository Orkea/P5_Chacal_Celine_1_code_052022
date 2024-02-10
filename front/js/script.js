// Récupération des produits à partir de l'api
const reponse = await fetch("http://localhost:3000/api/products")
const products = await reponse.json()

function genererProduits(products) {
    for (let i = 0; i < products.length; i++){
        const article = products[i];
        // Récupération de l'élément du DOM qui accueillera les fiches produits
        const sectionFichesProduits = document.querySelector(".items")
        // // Création d’une balise dédiée au lien vers le produits
        const lienProduits = document.createElement("a")
        lienProduits.href = `./product.html?id=${article._id}`
        // Création d’une balise dédiée à un produit
        const produitElement = document.createElement("article")
        
        // Création des balises
        const imageElement = document.createElement("img")
        imageElement.src= article.imageUrl
        imageElement.alt = article.altTxt
        const nomElement = document.createElement("h3")
        nomElement.innerText = article.name
        nomElement.classList.add("productName")
        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = article.description
        descriptionElement.classList.add("productDescription")

        // On rattache la balise article a la section 
        sectionFichesProduits.appendChild(lienProduits)
        lienProduits.appendChild(produitElement)
        produitElement.appendChild(imageElement)
        produitElement.appendChild(nomElement)
        produitElement.appendChild(descriptionElement)
    }
}
genererProduits(products)