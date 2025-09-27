<?php

// --- CONFIGURATION ---
// Your SheetDB API URL is placed here
define("SHEETDB_URL", "https://sheetdb.io/api/v1/8rxstbl9zlukw");

// --- SCRIPT LOGIC (No need to edit below this line) ---

// 1. Only allow POST requests to prevent the 405 error
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html?message=Invalid_Request');
    exit;
}

// 2. Safely get all the form data
$userName    = isset($_POST['username']) ? trim($_POST['username']) : "";
$senderEmail = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : "";
$phone       = isset($_POST['phone']) ? trim($_POST['phone']) : "";
$subject     = isset($_POST['query']) ? trim($_POST['query']) : "";
$message     = isset($_POST['message']) ? trim($_POST['message']) : "";

// 3. Validate that required fields are not empty
if (empty($userName) || !filter_var($senderEmail, FILTER_VALIDATE_EMAIL) || empty($phone) || empty($subject)) {
    // If required fields are missing, redirect back with an error
    header('Location: contact.html?message=Missing_Required_Fields');
    exit;
}

// 4. Prepare the data array for the API
// IMPORTANT: 'Name', 'Email', etc., MUST EXACTLY MATCH your column headers in Google Sheets.
$postData = [
    'data' => [
        'Name'    => $userName,
        'Email'   => $senderEmail,
        'Phone'   => $phone,
        'Subject' => $subject,
        'Message' => $message,
    ]
];

// 5. Initialize cURL and send the data to SheetDB as JSON
$ch = curl_init(SHEETDB_URL);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData)); 
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 6. Redirect the user with a success or failure message
if ($httpCode == 200 || $httpCode == 201) {
    // Success!
    header("Location: contact.html?message=Submission_Successful");
    exit();
} else {
    // Failure.
    header("Location: contact.html?message=Submission_Failed");
    exit();
}

?>