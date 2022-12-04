import { menuArray } from "./data.js";


const cartEl = document.getElementById("cart");
const checkoutModalEl = document.getElementById("checkout-modal");
const name = document.getElementById("name");

let cart = [];
let totalPrice = 0; 



// Click each menu item
document.addEventListener('click', (e) => {
    let targetDataset = e.target.dataset;
    let target = e.target;

    if(targetDataset.add){
        addItem(targetDataset.add);
    } else if (targetDataset.remove){
        removeItem(targetDataset.remove);
    } else if (target.id === "complete-btn"){
        openModal();
    } else if (target.id === "close-modal-btn") {
        document.getElementById("checkout-modal").style.display = "none";
    } else if (target.id === "payment-btn"){
        e.preventDefault();
        console.log("running");
        handlePayForm();
    }
});

// Add Item to Cart
function addItem(id){
    const targetItemObj = menuArray.filter((item) => {
        return item.id == id;
    })[0];

    if(!cart.includes(targetItemObj)) {
      cart.push(targetItemObj);
    }

    cart.forEach((item) => {
        if(item.id === targetItemObj.id) {
            item.quantity++;
        }
    });

    totalPrice += targetItemObj.price;
    cartEl.classList.add("show");

    renderCart();
}

// Remove Item to Cart

function removeItem(id) {
    const targetItemObj = cart.filter((item) => {
        return item.id == id;
    })[0];

    cart.forEach((item, idx) => {
        if(item.id === targetItemObj.id){
            item.quantity--;
        }

        if(item.quantity === 0){
            cart.splice(idx, 1)
        }
    });

    if(cart.length === 0 ){
        cartEl.classList.remove("show");
    }

    totalPrice -= targetItemObj.price;

    renderCart()
}


// Rendering Easy Taco Menu

function getMenuHtml(){
    let menuHtml = ``

    menuArray.forEach(function(item){
        menuHtml += `
                <div class="menu-items">
                    <div class="menu-img">
                        <img class="menu-icons" src="${item.image}" alt="food icon">
                    </div>

                    <div class="menu-text">
                        <h3>${item.name}</h3>
                        <h6 class="ingredient-text">${item.ingredients}</h6>
                        <h5>$${item.price}</h5>
                    </div>
                    
                    <div class="add-btn">
                    <button class="item-add-btn" data-add="${item.id}">+</button>
                    </div>
                    
                </div>
                
    `
    })
    return menuHtml
}



// Rendering Cart 

function renderOrderItem() {
    let getCartHtml = ` `;

    cart.forEach((item) => {
        getCartHtml += `
        <div class="item-list" id="item-list">  
                <div class="item-info">
                  <h4 id="item-qty">${item.quantity}x -</h4>
                  <h3>${item.name}</h3>
                  <button id="remove-item-btn" data-remove="${item.id}">Remove</button>
                  
                </div>
            <div class="item-price">
                <h4>$${item.price * item.quantity}</h4>
            </div>
        </div>
        `
    });

    let cartSectionHtml = ``;
    cart.forEach(() => {
        cartSectionHtml =
        `
        <div id="items-ordered">
        <h3 class="order-text">Your order</h3>
        <div class="order-list">${getCartHtml}</div>
        
        <div class="total-price" id="total-price">
            <h3 class="price-text">Total price:</h3>
            <h4 class="total-price-text" id="total-price-text">$ ${totalPrice}</h4>
        </div>
        <div class="complete-btn-div">
        <button class="complete-btn" id="complete-btn">Complete Order</button>
        </div>
        
        `
        
    });

    return cartSectionHtml

}


function openModal() {
    checkoutModalEl.style.display = "block";
}



function handlePayForm (){
    const cardNum = document.getElementById("card-number").value;
    const cardCvv = document.getElementById("card-cvv").value;


    if(name.value != "" && cardNum != "" && cardCvv != ""){
        thanksMsg();
        console.log('running')
        checkoutModalEl.style.display = "none";
    }

    cart.forEach((item) => {
        item.quantity = 0;
    });

    cart = [];
    totalPrice = 0;
}

function thanksMsg() {
    let cartHtml = `
    <div class="thanks-msg">
    <h1>Thanks ${name.value}, for your order!</h1>
    </div>
    `
    document.getElementById("cart").innerHTML = cartHtml;
}



function render(){
    document.getElementById('menu-list').innerHTML = getMenuHtml();
}

function renderCart() {
    cartEl.innerHTML = renderOrderItem();
}

render()