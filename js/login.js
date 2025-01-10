document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const userName = document.getElementById('userName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const userNameError = document.getElementById('userNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); 

        let isValid = true;

        userNameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        if (!userName.value.trim() || !validateName(userName.value.trim())) {
            userNameError.textContent = 'Username must be at least 5 characters long.';
            isValid = false;
        }
        
        
        if (!email.value.trim() || !validateEmail(email.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }
        
        
        if (!password.value.trim() || !validatePassword(password.value.trim())) {
            passwordError.textContent = 'Password must be at least 8 characters long, contain an uppercase letter, and include any of _-@#$%^&*.';
            isValid = false;
        }

        
        if (password.value.trim() !== confirmPassword.value.trim()) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            isValid = false;
        }

        
        if (isValid) {
            localStorage.setItem('userName', userName.value.trim());
            window.location.href = 'home.html';
        }
    });

   
    function validateName(userName) {
        return userName.length >= 5;
    }

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

 
    function validatePassword(password) {
        const regex = /^(?=.*[a-zA-Z])(?=.*[_\-@#$%^&*]).{8,}$/;
        return regex.test(password);
    }
});