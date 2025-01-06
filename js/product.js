document.addEventListener('DOMContentLoaded', function () {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (product) {
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productCategory').textContent = product.category || 'N/A';
        document.getElementById('productQuality').textContent = product.quality || 'N/A';
        document.getElementById('productPrice').textContent = product.price;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productImage').src = product.image || 'imgs/default-product.jpg';
        
        // Set data-product attribute on the add-product button
        document.querySelector('.add-product').setAttribute('data-product', JSON.stringify(product));
    } else {
        document.getElementById('productName').textContent = 'Product not found';
    }

    // Function to add product to cart
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity || 1) + 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        // window.location.href = 'cart.html';
    }

    // Event listener for add-product button
    document.querySelector('.add-product').addEventListener('click', function () {
        const product = JSON.parse(this.getAttribute('data-product'));
        addToCart(product);
        updateCartCount();
    });

    updateCartCount();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, product) => sum + (product.quantity || 1), 0);
    document.getElementById('cart-count').textContent = totalQuantity;
}