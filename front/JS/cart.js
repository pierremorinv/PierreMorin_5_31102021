///////// récupération des données du local storage
let panier2 = localStorage.getItem("produit");
let panier = JSON.parse(panier2);
console.log(panier);
let form = [];
let cartItemElement = document.getElementsByClassName("cart__item");

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
      localStorage.setItem("produit", JSON.stringify(panier));
      console.log(panier);
      article.remove();
      location.reload();
    });
  }

  // modification de la quantité de produits dans le panier //
  let modificationElement = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < panier.length; i++) {
    modificationElement[i].addEventListener("change", function (e) {
      let articleModification = e.target.closest(".itemQuantity");
      let articleModificationValue = articleModification.value;
      for (let i = 0; i < panier.length; i++) {
        console.log(panier[i][2]);
      }

      if (panier[i][2] != articleModificationValue) {
        panier[i][2] = articleModificationValue;
      }

      localStorage.setItem("produit", JSON.stringify(panier));
      console.log(panier[i][2]);
      location.reload();
    });
  }
});

// redirection vers la page de confirmation //

let ContactForm = document.getElementsByClassName("cart__order__form__submit");
ContactForm[0].addEventListener("click", function (e) {
  e.preventDefault();
  let regExName = new RegExp("[a-zA-Zéè]+$", "g");
  let regExLastName = new RegExp("[a-zA-Zéè]+$", "g");
  // prettier-ignore
  let regExAddress = new RegExp("^[a-zA-Z0-9/\s/]", "m");
  let regExCity = new RegExp("[a-zA-Z]+$", "g");
  let regExMail = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
  let error = 0;

  let firstNameElement = document.getElementById("firstName");
  let firstNameErrorMsgElement = document.getElementById("firstNameErrorMsg");
  // regEx
  if (regExName.test(firstNameElement.value) == true) {
    console.log("Le prénom est valide");
    // firstName error Msg
  } else {
    firstNameErrorMsgElement.innerHTML = "Veuillez renseigner votre prénom ";
    error++;
  }

  let lastNameElement = document.getElementById("lastName");
  let lastNameErrorMsgElement = document.getElementById("lastNameErrorMsg");

  if (regExLastName.test(lastNameElement.value) == true) {
    console.log("Le nom est valide");
    // LastName error Msg
  } else {
    console.log(regExName.test(lastNameElement.value));
    lastNameErrorMsgElement.innerHTML = "Veuillez renseigner votre nom ";
    error++;
  }

  let addressElement = document.getElementById("address");
  let addressErrorMsgElement = document.getElementById("addressErrorMsg");
  console.log(regExAddress.test(addressElement.value));

  if (regExAddress.test(addressElement.value) == true) {
    console.log("l'adresse est valide");
    // Address Error Msg
  } else {
    addressErrorMsgElement.innerHTML = "Veuillez renseigner une adresse valide";
    error++;
    console.log(regExAddress.test(addressElement.value));
  }

  let cityElement = document.getElementById("city");
  let cityErrorMsgElement = document.getElementById("cityErrorMsg");

  if (regExCity.test(cityElement.value) == true) {
    console.log("la ville est valide ");
    // City Error Msg
  } else {
    cityErrorMsgElement.innerHTML = "Veuillez renseigner votre ville";
    error++;
  }

  let emailElement = document.getElementById("email");
  let emailErrorMsgElement = document.getElementById("emailErrorMsg");

  if (regExMail.test(emailElement.value) == true) {
    console.log("l'adresse email est valide");
    // Name Error Msg
  } else {
    emailErrorMsgElement.innerHTML =
      "Veuillez renseigner une adresse email valide";
    error++;
  }

  let contact = {
    firstName: firstNameElement.value,
    lastName: lastNameElement.value,
    address: addressElement.value,
    city: cityElement.value,
    email: emailElement.value,
  };

  console.log(contact);
  let products = [];
  // boucle pour intégrer l'id de chaque article dans le tableau Products  //
  for (let i = 0; i < panier.length; i++) {
    products.push(panier[i][0]);
  }
  console.log(products);
  if (error == 0) {
    // envoyer données à L'API
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        products: products,
        contact: contact,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        window.open(
          `http://127.0.0.1:5500/front/html/confirmation.html?orderId=${response.orderId}`
        );
      })
      .catch((error) => alert(error));
  } else if (error == 1) {
    console.log("il y à " + error + " erreur");
  } else {
    console.log("il y à " + error + " erreurs");
  }
});
