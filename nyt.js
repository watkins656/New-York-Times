$(document).ready(function () {
    // Variables for years are defaulted to 1900-2020 
    var queryTerm = '';
    var beginDate = 19000101;
    var endDate = 20200101;
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; //sets the URL as a global variable

    $('#search-button').on('click', function (event) {
        event.preventDefault();
        queryTerm = $('#searchTerm').val();
        var numberOfRecords = $('#numberOfRecords').val();
        if ($('#startYear').val()) {
            beginDate = ($('#startYear').val()) + '0101';
        }
        if ($('#endYear').val()) {
            endDate = ($('#endYear').val()) + '1231';
        }
        url += '?' + $.param({
            'api-key': "c57e33c047174d42a7bc32bd84cdb6b4",
            'q': queryTerm,
            'begin_date': beginDate,
            'end_date': endDate,
            'fl': 'web_url, snippet, headline, _id, byline',
        });

        getArticles(numberOfRecords);

    })



    function getArticles(number) {
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {
            var docs = result.response.docs;
            for (i = 0; i < number; i++) {
                var $articleContainer = $('<div>');
                $articleContainer.addClass('article');
                $articleContainer.attr('id', docs[i]._id);
                $articleContainer.html('<span class="article-number">' + (i + 1) + '</span><span>' + docs[i].headline.main + '</span><br><span>' + docs[i].byline.original + '</span');
                $('#topArticles').append($articleContainer);

            };

        }).fail(function (err) {
            throw err;
        });
    }


});


