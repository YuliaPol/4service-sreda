// document.querySelector('.link-btn').addEventListener('click', function () {
// });
$('.link-btn').click(function(e){
    $('.link-container').fadeIn();
});
function copyElementText(id) {
    var text = document.getElementById(id).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);

    document.querySelector('.informMessage').style.display = 'flex';
}
 function outFunc(){
     $('.informMessage').fadeOut();
}

$('.content-container').on('click' ,'.copy-link-field', function(){
    var text = $(this).parents('.link-wrapper').find('.link-body').text();
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    $(this).parents('.link-wrapper').find('.informMessageLink').css('display', 'flex');
});
$('.content-container').on('mouseout' ,'.copy-link-field', function(){
    $(this).parents('.link-wrapper').find('.informMessageLink').fadeOut();
});