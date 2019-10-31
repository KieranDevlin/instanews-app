document.addEventListener('DOMContentLoaded', function () {


    // js variables

    const articleSelector = document.getElementById('selection');
    const storyContainer = document.getElementById('story-container');
    const nytLogo = document.getElementById('logo');
    const siteHeader = document.getElementById('header');
    const loadingGif = document.getElementById('loading-gif');
    const spacer = document.getElementById('spacer');



    $(function () {
        $('#selection').selectric();
    });

    // $('select').selectric();
    // ▾
    // $.ajax({
    //     method: 'GET',
    //     url: 'http://api.nytimes.com/svc/topstories/v2/select.json?api-key=LfK9pjJw3UwDVJPe2KMmtjXGZvzaUFsD',
    //     dataType: 'json'


    //     $('').append(data).selectric();
    // }
    // );

    /* this listener triggers when user selects a new category of nyt content
    and displays that content inside a series of 12 list items */
    articleSelector.addEventListener('change', function getContent() {


        // these classes add a 1s tranistion to shrink the header and logo
        nytLogo.classList.add('animateLogo');
        siteHeader.classList.add('animateHeader');

        /*adds classes that play gif until API kicks in and 
        increases the header height briefly*/
        loadingGif.classList.remove('hideElement');
        spacer.classList.add('spaceElement');



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
            .done(function createContent(data) {

                console.log(data);
                /*This filters through all the NYT articles to check if the article has an image
                and adds an article to an array with a 12 item limit */
                const filteredResults = data.results.filter(function sortContent(articleObject) {
                    return typeof articleObject.multimedia[4] !== 'undefined';
                }).slice(0, 12);

                /*looping through all 12 items in filterResults, creating html elements
                and assiging classes to them */
                $.each(filteredResults, function appendContent(index, value) {

                    $('.story-container').append(
                        `<a class='nytimes-story' href='${value.short_url}' style='background: url(${value.multimedia[4].url}),url(../../images/nyt-logo-inverse.png); background-size: cover; background-position: center center'> 
                        <div class='text-box' >     
                            <h2 class="nytTitle">${value.title}</h2>
                            <p class="nytDate">${value.byline}<br>${value.updated_date.slice(0, 10)}</p>
                            <p class="nytAbstract">${value.abstract}</p>
                        </div>
                    </a>`);

                    /*this is a long way to climb the DOM to add classes to the various elements
                    it is more DRY to simply add into the classes in the .append method
                    $('.story-container').children('a').addClass('nytimes-story');
                    $('.story-container').children('a').children('div').addClass('text-box');
                    $('.story-container').children('a').children('div').children('p').addClass('nytTitle');*/
                });


                $('.nytimes-story').hide().first().show(200, function showNext() {
                    $(this).next('.nytimes-story').show(200, showNext);

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

            .fail(function errorMessage() {
                $('.story-container').append(
                    `<p>There seems to be an issue 
                    accessing the New York Times API 
                    at this time, we aplogize for the 
                    issue.</p>`)

            })

            .always(function hideClass() {

                //hides loading gif with class and removes space with class
                loadingGif.classList.add('hideElement');
                spacer.classList.remove('spaceElement');


            });
    })

});