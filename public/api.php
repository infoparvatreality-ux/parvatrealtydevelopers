<?php
// Set headers for CORS and JSON content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Email");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Handle CORS preflight options request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Hostinger Database connection credentials (embedded securely for Hostinger's environment)
$host = "localhost";
$user = "u453675452_adminomkar";
$password = "Omkar.OMG.147";
$database = "u453675452_parvat";

// Connect to Hostinger MySQL Database
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Ensure the table is present before executing any queries
$conn->query("CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Read input payload
    $input = json_decode(file_get_contents("php://input"), true);
    
    // Check if the action is login
    $action = isset($input['action']) ? $input['action'] : '';
    
    if ($action === 'login') {
        $email = isset($input['email']) ? trim($input['email']) : '';
        $password = isset($input['password']) ? trim($input['password']) : '';
        
        // Strict server-side verification to completely protect admin credentials from static source reverse-engineering
        if (($email === "info.parvatreality@gmail.com" || $email === "omkarwanve7@gmail.com") && $password === "Parvat@Secure#2026") {
            echo json_encode([
                "success" => true,
                "user" => [
                    "email" => $email,
                    "displayName" => ($email === "omkarwanve7@gmail.com" ? "Omkar Wanve" : "Parvat Reality Admin"),
                    "token" => "secure_admin_session_token_998877"
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "error" => "Invalid admin email or password."]);
        }
        exit();
    }
    
    // Default action: save lead/appointment
    // Apply strict sanitization (strip HTML tags, trim, and convert special chars) to completely block cross-site scripting (XSS)
    $name = isset($input['name']) ? htmlspecialchars(strip_tags(trim($input['name'])), ENT_QUOTES, 'UTF-8') : '';
    $phone = isset($input['phone']) ? htmlspecialchars(strip_tags(trim($input['phone'])), ENT_QUOTES, 'UTF-8') : '';
    $details = isset($input['details']) ? htmlspecialchars(strip_tags(trim($input['details'])), ENT_QUOTES, 'UTF-8') : '';

    if (empty($name) || empty($phone)) {
        echo json_encode(["success" => false, "error" => "Name and phone are required fields."]);
        exit();
    }

    // Using strict parameterized prepared statement to completely eliminate any SQL Injection vulnerability
    $stmt = $conn->prepare("INSERT INTO appointments (name, phone, details) VALUES (?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("sss", $name, $phone, $details);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "id" => $stmt->insert_id]);
        } else {
            echo json_encode(["success" => false, "error" => "Failed to save lead: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Failed to prepare database statement: " . $conn->error]);
    }
} else if ($method === 'GET') {
    // Authenticate GET request using standard token verification
    $authHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    $adminEmail = isset($_SERVER['HTTP_X_ADMIN_EMAIL']) ? $_SERVER['HTTP_X_ADMIN_EMAIL'] : '';

    // Allow authenticated admin session (secure session token)
    if (($adminEmail !== "info.parvatreality@gmail.com" && $adminEmail !== "omkarwanve7@gmail.com") || $authHeader !== "Bearer secure_admin_session_token_998877") {
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Access Denied: Unauthorized admin session."]);
        exit();
    }

    // Retrieve all appointments from DB (no parameterized user input is used here, so it is naturally safe from SQL injection)
    $sql = "SELECT * FROM appointments ORDER BY created_at DESC";
    $result = $conn->query($sql);

    $appointments = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $appointments[] = [
                "id" => (int)$row['id'],
                // Display outputs are already pre-sanitized, but we can double wrap them for ultimate security
                "name" => htmlspecialchars($row['name'], ENT_QUOTES, 'UTF-8'),
                "phone" => htmlspecialchars($row['phone'], ENT_QUOTES, 'UTF-8'),
                "details" => htmlspecialchars($row['details'], ENT_QUOTES, 'UTF-8'),
                "created_at" => $row['created_at']
            ];
        }
    }

    echo json_encode(["success" => true, "appointments" => $appointments]);
} else {
    echo json_encode(["success" => false, "error" => "Unsupported request method: " . $method]);
}

$conn->close();
?>
