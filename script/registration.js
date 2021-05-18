$(document).ready(function () {
    PopUpHide();
    $(".form-registretion").submit(function (event) {
        PopUpShow();
    });
    $(".close-popup").click(function() {
        PopUpHide();
    });
});
function PopUpShow() {
    $(".succes-box").show();
}
function PopUpHide() {
    $(".succes-box").hide();
}
jQuery(function ($) {
    $(document).ready(function () {
        $('.select-depart').customSelect({
            placeholder: '<span>Выберите подразделение</span>',
        });
    });
});
