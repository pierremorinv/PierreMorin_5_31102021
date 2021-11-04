// récupération de l'api//
fetch("http://localhost:3000/api/products")
  .then((reponse) => reponse.json())
  .then((reponse2) => {
    // boucle récpération image decription et nom du produit //
    for (let i = 0; i < reponse2.length; i++) {
      productlist.innerHTML += `<a href="./product.html?id=${reponse2[i]._id}">
      <article>
        <img src="${reponse2[i].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName">${reponse2[i].name}</h3>
        <p class="productDescription"> ${reponse2[i].description}</p>
      </article>
    </a> `;
    }
  });
/////////////////////////////////////////////////////////////////////
const productlist = document.getElementById("items");
console.log(items);
