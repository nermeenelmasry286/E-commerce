//start User name in top of navbar
const userName = localStorage.getItem('userName');
const userNameElement = document.getElementById('user-name');
if (userName) {
    userNameElement.textContent = userName;
}

//end User name in top of navbar

// start  Logout functionality
const logoutLink = document.getElementById('logoutLink');
logoutLink.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('userName'); 
    window.location.href = 'login.html'; 
});
//  end Logout functionality
//  start slider imgs
let imageContainer = document.querySelector("#imageContainer");

let arr = [
    'imgs/homepage-img1.jpeg',
    'imgs/homepage-img2.jpeg',
    'imgs/homepage-img3.jpeg',
    'imgs/homepage-img4.jpeg',
    'imgs/homepage-img5.jpeg',
    'imgs/homepage-img6.jpeg'
];

let currentIndex = 0;

function changeImage() {
    imageContainer.style.backgroundImage = 'url("' + arr[currentIndex] + '")';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % arr.length; 
    changeImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + arr.length) % arr.length; 
    changeImage();
}

document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("prevBtn").addEventListener("click", prevImage);
setInterval(()=>{
    nextImage()

},3000)

// end slider imgs



// Filter Products by category
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

// Function to filter products based on the selected filter
function filterProducts(filter) {
    // Toggle active class on buttons
    filterButtons.forEach(button => button.classList.remove('active'));
    // Add active class to the selected filter button
    const selectedButton = Array.from(filterButtons).find(button => button.getAttribute('data-filter') === filter);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Show filtered products
    productItems.forEach(item => {
        // Hide all items first
        item.style.display = 'none';

        // Show items based on the selected filter
        if (filter === '1') {
            item.style.display = 'block'; // Show all products
        } else if (item.classList.contains(filter)) {
            item.style.display = 'block'; // Show selected category products
        }
    });
}

// Add event listener to all filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterProducts(filter);
    });
});

// Apply the 'All' filter (default filter) when the page loads
document.addEventListener('DOMContentLoaded', () => {
    filterProducts('1'); // Show all products by default
});


// Handle View Details button click
document.addEventListener('DOMContentLoaded', function () {
    // Existing code...

    // Handle View Details button click
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = JSON.parse(this.getAttribute('data-product'));
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = 'product.html';
        });
    });


   // Function to add product to cart
   function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

// Event listener for add-product buttons
document.querySelectorAll('.add-product').forEach(button => {
    button.addEventListener('click', () => {
        const product = JSON.parse(button.getAttribute('data-product'));
        addToCart(product);
    });
});




    // Existing code...
});


