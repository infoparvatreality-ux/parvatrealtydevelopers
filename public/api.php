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
    $name = isset($input['name']) ? $conn->real_escape_string($input['name']) : '';
    $phone = isset($input['phone']) ? $conn->real_escape_string($input['phone']) : '';
    $details = isset($input['details']) ? $conn->real_escape_string($input['details']) : '';

    if (empty($name) || empty($phone)) {
        echo json_encode(["success" => false, "error" => "Name and phone are required fields."]);
        exit();
    }

    $sql = "INSERT INTO appointments (name, phone, details) VALUES ('$name', '$phone', '$details')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "id" => $conn->insert_id]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to save lead: " . $conn->error]);
    }
} else if ($method === 'GET') {
    // Authenticate GET request using standard token verification
    $authHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    $adminEmail = isset($_SERVER['HTTP_X_ADMIN_EMAIL']) ? $_SERVER['HTTP_X_ADMIN_EMAIL'] : '';

    // Allow authenticated admin session (secure session token)
    if (($adminEmail !== "admin@parvatreality.com" && $adminEmail !== "omkarwanve7@gmail.com") || $authHeader !== "Bearer secure_admin_session_token_998877") {
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Access Denied: Unauthorized admin session."]);
        exit();
    }

    // Retrieve all appointments from DB
    $sql = "SELECT * FROM appointments ORDER BY created_at DESC";
    $result = $conn->query($sql);

    $appointments = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $appointments[] = [
                "id" => (int)$row['id'],
                "name" => $row['name'],
                "phone" => $row['phone'],
                "details" => $row['details'],
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
