import { menuArray } from "./data.js";

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
                    
                    <button class="menu-btn" id="menu-btn">
                        <i class="fa-regular fa-plus fa-xl"></i>
                    </button>
                </div>
    `
    })
    return menuHtml
}

function render(){
    document.getElementById('menu-list').innerHTML = getMenuHtml()
    
}

render()