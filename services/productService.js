const db = require('../database/database');

const delay = (ms) => new Promise((done) => setTimeout(done, ms));

async function getProducts() {
    const products = await db.readAll();
    await delay(1500);
    return products;
}

async function getProductById(id) {
    const products = await db.readAll();
    return products.find((p) => p.id === Number(id)) || null;
}

async function createProduct(data) {
    const products = await db.readAll();
    const id = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const product = { id, ...data };
    products.push(product);
    await db.writeAll(products);
    return product;
}

async function updateProduct(id, data) {
    const products = await db.readAll();
    const item = products.find((p) => p.id === Number(id));
    if (!item) return null;
    Object.assign(item, data, { id: Number(id) });
    await db.writeAll(products);
    return item;
}

async function deleteProduct(id) {
    const products = await db.readAll();
    const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1) return null;
    const [deleted] = products.splice(index, 1);
    await db.writeAll(products);
    return deleted;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
