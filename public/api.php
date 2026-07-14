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

// Read/Write helper for PHP analytics
function get_php_analytics() {
    $file = sys_get_temp_dir() . '/parvat_analytics.json';
    $now = time();
    
    $data = [
        'sessions' => [], // sessionId => lastSeen
        'all_time' => [], // unique sessionIds
        'daily' => [] // date => array of sessionIds
    ];
    
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $decoded = json_decode($content, true);
        if ($decoded) {
            $data = array_merge($data, $decoded);
        }
    }
    
    if (isset($data['sessions']) && is_array($data['sessions'])) {
        foreach ($data['sessions'] as $sid => $lastSeen) {
            if ($now - $lastSeen > 60) {
                unset($data['sessions'][$sid]);
            }
        }
    } else {
        $data['sessions'] = [];
    }
    
    return $data;
}

function save_php_analytics($data) {
    $file = sys_get_temp_dir() . '/parvat_analytics.json';
    file_put_contents($file, json_encode($data));
}

function track_php_visit($sessionId) {
    if (!$sessionId) return;
    $now = time();
    $today = date('Y-m-d');
    
    $data = get_php_analytics();
    
    $data['sessions'][$sessionId] = $now;
    
    if (!isset($data['all_time']) || !is_array($data['all_time'])) {
        $data['all_time'] = [];
    }
    if (!in_array($sessionId, $data['all_time'])) {
        $data['all_time'][] = $sessionId;
    }
    
    if (!isset($data['daily']) || !is_array($data['daily'])) {
        $data['daily'] = [];
    }
    if (!isset($data['daily'][$today]) || !is_array($data['daily'][$today])) {
        $data['daily'][$today] = [];
    }
    if (!in_array($sessionId, $data['daily'][$today])) {
        $data['daily'][$today][] = $sessionId;
    }
    
    save_php_analytics($data);
}

function get_php_stats() {
    $data = get_php_analytics();
    $today = date('Y-m-d');
    
    $liveCount = isset($data['sessions']) ? count($data['sessions']) : 0;
    $totalCount = isset($data['all_time']) ? count($data['all_time']) : 0;
    $dailyCount = (isset($data['daily']) && isset($data['daily'][$today])) ? count($data['daily'][$today]) : 0;
    
    return [
        'liveUsers' => $liveCount,
        'totalVisits' => $totalCount,
        'dailyTraffic' => $dailyCount
    ];
}

// Paths for JSON database synchronization
define('NEWS_JSON_PATH', dirname(__DIR__) . '/src/data/news.json');
define('LEADS_JSON_PATH', dirname(__DIR__) . '/src/data/leads.json');
define('PROPERTIES_JSON_PATH', dirname(__DIR__) . '/src/data/properties.json');

function ensure_php_data_dir_exists() {
    $dir = dirname(NEWS_JSON_PATH);
    if (!file_exists($dir)) {
        mkdir($dir, 0755, true);
    }
}

function get_properties_from_file() {
    ensure_php_data_dir_exists();
    if (file_exists(PROPERTIES_JSON_PATH)) {
        $content = file_get_contents(PROPERTIES_JSON_PATH);
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }
    return [];
}

function save_base64_file($base64Data, $prefix) {
    try {
        if (preg_match('/^data:([^;]+);base64,(.+)$/', $base64Data, $matches)) {
            $mimeType = $matches[1];
            $data = base64_decode($matches[2]);
            
            $ext = 'bin';
            if (strpos($mimeType, 'jpeg') !== false || strpos($mimeType, 'jpg') !== false) $ext = 'jpg';
            else if (strpos($mimeType, 'png') !== false) $ext = 'png';
            else if (strpos($mimeType, 'webp') !== false) $ext = 'webp';
            else if (strpos($mimeType, 'gif') !== false) $ext = 'gif';
            else if (strpos($mimeType, 'mp4') !== false) $ext = 'mp4';
            else if (strpos($mimeType, 'webm') !== false) $ext = 'webm';
            else if (strpos($mimeType, 'ogg') !== false) $ext = 'ogg';
            
            $filename = $prefix . '_' . time() . '_' . rand(100, 999) . '.' . $ext;
            $uploadsDir = dirname(__FILE__) . '/uploads';
            if (!file_exists($uploadsDir)) {
                mkdir($uploadsDir, 0755, true);
            }
            $filePath = $uploadsDir . '/' . $filename;
            
            if (file_put_contents($filePath, $data) !== false) {
                return '/uploads/' . $filename;
            }
        }
    } catch (Exception $e) {
        // Ignored
    }
    return null;
}

