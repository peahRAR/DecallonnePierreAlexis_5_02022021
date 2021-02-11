// Récupération des articles via l'API

findAllItems = () => {
    return fetch("http://localhost:3000/api/cameras")
        .then(response => {
            const jsonResponse = response.json()
            console.log(jsonResponse) // Verification a supprimer en phase de production
            return jsonResponse
        }).catch(error => console.log("Erreur : " + error)); // Verification a supprimer en phase de production;
}

// PAGE INDEX
async function items() {
    const items = await findAllItems();

    // Lien avec l'index.html
    let listItems = document.querySelector(".listItems");

    // Boucle sur les objets récupéré via l'API
    items.forEach((item) => {
        let itemPosition = document.createElement("div");
        let itemCard = document.createElement("article");
        let itemImg = document.createElement("div");
        let itemDescBox = document.createElement("div");
        let itemDesc = document.createElement("p");
        let itemPhoto = document.createElement("img");
        let itemName = document.createElement("h5");
        let itemPriceBox = document.createElement("div")
        let itemPrice = document.createElement("p");
        let itemLink = document.createElement("a");

        // Attributs des balises Html
        // Div englobante
        listItems.setAttribute("class", "row");
        // Div mise en page responsive
        itemPosition.setAttribute("class", "col-12 col-md-6 col-lg-4 col-xl-3");
        // Div des cards (composant Bootstrap)
        itemCard.setAttribute("class", "card  mb-2");
        // Div Encart image
        itemImg.setAttribute("class", "boxImg embed-responsive embed-responsive-16by9 ");
        itemImg.setAttribute("height", "200px");
        // Balise image
        itemPhoto.setAttribute("src", item.imageUrl);
        itemPhoto.setAttribute("alt", "Photo d'une caméra");
        itemPhoto.setAttribute("class", "card-img-top embed-responsive-item");
        // Div Body Card
        itemDescBox.setAttribute("class", "card-body");
        // Balise Description
        itemDesc.setAttribute("class", "description");
        // Balise Link + Prix
        itemPriceBox.setAttribute("class", "d-flex justify-content-between align-items-center")
        // Balise Link
        itemLink.setAttribute("class", "btn badge badge-dark text-uppercase p-2")
        itemLink.setAttribute("href", "html/product.html?id=" + item._id); // Gére la redireciton en passant l'id produit dans l'url
        // Balise Prix
        itemPrice.setAttribute("class", "mb-0 font-weight-bold")

        //Structure des blocs Html
        listItems.appendChild(itemPosition);
        itemPosition.appendChild(itemCard);
        itemCard.appendChild(itemImg);
        itemImg.appendChild(itemPhoto);
        itemCard.appendChild(itemDescBox);
        itemDescBox.appendChild(itemName);
        itemDescBox.appendChild(itemDesc);
        itemDescBox.appendChild(itemPriceBox);
        itemPriceBox.appendChild(itemLink);
        itemPriceBox.appendChild(itemPrice);


        // Affichage dans la page Html
        itemName.textContent = item.name;
        itemDesc.textContent = item.description;
        itemPrice.textContent = item.price / 100 + " EUR";
        itemLink.textContent = "more info";

    });
}

//PAGE PRODUIT

// Retrouver uniquement l'article concerné dans l'API
let idItems = "";
findGoodItem = () => {
    idItems = location.search.substring(4); // Recuperation de l'id dans l'URL
    return fetch(`http://localhost:3000/api/cameras/${idItems}`)
        .then(response => {
            const jsonResponse = response.json()
            console.log(jsonResponse) // Verification a supprimer en phase de production
            return jsonResponse
        }).catch(error => console.log("Erreur : " + error)); // Verification a supprimer en phase de production;
}

async function infoItem() {
    const item = await findGoodItem();

    // Création des éléments html
    let infoItem = document.querySelector(".product");
    let itemCard = document.createElement("div")
    let itemImg = document.createElement("div");
    let itemDescBox = document.createElement("div");
    let itemDesc = document.createElement("p");
    let itemPhoto = document.createElement("img");
    let itemName = document.createElement("h1");
    let itemOption = document.createElement("select");
    let itemPriceBox = document.createElement("div")
    let itemPrice = document.createElement("p");
    let itemAddToCart = document.createElement("a");

    // Attributs des balises Html
    // Div englobante
    infoItem.setAttribute("class", "product col-12");
    itemCard.setAttribute("class", "card d-flex");
    itemImg.setAttribute("class", "imgBox");
    itemDescBox.setAttribute("class", "bloc-description");
    itemDesc.setAttribute("class", "description");
    itemName.setAttribute("class", "card-header");

    //Structure des blocs Html
    infoItem.appendChild(itemCard);
    itemCard.appendChild(itemName);
    itemCard.appendChild(itemImg);
    itemImg.appendChild(itemPhoto);
    itemCard.appendChild(itemDescBox);
    itemDescBox.appendChild(itemDesc);
    itemDescBox.appendChild(itemOption);
    itemCard.appendChild(itemPriceBox);
    itemPriceBox.appendChild(itemPrice);
    itemCard.appendChild(itemAddToCart);

    // Affichage dans le Html
    itemName.textContent = item.name;
    console.log(idItems);
    console.log(infoItemSelect);
    console.log(infoItemSelect.name);

}



