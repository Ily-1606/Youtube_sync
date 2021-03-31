<html>

<head>
    <meta charset="UTF-8" />
    <title>Yotube sync - Đăng ký</title>
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css">
    <link rel="icon" href="/Server/assets/image/logo-16.png">
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
            <div class="mx-auto my-auto col-4 p-4 rounded border position-fixed metal-container">
                <h3 class="text-center metal-title">Yotube sync</h3>
                <h6 class="text-center metal-title-small">Đăng ký, hoàn toàn miễn phí</h6>
                <form action="/api/regsister.php" method="POST" id="stoped_form">
                    <div class="form-group metal-input">
                        <input type="text" name="username" id="username" class="form-control" />
                        <label for="username">Tên người dùng</label>
                    </div>
                    <div class="form-group metal-input">
                        <input type="password" name="password" id="password" class="form-control" />
                        <label for="password">Mật khẩu</label>
                    </div>
                    <a href="login.php">Đã có tài khoản?</a>
                    <button class="btn btn-metal float-right">Đăng ký</button>
                </form>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="/assets/toastr/css/toastr.min.css">
    <script src="/assets/jquery/js/jquery.js"></script>
    <script src="/assets/toastr/js/toastr.min.js"></script>
    <script src="/assets/js/metal.js"></script>
</body>

</html>