(async function () {
    const token = await getToken();
    getFavorites(token);
    getPayments(token);


    async function getToken() {
        return await localStorage.getItem('token');
    }

    async function getFavorites(token) {
        const name = await localStorage.getItem('name');
        const lastname = await localStorage.getItem('lastname');

        const favoritesContainer = document.getElementById('favoritesContainer');
        const nameContainer = document.getElementById('nameContainer');
        const userInfo = document.getElementById('userInfo');

        userInfo.innerHTML = `<p>${name} ${lastname}</p>`;
        nameContainer.innerHTML = `<p>${name} ${lastname}</p>`;

        fetch('http://million-core-api.saffman.co.uk/api/v1.0/user-side/templates/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {

                const favorites = data.templates;

                favoritesContainer.innerHTML = '';

                favorites.forEach(favorit => {

                    const icon = favorit.icon || 'img/mobile.png';

                    favoritesContainer.innerHTML += `
                        <div class="col no-padding">
                            <a href="#" class="service-a">
                                <div class="service-block fav">
                                    <div class="service-content">
                                        <img src="${icon}" alt="" class="service-img">
                                        <p class="service-text">${favorit.template_name}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `;
                });
            })
            .catch(error => console.error(error))
    }

    async function getPayments(token) {
        const paymentsContainer = document.getElementById('paymentsContainer');

        fetch('http://million-core-api.saffman.co.uk/api/v1.0/payments/transactions/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                const favorites = data.results;

                paymentsContainer.innerHTML = '';

                favorites.forEach(result => {
                    const date = new Date(result.created_at).toLocaleDateString("en-US")

                    paymentsContainer.innerHTML += `
                        <tr>
                            <td>${result.merchant['display_name']}</td>
                            <td>${result.billing_payment_id}</td>
                            <td>${date}</td>
                            <td>${result.amount} AZN</td>
                            <td>${result.transaction_id}</td>
                            <td>
                                <a href="#" class="btn btn-danger pay-btn">Ödə</a>
                            </td>
                        </tr>
                    `;
                });
            })
            .catch(error => console.error(error))
    }
})();