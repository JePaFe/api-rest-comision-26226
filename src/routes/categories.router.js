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
  const { categories } = await readCatalog();
  res.json(categories);
});

export default router;
