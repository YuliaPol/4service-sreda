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
        if ($.fn.datepicker && $.fn.mask ) {
            $('.date-input').datepicker({
                view: 'years',
                autoClose: true,
                maxDate: new Date()
            });
            $('.date-input').mask('99.99.9999');
        }
    });
});
