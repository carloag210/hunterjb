const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos de /public
app.use(express.static(path.join(__dirname, "public")));



// Ruta catch-all para SPA o páginas no encontradas

const multer = require("multer");       // Para subir imágenes
const upload = multer({ dest: "public/images/" }); // Carpeta donde guardará las fotos

// Página de administración
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin.html"));
});

// Endpoint para agregar productos desde el formulario
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
