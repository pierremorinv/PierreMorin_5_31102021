// récupération de l'api//
fetch("http://localhost:3000/api/products")
  .then((reponse) => reponse.json())
  .then((reponse2) => console.table(reponse2));
