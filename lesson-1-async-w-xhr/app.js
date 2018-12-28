(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        // Fetch image request
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 42d1d0e4f974dac586482feb2ae477d9e652e9e240b4d7d7284813036b0fabc5'
            }
        }).then(response => response.json())
            .then(addImage)
            .catch(e => requestError(e, 'image'));

        function addImage(data) {
            let htmlContent = '';
            const firstImage = data.results[0];

            if (firstImage) {
                htmlContent = `<figure>
                    <img src="${firstImage.urls.small}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.';
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        /*  jQuery image request
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 42d1d0e4f974dac586482feb2ae477d9e652e9e240b4d7d7284813036b0fabc5'
            }
        }).done(addImage);*/

        /* XML image request
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = function (err) {
            requestError(err, 'image');
        };
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 42d1d0e4f974dac586482feb2ae477d9e652e9e240b4d7d7284813036b0fabc5');
        unsplashRequest.send();*/
        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1ffbde5ddd6d4579b308e1f91c814ba3`,
        }).done(addArticles);
        /* XML article request
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.onerror = function (err) {
            requestError(err, 'articles');
        };
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1ffbde5ddd6d4579b308e1f91c814ba3`);
        articleRequest.send();*/
    });
    /* Fetch image request upper scope
    function addImage(data) {
        let htmlContent = '';
        const firstImage = data.results[0];

        if (firstImage) {
            htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
        } else {
            htmlContent = 'Unfortunately, no image was returned for your search.'
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }*/
    /* jQ add images
    function addImage(images) {
        const firstImage = images.results[0];

        responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`
        );
    }*
    /* XML add images
    function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);

        if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = `<figure>
              <img src="${firstImage.urls.regular}" alt="${searchedForText}">
              <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
    </figure>`;
        } else {
            htmlContent = '<div class="error-no-image">No images available</div>';
        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    */

    function addArticles(data) {
        let htmlContent = '';

        if (data.response && data.response.docs && data.response.docs.length > 1) {
            const articles = data.response.docs;
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
              </li>`
            ).join('') + '</ul>';
        } else {
            htmlContent = '<div class="error-no-articles">No articles available</div>';
        }

        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }
    /*  XML add articles
    function addArticles() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);

        if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
              </li>`
            ).join('') + '</ul>';
        } else {
            htmlContent = '<div class="error-no-articles">No articles available</div>';
        }

        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }*/

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning error">Network Warning Error</p>`);
    }
})();
