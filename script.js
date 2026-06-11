let cart = [];

// Menu pricing engine matrix
const pricingMatrix = {
    "Mini Cake":      { 1: 7.00,  2: 14.00, 3: 21.00, 4: 28.00, 5: 35.00, 6: 40.00, 12: 75.00 },
    "Cupcakes":       { 1: 3.00,  2: 6.00,  3: 9.00,  4: 12.00, 5: 15.00, 6: 16.00, 12: 30.00 },
    "Cookies":        { 1: 3.00,  2: 6.00,  3: 9.00,  4: 12.00, 5: 15.00, 6: 16.00, 12: 30.00 },
    "Cake Pops":      { 1: 2.50,  2: 5.00,  3: 7.50,  4: 10.00, 5: 12.50, 6: 14.00, 12: 25.00 },
    "Strawberries":   { 1: 1.50,  2: 3.00,  3: 4.50,  4: 6.00,  5: 7.50,  6: 8.50,  12: 16.00 },
    "Oreos":          { 1: 1.50,  2: 3.00,  3: 4.50,  4: 6.00,  5: 7.50,  6: 8.50,  12: 16.00 },
    "Pretzels":       { 1: 1.50,  2: 3.00,  3: 4.50,  4: 6.00,  5: 7.50,  6: 8.50,  12: 16.00 },
    "Rice Krispies":  { 1: 1.50,  2: 3.00,  3: 4.50,  4: 6.00,  5: 7.50,  6: 8.50,  12: 16.00 }
};

// Handles dynamic menu choices based on selection boxes
function handleMenuAdd(itemName) {
    let selectEl = document.getElementById(`qty-${itemName}`);
    let chosenVal = parseInt(selectEl.value);
    
    let calculatedTotal = pricingMatrix[itemName][chosenVal];
    let cartLabel = itemName;
    
    // Clean label displays in cart for batch options
    if (chosenVal === 6) {
        cartLabel = `${itemName} (Half Dozen)`;
    } else if (chosenVal === 12) {
        cartLabel = `${itemName} (Full Dozen)`;
    }

    cart.push({
        id: crypto.randomUUID(),
        name: cartLabel,
        price: calculatedTotal / chosenVal,
        qty: chosenVal,
        total: calculatedTotal
    });

    updateCart();
}

function addDealBox(){
    cart.push({
        id: crypto.randomUUID(),
        name: "Deal Box",
        price: 50,
        qty: 1,
        total: 50,
        desc: `6 Strawberries<br>
6 Oreos<br>
6 Pretzels<br>
6 Rice Krispies<br>
2 Cupcakes<br>
2 Cookies<br>
2 Cake Pops<br>
2 Mini Cakes`
    });

    updateCart();
}

function addPartyBox(){
    cart.push({
        id: crypto.randomUUID(),
        name: "Party Box",
        price: 125,
        qty: 1,
        total: 125,
        desc: `12 Strawberries<br>
12 Oreos<br>
12 Pretzels<br>
12 Rice Krispies<br>
12 Cupcakes<br>
12 Cookies<br>
12 Cake Pops<br>
12 Mini Cakes`
    });

    updateCart();
}

function updateCart(){
    let container = document.getElementById("cartItems");
    container.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.total;

        container.innerHTML += `
        <div class="cart-item">
            <b>${item.name}</b><br>
            Quantity: ${item.qty}<br>
            Total: $${item.total.toFixed(2)}<br>
            ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ""}
            <button onclick="removeItem('${item.id}')">Remove</button>
        </div>
        `;
    });

    document.getElementById("orderTotal").innerText = "$" + total.toFixed(2);
    document.getElementById("depositTotal").innerText = "$" + (total / 2).toFixed(2);
    document.getElementById("remainingTotal").innerText = "$" + (total / 2).toFixed(2);
}

function removeItem(id){
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

document.getElementById("orderType").addEventListener("change", function(){
    document.getElementById("deliveryFields").style.display =
        this.value === "delivery" ? "flex" : "none";
});

document.getElementById("cashappButton").addEventListener("click", function(){
    if(cart.length === 0){
        alert("Cart is empty");
        return;
    }

    alert("Send deposit to $TommiGriffen");
    window.open("https://cash.app/$TommiGriffen", "_blank");
});