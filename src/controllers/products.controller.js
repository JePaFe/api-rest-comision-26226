import * as productModel from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const categoryId = req.query.categoryId;

    const filteredProducts = await productModel.findAll(categoryId);

    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id); // NaN si no es un número válido

    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID de producto no válido" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body ?? {};

    if (
      !name ||
      price === undefined ||
      price < 0 ||
      categoryId === undefined ||
      categoryId < 0
    ) {
      return res.status(422).json({ error: "Faltan datos del producto" });
    }

    const newProduct = await productModel.create({ name, price, categoryId });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId } = req.body ?? {};

    if (
      !name ||
      price === undefined ||
      price < 0 ||
      categoryId === undefined ||
      categoryId < 0
    ) {
      return res.status(422).json({ error: "Faltan datos del producto" });
    }

    const updatedProduct = await productModel.update(id, {
      name,
      price,
      categoryId,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const removedProduct = await productModel.remove(id);

    if (!removedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(removedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
