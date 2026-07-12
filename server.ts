import express from "express";
import path from "path";
import mysql from "mysql2/promise";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 🗄️ होस्टिंगर इन-बिल्ट MySQL डेटाबेस कनेक्शन (पासवर्ड के साथ सुरक्षित)
  const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "u453675452_adminomkar",
    password: process.env.DB_PASSWORD || "Omkar.OMG.147",
    database: process.env.DB_NAME || "u453675452_parvat",
  };

  // डेटाबेस में अपॉइंटमेंट टेबल अपने आप बनाने का लॉजिक
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("MySQL Database Connected & Table Ready!");
    await connection.end();
  } catch (err: any) {
    console.error("Database initialization error:", err.message);
  }

  // 📝 API Route: वेबसाइट से अपॉइंटमेंट का डेटाबेस में सेव करने के लिए
  app.post("/api/appointments", async (req, res) => {
    const { name, phone, details } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }
    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute(
        "INSERT INTO appointments (name, phone, details) VALUES (?, ?, ?)",
        [name, phone, details || ""]
      );
      await connection.end();
      return res.json({ success: true, message: "Appointment saved to Hostinger DB!" });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // 🔑 API Route: लॉगिन बाईपास (बिना एरर सीधे अंदर जाने के लिए)
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (
      (email === "admin@parvatrealty.com" && password === "admin123") ||
      (email === "omkarwanve7@gmail.com" && password === "admin123")
    ) {
      return res.json({
        success: true,
        user: {
          localId: "hardcoded_admin_user",
          email: email,
          displayName: "System Administrator",
          idToken: "bypass_token_active"
        }
      });
    }
    return res.status(401).json({ success: false, error: "Invalid credentials" });
  });

  // Vite middleware
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
    console.log("Server running on http://localhost:3000");
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
