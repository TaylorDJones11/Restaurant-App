import { menuArray } from "./data.js";


// Click each menu item
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        console.log(e.target.dataset.add)
       getOrdertHtml(e.target.dataset.add)
    }
})

function getOrdertHtml(){
    let orderHtml = ''

    document.getElementById('order').classList.toggle('hidden')

    menuArray.forEach(function(food){
        orderHtml += `
       
            <h3 class="order-text">Your order</h3>
            <div class="order-list">
                <h3 class="order-item">${food.name}</h3>
                <h6 class="remove-item" id="remove-item">remove</h6>
                <h5 class="order-price">${food.price}</h5>
            </div>
            <div class="total-price" id="total-price">
                <h3 class="price-text">Total price:</h3>
                <h5 class="total-price-text" id="total-price-text">$26</h5>
            </div>
            <button class="complete-btn" id="complete-btn">Complete Order</button>
        
       
    `
    })
    
}


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



function render(){
    document.getElementById('menu-list').innerHTML = getMenuHtml()
    
}

render()