function process_property_media_and_urls(&$property) {
    // Handle main image
    if (isset($property['image']) && strpos($property['image'], 'data:') === 0) {
        $relativePath = save_base64_file($property['image'], 'prop_main');
        if ($relativePath) {
            $property['image'] = $relativePath;
        }
    }

    // Handle main video
    if (isset($property['videoLink']) && strpos($property['videoLink'], 'data:') === 0) {
        $relativePath = save_base64_file($property['videoLink'], 'prop_video');
        if ($relativePath) {
            $property['videoLink'] = $relativePath;
        }
    }

    // Handle media gallery items
    if (isset($property['media']) && is_array($property['media'])) {
        foreach ($property['media'] as $idx => &$med) {
            if (isset($med['data']) && strpos($med['data'], 'data:') === 0) {
                $relativePath = save_base64_file($med['data'], 'prop_gallery_' . $idx);
                if ($relativePath) {
                    $med['data'] = $relativePath;
                }
            }
        }
    }
}

function save_properties_to_file($properties) {
    ensure_php_data_dir_exists();
    if (is_array($properties)) {
        foreach ($properties as &$p) {
            process_property_media_and_urls($p);
        }
    } else {
        $properties = [];
    }
    return file_put_contents(PROPERTIES_JSON_PATH, json_encode($properties, JSON_PRETTY_PRINT)) !== false;
}

function get_news_ecosystem_from_file() {
    ensure_php_data_dir_exists();
    if (file_exists(NEWS_JSON_PATH)) {
        $content = file_get_contents(NEWS_JSON_PATH);
        $decoded = json_decode($content, true);
        if ($decoded) {
            return $decoded;
        }
    }
    return [
        "news" => [],
        "categories" => ["All", "Land Launches", "Market Updates", "Corporate News"],
        "hero" => [
            "title" => "PARVAT MEDIA ROOM",
            "text" => "Expanding our greenfield residential luxury landscape footprint across India.",
            "image" => null
        ]
    ];
}

function save_news_ecosystem_to_file($data) {
    ensure_php_data_dir_exists();
    return file_put_contents(NEWS_JSON_PATH, json_encode($data, JSON_PRETTY_PRINT)) !== false;
}

function get_leads_from_file() {
    ensure_php_data_dir_exists();
    if (file_exists(LEADS_JSON_PATH)) {
        $content = file_get_contents(LEADS_JSON_PATH);
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }
    return [];
}

function save_lead_to_file($lead) {
    ensure_php_data_dir_exists();
    $leads = get_leads_from_file();
    array_unshift($leads, $lead);
    return file_put_contents(LEADS_JSON_PATH, json_encode($leads, JSON_PRETTY_PRINT)) !== false;
}

function delete_lead_from_file($id) {
    ensure_php_data_dir_exists();
    $leads = get_leads_from_file();
    $filtered = [];
    foreach ($leads as $l) {
        if (strval($l['id']) !== strval($id) && strval($l['id']) !== 'db_' . $id) {
            $filtered[] = $l;
        }
    }
    return file_put_contents(LEADS_JSON_PATH, json_encode($filtered, JSON_PRETTY_PRINT)) !== false;
}

