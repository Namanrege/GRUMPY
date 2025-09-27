<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // If the server allows the POST request, this message will show.
    echo "SUCCESS! Your server accepted the POST request.";
} else {
    // If you access this file directly, this message will show.
    echo "This page should be accessed from the test.html form.";
}
?>