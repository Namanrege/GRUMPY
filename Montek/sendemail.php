<?php

/<?php
// Define your SheetDB API URL
define("SHEETDB_URL", "https://sheetdb.io/api/v1/8rxstbl9zlukw");

// Read the form values safely
$userName    = isset($_POST['username']) ? preg_replace("/[^\.\-\' a-zA-Z0-9]/", "", $_POST['username']) : "";
$senderEmail = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : "";
$message     = isset($_POST['message']) ? preg_replace("/(From:|To:|BCC:|CC:|Message:|Content-Type:)/", "", $_POST['message']) : "";

if ($userName && $senderEmail && $message) {
    
    // Prepare data for SheetDB
    $postData = [
        "data" => [
            "Name"    => $userName,
            "Email"   => $senderEmail,
            "Message" => $message
        ]
    ];

    // Send data using cURL
    $ch = curl_init(SHEETDB_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode == 201 || $httpCode == 200) {
        // ✅ Successful
        header("Location: contact.html?message=Successful");
        exit();
    } else {
        // ❌ Failed
        header("Location: index.html?message=Failed");
        exit();
    }
} else {
    // ❌ Missing required fields
    header("Location: index.html?message=Invalid");
    exit();
}
?>
