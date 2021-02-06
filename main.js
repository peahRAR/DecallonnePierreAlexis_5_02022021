// Récupération des articles via l'API

findAllItems = () => {
    return fetch("http://localhost:3000/api/cameras")
        .then(response => {
            const jsonResponse = response.json()
            console.log(jsonResponse) // Verification a supprimer en phase de production
            return jsonResponse
        }).catch(error => console.log("Erreur : " + error)); // Verification a supprimer en phase de production;
}

async function items() {
    const items = await findAllItems();
    return(items)
}

console.log(items()); // Verification que le tableau d'objet issu de l'API est bien return

// 
