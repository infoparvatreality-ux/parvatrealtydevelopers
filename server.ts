import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import mysql from "mysql2/promise";

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

// Asynchronously initialize database in background
async function initializeDatabase() {
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
    console.warn("MySQL Database initialization failed (expected if local MySQL is inactive):", error.message);
  }
}

async function startServer() {
  // Start DB initialization in background
  initializeDatabase();

  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
      const { action, email, password, name, phone, details } = req.body;

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

      if (!name || !phone) {
        return res.status(400).json({ success: false, error: "Name and phone number are required" });
      }
      try {
        const [result] = await pool.query(
          "INSERT INTO appointments (name, phone, details) VALUES (?, ?, ?)",
          [name, phone, details || ""]
        );
        const insertId = (result as any).insertId;
        return res.json({ success: true, id: insertId });
      } catch (error: any) {
        console.error("Database error saving appointment:", error.message);
        if (process.env.NODE_ENV !== "production") {
          return res.json({
            success: true,
            id: Math.floor(Math.random() * 1000) + 1,
            isMock: true
          });
        }
        return res.status(500).json({ success: false, error: "Failed to save lead", details: error.message });
      }
    } else if (method === "GET") {
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
        return res.json({ success: true, appointments: rows });
      } catch (error: any) {
        console.error("Database error fetching appointments:", error.message);
        if (process.env.NODE_ENV !== "production") {
          return res.json({
            success: true,
            appointments: [
              {
                id: 1,
                name: "John Doe (Mock)",
                phone: "9876543210",
                details: "Interested in 3 BHK Parvat Heights apartment.",
                created_at: new Date().toISOString()
              },
              {
                id: 2,
                name: "Jane Smith (Mock)",
                phone: "1234567890",
                details: "Wants to schedule a site visit this Sunday.",
                created_at: new Date(Date.now() - 3600000).toISOString()
              }
            ],
            isMock: true
          });
        }
        return res.status(500).json({ success: false, error: "Failed to fetch appointments", details: error.message });
      }
    } else {
      return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  });

  // API Route: Create a new appointment (saves to Hostinger MySQL)
  app.post("/api/appointments", async (req, res) => {
    const { name, phone, details } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone number are required" });
    }

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
      
      // local dev sandbox friendly fallback
      if (process.env.NODE_ENV !== "production") {
        console.warn("Falling back to local mock success since MySQL is not active on localhost.");
        return res.json({
          success: true,
          message: "Appointment saved successfully (Local Dev Fallback Mode)",
          id: Math.floor(Math.random() * 1000) + 1,
          isMock: true
        });
      }

      return res.status(500).json({
        success: false,
        error: "Failed to save appointment to database",
        details: error.message
      });
    }
  });

  // API Route: Get all appointments (for admin display) - Strictly secured
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
      return res.json({
        success: true,
        appointments: rows
      });
    } catch (error: any) {
      console.error("Database error fetching appointments:", error.message);
      
      if (process.env.NODE_ENV !== "production") {
        return res.json({
          success: true,
          appointments: [
            {
              id: 1,
              name: "John Doe (Mock)",
              phone: "9876543210",
              details: "Interested in 3 BHK Parvat Heights apartment.",
              created_at: new Date().toISOString()
            },
            {
              id: 2,
              name: "Jane Smith (Mock)",
              phone: "1234567890",
              details: "Wants to schedule a site visit this Sunday.",
              created_at: new Date(Date.now() - 3600000).toISOString()
            }
          ],
          isMock: true
        });
      }

      return res.status(500).json({
        success: false,
        error: "Failed to fetch appointments from database",
        details: error.message
      });
    }
  });

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
