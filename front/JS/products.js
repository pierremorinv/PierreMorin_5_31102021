// récupération de la chaine de requête dans l'url //
const queryString_url = window.location.search;

// méthode pour extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url);

const productId = urlSearchParams.get("id");
console.log("id est " + productId);
fetch("http://localhost:3000/api/products/" + productId)
  .then((reponse) => reponse.json())
  .then((reponse2) => {
    console.log(reponse2);

    // image produit
    const productImg = document.getElementsByClassName("item__img");
    productImg[0].innerHTML += ` <img src=" ${reponse2.imageUrl}" alt="Photographie d'un canapé"> `;
    const productName = document.getElementById("title");
    productName.innerHTML += `${reponse2.name}`;
    // prix produit
    const productPrice = document.getElementById("price");
    productPrice.innerText = `${reponse2.price}`;
    // description produit
    const productDescription = document.getElementById("description");
    productDescription.innerHTML += reponse2.description;
    // couleur produit
    const productColor = document.getElementById("colors");
    for (let i = 0; i < reponse2.colors.length; i++) {
      productColor.innerHTML += `<option value="${reponse2.colors[i]}"> ${reponse2.colors[i]}</option>`;
    }
    // Variable de ma commande //

    let produit = [reponse2._id, reponse2.colors[i], reponse2.length];
    console.log(produit);
    let panier = [];
  });
let submit = document.getElementById("addToCart");
submit.addEventListener("click", function () {
  alert("hello World");
});
