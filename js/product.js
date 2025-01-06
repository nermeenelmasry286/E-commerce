document.addEventListener('DOMContentLoaded', function () {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (product) {
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productCategory').textContent = product.category || 'N/A';
        document.getElementById('productQuality').textContent = product.quality || 'N/A';
        document.getElementById('productPrice').textContent = product.price;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productImage').src = product.image || 'imgs/default-product.jpg';
    } else {
        document.getElementById('productName').textContent = 'Product not found';
    }
});