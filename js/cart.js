// load cart items from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-summary');
    cartContainer.innerHTML = ''; 

    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.dataset.index = index;
        cartItem.innerHTML = `
            <a href="product.html" class="product-link" data-product='${JSON.stringify(product)}'>
                <img src="${product.image}" alt="${product.name}">
            </a>
            <div class="cart-details">
                <h4>${product.name}</h4>
                <p>Price: $${product.price}</p>
            </div>
            <div class="cart-actions">
                <input type="number" class="form-control mb-2" value="${product.quantity}" min="1" data-price="${product.price}">
                <button class="btn btn-danger btn-sm">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem); 
    });
    updateTotalPrice();
    updateCartCount();
}

// update total price
function updateTotalPrice() {

        let total = 0;
        document.querySelectorAll('.cart-item input').forEach(input => {
            const price = parseFloat(input.getAttribute('data-price'));
            const quantity = parseInt(input.value);
            total += price * quantity;
        });
        document.getElementById('cart-total').textContent = total.toFixed(2);
    
}

//update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, product) => sum + (product.quantity || 1), 0);
    document.getElementById('cart-count').textContent = totalQuantity;
}

//  update cart in localStorage
function updateCart(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Event listener for quantity change
document.addEventListener('input', (event) => {
    
        if (event.target.matches('.cart-item input')) {
            const cartItem = event.target.closest('.cart-item');
            const index = cartItem.dataset.index;
            const quantity = parseInt(event.target.value);
            updateCart(index, quantity);
            updateTotalPrice();
            updateCartCount();
        }
   
});

// Event listener for remove buttons
document.addEventListener('click', (event) => {
   
        if (event.target.matches('.cart-item .btn-danger')) {
            const cartItem = event.target.closest('.cart-item');
            const index = cartItem.dataset.index;
            cartItem.remove();
            removeFromCart(index);
            updateTotalPrice();
            updateCartCount();
        }
   
});

// remove item from localStorage
function removeFromCart(index) {

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        loadCart();

    
}

// Event listener for product image click
document.addEventListener('click', (event) => {
    if (event.target.closest('.product-link')) {
        const productLink = event.target.closest('.product-link');
        const product = JSON.parse(productLink.getAttribute('data-product'));
        localStorage.setItem('selectedProduct', JSON.stringify(product));
    }
});

// Load cart items on page load
document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    updateCartCount();
   
    document.getElementById('proceed-to-checkout').addEventListener('click', () => {
   
        localStorage.removeItem('cart');
        
        document.getElementById('cart-count').textContent = '0';
     
        window.location.href = 'shipped.html';
    });
});