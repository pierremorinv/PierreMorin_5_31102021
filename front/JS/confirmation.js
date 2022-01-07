const queryString_url = window.location.search;

// méthode pour extraire le orderId
const urlSearchParams = new URLSearchParams(queryString_url);
const numberOrderId = urlSearchParams.get("orderId");
console.log(numberOrderId);
// afficher le numéro de  commande
let orderIdElement = document.getElementById("orderId");
orderIdElement.innerHTML = `${numberOrderId}`;
