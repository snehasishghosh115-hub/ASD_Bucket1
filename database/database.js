const fs = require('fs/promises');
const path = require('path');

const file = path.join(__dirname, 'db.json');

async function readAll() {
    try {
        const data = await fs.readFile(file, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

async function writeAll(data) {
    await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
    return data;
}

module.exports = { readAll, writeAll };
