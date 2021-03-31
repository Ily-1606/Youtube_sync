function check_login(callback) {
    $.ajax({
        url: "/api/status.php",
        success: function (e) {
            e = JSON.parse(e);
            if (e.status) {
                $(".modal_loading").fadeOut();
                callback();
            }
            else {
                window.location.href = "/page/login.page";
            }
        },
        error: function (e) {
            console.error(e);
            toastr.error("Có lỗi khi kiểm tra trạng thái server!", "Có lỗi bất ngờ");
        }
    })
}
function load_data() {
    $.ajax({
        url: "/api/list_viewed.php",
        data: "page="+window.youtube_sync.page,
        crossDomain: true,
        xhrFields: { withCredentials: true },
        method: "GET",
        success: function (e) {
            e = JSON.parse(e);
            if (e.status) {
                if (window.youtube_sync.page == 0) {
                    $("#list_load_id").html('');
                }
                if (e.data.length) {
                    for (var value of e.data) {
                        $("#list_load_id").append('<div class="row mt-3 align-items-center"><div class="col-4"><img src="' + value["image"] + '" class="thumbnail"></div><div class="col-5"><p class="small">Ngày xem: ' + value["create_time"] + '</p></div><div class="col-3"><p><a href="https://www.youtube.com/watch?v=' + value["id"] + '" target="_blank">'+value["video_name"]+'</a></p><p><a href="'+value["chanel_id"]+'" target="_blank">'+value["author"]+'</a></p></div></div>')
                    }
                    if (e.next_page) {
                        $("#load_more_btn").show();
                    }
                    else {
                        $("#load_more_btn").hide();
                    }
                }
                else {
                    $("#load_more_btn").hide();
                    $("#list_load_id").html('<div class="col-12 text-center text-danger">Chưa có lịch sử xem.</div>');
                }
            }
            else {
                toastr.error(e.message, "Có lỗi bất ngờ!");
            }
        },
        error: function (e) {
            window.youtube_sync.error = 1
            console.error(e);
        }
    })
}
jQuery(function () {
    window.youtube_sync = {};
    window.youtube_sync.page = 0;
    check_login(load_data);
    $("#load_more_btn").click(function(){
        $(this).hide();
        window.youtube_sync.page++;
        load_data();
    });
});