let productUrl = new URL (window.location.href)
let productId = productUrl.searchParams.get("id")

console.log(productUrl)
console.log(productId)
