// Function to load cart items from localStorage
function loadCart() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.querySelector('.cart-summary');
        cart.forEach((product, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.dataset.index = index;
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-details">
                    <h4>${product.name}</h4>
                    <p>Price: $${product.price}</p>
                    
                </div>
                <div class="cart-actions">
                    <input type="number" class="form-control mb-2" value="1" min="1" data-price="${product.price}">
                    <button class="btn btn-danger btn-sm">Remove</button>
                </div>
            `;
            cartContainer.insertAdjacentElement('beforebegin', cartItem);
        });
        updateTotalPrice();
        updateCartCount();
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// Function to update total price
function updateTotalPrice() {
    try {
        let total = 0;
        document.querySelectorAll('.cart-item input').forEach(input => {
            const price = parseFloat(input.getAttribute('data-price'));
            const quantity = parseInt(input.value);
            total += price * quantity;
        });
        document.getElementById('cart-total').textContent = total.toFixed(2);
    } catch (error) {
        console.error('Error updating total price:', error);
    }
}

// Function to update cart count
function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.getElementById('cart-count').textContent = cart.length;
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Event listener for quantity change
document.addEventListener('input', (event) => {
    try {
        if (event.target.matches('.cart-item input')) {
            updateTotalPrice();
        }
    } catch (error) {
        console.error('Error handling quantity change:', error);
    }
});

// Event listener for remove buttons
document.addEventListener('click', (event) => {
    try {
        if (event.target.matches('.cart-item .btn-danger')) {
            const cartItem = event.target.closest('.cart-item');
            const index = cartItem.dataset.index;
            cartItem.remove();
            removeFromCart(index);
            updateTotalPrice();
            updateCartCount();
        }
    } catch (error) {
        console.error('Error removing cart item:', error);
    }
});

// Function to remove item from localStorage
function removeFromCart(index) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
}

// Event listener for "Proceed to Checkout" button
document.getElementById('proceed-to-checkout').addEventListener('click', () => {
    window.location.href = 'shipped.html';
});

// Load cart items on page load
document.addEventListener('DOMContentLoaded', loadCart);