<html>

<head>
    <meta charset="UTF-8" />
    <title>Yotube sync - Lịch sử xem</title>
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/assets/css/metal.css">
    <link rel="icon" href="/Server/assets/image/logo-16.png">
</head>

<body>
    <div class="modal_loading">
        <div class="spinning">
            <img src="/assets/image/loading.svg" width="100px" height="100px">
        </div>
    </div>
    <div class="container">
        <div class="row position-relative">
            <div class="mx-auto col-8 p-4 rounded border mt-4">
                <a class="float-right" href="/logout.php">Đăng xuất</a>
                <h3 class="text-center metal-title">Yotube sync</h3>
                <h6 class="text-center metal-title-small">Danh sách video đã đồng bộ hóa</h6>
                <div class="row" id="list_load_id">
                    <div class="text-center col-12">Đang lấy dữ liệu...</div>
                </div>
                <div class="row mt-4">
                    <button class="btn btn-primary btn-metal col-12" id="load_more_btn">Tải thêm 10 video</button>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="/assets/toastr/css/toastr.min.css">
    <script src="/assets/jquery/js/jquery.js"></script>
    <script src="/assets/toastr/js/toastr.min.js"></script>
    <script src="/assets/js/profile.js?v=2"></script>
</body>

</html>