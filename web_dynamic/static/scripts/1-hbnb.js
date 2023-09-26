$(document).ready(function () 
{
    var selectAmenities = {};

    $('input[type="checkbox"]').change(function ()
    {
        var amenityID = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            selectAmenities[amenityID] = amenityName;
        } else {
            delete selectAmenities[amenityID];
        }

        var amenities = Object.values(selectAmenities).join(', ');
        $('.amenities h4').text(amenities);
    });
});
