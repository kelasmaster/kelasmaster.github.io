<?php
session_start();

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    
    // Validate inputs
    if (empty($email) || empty($password)) {
        header("Location: login.html?error=1");
        exit();
    }
    
    // Check credentials against CSV
    $csvFile = 'daftaremail.csv';
    
    if (($handle = fopen($csvFile, "r")) !== FALSE) {
        $authenticated = false;
        $sessionDays = 0;
        
        // Skip header row
        fgetcsv($handle);
        
        while (($data = fgetcsv($handle)) !== FALSE) {
            $storedEmail = trim($data[0]);
            $storedPassword = trim($data[1]);
            $storedSessionDays = (int)trim($data[2]);
            
            if ($email === $storedEmail && $password === $storedPassword) {
                $authenticated = true;
                $sessionDays = $storedSessionDays;
                break;
            }
        }
        fclose($handle);
        
        if ($authenticated) {
            // Set session variables
            $_SESSION['authenticated'] = true;
            $_SESSION['email'] = $email;
            $_SESSION['expires'] = time() + ($sessionDays * 24 * 60 * 60);
            
            // Redirect to protected page
            header("Location: protected.php");
            exit();
        }
    }
    
    // If authentication fails
    header("Location: login.html?error=1");
    exit();
} else {
    // If not a POST request, redirect to login
    header("Location: login.html");
    exit();
}
?>
