const TTL = Number(process.env.CACHE_TTL_MS) || 60 * 1000;

const cache = new Map();

function check(req, res, next) {
    if (req.method !== 'GET') return next();

    const key = req.originalUrl;
    const entry = cache.get(key);

    if (entry && Date.now() - entry.time < TTL) {
        res.set('X-Cache', 'HIT');
        return res.json(entry.value);
    }

    res.set('X-Cache', 'MISS');
    next();
}

function set(key, value) {
    cache.set(key, { value, time: Date.now() });
}

function clear() {
    cache.clear();
}

module.exports = { check, set, clear };
