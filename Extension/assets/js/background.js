chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: "/HTML/options.html" });
});
chrome.storage.local.get(["block_subsribe", "block_channel"], function (data) {
    if (data.block_subsribe == undefined) {
        chrome.storage.local.set({ 'block_subsribe': true });
    } if (data.block_channel == undefined) {
        chrome.storage.local.set({ 'block_channel': false });
    }
})
function add_sync(info, tab) {
    chrome.tabs.sendMessage(tab.id, "getElement", { frameId: info.frameId }, function (data) {
        var url;
        if (data != null)
            url = new URL(data);
        else
            url = new URL(info.pageUrl);
        var search_params = url.searchParams;
        if (url.host == "www.youtube.com" && search_params.get("v") != null) {
            $.ajax({
                url: "https://youtubesync.ily1606.team/api/sync.php",
                method: "POST",
                data: "data_id=" + search_params.get("v"),
                crossDomain: true,
                xhrFields: { withCredentials: true },
                success: function (e) {
                    e = JSON.parse(e);
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, e);
                    });
                },
                error: function (e) {
                    alert("Có lỗi khi kết nối với máy chủ!");
                }
            });
        }
    });
}
function remove_sync(info, tab) {
    chrome.tabs.sendMessage(tab.id, "getElement", { frameId: info.frameId }, function (data) {
        var url;
        if (data != null)
            url = new URL(data);
        else
            url = new URL(info.pageUrl);
        var search_params = url.searchParams;
        if (url.host == "www.youtube.com" && search_params.get("v") != null) {
            $.ajax({
                url: "https://youtubesync.ily1606.team/api/remove_sync.php",
                method: "POST",
                data: "data_id=" + search_params.get("v"),
                crossDomain: true,
                xhrFields: { withCredentials: true },
                success: function (e) {
                    e = JSON.parse(e);
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, e);
                    });
                },
                error: function (e) {
                    alert("Có lỗi khi kết nối với máy chủ!");
                }
            });
        }
    });
}
var data_blacklist = [];
function block_channel(info) {
    var url = new URL(info.pageUrl);
    var channel_id = url.pathname.split('/channel/')[1];
    if (url.host == "www.youtube.com" && channel_id) {
        $.ajax({
            url: "https://youtubesync.ily1606.team/api/channels.php",
            method: "POST",
            data: "data_id=" + channel_id,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            success: function (e) {
                e = JSON.parse(e);
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, e);
                });
                if (data_blacklist.indexOf(channel_id) == -1)
                    data_blacklist.push(channel_id);
            },
            error: function (e) {
                alert("Có lỗi khi kết nối với máy chủ!");
            }
        });
    }
}
//Init data when user first load
$.ajax({
    url: "https://youtubesync.ily1606.team/api/get_block_channels.php",
    method: "GET",
    crossDomain: true,
    xhrFields: { withCredentials: true },
    success: function (e) {
        e = JSON.parse(e);
        if (e.status)
            data_blacklist = e.data;
    },
    error: function (e) {
        alert("Có lỗi khi kết nối với máy chủ!");
    }
});
function callback_block(details) {
    var url = new URL(details.url);
    var block = false;
    if (url.host == "youtubesync.ily1606.team") {
        var channel_id = url.search.split("?id=")[1];
        var index = data_blacklist.indexOf(channel_id);
        if (index != -1) {
            data_blacklist.splice(index, 1);
        }
    }
    else {
        var channel_id = url.pathname.split('/channel/')[1];
        block = data_blacklist.indexOf(channel_id) != -1;
        if (block == false && details.requestBody) {
            if (details.requestBody.raw) {
                var postedString = JSON.parse(decodeURIComponent(String.fromCharCode.apply(null,
                    new Uint8Array(details.requestBody.raw[0].bytes))));
                block = data_blacklist.indexOf(postedString["browseId"]) != -1;
            }
        }
    }
    return { cancel: block };
}
function block_request() {
    chrome.storage.local.get(["block_channel"], function (data) {
        if (data.block_channel == true) {
            chrome.webRequest.onBeforeRequest.addListener(
                callback_block,
                { urls: ["*://*.youtube.com/channel/*", "*://*.youtube.com/youtubei/v1/browse?key=*", "*://youtubesync.ily1606.team/api/ping_unblocked_channel.php?id=*"] },
                ["blocking", "requestBody"]
            );
        }
        else {
            if (chrome.webRequest.onBeforeRequest.hasListener(callback_block)) {
                chrome.webRequest.onBeforeRequest.removeListener(callback_block);
            }
        }
    });
}
block_request();
chrome.contextMenus.create({
    title: "Đánh dấu video này đã xem", contexts: ["all"], onclick: add_sync, 'documentUrlPatterns': ['*://*.youtube.com/*']
});
chrome.contextMenus.create({
    title: "Xóa khỏi video đã xem", contexts: ["all"], onclick: remove_sync, 'documentUrlPatterns': ['*://*.youtube.com/*']
}); chrome.contextMenus.create({
    title: "Chặn kênh này", contexts: ["all"], onclick: block_channel, 'documentUrlPatterns': ['*://*.youtube.com/channel/*']
});
chrome.storage.onChanged.addListener(function () {
    block_request();
})