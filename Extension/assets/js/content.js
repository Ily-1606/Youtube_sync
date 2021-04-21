function check(el) {
    try {
        el.classList.add("youtube_sync");
        id_target = el.querySelector("#thumbnail");
        if (id_target == null)
            id_target = el.querySelector("ytd-compact-video-renderer>a")
        if (id_target != null) {
            url = new URL("https://youtube.com" + id_target.getAttribute("href"));
            id = url.searchParams;
            id = id.get("v");
            var unique_id = "id" + Math.random().toString(16).slice(2)
            if (id != null) {
                $(el).append('<img class="thumb_for_status" src="' + window.youtube_sync.icon_wait + '" id="' + unique_id + '" for_id="' + id + '">');
                window.youtube_sync.list_id.push({ id: id, unique_id: unique_id });
            }
        }
    } catch (e) {
        console.error(e);
    }
}
function send() {
    $.ajax({
        url: "https://youtubesync.ily1606.team/api/check_sync.php",
        crossDomain: true,
        xhrFields: { withCredentials: true },
        method: "POST",
        data: "list_id=" + JSON.stringify(window.youtube_sync.list_id),
        beforSend: function () {
            window.youtube_sync.list_id = [];
        },
        success: function (e) {
            e = JSON.parse(e);
            if (e.status) {
                for (var value of e.data) {
                    if (value.viewed) {
                        $("#" + value.data_id).attr("src", window.youtube_sync.icon_checked);
                    } else {
                        $("#" + value.data_id).attr("src", "");
                    }
                }
            }
            else {
                $(".thumb_for_status").attr("src", "");
            }
        },
        error: function (e) {
            window.youtube_sync.error = 1
            console.error(e);
        }
    })
}
window.youtube_sync = {};
window.youtube_sync.contextMenu = null;
jQuery(function () {
    window.youtube_sync.url = window.location.href;
    window.youtube_sync.dom_load = true;
    window.youtube_sync.list_id = [];
    window.youtube_sync.icon_wait = chrome.runtime.getURL("/assets/image/wait.svg");
    window.youtube_sync.icon_checked = chrome.runtime.getURL("/assets/image/checked.svg");
    var el = $("ytd-rich-item-renderer, ytd-compact-video-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytd-thumbnail");
    let contextMenu = null;
    document.addEventListener("contextmenu", function (event) {
        contextMenu = event.target;
    }, true);
    chrome.runtime.onMessage.addListener(function (info, sender, sendResponse) {
        if (info.status != undefined) {
            if (info.status) {
                toastr.success(info.message, "Thành công!");
            }
            else {
                toastr.error(info.message, "Thất bại!");
            }
        }
        else {
            if (info == "getElement") {
                contextMenu = $(contextMenu).parents("ytd-rich-item-renderer, ytd-compact-video-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytd-thumbnail")[0];
                if (contextMenu != undefined) {
                    id_target = contextMenu.querySelector("#thumbnail");
                    if (id_target == null)
                        id_target = el.querySelector("ytd-compact-video-renderer>a")
                    if (id_target != null) {
                        url = new URL("https://www.youtube.com" + id_target.getAttribute("href"));
                        sendResponse(url);
                    }
                    else {
                        sendResponse(null);
                    }
                } else {
                    sendResponse(null);
                }
            }
        }
    });
    el.each(function (i) {
        check(this);
        if (i == el.length - 1) {
            send();
        }
    });
    function clear_dom() {
        $("ytd-rich-item-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-thumbnail").removeClass("youtube_sync");
        $(".thumb_for_status").remove();
    }
    setInterval(function () {
        if (window.youtube_sync.url != window.location.href) {
            window.youtube_sync.dom_load = false;
            window.youtube_sync.url = window.location.href;
        }
        else if (window.youtube_sync.dom_load == false) {
            if ($(".thumb_for_status").length > 0) {
                clear_dom();
                window.youtube_sync.dom_load = true;
            }
        }
        var el = $("ytd-rich-item-renderer:not(.youtube_sync), ytd-grid-video-renderer:not(.youtube_sync), ytd-video-renderer:not(.youtube_sync), ytd-compact-video-renderer:not(.youtube_sync), ytd-thumbnail:not(.youtube_sync)");
        el.each(function (i) {
            check(this);
            if (i == el.length - 1) {
                send();
            }
        });
    }, 2000);
    chrome.storage.local.get(["block_subsribe"],function(data){
        if(data["block_subsribe"] == true){
            $("body").addClass("block-subcribe");
        }
    });
})