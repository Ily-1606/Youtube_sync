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
    $.ajax({
        url: "https://youtubesync.ily1606.team/api/channels.php",
        method: "POST",
        data: "data_id=" + info.pageUrl,
        crossDomain: true,
        xhrFields: { withCredentials: true },
        success: function (e) {
            e = JSON.parse(e);
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, e);
            });
            if (data_blacklist.indexOf(info.pageUrl) == -1)
                data_blacklist.push(info.pageUrl);
        },
        error: function (e) {
            alert("Có lỗi khi kết nối với máy chủ!");
        }
    });
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
function detect_url(details, url) {
    let block = false;
    if(url == undefined)
    url = new URL(details.url);
    for (let i = 0; i < data_blacklist.length; i++) {
        block = details.url.indexOf(data_blacklist[i]) != -1 && url.pathname == new URL(data_blacklist[i]).pathname;
        if (block) break;
    }
    return block;
}
function callback_block(details) {
    var url = new URL(details.url);
    let block = false;
    if (url.host == "youtubesync.ily1606.team" && url.pathname == "/api/ping_unblocked_channel.php") {
        var channel_id = url.search.split("?id=")[1];
        var index = data_blacklist.indexOf(channel_id);
        if (index != -1) {
            data_blacklist.splice(index, 1);
        }
    }
    else {
        block = detect_url(details, url);
        if (url.hostname == "www.youtube.com") {
            if (url.pathname.indexOf('/youtubei/v1/') > -1) {
                if (details.requestBody) {
                    console.info(details);
                    if (details.requestBody.raw) {
                        var postedString = JSON.parse(decodeURIComponent(String.fromCharCode.apply(null,
                            new Uint8Array(details.requestBody.raw[0].bytes))));
                        block = detect_url({"url": "https://www.youtube.com/channel/"+postedString["browseId"]})
                    }
                }
            }
            else {
                if (details.tabId && block) {
                    chrome.tabs.update(details.tabId, { url: "https://www.youtube.com/" });
                    block = false;
                }
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
                { urls: ["<all_urls>"] },
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
    title: "Chặn url này", contexts: ["all"], onclick: block_channel
});
chrome.storage.onChanged.addListener(function () {
    block_request();
})