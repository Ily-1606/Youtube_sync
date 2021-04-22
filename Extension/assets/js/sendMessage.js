chrome.runtime.onMessage.addListener(function (info, sender, sendResponse) {
    if (info.status != undefined) {
        if (info.status) {
            toastr.success(info.message, "Thành công!");
        }
        else {
            toastr.error(info.message, "Thất bại!");
        }
    }
});