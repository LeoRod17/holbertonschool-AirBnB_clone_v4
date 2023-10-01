$(document).ready(function () {
    let selectAmenities = {};

    $('input[type="checkbox"]').change(function () {
        let amenityID = $(this).data('id');
        let amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            selectAmenities[amenityID] = amenityName;
        } else {
            delete selectAmenities[amenityID];
        }

        let amenities = Object.values(selectAmenities).join(', ');
        $('.amenities h4').text(amenities);
    });


    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/v1/status/',
        success: function(data){
            if(data.status === 'OK'){
                $('div#api_status').addClass('available');
            }
            else{
                $('div#api_status').removeClass();
            }
        }
    });

    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            const data_saved = data;
            console.log(data_saved);

            // Create section and article
            const section = $('.places');
            const article = $('<article>');
            section.append(article);

            data_saved.forEach(place => {
                // Create div .title_box
                const div_title_box = $('<div>');
                div_title_box.addClass('title_box');

                // Create h2 with place name
                const h2_place_name = $('<h2>');
                h2_place_name.text(place.name);

                // Append element
                article.append(div_title_box);
                div_title_box.append(h2_place_name);

                // Create div .price_by_night
                const div_price_by_night = $('<div>');
                div_price_by_night.addClass('price_by_night');
                div_price_by_night.text('$' + place.price_by_night);

                // Create div .information
                const div_information = $('<div>');
                div_information.addClass('information');
                article.append(div_information);

                // Create div .max_guest
                const div_max_guest = $('<div>');
                div_max_guest.addClass('max_guest');
                div_max_guest.text(place.max_guest);
                div_information.append(div_max_guest);

                // Creaate .number_rooms
                const div_number_rooms = $('<div>');
                div_number_rooms.addClass('number_rooms');
                div_number_rooms.text(place.number_rooms);
                div_information.append(div_number_rooms);

                // Creaate div .number_bathrooms
                const div_number_bathrooms = $('<div>');
                div_number_bathrooms.addClass('number_bathrooms');
                div_number_bathrooms.text(place.number_bathrooms);
                div_information.append(div_number_bathrooms);

                // Create .user
                const div_user = $('<div>');
                div_user.addClass('user');
                div_user.text('Owner:');
                article.append(div_user);

                // Create div .description
                const div_description = $('<div>');
                div_description.addClass('description');
                div_description.text('Description: ' + place.description);
                article.append(div_description);
            });
        },
        error: function (error) {
            console.error(error);
        }
    });
});
