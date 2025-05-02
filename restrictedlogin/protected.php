<?php
session_start();

// Check if user is authenticated and session is valid
if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true || time() > $_SESSION['expires']) {
    // Destroy session and redirect to login
    session_unset();
    session_destroy();
    header("Location: login.html");
    exit();
}

// Calculate session expiration
$remainingTime = $_SESSION['expires'] - time();
$remainingDays = floor($remainingTime / (60 * 60 * 24));
$remainingHours = floor(($remainingTime % (60 * 60 * 24)) / (60 * 60));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Protected Content</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .welcome-message {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .session-info {
            background-color: #e2f0fd;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .logout-btn {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
        }
        .logout-btn:hover {
            background-color: #c82333;
        }
    </style>
</head>
<body>
    <div class="welcome-message">
        <h2>Welcome, <?php echo htmlspecialchars($_SESSION['email']); ?>!</h2>
        <p>You have successfully accessed the protected content.</p>
    </div>
    
    <div class="session-info">
        <h3>Session Information</h3>
        <p>Your session will expire in: <?php echo $remainingDays; ?> days and <?php echo $remainingHours; ?> hours.</p>
    </div>
    
    <form action="logout.php" method="post">
        <button type="submit" class="logout-btn">Logout</button>
    </form>
    
    <!-- Your protected content goes here -->
    <div class="protected-content">
        <h3>Restricted Content</h3>
        <p>This content is only visible to authenticated users.</p>
    </div>
</body>
</html>
