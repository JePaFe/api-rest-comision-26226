import { Router } from "express";

const router = Router();

import { readFile } from "fs/promises";

const dataURL = new URL("../../data/catalog.json", import.meta.url);

const readCatalog = async () => {
  const catalogJSON = await readFile(dataURL, "utf-8");
  const catalog = JSON.parse(catalogJSON);
  return catalog;
};

router.get("/api/categories", async (req, res) => {
  try {
    const { categories } = await readCatalog();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

export default router;