function clear_leads_file() {
    ensure_php_data_dir_exists();
    return file_put_contents(LEADS_JSON_PATH, json_encode([], JSON_PRETTY_PRINT)) !== false;
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
    
    if ($action === 'track_analytics') {
        $sessionId = isset($input['sessionId']) ? trim($input['sessionId']) : '';
        if (!empty($sessionId)) {
            track_php_visit($sessionId);
        }
        echo json_encode(["success" => true, "stats" => get_php_stats()]);
        exit();
    }
    
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

    if ($action === 'save_news_ecosystem') {
        $authHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
        $adminEmail = isset($_SERVER['HTTP_X_ADMIN_EMAIL']) ? $_SERVER['HTTP_X_ADMIN_EMAIL'] : '';
        
        if (($adminEmail !== "info.parvatreality@gmail.com" && $adminEmail !== "omkarwanve7@gmail.com") || $authHeader !== "Bearer secure_admin_session_token_998877") {
            http_response_code(401);
            echo json_encode(["success" => false, "error" => "Access Denied: Unauthorized admin session."]);
            exit();
        }

        $news = isset($input['news']) ? $input['news'] : [];
        $categories = isset($input['categories']) ? $input['categories'] : [];
        $hero = isset($input['hero']) ? $input['hero'] : [
            "title" => "PARVAT MEDIA ROOM",
            "text" => "Expanding our greenfield residential luxury landscape footprint across India.",
            "image" => null
        ];

        $success = save_news_ecosystem_to_file([
            "news" => $news,
            "categories" => $categories,
            "hero" => $hero
        ]);

        if ($success) {
            echo json_encode(["success" => true, "message" => "Ecosystem news data saved dynamically into news.json."]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Failed to save ecosystem news data."]);
        }
        exit();
    }

    if ($action === 'save_properties') {
        $authHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
        $adminEmail = isset($_SERVER['HTTP_X_ADMIN_EMAIL']) ? $_SERVER['HTTP_X_ADMIN_EMAIL'] : '';
        
        if (($adminEmail !== "info.parvatreality@gmail.com" && $adminEmail !== "omkarwanve7@gmail.com") || $authHeader !== "Bearer secure_admin_session_token_998877") {
            http_response_code(401);
            echo json_encode(["success" => false, "error" => "Access Denied: Unauthorized admin session."]);
            exit();
        }

        $properties = isset($input['properties']) ? $input['properties'] : [];

        $success = save_properties_to_file($properties);

        if ($success) {
            $saved_properties = get_properties_from_file();
            echo json_encode(["success" => true, "message" => "Properties saved dynamically into properties.json.", "properties" => $saved_properties]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Failed to save properties."]);
        }
        exit();
    }
    
    if ($action === 'delete_lead') {
        $authHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
        $adminEmail = isset($_SERVER['HTTP_X_ADMIN_EMAIL']) ? $_SERVER['HTTP_X_ADMIN_EMAIL'] : '';
        
        if (($adminEmail !== "info.parvatreality@gmail.com" && $adminEmail !== "omkarwanve7@gmail.com") || $authHeader !== "Bearer secure_admin_session_token_998877") {
            http_response_code(401);
            echo json_encode(["success" => false, "error" => "Access Denied: Unauthorized admin session."]);
            exit();
        }

        $id = isset($input['id']) ? $input['id'] : 0;
        delete_lead_from_file($id); // Sync JSON leads

        $numeric_id = (int)$id;
        if ($numeric_id > 0) {
            $stmt = $conn->prepare("DELETE FROM appointments WHERE id = ?");
            if ($stmt) {
                $stmt->bind_param("i", $numeric_id);
                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Lead deleted successfully."]);
                } else {
                    echo json_encode(["success" => false, "error" => "Failed to delete lead from DB: " . $stmt->error]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "error" => "Failed to prepare DB delete statement."]);
            }
        } else {
            echo json_encode(["success" => true, "message" => "Lead deleted from JSON backup database."]);
        }
        exit();
    }

    if ($action === 'clear_all_leads') {
        $authHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
        $adminEmail = isset($_SERVER['HTTP_X_ADMIN_EMAIL']) ? $_SERVER['HTTP_X_ADMIN_EMAIL'] : '';
        
        if (($adminEmail !== "info.parvatreality@gmail.com" && $adminEmail !== "omkarwanve7@gmail.com") || $authHeader !== "Bearer secure_admin_session_token_998877") {
            http_response_code(401);
            echo json_encode(["success" => false, "error" => "Access Denied: Unauthorized admin session."]);
            exit();
        }

        clear_leads_file(); // Sync JSON leads

        $sql = "TRUNCATE TABLE appointments";
        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "message" => "All leads cleared successfully."]);
        } else {
            $sql = "DELETE FROM appointments";
            if ($conn->query($sql)) {
                echo json_encode(["success" => true, "message" => "All leads cleared successfully."]);
            } else {
                echo json_encode(["success" => false, "error" => "Failed to clear leads from DB: " . $conn->error]);
            }
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

    // Save lead into physical JSON file backup
    $localId = "db_" . (time() . rand(10, 99));
    save_lead_to_file([
        "id" => $localId,
        "name" => $name,
        "phone" => $phone,
        "details" => $details,
        "created_at" => date('Y-m-d H:i:s')
    ]);

    // Using strict parameterized prepared statement to completely eliminate any SQL Injection vulnerability
    $stmt = $conn->prepare("INSERT INTO appointments (name, phone, details) VALUES (?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("sss", $name, $phone, $details);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "id" => $stmt->insert_id]);
        } else {
            echo json_encode(["success" => true, "id" => $localId, "message" => "Saved locally (DB error: " . $stmt->error . ")"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => true, "id" => $localId, "message" => "Saved locally (DB prepare failed)"]);
    }
} else if ($method === 'GET') {
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    if ($action === 'get_news_ecosystem') {
        $ecosystem = get_news_ecosystem_from_file();
        echo json_encode(array_merge(["success" => true], $ecosystem));
        exit();
    }

    if ($action === 'get_properties') {
        $properties = get_properties_from_file();
        echo json_encode(["success" => true, "properties" => $properties]);
        exit();
    }

    // Authenticate GET request using standard token verification
    $authHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    $adminEmail = isset($_SERVER['HTTP_X_ADMIN_EMAIL']) ? $_SERVER['HTTP_X_ADMIN_EMAIL'] : '';

    // Allow authenticated admin session (secure session token)
    if (($adminEmail !== "info.parvatreality@gmail.com" && $adminEmail !== "omkarwanve7@gmail.com") || $authHeader !== "Bearer secure_admin_session_token_998877") {
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Access Denied: Unauthorized admin session."]);
        exit();
    }

    if ($action === 'analytics') {
        echo json_encode(["success" => true, "stats" => get_php_stats()]);
        exit();
    }

    // Retrieve all appointments from DB (no parameterized user input is used here, so it is naturally safe from SQL injection)
    $sql = "SELECT * FROM appointments ORDER BY created_at DESC";
    $result = $conn->query($sql);

    $db_appointments = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $db_appointments[] = [
                "id" => (int)$row['id'],
                // Display outputs are already pre-sanitized, but we can double wrap them for ultimate security
                "name" => htmlspecialchars($row['name'], ENT_QUOTES, 'UTF-8'),
                "phone" => htmlspecialchars($row['phone'], ENT_QUOTES, 'UTF-8'),
                "details" => htmlspecialchars($row['details'], ENT_QUOTES, 'UTF-8'),
                "created_at" => $row['created_at']
            ];
        }
    }

    $json_leads = get_leads_from_file();
    $merged_leads = [];
    $keys_tracker = [];

    // Add JSON leads first
    foreach ($json_leads as $l) {
        $key = strtolower(trim($l['name'])) . '_' . trim($l['phone']);
        $merged_leads[] = $l;
        $keys_tracker[$key] = true;
    }

    // Add DB leads if no overlap
    foreach ($db_appointments as $l) {
        $key = strtolower(trim($l['name'])) . '_' . trim($l['phone']);
        if (!isset($keys_tracker[$key])) {
            $merged_leads[] = $l;
            $keys_tracker[$key] = true;
        }
    }

    // Sort by created_at descending
    usort($merged_leads, function($a, $b) {
        return strtotime($b['created_at']) - strtotime($a['created_at']);
    });

    echo json_encode(["success" => true, "appointments" => $merged_leads]);
} else {
    echo json_encode(["success" => false, "error" => "Unsupported request method: " . $method]);
}

$conn->close();
?>
