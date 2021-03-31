chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: "https://youtubesync.ily1606.team/" });
});
function add_sync(info) {
    var url = new URL(info.pageUrl);
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
} function remove_sync(info) {
    var url = new URL(info.pageUrl);
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
}
chrome.contextMenus.create({
    title: "Đánh dấu video này đã xem", contexts: ["all"], onclick: add_sync, 'documentUrlPatterns': ['*://*.youtube.com/*']
});
chrome.contextMenus.create({
    title: "Xóa khỏi video đã xem", contexts: ["all"], onclick: remove_sync, 'documentUrlPatterns': ['*://*.youtube.com/*']
});