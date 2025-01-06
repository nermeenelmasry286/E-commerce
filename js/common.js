document.addEventListener('DOMContentLoaded', function () {
    //start User name in top of navbar
    const userName = localStorage.getItem('userName');
    const userNameElement = document.getElementById('user-name');
    if (userName && userNameElement) {
        userNameElement.textContent = userName;
    }
    //end User name in top of navbar

    // start  Logout functionality
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('userName'); 
            window.location.href = 'login.html'; 
        });
    }
    //  end Logout functionality

    // Ensure event listener is attached only once
    const addProductButtons = document.querySelectorAll('.add-product');
    addProductButtons.forEach(button => {
        button.removeEventListener('click', addToCart); 
        button.addEventListener('click', addToCart); 
    });

    function addToCart(event) {
        const productData = JSON.parse(event.target.getAttribute('data-product'));
        
    }
});
