///////// récupération des données du local storage

let panier2 = localStorage.getItem("produit");
let panier = JSON.parse(panier2);
console.log(panier);
let form = [];
let cartItemElement = document.getElementsByClassName("cart__item");
console.log(cartItemElement);

/////// fonction pour afficher le nombre de produits commandés //////

async function insertProduit() {
  let totalPrice = 0;
  let totalQuantity = 0;
  for (let i = 0; i < panier.length; i++) {
    console.log(panier[i]);

    // transformer ma chaine de caractères en nombres ///

    totalQuantity += parseInt(panier[i][2]);
    await fetch("http://localhost:3000/api/products/" + panier[i][0])
      .then((reponse) => reponse.json())
      .then((reponse2) => {
        console.log(reponse2);
        totalPrice += reponse2.price * panier[i][2];
        console.log("le prix total est de  " + totalPrice);
        form = document.getElementById("cart__items");
        form.innerHTML += `<article class="cart__item" data-id="${panier[i][0]}" data-color="${panier[i][1]}">
        <div class="cart__item__img">
          <img src="${reponse2.imageUrl}" alt="${reponse2.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${reponse2.name}</h2>
            <p>${reponse2.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :  </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i][2]}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
        </article> `;
      });
  }
  return [totalQuantity, totalPrice];
}
insertProduit().then(([totalQuantity, totalPrice]) => {
  document.getElementById("totalPrice").innerHTML += `${totalPrice}`;
  document.getElementById("totalQuantity").innerHTML += `${totalQuantity}`;
  console.log(totalPrice);
  console.log(panier);

  // supression d'articles dans le panier //
  let deleteElement = document.getElementsByClassName("deleteItem");
  for (let i = 0; i < panier.length; i++) {
    deleteElement[i].addEventListener("click", function (e) {
      let article = e.target.closest(".cart__item");
      let articleId = article.dataset.id;
      let articleColor = article.dataset.color;
      console.log(articleId, articleColor);

      for (let i = 0; i < panier.length; i++) {
        if (panier[i][0] == articleId && panier[i][1] == articleColor)
          panier.splice([i], 1);
      }
      console.log(panier);
      article.remove();
    });
  }
});

// modification de la quantité de produits dans le panier //

// redirection vers la page de confirmation //

let submit = document.getElementsByClassName("cart__order__form__submit");
submit[0].addEventListener("click", function () {
  window.open("http://127.0.0.1:5500/front/html/confirmation.html");
});
