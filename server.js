const express = require("express");
const path = require("path");
const multer = require("multer");
const { Pool } = require("pg"); // Asegúrate de requerir Pool y tu config de DB

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos de /public
app.use(express.static(path.join(__dirname, "public")));

// Parsear formularios HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de Multer para subir imágenes
const upload = multer({ dest: "public/images/" });

// Pool de PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Página de administración
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin.html"));
});

// Endpoint para agregar productos
app.post("/admin/add-producto", upload.single("imagen"), async (req, res) => {
  const { nombre, precio, link } = req.body;
  const imagen = req.file ? "images/" + req.file.filename : "";

  try {
    await pool.query(
      "INSERT INTO productos (nombre, precio, imagen, link) VALUES ($1, $2, $3, $4)",
      [nombre, precio, imagen, link]
    );
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error agregando producto");
  }
});

// Catch-all al final
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
