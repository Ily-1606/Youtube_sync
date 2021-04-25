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
                window.location.href = "/page/login.php";
            }
        },
        error: function (e) {
            console.error(e);
            toastr.error("Có lỗi khi kiểm tra trạng thái server!", "Có lỗi bất ngờ");
        }
    })
}
function delete_channel(id,url){
    $.ajax({
        url: "/api/remove_blocked_channel.php",
        method: "POST",
        data: "data_id=" + url,
        crossDomain: true,
        xhrFields: { withCredentials: true },
        success: function (e) {
            e = JSON.parse(e);
            if(e.status){
                $("#channel_"+id).remove();
                $.ajax({
                    url: "/api/ping_unblocked_channel.php?id="+url,
                    method: "GET"
                });
            }else
            alert(e.message)
        },
        error: function (e) {
            alert("Có lỗi khi kết nối với máy chủ!");
        }
    });
}
function load_data() {
    $.ajax({
        url: "/api/list_blocked_channels.php",
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
                        $("#list_load_id").append('<div class="row mt-3 align-items-center col-12" id="channel_'+value["id"]+'"><div class="col-7"><p style="display: block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">URL: <a href="' + value["url_chanel"] + '" target="_blank">'+value["url_chanel"]+'</a></p></div><div class="col-5"><p class="small">Ngày block: ' + value["create_time"] + '</p><p><a href="javascript:delete_channel(\''+value["id"]+'\',\''+value["url_chanel"]+'\')">Gỡ chặn</a></p></div></div>')
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
                    $("#list_load_id").html('<div class="col-12 text-center text-danger">Chưa có kênh nào bị chặn.</div>');
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