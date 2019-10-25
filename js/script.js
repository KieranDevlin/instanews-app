// const selector = document.getElementById('selection').value;

$('#selection').on('change', function () {
    $('.story-container').empty();


    $.ajax({
        method: 'GET',
        url: 'http://api.nytimes.com/svc/topstories/v2/' + (this.value) + '.json?api-key=LfK9pjJw3UwDVJPe2KMmtjXGZvzaUFsD&limit=12',

        dataType: 'json'
    })
        .done(function (data) {
            console.log(data.results);
            $.each(data.results.splice(0, 12), function (key, value) {


                if (typeof value.multimedia[4] === 'undefined' || value.multimedia[4] === null) {
                    return;
                }
                else {
                    $('.story-container').append(`<div style='background-image:url(${value.multimedia[4].url});'> <a href='${value.short_url}'> ${value.abstract} </a> </div>`);
                    $('.story-container').children('div').addClass('nytimes-story');
                    $('.story-container').children('div').children('a').addClass('text-box');
                    //THIS IS THE WRONG WAY TO DO IT --> $('.nytimes-story').css('background-image', 'url("' + value.multimedia[4].url + '")');
                }

            });


        });

})

