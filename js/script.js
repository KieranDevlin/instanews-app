// const selector = document.getElementById('selection').value;

$('#selection').on('change', function () {
    $('.story-container').empty();


    $.ajax({
        method: 'GET',
        url: 'http://api.nytimes.com/svc/topstories/v2/' + (this.value) + '.json?api-key=LfK9pjJw3UwDVJPe2KMmtjXGZvzaUFsD&limit=12',

        dataType: 'json'
    })
        .done(function (data) {
            // console.log(data.results);


            const filteredResults = data.results.filter(function (articleObject) {
                return articleObject.multimedia[4] !== 'undefined';
            }).slice(0, 12);

            console.log("filtered results", filteredResults);


            $.each(filteredResults, function (index, value) {


                // console.log(data.results[0].multimedia[4].url);

                $('.story-container').append(`<div style='background-image:url(${value.multimedia[4].url});'> <a href='${value.short_url}'> ${value.abstract} </a> </div>`);
                $('.story-container').children('div').addClass('nytimes-story');
                $('.story-container').children('div').children('a').addClass('text-box');
            });
            // data.results
            // .filter(
            //     this.multimedia[4].url === false
            //     function () {
            //     $(this.multimedia[4].url).filter(function () {
            //         this.multimedia[4].url !== 'undefined'
            //     })

            // }
            // )
            // .splice(0, 12), function (key, value) {



            // if (typeof value.multimedia[4] === 'undefined' || value.multimedia[4] === null) {
            //     return;
            // }
            // // else {
            // console.log(data.results[0].multimedia[4].url);

            // $('.story-container').append(`<div style='background-image:url(${value.multimedia[4].url});'> <a href='${value.short_url}'> ${value.abstract} </a> </div>`);
            // $('.story-container').children('div').addClass('nytimes-story');
            // $('.story-container').children('div').children('a').addClass('text-box');
            //THIS IS THE WRONG WAY TO DO IT --> $('.nytimes-story').css('background-image', 'url("' + value.multimedia[4].url + '")');
            // }


            // }
            // );


        });

})

