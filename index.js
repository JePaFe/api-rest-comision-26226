import express from "express";

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const productos = [
  { id: 1, nombre: "Producto 1", precio: 100 },
  { id: 2, nombre: "Producto 2", precio: 200 },
];

app.get("/", (req, res) => {
  res.send("API del curso funcionando");
});

app.get("/api/productos", (req, res) => {
  res.json(productos);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
