import express from "express";
import cors from "cors";

const app = express();

app.use(express.json()); // bodyParser middleware
app.use(cors()); // CORS middleware

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const categories = [
  { id: 1, name: "Tecnología" },
  { id: 2, name: "Hogar" },
];

const products = [
  { id: 1, name: "Teclado", price: 35000, categoryId: 1 },
  { id: 2, name: "Mouse", price: 18000, categoryId: 1 },
  { id: 3, name: "Lámpara", price: 22000, categoryId: 2 },
];

app.get("/", (req, res) => {
  res.send("API del curso funcionando");
});

app.get("/api/categorias", (req, res) => {
  res.json(categories);
});

app.get("/api/productos", (req, res) => {
  const categoryId = req.query.categoryId;

  if (!categoryId) {
    res.json(products);
    return;
  }

  const filteredProducts = products.filter(
    (p) => p.categoryId === parseInt(categoryId),
  );

  res.json(filteredProducts);
});

app.post("/api/productos", (req, res) => {
  const { name, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(422).json({ error: "Faltan datos del producto" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    categoryId,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.get("/api/productos/:id", (req, res) => {
  const productId = parseInt(req.params.id); // NaN si no es un número válido

  if (isNaN(productId)) {
    return res.status(400).json({ error: "ID de producto no válido" });
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
