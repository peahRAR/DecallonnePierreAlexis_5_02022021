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
        let itemPosition = document.createElement("div"); // Voir pour externalisé en fin de projet
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
    let placeName = document.querySelector(".nameItem");
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
    let cartIcon = document.createElement("span");
    let addToCartBox = document.createElement("div");
    let footerCard = document.createElement("div");
    let selectBox = document.createElement("div");
    let textSelectBox = document.createElement("p");

    // Attributs des balises Html
    infoItem.setAttribute("class", "product col-12 p-0");
    itemCard.setAttribute("class", "card d-flex");
    itemImg.setAttribute("class", "imgBox");
    itemDescBox.setAttribute("class", "bloc-description card-body");
    itemDesc.setAttribute("class", "description");
    itemName.setAttribute("class", "card-title");
    itemAddToCart.setAttribute("class", "text-uppercase text-white");
    cartIcon.setAttribute("class", "fas fa-shopping-cart mr-1 text-white");
    addToCartBox.setAttribute("class", "btn badge badge-success p-2 order-3 addToCart");
    addToCartBox.addEventListener('click', () => addItemOnCart(item));
    itemPriceBox.setAttribute("class", "price-box d-flex align-items-center");
    footerCard.setAttribute("class", "d-flex flex-column justify-content-between align-items-center flex-md-row ");
    itemPrice.setAttribute("class", "m-0 mr-4 font-weight-bold")
    itemOption.setAttribute("class", "optionSelector mb-3 mb-md-0");
    selectBox.setAttribute("class", "lensesChoice d-flex");
    textSelectBox.setAttribute("class", "optionChoiceTitle m-0 mr-2");
    // Gestion affichage photo
    itemPhoto.setAttribute("src", item.imageUrl);
    itemPhoto.setAttribute("alt", "Photo d'une caméra");
    itemPhoto.setAttribute("class", "card-img-top embed-responsive-item");

    //Structure des blocs Html
    infoItem.appendChild(itemCard);
    itemCard.appendChild(itemImg);
    itemImg.appendChild(itemPhoto);
    itemCard.appendChild(itemDescBox);
    itemDescBox.appendChild(itemName);
    itemDescBox.appendChild(itemDesc);
    itemDescBox.appendChild(footerCard);
    footerCard.appendChild(selectBox);
    footerCard.appendChild(addToCartBox);
    footerCard.appendChild(itemPriceBox);
    selectBox.appendChild(textSelectBox);
    selectBox.appendChild(itemOption);
    itemPriceBox.appendChild(itemPrice);
    itemPriceBox.appendChild(addToCartBox);
    itemCard.appendChild(itemAddToCart);
    addToCartBox.appendChild(cartIcon);
    addToCartBox.appendChild(itemAddToCart);

    // Affichage dans le Html
    textSelectBox.textContent = "Lenses :";
    itemName.textContent = item.name;
    itemDesc.textContent = item.description;
    itemPrice.textContent = item.price / 100 + " EUR";
    itemAddToCart.textContent = "Buy";
    placeName.textContent = item.name;

    // Création de la boucle pour récupérer les différentes option.
    item.lenses.forEach((cam) => {
        let option = document.createElement("option");
        document.querySelector(".optionSelector");
        itemOption.appendChild(option).innerHTML = cam;
    });

    return item;

}


// Gestion du panier
let cart = localStorage.getItem("order") ? JSON.parse(localStorage.getItem('order')) : [];
localStorage.setItem('order', JSON.stringify(cart));

// Ajout d'un produit au panier
addItemOnCart = (item) => {
    let oldCart = JSON.parse(localStorage.getItem('order'));
    oldCart.push(item);
    localStorage.setItem('order', JSON.stringify(oldCart));
    $('#myModal').modal('show')
    setTimeout(function () { $('#myModal').modal('hide'); }, 1500);

    //Gestion affichage nombre d'item dans le panier

};

function showNbItemOnCart() {
    let showNbItem = document.querySelector(".numberItem");
    let nbItemOnOrder = JSON.parse(localStorage.getItem("order"));
    showNbItem.textContent = `${nbItemOnOrder.length} item(s)`;
    console.log(nbItemOnOrder.length);
}

showNbItemOnCart();



