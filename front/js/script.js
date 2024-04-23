// Récupération des produits à partir de l'api
const reponse = await fetch("http://localhost:3000/api/products")
const products = await reponse.json()

function generateProduct() {
    // Récupération de l'élément du DOM qui accueillera les fiches produits
    const sectionFichesProduits = document.querySelector(".items")
    for (let i = 0; i < products.length; i++){
        const product = products[i];
        // Création d’une balise dédiée au lien vers le produits
        const lienProduits = document.createElement("a")
        lienProduits.href = `./product.html?id=${product._id}`
        // Création d’une balise dédiée à un produit
        const produitElement = document.createElement("article")
        // Création des balises contenu dans l'article image, titre, nom, description
        const imageElement = document.createElement("img")
        imageElement.src= product.imageUrl
        imageElement.alt = product.altTxt
        const nomElement = document.createElement("h3")
        nomElement.innerText = product.name
        nomElement.classList.add("productName")
        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = product.description
        descriptionElement.classList.add("productDescription")
        // Rattachement de la balise article à sa section 
        sectionFichesProduits.appendChild(lienProduits)
        lienProduits.appendChild(produitElement)
        produitElement.appendChild(imageElement)
        produitElement.appendChild(nomElement)
        produitElement.appendChild(descriptionElement)
    }
}
generateProduct(products)