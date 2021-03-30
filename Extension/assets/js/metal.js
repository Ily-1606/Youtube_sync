function check_form() {
    var username = $("#username").val();
    var password = $("#password").val();
    if (username.length > 0) {
        $("#username").parent().find("label").addClass("metal-label-fixed")
        $("#username").addClass("metal-input-fixed");
    }
    else {
        $("#username").parent().find("label").removeClass("metal-label-fixed")
        $("#username").removeClass("metal-input-fixed");
    } if (password.length > 0) {
        $("#password").parent().find("label").addClass("metal-label-fixed")
        $("#password").addClass("metal-input-fixed");
    }
    else {
        $("#password").parent().find("label").removeClass("metal-label-fixed")
        $("#password").removeClass("metal-input-fixed");
    }
}
jQuery(function () {
    check_form();
    $("#username, #password").keyup(function(){
        check_form();
    });
    $("#stoped_form").submit(function(){
        $.ajax({
            url: $(this).attr("action"),
            method: $(this).attr("method"),
            data: $(this).serialize(),
            success: function(e){
                e = JSON.parse(e);
                if(e.status){
                    toastr.success(e.message, 'Thành công!')
                    setTimeout(function (){
                    if(window.location.pathname == "/HTML/regsister.html"){
                        window.location.href = "/HTML/login.html";
                    }
                    else if(window.location.pathname == "/HTML/login.html"){
                        window.location.href = "/HTML/logged.html";
                    }
                },2000);
                }else{
                    toastr.error(e.message, 'Có lỗi bất ngờ!')
                }
            },
            error: function(e){
                console.error(e);
                toastr.error("Không thể kết nối với máy chủ!","Có lỗi bất ngờ!")
            }
        });
        return false;
    });
});