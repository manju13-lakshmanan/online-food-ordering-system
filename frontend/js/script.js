const API = "http://localhost:5001";

// Load menu from backend
fetch(API + "/menu")
.then(response => response.json())
.then(data => {

    let menu = document.getElementById("menu");

    data.forEach(food => {

        menu.innerHTML += `
        <div class="card">

            <h2>${food.name}</h2>

            <p>${food.category}</p>

            <h3>₹${food.price}</h3>

            <button onclick="addToCart('${food.name}','${food.category}',${food.price})">
                Add To Cart
            </button>

        </div>
        `;

    });

});

// Add item to cart
function addToCart(name, category, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name,
        category,
        price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}
