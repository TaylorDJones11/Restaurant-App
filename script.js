import { menuArray } from "./data.js";


const cartEl = document.getElementById("cart");
const checkoutModalEl = document.getElementById("checkout-modal");
const name = document.getElementById("name");

let cart = [];
let totalPrice = 0; 
let isCompleted = false;


// Click each menu item
document.addEventListener('click', (e) => {
    let targetDataset = e.target.dataset;
    let target = e.target;

    if(targetDataset.add){
        addItem(targetDataset.add);
    } else if (targetDataset.remove){
        removeItem(targetDataset.remove);
    } else if (target.id === "complete-order-btn"){
        openModal();
    } else if (target.id === "close-modal-btn") {
        document.getElementById("checkout-modal").style.display = "none";
    } else if (target.id === "pay-btn"){
        e.preventDefault();
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

    cartEl.classList.add("show")

    renderCart();
}

// Remove Item to Cart





// updates the order with pricing 
function getOrdertHtml(){

    let orderHtml = ''
    
    menuArray.forEach(function(food){
        orderHtml += `
       
        <div class="hidden your-order" id="order">
        <h3 class="order-text">Your order</h3>
        <div class="order-list">
            <h3 class="order-item">${food.name}s</h3>
            <h6 class="remove-item" id="remove-item">remove</h6>
            <h5 class="order-price">${food.price}</h5>
        </div>
        <div class="total-price" id="total-price">
            <h3 class="price-text">Total price:</h3>
            <h5 class="total-price-text" id="total-price-text">$26</h5>
        </div>
        <button class="complete-btn" id="complete-btn">Complete Order</button>
        
    </div>
        
       
    `
    })

    return orderHtml
    
}

// shows the items available on the menu 
function getMenuHtml(){
    let menuHtml = ``

    menuArray.forEach(function(item){


        menuHtml += `
                <div class="menu-items">
                    <div class="menu-img">
                        <img class="menu-icons" src="${item.image}" alt="pizza icon">
                    </div>

                    <div class="menu-text">
                        <h3>${item.name}</h3>
                        <h6 class="ingredient-text">${item.ingredients}</h6>
                        <h5>$${item.price}</h5>
                    </div>
                    
                    <button class="menu-btn" id="menu-btn" data-add="${item.id}">
                        <i class="fa-regular fa-plus fa-xl"></i>
                    </button>
                </div>
                <div class="hidden" id="order-${item.id}">
                    
                </div>
    `
    })
    return menuHtml
}

function OrderProduct(id){
 orderArray.push(menuArray.filter(obj => obj.id == id)[0])
}



function render(){
    document.getElementById('menu-list').innerHTML = getMenuHtml()
}

function renderCart() {
    cartEl.innerHTML = renderOrderItem()
}

render()