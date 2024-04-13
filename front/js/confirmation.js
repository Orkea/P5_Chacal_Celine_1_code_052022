// Récuperation de l'id du produit via l'Url
let confirmationtUrl = new URL (window.location.href)
let commandId = confirmationtUrl.searchParams.get("id")

// Récupération de l'élément du DOM du numéro de commande et affichage de celui-çi
const spanCommand = document.getElementById("orderId")
spanCommand.innerText = commandId