'use strict';

const inputPhone = document.getElementById('inputPhone');
const inputPassword = document.getElementById('inputPassword');
const loginForm = document.getElementById('loginForm');

if (inputPhone != null && inputPassword != null) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const phone = inputPhone.value;
        const password = inputPassword.value;

        fetch('http://million-core-api.saffman.co.uk/api/v1.0/accounts/login/', {
            method: 'POST',
            body: JSON.stringify({
                phone_number: phone,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(async data => {
                const token = data.token;
                const name = data.user['first_name'];
                const lastname = data.user['last_name'];
                await localStorage.setItem('token', token);
                await localStorage.setItem('name', name);
                await localStorage.setItem('lastname', lastname);
                location.href = 'index.html';
            })
            .catch(error => console.error(error))
    });
}



