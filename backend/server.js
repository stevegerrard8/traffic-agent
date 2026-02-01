const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "traffic-saas-secret";
const db = new sqlite3.Database("./db.sqlite");

/* ===== DB INIT ===== */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      plan TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS accidents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      city TEXT,
      type TEXT,
      result TEXT
    )
  `);
});

/* ===== AUTH ===== */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, user) => {
      if (!user) return res.status(401).json({ error: "Invalid login" });

      const token = jwt.sign(
        { id: user.id, plan: user.plan },
        SECRET
      );

      res.json({ token });
    }
  );
});

/* ===== MIDDLEWARE ===== */
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

/* ===== STATS ===== */
app.get("/stats/summary", auth, (req, res) => {
  db.get(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN result='Ölümlü' THEN 1 ELSE 0 END) as fatal,
      SUM(CASE WHEN result='Yaralı' THEN 1 ELSE 0 END) as injured
    FROM accidents
  `, (err, row) => res.json(row));
});

app.get("/stats/by-city", auth, (req, res) => {
  db.all(`
    SELECT city, COUNT(*) as count
    FROM accidents
    GROUP BY city
  `, (err, rows) => res.json(rows));
});

app.get("/accidents/map", auth, (req, res) => {
  db.all(`
    SELECT city,
      CASE city
        WHEN 'İstanbul' THEN 41.0082
        WHEN 'Ankara' THEN 39.9334
        WHEN 'İzmir' THEN 38.4237
      END as lat,
      CASE city
        WHEN 'İstanbul' THEN 28.9784
        WHEN 'Ankara' THEN 32.8597
        WHEN 'İzmir' THEN 27.1428
      END as lng,
      result
    FROM accidents
  `, (err, rows) => res.json(rows));
});

app.listen(3000, () =>
  console.log("🚀 Backend running → http://localhost:3000")
);
