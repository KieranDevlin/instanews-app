const articleSelector = document.getElementById('selection');
const storyContainer = document.getElementById('story-container');

articleSelector.addEventListener('change', function () {

    /* this is jquery method to empty inner contents of .story-container
     $('.story-container').empty(); */

    /* this is js method to empty inner contents, html in this case, 
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

            /*looping through all 12 items in filterResults, creating html elements
            and assiging classes to them */
            $.each(filteredResults, function (index, value) {

                $('.story-container').append(`<div style='background-image:url(${value.multimedia[4].url});'> <a href='${value.short_url}'> ${value.abstract} </a> </div>`);
                $('.story-container').children('div').addClass('nytimes-story');
                $('.story-container').children('div').children('a').addClass('text-box');
            });

            /*

            this is a bad way of checking if nyt API content has images

            if (typeof value.multimedia[4] === 'undefined' || value.multimedia[4] === null) {
                return;
            }
            // else {

            this method won't work because it only re-assigns the nyt API image to one css class,
            so on the last iteration all the divs will have the same background image
            $('.nytimes-story').css('background-image', 'url("' + value.multimedia[4].url + '")');
            }
            }
            );
            */

        });

})

