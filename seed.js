const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  const productos = [
    {
      nombre: "Figura Retro Star",
      precio: 49.99,
      imagen: "images/retro1.jpg",
      link: "https://wa.me/573001234567?text=Quiero%20comprar%20la%20Figura%20Retro%20Star"
    },
    {
      nombre: "Carrito Vintage",
      precio: 29.50,
      imagen: "images/carrito1.jpg",
      link: "https://wa.me/573001234567?text=Quiero%20comprar%20el%20Carrito%20Vintage"
    },
    {
      nombre: "Muñeca Coleccionable",
      precio: 59.00,
      imagen: "images/muneca1.jpg",
      link: "https://wa.me/573001234567?text=Quiero%20comprar%20la%20Muñeca%20Coleccionable"
    }
  ];

  try {
    for (const p of productos) {
      await pool.query(
        "INSERT INTO productos (nombre, precio, imagen, link) VALUES ($1, $2, $3, $4)",
        [p.nombre, p.precio, p.imagen, p.link]
      );
    }
    console.log("Productos de prueba agregados ✅");
    pool.end();
  } catch (err) {
    console.error("Error agregando productos:", err);
    pool.end();
  }
}

seed();
