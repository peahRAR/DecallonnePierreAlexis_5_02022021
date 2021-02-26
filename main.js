// Récupération des articles via l'API

findAllItems = () => {
    return fetch("http://localhost:3000/api/cameras")
        .then(response => {
            const jsonResponse = response.json()
            console.log(jsonResponse) // Verification a supprimer en phase de production
            return jsonResponse
        }).catch(error => alert("Erreur : " + error)); // Verification a supprimer en phase de production;
}

// PAGE INDEX
async function items() {
    const items = await findAllItems();

    // Lien avec l'index.html
    let listItems = document.querySelector(".listItems");

    // Boucle sur les objets récupéré via l'API
    items.forEach((item) => {
        // Création de balise html
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
        }).catch(error => alert("Erreur : " + error)); // Verification a supprimer en phase de production;
}

async function infoItem() {
    const item = await findGoodItem();

    // Création des balises html
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
    addToCartBox.addEventListener('click', () => addItemOnCart(item)); // Ici le onClick qui permet d'ajouter le produit au panier
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

// Gestion de l'affichage du panier sur toutes les pages
function createLocalStock() {
    let cart = localStorage.getItem("order") ? JSON.parse(localStorage.getItem('order')) : [];
    localStorage.setItem('order', JSON.stringify(cart));
}

//Gestion affichage nombre d'item dans le panier
function showNbItemOnCart() {
    let showNbItem = document.querySelector(".numberItem");
    let nbItemOnOrder = JSON.parse(localStorage.getItem("order"));
    showNbItem.textContent = `${nbItemOnOrder.length} item(s)`;
}

//Gestion affichage montant total du panier
function showTotalPriceOnCart() {
    let showTotalPrice = document.querySelector(".totalPrice");
    let totalPrice = JSON.parse(localStorage.getItem("order"));
    let price = 0;
    totalPrice.forEach(item => {
        price += (item.price) / 100;
    });
    showTotalPrice.textContent = `${price} €`
    return price;
}

let totalPriceOrder = showTotalPriceOnCart(); // Récupération du prix total dans une variable globale

// Ajout d'un produit au panier
addItemOnCart = (item) => {
    let oldCart = JSON.parse(localStorage.getItem('order'));
    oldCart.push(item);
    localStorage.setItem('order', JSON.stringify(oldCart));
    $('#myModal').modal('show')
    setTimeout(function () { $('#myModal').modal('hide'); }, 1000);
    showNbItemOnCart();
    showTotalPriceOnCart();
};

// Suppression d'un produit
deleteOne = (index) => {
    console.log("entre dans la function");
    let oldCart = JSON.parse(localStorage.getItem('order'));
    oldCart.splice(index, 1);
    localStorage.setItem('order', JSON.stringify(oldCart));
    showNbItemOnCart();
    showTotalPriceOnCart();
    location.reload();
}

// Supprimer tout le panier
deleteAllOrder = () => {
    localStorage.removeItem('order')
    createLocalStock();
    showNbItemOnCart();
    showTotalPriceOnCart();
    location.reload();

}

// Affichage panier complet
function showCompleteCart() {
    let orderList = document.querySelector(".cartList");
    let allItemOnOrder = JSON.parse(localStorage.getItem("order"));

    // Gestion Si le panier est vide;

    if (allItemOnOrder.length <= 0) {
        let itemRow = document.createElement("div");
        let noItem = document.createElement("p");

        itemRow.setAttribute("class", "productLine row d-flex justify-content-between align-items-center pt-2 pb-2 border");
        noItem.setAttribute("class", "m-auto")

        orderList.appendChild(itemRow);
        itemRow.appendChild(noItem);

        noItem.textContent = "You have no item on your cart"

    } else {
        allItemOnOrder.forEach(item => {
            let itemRow = document.createElement("div");
            let nameItem = document.createElement("p");
            let priceItem = document.createElement("p");
            let deleteItem = document.createElement("div");
            let iconDelete = document.createElement("i");
            let txtDelete = document.createElement("p");
            let index = allItemOnOrder.indexOf(item);


            itemRow.setAttribute("class", "productLine row d-flex justify-content-between align-items-center pt-2 pb-2 border");
            nameItem.setAttribute("class", "nameProduct m-0 col-2 mr-2 pl-2");
            priceItem.setAttribute("class", "priceProduct m-0");
            deleteItem.setAttribute("class", "btn btn-outline-dark deleteItem d-flex align-items-center mr-2");
            deleteItem.addEventListener('click', () => deleteOne(index)); // Ici le onClick qui permet de supprimmer un produit du panier
            iconDelete.setAttribute("class", "fas fa-times mr-2");
            txtDelete.setAttribute("class", "m-0 text-uppercase");

            orderList.appendChild(itemRow);
            itemRow.appendChild(nameItem);
            itemRow.appendChild(priceItem);
            itemRow.appendChild(deleteItem);
            deleteItem.appendChild(iconDelete);
            deleteItem.appendChild(txtDelete);

            nameItem.textContent = item.name;
            priceItem.textContent = `${(item.price) / 100} €`;
            txtDelete.textContent = "Delete";
        });
    }

    let orderFooter = document.createElement("div");
    let txtTotal = document.createElement("p");
    let totalPrice = document.createElement("p");
    let boxPassOrder = document.createElement("div");
    let deleteAll = document.createElement("button");
    let iconDeleteAll = document.createElement("i");
    let txtDeleteAll = document.createElement("p");
    let passOrder = document.createElement("a");
    let iconPassOrder = document.createElement("i");
    let txtPassOrder = document.createElement("p");

    orderFooter.setAttribute("class", "d-flex row text-light bg-dark rounded-bottom p-2 justify-content-end");
    txtTotal.setAttribute("class", "m-0 text-uppercase font-weight-bold col-3 p-0 pr-1 text-center");
    totalPrice.setAttribute("class", "m-0 text-light font-weight-bold pr-2");
    boxPassOrder.setAttribute("class", "boxOrder border mt-4 rounded d-flex p-4 justify-content-around flex-column flex-md-row ");
    deleteAll.setAttribute("class", "btn btn-danger d-flex align-items-center mb-2");
    deleteAll.addEventListener('click', () => deleteAllOrder()); // Ici le onClick qui permet de supprimmer tout le panier
    iconDeleteAll.setAttribute("class", " mr-2 fas fa-trash-alt");
    txtDeleteAll.setAttribute("class", "m-auto ml-2 text-uppercase");
    passOrder.setAttribute("class", "btn btn-success d-flex align-items-center mb-2");
    iconPassOrder.setAttribute("class", "far fa-credit-card mr-2");
    txtPassOrder.setAttribute("class", "m-auto text-uppercase")

    orderList.appendChild(orderFooter);
    orderFooter.appendChild(txtTotal);
    orderFooter.appendChild(totalPrice);

    orderList.appendChild(boxPassOrder);
    boxPassOrder.appendChild(deleteAll);
    deleteAll.appendChild(iconDeleteAll);
    deleteAll.appendChild(txtDeleteAll);

    boxPassOrder.appendChild(passOrder);
    passOrder.appendChild(iconPassOrder);
    passOrder.appendChild(txtPassOrder);

    txtTotal.textContent = "Total :";
    totalPrice.textContent = `${totalPriceOrder} €`;
    txtDeleteAll.textContent = "Delete order";
    txtPassOrder.textContent = "Paid";

    // Création du bouton permettant d'accéder au paiement si il y a des articles dans le panier
    if (allItemOnOrder.length > 0) {
        passOrder.setAttribute("href", "/html/validation.html");
    }else{
        passOrder.setAttribute("class","btn btn-success d-flex align-items-center mb-2 disabled");
    };
}

// Gestion de la validation
function validationOrder() {
    // Récupération bouton Submit

    let form = document.querySelector("#form").addEventListener('submit', (event) => {
        event.preventDefault();
        // Récupération des inputs saisie dans le form
        let firstName = document.querySelector("#firstname").value;
        let lastName = document.querySelector("#name").value;
        let address = document.querySelector("#address").value;
        let city = document.querySelector("#city").value;
        let email = document.querySelector("#email").value;

        // Création de l'objet client
        contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        };

        // Récupération des articles dans le panier
        
        let listProducts = {};
        try {
            listProducts = JSON.parse(localStorage.getItem("order"));
          } catch (error) {
            alert(error)};
        let products = [];
        listProducts.forEach(item => {
            products.push(item._id);
        });

        return fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({contact , products}),
        })
            .then(response => response.json())
            .then(result => {
                // Création de la modal facture
                let modal = document.querySelector(".modal-content");
                let modalBody = document.createElement("div");

                // Remerciement client
                let boxLogo = document.createElement("div");
                let logoOrinoco = document.createElement("img")
                let boxThanks = document.createElement("section");
                let iconThanks = document.createElement("i");
                let txtThanks = document.createElement("p");

                // Facture
                let table = document.createElement("table");
                let title = document.createElement("h2");
                let customerInfo = document.createElement("div");
                let customerName = document.createElement("p");
                let customerAddress = document.createElement("p");
                let customerCity = document.createElement("p");
                let customerEmail = document.createElement("p");
                let thead = document.createElement("thead");
                let tr = document.createElement("tr");
                let thIndex = document.createElement("th");
                let thItem = document.createElement("th");
                let thPrice = document.createElement("th");
                let tbody = document.createElement("tbody");

                boxLogo.setAttribute("class", "row d-flex justify-content-center");
                logoOrinoco.setAttribute("src", "../images/logo_orinoco.svg");
                logoOrinoco.setAttribute("alt", "logo Orinoco");
                logoOrinoco.setAttribute("height", "50");
                logoOrinoco.setAttribute("class", "mx-auto");
                modalBody.setAttribute("class" , "modal-body");
                customerInfo.setAttribute("class", "border rounded p-2 mt-2 mb-4 col-6");
                customerName.setAttribute("class", "m-0");
                customerAddress.setAttribute("class", "m-0");
                customerCity.setAttribute("class", "m-0");
                customerEmail.setAttribute("class", "m-0");
                table.setAttribute("class", "table table-striped table-hover");
                boxThanks.setAttribute("class", "mb-4 row d-flex justify-content-center align-items-center");
                iconThanks.setAttribute("class", "far fa-check-circle mr-1 text-success fs-1");
                txtThanks.setAttribute("class", "m-0")

                modal.appendChild(modalBody);
                modalBody.appendChild(boxLogo);
                boxLogo.appendChild(logoOrinoco);
                modalBody.appendChild(boxThanks);
                boxThanks.appendChild(iconThanks);
                boxThanks.appendChild(txtThanks);
                modalBody.appendChild(title);
                modalBody.appendChild(customerInfo);
                customerInfo.appendChild(customerName);
                customerInfo.appendChild(customerAddress);
                customerInfo.appendChild(customerCity);
                customerInfo.appendChild(customerEmail);
                modalBody.appendChild(table);
                table.appendChild(thead);
                thead.appendChild(tr);
                tr.appendChild(thIndex);
                tr.appendChild(thItem);
                tr.appendChild(thPrice);
                table.appendChild(tbody);
  
                txtThanks.textContent = `Payment accepted, thank you for your order`;
                title.textContent = `Invoice : ${result.orderId}`;
                customerName.textContent = `${result.contact.firstName} ${result.contact.lastName}`;
                customerAddress.textContent = `${result.contact.address}`;
                customerCity.textContent = `${result.contact.city}`;
                customerEmail.textContent = `${result.contact.email}`;
                thIndex.textContent = "#";
                thItem.textContent = "Item";
                thPrice.textContent = "Price";

                // Boucle ForEach pour afficher chaque ligne du tableau
                let index = 0;
                let totalPrice = 0;
                result.products.forEach(item => {
                    let trbody = document.createElement("tr");
                    let indexValue = document.createElement("th");
                    let itemValue = document.createElement("td");
                    let priceValue = document.createElement("td");
                    totalPrice += (item.price)/100;

                    tbody.appendChild(trbody);
                    trbody.appendChild(indexValue);
                    trbody.appendChild(itemValue);
                    trbody.appendChild(priceValue);

                    index += 1;
                    indexValue.textContent = index;
                    itemValue.textContent = `${item.name}`;
                    priceValue.textContent = `${(item.price)/100} €`;
                });
                
                // Affichage de la derniere ligne du tableau avec le Total
                let trfooter = document.createElement("tr")
                let emptyBox = document.createElement("th");
                let totalValue = document.createElement("td");

                emptyBox.setAttribute("colspan", "2");
                totalValue.setAttribute("class", "border rounded-bottom font-weight-bold");

                tbody.appendChild(trfooter);
                trfooter.appendChild(emptyBox);
                trfooter.appendChild(totalValue);

                totalValue.textContent = `${totalPrice} € TTC`;

                // Ajout des boutons de fermeture modal et impréssion

                let rowButton = document.createElement("div");
                let printButton = document.createElement("button");
                let printIcon = document.createElement("i");
                let printTxt = document.createElement("p");
                let closeButton = document.createElement("button");
                let closeIcon = document.createElement("i");
                let closeTxt = document.createElement("p");

                rowButton.setAttribute("class", "d-flex row justify-content-center d-print-none");

                printButton.setAttribute("class", "d-flex btn btn-danger align-items-center mr-2");
                printIcon.setAttribute("class","fas fa-print mr-2");
                printTxt.setAttribute("class","m-0");

                closeButton.setAttribute("class", "d-flex btn btn-success align-items-center ");
                closeIcon.setAttribute("class","fas fa-times mr-2");
                closeTxt.setAttribute("class","m-0");
                
                modalBody.appendChild(rowButton);
                rowButton.appendChild(printButton);
                printButton.appendChild(printIcon);
                printButton.appendChild(printTxt);
                
                rowButton.appendChild(closeButton);
                closeButton.appendChild(closeIcon);
                closeButton.appendChild(closeTxt);

                printTxt.textContent = "Print Order";
                closeTxt.textContent = "Close";

                // Gestion bouton d'impression

                printButton.addEventListener('click', () => printModal());

                function printModal() {
                    window.print();
                }

                // Gestion du bouton de fermeture de la modal

                closeButton.addEventListener('click', ()=> closeModal());

                function closeModal() {
                    deleteAllOrder();
                    $('#modal-invoice').modal('hide');
                    document.location.href="/";
                }


                // Gestion affichage et fermeture de la modal
                $('#modal-invoice').modal({backdrop: 'static',keyboard: false},'show');

            })
            .catch(error => {
                // Création de la modal échec
                let modal = document.querySelector(".modal-content");
                let modalBody = document.createElement("div");
                let txt = document.createElement("p");

                modalBody.setAttribute("class" , "modal-body");
                txt.setAttribute("class", "m-0")

                modal.appendChild(modalBody);
                modalBody.appendChild(txt);

                txt.textContent = "An error occurred during payment, please try again.";

                // Gestion affichage et fermeture de la modal
                
                $('#modal-invoice').modal('show');
                setTimeout(function () { $('#modal-invoice').modal('hide'); }, 9000);
            });
    });
}



// Création du local Storage
createLocalStock();
// Appel des fonctions afin d'avoir le nombre d'item et le montant afficher sur toutes les pages
showNbItemOnCart();
showTotalPriceOnCart();


