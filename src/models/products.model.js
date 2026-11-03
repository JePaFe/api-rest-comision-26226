import { readCatalog, writeCatalog } from "./catalog.js";

export const findAll = async (categoryId) => {
  const { products } = await readCatalog();

  if (!categoryId) {
    return products;
  }

  return products.filter((p) => p.categoryId === parseInt(categoryId));
};

export const findById = async (id) => {
  const { products } = await readCatalog();

  return products.find((p) => p.id === parseInt(id));
};

export const create = async ({ name, price, categoryId }) => {
  const catalog = await readCatalog();

  const ids = catalog.products.map((p) => p.id);
  const nextId = Math.max(0, ...ids) + 1;

  const newProduct = {
    id: nextId,
    name,
    price,
    categoryId,
  };

  catalog.products.push(newProduct);

  await writeCatalog(catalog);

  return newProduct;
};

export const update = async (id, { name, price, categoryId }) => {
  const catalog = await readCatalog();

  const product = catalog.products.find((p) => p.id === parseInt(id));

  if (!product) {
    return null;
  }

  // const updatedProduct = Object.assign(product, { name, price, categoryId });
  // const updatedProduct = { ...product, name, price, categoryId };

  product.name = name;
  product.price = price;
  product.categoryId = categoryId;

  await writeCatalog(catalog);

  return product;
};

export const remove = async (id) => {
  const catalog = await readCatalog();

  const index = catalog.products.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return null;
  }

  const [removedProduct] = catalog.products.splice(index, 1);

  await writeCatalog(catalog);

  return removedProduct;
};
