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

    function validateField(field) {
        let isValid = true;

        if (field === userName) {
            userNameError.textContent = '';
            if (!userName.value.trim() || !validateName(userName.value.trim())) {
                userNameError.textContent = 'Username must be at least 4 characters long and contain only letters.';
                isValid = false;
            }
        }

        if (field === email) {
            emailError.textContent = '';
            if (!email.value.trim() || !validateEmail(email.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }
        }

        if (field === password) {
            passwordError.textContent = '';
            if (!password.value.trim() || !validatePassword(password.value.trim())) {
                passwordError.textContent = 'Password must be at least 8 characters long, contain an uppercase letter, and include any of _-@#$%^&*.';
                isValid = false;
            }
        }

        if (field === confirmPassword) {
            confirmPasswordError.textContent = '';
            if (password.value.trim() !== confirmPassword.value.trim()) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                isValid = false;
            }
        }

        return isValid;
    }

    userName.addEventListener('input', function () { validateField(userName); });
    email.addEventListener('input', function () { validateField(email); });
    password.addEventListener('input', function () { validateField(password); });
    confirmPassword.addEventListener('input', function () { validateField(confirmPassword); });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isFormValid = true;

        if (!validateField(userName)) {
            isFormValid = false;
        }
        if (!validateField(email)) {
            isFormValid = false;
        }
        if (!validateField(password)) {
            isFormValid = false;
        }
        if (!validateField(confirmPassword)) {
            isFormValid = false;
        }

        if (isFormValid) {
            localStorage.setItem('userName', userName.value.trim());
            window.location.href = 'home.html';
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    function validateName(userName) {
        const regex = /^[a-zA-Z]{4,}$/;
        return regex.test(userName);
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