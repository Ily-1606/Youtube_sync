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
function check_login() {
    $.ajax({
        url: "/api/status.php",
        crossDomain: true,
        xhrFields: { withCredentials: true },
        success: function (e) {
            e = JSON.parse(e);
            if (e.status) {
                window.location.href = "/page/profile.php";
            }
            else {
                $(".modal_loading").fadeOut();
            }
        },
        error: function (e) {
            console.error(e);
            toastr.error("Có lỗi khi kiểm tra trạng thái server!", "Có lỗi bất ngờ");
        }
    })
}
jQuery(function () {
    check_login();
    check_form();
    $("#username, #password").keyup(function () {
        check_form();
    });
    $("#stoped_form").submit(function () {
        $.ajax({
            url: $(this).attr("action"),
            method: $(this).attr("method"),
            data: $(this).serialize(),
            crossDomain: true,
            xhrFields: { withCredentials: true },
            success: function (e) {
                e = JSON.parse(e);
                if (e.status) {
                    toastr.success(e.message, 'Thành công!')
                    setTimeout(function () {
                        if (window.location.pathname == "/page/regsister.php") {
                            window.location.href = "/page/login.php";
                        }
                        else if (window.location.pathname == "/page/login.php") {
                            window.location.href = "/page/logged.php";
                        }
                    }, 2000);
                } else {
                    toastr.error(e.message, 'Có lỗi bất ngờ!')
                }
            },
            error: function (e) {
                console.error(e);
                toastr.error("Không thể kết nối với máy chủ!", "Có lỗi bất ngờ!")
            }
        });
        return false;
    });
});