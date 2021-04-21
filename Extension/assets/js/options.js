jQuery(function () {
    chrome.storage.local.get(["block_subsribe", "block_channel"], function (data) {
        for (i in data) {
            $("#" + i).prop('checked', data[i]);
        }
    });
    $(".save_data").on("change",function(){
        var key = $(this).attr("id");
        chrome.storage.local.set({ [key]: $(this).is(":checked")})
    })
})