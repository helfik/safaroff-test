(function() {
    async function getServices() {
        const token = await localStorage.getItem('token');
        const name = await localStorage.getItem('name');
        const lastname = await localStorage.getItem('lastname');

        const servicesContainer = document.getElementById('servicesContainer');
        const nameContainer = document.getElementById('nameContainer');

        nameContainer.innerHTML = `<p>${name} ${lastname}</p>`;

        fetch('http://million-core-api.saffman.co.uk/api/v1.0/core/services/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            }
        })
            .then(response => response.json())
            .then(data => {
                const services = data.services;

                servicesContainer.innerHTML = '';

                services.forEach(service => {

                    const icon = service.icon || 'img/mobile.png';

                    servicesContainer.innerHTML += `
                        <div class="col no-padding">
                            <a href="${service.url}" class="service-a">
                                <div class="service-block">
                                    <div class="service-content">
                                        <img src="${icon}" alt="${service.display_name}" class="service-img">
                                        <p class="service-text">${service.display_name}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `;
                });
            })
            .catch(error => console.error(error))

    }

    getServices();
})();