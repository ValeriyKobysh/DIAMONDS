$('.section-product__photo-btn').click(function () {
    var mainPhoto = $('.section-product__photo-main');
    var thisSRC = $(this).children('.section-product__photo-img').attr('src');
    mainPhoto.attr('src', thisSRC);
});