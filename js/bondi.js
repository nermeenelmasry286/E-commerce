document.addEventListener('DOMContentLoaded', function () {
    // Start slider images
    const imageContainer = document.querySelector("#imageContainer");
    const images = [
        'imgs/homepage-img1.jpeg',
        'imgs/homepage-img2.jpeg',
        'imgs/homepage-img3.jpeg',
        'imgs/homepage-img4.jpeg',
        'imgs/homepage-img5.jpeg',
        'imgs/homepage-img6.jpeg'
    ];
    let currentIndex = 0;

    function changeImage() {
        imageContainer.style.backgroundImage = `url("${images[currentIndex]}")`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        changeImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        changeImage();
    }

    document.getElementById("nextBtn").addEventListener("click", nextImage);
    document.getElementById("prevBtn").addEventListener("click", prevImage);
    setInterval(nextImage, 5000);
    // End slider images

    // Filter products by category
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    function filterProducts(filter) {
        filterButtons.forEach(button => button.classList.remove('active'));
        const selectedButton = Array.from(filterButtons).find(button => button.getAttribute('data-filter') === filter);
        if (selectedButton) selectedButton.classList.add('active');

        productItems.forEach(item => {
            item.style.display = filter === '1' || item.classList.contains(filter) ? 'block' : 'none';
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => filterProducts(button.getAttribute('data-filter')));
    });

    filterProducts('1'); // Show all products by default

    // Handle view details button click
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function () {
            const product = JSON.parse(this.getAttribute('data-product'));
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = 'product.html';
        });
    });

    // Function to add product to cart
    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity || 1) + 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Event listener for add-product buttons
    document.querySelectorAll('.add-product').forEach(button => {
        button.addEventListener('click', () => {
            const product = JSON.parse(button.getAttribute('data-product'));
            addToCart(product);
            updateCartCount();
        });
    });

    updateCartCount();

    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('userName'); 
            window.location.href = 'index.html'; 
        });
    }
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, product) => sum + (product.quantity || 1), 0);
    document.getElementById('cart-count').textContent = totalQuantity;
}


