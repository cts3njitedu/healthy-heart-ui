const NodeCache = require('node-cache')

class Cache {
    constructor(ttlSeconds) {
        this.cache = new NodeCache({stdTTL: ttlSeconds})
    }
    get(key) {
        const value = this.cache.get(key)
        return Promise.resolve(value)
    }

    set(key,value, ttl) {
        const success = this.cache.set(key,value,ttl)
        return Promise.resolve(success)
    }

    flush() {
        this.cache.flushAll()
    }
}

module.exports = Cache