document.addEventListener('DOMContentLoaded', function () {


    // js variables

    const articleSelector = document.getElementById('selection');
    const storyContainer = document.getElementById('story-container');
    const nytLogo = document.getElementById('logo');
    const siteHeader = document.getElementById('header');
    const loadingGif = document.getElementById('loading-gif');


    /* this listener triggers when user selects a new category of nyt content
    and displays that content inside a series of 12 list items */
    articleSelector.addEventListener('change', function () {

        // these classes add a 1s tranistion to shrink the header and logo
        nytLogo.classList.add('animateLogo');
        siteHeader.classList.add('animateHeader');


        loadingGif.classList.remove('appear-on-load');

        /* this is jquery method to empty inner contents of .story-container
         $('.story-container').empty();
    
        this is js method to empty inner contents, html in this case, 
        so new content from API can fill the same area */
        storyContainer.innerHTML = '';


        // using jquery's ajax method to GET data from New York Times API
        $.ajax({
            method: 'GET',
            url: 'http://api.nytimes.com/svc/topstories/v2/' + (this.value) + '.json?api-key=LfK9pjJw3UwDVJPe2KMmtjXGZvzaUFsD',

            dataType: 'json'
        })
            .done(function (data) {

                /*This filters through all the NYT articles to check if the article has an image
                and adds an article to an array with a 12 item limit */
                const filteredResults = data.results.filter(function (articleObject) {
                    return typeof articleObject.multimedia[4] !== 'undefined';
                }).slice(0, 12);
                console.log(filteredResults)

                /*looping through all 12 items in filterResults, creating html elements
                and assiging classes to them */
                $.each(filteredResults, function (index, value) {

                    $('.story-container').append(
                        `<a class='nytimes-story' href='${value.short_url}' style='background-image:url(${value.multimedia[4].url});'> 
                        <div class='text-box' >     
                            <h2 class="nytTitle">${value.title}</h2>
                            <p class="nytDate">${value.byline}<br>${value.published_date}</p>
                            <p class="nytAbstract">${value.abstract}</p>
                        </div>
                    </a>`);

                    /*this is a long way to climb the DOM to add classes to the various elements
                    it is more DRY to simply add into the classes in the .append method
                    $('.story-container').children('a').addClass('nytimes-story');
                    $('.story-container').children('a').children('div').addClass('text-box');
                    $('.story-container').children('a').children('div').children('p').addClass('nytTitle');*/
                });

                /*this is a bad way of checking if nyt API content has images
    
                if (typeof value.multimedia[4] === 'undefined' || value.multimedia[4] === null) {
                    return;
                } else {
    
                this method won't work because it only re-assigns the nyt API image to one css class,
                so on the last iteration all the divs will have the same background image
                $('.nytimes-story').css('background-image', 'url("' + value.multimedia[4].url + '")');
                }); */

            })

            .fail(function () {
                $('.story-container').append(
                    `<p>There seems to be an issue 
                    accessing the New York Times API 
                    at this time, we aplogize for the 
                    issue.</p>`)

            })

            .always(function () {
                loadingGif.classList.add('appear-on-load');

            });
    })

});