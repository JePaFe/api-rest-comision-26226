import { readFile, writeFile } from "fs/promises";

const dataURL = new URL("../../data/catalog.json", import.meta.url);

export const readCatalog = async () => {
  const catalogJSON = await readFile(dataURL, "utf-8");
  const catalog = JSON.parse(catalogJSON);
  return catalog;
};

export const writeCatalog = async (catalog) => {
  const catalogJSON = JSON.stringify(catalog, null, 2);
  await writeFile(dataURL, catalogJSON, "utf-8");
};
