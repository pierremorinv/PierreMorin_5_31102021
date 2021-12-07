// récupération de la chaine de requête dans l'url //
const queryString_url = window.location.search;

// méthode pour extraire l'id //
const urlSearchParams = new URLSearchParams(queryString_url);

const productId = urlSearchParams.get("id");
console.log("id est " + productId);
fetch("http://localhost:3000/api/products/" + productId)
  .then((reponse) => reponse.json())
  .then((reponse2) => {
    console.log(reponse2);
    /////////////////////Injecter dynamiquement les caractéristiques du produit sélectionnez  ////////////////////////////////////
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
  });

/////////////////////la gestion du panier /////////////////
/// choix de l'utilisateur
let envoyerPanier = document.getElementById("addToCart");
// Aller sur la page panier //
envoyerPanier.addEventListener("click", function () {
  let couleur = document.getElementById("colors").value;
  let quantité = document.getElementById("quantity").value;
  let produit = [productId, couleur, quantité];
  console.log("le produit est " + produit);

  ///////////////////sauvegarde des données //////////////////////////////////
  let panier = JSON.parse(localStorage.getItem("produit"));
  console.log(panier);
  // s'il y à des déja des produits d'enregistré dans le local storage
  let produitDejaPresent = 0;
  if (panier) {
    for (let i = 0; i < panier.length; i++) {
      console.log(panier[i]);
      if (panier[i][0] == productId && panier[i][1] == couleur) {
        panier[i][2] = parseInt(panier[i][2]) + parseInt(quantité);
        produitDejaPresent = 1;
      }
    }
    if (produitDejaPresent == 0) {
      panier.push(produit);
    }

    localStorage.setItem("produit", JSON.stringify(panier));
    console.log(panier);
  }
  // s'il y n'y à pas de produit d'enregistré dans le local storage
  else {
    panier = [];
    panier.push(produit);
    localStorage.setItem("produit", JSON.stringify(panier));
    console.log(panier);
  }
  /////////////////////////Message d'alerte utilisateur ///////////////////////////
  if (!couleur && quantité <= 0) {
    window.alert(
      "Veuillez sélectionnez une couleur et une quantité supérieur ou égal à  1"
    );
  } else if (quantité <= 0) {
    window.alert("veuillez sélectionnez une quantité supérieur à 0");
  } else if (!couleur) {
    window.alert("veuillez sélectionnez une couleur");
  } else window.open("http://127.0.0.1:5500/front/html/cart.html");
});
