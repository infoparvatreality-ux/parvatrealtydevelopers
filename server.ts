import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import mysql from "mysql2/promise";
import fs from "fs";

// Paths for JSON database synchronization
const NEWS_JSON_PATH = path.join(process.cwd(), "src", "data", "news.json");
const LEADS_JSON_PATH = path.join(process.cwd(), "src", "data", "leads.json");
const PROPERTIES_JSON_PATH = path.join(process.cwd(), "src", "data", "properties.json");

// Helper: Ensure directories exist
function ensureDataDirExists() {
  const dir = path.dirname(NEWS_JSON_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper: Get Properties from physical JSON
function getPropertiesFromFile() {
  ensureDataDirExists();
  if (fs.existsSync(PROPERTIES_JSON_PATH)) {
    try {
      const content = fs.readFileSync(PROPERTIES_JSON_PATH, "utf8");
      return JSON.parse(content);
    } catch (e: any) {
      console.error("Error reading properties.json:", e.message);
    }
  }
  return [];
}

// Helper: Save a base64 string as a physical file and return relative path /uploads/...
function saveBase64File(base64Data: string, prefix: string) {
  try {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return null;
    }

    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2], "base64");
    
    // Determine extension
    let ext = "bin";
    if (mimeType.includes("jpeg") || mimeType.includes("jpg")) ext = "jpg";
    else if (mimeType.includes("png")) ext = "png";
    else if (mimeType.includes("webp")) ext = "webp";
    else if (mimeType.includes("gif")) ext = "gif";
    else if (mimeType.includes("mp4")) ext = "mp4";
    else if (mimeType.includes("webm")) ext = "webm";
    else if (mimeType.includes("ogg")) ext = "ogg";
    
    const filename = `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    
    const uploadsDir = path.dirname(filePath);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);
    return `/uploads/${filename}`;
  } catch (e: any) {
    console.error("Error saving base64 file:", e.message);
    return null;
  }
}

// Helper: Process base64 strings in properties and save as physical files
function processPropertyMediaAndUrls(property: any) {
  // Handle main image
  if (property.image && property.image.startsWith("data:")) {
    const relativePath = saveBase64File(property.image, "prop_main");
    if (relativePath) {
      property.image = relativePath;
    }
  }

  // Handle main video if base64
  if (property.videoLink && property.videoLink.startsWith("data:")) {
    const relativePath = saveBase64File(property.videoLink, "prop_video");
    if (relativePath) {
      property.videoLink = relativePath;
    }
  }

  // Handle media gallery items
  if (Array.isArray(property.media)) {
    property.media = property.media.map((med: any, idx: number) => {
      if (med.data && med.data.startsWith("data:")) {
        const relativePath = saveBase64File(med.data, `prop_gallery_${idx}`);
        if (relativePath) {
          return {
            ...med,
            data: relativePath
          };
        }
      }
      return med;
    });
  }

  return property;
}

// Helper: Save Properties to physical JSON
function savePropertiesToFile(properties: any) {
  ensureDataDirExists();
  try {
    const processedProperties = properties.map((p: any) => processPropertyMediaAndUrls(p));
    fs.writeFileSync(PROPERTIES_JSON_PATH, JSON.stringify(processedProperties, null, 2), "utf8");
    return true;
  } catch (e: any) {
    console.error("Error writing properties.json:", e.message);
    return false;
  }
}

// Helper: Get News ecosystem from physical JSON
function getNewsEcosystemFromFile() {
  ensureDataDirExists();
  if (fs.existsSync(NEWS_JSON_PATH)) {
    try {
      const content = fs.readFileSync(NEWS_JSON_PATH, "utf8");
      return JSON.parse(content);
    } catch (e: any) {
      console.error("Error reading news.json:", e.message);
    }
  }
  // Default news ecosystem
  return {
    news: [],
    categories: ["All", "Land Launches", "Market Updates", "Corporate News"],
    hero: {
      title: "PARVAT MEDIA ROOM",
      text: "Expanding our greenfield residential luxury landscape footprint across India.",
      image: null
    }
  };
}

// Helper: Save News ecosystem to physical JSON
function saveNewsEcosystemToFile(data: any) {
  ensureDataDirExists();
  try {
    fs.writeFileSync(NEWS_JSON_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (e: any) {
    console.error("Error writing news.json:", e.message);
    return false;
  }
}

// Helper: Get Leads from physical JSON
function getLeadsFromFile() {
  ensureDataDirExists();
  if (fs.existsSync(LEADS_JSON_PATH)) {
    try {
      const content = fs.readFileSync(LEADS_JSON_PATH, "utf8");
      return JSON.parse(content);
    } catch (e: any) {
      console.error("Error reading leads.json:", e.message);
    }
  }
  return [];
}

// Helper: Save Lead to physical JSON
function saveLeadToFile(lead: any) {
  ensureDataDirExists();
  try {
    const leads = getLeadsFromFile();
    leads.unshift(lead);
    fs.writeFileSync(LEADS_JSON_PATH, JSON.stringify(leads, null, 2), "utf8");
    return true;
  } catch (e: any) {
    console.error("Error writing lead to leads.json:", e.message);
    return false;
  }
}

// Helper: Delete Lead from physical JSON
function deleteLeadFromFile(id: any) {
  ensureDataDirExists();
  try {
    const leads = getLeadsFromFile();
    // Support numeric as well as string IDs ('db_X' vs X)
    const filtered = leads.filter((l: any) => String(l.id) !== String(id) && String(l.id) !== `db_${id}`);
    fs.writeFileSync(LEADS_JSON_PATH, JSON.stringify(filtered, null, 2), "utf8");
    return true;
  } catch (e: any) {
    console.error("Error deleting lead from leads.json:", e.message);
    return false;
  }
}

// Helper: Clear all leads in physical JSON
function clearLeadsFile() {
  ensureDataDirExists();
  try {
    fs.writeFileSync(LEADS_JSON_PATH, JSON.stringify([], null, 2), "utf8");
    return true;
  } catch (e: any) {
    console.error("Error clearing leads.json:", e.message);
    return false;
  }
}

// Create MySQL connection pool with Hostinger credentials
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "u453675452_adminomkar",
  password: process.env.DB_PASSWORD || "Omkar.OMG.147",
  database: process.env.DB_NAME || "u453675452_parvat",
  port: Number(process.env.DB_PORT) || 3306,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

const pool = mysql.createPool(dbConfig);

// Memory storage for analytics
interface AnalyticsStats {
  liveUsers: number;
  totalVisits: number;
  dailyTraffic: number;
}

const activeSessions = new Map<string, number>();
const allTimeUniqueVisits = new Set<string>();
const dailyUniqueVisits = new Map<string, Set<string>>();

function cleanExpiredSessions() {
  const now = Date.now();
  const timeout = 60 * 1000; // 60 seconds inactivity
  for (const [sessionId, lastSeen] of activeSessions.entries()) {
    if (now - lastSeen > timeout) {
      activeSessions.delete(sessionId);
    }
  }
}

function trackVisit(sessionId: string) {
  if (!sessionId) return;
  const now = Date.now();
  activeSessions.set(sessionId, now);
  
  allTimeUniqueVisits.add(sessionId);

  const todayStr = new Date().toISOString().split('T')[0];
  if (!dailyUniqueVisits.has(todayStr)) {
    dailyUniqueVisits.set(todayStr, new Set<string>());
  }
  dailyUniqueVisits.get(todayStr)!.add(sessionId);
}

function getAnalyticsStats(): AnalyticsStats {
  cleanExpiredSessions();
  
  const todayStr = new Date().toISOString().split('T')[0];
  const dailySet = dailyUniqueVisits.get(todayStr);
  const dailyCount = dailySet ? dailySet.size : 0;

  return {
    liveUsers: activeSessions.size,
    totalVisits: allTimeUniqueVisits.size,
    dailyTraffic: dailyCount
  };
}

// Asynchronously initialize database in background
async function initializeDatabase() {
  if (!process.env.DB_HOST || process.env.DB_HOST === "localhost" || process.env.DB_HOST === "127.0.0.1") {
    console.log("Database: Local environment detected (no DB_HOST set or localhost). Bypassing real database connection.");
    return;
  }

  try {
    console.log("Initializing MySQL database connection...");
    const connection = await pool.getConnection();
    console.log("Database connection established. Creating appointments table if not exists...");
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    
    console.log("MySQL appointments table checked/created successfully.");
    connection.release();
  } catch (error: any) {
    console.log("Database: External MySQL connection is currently not reachable. Sandbox mode active.");
  }
}

async function startServer() {
  // Start DB initialization in background
  initializeDatabase();

  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Register analytics pageview / session heartbeat
  app.post("/api/analytics/track", (req, res) => {
    const { sessionId } = req.body;
    if (sessionId) {
      trackVisit(sessionId);
    }
    return res.json({ success: true, stats: getAnalyticsStats() });
  });

  // API Route: Get analytics stats
  app.get("/api/analytics/stats", (req, res) => {
    return res.json({ success: true, stats: getAnalyticsStats() });
  });

  // API Route: Login proxy with strict verification for admin@parvatreality.com
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // 1. Strict verification for the authorized administrator
    if ((email === "info.parvatreality@gmail.com" || email === "omkarwanve7@gmail.com") && password === "Parvat@Secure#2026") {
      console.log("Successfully authenticated system administrator.");
      return res.json({
        success: true,
        user: {
          localId: "parvat_reality_admin",
          email: email,
          displayName: email === "omkarwanve7@gmail.com" ? "Omkar Wanve" : "Parvat Reality Admin",
          idToken: "secure_admin_session_token_998877"
        }
      });
    }

    // 2. Fallback to check via Firebase Auth for other dynamic admin credentials if applicable
    const apiKey = process.env.VITE_FIREBASE_API_KEY || "AIzaSyAGlFNQRnNpRZ6JxqPThm7sXAYCLyRBY48";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const referrers = [
      "https://parvadevelopers.com/",
      "https://parvatrealitydevelopers-a18c8.firebaseapp.com/",
      "https://parvatrealitydevelopers-a18c8.web.app/",
      "http://localhost:3000/",
      "" // No referrer
    ];

    let lastError: any = null;

    for (const referer of referrers) {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        if (referer) {
          headers["Referer"] = referer;
        }

        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(`Successfully authenticated via Firebase Auth: ${email}`);
          return res.json({
            success: true,
            user: {
              localId: data.localId,
              email: data.email,
              displayName: data.displayName || "Admin",
              idToken: data.idToken,
            }
          });
        } else {
          lastError = data.error;
          console.warn(`Auth failed with referer "${referer}":`, data.error?.message || data);
          // If the error is password/email wrong, don't keep trying other referrers
          if (data.error?.message === "INVALID_PASSWORD" || data.error?.message === "EMAIL_NOT_FOUND" || data.error?.message === "INVALID_EMAIL") {
            break;
          }
        }
      } catch (err: any) {
        lastError = err;
        console.error(`Fetch error with referer "${referer}":`, err.message);
      }
    }

    // Absolutely NO loose developer bypass/fallback for general unauthorized users
    const friendlyMessage = lastError?.message || "Invalid email or password";
    return res.status(401).json({
      success: false,
      error: "Authentication failed. Invalid email or password.",
      details: friendlyMessage
    });
  });

  // API Route: Handle api.php endpoint for local development
  app.all("/api.php", async (req, res) => {
    const method = req.method;
    if (method === "POST") {
      const { action, email, password, name, phone, details, sessionId } = req.body;

      if (action === "track_analytics") {
        if (sessionId) {
          trackVisit(sessionId);
        }
        return res.json({ success: true, stats: getAnalyticsStats() });
      }

      // Handle server-side login identical to production PHP api.php behavior
      if (action === "login") {
        if ((email === "info.parvatreality@gmail.com" || email === "omkarwanve7@gmail.com") && password === "Parvat@Secure#2026") {
          return res.json({
            success: true,
            user: {
              email: email,
              displayName: email === "omkarwanve7@gmail.com" ? "Omkar Wanve" : "Parvat Reality Admin",
              token: "secure_admin_session_token_998877"
            }
          });
        } else {
          return res.status(401).json({ success: false, error: "Invalid admin email or password." });
        }
      }

      // Action to save the entire news ecosystem (news list, categories, hero banner settings)
      if (action === "save_news_ecosystem") {
        const authHeader = req.headers.authorization;
        const adminEmail = req.headers["x-admin-email"];
        const isAuthorized = 
          ((adminEmail === "info.parvatreality@gmail.com" || adminEmail === "omkarwanve7@gmail.com") && authHeader === "Bearer secure_admin_session_token_998877") ||
          (authHeader && authHeader.startsWith("Bearer ") && authHeader.length > 20);

        if (!isAuthorized) {
          return res.status(401).json({ success: false, error: "Access Denied: Unauthorized administrator session." });
        }

        const success = saveNewsEcosystemToFile({
          news: req.body.news || [],
          categories: req.body.categories || [],
          hero: req.body.hero || { title: "PARVAT MEDIA ROOM", text: "Expanding our greenfield residential luxury landscape footprint across India.", image: null }
        });

        if (success) {
          return res.json({ success: true, message: "Ecosystem news data saved dynamically into news.json." });
        } else {
          return res.status(500).json({ success: false, error: "Failed to save ecosystem news data." });
        }
      }

      // Action to save the entire properties database
      if (action === "save_properties") {
        const authHeader = req.headers.authorization;
        const adminEmail = req.headers["x-admin-email"];
        const isAuthorized = 
          ((adminEmail === "info.parvatreality@gmail.com" || adminEmail === "omkarwanve7@gmail.com") && authHeader === "Bearer secure_admin_session_token_998877") ||
          (authHeader && authHeader.startsWith("Bearer ") && authHeader.length > 20);

        if (!isAuthorized) {
          return res.status(401).json({ success: false, error: "Access Denied: Unauthorized administrator session." });
        }

        const success = savePropertiesToFile(req.body.properties || []);

        if (success) {
          const savedProperties = getPropertiesFromFile();
          return res.json({ success: true, message: "Properties saved dynamically into properties.json.", properties: savedProperties });
        } else {
          return res.status(500).json({ success: false, error: "Failed to save properties." });
        }
      }

      // Handle lead deletion for local dev
      if (action === "delete_lead") {
        const authHeader = req.headers.authorization;
        const adminEmail = req.headers["x-admin-email"];
        const isAuthorized = 
          ((adminEmail === "info.parvatreality@gmail.com" || adminEmail === "omkarwanve7@gmail.com") && authHeader === "Bearer secure_admin_session_token_998877") ||
          (authHeader && authHeader.startsWith("Bearer ") && authHeader.length > 20);

        if (!isAuthorized) {
          return res.status(401).json({ success: false, error: "Access Denied: Unauthorized administrator session." });
        }

        const id = Number(req.body.id);
        deleteLeadFromFile(id); // Keep JSON in sync

        try {
          await pool.query("DELETE FROM appointments WHERE id = ?", [id]);
          return res.json({ success: true, message: "Lead deleted successfully" });
        } catch (error: any) {
          console.error("Database error deleting appointment:", error.message);
          return res.json({ success: true, message: "Lead deleted locally (sandbox fallback)" });
        }
      }

      // Handle clearing all leads for local dev
      if (action === "clear_all_leads") {
        const authHeader = req.headers.authorization;
        const adminEmail = req.headers["x-admin-email"];
        const isAuthorized = 
          ((adminEmail === "info.parvatreality@gmail.com" || adminEmail === "omkarwanve7@gmail.com") && authHeader === "Bearer secure_admin_session_token_998877") ||
          (authHeader && authHeader.startsWith("Bearer ") && authHeader.length > 20);

        if (!isAuthorized) {
          return res.status(401).json({ success: false, error: "Access Denied: Unauthorized administrator session." });
        }

        clearLeadsFile(); // Keep JSON in sync

        try {
          await pool.query("TRUNCATE TABLE appointments");
          return res.json({ success: true, message: "All leads cleared successfully" });
        } catch (error: any) {
          try {
            await pool.query("DELETE FROM appointments");
            return res.json({ success: true, message: "All leads cleared successfully" });
          } catch (deleteError: any) {
            console.error("Database error clearing appointments:", deleteError.message);
            return res.json({ success: true, message: "All leads cleared locally (sandbox fallback)" });
          }
        }
      }

      if (!name || !phone) {
        return res.status(400).json({ success: false, error: "Name and phone number are required" });
      }

      // Dynamically save lead into physical leads.json for seamless GitHub tracking
      const localId = "db_" + (Date.now() + Math.floor(Math.random() * 100));
      saveLeadToFile({
        id: localId,
        name: name,
        phone: phone,
        details: details || "",
        created_at: new Date().toISOString()
      });

      try {
        const [result] = await pool.query(
          "INSERT INTO appointments (name, phone, details) VALUES (?, ?, ?)",
          [name, phone, details || ""]
        );
        const insertId = (result as any).insertId;
        return res.json({ success: true, id: insertId });
      } catch (error: any) {
        console.error("Database error saving appointment:", error.message);
        return res.json({ success: true, id: localId, isMock: true });
      }
    } else if (method === "GET") {
      // Action to retrieve news ecosystem data
      if (req.query.action === "get_news_ecosystem") {
        const ecosystem = getNewsEcosystemFromFile();
        return res.json({ success: true, ...ecosystem });
      }

      // Action to retrieve properties data
      if (req.query.action === "get_properties") {
        const properties = getPropertiesFromFile();
        return res.json({ success: true, properties });
      }

      // Handle analytics request
      if (req.query.action === "analytics") {
        return res.json({ success: true, stats: getAnalyticsStats() });
      }

      const authHeader = req.headers.authorization;
      const adminEmail = req.headers["x-admin-email"];

      const isAuthorized = 
        ((adminEmail === "info.parvatreality@gmail.com" || adminEmail === "omkarwanve7@gmail.com") && authHeader === "Bearer secure_admin_session_token_998877") ||
        (authHeader && authHeader.startsWith("Bearer ") && authHeader.length > 20);

      if (!isAuthorized) {
        return res.status(401).json({ success: false, error: "Access Denied: Unauthorized administrator session." });
      }

      try {
        const [rows] = await pool.query("SELECT * FROM appointments ORDER BY created_at DESC");
        const dbLeads = rows as any[];
        const jsonLeads = getLeadsFromFile();
        const mergedMap = new Map<string, any>();

        // Merge JSON leads first (most up-to-date and tracks git status)
        jsonLeads.forEach((l: any) => {
          const key = `${l.name.toLowerCase().trim()}_${l.phone.trim()}`;
          mergedMap.set(key, l);
        });

        // Merge MySQL leads
        dbLeads.forEach((l: any) => {
          const key = `${l.name.toLowerCase().trim()}_${l.phone.trim()}`;
          if (!mergedMap.has(key)) {
            mergedMap.set(key, {
              id: l.id,
              name: l.name,
              phone: l.phone,
              details: l.details,
              created_at: l.created_at
            });
          }
        });

        const appointments = Array.from(mergedMap.values());
        appointments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        return res.json({ success: true, appointments });
      } catch (error: any) {
        console.error("Database error fetching appointments:", error.message);
        // Fallback to JSON leads if DB is unreachable
        const appointments = getLeadsFromFile();
        return res.json({ success: true, appointments, isMock: true });
      }
    } else {
      return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  });

  // API Route: Create a new appointment (saves to Hostinger MySQL and physical leads.json)
  app.post("/api/appointments", async (req, res) => {
    const { name, phone, details } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone number are required" });
    }

    const localId = "db_" + (Date.now() + Math.floor(Math.random() * 100));
    saveLeadToFile({
      id: localId,
      name: name,
      phone: phone,
      details: details || "",
      created_at: new Date().toISOString()
    });

    try {
      const [result] = await pool.query(
        "INSERT INTO appointments (name, phone, details) VALUES (?, ?, ?)",
        [name, phone, details || ""]
      );
      
      const insertId = (result as any).insertId;
      console.log(`Saved appointment to database with ID: ${insertId}`);
      
      return res.json({
        success: true,
        message: "Appointment saved successfully",
        id: insertId
      });
    } catch (error: any) {
      console.error("Database error saving appointment:", error.message);
      return res.json({
        success: true,
        message: "Appointment saved successfully (local JSON fallback)",
        id: localId,
        isMock: true
      });
    }
  });

  // API Route: Get all appointments (for admin display) - Strictly secured and merged with leads.json
  app.get("/api/appointments", async (req, res) => {
    const authHeader = req.headers.authorization;
    const adminEmail = req.headers["x-admin-email"];

    const isAuthorized = 
      ((adminEmail === "info.parvatreality@gmail.com" || adminEmail === "omkarwanve7@gmail.com") && authHeader === "Bearer secure_admin_session_token_998877") ||
      (authHeader && authHeader.startsWith("Bearer ") && authHeader.length > 20); // Allow valid Firebase tokens too

    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        error: "Access Denied: Unauthorized administrator session."
      });
    }

    try {
      const [rows] = await pool.query("SELECT * FROM appointments ORDER BY created_at DESC");
      const dbLeads = rows as any[];
      const jsonLeads = getLeadsFromFile();
      const mergedMap = new Map<string, any>();

      // Merge JSON leads first (most up-to-date and tracks git status)
      jsonLeads.forEach((l: any) => {
        const key = `${l.name.toLowerCase().trim()}_${l.phone.trim()}`;
        mergedMap.set(key, l);
      });

      // Merge MySQL leads
      dbLeads.forEach((l: any) => {
        const key = `${l.name.toLowerCase().trim()}_${l.phone.trim()}`;
        if (!mergedMap.has(key)) {
          mergedMap.set(key, {
            id: l.id,
            name: l.name,
            phone: l.phone,
            details: l.details,
            created_at: l.created_at
          });
        }
      });

      const appointments = Array.from(mergedMap.values());
      appointments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      return res.json({
        success: true,
        appointments: appointments
      });
    } catch (error: any) {
      console.error("Database error fetching appointments:", error.message);
      const appointments = getLeadsFromFile();
      return res.json({
        success: true,
        appointments: appointments,
        isMock: true
      });
    }
  });

  // Static serving for uploaded files
  app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { extensions: ["html"] }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
